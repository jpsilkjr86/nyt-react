// imports React Component class
import React, { Component } from 'react';

// declares Main component as ES6 class, which will be this file's export
class Main extends Component {
	
	// constructor has no props since this is the parent element
	constructor() {
    super();

    // set initial state
  //   this.state = { 
		// 	someproperty: somevalue
		// };

	} // end of constructor

	render() {
    return (
      <div className="container">
      	<div className="jumbotron text-center">
      		<h1>Heading!</h1>
      		<p>Some text!</p>
      		<p className="bg-primary">This is some added test text!</p>
      		<p className="bg-success">This is some added test text!</p>
      		<p className="bg-warning">This is some added test text!</p>
      	</div>
      </div>
    )
  } // end of render

} // end of class

// exports Main component for other files to use
export default Main;