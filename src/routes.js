import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './components/common/PrivateRoute';
import SearchPage from './containers/Library/SearchPage';
import HomePage from './containers/Club/HomePage';
import AuthPage from './containers/Account/AuthPage';
import SeriesByTitleView from './containers/Library/SeriesByTitleView';
import SeriesByGenreView from './containers/Library/SeriesByGenreView';
import SeriesDetailView from './containers/Library/SeriesDetailView';
import PollListView from './containers/Club/PollListView';
import SharedAccessView from './containers/Club/SharedAccessView';
import PasswordResetPage from './containers/Account/PasswordResetPage';
import ProfilePage from './containers/Account/ProfilePage';
import SettingsPage from './containers/Account/SettingsPage';
import ForumView from './containers/Club/ForumView';

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/login" component={AuthPage} />
    <Route exact path="/reset_password" component={PasswordResetPage} />
    <PrivateRoute exact path="/forum/page=:page_number" component={ForumView} />
    <PrivateRoute exact path="/profile" component={ProfilePage} />
    <PrivateRoute exact path="/profile/settings" component={SettingsPage} />
    <PrivateRoute exact path="/polls/page=:page_number" component={PollListView} />
    <PrivateRoute exact path="/search" component={SearchPage} />
    <PrivateRoute exact path="/search/by_title/page=:page_number" component={SeriesByTitleView} />
    <PrivateRoute exact path="/search/by_genre/:genre/page=:page_number" component={SeriesByGenreView} />
    <PrivateRoute exact path="/series/:title" component={SeriesDetailView} />
    <PrivateRoute exact path="/shared/page=:page_number" component={SharedAccessView} />
  </div>
);

export default connect()(BaseRouter);
