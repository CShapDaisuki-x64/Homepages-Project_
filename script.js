import * as allfile from './allfile.js';
await allfile.open_main();
await allfile.footer("/header.html","hedaer_div");
await allfile.footer("/footer.html","footer_div");
await allfile.footer("/nav.html","nav_div");
await allfile.footer("/share.html","nav_share_div");
await allfile.style();
allfile.a();