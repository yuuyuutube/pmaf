var n=0;
var swidth=screen.width;
var sheight=screen.height;
var hframe1 = $("#startframe").css("height");
var hframe2 = $("#frame2").css("height");
var hframe3 = $("#frame3").css("height");
var hframe4 = $("#frame4").css("height");
var hframe5 = $("#frame5").css("height");
var scrollNow = 0;


//轉動
function rotate(obj,angle,value){
	$( obj ).css("-ms-transform" , "rotate(" + angle *value + "deg)");
	$( obj ).css("-webkit-transform" , "rotate(" + angle *value +"deg)");
	$( obj ).css("transform" , "rotate(" + angle *value + "deg)");
}

//obj橫向改變背景位置，設往返距離、參數、垂直高度
function movehorizon(obj,distance,value,y){
	$( obj ).css("background-position", distance *value +"px "+ y +"px");
	$( obj ).css("background-position-x", distance *value);
}

//在min~max間改變透明度，超過max則維持max
function setalpha(obj,value,min,max){
	var gap=max-min;
	if (min < value < max){
			h= value % gap;
		}
	if (value >= max){
			h= gap;
		}
	var h1= 1-(h/gap);
	var h2= 100 - h1*100;
	$( obj ).css("-moz-opacity",h1);
	$( obj ).css("opacity",h1);
	$( obj ).css("filter","alpha(opacity="+ h2 +")");
}

//氣球專用左右擺+等速上移
function balloon(obj,value,range,left,top){
	m=Math.abs( value%range - range/2);
	$( obj ).css("left",left - m);
	$( obj ).css("top",top - value*0.6);
}

//用全域變數n當變量控制obj等速左右擺，設往返距離d、背景垂直高度y，參數v
function wave( obj,distance,value,y ){
	n++;
	n=n%distance;
	var m=Math.abs(n-distance*0.5);
	movehorizon(obj,m,value,y);
}

//用value的sin當變量(正負一之間)使obj正弦速度往返，設往返距離d、背景垂直高度y，振幅sin(角度/週期)
function wavesin( obj,distance,value,y ){
	var speed=distance/(Math.PI);
	var m=Math.sin(value/speed)/(Math.PI);
	movehorizon(obj,distance,m,y);
}

//預執行
$( "#startframe" ).css("visibility", "hidden");
$( "#f2title" ).css("top", "-437px");
$( "#f2title" ).css("visibility", "hidden");
$( "#f2title_bar span" ).css("visibility", "hidden");
$( "#f2title_bar span" ).css("padding-top", "50px");
$( "#f2title_bar" ).css("background-position", "800px");
$( "#f2title_bar" ).css("background-position-x", "800px 0");
$( "#f2content" ).css("-moz-opacity",0);
$( "#f2content" ).css("opacity",0);
$( "#f2content" ).css("filter","alpha(opacity="+ 0 +")");
$( "#f2box1" ).css("margin-top", "1000px");
$( "#f2box2" ).css("margin-top", "1000px");
$( "#f2box3" ).css("margin-top", "1000px");
$( "#f2b3heart" ).css("-moz-opacity",0);
$( "#f2b3heart" ).css("opacity",0);
$( "#f2b3heart" ).css("filter","alpha(opacity="+ 0 +")");

$( "#frame2tree1" ).css("visibility", "hidden");
$( "#frame2tree1" ).css("top", "-900px");
$( "#frame2tree2" ).css("visibility", "hidden");
$( "#frame2tree2" ).css("top", "-500px");

$( "#building" ).css("visibility", "hidden");
$( "#building" ).css("top", "-900px");
$( "#cars" ).css("visibility", "hidden");
$( "#cars" ).css("top", "-900px");
$( "#frame3tree1" ).css("visibility", "hidden");
$( "#frame3tree1" ).css("top", "-900px");
$( "#frame3tree2" ).css("visibility", "hidden");
$( "#frame3tree2" ).css("left", "-400px");
$( "#f3title_round" ).css("visibility", "hidden");
$( "#f3title_round img" ).css("width", "10px");
$( "#f3title_round img" ).css("height", "10px");
$( "#f3title_bar" ).css("background-position", "-700px");
$( "#f3title_bar" ).css("background-position-x", "-700px 0");
$( "#f3title_bar span" ).css("visibility", "hidden");
$( "#f3title_bar span" ).css("padding-top", "0");

