import * as allfile from '../allfile.js';
await allfile.open_main();
await allfile.style();

await allfile.footer("/tool/header.html","hedaer_div");
await allfile.footer("/nav.html","nav_div");
await allfile.footer("/share.html","nav_share_div");
await allfile.footer("/footerforall.html","footer_div");
allfile.a();