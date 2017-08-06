import React, { Component } from 'react';
import $ from 'jquery';
import { DropdownButton, MenuItem, Jumbotron } from 'react-bootstrap';
import drawRoulette from '../roulette';
import textWheel from '../roulette';



class Home extends Component{
	constructor(props) {
		super(props);
		this.state = {
			options: ""
		}
		this.drawRoulette = this.drawRoulette.bind(this); 
		this.getCategory = this.getCategory.bind(this);
		

	}
	componentDidMount(props) {
		drawRoulette()
		this.drawRoulette();
		this.getCategory();

	}

	getCategory(){
		var cat = this.state.options
		console.log(cat)
		const url = window.hostAddress + `/`
		$.getJSON(url, (data)=>{
			console.log(data);

		});
	
	}

	drawRoulette(){
		var options = ["Electronics",  "Books", "Tools & Hardware", "Beauty", "Video Games", "Music", "Kids Toys", "Baby" ]
		var startAngle = 0;
		var arc = Math.PI / (options.length / 2);
		var spinTimeout = null;

		var spinArcStart = 10;
		var spinTime = 0;
		var spinTimeTotal = 0;

		var ctx;

		document.getElementById("spin").addEventListener("click", spin);
		$('#spin').click(function(){
			$('#canvas').css({'width': '750px' , 'height': '750px'})
			$('#jumbo').css({'display': 'none'})
		})

		function byte2Hex(n) {
		  var nybHexString = "0123456789ABCDEF";
		  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
		}

		function RGB2Color(r,g,b) {
			return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
		}

		function getColor(item, maxitem) {
		  var phase = 0;
		  var center = 128;
		  var width = 127;
		  var frequency = Math.PI*8/maxitem;
		  
		  var red   = Math.sin(frequency*item+0+phase) * width + center;
		  var green = Math.sin(frequency*item+2+phase) * width + center;
		  var blue  = Math.sin(frequency*item+0+phase) * width + center;
		  
		  return RGB2Color(red,green,blue);
		}

		function drawRouletteWheel() {
		  var canvas = document.getElementById("canvas");
		  if (canvas.getContext) {
		    var outsideRadius = 200;
		    var textRadius = 160;
		    var insideRadius = 125;

		    ctx = canvas.getContext("2d");
		    ctx.clearRect(0,0,500,500);

		    ctx.strokeStyle = "brown";
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
		}

		function spin() {
		  var spinAngleStart = Math.random() * 2 + 10;
		  spinTime = 0;
		  spinTimeTotal = Math.random() *  + 20 * 1000;
		  rotateWheel();
		}

		function rotateWheel() {
		  spinTime += 30;
		  if(spinTime >= spinTimeTotal) {
		    stopRotateWheel();
		    return;
		  }
		  var spinAngleStart = Math.random() * 10 + 10;
		  var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
		  startAngle += (spinAngle * Math.PI / 180);
		  drawRouletteWheel();
		  spinTimeout = setTimeout(rotateWheel, 30);
		}

		 var stopRotateWheel = () => {
		  clearTimeout(spinTimeout);
		  var degrees = startAngle * 180 / Math.PI + 90;
		  var arcd = arc * 180 / Math.PI;
		  var index = Math.floor((360 - degrees % 360) / arcd);
		  ctx.save();
		  ctx.font = 'bold 30px Helvetica, Arial';
		  ctx.fillStyle = 'white';
		  var text = options[index]
		  this.setState({
		  	options: text
		  })

		  ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
		  ctx.restore();
		  console.log(startAngle) 
		  console.log(window)
		};

		function easeOut(t, b, c, d) {
		  var ts = (t/=d)*t;
		  var tc = ts*t;
		  return b+c*(tc + -3*ts + 3*t);
		}


	}

			
	


	render(){


		
		return(
			<div>
				<Jumbotron id="jumbo">
					<h1 className="home-page-title">AMAZON ROULETTE</h1>
					<p>The second most fun you&#39;ll have playing Roulette</p>
					<div className="buttons">
				    <DropdownButton bsStyle="primary" className="butt" title='Category'id={`dropdown-basic`}>
				     <MenuItem eventKey="1">Electronics</MenuItem>
				     <MenuItem eventKey="2">Tools & Hardware</MenuItem>
				     <MenuItem eventKey="3">Books</MenuItem>
				     <MenuItem eventKey="4">Beauty</MenuItem>
				     <MenuItem eventKey="5">Baby</MenuItem>
				     <MenuItem eventKey="6">Video Games</MenuItem>
				     <MenuItem eventKey="7">Music</MenuItem>
				     <MenuItem eventKey="8">Kids Toys</MenuItem>
				   	</DropdownButton>
				   	<DropdownButton bsStyle="primary" className="butt" title='Price Range'id={`dropdown-basic`}>
				     <MenuItem eventKey="1">$0 - $15</MenuItem>
				     <MenuItem eventKey="2">$15 - $30</MenuItem>
				     <MenuItem eventKey="3">$30 - $50</MenuItem>
				     <MenuItem eventKey="4">$50 - $75</MenuItem>
				     <MenuItem eventKey="5">$75 - $100</MenuItem>
				     <MenuItem eventKey="6">$125 - $150</MenuItem>
				     <MenuItem eventKey="7">$150 - $175</MenuItem>
				     <MenuItem eventKey="8">$175 - $200</MenuItem>
				   	</DropdownButton>
				   	<input className="btn btn-primary" type="button" value="spin" id='spin' onClick={this.drawRoulette.spin} />
				</div>
				</Jumbotron>

				<canvas className="canvas" width="500px" height="500px" id="canvas"/>
				<h1 className="the-category">{this.state.options}</h1>
			</div>
		)
	}

}




export default Home;