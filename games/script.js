	fetch("/games/header.html")
	.then((response) => response.text())
	.then((data) => document.querySelector("#hedaer_div").innerHTML = data);
if(localStorage.getItem('Site_OK') != "true")
{
	let bur = document.createElement('dialog');
	bur.id="bur";
	bur.style="position:fixed;bottom:0px;left:0px;right:0px;margin:0px;width: 100%;";
	bur.innerHTML=`<iframe width="200" height="300px" src='/license.js.html'><a href='/license.html'>iframe対応してない人はここ</a></iframe><button onclick='localStorage.setItem("Site_OK","true");this.closest("dialog").close();this.closest("dialog").remove();'>同意する</button><button onclick='localStorage.setItem("Site_OK","false");window.location.href="/license.go.html";'>同意しない</button>`;
	document.body.appendChild(bur);
	bur.show();
}
