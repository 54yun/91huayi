// ==UserScript==
// @name         91huayi_auto_class_v3
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  try to take over the world!
// @author       Acdtms4zfx
// @match        *://*.91huayi.com/course_ware/*
// @grant        none
// ==/UserScript==

// 公需课 ： 自动尝试跳过问题
// 选修课 ： 自动尝试跳过课程
// 这是一个测试版本 试试能不能硬冲跳过公需课课间问题

(function() {
    'use strict'
    alert = console.log;
    console.log('91huayi_auto_class_v3');
    var wait_time=6;
    function enableStartExam(){
        var btn_exam = $("#jrks");
        showExam(true);
        var p = $("<p>   </p>");
        p.appendTo(btn_exam);
        setTimeout(() => {
            p.trigger('click');
        }, wait_time);
    }
    function sleep(time, unit){
        if(time == null){time = wait_time * 1000;}
        if(unit != null){time = time * 1000;}
        for(var t = Date.now();Date.now() - t <= time;);
    }
    sleep();
    var fuc = setInterval(function() {
        closeBangZhu();
        if (typeof(banSeek)=="undefined"){
            console.log("无法判断是否能自动跳过课程，请自己尝试。");
        }else{
            if (banSeek=="off"){
                enableStartExam();
            };
        };
        if (document.querySelector("#video > div > div.pv-skin-blue.pv-video-bottom.pv-subtitle-hide.pv-base-control.pv-stream-hide > div.pv-controls > div.pv-controls-left > button").className.indexOf('pv-icon-pause') != -1){
            document.querySelector("#video > div > div.pv-skin-blue.pv-video-bottom.pv-subtitle-hide.pv-base-control.pv-stream-hide > div.pv-controls > div.pv-controls-left > button").click();
        };
        initialSign();
        document.querySelector("#video > div > div.sign-in-menu > div > div.sign-in-wrap > div.sign-in-wrap_btn > span").click();
        if (document.querySelector("#video > div > div.pv-ask-modal-wrap > div > div.pv-ask-content.pv-ask-content-noimg > div.pv-ask-right > div > h3")){
            document.querySelector("#video > div > div.pv-ask-modal-wrap > div > div.pv-ask-foot > button.pv-ask-skip.pv-hide").click();
            initialSign();
            document.querySelector("#video > div > div.sign-in-menu > div > div.sign-in-wrap > div.sign-in-wrap_btn > span").click();
        };
        document.querySelector("#jrks").click();
    },wait_time * 1000);
})();
