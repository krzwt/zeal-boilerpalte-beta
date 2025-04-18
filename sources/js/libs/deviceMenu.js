import $ from 'jquery';

const DeviceMenu = () => {
    /* Responsive jQuery Navigation */
    const $hamBurger = $('.hamburger');
    const $overlay = $('.mbnav__backdrop');
  
    const menuClose = () => {
        $hamBurger.removeClass('is-clicked');
        $('body').removeClass('scroll-fixed');
        $('.mbnav').removeClass('is-open');
        $('.mbnav .menu-wrap li').removeClass('is-open');
        $('.mbnav__inner > .menu-wrap').css('--leftSlide', '0');
    };
  
    /* Mobile overlay click */
    $overlay.on('click', () => {
        menuClose();
    });
  
    $hamBurger.on('click', function() {
        if ($(this).hasClass('is-clicked')) {
            menuClose();
        } else {
            $(this).addClass('is-clicked');
            $('.mbnav').addClass('is-open');
            $('body').addClass('scroll-fixed');
        }
    });
  
    const clickable = $('.mbnav__state').attr('data-clickable');
    $('.mbnav li:has(ul)').addClass('has-sub');
    $('.mbnav li > ul').addClass('sub-menu');
    $('.mbnav .has-sub > a').after('<em class="mbnav__caret"></em>');
  
    $('.mbnav ul > li:has(ul.sub-menu)').each(function() {
        $(this).find('> ul').prepend('<li class="back-click">Main Menu</li>');
    });
  
    if (clickable === 'true') {
        $('.mbnav .has-sub > .mbnav__caret').addClass('trigger-caret');
    } else {
        $('.mbnav .has-sub > a').addClass('trigger-caret').attr('href', 'javascript:;');
    }
  
    // Wrap content
    $('.mbnav__inner > *').wrapAll(
        '<div class=\'menu-wrap\'><div class=\'menu-inner\'></div></div>',
    );
  
    $('.mbnav__inner ul li.has-sub ul').wrap(
        '<div class=\'menu-wrap\'><div class=\'menu-inner\'></div></div>',
    );
  
    // Open menu on caret click
    $('.mbnav .has-sub > .trigger-caret').on('click', function() {
        const $element = $(this).parent('li');
        $element.addClass('is-open');
        $('body').addClass('scroll-fixed');
    
        const $menuLeftMove = $('.mbnav__inner > .menu-wrap');
        const backMove = $menuLeftMove.css('--leftSlide');
        $menuLeftMove.css('--leftSlide', `${parseInt(backMove, 10) + 100}%`);
    });
  
    // Handle back click
    $('.mbnav__inner .back-click').on('click', function() {
        $(this).closest('li').removeClass('is-open');    
        const $menuLeftMove = $('.mbnav__inner > .menu-wrap');
        const backMove = $menuLeftMove.css('--leftSlide');
        $menuLeftMove.css('--leftSlide', `${parseInt(backMove, 10) - 100}%`);
    });
  
    // Set padding from header height
    const headerHeight = $('header.main-header').outerHeight();
    $('.mbnav .menu-wrap > .menu-inner').css('padding-top', headerHeight);
};
  
export default DeviceMenu;
  