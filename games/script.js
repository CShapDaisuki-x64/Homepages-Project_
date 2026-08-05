const html_points = document.getElementById("points");
fetch("/games/header.html")
	.then((response) => response.text())
	.then((data) => document.querySelector("#hedaer_div").innerHTML = data);
if(localStorage.getItem('Site_OK') != "true")
{
	let bur = document.createElement('dialog');
	bur.id="bur";
	bur.style="position:fixed;bottom:0px;left:0px;right:0px;margin:0px;width: 100%;";
	bur.innerHTML=`<iframe width="200" height="300px" src='/license.js.html'><a href='/license.html'>iframe対応してない人はここ</a></iframe><button onclick='localStorage.setItem("Site_OK","true");this.closest("dialog").close();this.closest("dialog").remove();'>同意する</button><button onclick='localStorage.setItem("Site_OK","false");window.location.href="/license.go.html";'>同意しない</button>`;
	document.body.appendChild(bur);
	bur.show();
}
let style_html = document.createElement('style');
const thema = window.matchMedia('(prefers-color-scheme: dark)').matches;
const dark =
`	:root{
		--bck_color:#444;
		--haf_bck_color:#16b;
		--haf_link_in_color:#bbb;
		--haf_img_rod:invert(100%);
		--acs_color:#ddd;
		--btn_bck_color:#bbb;
		--btn_bdr_color:#999;
		--btn_in_img_rod:brightness(120%);
		--link_color:#29d;
		--link_color_ace:#c6e;
		--link_color_ace_in:#e9e;
		--kmk-vdo_bck_color:#27b;
		--vdo_acs_color:#ddd;
		--vdo_link_color:#cdd;
		--vdo_link_in_color:#bbb;
	} `;
const notdark =
`:root{
	--bck_color:#eee;
	--haf_bck_color:#0ce;
	--haf_link_in_color:#456;
	--haf_img_rod:invert(0%);
	--acs_color:#112;
	--btn_bck_color:#ddd;
	--btn_bdr_color:#bbb;
	--btn_bck_in_color:#ccc;
	--btn_bdr_in_color:#aaa;
	--btn_in_img_rod:brightness(80%);
	--link_color:#07d;
	--link_color_ace:#90e;
	--link_color_in:#1cd;
	--link_color_ace_in:#c1d;
	--kmk-vdo_bck_color:#0ad;
	--vdo_acs_color:#eee;
	--vdo_link_color:#cde;
	--vdo_link_in_color:#dee;
	--vdo_ex_bck_color:#e05;
	--vdo_inf_bck_color:#05e;
}`;
if(localStorage.getItem("site_dark")=="true")
{
	style_html.innerHTML=dark;
}
else if(localStorage.getItem("site_dark")=="false")
{
	style_html.innerHTML= notdark;
}
else{
	if(thema)
	{
		style_html.innerHTML=dark;
	}
	else
	{
		style_html.innerHTML=notdark;
	}
}
if(localStorage.getItem("site_color"))
{
	style_html.innerHTML = style_html.innerHTML+":root{--haf_bck_color:"+localStorage.getItem('site_color')+";}"
}
document.body.appendChild(style_html);
let points = 0;
let points_local=localStorage.getItem("games_points")
if (points_local !== null)
{
	points = Number(points_local);
}
else{
	localStorage.setItem("games_points","0");
}
let apoint=0;
let bpoint=0;
let cpoint=0;
let point=0;

function point_(a)
{
	points=points+a;
	console.log(points);
	localStorage.setItem("games_points",points);
}

function _point(a)
{
	if(points > a)
	{
		points=points-a;
	}
	else
	{
		points=0;
	}
	console.log(points);
	localStorage.setItem("games_points",points);
}

function js_randoms(a)
{
	return Math.floor(Math.random()*a);
}

