// imports React Component class
import React, { Component } from 'react';

// declares component as pure functional component
// rather than as a class for simplicity's sake.
const ArticleSnippet = (props) => {
  const article = props.article;
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-xs-9 col-sm-10 col-md-11">
          <a href="{article.web_url}"><h4>{article.headline.main}</h4></a>
        </div>
        <div className="col-xs-3 col-sm-2 col-md-1">
          <button className="btn btn-default btn-sm">
            <span className="glyphicon glyphicon-bookmark" aria-hidden="true"></span>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-11">
          <p>{article.snippet}</p>
          <p className="pull-left"><i>{article.byline.original}</i></p>
          <p className="pull-right"><i>{article.pub_date.substr(0, 10)}</i></p>
          <div className="clearflix"></div>
        </div>
      </div>
    </li>
  )
};

// exports ArticleSnippet component for other files to use
export default ArticleSnippet;