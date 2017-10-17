import React, { Component } from 'react';

import Player from "./components/player";


class App extends Component {
  constructor(){
    super();
  }
  componentDidMount(){
  }
  render() {
    return (
      <div className="App">
        <Player/>
      </div>
    );
  }
}

export default App;
