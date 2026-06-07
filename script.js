const url = "https://api.rss2json.com/v1/api.json?rss_url=https://syumiprogrammer256.web.fc2.com/rss.xml";
fetch(url)
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("rss");
    list.innerHTML="";
    data.items.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${item.link}">${item.title}</a>`;
      list.appendChild(li);
    });
  });
  fetch("header.html")
  .then((response) => response.text())
  .then((data) => document.querySelector("#hedaer_div").innerHTML = data);
  fetch("footer.html")
  .then((response) => response.text())
  .then((data) => document.querySelector("#footer_div").innerHTML = data);