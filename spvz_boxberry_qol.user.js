// ==UserScript==
// @name         spvz_boxberry_qol
// @namespace    https://github.com/robloxxa
// @version      0.0.1
// @description  Auto focus on input for scanners and error notification sound for boxberry spvz
// @author       robloxxa
// @supportURL   https://github.com/robloxxa/spvz_boxberry_qol/issues
// @match        *://spvz.boxberry.de/e*
// @icon         https://spvz.boxberry.de/apple-touch-icon.png
// @grant        GM_xmlhttpRequest
// @connect      pvz-sound.s3.yandex.net
// ==/UserScript==

(function() {
    'use strict';
    let fnkShowHintCopy = fnkShowHint;
    let context = new AudioContext();
    let buffer = null
    const play = () => {
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start();
    };

    fnkShowHint = (...opts) => {
        if (opts.length > 0 && opts[1] == 'bad') {
            play();
        }
        fnkShowHintCopy(...opts);
    }


    const response = GM_xmlhttpRequest({
        method: "GET",
        url: "https://pvz-sound.s3.yandex.net/sounds/error.mp3",
        responseType: "arraybuffer",
        onload: (res) => context.decodeAudioData(res.response, (data) => buffer = data),
    })


    document.onkeydown = function (e) {
        if (document.activeElement == document.body) {
            let input = document.querySelector("input")
            input.value = "";
            input.focus();
        }
    }
})();
