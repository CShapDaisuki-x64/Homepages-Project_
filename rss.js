const fs = require("fs");
let rss = `<?xml version="1.0" encoding="UTF-8"?>
	<feed xmlns="http://www.w3.org/2005/Atom">
		<link href="https://syumi-programmer-ningen.pages.dev/now_rss.xml" rel="self" type="application/atom+xml"/>
		<title>趣味プログラマー人間のホームページ</title>
		<link href="https://syumi-programmer-ningen.pages.dev" rel="alternate" />
		<id>https://syumi-programmer-ningen.pages.dev/now_rss.xml</id>
		<author>
			<email>
				syumi.programmer.ningen+toiawase@protonmail.com
			</email>
			<name>
				趣味プログラマー人間
			</name>
		</author>
		<updated>${new Date().toISOString()}</updated>
`;
async function LoadJson()
{
	const saved_Items = JSON.parse(fs.readFileSync("oshirase.json", "utf8"));
	Load_View(saved_Items);
}
function Load_View(items)
{
	Object.keys(items).sort((a, b) => b.localeCompare(a)).forEach(key => {
		const item = items[key];
		let cdn1 = key.match(/.{4}/g);
		let cdn2 = cdn1[1].match(/.{2}/g);
		let rcontent=`<p>${texthtml(item.content)}</p>`;
		if(item.link_type=="inlink"||item.link_type=="outlink")
		{
			let linka="";
			if(item.link_type=="inlink")
			{
				linka=texthtml(`https://syumi-programmer-ningen.pages.dev/oshirase.html#${item.link}`);
			}
			else if(item.link_type=="outlink")
			{
				linka=texthtml(`${item.link}`);
			}
			rcontent+=`<a href="${linka}">リンクを開く</a>`;
		}
		let rss_in=`
<entry>
	<id>https://syumi-programmer-ningen.pages.dev/oshirase.html#${textxml(key)}</id>
	<title>${textxml(item.title)}</title>
	<link rel="alternate" href="https://syumi-programmer-ningen.pages.dev/oshirase.html#${textxml(key)}" />
	<content type="html">${textxml(rcontent)}</content>
	<updated>${cdn1[0]}-${cdn2[0]}-${cdn2[1]}T23:59:59+09:00</updated>
</entry>
`;
rss+=rss_in;
	});
	rss= rss+`</feed>`
	fs.writeFileSync("now_rss.xml", rss, "utf8");
}
function textxml(text)
{
	return String(text)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}
function texthtml(text)
{
	return String(text)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;")
		.replace(/\n/g, "<br>");
}
LoadJson();