// principle react dependencies
import React from 'react';
import { render } from 'react-dom';

// import parent compoent
import Main from './components/Main.jsx';

// renders Main component to DOM id "#app"
render(<Main />, document.getElementById("app"));