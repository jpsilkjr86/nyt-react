// imports React Component class
import React, { Component } from 'react';

// imports axios for routing / server communication
import axios from 'axios';

// declares SearchForm component as ES6 class, which will be this file's export
class SearchForm extends Component {
	
	// constructor has no props since this is the parent element
	constructor(props) {
    super(props);

    // set initial state
    this.state = { 
			topic: '',
      start_year: '',
      end_year: ''
		};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	} // end of constructor

  // handler for all input changes, taking event as parameter
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // sets state of whatever the input name is to the value of event object
    this.setState({
      [name]: value
    });
  }
  // handler for form submit event
  handleSubmit(event) {
    // prevents default form behavior
    event.preventDefault();
    // saves search data into temporary constable
    const query = this.state;
    // clears state data, triggering re-rendering of component to empty form
    this.setState({
      topic: '',
      start_year: '',
      end_year: ''
    });
    // sends query to executeSearch()
    this.executeSearch(query);
  }
  // performs search post request, sends results to parent
  executeSearch(query) {
    // executes post request using axios
    axios.post('/search', query).then(response => {
      const results = response.data;
      // sends query and results to parent through inherited function onSearch()
      return this.props.onSearch(query, results);
    }).catch(err => {
      console.log('Error performing ajax post request');
      console.log(err);
    });
  }

	render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="topic">*Topic</label>
            <input 
              type="text" className="form-control" name="topic" placeholder="Enter a topic." required="required"
              value={this.state.topic}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="start_year">Start Year</label>
            <input type="number" className="form-control" name="start_year" placeholder="From"
              value={this.state.start_year}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_year">End Year</label>
            <input type="number" className="form-control" name="end_year" placeholder="To"
              value={this.state.end_year}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary pull-right">Search</button>
        </form>
        <em className="pull-left">*Required fields</em>
    	</div>
    );
  } // end of render

} // end of class

// exports SearchForm component for other files to use
export default SearchForm;