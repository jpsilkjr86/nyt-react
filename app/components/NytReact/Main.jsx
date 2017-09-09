// imports React Component class
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// import child components
import Search from './Main/Search.jsx';
import SavedArticles from './Main/SavedArticles.jsx';

// declares Main component as ES6 class, which will be this file's export
class Main extends Component {
	
	// constructor has no props since this is the parent element
	constructor() {
    super();

    // set initial state
  //   this.state = { 
		// 	someproperty: somevalue
		// };

	} // end of constructor

	render() {
    return (
      <main>
        <div className="container">
        	<Route exact path="/" component={Search}/>
          <Route exact path="/articles/saved" component={SavedArticles}/>
        </div> {/* end of container */}
      </main>
    );
  } // end of render

} // end of class

// exports Main component for other files to use
export default Main;