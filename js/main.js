window.onload=function(){$(".loading-screen").removeClass("active")},$(document).ready(function(){var o=!1,n=function(){var o=$(document).outerHeight(!0),n=$(window).scrollTop(),i=333*(1+n/o);$("html,body").animate({scrollTop:0},i)},i=function(){location.hash="/home"},t=function(){scrollPosition=$(this).scrollTop(),scrollPosition>=32&&$(".back-to-top").addClass("active"),scrollPosition<=32&&$(".back-to-top").removeClass("active")};$(window).bind("scroll",function(){t()}),$(".back-to-top").bind("click",function(){n()}),$(".back-button").on("touchstart mousedown",function(t){if($(window).width()<665&&0!==$(window).scrollTop()){if(o)return clearTimeout(o),o=null,n(),!1;o=setTimeout(function(){o=null,i()},300),t.preventDefault()}else i()});var e=function(){var o={};return function(n,i,t){t||(t=1234),o[t]&&clearTimeout(o[t]),o[t]=setTimeout(n,i)}}(),c=function(o){var n=$(o);n.find("p").widowFix(),n.find("h1").widowFix(),n.find("h2").widowFix()},l=function(){var o=new RegExp(/^.*\//);return o.exec(window.location.href.replace(window.location.hash,""))},a=function(){c(".project-view"),$("body").addClass("view-project"),$(document).scrollTop(0)},s=function(){c(".projects-list-view"),$("body").removeClass("view-project"),$(".project-view").removeClass("active").html(""),$(document).scrollTop(v)},u=function(o){var n=new XMLHttpRequest;return n.open("HEAD",o,!0),n.send(),404!=n.status},r=function(){var o=$(".dialog-box");c(".dialog-box"),setTimeout(function(){o.addClass("active")},10)},d=function(){$(".dialog-box").removeClass("active")},h=function(){$(".element-loader").addClass("active")},f=function(){$(".element-loader").removeClass("active")};Array.prototype.clean=function(o){for(var n=0;n<this.length;n++)this[n]==o&&(this.splice(n,1),n--);return this};var v=0,m=l(),w=function(){$(".zoom-img-overlay").removeClass("active"),$(".zoom-img-big").removeClass("horz-limit").removeAttr("style"),$(window).unbind("scroll").unbind("touchstart").bind("scroll",function(){t()})},b=function(){$(window).unbind("scroll").unbind("touchstart").bind("scroll",function(){t(),w()}).bind("touchstart",function(){w()})};$(".nda-project").bind("click",function(o){o.preventDefault()}),$(window).resize(function(){e(function(){},500,"resizeEvents")}),$(".exit-dialog-box").bind("click",function(){d()}),$(document).on("click",".zoom-img",function(){var o=$(this).attr("src"),n=$(".zoom-img-big"),i=n.attr("src",o).outerHeight(),t=$(window).height();i>t&&n.addClass("horz-limit").css("max-height",t),$(".zoom-img-overlay").addClass("active"),b()}),$(".zoom-img-overlay").bind("click",function(){w()}),$("body").on("mousedown","*",function(o){($(this).is(":focus")||$(this).is(o.target))&&"none"==$(this).css("outline-style")&&$(this).css("outline","none").on("blur",function(){$(this).off("blur").css("outline","")})});var p=function(){v=$(document).scrollTop();var o=m+location.hash.replace("#","")+"page.html";u(o)?(h(),$(".project-view").load(o,function(){f(),a()})):(r("My bad!","I probably screwed up on putting the correct URL on the link... I'll fix that soon."),i())},g=function(){var o=location.hash.split("/").clean("");o.length<=1&&i(),(2===o.length||o.length>3)&&(i(),s()),3===o.length&&"projects"===o[1]&&p()};$(window).on("hashchange",function(){g()}),"onhashchange"in window&&g();var y=function(){$(document).unbind("keyup"),C()},k=function(){$("body").prepend(atob("PGRpdiBjbGFzcz0iZWUtY29udGFpbmVyIiBzdHlsZT0iY3Vyc29yOnBvaW50ZXI7ei1pbmRleDo5O2JhY2tncm91bmQ6dXJsKCcuL2VlL2VlLmdpZicpO3Bvc2l0aW9uOmZpeGVkO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7bGVmdDowO3RvcDowIj48YXVkaW8gY2xhc3M9ImVlLWF1ZGlvIiBhdXRvcGxheSBsb29wPjxzb3VyY2Ugc3JjPSIuL2VlL2VlLm1wMyIgdHlwZT0iYXVkaW8vbXBlZyI+PHNvdXJjZSBzcmM9Ii4vZWUvZWUub2dnIiB0eXBlPSJhdWRpby9vZ2ciPjwvYXVkaW8+PC9kaXY+")),$(".ee-container").bind("click",function(){$(this).unbind("click").remove()})},C=function(){$(document).bind("keyup",function(o){78==o.which&&$(this).bind("keyup",function(o){83==o.which?$(this).bind("keyup",function(o){65==o.which?!$(".ee-container").length>0&&(k(),y()):y()}):y()})})};C()});