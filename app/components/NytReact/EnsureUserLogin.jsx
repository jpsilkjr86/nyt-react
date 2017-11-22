// react dependencies
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// const EnsureUserLogin = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     props.loggedIn ? (
//       <Component {...props}/>
//     ) : (
//       <Redirect to={{
//         pathname: '/login',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// );


const EnsureUserLogin = props => {
  return (
    props.loggedIn ? (
      props.children
    ) : (
      <Redirect to="/login"/>
    )
  );
};



/*
const EnsureUserLogin = props => (
	props.loggedIn ? (
    this.props.children
  ) : (
    <Redirect to={{
      pathname: '/login',
      state: { from: props.location }
    }}/>
  )
);
*/

export default EnsureUserLogin;