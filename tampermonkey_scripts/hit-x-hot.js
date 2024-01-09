// ==UserScript==
// @name         hitxhot
// @namespace    http://tampermonkey.net/
// @homepage     https://raw.githubusercontent.com/love2wllw/mystatic/master/tampermonkey_scripts/hit-x-hot.js
// @downloadURL  https://raw.githubusercontent.com/love2wllw/mystatic/master/tampermonkey_scripts/hit-x-hot.js
// @updateURL    https://raw.githubusercontent.com/love2wllw/mystatic/master/tampermonkey_scripts/hit-x-hot.js
// @version      0.2.2
// @description  hitxhot tool
// @author       DidiLee
// @match        https://www.hitxhot.org/gallerys/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hitxhot.org
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    async function get_src_list(url) {
        const response = await fetch(url);
        const html = await response.text();
        const re = /<a href=\"\/img\.html\?url=(.+?)\">/ig;
        let mc;
        const arr = [];
        while ((mc = re.exec(html)) !== null) {
            arr.push(mc[1]);
        }
        return arr;
    }
    async function loop_page(url) {
        let list = [];
        let page = 0;
        while (true) {
            try {
                page++;
                const arr = await get_src_list(`${url}?page=${page}`);
                if (arr.length == 0) break;
                list = list.concat(arr);
                await delay(500);
            } catch (error) {
                console.error(error);
                break;
            }
        }
        return list;
    }
    const windowLoaded = async () => {
        const entry_title = document.querySelector("h1.entry-title");
        const main_url = entry_title.querySelector("a").href;
        const btn_start = document.createElement("a");
        btn_start.style.marginLeft = "20px";
        btn_start.text = "(聚合)";
        btn_start.href = "javascript:;";
        btn_start.setAttribute("state", "stop");
        btn_start.onclick = async function () {
            if (btn_start.getAttribute("state") == "stop") {
                btn_start.setAttribute("state", "start");
                const list = await loop_page(main_url);
                btn_start.setAttribute("state", "stop");
                console.log(list);
            }
        }
        entry_title.append(btn_start);
    };
    if (["interactive", "complete"].includes(document.readyState)) {
        windowLoaded();
    } else {
        window.addEventListener("DOMContentLoaded", windowLoaded);
    }

})();