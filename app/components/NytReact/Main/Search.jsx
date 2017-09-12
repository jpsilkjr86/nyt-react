// imports React Component class
import React, { Component } from 'react';

// imports SearchForm component
import SearchForm from './Search/SearchForm.jsx';

// declares Search component as ES6 class, which will be this file's export
const Search = props => {

    return (
      <div>
        <div className="panel panel-default">
        	<div className="panel-heading">
        		<h3 className="text-center">Search New York Times</h3>
        	</div>
          <div className="panel-body">
            {/* sends parent onSearch function to child function for sending data up heirarchy */}
            <SearchForm onSearch={props.onSearch}/>
        	</div>
        </div>
        {props.children}
      </div>
    );

};

// exports Search component for other files to use
export default Search;