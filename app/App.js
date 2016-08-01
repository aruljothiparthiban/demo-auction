import React from 'react';
import {render} from 'react-dom';
import {Router , Route, IndexRoute, Link , hashHistory } from 'react-router';

import Register from './Register';
import Auction from './Auction';

class NavBar extends React.Component{

	render (){
		return(
			<nav className="navbar navbar-default">
		        <div className="container-fluid">
		          <div className="navbar-header">
		            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
		              <span className="sr-only">Toggle navigation</span>
		              <span className="icon-bar"></span>
		              <span className="icon-bar"></span>
		              <span className="icon-bar"></span>
		            </button>
		            <a className="navbar-brand" href="\/">Demo Auction</a>
		          </div>
		          <div id="navbar" className="navbar-collapse collapse">
		            <ul className="nav navbar-nav">
		              <li><a href="#/register">Register</a></li>
		              <li><a href="#/auction">Auction</a></li>
		              <li><a href="#/admin">Admin</a></li>
		            </ul>
		          </div>
		        </div>
      		</nav>
		);
	}
}

class App extends React.Component{

	render (){
		return(
			<div className="row">
				<NavBar />
				<div className="jumbotron">
				{this.props.children}
				</div>
			</div>
		);
	}
}

render(
	(
		<Router history={hashHistory }>
			<Route path="/" component={App}>
				<IndexRoute component={Register}/>
				<Route path="register" component={Register}/>
				<Route path="auction" component={Auction}/>
			</Route>
		</Router>
	)
,document.getElementById('root'));