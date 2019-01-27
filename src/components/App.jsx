import React, { Component } from "react";
import QuoteBox from "./QuoteBox";
import Credits from "./Credits";

class App extends Component {
  render() {
    return (
      <div id="site-body">
        <QuoteBox />
        <Credits />
      </div>
    );
  }
}

export default App;