function main(j)
{
	let html_log=document.getElementById("log");
	let js_random=js_randoms(3);
	console.log(js_random);
	if(js_random==0)
	{
		switch(j)
		{
			case 0:
				console.log("あいこmy:0,cp,0");
				html_log.innerText = ("結果:あいこ\nあなた:グー\n相手:グー");
				cpoint++;
				break;
			case 1:
				console.log("負けmy:1,cp:0");
				html_log.innerText = ("結果:負け\nあなた:チョキ\n相手:グー");
				bpoint++;
				_point(1);
				break;
			case 2:
				console.log("勝ち my:2,cp:0")
				html_log.innerText = ("結果:勝ち\nあなた:パー\n相手:グー");
				apoint++;
				point_(1);
				break;
			default:
				console.error("不明な値");
				html_log.innerText=("不明なエラーです。フィードバックをして下さい");
				break;
		}
	}
	else if(js_random==1)
	{
		switch(j)
		{
			case 0:
				console.log("勝ちmy:0,cp,1");
				html_log.innerText = ("結果:勝ち\nあなた:グー\n相手:チョキ");
				apoint++;
				point_(1);
				break;
			case 1:
				console.log("あいこmy:1,cp:1");
				html_log.innerText = ("結果:あいこ\nあなた:チョキ\n相手:チョキ");
				cpoint++;
				break;
			case 2:
				console.log("負け my:2,cp:1")
				html_log.innerText = ("結果:負け\nあなた:パー\n相手:チョキ");
				bpoint++;
				_point(1);
				break;
			default:
				console.error("不明な値");
				html_log.innerText=("不明なエラーです。フィードバックをして下さい");
				break;
		}
	}
	else if(js_random==2)
	{
		switch(j)
		{
				case 0:
				console.log("負けmy:0,cp,2");
				html_log.innerText = ("結果:負け\nあなた:グー\n相手:パー");
				bpoint++;
				_point(1);
				break;
			case 1:
				console.log("勝ちmy:1,cp:2");
				html_log.innerText = ("結果:勝ち\nあなた:チョキ\n相手:パー");
				apoint++;
				point_(1);
				break;
			case 2:
				console.log("あいこ my:2,cp:2")
				html_log.innerText = ("結果:あいこ\nあなた:パー\n相手:パー");
				cpoint++;
				break;
			default:
				console.error("不明な値");
				html_log.innerText=("不明なエラーです。フィードバックをして下さい");
				break;
		}
	}
	else
	{
		console.error("不明な値");
		html_log.innerText=("不明なエラーです。フィードバックをして下さい");
	}
	console.log(html_log.innerText);
	document.getElementById("point").innerText=(apoint+"勝\n"+bpoint+"敗\n"+cpoint+"分")
	html_points.innerText = (points+"ポイント");
}
function mikuji()
{
	let mikuji_random=js_randoms(7);
	let mikuji_rakki_random=js_randoms(7);
	let mikuji_Text="";
	let mikuji_rakki_Text="";
	const html_omikuji_text=document.getElementById("omikuji_text");
	switch(mikuji_random)
	{
		case 0:
			mikuji_Text="大吉";
			point_(25);
			break;
		case 1:
			mikuji_Text="中吉";
			point_(20);
			break;
		case 2:
			mikuji_Text="小吉";
			point_(15);
			break;
		case 3:
			mikuji_Text="吉";
			point_(10);
			break;
		case 4:
			mikuji_Text="末吉"
			point_(5);
			break;
		case 5:
			mikuji_Text="凶";
			point_(15)
			break;
		case 6:
			mikuji_Text="大凶";
			point_(25);
			break;
		default:
			mikuji_Text="呪";
			point_(50);
			break;
	}
	switch(mikuji_rakki_random){
		case 0:
			mikuji_rakki_Text="銅鏡";
			break;
		case 1:
			mikuji_rakki_Text="金延べ棒";
			break;
		case 2:
			mikuji_rakki_Text="銀貨";
			break;
		case 3:
			mikuji_rakki_Text="鉄瓶";
			break;
		case 4:
			mikuji_rakki_Text="アルミサッシ";
			break;
		case 5:
			mikuji_rakki_Text="永久磁石";
			break;
		case 6:
			mikuji_rakki_Text="レアメタル";
			break;
		default:
			mikuji_rakki_Text="クエン酸ナトリウム";
			break;
	}
	html_omikuji_text.innerText=("運勢:"+mikuji_Text+"\nラッキーアイテム:"+mikuji_rakki_Text);
	html_points.innerText = (points+"ポイント");
}
html_points.innerText=(points+"ポイント");
