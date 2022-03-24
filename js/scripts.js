/* Template: Aria - Business HTML Landing Page Template
   Author: Inovatik
   Created: Jul 2019
   Description: Custom JS file
*/


(function ($) {
    "use strict";

    /* Preloader */
    $(window).on('load', function () {
        var preloaderFadeOutTime = 500;
        function hidePreloader() {
            var preloader = $('.spinner-wrapper');
            setTimeout(function () {
                preloader.fadeOut(preloaderFadeOutTime);
            }, 500);
        }
        hidePreloader();
    });


    ///* Navbar Scripts */
    //// jQuery to collapse the navbar on scroll
    //   $(window).on('scroll load', function() {
    //	if ($(".navbar").offset().top > 20) {
    //		$(".fixed-top").addClass("top-nav-collapse");
    //	} else {
    //		$(".fixed-top").removeClass("top-nav-collapse");
    //	}
    //   });

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function () {
        $(document).on('click', 'a.page-scroll', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 600, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    // closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function (event) {
        if (!$(this).parent().hasClass('dropdown'))
            $(".navbar-collapse").collapse('hide');
    });


    /* Rotating Text - Morphtext */
    $("#js-rotating").Morphext({
        // The [in] animation type. Refer to Animate.css for a list of available animations.
        animation: "fadeIn",
        // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
        separator: ",",
        // The delay between the changing of each phrase in milliseconds.
        speed: 2000,
        complete: function () {
            // Called after the entrance animation is executed.
        }
    });


    /* Card Slider - Swiper */
    var cardSlider = new Swiper('.card-slider', {
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        slidesPerView: 3,
        spaceBetween: 20,
        breakpoints: {
            // when window is <= 992px
            992: {
                slidesPerView: 2
            },
            // when window is <= 768px
            768: {
                slidesPerView: 1
            }
        }
    });


    /* Lightbox - Magnific Popup */
    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false, /* keep it false to avoid html tag shift with margin-right: 17px */
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });


    /* Filter - Isotope */
    var $grid = $('.grid').isotope({
        // options
        itemSelector: '.element-item',
        layoutMode: 'fitRows'
    });

    // filter items on button click
    $('.filters-button-group').on('click', 'a', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

    // change is-checked class on buttons
    $('.button-group').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'a', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });


    /* Counter - CountTo */
    var a = 0;
    $(window).scroll(function () {
        if ($('#counter').length) { // checking if CountTo section exists in the page, if not it will not run the script and avoid errors	
            var oTop = $('#counter').offset().top - window.innerHeight;
            if (a == 0 && $(window).scrollTop() > oTop) {
                $('.counter-value').each(function () {
                    var $this = $(this),
                        countTo = $this.attr('data-count');
                    $({
                        countNum: $this.text()
                    }).animate({
                        countNum: countTo
                    },
                        {
                            duration: 2000,
                            easing: 'swing',
                            step: function () {
                                $this.text(Math.floor(this.countNum));
                            },
                            complete: function () {
                                $this.text(this.countNum);
                                //alert('finished');
                            }
                        });
                });
                a = 1;
            }
        }
    });


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function () {
        if ($(this).val() != '') {
            $(this).addClass('notEmpty');
        } else {
            $(this).removeClass('notEmpty');
        }
    });


    /* Call Me Form */
    $("#callMeForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            lformError();
            lsubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            lsubmitForm();
        }
    });

    function lsubmitForm() {
        // initiate variables with form content
        var name = $("#lname").val();
        var phone = $("#lphone").val();
        var email = $("#lemail").val();
        var select = $("#lselect").val();
        var terms = $("#lterms").val();

        $.ajax({
            type: "POST",
            url: "php/callmeform-process.php",
            data: "name=" + name + "&phone=" + phone + "&email=" + email + "&select=" + select + "&terms=" + terms,
            success: function (text) {
                if (text == "success") {
                    lformSuccess();
                } else {
                    lformError();
                    lsubmitMSG(false, text);
                }
            }
        });
    }

    function lformSuccess() {
        $("#callMeForm")[0].reset();
        lsubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function lformError() {
        $("#callMeForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function lsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#lmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    /* Contact Form */
    $("#contactForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            cformError();
            csubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            csubmitForm();
        }
    });

    function csubmitForm() {
        // initiate variables with form content
        var name = $("#cname").val();
        var email = $("#cemail").val();
        var message = $("#cmessage").val();
        var terms = $("#cterms").val();
        $.ajax({
            type: "POST",
            url: "php/contactform-process.php",
            data: "name=" + name + "&email=" + email + "&message=" + message + "&terms=" + terms,
            success: function (text) {
                if (text == "success") {
                    cformSuccess();
                } else {
                    cformError();
                    csubmitMSG(false, text);
                }
            }
        });
    }

    function cformSuccess() {
        $("#contactForm")[0].reset();
        csubmitMSG(true, "Message Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
        $("textarea").removeClass('notEmpty'); // resets the field label after submission
    }

    function cformError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function csubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#cmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    /* Privacy Form */
    $("#privacyForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            pformError();
            psubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            psubmitForm();
        }
    });

    function psubmitForm() {
        // initiate variables with form content
        var name = $("#pname").val();
        var email = $("#pemail").val();
        var select = $("#pselect").val();
        var terms = $("#pterms").val();

        $.ajax({
            type: "POST",
            url: "php/privacyform-process.php",
            data: "name=" + name + "&email=" + email + "&select=" + select + "&terms=" + terms,
            success: function (text) {
                if (text == "success") {
                    pformSuccess();
                } else {
                    pformError();
                    psubmitMSG(false, text);
                }
            }
        });
    }

    function pformSuccess() {
        $("#privacyForm")[0].reset();
        psubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function pformError() {
        $("#privacyForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function psubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#pmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function () {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


    /* Removes Long Focus On Buttons */
    $(".button, a, button").mouseup(function () {
        $(this).blur();
    });

    $('#sessions-gallery').on('click', function () {
        $.fancybox.open([
            { src: '/images/albums/sessions/0.JPG', opts: { thumb: '/images/albums/sessions/0.JPG' } }, { src: '/images/albums/sessions/1.JPG', opts: { thumb: '/images/albums/sessions/1.JPG' } }, { src: '/images/albums/sessions/2.JPG', opts: { thumb: '/images/albums/sessions/2.JPG' } }, { src: '/images/albums/sessions/3.JPG', opts: { thumb: '/images/albums/sessions/3.JPG' } }, { src: '/images/albums/sessions/4.JPG', opts: { thumb: '/images/albums/sessions/4.JPG' } }, { src: '/images/albums/sessions/5.JPG', opts: { thumb: '/images/albums/sessions/5.JPG' } }, { src: '/images/albums/sessions/6.JPG', opts: { thumb: '/images/albums/sessions/6.JPG' } }, { src: '/images/albums/sessions/7.JPG', opts: { thumb: '/images/albums/sessions/7.JPG' } }, { src: '/images/albums/sessions/8.JPG', opts: { thumb: '/images/albums/sessions/8.JPG' } }, { src: '/images/albums/sessions/9.JPG', opts: { thumb: '/images/albums/sessions/9.JPG' } }, { src: '/images/albums/sessions/10.JPG', opts: { thumb: '/images/albums/sessions/10.JPG' } }, { src: '/images/albums/sessions/11.JPG', opts: { thumb: '/images/albums/sessions/11.JPG' } }, { src: '/images/albums/sessions/12.JPG', opts: { thumb: '/images/albums/sessions/12.JPG' } }, { src: '/images/albums/sessions/13.JPG', opts: { thumb: '/images/albums/sessions/13.JPG' } }, { src: '/images/albums/sessions/14.JPG', opts: { thumb: '/images/albums/sessions/14.JPG' } }, { src: '/images/albums/sessions/15.JPG', opts: { thumb: '/images/albums/sessions/15.JPG' } }, { src: '/images/albums/sessions/16.JPG', opts: { thumb: '/images/albums/sessions/16.JPG' } }, { src: '/images/albums/sessions/17.JPG', opts: { thumb: '/images/albums/sessions/17.JPG' } }, { src: '/images/albums/sessions/18.JPG', opts: { thumb: '/images/albums/sessions/18.JPG' } }, { src: '/images/albums/sessions/19.JPG', opts: { thumb: '/images/albums/sessions/19.JPG' } }, { src: '/images/albums/sessions/20.JPG', opts: { thumb: '/images/albums/sessions/20.JPG' } }, { src: '/images/albums/sessions/21.JPG', opts: { thumb: '/images/albums/sessions/21.JPG' } }, { src: '/images/albums/sessions/22.JPG', opts: { thumb: '/images/albums/sessions/22.JPG' } }, { src: '/images/albums/sessions/23.JPG', opts: { thumb: '/images/albums/sessions/23.JPG' } }, { src: '/images/albums/sessions/24.JPG', opts: { thumb: '/images/albums/sessions/24.JPG' } }, { src: '/images/albums/sessions/25.JPG', opts: { thumb: '/images/albums/sessions/25.JPG' } }, { src: '/images/albums/sessions/26.JPG', opts: { thumb: '/images/albums/sessions/26.JPG' } }, { src: '/images/albums/sessions/27.JPG', opts: { thumb: '/images/albums/sessions/27.JPG' } }, { src: '/images/albums/sessions/28.JPG', opts: { thumb: '/images/albums/sessions/28.JPG' } }, { src: '/images/albums/sessions/29.JPG', opts: { thumb: '/images/albums/sessions/29.JPG' } }, { src: '/images/albums/sessions/30.JPG', opts: { thumb: '/images/albums/sessions/30.JPG' } }, { src: '/images/albums/sessions/31.JPG', opts: { thumb: '/images/albums/sessions/31.JPG' } }, { src: '/images/albums/sessions/32.JPG', opts: { thumb: '/images/albums/sessions/32.JPG' } }, { src: '/images/albums/sessions/33.JPG', opts: { thumb: '/images/albums/sessions/33.JPG' } }, { src: '/images/albums/sessions/34.JPG', opts: { thumb: '/images/albums/sessions/34.JPG' } }, { src: '/images/albums/sessions/35.JPG', opts: { thumb: '/images/albums/sessions/35.JPG' } }, { src: '/images/albums/sessions/36.JPG', opts: { thumb: '/images/albums/sessions/36.JPG' } }, { src: '/images/albums/sessions/37.JPG', opts: { thumb: '/images/albums/sessions/37.JPG' } }, { src: '/images/albums/sessions/38.JPG', opts: { thumb: '/images/albums/sessions/38.JPG' } }, { src: '/images/albums/sessions/39.JPG', opts: { thumb: '/images/albums/sessions/39.JPG' } }, { src: '/images/albums/sessions/40.JPG', opts: { thumb: '/images/albums/sessions/40.JPG' } }, { src: '/images/albums/sessions/41.JPG', opts: { thumb: '/images/albums/sessions/41.JPG' } }, { src: '/images/albums/sessions/42.JPG', opts: { thumb: '/images/albums/sessions/42.JPG' } }, { src: '/images/albums/sessions/43.JPG', opts: { thumb: '/images/albums/sessions/43.JPG' } }, { src: '/images/albums/sessions/44.JPG', opts: { thumb: '/images/albums/sessions/44.JPG' } }, { src: '/images/albums/sessions/45.JPG', opts: { thumb: '/images/albums/sessions/45.JPG' } }, { src: '/images/albums/sessions/46.JPG', opts: { thumb: '/images/albums/sessions/46.JPG' } }, { src: '/images/albums/sessions/47.JPG', opts: { thumb: '/images/albums/sessions/47.JPG' } }, { src: '/images/albums/sessions/48.JPG', opts: { thumb: '/images/albums/sessions/48.JPG' } }, { src: '/images/albums/sessions/49.JPG', opts: { thumb: '/images/albums/sessions/49.JPG' } }, { src: '/images/albums/sessions/50.JPG', opts: { thumb: '/images/albums/sessions/50.JPG' } }, { src: '/images/albums/sessions/51.JPG', opts: { thumb: '/images/albums/sessions/51.JPG' } }, { src: '/images/albums/sessions/52.JPG', opts: { thumb: '/images/albums/sessions/52.JPG' } }, { src: '/images/albums/sessions/53.JPG', opts: { thumb: '/images/albums/sessions/53.JPG' } }, { src: '/images/albums/sessions/54.JPG', opts: { thumb: '/images/albums/sessions/54.JPG' } }, { src: '/images/albums/sessions/55.JPG', opts: { thumb: '/images/albums/sessions/55.JPG' } }, { src: '/images/albums/sessions/56.JPG', opts: { thumb: '/images/albums/sessions/56.JPG' } }, { src: '/images/albums/sessions/57.JPG', opts: { thumb: '/images/albums/sessions/57.JPG' } }, { src: '/images/albums/sessions/58.JPG', opts: { thumb: '/images/albums/sessions/58.JPG' } }, { src: '/images/albums/sessions/59.JPG', opts: { thumb: '/images/albums/sessions/59.JPG' } }, { src: '/images/albums/sessions/60.JPG', opts: { thumb: '/images/albums/sessions/60.JPG' } }, { src: '/images/albums/sessions/61.JPG', opts: { thumb: '/images/albums/sessions/61.JPG' } }, { src: '/images/albums/sessions/62.JPG', opts: { thumb: '/images/albums/sessions/62.JPG' } }, { src: '/images/albums/sessions/63.JPG', opts: { thumb: '/images/albums/sessions/63.JPG' } }, { src: '/images/albums/sessions/64.JPG', opts: { thumb: '/images/albums/sessions/64.JPG' } }, { src: '/images/albums/sessions/65.JPG', opts: { thumb: '/images/albums/sessions/65.JPG' } }, { src: '/images/albums/sessions/66.JPG', opts: { thumb: '/images/albums/sessions/66.JPG' } }, { src: '/images/albums/sessions/67.JPG', opts: { thumb: '/images/albums/sessions/67.JPG' } }, { src: '/images/albums/sessions/68.JPG', opts: { thumb: '/images/albums/sessions/68.JPG' } }, { src: '/images/albums/sessions/69.JPG', opts: { thumb: '/images/albums/sessions/69.JPG' } }, { src: '/images/albums/sessions/70.JPG', opts: { thumb: '/images/albums/sessions/70.JPG' } }, { src: '/images/albums/sessions/71.JPG', opts: { thumb: '/images/albums/sessions/71.JPG' } }, { src: '/images/albums/sessions/72.JPG', opts: { thumb: '/images/albums/sessions/72.JPG' } }, { src: '/images/albums/sessions/73.JPG', opts: { thumb: '/images/albums/sessions/73.JPG' } }, { src: '/images/albums/sessions/74.JPG', opts: { thumb: '/images/albums/sessions/74.JPG' } }, { src: '/images/albums/sessions/75.JPG', opts: { thumb: '/images/albums/sessions/75.JPG' } }, { src: '/images/albums/sessions/76.JPG', opts: { thumb: '/images/albums/sessions/76.JPG' } }, { src: '/images/albums/sessions/77.JPG', opts: { thumb: '/images/albums/sessions/77.JPG' } }, { src: '/images/albums/sessions/78.JPG', opts: { thumb: '/images/albums/sessions/78.JPG' } }, { src: '/images/albums/sessions/79.JPG', opts: { thumb: '/images/albums/sessions/79.JPG' } }, { src: '/images/albums/sessions/80.JPG', opts: { thumb: '/images/albums/sessions/80.JPG' } }, { src: '/images/albums/sessions/81.JPG', opts: { thumb: '/images/albums/sessions/81.JPG' } }, { src: '/images/albums/sessions/82.JPG', opts: { thumb: '/images/albums/sessions/82.JPG' } }, { src: '/images/albums/sessions/83.JPG', opts: { thumb: '/images/albums/sessions/83.JPG' } }, { src: '/images/albums/sessions/84.JPG', opts: { thumb: '/images/albums/sessions/84.JPG' } }, { src: '/images/albums/sessions/85.JPG', opts: { thumb: '/images/albums/sessions/85.JPG' } }, { src: '/images/albums/sessions/86.JPG', opts: { thumb: '/images/albums/sessions/86.JPG' } }, { src: '/images/albums/sessions/87.JPG', opts: { thumb: '/images/albums/sessions/87.JPG' } }, { src: '/images/albums/sessions/88.JPG', opts: { thumb: '/images/albums/sessions/88.JPG' } }, { src: '/images/albums/sessions/89.JPG', opts: { thumb: '/images/albums/sessions/89.JPG' } }, { src: '/images/albums/sessions/90.JPG', opts: { thumb: '/images/albums/sessions/90.JPG' } },
        ], {
            loop: true,
            thumbs: {
                autoStart: true,
                hideOnClose: true
            },
            buttons: [
                'slideShow',
                'fullScreen',
                'thumbs',
                'share',
                'zoom',
                'close'
            ]
        });
    });

    $('#delegates-gallery').on('click', function () {
        $.fancybox.open([
            { src: '/images/albums/delegates/0.JPG', opts: { thumb: '/images/albums/delegates/0.JPG' } }, { src: '/images/albums/delegates/1.JPG', opts: { thumb: '/images/albums/delegates/1.JPG' } }, { src: '/images/albums/delegates/2.JPG', opts: { thumb: '/images/albums/delegates/2.JPG' } }, { src: '/images/albums/delegates/3.JPG', opts: { thumb: '/images/albums/delegates/3.JPG' } }, { src: '/images/albums/delegates/4.JPG', opts: { thumb: '/images/albums/delegates/4.JPG' } }, { src: '/images/albums/delegates/5.JPG', opts: { thumb: '/images/albums/delegates/5.JPG' } }, { src: '/images/albums/delegates/6.JPG', opts: { thumb: '/images/albums/delegates/6.JPG' } }, { src: '/images/albums/delegates/7.JPG', opts: { thumb: '/images/albums/delegates/7.JPG' } }, { src: '/images/albums/delegates/8.JPG', opts: { thumb: '/images/albums/delegates/8.JPG' } }, { src: '/images/albums/delegates/9.JPG', opts: { thumb: '/images/albums/delegates/9.JPG' } }, { src: '/images/albums/delegates/10.JPG', opts: { thumb: '/images/albums/delegates/10.JPG' } }, { src: '/images/albums/delegates/11.JPG', opts: { thumb: '/images/albums/delegates/11.JPG' } }, { src: '/images/albums/delegates/12.JPG', opts: { thumb: '/images/albums/delegates/12.JPG' } }, { src: '/images/albums/delegates/13.JPG', opts: { thumb: '/images/albums/delegates/13.JPG' } }, { src: '/images/albums/delegates/14.JPG', opts: { thumb: '/images/albums/delegates/14.JPG' } }, { src: '/images/albums/delegates/15.JPG', opts: { thumb: '/images/albums/delegates/15.JPG' } }, { src: '/images/albums/delegates/16.JPG', opts: { thumb: '/images/albums/delegates/16.JPG' } }, { src: '/images/albums/delegates/17.JPG', opts: { thumb: '/images/albums/delegates/17.JPG' } }, { src: '/images/albums/delegates/18.JPG', opts: { thumb: '/images/albums/delegates/18.JPG' } }, { src: '/images/albums/delegates/19.JPG', opts: { thumb: '/images/albums/delegates/19.JPG' } }, { src: '/images/albums/delegates/20.JPG', opts: { thumb: '/images/albums/delegates/20.JPG' } }, { src: '/images/albums/delegates/21.JPG', opts: { thumb: '/images/albums/delegates/21.JPG' } }, { src: '/images/albums/delegates/22.JPG', opts: { thumb: '/images/albums/delegates/22.JPG' } }, { src: '/images/albums/delegates/23.JPG', opts: { thumb: '/images/albums/delegates/23.JPG' } }, { src: '/images/albums/delegates/24.JPG', opts: { thumb: '/images/albums/delegates/24.JPG' } }, { src: '/images/albums/delegates/25.JPG', opts: { thumb: '/images/albums/delegates/25.JPG' } }, { src: '/images/albums/delegates/26.JPG', opts: { thumb: '/images/albums/delegates/26.JPG' } }, { src: '/images/albums/delegates/27.JPG', opts: { thumb: '/images/albums/delegates/27.JPG' } }, { src: '/images/albums/delegates/28.JPG', opts: { thumb: '/images/albums/delegates/28.JPG' } }, { src: '/images/albums/delegates/29.JPG', opts: { thumb: '/images/albums/delegates/29.JPG' } }, { src: '/images/albums/delegates/30.JPG', opts: { thumb: '/images/albums/delegates/30.JPG' } }, { src: '/images/albums/delegates/31.JPG', opts: { thumb: '/images/albums/delegates/31.JPG' } }, { src: '/images/albums/delegates/32.JPG', opts: { thumb: '/images/albums/delegates/32.JPG' } }, { src: '/images/albums/delegates/33.JPG', opts: { thumb: '/images/albums/delegates/33.JPG' } }, { src: '/images/albums/delegates/34.JPG', opts: { thumb: '/images/albums/delegates/34.JPG' } }, { src: '/images/albums/delegates/35.JPG', opts: { thumb: '/images/albums/delegates/35.JPG' } }, { src: '/images/albums/delegates/36.JPG', opts: { thumb: '/images/albums/delegates/36.JPG' } }, { src: '/images/albums/delegates/37.JPG', opts: { thumb: '/images/albums/delegates/37.JPG' } }, { src: '/images/albums/delegates/38.JPG', opts: { thumb: '/images/albums/delegates/38.JPG' } }, { src: '/images/albums/delegates/39.JPG', opts: { thumb: '/images/albums/delegates/39.JPG' } }, { src: '/images/albums/delegates/40.JPG', opts: { thumb: '/images/albums/delegates/40.JPG' } }, { src: '/images/albums/delegates/41.JPG', opts: { thumb: '/images/albums/delegates/41.JPG' } }, { src: '/images/albums/delegates/42.JPG', opts: { thumb: '/images/albums/delegates/42.JPG' } }, { src: '/images/albums/delegates/43.JPG', opts: { thumb: '/images/albums/delegates/43.JPG' } }, { src: '/images/albums/delegates/44.JPG', opts: { thumb: '/images/albums/delegates/44.JPG' } }, { src: '/images/albums/delegates/45.JPG', opts: { thumb: '/images/albums/delegates/45.JPG' } }, { src: '/images/albums/delegates/46.JPG', opts: { thumb: '/images/albums/delegates/46.JPG' } }, { src: '/images/albums/delegates/47.JPG', opts: { thumb: '/images/albums/delegates/47.JPG' } }, { src: '/images/albums/delegates/48.JPG', opts: { thumb: '/images/albums/delegates/48.JPG' } }, { src: '/images/albums/delegates/49.JPG', opts: { thumb: '/images/albums/delegates/49.JPG' } }, { src: '/images/albums/delegates/50.JPG', opts: { thumb: '/images/albums/delegates/50.JPG' } }, { src: '/images/albums/delegates/51.JPG', opts: { thumb: '/images/albums/delegates/51.JPG' } }, { src: '/images/albums/delegates/52.JPG', opts: { thumb: '/images/albums/delegates/52.JPG' } }, { src: '/images/albums/delegates/53.JPG', opts: { thumb: '/images/albums/delegates/53.JPG' } }, { src: '/images/albums/delegates/54.JPG', opts: { thumb: '/images/albums/delegates/54.JPG' } }, { src: '/images/albums/delegates/55.JPG', opts: { thumb: '/images/albums/delegates/55.JPG' } }, { src: '/images/albums/delegates/56.JPG', opts: { thumb: '/images/albums/delegates/56.JPG' } }, { src: '/images/albums/delegates/57.JPG', opts: { thumb: '/images/albums/delegates/57.JPG' } }, { src: '/images/albums/delegates/58.JPG', opts: { thumb: '/images/albums/delegates/58.JPG' } }, { src: '/images/albums/delegates/59.JPG', opts: { thumb: '/images/albums/delegates/59.JPG' } }, { src: '/images/albums/delegates/60.JPG', opts: { thumb: '/images/albums/delegates/60.JPG' } }, { src: '/images/albums/delegates/61.JPG', opts: { thumb: '/images/albums/delegates/61.JPG' } }, { src: '/images/albums/delegates/62.JPG', opts: { thumb: '/images/albums/delegates/62.JPG' } }, { src: '/images/albums/delegates/63.JPG', opts: { thumb: '/images/albums/delegates/63.JPG' } }, { src: '/images/albums/delegates/64.JPG', opts: { thumb: '/images/albums/delegates/64.JPG' } }, { src: '/images/albums/delegates/65.JPG', opts: { thumb: '/images/albums/delegates/65.JPG' } }, { src: '/images/albums/delegates/66.JPG', opts: { thumb: '/images/albums/delegates/66.JPG' } }, { src: '/images/albums/delegates/67.JPG', opts: { thumb: '/images/albums/delegates/67.JPG' } }, { src: '/images/albums/delegates/68.JPG', opts: { thumb: '/images/albums/delegates/68.JPG' } }, { src: '/images/albums/delegates/69.JPG', opts: { thumb: '/images/albums/delegates/69.JPG' } }, { src: '/images/albums/delegates/70.JPG', opts: { thumb: '/images/albums/delegates/70.JPG' } }, { src: '/images/albums/delegates/71.JPG', opts: { thumb: '/images/albums/delegates/71.JPG' } }, { src: '/images/albums/delegates/72.JPG', opts: { thumb: '/images/albums/delegates/72.JPG' } }, { src: '/images/albums/delegates/73.JPG', opts: { thumb: '/images/albums/delegates/73.JPG' } }, { src: '/images/albums/delegates/74.JPG', opts: { thumb: '/images/albums/delegates/74.JPG' } }, { src: '/images/albums/delegates/75.JPG', opts: { thumb: '/images/albums/delegates/75.JPG' } }, { src: '/images/albums/delegates/76.JPG', opts: { thumb: '/images/albums/delegates/76.JPG' } }, { src: '/images/albums/delegates/77.JPG', opts: { thumb: '/images/albums/delegates/77.JPG' } }, { src: '/images/albums/delegates/78.JPG', opts: { thumb: '/images/albums/delegates/78.JPG' } }, { src: '/images/albums/delegates/79.JPG', opts: { thumb: '/images/albums/delegates/79.JPG' } }, { src: '/images/albums/delegates/80.JPG', opts: { thumb: '/images/albums/delegates/80.JPG' } }, { src: '/images/albums/delegates/81.JPG', opts: { thumb: '/images/albums/delegates/81.JPG' } }, { src: '/images/albums/delegates/82.JPG', opts: { thumb: '/images/albums/delegates/82.JPG' } }, { src: '/images/albums/delegates/83.JPG', opts: { thumb: '/images/albums/delegates/83.JPG' } }, { src: '/images/albums/delegates/84.JPG', opts: { thumb: '/images/albums/delegates/84.JPG' } }, { src: '/images/albums/delegates/85.JPG', opts: { thumb: '/images/albums/delegates/85.JPG' } }, { src: '/images/albums/delegates/86.JPG', opts: { thumb: '/images/albums/delegates/86.JPG' } }, { src: '/images/albums/delegates/87.JPG', opts: { thumb: '/images/albums/delegates/87.JPG' } }, { src: '/images/albums/delegates/88.JPG', opts: { thumb: '/images/albums/delegates/88.JPG' } }, { src: '/images/albums/delegates/89.JPG', opts: { thumb: '/images/albums/delegates/89.JPG' } }, { src: '/images/albums/delegates/90.JPG', opts: { thumb: '/images/albums/delegates/90.JPG' } }, { src: '/images/albums/delegates/91.JPG', opts: { thumb: '/images/albums/delegates/91.JPG' } },
        ], {
            loop: true,
            thumbs: {
                autoStart: true,
                hideOnClose: true
            },
            buttons: [
                'slideShow',
                'fullScreen',
                'thumbs',
                'share',
                'zoom',
                'close'
            ]
        });
    });

    $('#videos-gallery').on('click', function () {
        $.fancybox.open([
            {
                src  : 'https://www.youtube.com/watch?v=0k-jQETUuQY',
                opts : {
                    thumb: '/images/albums/videos/1.JPG'
                }
            },
            {
                src  : 'https://www.youtube.com/watch?v=WMEB8qcyVlU',
                opts : {
                    thumb: '/images/albums/videos/2.JPG'
                }
            },
            {
                src  : 'https://www.youtube.com/watch?v=lDqt1bNz0FE',
                opts : {
                    thumb: '/images/albums/videos/3.JPG'
                }
            },
            {
                src  : 'https://youtu.be/T1XNxOBA1cA',
                opts : {
                    thumb: '/images/albums/videos/4.JPG'
                }
            },
            {
                src  : 'https://youtu.be/199HIfB-9e4',
                opts : {
                    thumb: '/images/albums/videos/5.JPG'
                }
            },
            {
                src  : 'https://youtu.be/gLav0mumm7s',
                opts : {
                    thumb: '/images/albums/videos/6.JPG'
                }
            },
            {
                src  : 'https://youtu.be/1J1RRyMV_Ds',
                opts : {
                    thumb: '/images/albums/videos/7.JPG'
                }
            },
            {
                src  : 'https://youtu.be/QagQC227reQ',
                opts : {
                    thumb: '/images/albums/videos/8.JPG'
                }
            },
        ], {
            loop: true,
            thumbs: {
                autoStart: true,
                hideOnClose: true
            },
            buttons: [
                'slideShow',
                'fullScreen',
                'thumbs',
                'share',
                'zoom',
                'close'
            ]
        });
    });

})(jQuery);