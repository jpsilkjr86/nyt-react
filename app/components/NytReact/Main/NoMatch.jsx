// imports React Component class
import React, { Component } from 'react';

import CustomPanel from './CustomPanel.jsx';

// declares NoMatch component as functional component
const NoMatch = props => {

	console.log(props);

  return (
    <CustomPanel heading="404: Page Not Found">

    	<div className="text-center">

	      Sorry, but "{props.location.pathname}" is not a valid pathname.
	      <br/>
	      <br/>

	      <button className="btn btn-default" onClick={props.history.goBack}>
	      	Back
	      </button>

	      &nbsp;&nbsp;

	      <button className="btn btn-default" onClick={()=> props.history.push('/')}>
	      	Home
	      </button>

      </div>

    </CustomPanel>
  );

};

// exports NoMatch component for other files to use
export default NoMatch;