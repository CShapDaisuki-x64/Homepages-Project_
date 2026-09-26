import * as allfile from '../allfile.js';
allfile.open_main();
export function open_window(open_window_name, open_window_title) {
	let window_temp=$(`#${open_window_name}`);
	if(window_temp.length==0)
	{
		console.error("ERORR_1");
		return null;
	}
	let dialog=window_temp.clone().removeAttr("id").appendTo('body');
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
				console.log("");
				dialog.dialog("widget").css({
					position:"fixed",
					top:0,
					left:0
				})
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
				dialog.dialog("widget").css({
					position:"fixed",
					top:0,
					left:0
				})
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