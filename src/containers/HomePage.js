import React from 'react';
import SearchBar from '../components/SearchBar';
import RecentAdditions from '../components/RecentAdditions';
// import Poll from '../components/Poll';

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      current_poll: []
    };
  }

  // componentDidMount(){
  //   fetch(process.env.API_BASE_URL+'club/poll/latest')
  //   .then(res=>res.json())
  //   .then(data => {
  //     this.setState({current_poll: data});
  //   });
  // }

  render() {
    return (
      <div>
        <SearchBar />
        <RecentAdditions />
        {/* <h3 className='text-center'>What should we read next?</h3> */}
        {/* <Poll poll_data={this.state.current_poll} /> */}
      </div>
    );
  }
}

export default HomePage;