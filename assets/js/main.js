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



// About-Page SCROLL
// SCROLL TOP BUTTON
$(".scroll-top").click(function() {

	$("html, body").animate({ scrollTop: 0 }, 400);
	return false;

});

// Navbar


var header = document.querySelector("header");
var checkbox = document.querySelector("#check");
var topButton = document.querySelector("#back-to-top");
var footer = document.querySelector("footer");


var overview = document.querySelector("#overview");
var dotMenu = document.querySelector(".dot-menu");
var artDot = document.querySelector("#art-dot");
var csDot = document.querySelector("#cs-dot");
var photoDot = document.querySelector("#photo-dot");
var csSection = document.querySelector("#photo-box");

var boxes = document.querySelectorAll(".box");
var buttons = document.querySelectorAll("#intro .button");

// master function for all things that change on scroll
window.addEventListener("scroll", function () {
    updateOnScroll();
})

function updateOnScroll() {
    if (!checkbox.checked) { // deal with sticky nav on scroll
        header.classList.toggle("sticky", window.scrollY > 0);
    }

    mastheadOpacity();
    backToTop();
    dotsOnScroll();
}

function mastheadOpacity() { // deal with masthead on scroll
    var name = document.querySelector("#name-and-social");
    var arrow = document.querySelector("#down-arrow i");

    changeOpacity(name);
    changeOpacity(arrow);
}

function changeOpacity(elem) {
    if (window.scrollY < 0.75 * window.innerHeight) {
        elem.style.opacity = 1 - (window.scrollY / (0.75 * window.innerHeight));
    } else {
        elem.style.opacity = 0;
    }
}

function dotsOnScroll() { // deal with vertical dot side menu
    dotMenu.classList.toggle("active",
        window.scrollY > (document.body.scrollHeight - window.innerHeight - 0.75 * overview.scrollHeight));

    if (window.scrollY < csSection.offsetTop) { // Art
        artDot.classList.add("selected");
        csDot.classList.remove("selected");
        photoDot.classList.remove("selected");
    } else if (window.scrollY > (csSection.offsetTop + csSection.offsetHeight)) { // Photo
        artDot.classList.remove("selected");
        csDot.classList.remove("selected");
        photoDot.classList.add("selected");
    } else { // CS
        artDot.classList.remove("selected");
        csDot.classList.add("selected");
        photoDot.classList.remove("selected");
    }
}

function backToTop() { // deal with back to top button
    topButton.classList.toggle("active", window.scrollY > 0.6 * window.innerHeight);
    dotMenu.classList.toggle("active", window.scrollY > window.innerHeight);
    if (window.scrollY > (document.body.scrollHeight - window.innerHeight - 0.6 * footer.scrollHeight)) {
        topButton.style.bottom = "calc(60px + 4vw)";
    } else {
        topButton.style.bottom = "calc(20px + 1vw)";
    }
}

// deal with sticky nav if screen < 600px
function fixNav() {
    if (checkbox.checked) {
        header.classList.remove("sticky");
    } else if (window.scrollY > 0) {
        header.classList.add("sticky");
    }
}

window.onresize = function () {
    navOnResize();
}

// deal with sticky nav on window resize
function navOnResize() {
    if (window.scrollY > 0) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }

    if (window.innerWidth > 600) {
        checkbox.checked = false;
    }
}

function dotOpacity(value) { // reduce opacity on dot menu hover
    if (window.innerWidth < 600) {
        value = 1;
    }
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.opacity = value;
        if (window.innerWidth > 600) {
            boxes[i].classList.toggle("grayscale");
        }
    }
}

// reset site on load/refresh
updateOnScroll();

// helper code for svg text animation
//const name = document.querySelectorAll("#name path");
//for (let i = 0; i < name.length; i++) {
//    console.log(`Letter ${i} is ${name[i].getTotalLength()}`);
//}

// don't start animations until everything is loaded
document.body.classList.add('js-loading');

window.addEventListener("load", showPage);

function showPage() {
    document.body.classList.remove('js-loading');
}
