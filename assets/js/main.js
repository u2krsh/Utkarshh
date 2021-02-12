jQuery(window).on('load', function() {
	"use strict";


    // HIDE PRELOADER
    $(".preloader").addClass("hide-preloader");

    // SHOW/ANIMATE ANIMATION CONTAINER
    setTimeout(function(){

        $("#intro .animation-container").each(function() {

            var e = $(this);

            setTimeout(function(){

                e.addClass("run-animation");

            }, e.data("animation-delay") );

        });

    }, 700 );


});


jQuery(document).ready(function($) {
	"use strict";


    // SMOOTH SCROLL FOR SAME PAGE LINKS
    $(document).on('click', 'a.smooth-scroll', function(event) {

        event.preventDefault();

        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 80
        }, 500);

    });


    // SCROLL REVEAL SETUP
    window.sr = ScrollReveal();
    sr.reveal(".scroll-animated", {
        duration: 600,
        delay: 0,
        origin: "left",
        rotate: { x: 0, y: 0, z: 0 },
        opacity: 0,
        distance: "20vh",
        viewFactor: 0.4,
        scale: 1,
    });


    // AJAX CONTACT FORM SUBMIT
    $("#contact-form").submit(function(e) {

        e.preventDefault();
        var postdata = $(this).serialize();

        $.ajax({

            type: "POST",
            url: "assets/php/contact.php",
            data: postdata,
            dataType: "json",
            success: function(json) {

                $("#contact-form input, #contact-form textarea").removeClass("error");

                setTimeout(function(){

                    if (json.nameMessage !== "") {

                        $("#contact-form-name").addClass("error");

                    }

                    if (json.emailMessage !== "") {

                        $("#contact-form-email").addClass("error");

                    }

                    if (json.messageMessage !== "") {

                        $("#contact-form-message").addClass("error");

                    }

                }, 10);

                if (json.nameMessage === "" && json.emailMessage === "" && json.messageMessage === "") {

                    $("#contact-form.error input, #contact-form.error textarea").removeClass("error");
                    $('#contact-form').addClass("success");
                    $('#contact-form textarea, #contact-form input').val("");

                    setTimeout(function(){

                        $('#contact-form').removeClass("success");

                    },4000);

                }

            }

        });

    });


});

// Research Page

jQuery(window).on('load', function() {

     // PAGE LOADING
     $("body").addClass("page-loaded");

});


jQuery(document).ready(function($) {
	"use strict";


    // INIT GLITCH BACKGROUND EFFECT
    $( ".hero .backgroundrs-img" ).mgGlitch({
        destroy : false, // set 'true' to stop the plugin
        glitch: true, // set 'false' to stop glitching
        scale: true, // set 'false' to stop scaling
        blend : true, // set 'false' to stop glitch blending
        blendModeType : 'hue', // select blend mode type
        glitch1TimeMin : 600, // set min time for glitch 1 elem
        glitch1TimeMax : 900, // set max time for glitch 1 elem
        glitch2TimeMin : 10, // set min time for glitch 2 elem
        glitch2TimeMax : 115, // set max time for glitch 2 elem
        zIndexStart : 1, // because of absolute position, set z-index base value
    });


});
