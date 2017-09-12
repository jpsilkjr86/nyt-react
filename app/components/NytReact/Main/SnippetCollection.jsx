// imports React Component class
import React, { Component } from 'react';

// declares stateless component as pure functional component
const SnippetCollection = props => {
  return (
    <ul className="list-group">
    	{props.children}
    </ul>
  );
};

// exports SnippetCollection component for other files to use
export default SnippetCollection;