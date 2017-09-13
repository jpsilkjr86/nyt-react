// imports React Component class
import React, { Component } from 'react';

import SnippetCollection from './SnippetCollection.jsx';
import ArticleSnippet from './SnippetCollection/ArticleSnippet.jsx';

// declares Saved component as ES6 class, which will be this file's export
const Saved = props => {

    return (
    	<div className="panel panel-default">
        <div className="panel-heading text-center">
          <h3>Saved Articles</h3>
        </div>
        <div className="panel-body">
          <SnippetCollection>
            {/* generates n number of ArticleSnippets */}
            {props.savedArticles.map((article, i) => {
              return (
                <ArticleSnippet
                    key={article._id}
                    article={article}
                    onSaveClick={props.onSaveClick}
                    onUnsaveClick={props.onUnsaveClick}
                    index={i}
                />
              );
            })}
          </SnippetCollection>
        </div>
      </div>
    );

};

// exports Saved component for other files to use
export default Saved;