import "babel-polyfill";
import React from 'react';
import { render } from 'react-dom';
window.localStorage.debug="react-che:*";
import che from '../che';
import debug from 'debug';
var log = debug('test');

import examples from '../examples';


const ExamplesComponent = examples.ExamplesComponent;
//
che.reset();
examples.configure(che);
che.start();

class App extends React.Component{
  componentWillMount(){
    che.store.bind(this,[che.STORES.Backend])
  }
  render(){
    let json = JSON.stringify(this.state)
    return (
      <div>
        <h1>react-che</h1>
        <hr/>
        <ExamplesComponent/>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

