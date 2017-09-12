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
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.executeSearch = this.executeSearch.bind(this);
    this.executeSave = this.executeSave.bind(this);
	} // end of constructor

  handleSearch(query) {
    console.log('query:');
    console.log(query);
    // passes query to executeSearch function
    this.executeSearch(query);
  }

  // performs search post request, changes state
  executeSearch(query) {
    // executes post request using axios
    axios.post('/search', query).then(results => {
      // saves results and history as new data pointers 
      // (important for react to do this instead of mutating original data)
      const newSearchResults = results.data,
        newSearchHistory = [...this.state.searchHistory, query];

      // replaces state data with new data, triggering re-rendering of components
      this.setState({
        searchResults: newSearchResults,
        searchHistory: newSearchHistory
      });
    }).catch(err => {
      console.log('Error performing ajax post request');
      console.log(err);
    });
  }

  clearResults() {
    console.log('clearing results...');
    this.setState({
      searchResults: []
    });
  }

  handleSaveClick(articleId, index) {
    console.log(articleId);

    this.executeSave(articleId, index);
  }

  // performs save post request, changes state
  executeSave(articleId, index) {
    // executes post request using axios
    axios.post('/articles/' + articleId + '/save').then(results => {
      console.log(results);
      // instantiates updatedResults and copy of searchResults
      const updatedResults = [...this.state.searchResults];
      // changes saved value to true for designated element
      updatedResults[index].saved = true;
      // updates state which will trigger re-rendering
      this.setState({
          searchResults: updatedResults
      });
    }).catch(err => {
      console.log('Error performing save post request');
      console.log(err);
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
              onSaveClick={this.handleSaveClick}
            />
          }
        </div>
      </main>
    );
  } // end of render

} // end of class

// exports Main component for other files to use
export default Main;