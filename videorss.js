const fs = require("fs");
const day=new Date().toISOString()
let rss = `<?xml version="1.0" encoding="UTF-8"?>
	<feed xmlns="http://www.w3.org/2005/Atom">
		<link href="https://syumi-programmer-ningen.pages.dev/video_rss.xml" rel="self" type="application/atom+xml"/>
		<title>趣味プログラマー人間 動画</title>
		<link href="https://syumi-programmer-ningen.pages.dev" rel="alternate" />
		<id>https://syumi-programmer-ningen.pages.dev/video_rss.xml</id>
		<author>
			<email>
				syumi.programmer.ningen+toiawase@protonmail.com
			</email>
			<name>
				趣味プログラマー人間
			</name>
		</author>
		<updated>${day}</updated>
`;
async function LoadJson()
{
	const saved_Items = JSON.parse(fs.readFileSync("video.json", "utf8"));
	Load_View(saved_Items);
}
function Load_View(items)
{
	Object.keys(items).sort((a, b) => items[b].day.localeCompare(items[a].day)).forEach(key => {
		const item = items[key];
		let cdn1 = item.day.match(/.{4}/g);
		let cdn2 = cdn1[1].match(/.{2}/g);
		let string="";
		string+=`<p>ID:${texthtml(key)}</p>`;
		if(item.nicovideo)
		{
			string+=`<a href="https://nicovideo.jp/watch/${texthtml(item.nicovideo)}">ニコニコ動画</a>`;
		}
		if(item.youtube)
		{
			string+=`<a href="https://youtu.be/${texthtml(item.youtube)}">YouTube</a>`;
		}
		if(item.topic?.VoiceBig)
		{
			string+="<p>警告:騒音</p>";
		}
		if(item.topic?.remake)
		{
			string+=`情報:リメイク　<a href="https:\u002F\u002Fsyumi-programmer-ningen.pages.dev/video.html#${texthtml(item.topic.remake)}">元動画</a>`;
		}
		if(item.topic?.all)
		{
			let all_tmp="<p>情報:総集編</p><br><ul><li>動画一覧</li>";
			console.log(item.topic.all.length);
			for(let i=0;i<item.topic.all.length;i++)
			{
				console.log(i)
				all_tmp+=`\n<li><a href='https://syumi-programmer-ningen.pages.dev/video.html#${texthtml(item.topic.all[i])}'>${texthtml(item.topic.all[i])}</a></li>`;
			}
			all_tmp+="</ul>"
			string+=all_tmp;
		}
		let rss_in=`
<entry>
	<id>https://syumi-programmer-ningen.pages.dev/video.html#${textxml(key)}</id>
	<title>${textxml(item.title)}</title>
	<link rel="alternate" href="https://syumi-programmer-ningen.pages.dev/video.html#${textxml(key)}" />
	<content type="html">${textxml(string)}</content>
	<published>${cdn1[0]}-${cdn2[0]}-${cdn2[1]}T23:59:59+09:00</published>
	<updated>${day}</updated>
</entry>
`;
rss+=rss_in;
	});
	rss= rss+`</feed>`
	fs.writeFileSync("video_rss.xml", rss, "utf8");
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
