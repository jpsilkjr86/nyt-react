// imports React Component class
import React, { Component } from 'react';

// declares stateless component as pure functional component
const CustomPanel = props => {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="text-center">{props.heading}</h3>
      </div>
      <div className="panel-body">
        {props.children}
      </div>
    </div>
  );
};

// exports CustomPanel component for other files to use
export default CustomPanel;