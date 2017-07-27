import React, { Component } from 'react';
import $ from 'jquery';
import drawCanvas from './RouletteWheel';
import Canvas from 'react-canvas-component';
import { DropdownButton, MenuItem } from 'react-bootstrap';



class Home extends Component{
	constructor(props) {
		super(props);
		this.state = {
			options: []
		}

		this.handleSpin = this.handleSpin.bind(this);	

		}
		handleSpin(ctx){
			console.log("clicked spin")
			var options = ["Electronics", "Games", "Books", "Outdoors", "Jewelry", "Kindles", "Movies", "Music", "Kids" ]
			var startAngle = 0;
			var arc = Math.PI / (options.length / 2);
			var spinTimeout = null;

			var spinArcStart = 10;
			var spinTime = 0;
			var spinTimeTotal = 0;

			var ctx;

			// // function byte2Hex(n) {
			// //   var nybHexString = "0123456789ABCDEF";
			// //   return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
			// // }

			// function RGB2Color(r,g,b) {
			// 	// r = '#FF0000';
			// 	// g = '#006600';
			// 	// b = '#000000';
			// 	// return [r, g, b]

			// 	return r = "#FF0000"
			// 	return g = "#006600"
			// 	return b = "#000000"
			// 	// // return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
			// 	// // r = "#FF0000"
			// 	// // g = "#006600"
			// 	// // b = "#000000"
			// }

			// function getColor(item, maxitem) {
			//   var phase = 0;
			//   var center = 128;
			//   var width = 127;
			//   var frequency = Math.PI*2/maxitem;
			  
			//   var red   = Math.sin(frequency*item+2+phase) * width + center;
			//   var green = Math.sin(frequency*item+0+phase) * width + center;
			//   var black  = Math.sin(frequency*item+4+phase) * width + center;
			  
			//   return RGB2Color(red,green,black);
			// }
			
			// var outsideRadius = 200;
			// var textRadius = 160;
			// var insideRadius = 125;
			// // ctx.clearRect(0,0,500,500);

			// // ctx.strokeStyle = "black";
			// // ctx.lineWidth = 2;

			// // ctx.font = 'bold 12px Helvetica, Arial';

			// for(var i = 0; i < options.length; i++) {
			//   var angle = startAngle + i * arc;
			//   //ctx.fillStyle = colors[i];
			//   ctx.fillStyle = getColor(i, options.length);

			//   ctx.beginPath();
			//   ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
			//   ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
			//   ctx.stroke();
			//   ctx.fill();

			//   ctx.save();
			//   ctx.shadowOffsetX = -1;
			//   ctx.shadowOffsetY = -1;
			//   ctx.shadowBlur	= 0;
			//   ctx.shadowColor   = "rgb(220,220,220)";
			//   ctx.fillStyle = "black";
			//   ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 
			// 				250 + Math.sin(angle + arc / 2) * textRadius);
			//   ctx.rotate(angle + arc / 2 + Math.PI / 2);
			//   var text = options[i];
			//   ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
			//   ctx.restore();
			// } 

			// //Arrow
			// ctx.fillStyle = "black";
			// ctx.beginPath();
			// ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
			// ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
			// ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
			// ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
			// ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
			// ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
			// ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
			// ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
			// ctx.fill();

			// function rotateWheel() {
			  
			// }

			function spin() {
			  var spinAngleStart = Math.random() * 10 + 10;
			  spinTime = 0;
			  spinTimeTotal = Math.random() * 3 + 4 * 1000;
			  spinTime += 30;
			  if(spinTime >= spinTimeTotal) {
				  clearTimeout(spinTimeout);
				  var degrees = startAngle * 180 / Math.PI + 90;
				  var arcd = arc * 180 / Math.PI;
				  var index = Math.floor((360 - degrees % 360) / arcd);
				  ctx.save();
				  ctx.font = 'bold 30px Helvetica, Arial';
				  var text = options[index]
				  ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
				  ctx.restore();
				    return;
			  }
			  var spinAngleStart = Math.random() * 10 + 10;
			  function easeOut(t, b, c, d) {
				  var ts = (t/=d)*t;
				  var tc = ts*t;
				  return b+c*(tc + -3*ts + 3*t);
			  }
			  var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
			  startAngle += (spinAngle * Math.PI / 180);
			  // drawRouletteWheel();
			  // spinTimeout = setTimeout('rotateWheel()', 30);
			}


			

			spin()
		}


		render(){
			
			return(
				<div>
					<div className="buttons">
					  <DropdownButton bsStyle="primary" className="butt" title='Minimum Price'id={`dropdown-basic`}>
					     <MenuItem eventKey="1">$10</MenuItem>
					     <MenuItem eventKey="2">$20</MenuItem>
					     <MenuItem eventKey="3">$30</MenuItem>
					     <MenuItem eventKey="4">$40</MenuItem>
					     <MenuItem eventKey="5">$50</MenuItem>
					     <MenuItem eventKey="6">$75</MenuItem>
					     <MenuItem eventKey="7">$100</MenuItem>
					     <MenuItem eventKey="8">$125</MenuItem>
					     <MenuItem eventKey="9">$150</MenuItem>
					     <MenuItem eventKey="10">$200</MenuItem>
					     <MenuItem eventKey="11">$250</MenuItem>
					   </DropdownButton>
					   <DropdownButton bsStyle="primary" className="butt" title='Maximum Price'id={`dropdown-basic`}>
					     <MenuItem eventKey="1">$20</MenuItem>
					     <MenuItem eventKey="2">$30</MenuItem>
					     <MenuItem eventKey="3">$40</MenuItem>
					     <MenuItem eventKey="4">$50</MenuItem>
					     <MenuItem eventKey="5">$75</MenuItem>
					     <MenuItem eventKey="6">$100</MenuItem>
					     <MenuItem eventKey="7">$125</MenuItem>
					     <MenuItem eventKey="8">$150</MenuItem>
					     <MenuItem eventKey="9">$200</MenuItem>
					     <MenuItem eventKey="10">$250</MenuItem>
					     <MenuItem eventKey="11">$300+</MenuItem>
					   </DropdownButton>
					    <DropdownButton bsStyle="primary" className="butt" title='Category'id={`dropdown-basic`}>
					     <MenuItem eventKey="1">Electronics</MenuItem>
					     <MenuItem eventKey="2">Games</MenuItem>
					     <MenuItem eventKey="3">Books</MenuItem>
					     <MenuItem eventKey="4">Outdoors</MenuItem>
					     <MenuItem eventKey="5">Jewelry</MenuItem>
					     <MenuItem eventKey="6">Kindles</MenuItem>
					     <MenuItem eventKey="7">Movies</MenuItem>
					     <MenuItem eventKey="8">Music</MenuItem>
					     <MenuItem eventKey="9">Kids</MenuItem>
					   </DropdownButton>
					</div>
					<Canvas className="canvas" draw={drawCanvas} width={500} height={500} realtime/>
					<input className="btn btn-primary" type="button" value="spin" id='spin' onClick={this.handleSpin} />
				</div>
			)
		}
	
 	}



export default Home;