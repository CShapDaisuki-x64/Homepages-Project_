const desktop = document.querySelector('.desktop');
const dialogtemplate = document.querySelector('.dialog-template');
const taskbar=document.querySelector(".taskbar");
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
		_div.innerHTML=("<iframe title='"+key+"'width='100%' height='99%' src='"+item.app+"'></iframe>");
		dialogtemplate.appendChild(_div);
		const taskbarbutton = document.createElement('button');
		taskbarbutton.id=(key+"taskbar");
		taskbarbutton.innerHTML=("<img src='"+item.img+"'alt='"+item.name+"'>"+item.name);
		taskbarbutton.onclick = function Event(){
			open_window(key ,item.name);
		};
		taskbar.appendChild(taskbarbutton);
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
