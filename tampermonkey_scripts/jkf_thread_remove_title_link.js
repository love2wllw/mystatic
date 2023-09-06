// ==UserScript==
// @name         jkf_thread_remove_title_link
// @namespace    http://tampermonkey.net/
// @homepage     https://raw.githubusercontent.com/love2wllw/mystatic/master/tampermonkey_scripts/jkf_thread_remove_title_link.js
// @version      0.1
// @description  移除详情页标题的超链接
// @author       DidiLee
// @match        https://www.jkforum.net/thread-*-*-*.html
// @match        https://www.jkforum.net/forum.php?mod=viewthread&tid=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jkforum.net
// @grant        none
// ==/UserScript==

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty("replaceWith")) {
      return;
    }
    Object.defineProperty(item, "replaceWith", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function replaceWith() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(
            isNode ? argItem : document.createTextNode(String(argItem)),
          );
        });

        this.parentNode.replaceChild(docFrag, this);
      },
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

(function() {
    'use strict';

    function loaded(){
        const $titleHd = document.querySelector(".title-hd");
        const $title = document.querySelector(".title-cont").querySelectorAll("a")[1];
        //const $newCont = document.createElement("div");
        //newCont.setAttribute("class", "title-cont");
        //newCont.innerHTML = $title.innerHTML;
        //titleHd.append(newCont);
        const $newTag = document.createElement("h1");
        $newTag.innerHTML = $title.innerText;
        $title.replaceWith($newTag);
    }

    if (["interactive", "complete"].includes(document.readyState)){
        loaded();
    } else {
        window.addEventListener("DOMContentLoaded", loaded);
    }

})();
