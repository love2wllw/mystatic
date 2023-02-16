// ==UserScript==
// @name         pc_ks_ctl
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  快手PC网页版非首页全屏后鼠标控制翻页
// @author       DidiLee
// @match        https://www.kuaishou.com/short-video/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function handler(e){
        e = e || window.event;
        const down = e.wheelDelta ? e.wheelDelta < 0 : e.detail > 0;
        if(!window.__wheel_lock__){
            window.__wheel_lock__ = true;
            setTimeout(()=>{ window.__wheel_lock__ = false; }, 2000);
            document.querySelector(".video-switch-" + (down ? "next" : "last")).click();
        }
        if (e.preventDefault) { e.preventDefault(); }
        return false;
    }
    window.__wheel_lock__ = false;
    window.onload = function(){
        const type = "onmousewheel" in window.document ? "mousewheel" : "DOMMouseScroll";
        window.addEventListener(type, handler, false);
    }
})();
