const ShopBox = document.querySelector('.Videos');
let saved_Items;
async function LoadJson()
{
	let response = await fetch('video.json');
	saved_Items = await response.json();
	console.log(saved_Items["1s"]["title"])
	Load_View(saved_Items);
	scrollToHash();
}
function Load_View(items)
{
	ShopBox.innerHTML = '';
	Object.keys(items).forEach(key => {
		const item = items[key];
		const btn = document.createElement('div');
		btn.className = "videosty";
		btn.id = key;
		if(item.topic.nicovideonone)
		{
			btn.innerHTML = "<div class='title'>"+item.title+"</div>ID:"+key+"<br>ニコニコ動画:動画なし<br>YouTube:<a href='https://youtu.be/"+item.youtube+"'>https://youtu.be/"+item.youtube+"</a>";
		}
		else
		{
			btn.innerHTML = "<div class='title'>"+item.title+"</div>ID:"+key+"<br>ニコニコ動画:<a href='https://www.nicovideo.jp/watch/"+item.nicovideo+"'>https://www.nicovideo.jp/watch/"+item.nicovideo+"</a><br>YouTube:<a href='https://youtu.be/"+item.youtube+"'>https://youtu.be/"+item.youtube+"</a>";
		}
		if(item.topic.VoiceBig)
		{
			btn.innerHTML = btn.innerHTML + "<div class='EX'>⚠注意:騒音</div>"
		}
		if(item.topic.remake)
		{
			btn.innerHTML = btn.innerHTML + "<div class='info'>🛈️情報:リメイク<br>元動画ID:<a href='video.html#"+item.topic.remake2+"'>"+item.topic.remake2+"</a></div>"
		}
		ShopBox.appendChild(btn);

	});
}
function scrollToHash() {
	const hash = window.location.hash;
	if (hash) {
		const targetElement = document.getElementById(hash.substring(1));
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'auto', block: 'start' });
		}
	}
}
const text_form = document.getElementById("ID");

text_form.addEventListener("keydown", test_event);

function test_event(e) {
	if (e.key === "Enter") {
	e.preventDefault();
	window.location.href = 'video.html#' + document.getElementById('ID').value;
	}
	return false;
}
window.addEventListener('hashchange', scrollToHash);
LoadJson();
