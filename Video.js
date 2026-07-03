const ShopBox = document.querySelector('.Videos');
let saved_Items
async function LoadJson()
{
    let response = await fetch('video.json');
    saved_Items = await response.json();
    console.log(saved_Items["1s"]["title"])
    Load_View(saved_Items);
}
function Load_View(items)
{
    ShopBox.innerHTML = '';
    Object.keys(items).forEach(key => {
        const item = items[key];
        // ボタン要素を作成
        const btn = document.createElement('div');
        btn.className = "videosty";
        btn.id = key;
        if(item.topic.nicovideonone)
        {
            btn.innerHTML = "<div class='title'>"+item.title+"</div>ID:"+key+"<br>ニコニコ動画:動画なし<br>YouTube:<a href='https://youtu.be/"+item.youtube+"'>https://youtu.be/"+item.youtube+"</a>";
        }
        else
        {
            btn.innerHTML = "<div class='title'>"+item.title+"</div>ID:"+key+"<br>ニコニコ動画:<a href='https://www.nicovideo.jp/watch/"+item.nicovideo+"'>https://www.nicovideo.jp/watch/"+item.nicovideo+"</a><br>YouTube:<a href='https://youtu.be/"+item.youtube+"'>https://youtu.be/"+item.youtube+"</a>";
        }
        if(item.topic.VoiceBig)
        {
            btn.innerHTML = btn.innerHTML + "<div class='EX'>⚠注意:騒音</div>"
        }
        if(item.topic.remake)
        {
            btn.innerHTML = btn.innerHTML + "<div class='info'>🛈️情報:リメイク<br>元動画ID:<a href='video.html#"+item.topic.remake2+"'>"+item.topic.remake2+"</a></div>"
        }
        // ShopBoxにボタンを追加
        ShopBox.appendChild(btn);

    });
}
LoadJson();