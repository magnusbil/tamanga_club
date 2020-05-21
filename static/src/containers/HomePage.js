import React from 'react';
import SearchBar from '../components/SearchBar';
import RecentAdditions from '../components/RecentAdditions';

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

export default HomePage;