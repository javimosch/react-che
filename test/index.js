import "babel-polyfill";
import React from 'react';
import { render } from 'react-dom';
window.localStorage.debug="*";
//import che from 'react-che';
import che from '../index.es5';
import debug from 'debug';
var log = debug('test');

import units from './test-units';
units.minimal(che);


class App extends React.Component{
  componentWillMount(){
    che.store.bind(this,[che.STORES.Backend])
  }
  render(){
    let json = JSON.stringify(this.state)
    return (
      <div>
        <h1>react-che</h1>
        {json}
        <button onClick={che.action.BACKEND_CALL}>Call</button>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

