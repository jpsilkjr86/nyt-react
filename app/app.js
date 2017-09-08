// principle react dependencies
import React from 'react';
import { render } from 'react-dom';

// imports parent component
import Main from './components/Main.jsx';

// renders Main component to DOM id "#app"
render(<Main />, document.getElementById("app"));