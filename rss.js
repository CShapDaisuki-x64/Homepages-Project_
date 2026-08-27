const fs = require("fs");
let rss = `
	<?xml version="1.0" encoding="UTF-8"?>
	<feed xmlns="http://www.w3.org/2005/Atom">
		<link href="https://syumi-programmer-ningen.pages.dev/now_rss.xml" rel="self" type="application/atom+xml"/>
		<title>趣味プログラマー人間のホームページ</title>
		<link href="https://syumi-programmer-ningen.pages.dev" rel="alternate" />
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
	let response = await fetch('https://syumi-programmer-ningen.pages.dev/oshirase.json');
	const saved_Items = await response.json();
	Load_View(saved_Items);
}
function Load_View(items)
{
	Object.keys(items).sort((a, b) => b.localeCompare(a)).forEach(key => {
		const item = items[key];
		let cdn1 = key.match(/.{4}/g);
		let cdn2 = cdn1[1].match(/.{2}/g);
		let links=`https://syumi-programmer-ningen.pages.dev/oshirase.html#${key}`;
		if(item.link_type=="insite")
		{
			links="https://syumi-programmer-ningen.pages.dev/"
		}
		else if(item.link_type=="out_site")
		{
			links=item.link;
		}
		let rss_in
		if(item.link_type=="out_site"||item.link_type=="in_item")
		{
		rss_in = `
<entry>
	<id>https://syumi-programmer-ningen.pages.dev/oshirase.html#${textxml(key)}</id>
	<title>${textxml(item.title)}</title>
	<link rel="alternate" href="https://syumi-programmer-ningen.pages.dev/oshirase.html#${textxml(key)}" />
	<link rel="related" href="${textxml(links)}" />
	<content type="text">${textxml(item.content)}</content>
	<updated>${cdn1[0]}-${cdn2[0]}-${cdn2[1]}T23:59:59+09:00</updated>
</entry>
`;
		}
		else{
		rss_in = `
<entry>
	<id>https://syumi-programmer-ningen.pages.dev/oshirase.html#${textxml(key)}</id>
	<title>${textxml(item.title)}</title>
	<link rel="alternate" href="https://syumi-programmer-ningen.pages.dev/oshirase.html#${textxml(key)}" />
	<content type="text">${textxml(item.content)}</content>
	<updated>${cdn1[0]}-${cdn2[0]}-${cdn2[1]}T23:59:59+09:00</updated>
</entry>
`;
		}
rss= rss+=rss_in;
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
LoadJson();
