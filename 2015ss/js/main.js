var headerh = 310;
var introdelaytime = 2500;
var delaytime = 3000;
var windTime = 60;

function scrollSubMenu(num){
  $(".submenu>ul>li").eq(num).click(function() {
    var newoffset = parseInt( $('.center-box').eq(num).offset().top );
    $('html,body').animate({ scrollTop:( newoffset - headerh )}, 800);
  });
}

function doIntro(){
  $(".intro").delay(500).queue(
    function(next){$(this).addClass("is-cut1");next();})
    .delay(introdelaytime).queue(
    function(next){$(this).addClass("is-cut2");next();})
    .delay(introdelaytime).queue(
    function(next){$(this).addClass("is-cut3");next();})
    .delay(introdelaytime).queue(
    function(next){$(this).addClass("is-cut4");next();})
    .delay(introdelaytime).queue(
    function(next){$(this).addClass("is-cut5");next();})
    ;
}

function doWindBell(){
  $(".submenu-windbell").delay(500).queue(
    function(next){$(this).addClass("is-bell1");next();})
    .delay(windTime).queue(
    function(next){$(this).removeClass("is-bell1").addClass("is-bell2");next();})
    .delay(windTime).queue(
    function(next){$(this).removeClass("is-bell2").addClass("is-bell3");next();})
    .delay(windTime).queue(
    function(next){$(this).removeClass("is-bell3").addClass("is-bell4");next();})
    .delay(windTime).queue(
    function(next){$(this).removeClass("is-bell4").addClass("is-bell5");next();})
    .delay(windTime).queue(
    function(next){$(this).removeClass("is-bell5").addClass("is-bell6");next();})
    .delay(windTime).queue(
    function(next){$(this).removeClass("is-bell6").addClass("is-bell7");next();})
    .delay(windTime).queue(
    function(next){$(this).removeClass("is-bell7").addClass("is-bell8");next();})
    .delay(windTime).queue(
    function(next){$(this).removeClass("is-bell8").addClass("is-bell1");next();})
    .delay(windTime).queue(
    function(next){$(this).removeClass("is-bell1").addClass("is-bell3");next();})
    .delay(windTime).queue(
    function(next){$(this).removeClass("is-bell3").addClass("is-bell4");next();})
    .delay(windTime).queue(
    function(next){$(this).removeClass("is-bell4").addClass("is-bell5");next();})
    .delay(windTime).queue(
    function(next){$(this).removeClass("is-bell5").addClass("is-bell6");next();})
    .delay(windTime).queue(
    function(next){$(this).removeClass("is-bell6").addClass("is-bell8");next();})
    .delay(windTime).queue(
    function(next){$(this).removeClass("is-bell8");next();});
}

function switchBg(){
  $(".container").addClass('bg2').delay(delaytime).queue(
    function(next){$(this).removeClass('bg2').addClass('bg3');
  next();}).delay(delaytime).queue(
    function(next){$(this).removeClass('bg3');
  next();})
  ;
}

$(function(){
  var subcount = $(".submenu").find("ul").find("li").length;
  for (i=0; i<subcount ;i++) {
    scrollSubMenu(i);
  };

  $(".back-top").click(function() {
    $('html,body').animate({ scrollTop:( 0 )}, 800);
  });

  if(jQuery.browser.mobile)
  {
    $("body").addClass("mobile");
    // console.log('You are using a mobile device!'); 
  }
  else
  {
    $("body").addClass("desk");
    // console.log('You are not using a mobile device!');
  }
  $(".intro-skip").click(function() {
    $(".intro").remove(); 
  });

  doIntro();
  switchBg();
  setInterval( "switchBg();" , delaytime*3 );

  $(window).on('scroll', function(e) {
    var scrollVal = $(this).scrollTop();
    $(".submenu").css("top", scrollVal );
    $(".left-theme").css("top", scrollVal);
    $(".right-theme").css("top", scrollVal);
    if (scrollVal > 50){
      $(".back-top").css("opacity",0.8);
    }
    else{
      $(".back-top").css("opacity",0);
    }
    scrollNow = scrollVal;  
    // console.log(e.type + '-event was 500ms not triggered');
    doWindBell();
  }, 500);

});