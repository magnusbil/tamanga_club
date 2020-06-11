import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { Provider as AlertProvider } from 'react-alert';
import { Provider } from 'react-redux';
import AlertTemplate from 'react-alert-template-basic';
import BaseRouter from './routes';
import NavBar from './components/common/NavBar';
import Alerts from './components/common/Alerts';
import store from './store';
import { loadUser } from './actions/auth';
import './App.css';

// Alert Options
const alertOptions = {
  timeout: 5000,
  position: 'top center',
};

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <div className="App">
            <NavBar />
            <Alerts />
            <Router>
              <Switch>
                <BaseRouter />
              </Switch>
            </Router>
          </div>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
