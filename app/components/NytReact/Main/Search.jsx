// imports React Component class
import React, { Component } from 'react';

import SearchForm from './Search/SearchForm.jsx';
import Results from './Search/Results.jsx';

// declares Search component as ES6 class, which will be this file's export
const Search = props => {

  return (
    <div>
      <SearchForm onSearch={props.onSearch}/>
      {/* only displays results if the results array is not empty */}
      {props.searchResults.length != 0 &&
      <Results
        searchHistory={props.searchHistory}
        searchResults={props.searchResults}
        clearResults={props.clearResults}
        onSaveClick={props.onSaveClick}
        onUnsaveClick={props.onUnsaveClick}
      />
      }
    </div>
  );

};

// exports Search component for other files to use
export default Search;