import * as React from "react";
import * as ReactDOM from "react-dom";
import "./main.scss";
import * as helloworld from "./helloworld";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello React!</h1>
      </div>
    );
  }

  componentDidMount() {
    const h = new helloworld.DefaultHelloWorld("localhost:8080", fetch);
    console.log(h.hello({subject: "world"}))
  }
}


ReactDOM.render(<App />, document.querySelector("#app"));
