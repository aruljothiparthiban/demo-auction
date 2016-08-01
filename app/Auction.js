import React from 'react';

class Auction extends React.Component{

	constructor(args){
		super(args);
		this.state = {
			Deal1 :''
		};
	}

	setValue(field,e){
		var obj = {};
		obj[field] = e.target.value;
		this.setState(obj);
	}

	onSubmit (e){
		e.preventDefault();
		var model = {
			email : this.state.Email,
			password : this.state.CompanyName
		};
		io.socket.post('/Register', model, function (resData, jwres) {
			if(jwres.statusCode===200){
				window.location.href='/Auction';
			}
			else{
				console.log(resData);
				console.log(jwres);
			}
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
										value={this.state.Deal1}
										onChange={this.setValue.bind(this,'Deal1')}  />
								</div>
							</div>
							<div className="col-xs-5">
								<button type="button" className="btn btn-primary">Submit Bid</button>
							</div>
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
										value={this.state.Deal2}
										onChange={this.setValue.bind(this,'Deal2')}  />
								</div>
							</div>
							<div className="col-xs-5">
								<button type="button" className="btn btn-primary">Submit Bid</button>
							</div>
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
										value={this.state.Deal3}
										onChange={this.setValue.bind(this,'Deal3')}  />
								</div>
							</div>
							<div className="col-xs-5">
								<button type="button" className="btn btn-primary">Submit Bid</button>
							</div>
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
										value={this.state.Deal4}
										onChange={this.setValue.bind(this,'Deal4')}  />
								</div>
							</div>
							<div className="col-xs-5">
								<button type="button" className="btn btn-primary">Submit Bid</button>
							</div>
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
										value={this.state.Deal5}
										onChange={this.setValue.bind(this,'Deal5')}  />
								</div>
							</div>
							<div className="col-xs-5">
								<button type="button" className="btn btn-primary">Submit Bid</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default Auction;