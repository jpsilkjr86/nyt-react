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

		// set initial state
    this.state = { 
			loggedIn: false
		};

		this.handleLogIn = this.handleLogIn.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
	}

	handleLogIn() {
		this.setState({ loggedIn: true });
	}

	handleLogOut() {
		console.log(this.state);
		this.setState({ loggedIn: false });
	}

	render() {
		return (
	    <div>
	      <Header logIn={this.handleLogIn} logOut={this.handleLogOut} loggedIn={this.state.loggedIn}/>
	      <Switch>
		      <Route exact path="/login" render={props => 
		      	<Login logIn={this.handleLogIn} loggedIn={this.state.loggedIn}/>
		      }/>
		    	{/* This route ensures user is logged in before rendering anything in Main*/}
		      <Route path="/" render={props => (
				    this.state.loggedIn ? (
				      <Main loggedIn={this.state.loggedIn}/>
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