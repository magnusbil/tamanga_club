import React from 'react';
import SearchBar from '../../components/Library/SearchBar';
import RecentAdditions from '../../components/Library/RecentAdditions';
import { connect } from 'react-redux';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <RecentAdditions />
      </div>
    );
  }
}

export default connect()(HomePage);