	fetch("/header.html")
	.then((response) => response.text())
	.then((data) => document.querySelector("#hedaer_div").innerHTML = data);
	fetch("/footer.html")
	.then((response) => response.text())
	.then((data) => document.querySelector("#footer_div").innerHTML = data);
if(localStorage.getItem('Site_OK') != "true")
{
	window.location.href=("/license.html?q="+window.location.href);
}
