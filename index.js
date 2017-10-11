import debug from 'debug';
const log = debug('react-che:');
//
let COMPONENTS_STORE_LISTENERS = {};
let STORE_ACTION_LISTENERS = {};
let STORES = {};
let ACTIONS = {};
let che = {
  stores: {} //.e.g. stores.backend.getState()
};
che.reset = ()=>{
  log('reset');
  COMPONENTS_STORE_LISTENERS = {};
  STORE_ACTION_LISTENERS = {};
  STORES = {};
  ACTIONS = {};
  che.stores = {};
}
che.start = () => {
  log('start');
  che.STORES = STORES;
  che.store = cheStore();
  che.action = cheAction();
}
che.defineActions = function(newActions) {
  for (var x in newActions) {
    log('Defining action',newActions[x]);
    if (typeof ACTIONS[newActions[x]] !== 'undefined') {
      throw Error('che: duplicated action ' + newActions[x]);
    }
    ACTIONS[newActions[x]] = newActions[x];
  }
  log('Defining success',Object.keys(ACTIONS));
}


function cheAction() {
  var availableActions = {};

  function createActionHandler(name) {
    availableActions[name] = async function(){
      let availableListeners = STORE_ACTION_LISTENERS[name];
      if (availableListeners) {
        for (var x in availableListeners) {
          availableListeners[x].apply({},arguments);
        }
      }
    }
  }
  for (var x in ACTIONS) {
    createActionHandler(ACTIONS[x]);
  }
  return availableActions;
}


che.defineStore = function(name, state, handler) {
  if (typeof STORES[name] !== 'undefined') {
    throw Error('che: ' + name + ' store is duplicated')
  }
  STORES[name] = name;
  che.stores[name] = {
    getState: () => state
  };
  log('Defining store',name);
  var scope = {
    on: (() => {
      var actions = {}
      for (var x in ACTIONS) {
        actions[ACTIONS[x]] = ((actionName) => {
          log('Store',name,'binding action',ACTIONS[x]);
          return (listener) => {
            STORE_ACTION_LISTENERS[actionName] = STORE_ACTION_LISTENERS[actionName] || [];
            let storeListener = async function(){
              let args = Array.prototype.slice.call(arguments)
              args.unshift(state)
              await listener.apply({}, args);
              let availableComponentStoreListeners = COMPONENTS_STORE_LISTENERS[name];
              if (availableComponentStoreListeners) {
                for (var i in availableComponentStoreListeners) {
                  availableComponentStoreListeners[i](state);
                }
              }
            }
            STORE_ACTION_LISTENERS[actionName].push(storeListener)
          }
        })(ACTIONS[x])
      }
      return actions;
    })()
  };
  handler(scope);
}

function cheStore() {
  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  function updateState(cmp, name, state) {
    cmp.setState({
      [name.toLowerCase()]: state
    });

  }
  return {
    bind: (cmp, stores) => {
      let storeName;

      let unbindListeners = [];
      for (var x in stores) {
        storeName = stores[x];
        if (typeof STORES[storeName] == 'undefined') {
          throw Error('che: unknown store ' + storeName)
        }
        COMPONENTS_STORE_LISTENERS[storeName] = COMPONENTS_STORE_LISTENERS[storeName] || [];
        COMPONENTS_STORE_LISTENERS[storeName].push((state) => {
          updateState(cmp, storeName, state);
        });


        unbindListeners.push(((length) => {
          //Original length after push
          return () => COMPONENTS_STORE_LISTENERS[storeName].splice(length - 1, 1);
        })(COMPONENTS_STORE_LISTENERS[storeName].length));

        let initialState = che.stores[storeName].getState();
        updateState(cmp, storeName, initialState);
      }


      var componentWillUnmountOriginal = cmp.componentWillUnmount;
      cmp.componentWillUnmount = function() {

        for (var x in unbindListeners) unbindListeners[x](); //remove listeners.
        componentWillUnmountOriginal && componentWillUnmountOriginal();
      }

    }
  }
}


export default che;