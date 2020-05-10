import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './containers/HomePage';
import SeriesListView from './containers/SeriesListView';
import SeriesDetailView from './containers/SeriesDetailView';

const BaseRouter = () => (
  <div>
    <Route exact path='/' component={HomePage}/>
    {/* <Route exact path='/login' component={LoginPage}/> */}
    <Route exact path='/series' component={SeriesListView}/>
    <Route exact path='/series/:title' component={SeriesDetailView}/>
  </div>
);

export default BaseRouter;