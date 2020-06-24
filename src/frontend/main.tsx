import * as React from "react";
import * as ReactDOM from "react-dom";
import "./main.scss";
import 'isomorphic-fetch'
import './twirp';
import {DefaultHelloWorld, HelloResp} from './helloworld';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello React!</h1>
      </div>
    );
  }

  componentDidMount() {
    //const h = new DefaultHelloWorld("localhost:8080", fetch);
    const h = new DefaultHelloWorld("http://localhost:8080", window.fetch.bind(window));
    h.hello({subject: "world"}).then(
        (res: HelloResp) => {
            console.log(res);
        }
    ).catch(e => {
        console.error(e);
    });
  }
}


ReactDOM.render(<App />, document.querySelector("#app"));
