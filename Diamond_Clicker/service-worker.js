const CACHE_NAME = "Diamond_Clicker-2.5.5";
const BASE = "/Diamond_Clicker/";

const urlsToCache = [
    "/img/exp.svg",
    BASE,
    BASE + "index.html",
    BASE + "tensei.html",
    BASE + "Script.js",
    BASE + "Tensei_Script.js",
    BASE + "style.css",
    BASE + "no_view/Mp_Mu_0001",
    BASE + "no_view/Mp_Mu_0002",
    BASE + "no_view/Mp_Mu_0003",
    BASE + "no_view/Mp_Mu_Setting_001",
    BASE + "no_view/Mp_Mu_Setting_002",
    BASE + "img/Ai.webp",
    BASE + "img/back.webp",
    BASE + "img/Byou_Makimono.webp",
    BASE + "img/CkPlas.webp",
    BASE + "img/daiya.webp",
    BASE + "img/doriru.webp",
    BASE + "img/erabutsu.webp",
    BASE + "img/gatya.webp",
    BASE + "img/inbouron.webp",
    BASE + "img/js.webp",
    BASE + "img/kodai.webp",
    BASE + "img/kojou.webp",
    BASE + "img/Mahou.webp",
    BASE + "img/masin.webp",
    BASE + "img/robot_daiya.webp",
    BASE + "img/robot.webp",
    BASE + "img/samune_phone.avif",
    BASE + "img/samune.webp",
    BASE + "img/suisou.webp",
    BASE + "img/syukyo.webp",
    BASE + "img/thuruhashi.webp",
    BASE + "img/torakku.webp"
];

// インストール：初期ファイルをキャッシュ
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

// 有効化：このゲーム専用の古いキャッシュを削除
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys
                    .filter(key =>
                        key.startsWith("Diamond_Clicker-") &&
                        key !== CACHE_NAME
                    )
                    .map(key => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

// 通信処理：オンライン優先、失敗時はキャッシュ
self.addEventListener("fetch", event => {
    const request = event.request;
    const url = new URL(request.url);

    // GET以外、別オリジン、ゲームの範囲外は処理しない
if (
    request.method !== "GET" ||
    url.origin !== self.location.origin ||
    (
        !url.pathname.startsWith(BASE) &&
        url.pathname !== "/img/exp.svg"
    )
) {
    return;
}

    // テスト用レスポンス
    if (url.pathname.endsWith("/test.html")) {
        event.respondWith(new Response(
            "Service Workerからのレスポンス",
            {
                headers: {
                    "Content-Type": "text/plain; charset=utf-8"
                }
            }
        ));
        return;
    }

    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);

        try {
            // まずネットワークから取得
            const response = await fetch(request);

            // 成功したレスポンスだけキャッシュを更新
            if (response.ok) {
                await cache.put(request, response.clone());
                return response;
            }

            // サーバーエラーなどの場合はキャッシュを優先
            const cached = await cache.match(request);

            if (cached) {
                return cached;
            }

            // キャッシュがなければ、取得したエラーレスポンスを返す
            return response;

        } catch (error) {
            // 通信エラー：まず要求されたファイルを検索
            const cached = await cache.match(request);

            if (cached) {
                return cached;
            }

            // HTMLページならキャッシュ済みのトップページを返す
            if (request.mode === "navigate") {
                const page =
                    await cache.match(BASE) ||
                    await cache.match(BASE + "index.html");

                if (page) {
                    return page;
                }
            }

            // キャッシュにもなければ503
            return new Response(
                "オフラインです。このファイルはキャッシュされていません。",
                {
                    status: 503,
                    headers: {
                        "Content-Type": "text/plain; charset=utf-8"
                    }
                }
            );
        }
    })());
});