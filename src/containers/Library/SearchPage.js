import React from 'react';
import SearchBar from '../../components/Library/SearchBar';
import RecentAdditions from '../../components/Library/RecentAdditions';
import { connect } from 'react-redux';
import LibraryNav from '../../components/Library/LibraryNav';

class SearchPage extends React.Component {
  render() {
    return (
      <div>
        <LibraryNav currentLink="search" />
        <SearchBar />
        <RecentAdditions />
      </div>
    );
  }
}

export default connect()(SearchPage);
