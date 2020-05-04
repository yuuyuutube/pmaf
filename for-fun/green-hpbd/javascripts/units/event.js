'use strict';
if (navigator.userAgent.match(/iphone/i)){
  // alert("iOS");
}
(function() {
  $("body").on('click', '#footer span:not(.btn-skip-roll)', function(event) {
    // event.preventDefault();
    $("body").toggleClass('is-slideup-footer');
    $(this).closest('.footer-btn').addClass("is-hide").delay(300).queue(
      function(next){
        $('.footer-btn').removeClass("is-hide");
      next();
    });
  });

//CROP IMG
$(".btn-startcrop").on('click',  function(event) {
  // event.preventDefault();
  /* Act on the event */
  $("#temp").html('');
  $(".image-editor").removeClass("is-hide").find(".frame").removeClass("is-loading");
  $(".image-mosaicer").addClass("is-hide");
  $(".image-finalpreview").addClass("is-hide");
  $("body").addClass("is-croping");
  $("#popcrop").addClass('is-show');
  $("#popcrop").find(".cropit-image-input").focus().click();
  // popFileSelector();


  $("#temp").html('');
  $('body').find('.outputimg-mosaic').remove();
  $('body').find('.outputimg-origin').remove();

});

$("#popcrop").on('click', '.btn-popclose', function(event) {
  event.preventDefault();
  /* Act on the event */
  $("#popcrop").removeClass('is-show');
});

$("#popcrop").find('.image-editor').cropit({
  exportZoom: 1,
  maxZoom: 3,
  smallImage: 'stretch',
  imageBackground: false,
  imageBackgroundBorderWidth: 0,
  onImageLoaded: function() {
    $(".image-editor .funcbox p").text('裁切圖片'); //移除提示文字
    var image = new Image();

    var img_w = $('.image-editor').cropit('imageSize').width;
    console.log( "w = " + img_w );
    var img_h = $('.image-editor').cropit('imageSize').height;
    console.log( "h = " + img_h );
    // getExif();
    if ( img_w > 5184 && img_h > 5184 ){
      alert("圖片過大，請選擇其他圖片");
      $(".image-editor .funcbox p").fadeOut(200).delay(100).queue(
        function(next){
          $(this).text('請選擇圖片').fadeIn(300);
        next();
      });
      $('.cropit-preview-image').removeAttr("src");
      // $("#popcrop").find(".cropit-image-input").focus().click();
    }else{

    image.src = $("body").find(".cropit-preview-image").eq(0).attr("src");
    //fix iOS photo rotate bug
    EXIF.getData( image , function() {
        var myOri = EXIF.getTag(this, 'Orientation');
        console.log( "EXIF CALLBACK! Orientation is : " );
        console.log( myOri );
        // console.log( image );
        if ( typeof myOri != undefined ){
          // alert(myOri);
          // selectFileImage( image , myOri , ".cropit-preview-image" );
          $(".image-editor").find(".frame").addClass("is-loading");
          if ( myOri == 6 ){

          var canvas = document.getElementById("fixIOS");
          var ctx = canvas.getContext("2d");
          var dataURL = 0;
          canvas.width = img_h;
          canvas.height = img_w;
          ctx.drawImage(image, 0, 0);
          ctx.rotate(90*Math.PI/180);
          ctx.drawImage(image,0,0, img_w,-img_h);
          // ctx.fillRect(0,0,img_w,-img_h);
          dataURL = canvas.toDataURL("image/png");
          console.log(dataURL);         
          // $('.cropit-preview-image').attr("src",dataURL);
          $("#popcrop").find('.image-editor').cropit('imageSrc', dataURL ).delay(100).queue(
            function(next){
            $(".image-editor").find(".frame").removeClass("is-loading");
            next();
          });
          }else
          if ( myOri == 8 ){

          var canvas = document.getElementById("fixIOS");
          var ctx = canvas.getContext("2d");
          var dataURL = 0;
          canvas.width = img_h;
          canvas.height = img_w;
          ctx.drawImage(image, 0, 0);
          ctx.rotate(-90*Math.PI/180);
          ctx.drawImage(image,0,0, -img_w,img_h);
          // ctx.fillRect(0,0,img_w,-img_h);
          dataURL = canvas.toDataURL("image/png");
          console.log(dataURL);         
          // $('.cropit-preview-image').attr("src",dataURL);
          $("#popcrop").find('.image-editor').cropit('imageSrc', dataURL ).delay(100).queue(
            function(next){
            $(".image-editor").find(".frame").removeClass("is-loading");
            next();
          });       
          }else
          if ( myOri == 3 ){

          var canvas = document.getElementById("fixIOS");
          var ctx = canvas.getContext("2d");
          var dataURL = 0;
          canvas.width = img_w;
          canvas.height = img_h;
          ctx.drawImage(image, 0, 0);
          ctx.rotate(180*Math.PI/180);
          ctx.drawImage(image,0,0, -img_w,-img_h);
          // ctx.fillRect(0,0,img_w,-img_h);
          dataURL = canvas.toDataURL("image/png");
          console.log(dataURL);         
          // $('.cropit-preview-image').attr("src",dataURL);
          $("#popcrop").find('.image-editor').cropit('imageSrc', dataURL ).delay(100).queue(
            function(next){
            $(".image-editor").find(".frame").removeClass("is-loading");
            next();
          });       
          }else{
            $(".image-editor").find(".frame").removeClass("is-loading");
          }   

        }
    });

    }
  },
  onImageError: function() {
      // alert("請選擇尺寸1200x628以上之圖片");
      console.log('error: error message is');
      console.log( error.message );
  },
  imageState: {
              // src: "http://i.imgur.com/RzgeM2d.png",
              offset: {
                  x: 0,
                  y: 0
              }
            }
});

  $('.rotate-cw').click(function() {
    $('.image-editor').cropit('rotateCW');
  });
  
  $('.rotate-ccw').click(function() {
    $('.image-editor').cropit('rotateCCW');
  });

  //下一步
  $('.export').click(function() {
    if( $(".cropit-preview-image").is('[src]') ){
      // alert("has img");
      $(".image-editor").find(".frame").addClass("is-loading");
      var canvas1 = document.getElementById("canvas-drag");
      var context1 = canvas1.getContext("2d");
      var canvas2 = document.getElementById("canvas-final");
      var context2 = canvas2.getContext("2d");
      var imageData = $('.image-editor').cropit('export');

      var w = 1200;
      var h = 628;
      var myImg = new Image();
      imageData = $('.image-editor').cropit('export');
      myImg.src = imageData;
      context1.globalCompositeOperation = "source-over";
      context1.drawImage(myImg,0,0,w,h);
      $(".image-editor").addClass("is-hide");
      $(".image-mosaicer").removeClass("is-hide").find(".frame").delay(300).queue(
        function(next){
          //should do twice to fix iOS bug
          myImg.src = imageData;
          context1.drawImage(myImg,0,0,w,h);
          $(this).removeClass("is-loading");
          console.log("export!");
        next();
      });
      $(".image-finalpreview").addClass("is-hide");
    }
  else{
      // alert("請選擇圖片");
      $(".image-editor .funcbox p").fadeOut(200).delay(100).queue(
        function(next){
          $(this).text('請選擇圖片').fadeIn(300);
        next();
      });
      $("#popcrop").find(".cropit-image-input").focus().click(); 
      // popFileSelector();
  }

  });


//Drag and Resize
interact('.resize-drag')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');
    }
  })
  .resizable({
    preserveAspectRatio: false,
    restrict: {
      restriction: "parent",
      endOnly: true,
    },
    edges: { left: true, right: true, bottom: true, top: true }
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    // target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;

var rate = parseInt( $("#canvas-drag").width() );
var initialw = 1200;
rate = rate / initialw;

$("body").on('click', '.btn-donedrag', function(event) {
  event.preventDefault();
  $(".image-mosaicer").find(".frame").addClass("is-loading");
  /* Act on the event */
  var myw = $(".resize-drag").width() / rate;
  var myh = $(".resize-drag").height() / rate;
  var myx = 0;
  var myy = 0;
  var canvas1 = document.getElementById("canvas-drag");
  var context1 = canvas1.getContext("2d");
  var canvas2 = document.getElementById("canvas-final");
  var context2 = canvas2.getContext("2d");
  var w = 1200;
  var h = 628;
  var imgData = context1.getImageData(myx,myy,myw,myh);
  var img = document.createElement("img");
  var canvas3 = document.getElementById("tempCanvas2");
  var context3 = canvas2.getContext("2d");
  var dataURL1 = canvas1.toDataURL();
  var dataURL2 = canvas2.toDataURL();

  if (myw >1200){ myw = 1200; } 
  if (myh >628){ myh = 628; }
 
  rate = parseInt( $("#canvas-drag").width() );
  rate = rate / initialw;
  myx = $(".resize-drag").attr("data-x");
  myx = parseInt(myx) / rate;
  myy = $(".resize-drag").attr("data-y");
  myy = parseInt(myy) / rate;
  console.log("rate="+rate+",w=" +myw+",h="+myh+",x="+ myx + ",y="+ myy );
  context2.globalCompositeOperation = "source-over";
  //先把選擇的區域裁剪出來，暫時借放到canvas2一下(以外空白)
  imgData = context1.getImageData(myx,myy,myw,myh); //裁剪出來
  context2.putImageData(imgData,myx,myy); //借放一下


  //DO MASAIC
  //把借放在canvas2的圖片建立成圖片，跑馬賽克
  img.src = canvas2.toDataURL("image/png");
  $("#temp").append(img).find("img:last-child()").addClass("m-img");
  $("body").find(".m-img").delay(300).queue(
    function(next){
      $(this).pixelate();
    next();
  }).delay(1000).queue(
    function(next){
    //跑完pixelate馬賽克之後生成兩個新canvas，其中有ID=tempCanvas2的才有打碼
    context2.drawImage(canvas1,0,0,1200,628);//把裁剪好的原圖畫回去canvas2
    // pixelate完才會生出這個ID的CANVAS
    canvas3 = document.getElementById("tempCanvas2");
    context3 = canvas2.getContext("2d");
    context2.drawImage(canvas3,0,0,1200,628); //把有打碼的區塊畫回去canvas2

    dataURL1 = canvas1.toDataURL();//沒打碼的canvas，把圖像資料轉成網址
    dataURL2 = canvas2.toDataURL();//有打碼的canvas，把圖像資料轉成網址
    $(".imgurl-origin").val( dataURL1 );//存到input
    $(".imgurl-mosaic").val( dataURL2 );//存到input

    $(".image-editor").addClass("is-hide");
    $(".image-mosaicer").addClass("is-hide");
    $(".image-finalpreview").removeClass("is-hide").find(".frame").removeClass("is-loading");
    
  next();
});
  // $(".image-finalpreview").append('<img class="outputimg-origin" src="'+ dataURL1 +'">').append('<img class="outputimg-mosaic" src="'+ dataURL2 +'">');


});


})();
