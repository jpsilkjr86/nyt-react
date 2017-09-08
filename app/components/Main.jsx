import React, { Component } from 'react';

// This is the main component.
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
      	</div>
      </div>
    )
  } // end of render

} // end of class

// exports Main component for other files to use
export default Main;