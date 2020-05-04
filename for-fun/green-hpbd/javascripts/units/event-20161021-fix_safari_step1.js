'use strict';

(function() {
  $("body").on('click', '#footer span:not(.btn-skip-roll)', function(event) {
    // event.preventDefault();
    // $("#footer").toggleClass('is-slideup');
    $("body").toggleClass('is-slideup-footer');
    $(this).closest('.footer-btn').addClass("is-hide").delay(300).queue(
      function(next){
        $('.footer-btn').removeClass("is-hide");
      next();
    });
  });


//CROP IMG
$(".btn-startcrop").on('click',  function(event) {
  event.preventDefault();
  /* Act on the event */
  $("#temp").html('');
$(".image-editor").removeClass("is-hide").find(".frame").removeClass("is-loading");
$(".image-mosaicer").addClass("is-hide");
$(".image-finalpreview").addClass("is-hide");
    $("body").addClass("is-croping");
    $("#popcrop").addClass('is-show');
    $("#popcrop").find(".cropit-image-input").click();


    $("#temp").html('');
    $('body').find('.outputimg-mosaic').remove();
    $('body').find('.outputimg-origin').remove();
    // $(".image-editor").show();
    // $(".image-mosaicer").hide();
    // $(".image-finalpreview").hide();

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
  imageBackground: true,
  imageBackgroundBorderWidth: 0,
  onImageError: function() {
      // alert("請選擇尺寸1200x628以上之圖片");
      console.log('error: error message is');
      console.log( error.message );
  },
  imageState: {
              src: "http://i.imgur.com/RzgeM2d.png",
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
    $(".image-editor").find(".frame").addClass("is-loading");
    var canvas1 = document.getElementById("canvas-drag");
    var context1 = canvas1.getContext("2d");

    var canvas2 = document.getElementById("canvas-final");
    var context2 = canvas2.getContext("2d");
    var imageData = $('.image-editor').cropit('export');
    // window.open(imageData);
    // console.log("儲存這張更改後的頭像：" + '<img src="'+imageData+'">' );
    console.log("export!");

    var w = 1200;
    var h = 628;
    var myImg = new Image();
    imageData = $('.image-editor').cropit('export');
    myImg.src = imageData;
    // context2.fillStyle = "#112233";
    // context2.fillRect(0,0,w,h);
    context1.globalCompositeOperation = "source-over";
    context1.drawImage(myImg,0,0,w,h);
    // context2.globalCompositeOperation = "source-over";
    // context2.drawImage(myImg,0,0,w,h);
$(".image-editor").addClass("is-hide");
$(".image-mosaicer").removeClass("is-hide").find(".frame").delay(300).queue(
  function(next){
    myImg.src = imageData;
    context1.drawImage(myImg,0,0,w,h);
    $(this).removeClass("is-loading");
  next();
});
$(".image-finalpreview").addClass("is-hide");
    // $(".image-editor").hide();
    // $(".image-mosaicer").show();
    // $(".image-finalpreview").hide();
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
rate = rate / 1200;
$("body").on('click', '.btn-donedrag', function(event) {
  event.preventDefault();
  /* Act on the event */
  $(".image-mosaicer").find(".frame").addClass("is-loading");
  rate = parseInt( $("#canvas-drag").width() );
  rate = rate / 1200;

    // $(".image-editor").hide();
    // $(".image-mosaicer").hide();
    // $(".image-finalpreview").show();

  var myw = $(".resize-drag").width() / rate;
  if (myw >1200){
    myw = 1200;
  } 
  var myh = $(".resize-drag").height() / rate;
  if (myh >628){
    myh = 628;
  }

  var myx = 0;
  var myy = 0;

  myx = $(".resize-drag").attr("data-x");
  myx = parseInt(myx) / rate;

  myy = $(".resize-drag").attr("data-y");
  myy = parseInt(myy) / rate;

  console.log("rate="+rate+",w=" +myw+",h="+myh+",x="+ myx + ",y="+ myy );

  var canvas1 = document.getElementById("canvas-drag");
  var context1 = canvas1.getContext("2d");

  var canvas2 = document.getElementById("canvas-final");
  var context2 = canvas2.getContext("2d");
  var w = 1200;
  var h = 628;
  // var myImg = new Image();
  // myImg.src = imageData;
  context2.globalCompositeOperation = "source-over";
  // context2.drawImage(myImg,0,0,w,h);

  // context2.fillStyle = "#112233";
  // context2.fillRect(0,0,w,h);

  var imgData = context1.getImageData(myx,myy,myw,myh);

  //DO MASAIC

  context2.putImageData(imgData,myx,myy);

  var img = document.createElement("img");
  img.src = canvas2.toDataURL("image/png");
  $("#temp").append(img).find("img:last-child()").addClass("m-img");
  img.pixelate();

  // var mosaicimg = document.createElement("img");
  // mosaicimg.src = $("#temp").find(".m-img").attr("src");

  context2.drawImage(canvas1,0,0,1200,628);
  var canvas3 = document.getElementById("tempCanvas2");
  var context3 = canvas2.getContext("2d");
  context2.drawImage(canvas3,0,0,1200,628);

  var dataURL1 = canvas1.toDataURL();
  // window.open(dataURL1);
  var dataURL2 = canvas2.toDataURL();
  // window.open(dataURL2);
  $(".imgurl-origin").val( dataURL1 );
  $(".imgurl-mosaic").val( dataURL2 );
  // $(".image-finalpreview").append('<img class="outputimg-origin" src="'+ dataURL1 +'">').append('<img class="outputimg-mosaic" src="'+ dataURL2 +'">');

$(".image-editor").addClass("is-hide");
$(".image-mosaicer").addClass("is-hide");
$(".image-finalpreview").removeClass("is-hide").find(".frame").removeClass("is-loading");

});


})();
