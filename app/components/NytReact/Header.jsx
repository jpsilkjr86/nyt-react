// react dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// declares Header component as ES6 class, which will be this file's export
class Header extends Component {
	
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
    	<header>
	      <nav className="navbar navbar-inverse">
					<div className="container">
						{/* brand and toggle grouped for better mobile display */}
						<div className="navbar-header">
							{/* toggle menu for mobile screens */}
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-menu" aria-expanded="false">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<div className="navbar-brand"><Link to="/">NYT React!</Link></div>
							<a className="navbar-brand" href="http://developer.nytimes.com">
								<img src="/assets/img/nytimes_65a.png" alt="NYT-logo"/>
							</a>
						</div> {/* end of navbar-header */}
						{/* collect the nav links, forms, and other content for toggling collapse */}
						<div className="collapse navbar-collapse" id="navbar-menu">
							{/* right-floating navbar  */}
							<ul className="nav navbar-nav navbar-right">
								<li><Link to="/search">Search</Link></li>
								<li><Link to="/results">Results</Link></li>
								<li><Link to="/articles/saved">Saved Articles</Link></li>
							</ul> {/* end of navbar-right */}
						</div>{/* end of navbar-collapse */}
					</div>{/* end of container */}
				</nav> {/* end of nav */}
			</header>
    );
  } // end of render

} // end of class

// exports Header component for other files to use
export default Header;