// ==UserScript==
// @name         Reddit Next
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.reddit.com/*
// @match        https://reddit.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //Initialize Variables
    var threads, current, scrolllocation;
    var postracker = 0;
    var idArray = ["buffer"];

    //Add Fontawesome and Next Arrow
    if (($(".sitetable.nestedlisting > .thing").length)>=1){
        $("head").append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">');
        //$("head").append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>');
        $("body").append('<a class="next-thread"><i class="fa fa-arrow-down" aria-hidden="true"></i></a>');

        //Style arrow (!important to overwrite reddit styles)
        $(".next-thread").css({
            "background":"rgba(0,0,0,0.5)",
            "color":"#fff",
            "padding":"10px",
            "border-radius":"100px",
            "position":"fixed",
            "bottom":"50px",
            "right":"350px",
            "font-size":"20px",
            "text-align":"center",
            "display":"inline-block",
            "width":"24px",
            "transition":"0.4s",
            "transform":"translate(0px,0px)"
            //"":""
        });

        $(".next-thread").hover(function(){
            $(".next-thread").css({
                "background":"rgba(0,0,0,0.8)",
                "color":"#ddd",
                "padding":"12px",
                "transform":"translate(1px,1px)"
            });
        }, function(){
            $(".next-thread").css({
                "background":"rgba(0,0,0,0.5)",
                "color":"#fff",
                "padding":"10px",
                "transform":"translate(0px,0px)"
            });
        });
    }


    threads = $(".sitetable.nestedlisting > .thing").length;
    //console.log(threads);

    current = $(".sitetable.nestedlisting > .thing");
    for (var i=1;i<=threads;i++){
        idArray.push($(current).attr("id"));
        current = $(current).next().next();
    }
    //console.log(idArray);
    $(document).ready(function(){
        $(".next-thread").on("click", function(){
            //scrolllocation = ($("idArray").position()).top;
            document.location.href = "#"+idArray[postracker];
            postracker++;
            //Animated scroll
            $('html, body').animate({
                scrollTop: $("#"+idArray[postracker]).offset().top
            }, 500);
        });
    });//End $(document).ready()
})(); //End Tampermonkey Script
