import React from 'react';
import che from '../../che';
export default class extends React.Component {
    componentWillMount() {
        che.store.bind(this, [che.STORES.Todo])
        this.form={};
    }
    handleSave(){
      let data = {
        description:this.form.description.value
      };
      if(this.state.selected) data._id = this.state.selected._id;
      this.form.description.value='';
      this.setState({
        selected:null
      })
      che.action.TODO_SAVE(data);
    }
    handleSelect(data,e){
      this.setState({
        selected:data
      });
      this.form.description.value = data.description;
      e.stopPropagation();
    }
    handleRemove(id,e){
      che.action.TODO_REMOVE(id);
      e.stopPropagation();
    }
    handleDone(done){
       che.action.TODO_SAVE({
        _id:this.state.selected._id,
        done:done
       });
    }
    render() {
        let json = JSON.stringify(this.state)
        let li = (data,index)=><li onClick={(e)=>this.handleSelect(data,e)} key={data._id}>{JSON.stringify(data)} <span onClick={(e)=>this.handleRemove(data._id,e)}>[X]</span></li>;
        let list = this.state.todo.items.map(li);
        let mode = this.state.selected?<label> (Edition)</label>:"";

        let saveButton = this.state.selected?<button onClick={this.handleSave.bind(this)}> Update </button> :
        <button onClick={this.handleSave.bind(this)}> Add </button> ;

        let doneCheckbox = this.state.selected?<div><label>Not done</label><input onClick={()=>this.handleDone(false)} type="radio" name="done" value="false"/><label>Done</label><input onClick={()=>this.handleDone(true)} type="radio" name="done" value="true"/></div>:"";

        return ( 
        <div>
            <h1 className = "todo-list-example__h1"> TodoList </h1> 
            {json}
            <br/>
            <input ref={(input) => { this.form.description = input; }} placeholder="Description"/>
            {saveButton}
            {this.state.selected?<button onClick={()=>this.setState({
              selected:null
            })}>Clear</button>:""}
            {doneCheckbox}
            {mode}
            <ul>
            {list}
            </ul>
        </div>);
}
}


export function configure(che) {

    let remoteData = [{
       _id:1,
        description: "SLTI",
        done: false
    }]

    che.defineActions(['TODO_SAVE', 'TODO_REMOVE', 'TODO_FETCH_ALL', 'TODO_REFRESH']);
    che.defineStore('Todo', {
        items: []
    }, (action) => {
        action.on.TODO_SAVE((state,data) => {
            if(data._id){
              for(var x in remoteData){
                if(remoteData[x]._id==data._id) remoteData[x]=Object.assign(remoteData[x],data);
              }
              for(var x in state.items){
                if(state.items[x]._id==data._id) state.items[x]=Object.assign(state.items[x],data);
              }
            }else{
              data.done = data.done === undefined?false:data.done;
              data._id = (()=>{
                var max = null;
                for(var x=0;x<remoteData.length;x++){
                  if(!max) max = remoteData[x]
                  else{
                    if(remoteData[x]._id>max._id){
                      max=remoteData[x];
                    }
                  }
                }
                return max._id+1;
              })();
              state.items.push(data);
              remoteData.push(data);
            }
            che.action.TODO_REFRESH();
        });
        action.on.TODO_REFRESH((state, data) => {
            //
        });

         action.on.TODO_REMOVE((state,id) => {
            remoteData = remoteData.filter(d=>d._id!==id);
            state.items = state.items.filter(d=>d._id!==id);
            che.action.TODO_REFRESH();
        });
    });
}