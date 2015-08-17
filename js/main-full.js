		window.onload = function(){
			$('.loading-screen').removeClass('active');
		}
		$(document).ready(function(){
			var tapped=false;
			var scrollToTop = function(){
				var totalHeight = $(document).outerHeight(true);
				var currentScrollPos = $(window).scrollTop();
				var animationTiming = 333 * (1+(currentScrollPos/totalHeight));
				$('html,body').animate({
					scrollTop: 0
				}, animationTiming);
			}
			var goHome = function(){
				location.hash = '/home';
			}
			var scrollToTopBind = function(){
				scrollPosition = $(this).scrollTop();
			    if (scrollPosition >= 32) {
			        $('.back-to-top').addClass('active');
			    }
			    if (scrollPosition <= 32){
			    	$('.back-to-top').removeClass('active');
			    }
			}
			$(window).bind('scroll', function() {
			    scrollToTopBind();
			});
			$('.back-to-top').bind('click',function(){
				scrollToTop();
			})
			$(".back-button").on("touchstart mousedown",function(e){
				if($(window).width() < 665 && $(window).scrollTop() !== 0){
					if(!tapped){ //if tap is not set, set up single tap
				      tapped=setTimeout(function(){
				          tapped=null;
				          goHome();
				      },300);   //wait 300ms then run single click code
				    } else {    //tapped within 300ms of last tap. double tap
				        clearTimeout(tapped); //stop single tap callback
				        tapped=null
					   	scrollToTop();
						return false;
				    }
				    e.preventDefault()
				} else {
					 goHome();
				}
			});
			var waitForFinalEvent = (function () {
			  var timers = {};
			  return function (callback, ms, uniqueId) {
			    if (!uniqueId) {
			      uniqueId = 1234;
			    }
			    if (timers[uniqueId]) {
			      clearTimeout (timers[uniqueId]);
			    }
			    timers[uniqueId] = setTimeout(callback, ms);
			  };
			})();
			var removeWidowsFromParent = function(parent){
				var parentEl = $(parent);
				parentEl.find('p').widowFix();
				parentEl.find('h1').widowFix();
				parentEl.find('h2').widowFix();
			}
			var getBaseURL = function() {
			    var re = new RegExp(/^.*\//);
			    return re.exec(window.location.href.replace(window.location.hash,''));
			}
			var viewProject = function(){
				removeWidowsFromParent('.project-view');
				$('body').addClass('view-project');
				$(document).scrollTop(0);
			}
			var closeProject = function(){
				removeWidowsFromParent('.projects-list-view');
				$('body').removeClass('view-project');
				$('.project-view').removeClass('active').html('');
				$(document).scrollTop(globalScrollPos);
			}
			var resizeEvents = function(){
				removeWidowsFromParent('.project-view');
				removeWidowsFromParent('.projects-list-view');
			}
			var URLExists = function(url) {
			    var http = new XMLHttpRequest();
			    http.open('HEAD', url, true);
			    http.send();
			    return http.status!=404;
			}
			var dialogBoxHandler = function(title,error){
				var dialogBoxEl = $('.dialog-box');
				removeWidowsFromParent('.dialog-box');
				setTimeout(function(){
					dialogBoxEl.addClass('active');
				},10);
			}
			var dialogBoxExit = function(){
				$('.dialog-box').removeClass('active');
			}
			var showLoader = function(){
				$('.element-loader').addClass('active');
			}
			var killLoader = function(){
				$('.element-loader').removeClass('active');
			}
			Array.prototype.clean = function(deleteValue) {
			  for (var i = 0; i < this.length; i++) {
			    if (this[i] == deleteValue) {
			      this.splice(i, 1);
			      i--;
			    }
			  }
			  return this;
			};
			var globalScrollPos = 0;
			var rootURL = getBaseURL();
			var unzoomImg = function(){
				$('.zoom-img-overlay').removeClass('active');
				$('.zoom-img-big').removeClass('horz-limit').removeAttr('style');
				$(window).unbind('scroll').unbind('touchstart').bind('scroll',function(){
					scrollToTopBind();
				})
			}
			var zoomImgBind = function(){
				$(window).unbind('scroll').unbind('touchstart').bind('scroll',function(){
					scrollToTopBind();
					unzoomImg();
				}).bind('touchstart',function(){
					unzoomImg();
				});
			}
			$('.nda-project').bind('click',function(e){
				e.preventDefault();
			})
			$(window).resize(function () {
			    waitForFinalEvent(function(){
			    }, 500, 'resizeEvents');
			});
			$('.exit-dialog-box').bind('click',function(){
				dialogBoxExit();
			});
			$(document).on('click','.zoom-img',function(){
				var imgSrc = $(this).attr('src');
				var zoomImgEl = $('.zoom-img-big');
				var imgHeight = zoomImgEl.attr('src',imgSrc).outerHeight();
				var winHeight = $(window).height();
				if(imgHeight > winHeight){
					zoomImgEl.addClass('horz-limit').css('max-height',winHeight);
				}
				$('.zoom-img-overlay').addClass('active');
				zoomImgBind();
			});
			$('.zoom-img-overlay').bind('click',function(){
				unzoomImg();
			});
			$("body").on("mousedown", "*", function(e) {
		        if (($(this).is(":focus") || $(this).is(e.target)) && $(this).css("outline-style") == "none") {
		            $(this).css("outline", "none").on("blur", function() {
		                $(this).off("blur").css("outline", "");
		            });
		        }
		    });

			/*
			$(document).on('click','.back-button',function(){
				closeProject();
			});
			*/

			/*
			$(document).on('click','.zoomable-image',function(){
				var thisEl = $(this);
				thisEl.bind('click',function(){
					var imgEl = thisEl.find('img');
					thisEl.addClass('full-screen');
					var imgHeight = imgEl.height();
					var marginTopOffset = -1 * (imgHeight/2);
					imgEl.css('margin-top',marginTopOffset);
				})
			})
			*/

			var loadProject = function(){
				globalScrollPos = $(document).scrollTop();
				var loadURL = rootURL + location.hash.replace('#','') + 'page.html';
				if(URLExists(loadURL)){
					showLoader();
					$('.project-view').load(loadURL,function(){
						killLoader();
						viewProject();
					});
				} else {
					dialogBoxHandler("My bad!","I probably screwed up on putting the correct URL on the link... I'll fix that soon.");
					 goHome();
				}
			}
			var hashChange = function(){
				 var URLDataPoints = (location.hash).split('/').clean("");
				//0 = hash
				//1 = whatpage
				//2 = whatproject
				//console.log(URLDataPoints);
				if(URLDataPoints.length <= 1){
					 goHome();
				}
				if(URLDataPoints.length === 2 || URLDataPoints.length > 3){
					 goHome();
					closeProject();
				}
				if(URLDataPoints.length === 3 && URLDataPoints[1] === 'projects'){
					loadProject();
				}
			}
			$(window).on('hashchange', function() {
			 	hashChange();
			});
			if ("onhashchange" in window) {
				hashChange();
			}
			var resetEE = function(){
        		$(document).unbind('keyup');
        		bindEE();
        	}
        	var runEE = function(){
        		$('body').prepend(atob('PGRpdiBjbGFzcz0iZWUtY29udGFpbmVyIiBzdHlsZT0iY3Vyc29yOnBvaW50ZXI7ei1pbmRleDo5O2JhY2tncm91bmQ6dXJsKCcuL2VlL2VlLmdpZicpO3Bvc2l0aW9uOmZpeGVkO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7bGVmdDowO3RvcDowIj48YXVkaW8gY2xhc3M9ImVlLWF1ZGlvIiBhdXRvcGxheSBsb29wPjxzb3VyY2Ugc3JjPSIuL2VlL2VlLm1wMyIgdHlwZT0iYXVkaW8vbXBlZyI+PHNvdXJjZSBzcmM9Ii4vZWUvZWUub2dnIiB0eXBlPSJhdWRpby9vZ2ciPjwvYXVkaW8+PC9kaXY+'));
        		$('.ee-container').bind('click',function(){
	            	$(this).unbind('click').remove();
	            });
        	}
        	var bindEE = function(){
	        	$(document).bind('keyup', function(e) {
					if(e.which==78){
						$(this).bind('keyup', function(e){
							if(e.which==83){
								$(this).bind('keyup',function(e){
									if(e.which==65){
										if(!$('.ee-container').length > 0){
											runEE();
											resetEE();
										}
									} else {
										resetEE();
									}
								})
							} else {
								resetEE();
							}
						})
					}
				});
			}
			bindEE();
			/*
			$('.next-pic').bind('click',function(){
				var imgGallery = $('.project-view.active').find('figure');
				var currentIndex = imgGallery.find('.active').index();
				var nextIndex = currentIndex + 1;
				if ()
			});
			*/
		})