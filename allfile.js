export function open_main()
{
	if(localStorage.getItem('Site_OK') != "true")
{
	let bur = document.createElement('dialog');
	bur.id="bur";
	bur.style="position:fixed;bottom:0px;left:0px;right:0px;margin:0px;width: 100%;";
	bur.innerHTML=`<iframe width="200" height="300px" src='/license.js.html'><a href='/license.html'>iframe対応してない人はここ</a></iframe><button onclick='localStorage.setItem("Site_OK","true");this.closest("dialog").close();this.closest("dialog").remove();'>同意する</button><button onclick='localStorage.setItem("Site_OK","false");window.location.href="/license.go.html";'>同意しない</button>`;
	document.body.appendChild(bur);
	bur.show();
}
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
}
