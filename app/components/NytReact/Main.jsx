// imports React Component class
import React, { Component } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';

// import child components
import Search from './Main/Search.jsx';
import Saved from './Main/Saved.jsx';
import Results from './Main/Results.jsx';
import NoMatch from './Main/NoMatch.jsx';

// imports axios for routing / server communication
import axios from 'axios';

// declares Main component as ES6 class, which will be this file's export
class Main extends Component {
	
	// constructor has no props since this is the parent element
	constructor(props) {
    super(props);

    // set initial state
    this.state = {
			searchQuery: '',
      searchHistory: [],
      searchResults: [],
      savedArticles: [],
      loggedIn: props.loggedIn
		};
    
    this.clearResults = this.clearResults.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.executeSearch = this.executeSearch.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.executeSave = this.executeSave.bind(this);
    this.handleUnsaveClick = this.handleUnsaveClick.bind(this);
    this.executeUnsave = this.executeUnsave.bind(this);
	} // end of constructor

  componentDidMount() {
    console.log('Main mounted');
    const { userId } = this.props.user;
    // retrieves saved articles
    axios.get(`/users/${userId}/articles/saved/all`).then(response => {
      const savedArticles = response.data;
      this.setState({
        savedArticles: savedArticles
      });
    }).catch(err => {
      console.log('Error retrieving saved articles on componentDidMount');
      console.log(err);
    });
  }

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
  // updates both searchResults and savedArticles so that
  // saved value is reflected in both Results and Saved components
  executeSave(articleId, index) {
    const { userId } = this.props.user;
    // executes post request using axios
    axios.post(`/users/${userId}/articles/${articleId}/save`).then(data => {
      console.log(data);
      // returns next promise to continue promise chain, getting
      // data for article from article id
      return axios.get(`/users/${userId}/articles/${articleId}`);
    }).then(response => {
      const newSavedArticle = response.data;
      // instantiates updatedResults as copy of searchResults
      // and updatedSaved as copy of savedArticles + newSavedArticle
      const updatedResults = [...this.state.searchResults],
        updatedSaved = [newSavedArticle, ...this.state.savedArticles];
      // changes saved value to true for designated element in searchResults
      updatedResults[index].saved = true;
      // updates state which will trigger re-rendering
      this.setState({
          searchResults: updatedResults,
          savedArticles: updatedSaved
      });
    }).catch(err => {
      console.log('Error performing save post request');
      console.log(err);
    });
  }

  handleUnsaveClick(articleId) {
    this.executeUnsave(articleId);
  }

  executeUnsave(articleId) {
    const { userId } = this.props.user;
    // executes post request using axios
    axios.post(`/users/${userId}/articles/${articleId}/unsave`).then(data => {
      console.log(data);
      // returns query to get all saved articles in order to rerender Saved component
      return axios.get(`/users/${userId}/articles/saved/all`);
    }).then(response => {
      console.log(response);
      // instantiates updatedResults as copy of searchResults
      const updatedResults = [...this.state.searchResults],
        updatedSaved = response.data;
      // loops through updated results to see if article is listed there
      updatedResults.forEach( element => {
        // if so set .saved property to false
        if (element._id === articleId) {
          element.saved = false;
        }
      });
      // updates state which will trigger re-rendering of Saved and Results
      this.setState({
          searchResults: updatedResults,
          savedArticles: updatedSaved
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
          {/* wraps everything in <Switch> to ensure only one route is rendered */}
          <Switch>
            {/* use "render=" instead of "component=" in order to pass props through routes */}
          	<Route exact path="/search" render={(props) => 
              <Search
                onSearch={this.handleSearch}
              />
            }/>
            <Route exact path="/results" render={(props) => 
              <Results
                searchHistory={this.state.searchHistory}
                searchResults={this.state.searchResults}
                clearResults={this.clearResults}
                onSaveClick={this.handleSaveClick}
                onUnsaveClick={this.handleUnsaveClick}
              />
            }/>
            <Route exact path={`/users/${this.props.user.userId}/articles/saved`} render={(props) =>
              <Saved
                savedArticles={this.state.savedArticles}
                onSaveClick={this.handleSaveClick}
                onUnsaveClick={this.handleUnsaveClick}
              />
            }/>
            {/* use Redirect to ensure that search is default page rendered from index */}
            <Redirect exact from="/" to="/search" />
            {/* NoMatch 404 page is default for any other route */}
            <Route component={NoMatch}/>
          </Switch>
        </div>
      </main>
    );
  } // end of render

} // end of class

// exports Main component for other files to use
export default Main;


/*
<Route exact path={`/users/${this.props.user.userId}/articles/saved`} render={(props) =>
              this.state.loadedSaved ? (
                <Saved
                  savedArticles={this.state.savedArticles}
                  onSaveClick={this.handleSaveClick}
                  onUnsaveClick={this.handleUnsaveClick}
                />
              ) : (
                <div>Loading...</div>
              )
            }/>
            */