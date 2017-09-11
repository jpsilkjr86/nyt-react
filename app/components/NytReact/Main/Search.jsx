// imports React Component class
import React, { Component } from 'react';

// imports SearchForm component
import SearchForm from './Search/SearchForm.jsx';

// declares Search component as ES6 class, which will be this file's export
class Search extends Component {
	
	// constructor has no props since this is the parent element
	constructor(props) {
    super(props);

    // set initial state
  //   this.state = { 
		// 	someproperty: somevalue
		// };
    
	} // end of constructor

	render() {
    return (
      <div className="panel panel-default">
      	<div className="panel-heading">
      		<h3 className="text-center">Search New York Times</h3>
      	</div>
        <div className="panel-body">
          {/* sends parent onSearch function to child function for sending data up heirarchy */}
          <SearchForm onSearch={this.props.onSearch}/>
      	</div>
      </div>
    )
  } // end of render

} // end of class

// exports Search component for other files to use
export default Search;