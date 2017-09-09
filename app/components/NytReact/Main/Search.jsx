// imports React Component class
import React, { Component } from 'react';

// declares Search component as ES6 class, which will be this file's export
class Search extends Component {
	
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
      <div className="panel panel-default">
      	<div className="panel-heading">
      		<h1>Search</h1>
      	</div>
        <div className="panel-body">
          <p>Some text</p>
      	</div>
      </div>
    )
  } // end of render

} // end of class

// exports Search component for other files to use
export default Search;