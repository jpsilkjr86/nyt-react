// react dependencies
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

// import child components
import Main from './NytReact/Main.jsx';
import Header from './NytReact/Header.jsx';
import Login from './NytReact/Login.jsx';
import EnsureUserLogin from './NytReact/EnsureUserLogin.jsx';

// declares NytReact component as ES6 class, which will be this file's export.
// NytReact will be the parent component that stores logged-in state,
// which is necessary info that will determine all other app behavior.
class NytReact extends Component {
	constructor() {
		super();

		// gets loggedIn value from local storage to simulate log-in functionality.
		// sets equal to boolean true or false depending on localStorage key 'loggedIn'.
		// (put in constructor since localStorage calls are synchronous. Otherwise real
		// log-in checks should be placed in componentDidMount.)
		const loggedIn = localStorage.getItem('loggedIn') == 'true' ? true : false;
		console.log('loggedIn:', loggedIn);
		// set initial state. 'guest' is default for simulated log-in functionality
    this.state = { 
    	loggedIn,
    	user: {
    		userId: 'guest',
    		username: 'Guest'
    	}
    };

		this.handleLogIn = this.handleLogIn.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
	}

	handleLogIn() {
		// sets both this.state.loggedIn and localStorage key 'loggedIn' to true
		this.setState({
			loggedIn: true
		}, () => {
			localStorage.setItem('loggedIn', 'true');
			console.log('loggedIn:', localStorage.getItem('loggedIn'));
		});
	}

	handleLogOut() {
		// sets both this.state.loggedIn and localStorage key 'loggedIn' to true
		this.setState({
			loggedIn: false
		}, () => {
			localStorage.setItem('loggedIn', 'false');
			console.log('loggedIn:', localStorage.getItem('loggedIn'));
		});
	}

	render() {
		return (
	    <div>
	      <Header
	      	logIn={this.handleLogIn}
	      	logOut={this.handleLogOut}
	      	loggedIn={this.state.loggedIn}
	      	user={this.state.user}
	      />
	      <Switch>
		      <Route exact path="/login" render={props => 
		      	<Login logIn={this.handleLogIn} loggedIn={this.state.loggedIn}/>
		      }/>
		    	{/* This route ensures user is logged in before rendering anything in Main*/}
		      <Route path="/" render={props => (
				    this.state.loggedIn ? (
				      <Main loggedIn={this.state.loggedIn} user={this.state.user}/>
				    ) : (
				      <Redirect exact to="/login"/>
				    )
				  )}/>
			  </Switch>
	    </div>
		);
	}
}

// exports NytReact component for other files to use
export default NytReact;
/*


	      <Route exact path="/" render={props => 
		      <Main loggedIn={this.state.loggedIn}/>
		    }/>    */


			/*
			<div>
	      <Header/>
	      <Route exact path="/login" render={() => (
	      	<Login logIn={this.handleLogIn} loggedIn={this.state.loggedIn}/>
	      )}/>
	      <EnsureUserLogin loggedIn={this.state.loggedIn}>
	      	<Route exact path="/" component={Main}/>
	      </EnsureUserLogin>
	    </div>
	    */