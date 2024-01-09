// ==UserScript==
// @name         hitxhot
// @namespace    http://tampermonkey.net/
// @homepage     https://raw.githubusercontent.com/love2wllw/mystatic/master/tampermonkey_scripts/hit-x-hot.js
// @version      0.2
// @description  hitxhot tool
// @author       DidiLee
// @match        https://www.hitxhot.org/gallerys/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hitxhot.org
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    async function get_src_list(url, list) {
        const response = await fetch(url);
        const html = await response.text();
        const re = /<a href=\"\/img\.html\?url=(.+?)\">/ig;
        let mc;
        while ((mc = re.exec(html)) !== null) {
            list.push(mc[1]);
        }
    }
    async function loop_page(url) {
        const list = [];
        get_src_list(url, list);
        console.log(list);
        //const response = await fetch(url);
        //const html = await response.text();
    }

    async function demo() {
        const html = await get_src_list("https://www.hitxhot.org/gallerys/OXBEb3FYSzRhODlSV0dzN2R1QTRzZz09.html");
        //const win = window.open(null, "_blank");
        //win.document.write(s);
    }

    const windowLoaded = async () => {
        const entry_title = document.querySelector("h1 .entry-title");
        const btn_start = document.createElement("a");
        btn_start.text = "聚合";
        btn_start.href = "javascript:;";
        btn_start.onclick = function () {
            loop_page("https://www.hitxhot.org/gallerys/OXBEb3FYSzRhODlSV0dzN2R1QTRzZz09.html")
        }
        entry_title.append(btn_start);
        //console.log(s);
    };
    if (["interactive", "complete"].includes(document.readyState)) {
        windowLoaded();
    } else {
        window.addEventListener("DOMContentLoaded", windowLoaded);
    }

})();