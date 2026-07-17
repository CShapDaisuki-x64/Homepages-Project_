let $Ck = 1;
let $S = 0;
const $Ck_Save = localStorage.getItem("$Ck");
const $S_Save = localStorage.getItem("$S");
let tense = 0;
const tense_save = localStorage.getItem("tense");
let Ck_Plus = 1;
const Ck_Plus_Save = localStorage.getItem("Ck_Plus");
let S_Plus = 1;
const S_Plus_Save = localStorage.getItem("S_Plus");
const ShopBox = document.querySelector('.ShopBox');
const Main = document.querySelector('.MainP');
const $_Shop_Items_$ = {
	Gacha:{Text:"カプセルトイ",Default:100,Money:1,type:4,Num:1,Img:"img/gatya.webp",Title:"今日は何が出るかな"},
	CKD:{Text:"Ckドリンク",Default:1,Money:1,type:0,Num:10,Img:"img/CkPlas.webp",Title:"流行のエナドリ！"},
	Toki:{Text:"時の巻物",Default:10,Money:1,type:1,Num:10,Img:"img/Byou_Makimono.webp",Title:"時を超える知識"},
	JsVs:{Text:"スクリプトエディタ",Default:100,Money:1,type:2,Num:10,Img:"img/js.webp",Title:"tense = 1000"},
	Kikai:{Text:"謎の機械",Default:50,Money:1,type:2,Num:10,Img:"img/masin.webp",Title:"凄そう"},
	Suisou:{Text:"水槽の中の脳",Default:200,Money:1,type:3,Num:5,Img:"img/suisou.webp",Title:"あなたの脳は水槽ですか？"}
}
function on()
{
		document.getElementById('Setting_Del_01_Audio').currentTime = 0; //連続クリックに対応
		document.getElementById('Setting_Del_01_Audio').play();
		var i = confirm("本当に転生を終わりますか");
		if (i)
		{
			Save();
			window.location.href = 'index.html?a=a'; 
		}
}
//type0=初期強化Ck
//type1=初期強化S
//Type2=商品強化Ck
//type3=商品強化S
function Load_Shop_Items() {
	let saved_Items = JSON.parse(localStorage.getItem('$Tensei_Shop_Items'));
	if (saved_Items) {
		Object.keys($_Shop_Items_$).forEach(key => {
			if (!saved_Items[key]) {
				saved_Items[key] = JSON.parse(JSON.stringify($_Shop_Items_$[key]));
			} else {
				Object.keys($_Shop_Items_$[key]).forEach(prop => {
					if (saved_Items[key][prop] === undefined) {
						saved_Items[key][prop] = $_Shop_Items_$[key][prop];
					}
				});
			}
		});
		return saved_Items;
	} else {
		return JSON.parse(JSON.stringify($_Shop_Items_$));
	}
}
let Shop_Items = Load_Shop_Items();
const Shop_Items_Save = localStorage.getItem('$Tensei_Shop_Items');
function Shop(yen,Money,type,Num)
{
	if(tense >= yen * Money)
	{
		if(type==0)
		{
			$Ck=$Ck+Num;
		}
		else if(type==1)
		{
			$S=$S+Num;
		}
		else if(type==2)
		{
			Ck_Plus=Ck_Plus+Num;
		}
		else if(type==3)
		{
			S_Plus=S_Plus+Num;
		}
		else if(type==4)
		{
			let random = Math.floor(Math.random()*201);

			if(random==0)
			{
				alert("ハズレ(´・ω・｀)ｼｮﾎﾞｰﾝ");
			}
			else if(10>=random)
			{
				$Ck = $Ck + ((random)*100);
				alert("あたり(ﾟ∀ﾟ)\n購入クリック強化が"+(random)+"追加されました");
			}
			else if(20>=random)
			{
				$S = $S + ((random-10)*100);
				alert("あたり(ﾟ∀ﾟ)\n購入秒強化が"+(random-10)+"追加されました");
			}
			else if(30>=random)
			{
				Ck_Plus = Ck_Plus + ((random-20)*100);
				alert("あたり(ﾟ∀ﾟ)\n初期クリック強化が"+(random-20)+"追加されました");
			}
			else if(40>=random)
			{
				S_Plus = S_Plus + ((random-30)*100);
				alert("あたり(ﾟ∀ﾟ)\n初期秒強化が"+(random-30)+"追加されました");
			}
			else
			{
				alert("ハズレ(´・ω・｀)ｼｮﾎﾞｰﾝ");
			}
		}
		else
		{
			alert("不明なエラーです\nフィードバックお願いします(｀･ω･´)ゞ")
		}
		document.getElementById('Shop_Ok_audio').currentTime=0; //連続クリックに対応
		document.getElementById('Shop_Ok_audio').play();
		tense=tense-yen*Money;
		yen=yen+1
	}
	else
	{
		
	}
	return yen;
}
function Shop_Text()
{
	ShopBox.innerHTML = '';
	Object.keys(Shop_Items).forEach(key => {
		const item = Shop_Items[key];
		let i = "";
		if(Number(item.type)==0)
		{
			i="クリックで増えるダイヤの初期値を"+item.Num+"追加される"
		}
		else if(Number(item.type)==1)
		{
			i="1秒で増えるダイヤの初期値を"+item.Num+"追加される"
		}
		else if(Number(item.type)==2)
		{
			i="クリックで増えるダイヤの強化値を"+item.Num+"追加される"
		}
		else if(Number(item.type)==3)
		{
			i="1秒で増えるダイヤの強化値を"+item.Num+"追加される"
		}
		else if(Number(item.type)==4)
		{
			i="運任せで強化しちゃえ"
		}
		else
		{
			i="不明なエラーです\nフィードバックお願いします(｀･ω･´)ゞ"
		}
		// ボタン要素を作成
		const btn = document.createElement('button');
		btn.id = key;
		btn.innerHTML=`<img src=${item.Img}>`+item.Text+":"+(item.Default*item.Money)+`転生ポイント<br>${i}`;
		btn.setAttribute('title', item.Title);
		if (tense >= (item.Default * item.Money)) 
		{
			btn.style.backgroundColor = "#ccc";
		} 
		else {
			btn.style.backgroundColor = '#334';//なんでや！阪神関係ないやろ
		}
		// クリックイベントを設定
		btn.onclick = function() {
			item.Money = Shop(item.Money, item.Default, item.type, item.Num);
			
			// 購入後に表示を更新
			Shop_Text();
		 
			TextLoad();
			Save();
		};
		// ShopBoxにボタンを追加
		ShopBox.appendChild(btn);
	});
}
function TimerOne()
{
	TextLoad();
	Shop_Text();
}
setInterval(TimerOne, 1000);
function timertowtow()
{
	Save();
	TextLoad();
}
setInterval(timertowtow, 60000);
function Save()
{
	localStorage.setItem('tense',tense);	
	localStorage.setItem('Ck_Plus', Ck_Plus);
	localStorage.setItem('S_Plus', S_Plus);
	localStorage.setItem('$Tensei_Shop_Items', JSON.stringify(Shop_Items));
	localStorage.setItem('$Ck', $Ck);
	localStorage.setItem('$S', $S);
}
function Load()
{
	if(tense_save !== null)
	{
		tense = Number(tense_save);
	}
	if (Ck_Plus_Save !== null && Number(Ck_Plus_Save) > 0)
	{
		Ck_Plus = Number(Ck_Plus_Save);
	}
	if (S_Plus_Save !== null && Number(S_Plus_Save) > 0)
	{
		S_Plus = Number(S_Plus_Save);
	}
}
function TextLoad()
{
	document.getElementById('MainP').innerHTML = 
		tense.toFixed(2) +
		"転生ポイント<br>"+
		Ck_Plus.toFixed(2) +
		"購入クリック強化<br>" +
		S_Plus.toFixed(2) +
		"購入秒強化<br>" +	
		$Ck.toFixed(2) +
		"初期クリック強化<br>" +
		$S.toFixed(2) +
		"初期秒強化";
}
Load();
TextLoad();
Shop_Text();
function I_am_a_programmer()
{
	tense = tense + 9999999999;
}