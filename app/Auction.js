import React from 'react';
import moment from 'moment';
import update from 'immutability-helper';

class SubmitButton extends React.Component{
	constructor(args){
		super(args);
	}

	render(){

		if(this.props.bid.Submited){
			if(this.props.bid.Success){
				return (
					<div className="col-xs-5">
						<span className="text-success">Congratulations, You WON this Deal for ${this.props.bid.Value}</span>
					</div>
				);
			}
			else
			{
				return (
					<div className="col-xs-5">
						<span className="text-success">Bid submitted successfully</span>
					</div>
				);
			}			
		}
		else if(this.props.bid.IsLost){
			return (
				<div className="col-xs-5">
					<span className="text-danger">You lost this deal !</span>
				</div>
			);
		}
		else{
			return (
				<div className="col-xs-5">
					<button 
						type="button" 
						onClick={this.props.submit} 
						className="btn btn-primary">Submit Bid</button>				
				</div>
			);
		}
	}
}

class Auction extends React.Component{

	constructor(args){
		super(args);

		this.state = {
			Deal1:{
				Id:0,
				Value:'',
				Submited:false,
				IsLost : false,
				Success : false
			},
			Deal2:{
				Id:0,
				Value:'',
				Submited:false,
				IsLost : false,
				Success : false
			},
			Deal3:{
				Id:0,
				Value:'',
				Submited:false,
				IsLost : false,
				Success : false
			},
			Deal4:{
				Id:0,
				Value:'',
				Submited:false,
				IsLost : false,
				Success : false
			},
			Deal5:{
				Id:0,
				Value:'',
				Submited:false,
				IsLost : false,
				Success : false
			}
		};
	}

	setValue(field,e){
		var bid = this.state[field];
		bid.Value = e.target.value;
		bid.Submited = false;
		bid.IsLost = false;
		var newState = this.state;
		this.setState(newState);
	}

	onSubmit (field,e){
		
		var bid = this.state[field];
		var bidConfirmed = confirm('Are you sure you would like to submit the bid ?');
		if(bidConfirmed){
			var newState = this.state;
			var _this = this;
			io.socket.post('/AddBid',{
				id : bid.Id,
				bidAmount : bid.Value
			}, function (resData, jwres) {
				if(jwres.statusCode===200){
					bid.Submited = true;
					bid.Id = resData.id;
					_this.setState(newState);
				}
				else{
					alert(resData.message);
				}
			});
		}
	}

	componentDidMount(){
		var _this = this;
		var dom = document.getElementById('expire_on');
		var eventTimeStamp = document.getElementById('event_timestamp');
		var times = eventTimeStamp.value.split('|');
		if(times.length==2){
			var eventTime= Number(times[0]);
			var currentTime = Number(times[1]);

			var timeDiff = moment(eventTime).toDate().getTime() - moment(currentTime).toDate().getTime();
			var interval = 1000;

			var intervalRef =	setInterval(function(){
				timeDiff  = timeDiff - interval;
				if(timeDiff<=0){
					clearInterval(intervalRef);
					dom.innerHTML ='Bidding Closed';
					var stateBackup = _this.state;
					for(var key in stateBackup){
						var item = stateBackup[key];
						if(!item.Submited){
							item.IsLost = true;
						}
						else{
							item.Success = true;
						}
					}
					_this.setState(stateBackup);
				}
				else{
	  				var time = moment.duration(timeDiff, 'milliseconds');
	  				dom.innerHTML ='Auction Closes in : <span class="text-danger">'+time.minutes() + ":" + time.seconds()+'</span>';
	  			}
			}, interval);
		}

		
		// get user
		var socket = io.sails.connect();
		var idIndex = 1;
		var stateObj = {};
		socket.get('/GetUserBids',function(bids){
			bids.forEach(function(bid){
				stateObj['Deal'+idIndex] = {
					Id : bid.id,
					Value: bid.bidAmount,
					Submited : true
				}
				idIndex++;
			});	
			_this.setState(stateObj);		
		});
	}

	render(){
		return (
			<div className="col-md-12">
				<form onSubmit={this.onSubmit.bind(this)}>
					<div className="col-md-offset-2 col-md-8">
						<div className="form-group row">
			  				<label htmlFor="Deal1" className="col-xs-2 col-form-label">Deal 1</label>
							<div className="col-xs-5">
								<div className="input-group"> 
									<span className="input-group-btn">
										<label className="btn btn-default" type="button">$</label>
									</span> 
									<input 
										type="number" 
										id="Deal1"
										className="form-control" 
										value={this.state.Deal1.Value}
										onChange={this.setValue.bind(this,'Deal1')}  />
								</div>
							</div>
							<SubmitButton submit={this.onSubmit.bind(this,'Deal1')} bid={this.state.Deal1} />
						</div>

						<div className="form-group row">
			  				<label htmlFor="Deal2" className="col-xs-2 col-form-label">Deal 2</label>
							<div className="col-xs-5">
								<div className="input-group"> 
									<span className="input-group-btn">
										<label className="btn btn-default" type="button">$</label>
									</span> 
									<input 
										type="number" 
										id="Deal2"
										className="form-control" 
										value={this.state.Deal2.Value}
										onChange={this.setValue.bind(this,'Deal2')}  />
								</div>
							</div>
							<SubmitButton submit={this.onSubmit.bind(this,'Deal2')} bid={this.state.Deal2} />
						</div>

						<div className="form-group row">
			  				<label htmlFor="Deal3" className="col-xs-2 col-form-label">Deal 3</label>
							<div className="col-xs-5">
								<div className="input-group"> 
									<span className="input-group-btn">
										<label className="btn btn-default" type="button">$</label>
									</span> 
									<input 
										type="number" 
										id="Deal3"
										className="form-control" 
										value={this.state.Deal3.Value}
										onChange={this.setValue.bind(this,'Deal3')}  />
								</div>
							</div>
							<SubmitButton submit={this.onSubmit.bind(this,'Deal3')} bid={this.state.Deal3} />
						</div>

						<div className="form-group row">
			  				<label htmlFor="Deal4" className="col-xs-2 col-form-label">Deal 4</label>
							<div className="col-xs-5">
								<div className="input-group"> 
									<span className="input-group-btn">
										<label className="btn btn-default" type="button">$</label>
									</span> 
									<input 
										type="number" 
										id="Deal4"
										className="form-control" 
										value={this.state.Deal4.Value}
										onChange={this.setValue.bind(this,'Deal4')}  />
								</div>
							</div>
							<SubmitButton submit={this.onSubmit.bind(this,'Deal4')} bid={this.state.Deal4} />
						</div>

						<div className="form-group row">
			  				<label htmlFor="Deal5" className="col-xs-2 col-form-label">Deal 5</label>
							<div className="col-xs-5">
								<div className="input-group"> 
									<span className="input-group-btn">
										<label className="btn btn-default" type="button">$</label>
									</span> 
									<input 
										type="number" 
										id="Deal5"
										className="form-control" 
										value={this.state.Deal5.Value}
										onChange={this.setValue.bind(this,'Deal5')}  />
								</div>
							</div>
							<SubmitButton submit={this.onSubmit.bind(this,'Deal5')} bid={this.state.Deal5} />
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default Auction;