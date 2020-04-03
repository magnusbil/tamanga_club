import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';
import NavBar from './components/NavBar';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <BaseRouter />
      </Router>
    </div>
  );
}

export default App;
