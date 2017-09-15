// imports React Component class
import React, { Component } from 'react';

import ArticleSnippet from './SnippetCollection/ArticleSnippet.jsx';

// declares stateless component as pure functional component
const SnippetCollection = props => {
  return (
    <ul className="list-group">
      {/* generates n number of ArticleSnippets */}
      {props.articles.map((article, i) => {
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
    </ul>
  );
};

// exports SnippetCollection component for other files to use
export default SnippetCollection;