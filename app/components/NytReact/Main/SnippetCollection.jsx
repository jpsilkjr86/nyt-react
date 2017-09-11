// imports React Component class
import React, { Component } from 'react';

// declares SnippetCollection component as ES6 class, which will be this file's export
class SnippetCollection extends Component {
	
	// constructor has no props since this is the parent element
	constructor(props) {
    super(props);
	} // end of constructor

	render() {
    return (
      <ul className="list-group">
      	{this.props.children}
      </ul>
    )
  } // end of render

} // end of class

// exports SnippetCollection component for other files to use
export default SnippetCollection;