$( "#f4title" ).css("margin-top", "-600px");
$( "#f4title" ).css("visibility", "hidden");
$( "#f4title_bar" ).css("background-position", "-700px");
$( "#f4title_bar" ).css("background-position-x", "-700px 0");
$( "#f4title_bar span" ).css("visibility", "hidden");
$( "#f4title_bar span" ).css("padding-top", "0");

$( ".work_title" ).css("visibility", "hidden");
$( ".work_title" ).css("margin-top", "1000px");

$( "#f5title_bar" ).css("background-position", "-700px");
$( "#f5title_bar" ).css("background-position-x", "-700px 0");
$( "#f5title_bar span" ).css("visibility", "hidden");
$( "#f5title_bar span" ).css("padding-top", "0");

$( "#planet1,#planet2,#planet3" ).css("top", "-1200px");
$( "#planet1,#planet2,#planet3" ).css("visibility", "hidden");

//操作fix按鈕
$("#hideme").click(function(){
	$( "#fix" ).css("visibility", "hidden");
});
$("#backtop").click(function(){
	$('body,html').animate({scrollTop: 0 },"slow","swing",function(){});
});
$("#h1").click(function(){
	$('body,html').animate({scrollTop: parseInt(hframe1) },"slow","swing",function(){});
});
$("#h2").click(function(){
	$('body,html').animate({scrollTop: parseInt(hframe1) + parseInt(hframe2) },"slow","swing",function(){});
});
$("#h3").click(function(){
	$('body,html').animate({scrollTop: parseInt(hframe1) + parseInt(hframe2) + parseInt(hframe3) },"slow","swing",function(){});
});
$("#h4").click(function(){
	$('body,html').animate({scrollTop: parseInt(hframe1) + parseInt(hframe2) + parseInt(hframe3) + parseInt(hframe4) },"slow","swing",function(){});
});
$("#h5").click(function(){
	$('body,html').animate({scrollTop: parseInt(hframe1) + parseInt(hframe2) + parseInt(hframe3) + parseInt(hframe4) + parseInt(hframe5) },"slow","swing",function(){});
});

//卷軸DIY
//在沒js時用預設卷軸
$( "#news" ).css("overflow", "hidden");
$( "#news" ).css("overflow-y", "hidden");
$( "#newsscroll" ).css("display", "block");
//讀取三個高度
var news_h = $("#news").css("height");
var newswrapper_h = $("#newswrapper").css("height");
var track_h = $("#newsscroll_track").css("height");
//設bar大小
var bar_h = parseInt(news_h) * parseInt(news_h) / parseInt(newswrapper_h);
$( "#newsscroll_bar" ).css("height", parseInt(bar_h) );
//新聞與軌道個別可移動的空間
var track_distance = parseInt(track_h) - parseInt(bar_h);
var news_distance = parseInt(newswrapper_h) - parseInt(news_h);
if (news_distance <= 0){
	$( "#newsscroll" ).css("display", "none");
}

//卷軸跟內容跑-暫時用內容的scrollTop測
$( "#news_left" ).scroll(function(){
	var newsval=$(this).scrollTop();
	var scroll_per = parseInt(newsval) / parseInt(news_distance) ;
	var bar_goto = scroll_per * track_distance ;
	//$("#fix div").html( parseInt(newsval) + ","+ scroll_per + "," + parseInt(bar_goto));
	$( "#newsscroll_bar" ).css("top", parseInt(bar_goto) +"px");
});

//內容跟卷軸跑
	//卷軸跟滑鼠跑
var dragging = false;
var iX,iY;
$("#newsscroll_bar").mousedown(function(e) {
	dragging = true;
	iX = e.clientX - this.offsetLeft;
	iY = e.clientY - this.offsetTop;
	this.setCapture && this.setCapture();
	return false;
});
document.onmousemove = function(e) {
	var e = e || window.event;
	var oX = e.clientX - swidth/2;
	var oY2= e.clientY - sheight/2;
	//$("#fix div").html(oX);
	$( "#star1" ).css({"backgroundPositionX": (swidth - oX)*(-0.1) +"px"} );
	$( "#star2" ).css({"backgroundPositionX": (0.15)*(swidth - oX) +"px"} );

	if (dragging) {
	var e = e || window.event;
	var oY = e.clientY - iY;
	var ymax = parseInt(track_distance);
	if (oY > ymax )	{oY = ymax };
	if (oY < 0 )	{oY = 0 };
	var go_per = oY / ymax;
	var news_goto = parseInt(news_distance) * go_per * (-1) ;
	$("#newsscroll_bar").css({"top":oY + "px"});
	$("#newswrapper").css({"margin-top":news_goto + "px"});
	return false;
	}
};
$(document).mouseup(function(e) {
	dragging = false;
	$("#newsscroll_bar")[0].releaseCapture();
	e.cancelBubble = true;
})

