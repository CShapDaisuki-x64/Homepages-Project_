import { open_window } from "./script.js";
const desktop = document.querySelector('.desktop');
const dialogtemplate = document.querySelector('.dialog-template');
const taskbar=document.querySelector(".taskbar");
const start=document.querySelector("#start_in");

let saved_Items;
async function LoadJson()
{
	let response = await fetch('app.json');
	saved_Items = await response.json();
	Load_View(saved_Items);
}
function Load_View(items)
{
	Object.keys(items).forEach(key => {
		const item = items[key];
		const _div = document.createElement('div');
		_div.id= (key) ;
		_div.style="display:none;";
		_div.innerHTML=(`<iframe title="${key}"
											src="${item.app}"></iframe>`);
		dialogtemplate.appendChild(_div);
		const taskbarbutton = document.createElement('button');
		taskbarbutton.id=(key+"taskbar");
		taskbarbutton.innerHTML=("<img src='"+item.img+"'alt='"+item.name+"'>"+item.name);
		taskbarbutton.onclick = function Event(){
			open_window(key ,item.name);
		};
		taskbar.appendChild(taskbarbutton);

		const startbutton = document.createElement('button');
		startbutton.id=(key+"start");
		startbutton.innerHTML=("<img src='"+item.img+"'alt='"+item.name+"'>"+item.name);

		startbutton.onclick = function Event(){
			open_window(key ,item.name);
		};
		start.appendChild(startbutton);
		if(item.desktop==true)
		{
			const btn = document.createElement('button');
			btn.id = (key+"button");
			btn.innerHTML = ("<img src='"+item.img+"'alt='"+item.name+"'><p>"+item.name+"</p>");
			btn.onclick = function Event(){
				open_window(key ,item.name);
			};
			desktop.appendChild(btn);
		}
	});
}
LoadJson();
