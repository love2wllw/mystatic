// ==UserScript==
// @name         hitxhot
// @namespace    http://tampermonkey.net/
// @homepage     https://raw.githubusercontent.com/love2wllw/mystatic/master/tampermonkey_scripts/hit-x-hot.js
// @downloadURL  https://raw.githubusercontent.com/love2wllw/mystatic/master/tampermonkey_scripts/hit-x-hot.js
// @updateURL    https://raw.githubusercontent.com/love2wllw/mystatic/master/tampermonkey_scripts/hit-x-hot.js
// @version      0.2.4
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
    async function loop_page(main_url) {
        let list = [];
        let page = 0;
        while (true) {
            try {
                page++;
                const url = `${url}?page=${page}`;
                const arr = await get_src_list(url);
                console.log(url, arr.length);
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
    function setWinStyle(doc, cssText) {
        var domHead = doc.getElementsByTagName('head')[0];
        var domStyle = doc.createElement('style');
        domStyle.type = 'text/css';
        domStyle.rel = 'stylesheet';
        domStyle.appendChild(document.createTextNode(cssText));
        domHead.appendChild(domStyle);
    }
    const windowLoaded = async () => {
        const entry_title = document.querySelector("h1.entry-title");
        const main_url = entry_title.querySelector("a").href;
        const btn_start = document.createElement("a");
        btn_start.style.marginLeft = "20px";
        btn_start.style.color = "#f00";
        btn_start.text = "(聚合)";
        btn_start.href = "javascript:;";
        btn_start.setAttribute("state", "stop");
        btn_start.onclick = async function () {
            let list = [];
            if (btn_start.getAttribute("state") == "stop") {
                btn_start.setAttribute("state", "start");
                list = await loop_page(main_url);
                btn_start.setAttribute("state", "completed");
                btn_start.text = "(聚合=>完毕)";
            } else if (btn_start.getAttribute("state") == "completed") {
                if (list.length > 0) {

                    const win = window.open(null, "_blank");
                    const winDoc = win.document;
                    setWinStyle(winDoc, `
                        .main{
                            width:100%;
                            display: flex;
                            flex-flow: row wrap;
                        }
                        .main img{
                            width:100px;
                            height:150px;
                        }
                    `);
                    const div = winDoc.createElement("div");
                    div.setAttribute("class", "main");
                    list.forEach(val => {
                        const img = winDoc.createElement("img");
                        img.setAttribute("src", val);
                        div.append(img);
                    });
                    winDoc.body.append(div);

                }
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