// imports React Component class
import React, { Component } from 'react';

// declares component as pure functional component
// rather than as a class for simplicity's sake.
const ArticleSnippet = props => {
  // saves as more accessible constable
  const article = props.article;

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-xs-9 col-sm-10 col-md-11">
          <a href={article.link}><h4>{article.headline}</h4></a>
        </div>
        <div className="col-xs-3 col-sm-2 col-md-1">
          <SaveButton 
            article={article}
            onSaveClick={props.onSaveClick}
            onUnsaveClick={props.onUnsaveClick}
            index={props.index}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-11">
          <p>{article.summary}</p>
          <p className="pull-left"><i>{article.byline}</i></p>
          <p className="pull-right"><i>{article.date.substr(0, 10)}</i></p>
          <div className="clearflix"></div>
        </div>
      </div>
    </li>
  );
};

// sub-component that returns SaveButton with different behavior
// depending on whether or not article is saved.
const SaveButton = props => {
  // saves as more accessible constable
  const article = props.article;
  
  if (article.saved) {
    return (
      <button className="btn btn-sm btn-success"
          data-id={article._id}
          onClick={() => props.onUnsaveClick(article._id, props.index)}>
          {/* give onClick a callback or else onSaveClick() will call automatically */}
        <span className="glyphicon glyphicon-bookmark" aria-hidden="true"></span>
      </button>
    );
  }
  else {
    return (
      <button className="btn btn-sm btn-default"
          data-id={article._id}
          onClick={() => props.onSaveClick(article._id, props.index)}>
          {/* give onClick a callback or else onSaveClick() will call automatically */}
        <span className="glyphicon glyphicon-bookmark" aria-hidden="true"></span>
      </button>
    )
  }
}

// exports ArticleSnippet component for other files to use
export default ArticleSnippet;