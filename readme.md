# react-che

## Description

Minimalistic flux implementation for react

## How it works?

There are Stores and Actions. Once you defined both, you bind Stores and call actions from inside Components. Thats it.


## Usage

````
import che from 'react-che';

che.reset();
che.defineActions(['BACKEND_CALL'])
che.defineStore('Backend', {
	called: false
}, (action) => {
	action.on.BACKEND_CALL((state) => {
		state.called = true;
	});
});
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
        {json}
        <button onClick={che.action.BACKEND_CALL}>Call</button>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
````


## Examples and Testing

From inside /test, run:

````
npm install
npm start
````


