'use strict';

function resizeTabs() {
    var e = $(window).width();
    return e >= 1024 ? 4 : 1;
};
function resizeFunc(){
      mySwiper1.params.slidesPerView = resizeTabs();
};

var mySwiper1 = new Swiper ('.section-scene1 .swiper-container', {
  loop: true,
  paginationClickable: true,
  simulateTouch: false,
  slidesPerView: resizeTabs(),
  pagination: '.section-scene1 .swiper-pagination',
  nextButton: '.section-scene1 .swiper-button-next',
  prevButton: '.section-scene1 .swiper-button-prev',
});        

var mySwiper2 = new Swiper ('.section-scene2 .swiper-container', {
  loop: true,
  paginationClickable: true,
  pagination: '.section-scene2 .swiper-pagination',
  nextButton: '.section-scene2 .swiper-button-next',
  prevButton: '.section-scene2 .swiper-button-prev',
});

function resizeNews() {
    var e = $(window).width();
    return (e >= 1024) ? 4 : 'auto';
};

function resizeDirection() {
    var e = $(window).width();
    return (e >= 1024) ? 'horizontal'  : 'vertical';
};

var mySwiper4 = new Swiper ('.section-scene4 .swiper-container', {
  loop: false,
  // direction: resizeDirection(),
  // slidesPerView: resizeNews(),
  slidesPerView: 4,
  nextButton: '.section-scene4 .swiper-button-next',
  prevButton: '.section-scene4 .swiper-button-prev',
});

(function() {
  if ( $(window).width() <= 1024 ){
    // mySwiper4.destroy();
  }
  $("body").on('click', '.section-scene1 .back', function(event) {
    // event.preventDefault();
    var myindex = $(this).closest('.swiper-slide').attr('data-swiper-slide-index');
    console.log( myindex );
    mySwiper2.slideTo( parseInt(myindex)+1 );
  });

  $("body").on('click', '.goto-scene1', function(event) {
    // event.preventDefault();
      $('html,body').animate({ scrollTop:( 0 )}, 500);
      $("body").removeClass('scene2').removeClass('scene3').removeClass('scene4').addClass('scene1');
  });

  $("body").on('click', '.goto-scene2', function(event) {
    event.preventDefault();
      $('html,body').animate({ scrollTop:( 0 )}, 500);
      $("body").removeClass('scene1').removeClass('scene3').removeClass('scene4').addClass('scene2');
  });

  $("body").on('click', '.goto-scene3', function(event) {
    event.preventDefault();
      $('html,body').animate({ scrollTop:( 0 )}, 500);
      $("body").removeClass('scene1').removeClass('scene2').removeClass('scene4').addClass('scene3'); 
  });

  $("body").on('click', '.goto-scene4', function(event) {
    event.preventDefault();
      $('html,body').animate({ scrollTop:( 0 )}, 500);
      $("body").removeClass('scene1').removeClass('scene2').removeClass('scene3').addClass('scene4'); 
  });

function openFooter(){
  $(".layout-container").removeClass('is-covered');
  $("#footer").addClass("is-open");
  $('.btn-skip-roll').fadeOut('300').delay(300).queue(
    function(next){
      $(this).remove();
    next();
  });
};

  $("body").on('click', '#footer', function(event) {
    // event.preventDefault();
    openFooter();
    $(this).closest('.footer-btn').addClass("is-hide").delay(3000).queue(
      function(next){
        $('.footer-btn').removeClass("is-hide");
      next();
    });

  });


  $("body").on('click', '#footer span:not(.btn-skip-roll)', function(event) {
    // event.preventDefault();
    $(this).closest('.footer-btn').addClass("is-hide").delay(300).queue(
      function(next){
        $('.footer-btn').removeClass("is-hide");
      next();
    });
  });


  //do on document ready
   $("#footer").addClass("is-roll").delay(20000).queue(
    function(next){
      openFooter();
    next();
  });

   //reconize  #1~#4
  if( window.location.hash ){
    var myhash = parseInt( window.location.hash.substring(1) );
    // alert(myhash);
    openFooter();
    $('html,body').animate({ scrollTop:( 0 )}, 500);
    $("body").removeClass('scene1').removeClass('scene2').removeClass('scene3').removeClass('scene4').addClass('scene'+ myhash);
  }


  $(window).resize(function() {
    resizeFunc();
  });

  $(document).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function(event) {
    event.preventDefault();
    /* Act on the event */
    resizeFunc();
  });

})();
