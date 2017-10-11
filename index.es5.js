'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var log = (0, _debug2.default)('react-che:');

var COMPONENTS_STORE_LISTENERS = {};
var STORE_ACTION_LISTENERS = {};
var STORES = {};
var ACTIONS = {};
var che = {
  stores: {} //.e.g. stores.backend.getState()
};
che.reset = function () {
  log('reset');
  COMPONENTS_STORE_LISTENERS = {};
  STORE_ACTION_LISTENERS = {};
  STORES = {};
  ACTIONS = {};
  che.stores = {};
};
che.start = function () {
  log('start');
  che.STORES = STORES;
  che.store = cheStore();
  che.action = cheAction();
};
che.defineActions = function (newActions) {
  for (var x in newActions) {
    log('Defining action', newActions[x]);
    if (typeof ACTIONS[newActions[x]] !== 'undefined') {
      throw Error('che: duplicated action ' + newActions[x]);
    }
    ACTIONS[newActions[x]] = newActions[x];
  }
  log('Defining success', Object.keys(ACTIONS));
};

function cheAction() {
  var availableActions = {};

  function createActionHandler(name) {
    var _this = this;

    availableActions[name] = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var availableListeners, x;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              availableListeners = STORE_ACTION_LISTENERS[name];

              if (availableListeners) {
                for (x in availableListeners) {
                  availableListeners[x]();
                }
              }

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));
  }
  for (var x in ACTIONS) {
    createActionHandler(ACTIONS[x]);
  }
  return availableActions;
}

che.defineStore = function (name, state, handler) {
  var _this2 = this;

  if (typeof STORES[name] !== 'undefined') {
    throw Error('che: ' + name + ' store is duplicated');
  }
  STORES[name] = name;
  che.stores[name] = {
    getState: function getState() {
      return state;
    }
  };
  log('Defining store', name);
  var scope = {
    on: function () {
      var actions = {};
      for (var x in ACTIONS) {
        actions[ACTIONS[x]] = function (actionName) {
          log('Store', name, 'binding action', ACTIONS[x]);
          return function (listener) {
            STORE_ACTION_LISTENERS[actionName] = STORE_ACTION_LISTENERS[actionName] || [];
            var storeListener = function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var availableComponentStoreListeners, i;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return listener.apply({}, [state]);

                      case 2:
                        availableComponentStoreListeners = COMPONENTS_STORE_LISTENERS[name];

                        if (availableComponentStoreListeners) {
                          for (i in availableComponentStoreListeners) {
                            availableComponentStoreListeners[i](state);
                          }
                        }

                      case 4:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this2);
              }));

              return function storeListener() {
                return _ref2.apply(this, arguments);
              };
            }();
            STORE_ACTION_LISTENERS[actionName].push(storeListener);
          };
        }(ACTIONS[x]);
      }
      return actions;
    }()
  };
  handler(scope);
};

function cheStore() {
  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  function updateState(cmp, name, state) {
    cmp.setState(_defineProperty({}, name.toLowerCase(), state));
  }
  return {
    bind: function bind(cmp, stores) {
      var storeName = void 0;

      var unbindListeners = [];
      for (var x in stores) {
        storeName = stores[x];
        if (typeof STORES[storeName] == 'undefined') {
          throw Error('che: unknown store ' + storeName);
        }
        COMPONENTS_STORE_LISTENERS[storeName] = COMPONENTS_STORE_LISTENERS[storeName] || [];
        COMPONENTS_STORE_LISTENERS[storeName].push(function (state) {
          updateState(cmp, storeName, state);
        });

        unbindListeners.push(function (length) {
          //Original length after push
          return function () {
            return COMPONENTS_STORE_LISTENERS[storeName].splice(length - 1, 1);
          };
        }(COMPONENTS_STORE_LISTENERS[storeName].length));

        var initialState = che.stores[storeName].getState();
        updateState(cmp, storeName, initialState);
      }

      var componentWillUnmountOriginal = cmp.componentWillUnmount;
      cmp.componentWillUnmount = function () {

        for (var x in unbindListeners) {
          unbindListeners[x]();
        } //remove listeners.
        componentWillUnmountOriginal && componentWillUnmountOriginal();
      };
    }
  };
}

exports.default = che;
