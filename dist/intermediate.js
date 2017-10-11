'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _che = require('../che');

var _che2 = _interopRequireDefault(_che);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _examples = require('../examples');

var _examples2 = _interopRequireDefault(_examples);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

window.localStorage.debug = "react-che:*";

var log = (0, _debug2.default)('test');

var ExamplesComponent = _examples2.default.ExamplesComponent;
//
_che2.default.reset();
_examples2.default.configure(_che2.default);
_che2.default.start();

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _che2.default.store.bind(this, [_che2.default.STORES.Backend]);
    }
  }, {
    key: 'render',
    value: function render() {
      var json = JSON.stringify(this.state);
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'react-che'
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(ExamplesComponent, null)
      );
    }
  }]);

  return App;
}(_react2.default.Component);

(0, _reactDom.render)(_react2.default.createElement(App, null), document.getElementById('root'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFHQTs7Ozs7Ozs7Ozs7O0FBTEEsT0FBTyxZQUFQLENBQW9CLEtBQXBCLEdBQTBCLGFBQTFCOztBQUdBLElBQUksTUFBTSxxQkFBTSxNQUFOLENBQVY7O0FBS0EsSUFBTSxvQkFBb0IsbUJBQVMsaUJBQW5DO0FBQ0E7QUFDQSxjQUFJLEtBQUo7QUFDQSxtQkFBUyxTQUFUO0FBQ0EsY0FBSSxLQUFKOztJQUVNLEc7Ozs7Ozs7Ozs7O3lDQUNnQjtBQUNsQixvQkFBSSxLQUFKLENBQVUsSUFBVixDQUFlLElBQWYsRUFBb0IsQ0FBQyxjQUFJLE1BQUosQ0FBVyxPQUFaLENBQXBCO0FBQ0Q7Ozs2QkFDTztBQUNOLFVBQUksT0FBTyxLQUFLLFNBQUwsQ0FBZSxLQUFLLEtBQXBCLENBQVg7QUFDQSxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FERjtBQUVFLGlEQUZGO0FBR0Usc0NBQUMsaUJBQUQ7QUFIRixPQURGO0FBT0Q7Ozs7RUFiZSxnQkFBTSxTOztBQWdCeEIsc0JBQU8sOEJBQUMsR0FBRCxPQUFQLEVBQWdCLFNBQVMsY0FBVCxDQUF3QixNQUF4QixDQUFoQiIsImZpbGUiOiJpbnRlcm1lZGlhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJiYWJlbC1wb2x5ZmlsbFwiO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSc7XG53aW5kb3cubG9jYWxTdG9yYWdlLmRlYnVnPVwicmVhY3QtY2hlOipcIjtcbmltcG9ydCBjaGUgZnJvbSAnLi4vY2hlJztcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG52YXIgbG9nID0gZGVidWcoJ3Rlc3QnKTtcblxuaW1wb3J0IGV4YW1wbGVzIGZyb20gJy4uL2V4YW1wbGVzJztcblxuXG5jb25zdCBFeGFtcGxlc0NvbXBvbmVudCA9IGV4YW1wbGVzLkV4YW1wbGVzQ29tcG9uZW50O1xuLy9cbmNoZS5yZXNldCgpO1xuZXhhbXBsZXMuY29uZmlndXJlKGNoZSk7XG5jaGUuc3RhcnQoKTtcblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuICBjb21wb25lbnRXaWxsTW91bnQoKXtcbiAgICBjaGUuc3RvcmUuYmluZCh0aGlzLFtjaGUuU1RPUkVTLkJhY2tlbmRdKVxuICB9XG4gIHJlbmRlcigpe1xuICAgIGxldCBqc29uID0gSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZSlcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPnJlYWN0LWNoZTwvaDE+XG4gICAgICAgIDxoci8+XG4gICAgICAgIDxFeGFtcGxlc0NvbXBvbmVudC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcblxuIl19