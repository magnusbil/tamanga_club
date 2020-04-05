import React from 'react';
import SearchBar from '../components/SearchBar';
import RecentAdditions from '../components/RecentAdditions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recentBooks: []
    }
  }

  componentDidMount(){
    fetch('https://trianglemanga.club/catalogue/books')
    .then(res => res.json())
    .then(books => {
      this.setState({recentBooks: books})
    });
  }

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