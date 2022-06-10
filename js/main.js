'use strict';

jQuery(function ($) {
  $(document).ready(function () {
    initActiveHeaderAfterScroll();
    initReviewsSlider();
    initMenuSettings();
    initHamburgerMenu();
    initOpenNewModal();
  });
  $(window).on({
    'orientationchange resize': function orientationchangeResize(e) {
      if ($('.js-hamburger-menu').hasClass('-active') && $(this).width() > 1199) removeFixedMenu();
    }
  }); // ANCHORS

  function initOpenNewModal() {
    $('#registration-modal, #recovery-modal').on('shown.bs.modal', function (e) {
      if (!$('body').hasClass("modal-open")) $('body').addClass("modal-open");
    });
  } // HAMBURGER MENU


  function initHamburgerMenu() {
    $('.js-hamburger-menu').on('click', function (e) {
      e.preventDefault();

      if ($(this).hasClass('-active')) {
        removeFixedMenu();
      } else {
        $(this).add(".fixed-menu, .menu-overlay").addClass('-active');
        $('.js-header').addClass('-box-shadow');
        scrollLock.disablePageScroll();
      }
    });
    $('.menu-overlay').click(function () {
      removeFixedMenu();
    });
  } //REMOVE FIXED MENU


  function removeFixedMenu() {
    $(".js-hamburger-menu, .fixed-menu, .menu-overlay").removeClass('-active');
    $('.js-header').removeClass('-box-shadow');
    scrollLock.enablePageScroll();
  } // MENU SETTINGS


  function initMenuSettings() {
    $('.menu__link').click(function (e) {
      var href = $(this).attr('href'),
          id = href.substr(href.indexOf("#"));

      if ($(id).length) {
        if ($('.fixed-menu').hasClass('-active')) removeFixedMenu();
        e.preventDefault();
        var top = $(id).offset().top;
        $('body,html').animate({
          scrollTop: top
        }, 777);
      }
    });
  } // ACTIVE HEADER AFTER SCROLL


  function initActiveHeaderAfterScroll() {
    var header = $('.js-header');
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 10) {
        header.addClass('-active');
      } else {
        header.removeClass('-active');
      }
    });

    if ($(document).scrollTop() > 10) {
      header.addClass('-active');
    }
  } // REVIEWS SLIDER


  function initReviewsSlider() {
    var $SliderElement = $('.js-reviews-slider'),
        $SliderShow = $SliderElement.find('.slideshow'),
        $SliderNav = $SliderElement.find('.reviews-slider__nav'),
        $SliderDotsArrowPrev = $SliderNav.find('.reviews-slider__arrow_prev'),
        $SliderDotsArrowNext = $SliderNav.find('.reviews-slider__arrow_next');

    if ($SliderElement.length) {
      $SliderShow.on('init reInit', function (event, slick) {
        if (slick.slideCount < 2) $SliderNav.hide();
      });
      $SliderDotsArrowPrev.click(function () {
        $SliderShow.slick('slickPrev');
      });
      $SliderDotsArrowNext.click(function () {
        $SliderShow.slick('slickNext');
      });
      $SliderShow.slick({
        dots: true,
        arrows: true,
        adaptiveHeight: true,
        speed: 500,
        appendDots: '.reviews-slider__dots',
        responsive: [{
          breakpoint: 1200,
          settings: {
            arrows: false
          }
        }, {
          breakpoint: 768,
          settings: {
            arrows: false
          }
        }]
      });
    }
  }
});