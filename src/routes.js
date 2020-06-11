import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './components/common/PrivateRoute';
import HomePage from './containers/Library/HomePage';
import AuthPage from './containers/Account/AuthPage';
import SeriesListView from './containers/Library/SeriesListView';
import SeriesDetailView from './containers/Library/SeriesDetailView';
import PollListView from './containers/Club/PollListView';


const BaseRouter = () => (
  <div>
    <Route exact path='/login' component={AuthPage}/>
    <PrivateRoute exact path='/' component={HomePage}/>
    <PrivateRoute exact path='/polls' component={PollListView}/>
    <PrivateRoute exact path='/series' component={SeriesListView}/>
    <PrivateRoute exact path='/series/:title' component={SeriesDetailView}/>
  </div>
);

export default connect()(BaseRouter);