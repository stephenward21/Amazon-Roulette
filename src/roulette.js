
export default function() {

	var options = ["Electronics",  "Books", "Tools & Hardware", "Beauty", "Video Games", "Music", "Kids Toys", "Baby" ]
	var startAngle = 0;
	var arc = Math.PI / (options.length / 2);
	var spinTimeout = null;

	var spinArcStart = 10;
	var spinTime = 0;
	var spinTimeTotal = 0;

	var ctx;

	function drawRouletteWheel() {
	  var canvas = document.getElementById("canvas");
	  if (canvas.getContext) {
	    var outsideRadius = 200;
	    var textRadius = 160;
	    var insideRadius = 125;

	    ctx = canvas.getContext("2d");
	    ctx.clearRect(0,0,500,500);

	    ctx.strokeStyle = "black";
	    ctx.lineWidth = 2;

	    ctx.font = 'bold 12px Helvetica, Arial';

	    for(var i = 0; i < options.length; i++) {
	      var angle = startAngle + i * arc;
	      //ctx.fillStyle = colors[i];
	      // ctx.fillStyle = getColor(i, options.length);
	      if (i % 2){
	      	ctx.fillStyle = 'red';
	      }else{
	      	ctx.fillStyle = 'black';
	      }

	      ctx.beginPath();
	      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
	      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
	      ctx.stroke();
	      ctx.fill();

	      ctx.save();
	      ctx.shadowOffsetX = -1;
	      ctx.shadowOffsetY = -1;
	      ctx.shadowBlur    = 0;
	      // ctx.shadowColor   = "rgb(220,220,220)";
	      ctx.fillStyle = "blue";
	      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 
	                    250 + Math.sin(angle + arc / 2) * textRadius);
	      ctx.rotate(angle + arc / 2 + Math.PI / 2);
	      var text = options[i];
	      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
	      ctx.restore();
	    } 

	    //Arrow
	    ctx.fillStyle = "white";
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

	  
	  
	}

	

	drawRouletteWheel();
	var spinAngleStart = Math.random() * 2 + 10;
	spinTime = 0;
	spinTimeTotal = Math.random() *  + 20 * 1000;
	spinTime += 30;
	var spinAngleStart = Math.random() * 10 + 10;
	// var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
	// startAngle += (spinAngle * Math.PI / 180);
	// spinTimeout = setTimeout(rotateWheel, 30);



}
