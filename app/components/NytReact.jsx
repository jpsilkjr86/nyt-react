// react dependencies
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// import child components
import Main from './NytReact/Main.jsx';
import Header from './NytReact/Header.jsx';

// declares NytReact component as ES6 class, which will be this file's export.
// NytReact will be the parent component that stores logged-in state,
// which is necessary info that will determine all other app behavior.
class NytReact extends Component {
	constructor() {
		super();
	}

	render() {
		return (
	    <div>
	      <Header/>
	      <Route path="/" component={Main}/>
	    </div>
		);
	}
}

// exports NytReact component for other files to use
export default NytReact;