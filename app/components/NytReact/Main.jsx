// imports React Component class
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// import child components
import Search from './Main/Search.jsx';
import SavedArticles from './Main/SavedArticles.jsx';
import Results from './Main/Results.jsx';

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

  handleSearch(query, results) {
    console.log('query on Main:');
    console.log(query);
    console.log('results on Main:');
    console.log(results);

    // saves results and history as new data pointers 
    // (important for react to do this instead of mutating original data)
    const newSearchResults = results,
      newSearchHistory = [...this.state.searchHistory, query];

    // replaces state data with new data, triggering re-rendering of components
    this.setState({
      searchResults: newSearchResults
    });
    this.setState(prevState => ({
      searchHistory: [...prevState.searchHistory, query]
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
          {/* only displays results if the results array is not empty */}
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