// ==UserScript==
// @name         Reddit Next
// @namespace    https://taskinoz.com/
// @version      0.2
// @description  Porting the functionality of the Reddit mobile app to the desktop
// @author       Taskinoz
// @match        https://www.reddit.com/*
// @match        https://reddit.com/*
// @match        https://old.reddit.com/*
// @exclude      */submit
// @grant        none
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

(function() {
    'use strict';
    //Initialize Variables
    var threads, current, scrolllocation, smallestDiff, currentDiff, closest, scrollTo;
    var postracker = 0;
    var idArray = ["buffer"];
    var heightArray = [];
    var scrolling = window.scrollY;

    //Look for closest thread
    function compare(a,b) {
      smallestDiff = Math.abs(b - a[0]);
      closest = 0; //index of the current closest number

      for (var d = 1; d < a.length; d++) {
        currentDiff = Math.abs(b - a[d]);
        if (currentDiff < smallestDiff) {
          smallestDiff = currentDiff;
          closest = d;
        }
      }
      return closest;
    }

    //Add Fontawesome and Next Arrow
    if (($(".sitetable.nestedlisting > .thing").length)>=1){
        $("head").append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">');
        //$("head").append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>');
        $("body").append('<a class="next-thread"><i class="fa fa-arrow-down" aria-hidden="true"></i></a>');

        //Style arrow (!important to overwrite reddit styles)
        $(".next-thread").css({
            "background":"rgba(0,0,0,0.5)",
            "color":"#fff",
            "padding":"10px 13px",
            "border-radius":"100px",
            "position":"fixed",
            "bottom":"50px",
            "right":"350px",
            "font-size":"20px",
            "text-align":"center",
            "display":"inline-block",
            "transition":"0.4s",
            "transform":"translate(0px,0px)",
            "z-index":"1000000"
            //"":""
        });

        $(".next-thread").hover(function(){
            $(".next-thread").css({
                "background":"rgba(0,0,0,0.8)",
                "color":"#ddd",
                "padding":"12px 15px",
                "transform":"translate(2px,2px)"
            });
        }, function(){
            $(".next-thread").css({
                "background":"rgba(0,0,0,0.5)",
                "color":"#fff",
                "padding":"10px 13px",
                "transform":"translate(0px,0px)"
            });
        });
    }

    function getThreadIds() {
      threads = $(".sitetable.nestedlisting > .thing").length;
      current = $(".sitetable.nestedlisting > .thing");
      for (var i=1;i<=threads;i++){
          idArray.push($(current).attr("id"));
          heightArray.push($("#"+($(current).attr("id"))).position().top);
          if ($(current).next().next().attr("id") !== "morecomments"){
            current = $(current).next().next();
          }
          // else {
          //   current = $(current).next().next().next().next();
          // }
      }
    }
    $(document).ready(function(){
        //Get thread ID's
        getThreadIds();
        //Load more thread ID's
        $(".morecomments").on("click", function(){
          //Reset array
          idArray = ["buffer"];
          setTimeout(getThreadIds,5000);
          console.log(idArray);
        });
        $(".next-thread").on("click", function(){
            //If you haven't scrolled
            if (Math.floor(scrolling) == Math.floor(window.scrollY)){
              //Set scrollTo to the next thread
              scrollTo = "#"+idArray[postracker+1];
              postracker++;
              console.log("P:"+postracker+" A:"+idArray.length);
            }
            //If you have scrolled
            else {
              //Set scrollTo to the nerest thread by comparing array to element height
              scrollTo = "#"+idArray[(compare(heightArray,window.scrollY))+1];
              postracker = compare(heightArray,window.scrollY)+1;
              console.log("P:"+postracker+" A:"+idArray.length);
            }

            //Stop it from scrolling if it reaches the end
            if((postracker+1)<=idArray.length){
              //Set scroll
              scrolling = Math.floor($(scrollTo).offset().top);
              //Animated scroll
              $('html, body').animate({
                  scrollTop: $(scrollTo).offset().top
              }, 500);
            }
        });
    });//End $(document).ready()
})(); //End Tampermonkey Script
