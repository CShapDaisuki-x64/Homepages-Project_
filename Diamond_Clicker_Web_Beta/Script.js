//一般
let Main = 0;
const Main_Save = localStorage.getItem("Main");
let Ck = 1;
const Ck_Save = localStorage.getItem("Ck");
let S = 0;
const S_Save = localStorage.getItem("S");
let Main_Plus = 0;
const Main_Plus_Save = localStorage.getItem("Main_Plus")
let Ck_Plus = 1;
const Ck_Plus_Save = localStorage.getItem("Ck_Plus");
let S_Plus = 1;
let tense = 0;
const tense_save = localStorage.getItem("tense")
const S_Plus_Save = localStorage.getItem("S_Plus");
const ShopBox = document.querySelector('.ShopBox');
let $Ck = 0;
let $S = 0;
const $Ck_Save = localStorage.getItem("$Ck")
const $S_Save = localStorage.getItem("$S");
const $_Shop_Items_$ = {
    Tsuruhashi:{Text:"つるはし",Default:10,Money:1,Ck:1,S:0.1,Img:"img/thuruhashi.webp",Title:"今まで素手で掘ってたの？"},
    Doriru:{Text:"ドリル",Default:100,Money:1,Ck:10,S:1,Img:"img/doriru.webp",Title:"文明の利器"},
    kojou:{Text:"工場",Default:1500,Money:1,Ck:100,S:15,Img:"img/kojou.webp",Title:"大量生産大量消費"},
    inbou:{Text:"秘密結社",Default:1000000,Money:1,Ck:1500,S:100,Img:"img/inbouron.webp",Title:"需要を絞り供給増やす"},
    kodai:{Text:"古代の機械",Default:100000000,Money:1,Ck:150000,S:9000,Img:"img/kodai.webp",Title:"この古代の機械には、謎の文字が記されてた"},
    mahou:{Text:"魔法の杖",Default:500000000,Money:1,Ck:1000000,S:50000,Img:"img/Mahou.webp",Title:"魔法と科学は紙一重"},
    torakku:{Text:"運送会社",Default:1500000000,Money:1,Ck:1000000,S:100000,Img:"img/torakku.webp",Title:"ダイヤを運べ！通販の波に乗れ！"}
}
function Load_Shop_Items() {
    let saved_Items = JSON.parse(localStorage.getItem('Shop_Items'));
    
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
const Shop_Items_Save = localStorage.getItem('Shop_Items');
function Shop_Del()
{
    Object.values(Shop_Items).forEach(item => {
        item.Money=1;
    })
}
function deletes()
{
    document.getElementById('Setting_Del_01_Audio').currentTime = 0; //連続クリックに対応
    document.getElementById('Setting_Del_01_Audio').play();
    var result = confirm('本当に削除しますか？');
    if (result)
    {
        document.getElementById('Setting_Del_02_Audio').currentTime = 0; //連続クリックに対応
        document.getElementById('Setting_Del_02_Audio').play();
        var gati = confirm("本当に本当に削除しますか？！")
        if (gati)
        {
            localStorage.clear();
            document.getElementById('Shop_Ok_audio').currentTime = 0; //連続クリックに対応
            document.getElementById('Shop_Ok_audio').play();
            window.location.reload();
            alert("削除できました");
        }
        
    }
}
function dels()
{
                Main = 0;
            Ck = 1;
            S = 0;
            Shop_Del();
}
function TimerOne()
{
    Main = Main + ((S+$S)/10);
    TextLoad();
}
setInterval(TimerOne, 100);
function timertowtow()
{
    Shop_Text();
}
setInterval(timertowtow, 1000);
function TimerTwo()
{
    Save();
    TextLoad();
}
setInterval(TimerTwo, 60000);
function MainAtag_Click()
{
    document.getElementById('MainA_audio').currentTime = 0; //連続クリックに対応
    document.getElementById('MainA_audio').play();
    Main = Main + (Ck + $Ck);
    TextLoad();
}
function TimerMm()
{
    Save();
    Load();
    TextLoad();
    console.log("a");
}
setInterval(TimerMm, 60000);
function Save()
{
    localStorage.setItem('Main', Main);
    localStorage.setItem('Ck', Ck);
    localStorage.setItem('S', S);
    localStorage.setItem('Shop_Items', JSON.stringify(Shop_Items));
    localStorage.setItem('tense',tense);
}
function TextLoad()
{
    document.getElementById('MainP').innerHTML = 
        Main.toFixed(2) + 
        "ダイヤ <br>" + 
        (Ck+$Ck).toFixed(2) + 
        "ダイヤ/クリック<br>" + 
        (S+$S).toFixed(2) + 
        "ダイヤ/秒";
}
function Shop(yen,Money,CKK,SS)
{
        if(Main >= yen * Money)
        {
            Ck = Ck + (CKK * Ck_Plus);
            S = S + (SS * S_Plus);
            Main = Main - (yen * Money);
            document.getElementById('Shop_Ok_audio').currentTime = 0; //連続クリックに対応
            document.getElementById('Shop_Ok_audio').play();
            return yen * 1.5;
        }
        else
        {
            document.getElementById('Shop_No_audio').currentTime = 0;
            document.getElementById('Shop_No_audio').play();
        }
    return yen;
    Save();
    TextLoad();
}
function Shop_Text()
{
    ShopBox.innerHTML = '';
    Object.keys(Shop_Items).forEach(key => {
        const item = Shop_Items[key];
        
        // ボタン要素を作成
        const btn = document.createElement('button');
        btn.id = key;
        // ボタンに表示するテキストを設定
        // 例：つるはし (10ダイヤ)
        btn.innerHTML = "<img src="+ item.Img + ">" + "<p>" + item.Text + 
            ":" + ((item.Default * item.Money).toFixed(0)) + 
            "ダイヤ<br>" + 
            "一クリック毎に手に入るダイヤを" + (item.Ck * Ck_Plus) + "追加する<br>" + 
            "一秒毎に手に入るダイヤを" + (item.S * S_Plus) + "追加する</p>";
        btn.setAttribute('title', item.Title);
        if (Main >= (item.Default * item.Money)) 
        {
            btn.style.backgroundColor = "#ccc";
        } 
        else {
            btn.style.backgroundColor = '#334';//なんでや！阪神関係ないやろ
        }
        // クリックイベントを設定
        btn.onclick = function() {
            item.Money = Shop(item.Money, item.Default, item.Ck, item.S);
            
            // 購入後に表示を更新
            Shop_Text();
         
            TextLoad();
        };

        // ShopBoxにボタンを追加
        ShopBox.appendChild(btn);

    });
}
function Load()
{
    if (Main_Save !== null)
    {
        Main = Number(Main_Save);
    }
    if (Ck_Save !== null && Ck_Save > 0)
    {
        Ck = Number(Ck_Save);
    }
    if (S_Save !== null && S_Save > 0)
    {
        S = Number(S_Save);
    }
    if(Main_Plus_Save !== null)
    {
        Main_Plus = Number(Main_Plus_Save)
    }
    if (Ck_Plus_Save !== null && Number(Ck_Plus_Save) > 0)
    {
        Ck_Plus = Number(Ck_Plus_Save);
    }
    if (S_Plus_Save !== null && Number(S_Plus_Save) > 0)
    {
        S_Plus = Number(S_Plus_Save);
    }
    if(tense_save !== null)
    {
        tense = Number(tense_save);
    }
    if($Ck_Save !== null)
    {
        $Ck = Number($Ck_Save);
    }
    if($S_Save !== null)
    {
        $S = Number($S_Save);
    }
}
Load();
TextLoad();
Shop_Text();
var url = location.search;
if(url=="?a=a")
{
            document.getElementById('Shop_Ok_audio').currentTime=0; //連続クリックに対応
        document.getElementById('Shop_Ok_audio').play();
}
function I_am_a_programmer()
{
    Main = Main + 99999999;
    Ck = Ck + 99999999;
    S = S + 99999999;
}
function Tensei()
{
    if(Main >= 100000)
    {
        var i = confirm("本当に転生しますか\n"+ (Math.floor(Main/100000) + "転生ポイント手に入ります"));
        if (i)
        {
            tense = tense + (Math.floor(Main/100000));
            dels();
            Save();
            window.location.href = 'tensei.html'; 
        }
    }
    else{
        alert("まだ使えません\nあなたのような100000ダイヤ以下の人には\n使いこなせないでしょう")
    }
}