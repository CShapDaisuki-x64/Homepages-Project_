import * as allfile from '../allfile.js';
allfile.open_main();
allfile.footer("./header.html","hedaer_div");
allfile.style();
const html_points = document.getElementById("points");
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
window.main=main;
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
window.mikuji=mikuji;
html_points.innerText=(points+"ポイント");
