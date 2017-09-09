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

    this.onSearch = this.onSearch.bind(this);
	} // end of constructor

  onSearch(query) {
    this.props.onSearch(query);
  }

	render() {
    return (
      <div className="panel panel-default">
      	<div className="panel-heading">
      		<h1 className="text-center">Search New York Times API</h1>
      	</div>
        <div className="panel-body">
          <SearchForm onSearch={this.props.onSearch}/>
      	</div>
      </div>
    )
  } // end of render

} // end of class

// exports Search component for other files to use
export default Search;