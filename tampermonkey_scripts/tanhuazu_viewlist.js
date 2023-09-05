// ==UserScript==
// @name         tanhuazu_viewlist
// @homepage     https://raw.githubusercontent.com/love2wllw/mystatic/master/tampermonkey_scripts/tanhuazu_viewlist.js
// @version      0.1
// @description  try to take over the world!
// @author       DidiLee
// @match        https://www.tanhuazu.com/whats-new/*
// @match        https://www.tanhuazu.com/forums/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tanhuazu.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    async function getPreviewDataAsync(pathName, title, hrefUrl, previewUrl, token){
        let url = "https://www.tanhuazu.com";
        url += previewUrl;
        url += "?_xfRequestUri=";
        url += pathName;
        url += "&_xfWithData=1&_xfToken=";
        url += token;
        url += "&_xfResponseType=json";
        const response = await fetch(url);
        const json = await response.json();
        let content = json.html.content;
        const re = /<img src=\"(.+)\" data-url/gi;
        const gp = re.exec(content);
        const img = gp !== null ? gp[1] : null;
        let div = "<div><img src=\""+img+"\" style=\"width:640px;height:600px\" /></div>";
        div += "<div style=\"line-height:26px\"><a target=\"_blank\" href=\""+hrefUrl+"\">"+title+"</a></div>";
        const $div = document.createElement("div");
        $div.setAttribute("style", "float:left;margin:10px 0 0 10px;width:640px;height:680px");
        $div.innerHTML = div;
        document.querySelector(".structItemContainer").append($div);
    }
    async function viewTransform() {
        const pathName = document.location.pathname;
        const token = document.querySelector("html").getAttribute("data-csrf");
        const doms = document.querySelectorAll("a[data-preview-url]");
        const items = [];
        for(const dom of doms){
            ///threads/27305/preview
            ///whats-new/posts/583616/
            items.push({
                text:dom.innerText,
                href:dom.getAttribute("href"),
                view:dom.getAttribute("data-preview-url")
            });
        }
        document.querySelector(".structItemContainer").setAttribute("style", "display:block;clear:both");
        document.querySelector(".structItemContainer").innerHTML = "";
        //console.log(items);
        //const title = doms[0].innerText;
        //const previewUrl = doms[0].getAttribute("data-preview-url");
        //const data = await getPreviewDataAsync(title, pathName, previewUrl, token);
        //console.log(data);
        await Promise.all(items.map((item) => getPreviewDataAsync(pathName, item.text, item.href, item.view, token)));
        /*for(const item of items){
            ///threads/27305/preview
            ///whats-new/posts/583616/
            console.log(item.getAttribute("data-preview-url"));
        }*/
    };
    const windowLoaded = () =>{
        viewTransform();
    };

    if (["interactive", "complete"].includes(document.readyState))
        windowLoaded();
    else
        window.addEventListener("DOMContentLoaded", windowLoaded);

})();
