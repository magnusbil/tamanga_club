import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import { connect } from 'react-redux';
import AlertTemplate from 'react-alert-template-basic';
import BaseRouter from './routes';
import NavBar from './components/common/NavBar';
import Alerts from './components/common/Alerts';
import { loadUser } from './actions/auth';

// Alert Options
const alertOptions = {
  timeout: 5000,
  position: 'top center',
};

class App extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <div className="App" data-test="appComponent">
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <NavBar />
          <Alerts />
          <Router>
            <Switch>
              <BaseRouter />
            </Switch>
          </Router>
        </AlertProvider>
      </div>
    );
  }
}

export default connect(null, { loadUser })(App);
