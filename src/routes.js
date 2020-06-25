import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './components/common/PrivateRoute';
import HomePage from './containers/Library/HomePage';
import AuthPage from './containers/Account/AuthPage';
import SeriesListView from './containers/Library/SeriesListView';
import SeriesDetailView from './containers/Library/SeriesDetailView';
import PollListView from './containers/Club/PollListView';
import SharedAccessView from './containers/Club/SharedAccessView';
import PasswordResetPage from './containers/Account/PasswordResetPage';
import GetSecurity from './components/Account/GetSecurity';

const BaseRouter = () => (
  <div>
    <Route exact path="/login" component={AuthPage} />
    <Route exact path="/reset_pwd_get_security" component={GetSecurity} />
    <Route exact path="/reset_password" component={PasswordResetPage} />
    <PrivateRoute exact path="/" component={HomePage} />
    <PrivateRoute exact path="/polls" component={PollListView} />
    <PrivateRoute exact path="/series" component={SeriesListView} />
    <PrivateRoute exact path="/series/:title" component={SeriesDetailView} />
    <PrivateRoute exact path="/shared" component={SharedAccessView} />
  </div>
);

export default connect()(BaseRouter);
