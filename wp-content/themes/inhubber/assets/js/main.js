$(document).ready(function () {
    $('.burger-menu').on('click', function (e) {
        $(this).toggleClass('burger-menu-opened');
        $('.header').toggleClass('header-active-menu');
        $('.menu-mobile').toggleClass('active');
        e.preventDefault();
    });

    // getCasesBlockActive
    function getCasesBlockActive() {
        $('.cases').css('background-color', $('.cases__switch.active').attr('data-background-color'));
        $('.cases').attr('data-class', $('.cases__switch.active').attr('data-name'));

        $('.cases__block').each(function(){
            if ($(this).attr('data-name-val') == $('.cases__switch.active').attr('data-name')) {
                $('.cases__block').removeClass('active');
                $(this).addClass('active');
            }
        });
    }
    getCasesBlockActive();

    // cases switch
    $('.cases__switch').on('click', function(){
        $('.cases__switch').removeClass('active');
        var thisActive = $(this).addClass('active');

        $('.cases').attr('data-class', $(this).attr('data-name'));

        $('.cases').css('background-color', $('.cases__switch.active').attr('data-background-color'));
        $('.cases__block').each(function(){
            if ($(this).attr('data-name-val') == thisActive.attr('data-name')) {
                $('.cases__block').removeClass('active');
                $(this).addClass('active');
            }
        });
    });

    // doc scroll
    var customHeight = 150;

    function headerPos() {
        function windowScroll(a) {
            if ($(window).scrollTop() > a) {
                $('.header').removeClass('header-top');
                $('.header').addClass('header-scroll');
            } else {
                $('.header').removeClass('header-scroll');
                $('.header').addClass('header-top');
            }
        }
        windowScroll(customHeight);
    }
    headerPos();

    $(window).scroll(function () {
        headerPos();
    });

    // cat ...

    $('.menu__list a').each(function () {
        if ($(this).text() == $('.news__categories a').text()) {
            $(this).addClass('active');
        }
    });

    // not-click
    $('.footer__list .menu-item-has-children >a, .footer__list .menu-item-has-children >a.not-click').on('click', function (e) {
        e.preventDefault();
    });
	
    // 	load more
    var pageLank = $('html').attr('lang');

    $('.btn-loadmore').on('click', function (e) {
        e.preventDefault();

        let _this = $(this);

        if (pageLank == 'de-DE') {
            _this.html('Wird geladen...');
        } else {
            _this.html('Loading...');
        }

        let data = {
            'action': 'loadmore',
            'query': _this.attr('data-param-posts'),
            'page': this_page,
            'tpl': _this.attr('data-tpl')
        };

        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: data,
            type: 'POST',
            success: function (data) {
                if (data) {
                    if (pageLank == 'de-DE') {
                        _this.html('Mehr erfahren');
                    } else {
                        _this.html('Load more');
                    }
                    _this.prev().prev().append(data);
                    this_page++;
                    if (this_page == _this.attr('data-max-pages')) {
                        _this.remove();
                    }
                } else {
                    _this.remove();
                }
            }
        });
    });
    // VIDEO
    $('[data-video]').click(function () {
        $('html').addClass('modal-open');
        $('.modal-video').show();
        $('.modal-video .video-container').html('');
        $('.modal-video .video-container').append('<iframe id="video-area" src="https://www.youtube.com/embed/' + $(this).data('video') + '?autoplay=true&showinfo=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        $('#video-area').addClass('active');
    });
    $('[data-source]').click(function(){
        $('html').addClass('modal-open');
        $('.modal-video').show();
        $('.modal-video .video-container').html('');
        $('.modal-video .video-container').append('<video id="video-area" poster="' + $(this).data('preview') + '"><source src="' + $(this).data('ogv') + '" type="video/ogg"><source src="' + $(this).data('mp4') + '" type="video/mp4"><source src="' + $(this).data('webm') + '" type="video/webm"></video>');
        $('#video-area').addClass('active');
        $('#video-area')[0].play();

    });
    $('.modal-video .close').click(function () {
        $('#video-area').attr('src', '');
        $('.modal-video .video-container').html('');
        $('.modal-video').hide();
        $('html').removeClass('modal-open');
    });

    // DASHBOARD SLIDERS
    $('.slider__previews').owlCarousel({
        items: 4,
        slideSpeed: 500,
        // smartSpeed:1500,
        nav: true,
        autoplay: false, 
        dots: false,
        loop: false,
        margin: 16,
        mouseDrag: false,
        slideBy: 1,
        autoHeight: true,
        responsiveRefreshRate: 200,
        navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
        responsive : {
            // breakpoint from 0 up
            320 : {
                items: 1
            },
            // breakpoint from 575 up
            575 : {
                items: 2
            },
            // breakpoint from 768 up
            768 : {
                items: 2
            },
            // breakpoint from 992 up
            992 : {
                items: 3
            },
            // breakpoint from 1200 up
            1200 : {
                items: 4
            },
        }
    });
    // .on('changed.owl.carousel', getCurrents);
    getCurrent();
    function getCurrent(){
        $('.slider__previews').find('.owl-item').removeClass('current');
        $('.slider__previews').find('.owl-item.active').eq(0).addClass('current');
        console.log($('.slider__previews').find('.owl-item.active').index());
    }
    function getCurrents(){
        $('.slider__previews').find('.owl-item').removeClass('current');
        $('.slider__previews').find('.owl-item.active').eq(1).addClass('current');
        console.log($('.slider__previews').find('.owl-item.active').index());
    }
    $('#product .product__dashboard .dashboard__slider .owl-nav button').css('top', ($('#product .product__dashboard .dashboard__slider .slider__preview').outerHeight() / 2));
    $('#product .product__dashboard .dashboard__slider .slider__content img').eq(0).addClass('current');
    $('#product .product__dashboard .dashboard__slider .owl-item').click(function(){
        var slideIndex = $(this).index();
        // alert($(this).index());
        $('.slider__previews').find('.owl-item').removeClass('current');
        $(this).addClass('current');
        $('#product .product__dashboard .dashboard__slider .slider__content img').removeClass('current');
        $('#product .product__dashboard .dashboard__slider .slider__content img').eq(slideIndex).addClass('current');
    });


});
