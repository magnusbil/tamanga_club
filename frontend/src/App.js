import React from 'react';
import Navbar from './components/NavBar';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import SearchBar from './containers/SearchBar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <SearchBar />
    </div>
  );
}

export default App;
