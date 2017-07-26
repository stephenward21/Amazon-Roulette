import React, { Component } from 'react';
import Canvas from 'react-canvas-component';

function drawCanvas({ctx, time}) {
	var options = ["Electronics", "Games", "Books", "Outdoors", "Jewelry", "Kindles", "Movies", "Music", "Kids" ]
	var startAngle = 0;
	var arc = Math.PI / (options.length / 2);
	var spinTimeout = null;

	var spinArcStart = 10;
	var spinTime = 0;
	var spinTimeTotal = 0;

	// function byte2Hex(n) {
	//   var nybHexString = "0123456789ABCDEF";
	//   return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
	// }

	function RGB2Color(r,g,b) {
		// r = '#FF0000';
		// g = '#006600';
		// b = '#000000';
		// return [r, g, b]

		return r = "#FF0000"
		return g = "#006600"
		return b = "#000000"
		// // return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
		// // r = "#FF0000"
		// // g = "#006600"
		// // b = "#000000"
	}

	function getColor(item, maxitem) {
	  var phase = 0;
	  var center = 128;
	  var width = 127;
	  var frequency = Math.PI*2/maxitem;
	  
	  var red   = Math.sin(frequency*item+2+phase) * width + center;
	  var green = Math.sin(frequency*item+0+phase) * width + center;
	  var black  = Math.sin(frequency*item+4+phase) * width + center;
	  
	  return RGB2Color(red,green,black);
	}
	
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 125;
    ctx.clearRect(0,0,500,500);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.font = 'bold 12px Helvetica, Arial';

    for(var i = 0; i < options.length; i++) {
      var angle = startAngle + i * arc;
      //ctx.fillStyle = colors[i];
      ctx.fillStyle = getColor(i, options.length);

      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;
      ctx.shadowBlur    = 0;
      ctx.shadowColor   = "rgb(220,220,220)";
      ctx.fillStyle = "black";
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 
                    250 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text = options[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    } 

    //Arrow
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();

}

export default drawCanvas;