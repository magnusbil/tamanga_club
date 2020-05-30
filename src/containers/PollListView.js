import React from 'react';
import {
  Row
} from 'react-bootstrap';
import Poll from '../components/Poll';
import NoData from '../components/NoData';
import Loading from '../components/Loading';

class PollListView extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        loading: true,
        poll_list: []
    };
  }
  
  componentDidMount(){
    fetch(process.env.API_BASE_URL+'club/polls')
    .then(res => {
        if(res.status==200){
          return res.json(); 
        }
        return [];
    })
    .then(data => {
        this.setState({ poll_list: data });
    });
  }

  renderPolls(){
    if(this.state.poll_list.length > 0){
      var poll_rows = this.state.poll_list.map(function(poll){
        return(
            <Row className="poll" key={poll['poll_title']}>
                <Poll poll_data={poll}/>
            </Row>
        );
      });
      return(
        <div className="col pt-5">
          {poll_rows}
        </div>
      );
    }
    else {
      return(<NoData />);
    }
  }

  render(){
    return this.state.loading && this.state.poll_list.length > 0 
    ? 
      this.renderPolls()
    :
      <Loading />;
  }
}

export default PollListView;