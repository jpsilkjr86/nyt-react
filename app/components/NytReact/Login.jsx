// imports React Component class
import React from 'react';
import { Redirect } from 'react-router-dom';

import CustomPanel from './Main/CustomPanel.jsx';

// declares Login component as ES6 class, which will be this file's export
const Login = props => {

	return (
		props.loggedIn ? (
			<Redirect exact to="/"/>
		) : (
	  	<div className="container-fluid">
		    <div className="jumbotron jumbotron-bkg">
		    	<h1>Welcome to New York Times Article Search - React!</h1>
		    	<div className="row">
		    		<div className="col-xs-10 col-xs-offset-1 col-sm-offset-4 col-sm-4 col-md-offset-5 col-md-2">
		      		<button className="btn btn-primary btn-lg btn-block" onClick={props.logIn}>Sign In</button>
		      	</div>
		      </div>
		    </div>
	    </div>
		)
  );
};

// exports Login component for other files to use
export default Login;


	// props.loggedIn ? (
 //  	return (
 //  		<Redirect to={{
	//       pathname: '/',
	//       state: { from: props.location }
	//     }}/>
	//   );
	// ) : (
	// 	return (
	//   	<div className="container">
	// 	    <CustomPanel heading="Sign In">
	// 	      <button className="btn btn-primary" onClick={props.logIn}>Sign In</button>
	// 	    </CustomPanel>
	//     </div>
 //    );
 //  );