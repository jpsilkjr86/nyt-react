// imports React Component class
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import CustomPanel from './CustomPanel.jsx';

// declares SearchForm component as ES6 class, which will be this file's export
class SearchForm extends Component {
  
  // constructor has no props since this is the parent element
  constructor(props) {
    super(props);

    // set initial state
    this.state = { 
      topic: '',
      start_year: '',
      end_year: '',
      fireRedirect: false
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
      end_year: '',
      fireRedirect: true
    });

    // sends query and results to parent through inherited function onSearch()
    this.props.onSearch(query);
  }

  render() {
    return (
      <CustomPanel heading="Search New York Times">
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
        {/* handles redirect logic after form submission */}
        {this.state.fireRedirect && (
          <Redirect exact to='/results'/>
        )}
      </CustomPanel>
    );
  } // end of render

} // end of class

// exports SearchForm component for other files to use
export default SearchForm;