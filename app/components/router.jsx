// react dependencies
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// import NytReact parent component
import NytReact from './NytReact.jsx';

// export directly as an element rather than a class in order to render properly.
// wrap everything in Router to take advantage of react-routing.
module.exports = (
  <Router>
    <NytReact/>
  </Router>
);