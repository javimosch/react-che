import React from 'react';
import che from '../../che';
export default class extends React.Component{
  componentWillMount(){
    che.store.bind(this,[che.STORES.Backend])
  }
  render(){
    let json = JSON.stringify(this.state)
    return (
      <div>
        <h1 className="toggle-flag-example__h1">toggleFlagExample</h1>
        {json}
        <button onClick={che.action.BACKEND_CALL}>Call</button>
      </div>
    );
  }
}


export function configure(che){
  che.defineActions(['BACKEND_CALL'])
    che.defineStore('Backend', {
      called: false
    }, (action) => {
      action.on.BACKEND_CALL((state) => {
        state.called = true;
      });
    });
}