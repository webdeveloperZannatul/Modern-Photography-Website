/*========================================== MASTER JAVASCRIPT ===================================================================

	Project     :	PHOTOGRAPHY LANDING PAGE
	Version     :	1.0
	Last Change : 	04/09/2019
	Primary Use :   PHOTOGRAPHY LANDING PAGE

=================================================================================================================================*/

$(document).ready(function() {
    "use strict"; //Start of Use Strict
    var menu_li = $('.navbar-nav li a');
    var collapse = $('.navbar-collapse');
    var top_nav = $('#top-nav');

    /* Add & Remove active class in Menu and Submenu based on url(location) Start*/
    var url = window.location;
    // Will only work if string in href matches with location
    $('ul.navbar-nav a[href="' + url + '"]').parent().addClass('active');

    // Will also work for relative and absolute hrefs
    $('ul.navbar-nav a').filter(function() {
        return this.href == url;
    }).parent().addClass('active').parent().parent().addClass('active');

    /* Add & Remove active class in Menu and Submenu based on url(location) End*/

    $(window).scroll(function() {
        var $header = $('.navbar-menu');
        if ($(this).scrollTop() > 56) {
            if (!$header.hasClass('fixed-top')) $header.addClass("fixed-top");
        } else {
            if ($header.hasClass('fixed-top')) $header.removeClass("fixed-top");
        }
    });

    //MENU SCROLL
    if (top_nav.length) {
        var x = top_nav.offset().top;
        if (x > 50) {
            top_nav.fadeIn();
        } else {
            top_nav.fadeOut();
        }
        $(document).on('scroll', function() {
            var y = $(this).scrollTop();
            if (y > 50) {
                top_nav.fadeIn();
            } else {
                top_nav.fadeOut();
            }
        });
    }
    $('.navbar-nav a[href*=#]').bind('click', function(e) {
        e.preventDefault(); // prevent hard jump, the default behavior

        var target = $(this).attr("href"); // Set the target as variable

        // perform animated scrolling by getting top-position of target-element and set it as scroll target
        $('html, body').stop().animate({
            scrollTop: $(target).offset().top - 75
        }, 600);

        return false;
    });


    //RESPONSIVE MENU SHOW AND HIDE FUNCTION
    if (menu_li.length) {
        menu_li.on("click", function(event) {
            var disp = $(".navbar-toggler").css('display');
            if (!$(".navbar-toggler").hasClass('collapsed')) {
                if (collapse.hasClass('show')) {
                    collapse.removeClass('show').slideUp("slow");
                }
            }
        });
    }

    //NUMBER COUNTING
    var counter = $('.count-num');
    if (counter.length) {
        counter.counterUp({
            delay: 10,
            time: 1000
        });
    }

    $('.carousel').carousel({
        interval: false
    })

    // SCROLL TOP 
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 50) {
            $('#return-to-top').fadeIn(200);
        } else {
            $('#return-to-top').fadeOut(200);
        }
    });
    $('#return-to-top').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
    });

    //CONTACT FORM VALIDATION	
    if ($('.form-res, .quote-form').length) {
        $('.form-res, .quote-form').each(function() {
            $(this).validate({
                errorClass: 'error',
                submitHandler: function(form) {
                    $.ajax({
                        type: "POST",
                        url: "mail/mail.php",
                        data: $(form).serialize(),
                        success: function(data) {
                            if (data) {
                                $(form)[0].reset();
                                $('.sucessMessage').html('Mail Sent Successfully!!!');
                                $('.sucessMessage').show();
                                $('.sucessMessage').delay(3000).fadeOut();
                            } else {
                                $('.failMessage').html(data);
                                $('.failMessage').show();
                                $('.failMessage').delay(3000).fadeOut();
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            $('.failMessage').html(textStatus);
                            $('.failMessage').show();
                            $('.failMessage').delay(3000).fadeOut();
                        }
                    });
                }
            });
        });
    }

    return false;
    // End of use strict
});