// ==UserScript==
// @name         Upwork external links
// @description  Skip "You are now leaving Upwork" page with external links
// @namespace    vokracko
// @author       Lukáš Vokráčko
// @include      https://www.upwork.com/*
// @version      1.0
// @grant        none
// @encoding     utf-8
// @downloadURL  https://raw.githubusercontent.com/vokracko/Upwork-external-links/master/upwork-external-links.js
// ==/UserScript==

var target = document.querySelector('body');
var config = { attributes: false, childList: true, characterData: false, subtree: true };

function replace() {
    // replace links
    var links = document.links;

    for (var i in links) {
        if (links[i].href && links[i].href.startsWith("https://www.upwork.com/leaving")) {
            if (links[i].classList.contains("url-preview-title")) {
                links[i].href = decodeURIComponent(links[i].href.substr(35));
            } else {
                http = links[i].text.startsWith('http') ? '' : 'http://';
                links[i].href = http + links[i].text;
            }
        }
    }
}

var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.addedNodes) {
            replace();
        }
    });
});

observer.observe(target, config);
