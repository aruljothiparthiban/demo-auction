import React from 'react';

class Register extends React.Component{

	constructor(args){
		super(args);
		this.state = {
			Name :'',
			CompanyName:'',
			PhoneNumber:'',
			Email:''
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
			<div className="row">
				<form onSubmit={this.onSubmit.bind(this)}>
					<div className="col-md-offset-2 col-md-8">
						<div className="form-group row">
			  				<label htmlFor="Name" className="col-xs-3 col-form-label">Name</label>
							<div className="col-xs-6">
								<input 
									type="text" 
									id="Name"
									className="form-control" 
									value={this.state.Name}
									onChange={this.setValue.bind(this,'Name')}  />
							</div>
						</div>
						<div className="form-group row">
			  				<label htmlFor="CompanyName" className="col-xs-3 col-form-label">Company Name</label>
							<div className="col-xs-6">
								<input 
									type="text" 
									id="CompanyName"
									className="form-control" 
									value={this.state.CompanyName} 
									onChange={this.setValue.bind(this,'CompanyName')} />
							</div>
						</div>
						<div className="form-group row">
			  				<label htmlFor="PhoneNumber" className="col-xs-3 col-form-label">Phone Number</label>
							<div className="col-xs-6">
								<input 
									type="text" 
									id="PhoneNumber"
									className="form-control" 
									value={this.state.PhoneNumber}
									onChange={this.setValue.bind(this,'PhoneNumber')} />
							</div>
						</div>
						<div className="form-group row">
			  				<label htmlFor="Email" className="col-xs-3 col-form-label">Email Address</label>
							<div className="col-xs-6">
								<input 
									type="email" 
									id="Email"
									className="form-control"
									value={this.state.Email} 
									onChange={this.setValue.bind(this,'Email')} />
							</div>
						</div>
						<div className="form-group row">
							<div className="col-md-offset-3 col-sm-6">
					        	<button type="submit" className="btn btn-primary">Start</button>
					      	</div>
	    				</div>
					</div>
				</form>
			</div>
		);
	}
}

export default Register;