var fs = require('fs');
// 同期的にファイルをUTF-8文字列として読み込む

const targetDir = './'; // 取得したいディレクトリのパス
let fileslo=[];
try {
	// recursive: true でサブディレクトリ内のファイルやフォルダも全て取得
	const files = fs.readdirSync(targetDir, { recursive: true, encoding: 'utf8' });

	// フルパスに変換したい場合やファイルだけを絞り込む場合の処理
	files.forEach(file => {
		if(file.endsWith('.html'))
		{
			fileslo.push(file);
		}
	});
} catch (err) {
	console.error('エラーが発生しました:', err);
}
for(let i=0;i<fileslo.length;i++)
{
	const data = fs.readFileSync(fileslo[i], 'utf-8');
	const name_0=/\s*<meta\s*name\s*=\s*["']robots["']\s*content\s*=\s*["'][^"']*(noindex|nofollow)[^"']*["']\s*>/i;
	// 特定の文字列が含まれているか判定,複数を防止
	if (name_0.test(data)&&!data.includes("data-pagefind-ignore"))
	{
		if(/<html\b/i.test(data))
		{
			fs.writeFileSync(fileslo[i], data.replace(/<html/i, '<html data-pagefind-ignore'), 'utf-8');
		}
		else
		{
			fs.writeFileSync(fileslo[i],"<div data-pagefind-ignore>"+data+"</div>","utf-8");
		}
	}
	else
	{
		console.log('文字列は見つかりませんでした');
	}
}