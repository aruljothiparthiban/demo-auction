import React from 'react';
import {render} from 'react-dom';
import {Router , Route, IndexRoute, Link , hashHistory } from 'react-router';

import Register from './Register';
import Auction from './Auction';
import Admin from './Admin';

class App extends React.Component{

	constructor(args){
		super(args);

		this.state = {
			users : []
		};
	}

	componentDidMount(){
		var socket = io.sails.connect();
		var _this = this;
		socket.get('/user',function(users){
			_this.setState({
				users : users
			});
		});	

		socket.on('user', function (result) {
			if(result.verb==='created'){
				var users = _this.state.users.slice();
				users.push(result.data);
				_this.setState({
					users : users
				});
			}
			else if(result.verb === 'destroyed'){
				var users = _this.state.users.slice();
				users = users.filter(function(p){
					return p.id !== parseInt(result.id);
				});
				_this.setState({
					users : users
				});
			}	
    	});

    	socket.on('bid', function (result) {
			if(result.verb==='created'){
				var users = _this.state.users.slice();
				users.forEach(function(u){
					if(u.id === result.data.user){
						u.bids.push(result.data);
					}
				});
				_this.setState({
					users : users
				});
			}
			else if(result.verb === 'destroyed'){
				var users = _this.state.users.slice();
				users.forEach(function(u){
					u.bids = u.bids.filter(function(p){
						return p.id !== parseInt(result.id);
					});
				});				
				_this.setState({
					users : users
				});
			}	
    	});

		window.socket = socket;
	}

	render (){
		const pathname =window.location.pathname;
		if(pathname==='/'){
			return (
				<div className="row">
					<Register />
				</div>
			);
		}
		else if(pathname==='/Auction'){
			return (
				<div className="row">
					<Auction />
				</div>
			);
		}
		else if(pathname==='/Admin'){
			return (
				<div className="row">
					<Admin users={this.state.users}/>
				</div>
			);
		}
	}
}

render(<App />,document.getElementById('root'));

