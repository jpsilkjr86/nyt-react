// imports React Component class
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// import child components
import Search from './Main/Search.jsx';
import SavedArticles from './Main/SavedArticles.jsx';
import Results from './Main/Results.jsx';

// imports axios for routing / server communication
import axios from 'axios';

// declares Main component as ES6 class, which will be this file's export
class Main extends Component {
	
	// constructor has no props since this is the parent element
	constructor() {
    super();

    // set initial state
    this.state = { 
			searchQuery: '',
      searchHistory: [],
      searchResults: []
		};

    this.handleSearch = this.handleSearch.bind(this);
    this.clearResults = this.clearResults.bind(this);
	} // end of constructor

  handleSearch(query) {
    console.log('query:');
    console.log(query);
    // axios.post('/search').then(results => {
    //   console.log(results);
    // });
    this.setState(prevState => ({
      searchHistory: [...prevState.searchHistory, query]
    }));
    this.setState(prevState => ({
      searchResults: [...prevState.searchResults, query]
    }));
  }

  clearResults() {
    console.log('clearing results...');
    this.setState({
      searchResults: []
    });
  }

	render() {
    return (
      <main>
        <div className="container">
          {/* use "render=" instead of "component=" in order to pass props through routes */}
        	<Route exact path="/" render={(props) => <Search onSearch={this.handleSearch}/>}/>
          <Route exact path="/articles/saved" component={SavedArticles}/>
          {this.state.searchResults.length != 0 &&
            <Results 
              searchHistory={this.state.searchHistory}
              searchResults={this.state.searchResults}
              clearResults={this.clearResults}
            />
          }
          
        </div>
      </main>
    );
  } // end of render

} // end of class

// exports Main component for other files to use
export default Main;