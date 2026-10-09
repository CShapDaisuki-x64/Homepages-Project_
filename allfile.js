const my_path = window.location.origin;4
const loot_path = String(window.location.href).slice(my_path.length);
export function open_main()
{
	const roop=loot_path.split("/").filter(x => x !== ""&& x !== "index.html"&& x !== "index");
	console.log(loot_path,roop,"|0");
	console.log(loot_path,roop,"|4");
	let pan=[[],[]];
	for(let i=0;i<roop.length-1;i++)
	{
		console.log(roop[i],"|5");
		switch(roop[i])
		{
			case "games":
				pan[0][i]="Games"
				break;
			case "tool":
				pan[0][i]="Tool"
				break;
			default:
				pan[0][i]=roop[i];
				break;
		}
		if(i==0)
		{
			pan[1][0]=roop[0];
		}
		else
		{
			pan[1][i]=String(pan[1][i-1]+"/"+roop[i]);
		}
	}
	pan[0].push(document.getElementById("hedaer_div_two").querySelector("h2").innerText);
	if(roop.length!==0)
	{
		if(pan[0].length==1)
		{
			pan[1].push(roop[roop.length - 1]);
		}
		else
		{
			pan[1].push(pan[1][pan[1].length - 1]+"/"+roop[roop.length -1])
		}
	}
	console.log(pan[0].join("/")+"\n"+pan[1].join("/")+"|6");
	let js_html_pan_main=document.createElement("div");
	js_html_pan_main.className="pankuzu";
	let jsa=document.createElement("a");
	jsa.href="/index.html";
	jsa.innerText="趣味プログラマー人間";
	js_html_pan_main.appendChild(jsa);
	if(roop.length!==0)
	{
		let js_html_pan_kugirip = document.createElement("span");
		js_html_pan_kugirip.innerText = "/ ";
		js_html_pan_main.appendChild(js_html_pan_kugirip);
	}
	for(let i=0;i<pan[1].length;i++)
	{
		let js_html_pan=document.createElement("a");
		js_html_pan.id=i+"pankuzu";
		js_html_pan.href="/"+pan[1][i];
		js_html_pan.innerText=pan[0][i];
		js_html_pan_main.appendChild(js_html_pan);
		if(i < pan[1].length - 1)
		{
			let js_html_pan_kugiri = document.createElement("span");
			js_html_pan_kugiri.innerText = "/ ";
			js_html_pan_main.appendChild(js_html_pan_kugiri);
		}
	}
	document.getElementsByTagName("header")[0].appendChild(js_html_pan_main);

	let before_scroll_x = 0;
let before_scroll_y = 0;
let fullscreen_target = null;
	if(localStorage.getItem("Site_pr")!="false")
	{
		let URL="index.html";
		let IMG="pr_home.avif";
		let js_randoms = Math.floor(Math.random() * 5);
		htm_pr.forEach(function(htm_pr){
			if(js_randoms>4){
				js_randoms=0;
			}
			if(0==js_randoms)
			{
				console.log("Diamond_Clicker")
				url_img("Diamond_Clicker/index.html","pr_diamond.avif")
			}
			else if(1==js_randoms)
			{
				console.log("mode_key");
				url_img("mode_key/index.html","pr_modekey.avif");
			}
			else if(2==js_randoms)
			{
				console.log("Games");
				url_img("games/index.html","pr_games.avif");
			}
			else if(3==js_randoms)
			{
				console.log("url_long");
				url_img("tool/very_long_url_ja_jp_hello_hi_kawaii_very_long_url.html","pr_longurl.avif")
			}
			else
			{
				console.log("homepage");
				url_img("index.html","pr_home.avif")
			}
			htm_pr.style=`width: min(50svw,300px);
				height: min(55svw,320px);
				padding: 0;
				border:1px solid #000;
				border-radius:0;
				background-color:#00000000;
				font-size:16px;`
			htm_pr.onclick=function(){window.open(`/${URL}`);};
			htm_pr.innerHTML=`
				PR<img style="width: 100%;aspect-ratio: 1/1;" src="/img/pr/${IMG}">
				`;
			js_randoms++;
		});
		function url_img(url,img)
		{
			URL=url;
			IMG=img;
		}
	}
	else
	{
		htm_pr.forEach(function(htm_pr){
			htm_pr.remove();
		});
	}

	if(localStorage.getItem('Site_OK')?.length >= 1)
	{
		let bur = document.createElement('dialog');
		bur.id = "bur";
		bur.style = "bottom:0px;left:35px;right:0px;margin:0px;width:calc(100% - 35px);z-index:1005;";
		bur.innerHTML = `
			<iframe height="300px" src="/license.js.html">
				<a href="license.html">iframe対応してない人はここ</a>
			</iframe>
			<button>OK</button>
		`;
		document.body.appendChild(bur);
		bur.querySelector("button").onclick = () => {
			localStorage.removeItem("Site_OK");
			bur.close();
			bur.remove();
		};
		bur.show();
	}
	const taskbar = document.querySelectorAll(".x_go");
	if(taskbar.length)
	{
		taskbar.forEach((yoso)=>{
		yoso.addEventListener("wheel", (event) => {
			event.preventDefault();
			yoso.scrollLeft += event.deltaY;
		}, { passive: false });
		});
	}



	const html_class_video=document.getElementsByClassName("video");
	for (let i=0;i<html_class_video.length;i++)
	{
		let all=document.createElement("div");
		all.id=`html_class_video_all_autoID_${i}`;
		let video=document.createElement("video");
		let source=document.createElement("source");
		source.src=html_class_video[i].getAttribute("my-file");
		video.appendChild(source);
		html_class_video[i].id=`html_class_video_autoID_${i}`;
		let banner=document.createElement("input");
		banner.type="range";
		banner.value=0;
		let button=document.createElement("button");
		button.innerHTML="<img src='/img/go.svg'alt='再生'>";
		let video_go="false";
		video.addEventListener("ended", function()
		{
			video_go = "roop";
			banner.style="filter:brightness(50%);pointer-events:none;";
			button.innerHTML ="<img src='/img/road.svg' alt='最初から再生'>";
		});
		video.addEventListener("loadedmetadata", function()
		{
			banner.max=video.duration;
			banner.step = 1 / 60;
		});
		banner.addEventListener("input", function(){
			if(video_go=="roop")
			{
				banner.value=banner.max;
			}
			else
			{
				video.currentTime=banner.value;
			}
		});
		video.addEventListener("timeupdate", function(){
			banner.value=video.currentTime;
			banner.style="";
		});
		video.addEventListener("pause", function(){
			if(video.ended)
			{
				return;
			}
			button.innerHTML="<img src='/img/go.svg'alt='再生'>";
			banner.style="";
			video_go="false";
		});
		video.addEventListener("play", function(){
				button.innerHTML="<img src='/img/stop.svg'alt='一時停止'>";
				banner.style="";
				video_go="true";
		});
		button.onclick=function(){
			if(video_go=="false")
			{
				video.play();
				button.innerHTML="<img src='/img/stop.svg'alt='一時停止'>";
				video_go="true";
			}
			else if(video_go=="true")
			{
				video.pause();
				button.innerHTML="<img src='/img/go.svg'alt='再生'>";
				video_go="false";
			}
			else
			{
				banner.style="";
				video.currentTime = 0;
				banner.value = 0;
				video.play();
				button.innerHTML="<img src='/img/stop.svg'alt='一時停止'>";
				video.play();
				video_go="true";
			}
		};
		video.onclick=function(){
			if(video_go=="false")
			{
				video.play();
				button.innerHTML="<img src='/img/stop.svg'alt='一時停止'>";
				video_go="true";
			}
			else if(video_go=="true")
			{
				video.pause();
				button.innerHTML="<img src='/img/go.svg'alt='再生'>";
				video_go="false";
			}
			else
			{
				video.currentTime = 0;
				banner.value = 0;
				video.play();
				button.innerHTML="<img class='svg_nocolor_no' src='/img/stop.svg'alt='一時停止'>";
				video.play();
				video_go="true";
			}
		};

		let pipbutton= document.createElement("button");
		pipbutton.onclick=function(){ if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else if (document.pictureInPictureEnabled) {
    video.requestPictureInPicture();
  };}
	pipbutton.className="svg_nocolor";
	pipbutton.innerHTML="<img src='/img/pip.svg'alt='ピクチャインピクチャ'>";
	let big=document.createElement("button");
big.onclick=function()
{const sites = document.querySelector(".sites");

	if(!document.fullscreenElement)
	{
		console.log("fullscreen前:", sites.scrollTop);

		before_scroll_x = sites.scrollLeft;
		before_scroll_y = sites.scrollTop;

		fullscreen_target = all;

		all.requestFullscreen();
	}
	else
	{
		document.exitFullscreen();
	}
};
	big.className="svg_nocolor";
	big.innerHTML="<img src='/img/big_size_max.svg'alt='最大化'>";
	let ue=document.createElement("div");
	ue.className="video_ue";
	banner.className="video_banner";
	button.className="svg_nocolor";
	all.appendChild(video);
	ue.appendChild(button);
	ue.appendChild(pipbutton);
	ue.appendChild(big);
	ue.appendChild(banner);
	all.appendChild(ue)
	html_class_video[i].appendChild(all);
	}


document.addEventListener("fullscreenchange", () =>
{
    if(document.fullscreenElement === null)
    {
        const sites = document.querySelector(".sites");

        function restore()
        {
            const maxScroll = sites.scrollHeight - sites.clientHeight;

            console.log(
                "復元チェック:",
                "現在", sites.scrollTop,
                "最大", maxScroll,
                "保存", before_scroll_y
            );

            if(maxScroll >= before_scroll_y)
            {
                sites.scrollLeft = before_scroll_x;
                sites.scrollTop = before_scroll_y;

                console.log("復元完了:", sites.scrollTop);
            }
            else
            {
                requestAnimationFrame(restore);
            }
        }

        requestAnimationFrame(restore);
    }
});
}
export function footer(fun_pass,fun_id)
{
	fetch(fun_pass)
	.then((response) => response.text())
	.then((data) => document.querySelector("#"+fun_id).innerHTML = data);
}
export function style()
{
	let style_html = document.createElement('style');
const thema = window.matchMedia('(prefers-color-scheme: dark)').matches;
const dark =
`	:root{
		color-scheme: light dark;
		--bck_color:#444;
		--haf_bck_color:#16b;
		--haf_link_in_color:#bbb;
		--haf_img_rod:invert(100%);
		--acs_color:#ddd;
		--btn_bck_in_color:#777;
		--btn_bdr_in_color:#999;
		--btn_bck_color:#555;
		--btn_bdr_color:#777;
		--btn_txt_color:#ddd;
		--btn_in_img_rod:brightness(120%);
		--link_color:#29d;
		--link_color_ace:#c6e;
		--link_color_ace_in:#e9e;
		--kmk-vdo_bck_color:#27b;
		--vdo_acs_color:#ddd;
		--vdo_link_color:#cdd;
		--vdo_link_in_color:#bbb;
		--info_exp:#a80;
		--info_info:#06a;
		--info_vex:#a00;
	} `;
const notdark =
`:root{
	--bck_color:#eee;

	--haf_bck_color:#0ce;
	--haf_link_in_color:#456;
	--haf_img_rod:invert(0%);

	--acs_color:#112;

	--btn_bck_color:#d5d5d5;
	--btn_bdr_color:#b5b5b5;
	--btn_bck_in_color:#dddddd;
	--btn_bdr_in_color:#bbbbbb;
	--btn_txt_color:#112;
	--btn_in_img_rod:brightness(120%);

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
}
const htm_pr=document.querySelectorAll('.pr_box');

export function pr(){

}
export async function a()
{
	try
	{
		const count=await fetch("https://syumi-programmer-ningen.pages.dev/api/counter");
		if(!count.ok)
		{
			throw new Error("HTTP ERROR"+count.status);
		}
		const data=await count.json();
		const a=document.getElementById("header_num");
	}
	catch(error)
	{
		console.error("失敗"+error);
		document.getElementById("header_num").innerText = "?";
	}
}
