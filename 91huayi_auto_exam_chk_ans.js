// ==UserScript==
// @name         91huayi_auto_exam_chk_ans
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  91huayi_auto_exam_chk_ans_
// @author       Acdtms4zfx
// @match        *://*.91huayi.com/pages/exam_result.aspx?*
// @grant        none
// @license      CC BY-NC-ND 2.0 DEED
// ==/UserScript==

(function() {
    'use strict';
    alert = console.log;
    var wait_time=10;
    console.log('91huayi_auto_exam_chk_ans_v2');
    function sleep(time, unit){
        if(time == null){time = wait_time * 1000;}
        if(unit != null){time = time * 1000;}
        for(var t = Date.now();Date.now() - t <= time;);
    }
    sleep();
    if (document.querySelector("body").textContent.search("应用程序中的服务器错误。") != -1 && document.querySelector("body").textContent.search("运行时错误") != -1){
        setTimeout(function(){location.reload();},wait_time * 1000);
    };
    function setlocalStorage(name,value)
    {
        localStorage.setItem(name,escape(value));
    }
    function getsec(str)
    {
        //alert(str);
        var str1=str.substring(1,str.length)*1;
        var str2=str.substring(0,1);
        if (str2=="s")
        {
            return str1*1000;
        }
        else if (str2=="h")
        {
            return str1*60*60*1000;
        }
        else if (str2=="d")
        {
            return str1*24*60*60*1000;
        }
    }
    function getlocalStorage(name)
    {
        if(localStorage.getItem(name)!=null){
            return unescape(localStorage.getItem(name));
        }else{
            return null;
        }
    }
    function dellocalStorage(name)
    {
       localStorage.removeItem(name);
    }
    if (getlocalStorage("sub_ans")==null){
        var sub_ans = {};
    }else{
        var sub_ans = JSON.parse(getlocalStorage("sub_ans"));
    };
    if (getlocalStorage("correct_ans")==null){
        var correct_ans = {};
    }else{
        var correct_ans = JSON.parse(getlocalStorage("correct_ans"));
    };
    if (getlocalStorage("wrong_ans")==null){
        var wrong_ans = {};
    }else{
        var wrong_ans = JSON.parse(getlocalStorage("wrong_ans"));
    };
    var i, j, key, wrong_questions;
    wrong_questions = [];
    for (i=1;i<=document.querySelector("#ctl00 > div.container > div > div.cent_box > ul").childElementCount;i++){
        //wrong_questions.push(document.querySelector("#ctl00 > div.state_container > div.state_cent_box > ul > li:nth-child("+i+") > p").textContent);
        wrong_questions.push(document.querySelector("#ctl00 > div.container > div > div.cent_box > ul > li:nth-child("+i+") > p").getAttribute("title"));
    }
    console.log("wrong_questions:"+JSON.stringify(wrong_questions));
    console.log("sub_ans:"+JSON.stringify(sub_ans));
    for (key in sub_ans) {
        console.log("Q:"+key);
        if (wrong_questions.indexOf(key) != -1){
            console.log("Wrong answer -> "+sub_ans[key]);
            if (!wrong_ans.hasOwnProperty(key)){
                wrong_ans[key]=[];
            };
            wrong_ans[key].push(sub_ans[key]);
        }else{
            correct_ans[key]=sub_ans[key];
            console.log("Correct answer -> "+sub_ans[key]);
        };
    };
    console.log("sub_ans:"+JSON.stringify(sub_ans));
    console.log("correct_ans:"+JSON.stringify(correct_ans));
    console.log("wrong_ans:"+JSON.stringify(wrong_ans));
    if (document.querySelector("#ctl00 > div.container > div > div.cent_box > div.state_tips > p").textContent.trim()=="考试通过"){
        dellocalStorage("sub_ans");
        dellocalStorage("correct_ans");
        dellocalStorage("wrong_ans");
        var finish_state=true;
        for (j=1;j<=document.querySelector("#ctl00 > div.container > div > div.cent_box > ul").childElementCount;j++){
            if (document.querySelector("#ctl00 > div.container > div > div.cent_box > ul > li:nth-child("+j+") > input").value=="立即学习"){
                var finish_state=false;
                console.log("Congratulations! We will move to next class in "+wait_time+"s...");
                console.log("Next:"+document.querySelector("#ctl00 > div.container > div > div.cent_box > ul > li:nth-child("+j+") > p").title);
                setlocalStorage("lastactionts",Date.parse(new Date()));
                document.querySelector("#ctl00 > div.container > div > div.cent_box > ul > li:nth-child("+j+") > input").click();
                break;
            };
        }
    }else{
        console.log("Oh... We will take the exam again in "+wait_time+"s...");
        dellocalStorage("sub_ans");
        setlocalStorage("correct_ans",JSON.stringify(correct_ans));
        setlocalStorage("wrong_ans",JSON.stringify(wrong_ans));
        setlocalStorage("lastactionts",Date.parse(new Date()));
        document.querySelector("#ctl00 > div.container > div > div.cent_box > div.state_foot > input:nth-child(2)").click();
    };
    if (document.querySelector("#ctl00 > div.container > div > div.cent_box > div.state_foot > input:nth-child(1)").value!="申请证书"){
        setlocalStorage("lastactionts",Date.parse(new Date()));
        setTimeout(function(){location.reload();},wait_time * 1000);
    }else{
        console.log("Congratulations! It's all done~");
        setTimeout(function(){setlocalStorage("lastactionts",Date.parse(new Date()));},wait_time * 1000);
    }
})();