//上下鍵
var perclick = 200;
var wrapmt = $("#newswrapper").css("margin-top");
//卷軸跟新聞走
function followNews(clickVal){
	var scroll_per = parseInt(clickVal) / parseInt(news_distance) ;
	var bar_goto = scroll_per * track_distance *(-1) ;
	$( "#newsscroll_bar" ).animate({top: parseInt(bar_goto) +"px"});
}

$("#newsscroll_up").click(function(){
	wrapmt = $("#newswrapper").css("margin-top");
	if(parseInt(wrapmt)*(-1) > perclick){
		var upto= parseInt(wrapmt)+perclick;
		$("#newswrapper").animate({"margin-top":upto + "px"});
		followNews(upto);
	}
	else{
		$("#newswrapper").animate({"margin-top":0 + "px"});
		followNews(0);
	}
});

$("#newsscroll_down").click(function(){
	wrapmt = $("#newswrapper").css("margin-top");
	if( news_distance + parseInt(wrapmt) > perclick){
		var downto= parseInt(wrapmt)-perclick;
		$("#newswrapper").animate({"margin-top":downto + "px"});
		followNews(downto);
	}
	else{
		$("#newswrapper").animate({"margin-top":news_distance*(-1) + "px"});
		followNews(news_distance*(-1));
	}
});

//新聞展開
/*
$(".newscontent").css("height", "0");
$(".newscontent").css("overflow", "hidden");
$(".newsbar").click(function(){
	$('.newscontent').animate({height:"0"});
	$('+ .newscontent', this).animate({height:"200px"});
});
*/

//三角內容
$(".tri div").hover(function(){
    $('> p:first-child', this).stop(true, true).animate({ marginTop: "-150px" });
	$('> p', this).css("background-color","#6f974c");
}, function() {
	$('> p', this).css("background-color","#79a653");
    $('> p:first-child', this).stop(true, true).animate({ marginTop: "0" });
});
$(".tris div").hover(function(){
    $('> p:first-child', this).stop(true, true).animate({ marginTop: "-120px" });
	$('> p', this).css("background-color","#6f974c");
}, function() {
	$('> p', this).css("background-color","#79a653");
    $('> p:first-child', this).stop(true, true).animate({ marginTop: "0" });
});


