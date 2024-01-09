// ==UserScript==
// @name         hitxhot
// @namespace    http://tampermonkey.net/
// @homepage     https://raw.githubusercontent.com/love2wllw/mystatic/master/tampermonkey_scripts/hit-x-hot.js
// @version      0.1
// @description  hitxhot tool
// @author       DidiLee
// @match        https://www.hitxhot.org/gallerys/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hitxhot.org
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    async function get_src_list(url) {
        const response = await fetch(url);
        const html = await response.text();
        return html;
    }

    const windowLoaded = async () => {
        const s = await get_src_list("https://www.hitxhot.org/gallerys/OXBEb3FYSzRhODlSV0dzN2R1QTRzZz09.html");
        const win = window.open(null, "_blank");
        win.document.write(s);
        //console.log(s);
    };
    if (["interactive", "complete"].includes(document.readyState)) {
        windowLoaded();
    } else {
        window.addEventListener("DOMContentLoaded", windowLoaded);
    }

})();