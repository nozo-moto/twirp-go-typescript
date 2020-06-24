import * as React from "react";
import * as ReactDOM from "react-dom";
import "./main.scss";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello React!</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
