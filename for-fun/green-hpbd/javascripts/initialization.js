'use strict';
var scrollNow = 0;

$(window).scroll(function () {
  var scrollVal = parseInt($(this).scrollTop());
  // console.log("scrollVal = "+scrollVal+",scrollNow = "+scrollNow);
  if( (scrollVal > 45) && (scrollVal > scrollNow) ){
      $("body").addClass('is-scrolled');
  }else{
      $("body").removeClass('is-scrolled');
  }
  scrollNow = scrollVal;
});

//on Document Ready
(function() {

  $("body").on('click', '.photo-item:not(.is-active), .photo-head', function(event) {
    event.preventDefault();
    /* Act on the event */
    console.log(event.target);
    $("body").toggleClass('is-zoomin');
    $(".photo-item").removeClass('is-active');
    if ( $(this).hasClass("photo-item") ){
      $(this).toggleClass("is-active");

    }else{
      // $(this).closest(".photo-item").addClass("is-active");
    }
  });

  $("body").on('click', '.icon-like', function(event) {
    event.preventDefault();
    /* Act on the event */
    var likenum = 1;
    $(this).find("i").toggleClass('fa-heart-o').toggleClass('fa-heart');

    if( $(this).find("i").eq(0).hasClass('fa-heart') ){
      // alert("add");
      likenum = $(this).closest('.photo-content').find(".likenum").attr("data-num");
      likenum = parseInt(likenum);
      $(this).closest('.photo-content').find(".likenum").text(likenum + 1);

    }else{
      // alert("--");      
      likenum = $(this).closest('.photo-content').find(".likenum").attr("data-num");
      likenum = parseInt(likenum);
      $(this).closest('.photo-content').find(".likenum").text(likenum);
    }

  });
  // 執行 FastClick
  FastClick.attach(document.body);
})();