import React from 'react';
import { Route } from 'react-router-dom';
import BookListView from './containers/BookListView';
import BookDetailView from './containers/BookDetailView'

const BaseRouter = () => (
  <div>
    <Route exact path='/' component={BookListView} />
    <Route exact path='/:bookID' component={BookDetailView} />
  </div>
);

export default BaseRouter;