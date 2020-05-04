var rolltotal = 7;
var rollnum = Math.floor(Math.random()*1000) % rolltotal;

function rollbg(){
	$(".roll"+rollnum).animate({opacity:0},1000);
	rollnum = (rollnum+1)%rolltotal;
	$(".roll"+rollnum).animate({opacity:1},1000);
}

$(document).ready(function(){
	$(".roll"+rollnum).animate({opacity:1},1000);
	setInterval(rollbg,10000);
	setTimeout('$(".banner").animate({bottom:0},300)',5000)
});
	



