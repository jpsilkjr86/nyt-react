// react dependencies
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// import child components
import Main from './NytReact/Main.jsx';
import Header from './NytReact/Header.jsx';

// export directly as an element rather than a class in order to render properly.
// wrap everything in Router to take advantage of react-routing. wrap Header and Main
// in div because Router can only have one direct child element.
module.exports = (
  <Router>
    <div>
      <Header/>
      <Main/>
    </div>
  </Router>
);