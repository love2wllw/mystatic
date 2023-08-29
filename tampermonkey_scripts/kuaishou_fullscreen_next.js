// ==UserScript==
// @name         kuaishou_fullscreen_next
// @namespace    http://tampermonkey.net/
// @homepage     https://raw.githubusercontent.com/love2wllw/mystatic/master/tampermonkey_scripts/1001.js
// @version      0.2
// @description  快手PC网页版非首页全屏后鼠标控制翻页
// @author       DidiLee
// @match        https://www.kuaishou.com/short-video/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    function handler(ev){
        const e = ev || window.event;
        const down = e.wheelDelta ? e.wheelDelta < 0 : e.detail > 0;
        //console.log("down", down);
        //console.log("__wheel_lock__", window.__wheel_lock__);
        if(!window.__wheel_lock__){
            window.__wheel_lock__ = true;
            setTimeout(()=>{ window.__wheel_lock__ = false; }, 2000);
            document.querySelector(".video-switch-" + (down ? "next" : "last")).click();
        }
        if (e.preventDefault) { e.preventDefault(); }
        return false;
    }
    
    function loaded(){
        window.__wheel_lock__ = false;
        const type = "onmousewheel" in window.document ? "mousewheel" : "DOMMouseScroll";
        window.addEventListener(type, handler, false);
        //console.log("addEventListener");
    }
    
    if (["interactive", "complete"].includes(document.readyState))
        loaded();
    else
        window.addEventListener("DOMContentLoaded", loaded);
    
})();
