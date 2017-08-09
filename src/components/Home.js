import React, { Component } from 'react';
import $ from 'jquery';
import { DropdownButton, MenuItem, Jumbotron, ButtonToolbar, Button,  } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import drawRoulette from '../roulette';
import textWheel from '../roulette';
import {connect} from 'react-redux'
import OpenNavAction from '../actions/OpenNavAction';
import {bindActionCreators} from 'redux';



class Home extends Component{
	constructor(props) {
		super(props);
		this.state = {
			options: "",
			price: "",
			itemCost: ""
		};
		this.makePayment = this.makePayment.bind(this);
		this.drawRoulette = this.drawRoulette.bind(this); 
		// this.getCategory = this.getCategory.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handlePrice = this.handlePrice.bind(this);
		this.resetWheel = this.resetWheel.bind(this);
	}
	componentDidMount(props) {
		drawRoulette();
		this.drawRoulette();
		// this.getCategory();

	}

	resetWheel(){
			$('.butt').css({'display': 'inline-block'})
			$('#spin').css({'display': 'inline-block'})
			$('.checkout').css({'display': 'none'})
			$('.spin-again').css({'display': 'none'})

	}
	
	makePayment() {
        var handler = window.StripeCheckout.configure({
            key: 'pk_test_QQmahuQL0QUgjAheFobNmmvW',
            locale: 'auto',
            image: '/img/roulette-icon.png',
            token: (token)=> {
            	console.log(token);
                var theData = {
                    amount: this.state.itemCost,
                    stripeToken: token.id,
                    userToken: this.props.login.token,
                }
                $.ajax({
                    method: 'POST',
                    url: window.hostAddress+'/stripe',
                    data: theData
                }).done((data) => {
                    console.log(data);
                    if (data.msg === 'paymentSuccess') {
                    	this.props.history.push('/thank-you');
                    }
                });
            }
        });
        handler.open({
            name: "Pay Now",
            description: 'Pay Now',
            amount: this.state.itemCost,
        })
    }

	drawRoulette(timeSpin){
		console.log(timeSpin)
		var options = ["Electronics",  "Books", "Tools & Hardware", "Beauty", "Video Games", "Music", "Kids Toys", "Baby" ]
		var startAngle = 0;
		var arc = Math.PI / (options.length / 2);
		var spinTimeout = null;

		var spinArcStart = 10;
		var spinTime = 0;
		var spinTimeTotal = 0;

		var ctx;

		document.getElementById("spin").addEventListener("click", spin);
		if(timeSpin == 'again'){
			console.log("timeSpin!!!!!")
			spin();
			$('#canvas').css({'width': '750px' , 'height': '750px'})
			$('#jumbo').css({'display': 'none'})
		}
		$('#spin').click(function(){
			$('#canvas').css({'width': '750px' , 'height': '750px'})
			$('#jumbo').css({'display': 'none'})
		})


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
		  var cate
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
		  // console.log(window)
		  console.log(window.document.all.canvas.nextElementSibling.innerHTML);
		  console.log(this.state.options);
		  console.log(this.state.price);
		  if (this.state.options != ''){
		  	$('#canvas').css({'width': '500px' , 'height': '500px'})
			$('#jumbo').css({'display': ''})
			$('.checkout').css({'display': 'initial'})
			$('.spin-again').css({'display': 'initial'})
			$('.butt').css({'display': 'none'})
			$('#spin').css({'display': 'none'})
		  }
		  // console.log(this.props.categoryAction(this.state.options));
		  // this.state.options
			console.log(this.props.login);
			var thePromise = $.ajax({
				method: "POST",
				url: window.hostAddress +'/categoryFinder',
				data: {
					category: this.state.options,
					price: this.state.price,
					token: this.props.login.token
				}
			}).then((data)=>{
		  	console.log(data)
				this.setState({
					itemCost: data.randomPrice
				})
			})
		};

		function easeOut(t, b, c, d) {
		  var ts = (t/=d)*t;
		  var tc = ts*t;
		  return b+c*(tc + -3*ts + 3*t);
		}


	}

	handleSelect(evt){
		// console.log(evt)
		this.setState({
			options: evt

		});
	}

	handlePrice(prc){
		var formattedPrice = prc.split(' AND ');
		console.log(formattedPrice)
		formattedPrice[0] = `$` + Math.floor(formattedPrice[0]/100);
		formattedPrice[1] = `$` + formattedPrice[1]/100;
		this.setState({
			formattedPrice: formattedPrice[0] + '-' + formattedPrice[1],
			price: prc
		})
	}

	componentWillReceiveProps(nextProps){
		console.log(nextProps.categoryResponse);
		if(nextProps.categoryResponse.msg === 'categoryFound'){
			this.props.history.push('/home');
		}else if(nextProps.categoryResponse.msg === 'categoryFailed'){
			console.log('messed that up');
			this.setState({
				categoryMessage: ""
			})
		}
		if(this.props.login.token == undefined){
			//open the modal
			console.log("Calling openNav action")
			this.props.openNav('open');
		}
	}


	render(){
		console.log(this.props.login)
		if(this.props.login.token == undefined){
			//open the modal
			console.log("Calling openNav action")
			this.props.openNav('open');
		}

		
		return(
			<div className="home-wrapper">
				<Jumbotron id="jumbo">
				<h1 className="home-page-title">AMAZON ROULETTE</h1>
				<p className="home-page-text">The second most fun you&#39;ll have playing Roulette</p>
				<p className="home-page-text"> Take a close look at the wheel of categories below to get an idea of what type of product could soon be yours!
					When you are ready, choose a price range from our dropdown and then click spin!  From there you will be prompted to checkout using our secure Stripe payment solution.</p>
				<div className="buttons">
				   	<DropdownButton bsStyle="primary" className="butt" title={this.state.formattedPrice} id={`dropdown-price`} onSelect={this.handlePrice}>
				     <MenuItem eventKey="500 AND 1500">$5 - $15</MenuItem>
				     <MenuItem eventKey="1501 AND 3000">$15 - $30</MenuItem>
				     <MenuItem eventKey="3001 AND 5000">$30 - $50</MenuItem>
				     <MenuItem eventKey="5001 AND 7500">$50 - $75</MenuItem>
				     <MenuItem eventKey="7501 AND 10000">$75 - $100</MenuItem>
				     <MenuItem eventKey="10001 AND 12500">$100 - $125</MenuItem>
				     <MenuItem eventKey="12501 AND 15000">$125 - $150</MenuItem>
				     <MenuItem eventKey="15001 AND 20000">$150 - $200</MenuItem>
				   	</DropdownButton>
				   	<input className="btn btn-primary" type="button" value="spin" id='spin' onClick={this.drawRoulette.spin} />
				    <Button className="checkout" bsStyle="primary" onClick={this.makePayment}>Check Out!</Button>
					<Button className="spin-again" bsStyle="primary" onClick={this.resetWheel}>Spin Again!</Button>
				  
				</div>
				</Jumbotron>

				<canvas className="canvas" width="500px" height="500px" id="canvas"/>
				<h1 className="the-category">{this.state.options}</h1>
			</div>
		)
	}

}


function mapStateToProps(state){
	return{
		categoryResponse: state.categoryReducer,
		priceResponse: state.categoryReducer,
		login: state.registerReducer
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		openNav: OpenNavAction
	},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);