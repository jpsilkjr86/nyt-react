// imports React Component class
import React, { Component } from 'react';

import SnippetCollection from './SnippetCollection.jsx';
import CustomPanel from './CustomPanel.jsx';

// declares Saved component as ES6 class, which will be this file's export
const Saved = props => {

  return (
    <CustomPanel heading="Saved Articles">
      <SnippetCollection
        articles={props.savedArticles}
        onSaveClick={props.onSaveClick}
        onUnsaveClick={props.onUnsaveClick}
      />
    </CustomPanel>
  );

};

// exports Saved component for other files to use
export default Saved;