//視窗捲動事件
$(window).scroll(function () {
	var scrollVal = $(this).scrollTop();
	$("#fix div").html("scrolltop=" + scrollVal + "<br/>h1=" + hframe1 + ",h2=" + hframe2 + "<br/>h3=" + hframe3 + ",h4=" + hframe4 );
	rotate("#round1",scrollVal,0.15);
	setalpha("#round1",scrollVal,0,700);
	balloon("#balloon",scrollVal,300,400,400);
	wavesin("#frame4",1000,scrollVal,500);

	if(scrollVal > 500){
		$( "#frame2tree1" ).css("visibility", "visible");
		$( "#frame2tree1" ).animate({top:"50px"});
	}

	if(scrollVal > 800){
		$( "#f2title" ).css("visibility", "visible");
		$( "#f2title" ).animate({top:"80px"});
		setTimeout('$( "#f2title_bar" ).animate({backgroundPosition:"0"});', 600);
		setTimeout('$( "#f2title_bar" ).animate({backgroundPositionX:"0"});', 600);

		setTimeout('$( "#f2title_bar span" ).css("visibility", "visible");', 1200);
		setTimeout('$( "#f2title_bar span" ).animate({paddingTop:"90px"});', 1200);
	}
	if(scrollVal > 899){
		$( "#f2content" ).fadeTo( 1000, 1 );
		$( "#f2box1" ).animate({marginTop:"0"});
		setTimeout('$( "#f2box2" ).animate({marginTop:"50px"});', 200);
		setTimeout('$( "#f2box3" ).animate({marginTop:"50px"});', 400);	
		setTimeout('$( "#f2box4" ).animate({marginTop:"0"});', 400);	
	}
	if(scrollVal > 1300){
		$( "#frame2tree2" ).css("visibility", "visible");
		$( "#frame2tree2" ).animate({top:"900px"});
		$( "#f2b3heart" ).fadeTo( 1000, 1 );
	}
	if(scrollVal > 2200){
		$( "#building" ).css("visibility", "visible");
		$( "#building" ).animate({top:"-140px"});
	}
	if(scrollVal > 2350){
		$( "#cars" ).css("visibility", "visible");
		$( "#cars" ).animate({top:"400px"});
	}
	if(scrollVal > 2500){
		$( "#frame3tree1" ).css("visibility", "visible");
		$( "#frame3tree1" ).animate({top:"50px"});
		setTimeout('$( "#f3title_round" ).css("visibility", "visible");',500);
		setTimeout('$( "#f3title_round img" ).animate({width:"259px",height:"259px"});', 500);
		setTimeout('$( "#f3title_bar" ).animate({backgroundPosition:"0"});', 1200);
		setTimeout('$( "#f3title_bar" ).animate({backgroundPositionX:"0"});', 1200);

		setTimeout('$( "#f3title_bar span" ).css("visibility", "visible");', 1700);
		setTimeout('$( "#f3title_bar span" ).animate({paddingTop:"35px"});', 1700);
	}
	if(scrollVal > 2700){
		$( "#frame3tree2" ).css("visibility", "visible");
		$( "#frame3tree2" ).animate({left:"130px"});
	}
	if(scrollVal > 4200){
		$( "#f4title" ).css("visibility", "visible");
		$( "#f4title" ).animate({marginTop:"0px"},"slow");
		setTimeout('$( "#f4title_bar" ).animate({backgroundPosition:"0"});', 500);
		setTimeout('$( "#f4title_bar" ).animate({backgroundPositionX:"0"});', 500);
		setTimeout('$( "#f4title_bar span" ).css("visibility", "visible");', 1200);
		setTimeout('$( "#f4title_bar span" ).animate({paddingTop:"40px"});', 1200);
	}
	if(scrollVal > 4499){
		$( ".work_title" ).css("visibility", "visible");
		$( ".work_title" ).animate({marginTop:"0px"},"slow");
	}
	if(scrollVal > 5000){
		$( ".boat" ).animate({left:"-1200px"},4000);
	}
	if(scrollVal > 6800){
		$( "#flow" ).animate({height:"80px"},1500);
		setTimeout('$( "#f5title_bar" ).animate({backgroundPosition:"0"});', 1500);
		setTimeout('$( "#f5title_bar" ).animate({backgroundPositionX:"0"});', 1500);
		setTimeout('$( "#f5title_bar span" ).css("visibility", "visible");', 2000);
		setTimeout('$( "#f5title_bar span" ).animate({paddingTop:"40px"});', 2000);
	}

	var stardis= parseInt(hframe1) + parseInt(hframe2) + parseInt(hframe3) + parseInt(hframe4) +200;
	var hs1= (scrollVal - stardis) * 1.2; 
	var hs2= (stardis - scrollVal) * 0.6;
	$("#star1").css("background-position-y",hs1 +"px");
	$("#star2").css("background-position-y",hs2 +"px");
	
	if(scrollVal > 6950){
		$( "#planet2" ).css("visibility", "visible");
		$( "#planet2" ).animate({top:"100px"});
	}
	if(scrollVal > 7000){
		$( "#planet3" ).css("visibility", "visible");
		$( "#planet3" ).animate({top:"250px"});
	}
	if(scrollVal > 7200){
		$( "#planet1" ).css("visibility", "visible");
		$( "#planet1" ).animate({top:"400px"});
	}
	if(scrollVal < 6800){
		$( "#footer" ).css("bottom","-100px");
	}
	if(scrollVal > 7300){
		$( "#footer" ).stop(true, false).animate({bottom:"0"});
	}
	if(scrollVal < scrollNow){
		$( "#footer" ).stop(true, false).animate({bottom:"-100px"});
	}
	scrollNow = scrollVal;
});

//星星沿cursor左右移
/*跟卷軸衝到，併在那裏
window.onload = init;
function init() {
	if (window.Event) {
	document.captureEvents(Event.MOUSEMOVE);
	}
	document.onmousemove = getCursorXY;
}

function getCursorXY(e) {
	var oX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	//$("#fix div").html( "oX=" + oX );
	$( "#star1" ).css({"backgroundPositionX": (swidth - oX)*(-0.1) +"px"} );
	$( "#star2" ).css({"backgroundPositionX": (0.15)*(swidth - oX) +"px"} );
}
*/

//執行
$(document).ready(function(){
$( "#startframe" ).css("visibility", "visible");
	setInterval('wave("#startframe",400,1,0);', 50 );

});