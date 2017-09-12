// imports React Component class
import React, { Component } from 'react';

import SnippetCollection from './SnippetCollection.jsx';
import ArticleSnippet from './SnippetCollection/ArticleSnippet.jsx';

// declares Results component as ES6 class, which will be this file's export
class Results extends Component {
	
	// constructor has no props since this is the parent element
	constructor(props) {
    super(props);
	} // end of constructor

	render() {
    return (
      <div className="panel panel-default">
      	<div className="panel-heading">
      		<h3 className="text-center">Search Results</h3>
      	</div>
        <div className="panel-body">
          <SnippetCollection>
            {/* generates n number of ArticleSnippets */}
            {this.props.searchResults.map((article, i) => {
              return (
                <ArticleSnippet
                    key={article._id}
                    article={article}
                    onSaveClick={this.props.onSaveClick}
                    index={i}
                />
              );
            })}
          </SnippetCollection>
          <button className="btn btn-warning pull-right" onClick={this.props.clearResults}>Clear</button>
      	</div>
      </div>
    )
  } // end of render

} // end of class

// exports Results component for other files to use
export default Results;