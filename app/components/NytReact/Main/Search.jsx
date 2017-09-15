// imports React Component class
import React, { Component } from 'react';

import SearchForm from './Search/SearchForm.jsx';
import CustomPanel from './CustomPanel.jsx';

// declares Search component as ES6 class, which will be this file's export
const Search = props => {

  return (
    <div>
      <CustomPanel heading="Search New York Times">
        <SearchForm onSearch={props.onSearch}/>
      </CustomPanel>
      {/* puts props.children here to leave room for results */}
      {props.children}
    </div>
  );

};

// exports Search component for other files to use
export default Search;