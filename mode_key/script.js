import * as allfile from '../allfile.js';
allfile.open_main();
let darkid="";
export function open_window(open_window_name, open_window_title) {
	let window_temp=$(`#${open_window_name}`);
	if(window_temp.length==0)
	{
		console.error("ERORR_1");
		return null;
	}
	let dialog=window_temp.clone().removeAttr("id").css("display", "").appendTo('body');
	dialog.dialog
	(
		{
			modal:false,
			title:open_window_title,
			closeText:"✕",
			close:function()
			{
				$(window).off('resize.' + open_window_name);
				$(this).dialog('destroy').remove();
			}
		}
	)
	let width_temp=100;
	let height_temp=100;
	let size=false;
	let position_temp="";
	let top_temp="";
	let left_temp="";
	const titlebar = dialog.dialog("widget").find(".ui-dialog-titlebar");
	const button=$
	(
		`<button type="button" class="my_bigbutton ui-button ui-corner-all ui-widget ui-button-icon-only ui-dialog-titlebar-maximize"">
			<span class="ui-button-icon ui-icon ui-icon-extlink"></span>'
			<span class="ui-button-icon-space"> </span>最大化
		</button>`
	)
	titlebar.append(button);
	button.on
	(
		"click",function()
		{
			if(size==false)
			{
				position_temp = dialog.dialog("widget").css("position");
				height_temp=dialog.dialog("option","height");
				width_temp=dialog.dialog("option","width");
				top_temp = dialog.dialog("widget").css("top");
				left_temp = dialog.dialog("widget").css("left");
				dialog.dialog("widget").addClass("maximized");
				console.log("");
				dialog.dialog("option",{
					width:$(window).width(),
					height:$(window).height(),
					position:{
						my:"left top",
						at:"left top",
						of:window
					}
				});
				size = true;
			}
			else if(size==true)
			{
				dialog.dialog("widget").removeClass("maximized");
				dialog.dialog("option",{
					width:width_temp,
					height:height_temp
				});
				dialog.dialog("widget").css({
					position: position_temp,
					top:top_temp,
					left:left_temp
				})
				size=false;
			}
			else
			{
				console.error("ERORR_2");
			}
		}
	)
	$(window).on("resize." + open_window_name, function(){
		if(size==true)
		{
				dialog.dialog("option",{
					width:$(window).width(),
					height:$(window).height(),
					position:{
						my:"left top",
						at:"left top",
						of:window
					}
				});
				size = true;
		}
	})
	titlebar.on
	(
		"dblclick",function()
		{
			button.trigger("click");
		}
	)
}
window.open_window=open_window;
let css=document.createElement("style");
let mode_acss="#1ae";
if(localStorage.getItem("site_color"))
{
	mode_acss=localStorage.getItem("site_color");

}
else
{

}
if(localStorage.getItem("site_dark")=="true")
{
	console.log("ab");
	css.innerHTML=`:root{
			--back_img:url("/mode_key/img/back_dark.avif");
			--button_back_color:#fff1;
			--taskbar_back_color:${mode_acss};
			--taskbar_button_back_color:#8884;
			--taskbar_border_back_color:#0004;
			--taskbar_text_color:#eee;
			--button_text_color:#ddd;
			color-scheme: light dark;
		}`
	document.body.innerHTML+="<link rel='stylesheet' href='https://ajax.googleapis.com/ajax/libs/jqueryui/1.13.2/themes/dot-luv/jquery-ui.css'>";
}
else
{
	css.innerHTML=`:root{
			--back_img:url("/mode_key/img/back.avif");
			--button_back_color:#0001;
			--taskbar_back_color:${mode_acss};
			--taskbar_button_back_color:#eee4;
			--taskbar_border_back_color:#0004;
			--taskbar_text_color:#eeec;
			--button_text_color:#ddd;
		}`
	document.body.innerHTML+="<link rel='stylesheet' href='https://ajax.googleapis.com/ajax/libs/jqueryui/1.13.2/themes/base/jquery-ui.css'>";
}
document.body.appendChild(css);
const html_id_start=document.getElementById("start");
const html_id_ouy=document.getElementById("ouy");
function start_open()
{
	html_id_start.style="";
	html_id_ouy.style="";
}
function start_close()
{
	html_id_start.style="display:none";
	html_id_ouy.style="display:none";
}
window.start_open=start_open;
window.start_close=start_close;