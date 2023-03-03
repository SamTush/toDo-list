"use strict";
(self["webpackChunkjs_todo_list"] = self["webpackChunkjs_todo_list"] || []).push([["app"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_Apps_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Apps.js */ "./src/modules/Apps.js");


window.addEventListener('load', function () {
  var todo = new _modules_Apps_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  todo.show();
  todo.events();
});

/***/ }),

/***/ "./src/modules/Apps.js":
/*!*****************************!*\
  !*** ./src/modules/Apps.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Apps)
/* harmony export */ });
/* harmony import */ var _node_modules_sort_array_dist_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/sort-array/dist/index.mjs */ "./node_modules/sort-array/dist/index.mjs");
/* harmony import */ var _Todo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Todo.js */ "./src/modules/Todo.js");
/* harmony import */ var _Notification_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Notification.js */ "./src/modules/Notification.js");
/* harmony import */ var _Status_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Status.js */ "./src/modules/Status.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




var Apps = /*#__PURE__*/_createClass(function Apps() {
  var _this = this;
  _classCallCheck(this, Apps);
  _defineProperty(this, "events", function () {
    // Input event to save new task
    var $input = document.getElementById('create');
    $input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (e.target.value !== '') {
          _this.save(e.target.value);
          e.target.value = '';
        } else {
          _Notification_js__WEBPACK_IMPORTED_MODULE_2__["default"].show('Please write your task', 'error');
        }
      }
    });
    // Clear all
    var $clearAll = document.getElementById('clearall');
    $clearAll.addEventListener('click', function (e) {
      e.preventDefault();
      var $checked = document.querySelectorAll('.checkbox:checked');
      $checked.forEach(function (input) {
        input.parentNode.remove();
        _this.items = _this.items.filter(function (item) {
          return item.completed !== true;
        });
        var count = 1;
        _this.items.forEach(function (item) {
          item.index = count;
          count += 1;
        });
        _this.saveStorage(_this.items);
      });
    });
    // Delete a task
    _this.deleteEvent();
    // Change item description
    _this.changeEvent();
    // Update task status
    _this.changeStatus();
  });
  _defineProperty(this, "deleteEvent", function () {
    _this.controller = new AbortController();
    var $tasks = document.querySelectorAll('.delete');
    $tasks.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        _this["delete"](parseInt(e.target.dataset.id, 16));
        e.target.parentNode.remove();
      }, {
        signal: _this.controller.signal
      });
    });
  });
  _defineProperty(this, "removeEvent", function () {
    _this.controller.abort();
  });
  _defineProperty(this, "changeEvent", function () {
    _this.controller = new AbortController();
    var $inputs = document.querySelectorAll('.todo_input');
    $inputs.forEach(function (input) {
      input.addEventListener('click', function (e) {
        e.target.style.background = '#ffcb0029';
      }, {
        signal: _this.controller.signal
      });
      input.addEventListener('focusout', function (e) {
        e.target.style.background = '';
      }, {
        signal: _this.controller.signal
      });
      input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          e.target.style.background = '';
          _this.update(e.target.value, parseInt(e.target.dataset.id, 16));
        }
      }, {
        signal: _this.controller.signal
      });
    });
  });
  _defineProperty(this, "changeStatus", function () {
    _this.controller = new AbortController();
    var $checkbox = document.querySelectorAll('.checkbox');
    $checkbox.forEach(function (input) {
      input.addEventListener('change', function (e) {
        (0,_Status_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_this.items, parseInt(e.target.dataset.id, 16), e.target.checked);
      }, {
        signal: _this.controller.signal
      });
    });
  });
  _defineProperty(this, "show", function () {
    document.getElementById('items').innerHTML = '';
    _this.items = _this.getItems();
    var items = (0,_node_modules_sort_array_dist_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(_this.items, {
      by: 'index'
    });
    if (items != null) {
      items.forEach(function (item) {
        return _this.addItem(item);
      });
    }
  });
  _defineProperty(this, "addItem", function (item) {
    var list = document.getElementById('items');
    var li = document.createElement('li');
    var checked = '';
    if (item.completed) {
      checked = 'checked';
    }
    li.innerHTML = "\n        <input data-id=\"".concat(item.index, "\" type=\"checkbox\" ").concat(checked, " class=\"checkbox\">\n        <input data-id=\"").concat(item.index, "\" type=\"text\" class=\"todo_input\" value=\"").concat(item.description, "\">\n        <i data-id=\"").concat(item.index, "\" class=\"fa-regular fa-trash-can delete\"></i>\n        ");
    list.appendChild(li);
  });
  _defineProperty(this, "getItems", function () {
    var $items = JSON.parse(localStorage.getItem('items'));
    if ($items) {
      return $items;
    }
    return [];
  });
  _defineProperty(this, "saveItems", function ($item) {
    _this.items.push($item);
    _this.saveStorage(_this.items);
  });
  _defineProperty(this, "save", function ($data) {
    var $item = new _Todo_js__WEBPACK_IMPORTED_MODULE_1__["default"]($data, false, _this.items.length + 1);
    _this.saveItems($item);
    _this.addItem($item);
    _this.removeEvent();
    _this.changeEvent();
    _this.changeStatus();
    _this.deleteEvent();
  });
  _defineProperty(this, "update", function ($desc, $id) {
    _this.items.find(function (item) {
      return item.index === $id;
    }).description = $desc;
    _this.saveStorage(_this.items);
  });
  _defineProperty(this, "delete", function ($id) {
    _this.items = _this.items.filter(function (item) {
      return $id !== item.index;
    });
    _this.items.forEach(function (item) {
      if (item.index >= $id) {
        item.index -= 1;
      }
    });
    _this.saveStorage(_this.items);
    _this.show();
    _this.changeEvent();
    _this.changeStatus();
    _this.deleteEvent();
  });
  _defineProperty(this, "saveStorage", function ($items) {
    localStorage.setItem('items', JSON.stringify($items));
  });
  this.items = [];
  this.controller = {};
});


/***/ }),

/***/ "./src/modules/Notification.js":
/*!*************************************!*\
  !*** ./src/modules/Notification.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Notification)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Notification = /*#__PURE__*/_createClass(function Notification() {
  _classCallCheck(this, Notification);
});
_defineProperty(Notification, "show", function ($message, $className) {
  var msg = document.createElement('div');
  msg.className = "alert alert-".concat($className);
  msg.appendChild(document.createTextNode($message));
  var containerELement = document.getElementsByTagName('form');
  var parentDiv = containerELement[0].parentNode;
  parentDiv.insertBefore(msg, parentDiv.lastElementChild);
  setTimeout(function () {
    return document.querySelector('.alert').remove();
  }, 2000);
});


/***/ }),

/***/ "./src/modules/Status.js":
/*!*******************************!*\
  !*** ./src/modules/Status.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Status)
/* harmony export */ });
function Status($items, $id, $status) {
  $items.find(function (item) {
    return item.index === $id;
  }).completed = $status;
  localStorage.setItem('items', JSON.stringify($items));
}

/***/ }),

/***/ "./src/modules/Todo.js":
/*!*****************************!*\
  !*** ./src/modules/Todo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todo)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var Todo = /*#__PURE__*/_createClass(function Todo(description, completed, index) {
  _classCallCheck(this, Todo);
  this.index = index;
  this.description = description;
  this.completed = completed;
});


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/common.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/common.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n  }\n  \n  body {\n    font-family: 'Lato', sans-serif;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    text-align: center;\n    align-items: center;\n  }\n  \n  button,\n  input {\n    padding: 5px;\n    outline: none;\n  }\n  \n  .w-90 {\n    width: 90%;\n  }\n  \n  .text-uppercase {\n    text-transform: uppercase;\n  }\n  \n  img {\n    width: 15vw;\n    height: 8vh;\n  }\n  \n  .btn-success {\n    min-width: 100px;\n    height: 40px;\n    color: #fff;\n    display: inline-block;\n    text-decoration: none;\n    font-style: normal;\n    font-weight: 800;\n    font-size: 15px;\n    line-height: 15px;\n    letter-spacing: 0.03em;\n    padding: 10px;\n    transition: 0.2s all;\n    background: #008552;\n    border-radius: 4px;\n    border: 0;\n    cursor: pointer;\n  }\n  \n  .btn-success::before {\n    content: \"\";\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n    height: 0%;\n    transition: 0.2s all;\n    left: 0;\n    z-index: -10;\n  }\n  \n  .btn-success:hover {\n    color: #fff;\n    border-color: #36b37f;\n    background: #c5e9da !important;\n  }\n  \n  .btn-success:active {\n    background: #ebf0ee;\n  }\n  \n  .btn-success:hover::before {\n    height: 100%;\n  }\n  \n  .btn-danger {\n    min-width: 100px;\n    height: 40px;\n    color: #fff;\n    display: inline-block;\n    text-decoration: none;\n    font-style: normal;\n    font-weight: 800;\n    font-size: 15px;\n    padding: 10px;\n    transition: 0.2s all;\n    background: #ef523c;\n    border-radius: 4px;\n    border: 0;\n    cursor: pointer;\n  }\n  \n  .btn-danger::before {\n    content: \"\";\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n    height: 0%;\n    transition: 0.2s all;\n    left: 0;\n    z-index: -10;\n  }\n  \n  .btn-danger:hover {\n    color: #fff;\n    border-color: rgb(239 82 60);\n    background: rgb(239 82 60 / 54%) !important;\n  }\n  \n  .btn-danger:active {\n    background: #e1270d;\n  }\n  \n  .btn-danger:hover::before {\n    height: 100%;\n  }\n  \n  .btn-default {\n    min-width: 100px;\n    height: 40px;\n    color: black;\n    display: inline-block;\n    text-decoration: none;\n    font-style: normal;\n    font-weight: 800;\n    font-size: 15px;\n    line-height: 15px;\n    letter-spacing: 0.03em;\n    padding: 10px;\n    transition: 0.2s all;\n    background: white;\n    border-radius: 4px;\n    border: 1px solid #d3d3d3;\n    cursor: pointer;\n  }\n  \n  .btn-default::before {\n    content: \"\";\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n    height: 0%;\n    transition: 0.2s all;\n    left: 0;\n    z-index: -10;\n  }\n  \n  .btn-default:hover {\n    color: black;\n    border-color: rgb(181 181 181);\n    background: rgb(253 253 253) !important;\n  }\n  \n  .btn-default:active {\n    background: rgb(155 155 155);\n  }\n  \n  .btn-default:hover::before {\n    height: 100%;\n  }\n  \n  .hidden {\n    display: none !important;\n  }\n  \n  .alert-error {\n    color: #721c24;\n    background-color: #f8d7da;\n    border-color: #f5c6cb;\n    font-size: 20px;\n    padding: 10px;\n    border-radius: 5px;\n  }\n  \n  .alert-success {\n    color: #155724;\n    background-color: #d4edda;\n    border-color: #c3e6cb;\n    font-size: 20px;\n    padding: 10px;\n    border-radius: 5px;\n  }\n  ", "",{"version":3,"sources":["webpack://./src/css/common.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,UAAU;IACV,sBAAsB;EACxB;;EAEA;IACE,+BAA+B;IAC/B,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,kBAAkB;IAClB,mBAAmB;EACrB;;EAEA;;IAEE,YAAY;IACZ,aAAa;EACf;;EAEA;IACE,UAAU;EACZ;;EAEA;IACE,yBAAyB;EAC3B;;EAEA;IACE,WAAW;IACX,WAAW;EACb;;EAEA;IACE,gBAAgB;IAChB,YAAY;IACZ,WAAW;IACX,qBAAqB;IACrB,qBAAqB;IACrB,kBAAkB;IAClB,gBAAgB;IAChB,eAAe;IACf,iBAAiB;IACjB,sBAAsB;IACtB,aAAa;IACb,oBAAoB;IACpB,mBAAmB;IACnB,kBAAkB;IAClB,SAAS;IACT,eAAe;EACjB;;EAEA;IACE,WAAW;IACX,kBAAkB;IAClB,SAAS;IACT,WAAW;IACX,UAAU;IACV,oBAAoB;IACpB,OAAO;IACP,YAAY;EACd;;EAEA;IACE,WAAW;IACX,qBAAqB;IACrB,8BAA8B;EAChC;;EAEA;IACE,mBAAmB;EACrB;;EAEA;IACE,YAAY;EACd;;EAEA;IACE,gBAAgB;IAChB,YAAY;IACZ,WAAW;IACX,qBAAqB;IACrB,qBAAqB;IACrB,kBAAkB;IAClB,gBAAgB;IAChB,eAAe;IACf,aAAa;IACb,oBAAoB;IACpB,mBAAmB;IACnB,kBAAkB;IAClB,SAAS;IACT,eAAe;EACjB;;EAEA;IACE,WAAW;IACX,kBAAkB;IAClB,SAAS;IACT,WAAW;IACX,UAAU;IACV,oBAAoB;IACpB,OAAO;IACP,YAAY;EACd;;EAEA;IACE,WAAW;IACX,4BAA4B;IAC5B,2CAA2C;EAC7C;;EAEA;IACE,mBAAmB;EACrB;;EAEA;IACE,YAAY;EACd;;EAEA;IACE,gBAAgB;IAChB,YAAY;IACZ,YAAY;IACZ,qBAAqB;IACrB,qBAAqB;IACrB,kBAAkB;IAClB,gBAAgB;IAChB,eAAe;IACf,iBAAiB;IACjB,sBAAsB;IACtB,aAAa;IACb,oBAAoB;IACpB,iBAAiB;IACjB,kBAAkB;IAClB,yBAAyB;IACzB,eAAe;EACjB;;EAEA;IACE,WAAW;IACX,kBAAkB;IAClB,SAAS;IACT,WAAW;IACX,UAAU;IACV,oBAAoB;IACpB,OAAO;IACP,YAAY;EACd;;EAEA;IACE,YAAY;IACZ,8BAA8B;IAC9B,uCAAuC;EACzC;;EAEA;IACE,4BAA4B;EAC9B;;EAEA;IACE,YAAY;EACd;;EAEA;IACE,wBAAwB;EAC1B;;EAEA;IACE,cAAc;IACd,yBAAyB;IACzB,qBAAqB;IACrB,eAAe;IACf,aAAa;IACb,kBAAkB;EACpB;;EAEA;IACE,cAAc;IACd,yBAAyB;IACzB,qBAAqB;IACrB,eAAe;IACf,aAAa;IACb,kBAAkB;EACpB","sourcesContent":["* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n  }\n  \n  body {\n    font-family: 'Lato', sans-serif;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    text-align: center;\n    align-items: center;\n  }\n  \n  button,\n  input {\n    padding: 5px;\n    outline: none;\n  }\n  \n  .w-90 {\n    width: 90%;\n  }\n  \n  .text-uppercase {\n    text-transform: uppercase;\n  }\n  \n  img {\n    width: 15vw;\n    height: 8vh;\n  }\n  \n  .btn-success {\n    min-width: 100px;\n    height: 40px;\n    color: #fff;\n    display: inline-block;\n    text-decoration: none;\n    font-style: normal;\n    font-weight: 800;\n    font-size: 15px;\n    line-height: 15px;\n    letter-spacing: 0.03em;\n    padding: 10px;\n    transition: 0.2s all;\n    background: #008552;\n    border-radius: 4px;\n    border: 0;\n    cursor: pointer;\n  }\n  \n  .btn-success::before {\n    content: \"\";\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n    height: 0%;\n    transition: 0.2s all;\n    left: 0;\n    z-index: -10;\n  }\n  \n  .btn-success:hover {\n    color: #fff;\n    border-color: #36b37f;\n    background: #c5e9da !important;\n  }\n  \n  .btn-success:active {\n    background: #ebf0ee;\n  }\n  \n  .btn-success:hover::before {\n    height: 100%;\n  }\n  \n  .btn-danger {\n    min-width: 100px;\n    height: 40px;\n    color: #fff;\n    display: inline-block;\n    text-decoration: none;\n    font-style: normal;\n    font-weight: 800;\n    font-size: 15px;\n    padding: 10px;\n    transition: 0.2s all;\n    background: #ef523c;\n    border-radius: 4px;\n    border: 0;\n    cursor: pointer;\n  }\n  \n  .btn-danger::before {\n    content: \"\";\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n    height: 0%;\n    transition: 0.2s all;\n    left: 0;\n    z-index: -10;\n  }\n  \n  .btn-danger:hover {\n    color: #fff;\n    border-color: rgb(239 82 60);\n    background: rgb(239 82 60 / 54%) !important;\n  }\n  \n  .btn-danger:active {\n    background: #e1270d;\n  }\n  \n  .btn-danger:hover::before {\n    height: 100%;\n  }\n  \n  .btn-default {\n    min-width: 100px;\n    height: 40px;\n    color: black;\n    display: inline-block;\n    text-decoration: none;\n    font-style: normal;\n    font-weight: 800;\n    font-size: 15px;\n    line-height: 15px;\n    letter-spacing: 0.03em;\n    padding: 10px;\n    transition: 0.2s all;\n    background: white;\n    border-radius: 4px;\n    border: 1px solid #d3d3d3;\n    cursor: pointer;\n  }\n  \n  .btn-default::before {\n    content: \"\";\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n    height: 0%;\n    transition: 0.2s all;\n    left: 0;\n    z-index: -10;\n  }\n  \n  .btn-default:hover {\n    color: black;\n    border-color: rgb(181 181 181);\n    background: rgb(253 253 253) !important;\n  }\n  \n  .btn-default:active {\n    background: rgb(155 155 155);\n  }\n  \n  .btn-default:hover::before {\n    height: 100%;\n  }\n  \n  .hidden {\n    display: none !important;\n  }\n  \n  .alert-error {\n    color: #721c24;\n    background-color: #f8d7da;\n    border-color: #f5c6cb;\n    font-size: 20px;\n    padding: 10px;\n    border-radius: 5px;\n  }\n  \n  .alert-success {\n    color: #155724;\n    background-color: #d4edda;\n    border-color: #c3e6cb;\n    font-size: 20px;\n    padding: 10px;\n    border-radius: 5px;\n  }\n  "],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_css_common_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js!./css/common.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/common.css");
// Imports



var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Lato&display=swap);"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_css_common_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "main {\n  margin-top: 30px;\n  min-height: 350px;\n  display: grid;\n  place-items: center;\n}\n\nform {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 350px;\n  height: auto;\n  border: 0.5px solid #ccc;\n}\n\n.title {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-bottom: 0.5px solid #ccc;\n  height: 45px;\n}\n\n.title a {\n  width: 32px;\n  padding: 5px;\n  margin-right: 15px;\n  color: gray;\n}\n\nform h1 {\n  font-size: 135%;\n  padding: 0 10px;\n}\n\n.data_input_wrapper {\n  display: flex;\n  justify-content: space-between;\n  border-bottom: 0.5px solid #ccc;\n}\n\n#enter {\n  height: 25px;\n  width: 25px;\n  align-self: center;\n  padding: 5px;\n  margin-right: 15px;\n  color: gray;\n}\n\n.data_input {\n  width: 100%;\n  border: none;\n  font-style: italic;\n  padding: 0 10px;\n}\n\n.data_input:focus {\n  outline: none;\n}\n\nform > * {\n  width: 100%;\n  height: 45px;\n}\n\n.todo_list {\n  height: 100%;\n}\n\n.todo_list li {\n  list-style: none;\n  display: flex;\n  justify-content: space-between;\n  height: 45px;\n  border-bottom: 0.5px solid #ccc;\n}\n\n.todo_list .checkbox {\n  margin: auto;\n}\n\n.todo_list li .todo_input {\n  height: 100%;\n  width: 75%;\n  border: none;\n}\n\n.todo_list li .delete {\n  width: 28px;\n  height: 28px;\n  margin: auto;\n  cursor: pointer;\n  padding: 5px;\n  color: gray;\n}\n\n.clear_completed {\n  width: 100%;\n  height: 45px;\n  background-color: #f8f8f8;\n  color: #777676;\n  border: none;\n  cursor: pointer;\n}\n\n.clear_completed:hover {\n  text-decoration: underline;\n}\n\n/* Linter */\n.checkbox:checked + .todo_input {\n  text-decoration: line-through;\n}\n\n.todo_list li .todo_input:focus {\n  border: none;\n  outline: none;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAGA;EACE,gBAAgB;EAChB,iBAAiB;EACjB,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,wBAAwB;AAC1B;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,+BAA+B;EAC/B,YAAY;AACd;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,eAAe;EACf,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,+BAA+B;AACjC;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,YAAY;EACZ,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,8BAA8B;EAC9B,YAAY;EACZ,+BAA+B;AACjC;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,UAAU;EACV,YAAY;AACd;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,cAAc;EACd,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,0BAA0B;AAC5B;;AAEA,WAAW;AACX;EACE,6BAA6B;AAC/B;;AAEA;EACE,YAAY;EACZ,aAAa;AACf","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Lato&display=swap\");\n@import \"css/common.css\";\n\nmain {\n  margin-top: 30px;\n  min-height: 350px;\n  display: grid;\n  place-items: center;\n}\n\nform {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 350px;\n  height: auto;\n  border: 0.5px solid #ccc;\n}\n\n.title {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-bottom: 0.5px solid #ccc;\n  height: 45px;\n}\n\n.title a {\n  width: 32px;\n  padding: 5px;\n  margin-right: 15px;\n  color: gray;\n}\n\nform h1 {\n  font-size: 135%;\n  padding: 0 10px;\n}\n\n.data_input_wrapper {\n  display: flex;\n  justify-content: space-between;\n  border-bottom: 0.5px solid #ccc;\n}\n\n#enter {\n  height: 25px;\n  width: 25px;\n  align-self: center;\n  padding: 5px;\n  margin-right: 15px;\n  color: gray;\n}\n\n.data_input {\n  width: 100%;\n  border: none;\n  font-style: italic;\n  padding: 0 10px;\n}\n\n.data_input:focus {\n  outline: none;\n}\n\nform > * {\n  width: 100%;\n  height: 45px;\n}\n\n.todo_list {\n  height: 100%;\n}\n\n.todo_list li {\n  list-style: none;\n  display: flex;\n  justify-content: space-between;\n  height: 45px;\n  border-bottom: 0.5px solid #ccc;\n}\n\n.todo_list .checkbox {\n  margin: auto;\n}\n\n.todo_list li .todo_input {\n  height: 100%;\n  width: 75%;\n  border: none;\n}\n\n.todo_list li .delete {\n  width: 28px;\n  height: 28px;\n  margin: auto;\n  cursor: pointer;\n  padding: 5px;\n  color: gray;\n}\n\n.clear_completed {\n  width: 100%;\n  height: 45px;\n  background-color: #f8f8f8;\n  color: #777676;\n  border: none;\n  cursor: pointer;\n}\n\n.clear_completed:hover {\n  text-decoration: underline;\n}\n\n/* Linter */\n.checkbox:checked + .todo_input {\n  text-decoration: line-through;\n}\n\n.todo_list li .todo_input:focus {\n  border: none;\n  outline: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/sort-array/dist/index.mjs":
/*!************************************************!*\
  !*** ./node_modules/sort-array/dist/index.mjs ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Takes any input and guarantees an array back.
 *
 * - Converts array-like objects (e.g. `arguments`, `Set`) to a real array.
 * - Converts `undefined` to an empty array.
 * - Converts any another other, singular value (including `null`, objects and iterables other than `Set`) into an array containing that value.
 * - Ignores input which is already an array.
 *
 * @module array-back
 * @example
 * > const arrayify = require('array-back')
 *
 * > arrayify(undefined)
 * []
 *
 * > arrayify(null)
 * [ null ]
 *
 * > arrayify(0)
 * [ 0 ]
 *
 * > arrayify([ 1, 2 ])
 * [ 1, 2 ]
 *
 * > arrayify(new Set([ 1, 2 ]))
 * [ 1, 2 ]
 *
 * > function f(){ return arrayify(arguments); }
 * > f(1,2,3)
 * [ 1, 2, 3 ]
 */

function isObject$1 (input) {
  return typeof input === 'object' && input !== null
}

function isArrayLike$1 (input) {
  return isObject$1(input) && typeof input.length === 'number'
}

/**
 * @param {*} - The input value to convert to an array
 * @returns {Array}
 * @alias module:array-back
 */
function arrayify (input) {
  if (Array.isArray(input)) {
    return input
  } else if (input === undefined) {
    return []
  } else if (isArrayLike$1(input) || input instanceof Set) {
    return Array.from(input)
  } else {
    return [input]
  }
}

/**
 * Isomorphic, functional type-checking for Javascript.
 * @module typical
 * @typicalname t
 * @example
 * const t = require('typical')
 * const allDefined = array.every(t.isDefined)
 */

/**
 * Returns true if input is a number. It is a more reasonable alternative to `typeof n` which returns `number` for `NaN` and `Infinity`.
 *
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 * @example
 * > t.isNumber(0)
 * true
 * > t.isNumber(1)
 * true
 * > t.isNumber(1.1)
 * true
 * > t.isNumber(0xff)
 * true
 * > t.isNumber(0644)
 * true
 * > t.isNumber(6.2e5)
 * true
 * > t.isNumber(NaN)
 * false
 * > t.isNumber(Infinity)
 * false
 */
function isNumber (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

/**
 * A plain object is a simple object literal, it is not an instance of a class. Returns true if the input `typeof` is `object` and directly decends from `Object`.
 *
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 * @example
 * > t.isPlainObject({ something: 'one' })
 * true
 * > t.isPlainObject(new Date())
 * false
 * > t.isPlainObject([ 0, 1 ])
 * false
 * > t.isPlainObject(/test/)
 * false
 * > t.isPlainObject(1)
 * false
 * > t.isPlainObject('one')
 * false
 * > t.isPlainObject(null)
 * false
 * > t.isPlainObject((function * () {})())
 * false
 * > t.isPlainObject(function * () {})
 * false
 */
function isPlainObject (input) {
  return input !== null && typeof input === 'object' && input.constructor === Object
}

/**
 * An array-like value has all the properties of an array yet is not an array instance. An example is the `arguments` object. Returns `true`` if the input value is an object, not `null`` and has a `length` property set with a numeric value.
 *
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 * @example
 * function sum(x, y){
 *   console.log(t.isArrayLike(arguments))
 *   // prints `true`
 * }
 */
function isArrayLike (input) {
  return isObject(input) && typeof input.length === 'number'
}

/**
 * Returns true if the typeof input is `'object'` but not null.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isObject (input) {
  return typeof input === 'object' && input !== null
}

/**
 * Returns true if the input value is defined.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isDefined (input) {
  return typeof input !== 'undefined'
}

/**
 * Returns true if the input value is undefined.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isUndefined (input) {
  return !isDefined(input)
}

/**
 * Returns true if the input value is null.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isNull (input) {
 return input === null
}

/**
 * Returns true if the input value is not one of `undefined`, `null`, or `NaN`.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isDefinedValue (input) {
 return isDefined(input) && !isNull(input) && !Number.isNaN(input)
}

/**
 * Returns true if the input value is an ES2015 `class`.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isClass (input) {
  if (typeof input === 'function') {
    return /^class /.test(Function.prototype.toString.call(input))
  } else {
    return false
  }
}

/**
 * Returns true if the input is a string, number, symbol, boolean, null or undefined value.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isPrimitive (input) {
  if (input === null) return true
  switch (typeof input) {
    case 'string':
    case 'number':
    case 'symbol':
    case 'undefined':
    case 'boolean':
      return true
    default:
      return false
  }
}

/**
 * Returns true if the input is a Promise.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isPromise (input) {
  if (input) {
    const isPromise = isDefined(Promise) && input instanceof Promise;
    const isThenable = input.then && typeof input.then === 'function';
    return !!(isPromise || isThenable)
  } else {
    return false
  }
}

/**
 * Returns true if the input is an iterable (`Map`, `Set`, `Array`, Generator etc.).
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 * @example
 * > t.isIterable('string')
 * true
 * > t.isIterable(new Map())
 * true
 * > t.isIterable([])
 * true
 * > t.isIterable((function * () {})())
 * true
 * > t.isIterable(Promise.resolve())
 * false
 * > t.isIterable(Promise)
 * false
 * > t.isIterable(true)
 * false
 * > t.isIterable({})
 * false
 * > t.isIterable(0)
 * false
 * > t.isIterable(1.1)
 * false
 * > t.isIterable(NaN)
 * false
 * > t.isIterable(Infinity)
 * false
 * > t.isIterable(function () {})
 * false
 * > t.isIterable(Date)
 * false
 * > t.isIterable()
 * false
 * > t.isIterable({ then: function () {} })
 * false
 */
function isIterable (input) {
  if (input === null || !isDefined(input)) {
    return false
  } else {
    return (
      typeof input[Symbol.iterator] === 'function' ||
      typeof input[Symbol.asyncIterator] === 'function'
    )
  }
}

/**
 * Returns true if the input value is a string. The equivalent of `typeof input === 'string'` for use in funcitonal contexts.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isString (input) {
  return typeof input === 'string'
}

/**
 * Returns true if the input value is a function. The equivalent of `typeof input === 'function'` for use in funcitonal contexts.
 * @param {*} - the input to test
 * @returns {boolean}
 * @static
 */
function isFunction (input) {
  return typeof input === 'function'
}

var t = {
  isNumber,
  isPlainObject,
  isArrayLike,
  isObject,
  isDefined,
  isUndefined,
  isNull,
  isDefinedValue,
  isClass,
  isPrimitive,
  isPromise,
  isIterable,
  isString,
  isFunction
};

/**
 * Isomorphic, load-anywhere function to sort an array by scalar, deep or computed values in any standard or custom order.
 *
 * @module sort-array
 * @typicalname sortArray
 * @example
 * const sortArray = require('sort-array')
 */

/**
 * @param {Array} array - The input array to sort. It is sorted in place.
 * @param {object} [options] - Sort options.
 * @param {string[]} [options.by] - One or more property names or computed fields to sort by. Specifying property names is only relevant when sorting an array of objects.
 * @param {string[]} [options.order] - One or more sort orders. Specify `'asc'`, `'desc'` or a property name from the `options.customOrders` object.
 * @param {object} [options.customOrders] - A dictionary object containing one or more custom orders. Each custom order value must be an array defining the order expected values must be sorted in.
 * @param {object} [options.computed] - A dictionary object containing one or more computed field functions. The function will be invoked once per item in the array. Each invocation will receive the array item as input and must return a primitive value by which the array can be sorted.
 * @param {number} [options.nullRank] - Configures whether `null` values will be sorted before or after defined values. Set to `-1` for before, `1` for after. Defaults to `1`.
 * @param {number} [options.undefinedRank] - Configures whether `undefined` values will be sorted before or after defined values. Set to `-1` for before, `1` for after. Defaults to `1`.
 * @returns {Array} Returns the array that was passed in.
 * @alias module:sort-array
 */
function sortArray (arr, options = {}) {
  options = Object.assign(
    {
      computed: {},
      customOrders: {},
      nullRank: 1,
      undefinedRank: 1
    },
    options
  );
  arr.sort(getCompareFunc(options));
  return arr
}

function getCompareFunc (options = {}) {
  const by = arrayify(options.by);
  const order = arrayify(options.order);
  const { customOrders, computed } = options;
  return function compareFunc (xIn, yIn, byIndex = 0) {
    const currOrder = order[byIndex] || 'asc';
    if (!(currOrder === 'asc' || currOrder === 'desc' || customOrders[currOrder])) {
      return 0
    }

    let result, x, y;
    if (by.length) {
      x = t.isDefined(xIn[by[byIndex]])
        ? xIn[by[byIndex]]
        : computed[by[byIndex]] && computed[by[byIndex]](xIn);
      y = t.isDefined(yIn[by[byIndex]])
        ? yIn[by[byIndex]]
        : computed[by[byIndex]] && computed[by[byIndex]](yIn);
    } else {
      x = xIn;
      y = yIn;
    }

    if (customOrders && customOrders[currOrder]) {
      result = customOrders[currOrder].indexOf(x) - customOrders[currOrder].indexOf(y);
    } else if (x === y) {
      result = 0;
    } else if (t.isNull(x) && t.isUndefined(y)) {
      result = currOrder === 'asc'
        ? 1
        : currOrder === 'desc'
          ? -1
          : 0;
    } else if (t.isUndefined(x) && t.isNull(y)) {
      result = currOrder === 'asc'
        ? -1
        : currOrder === 'desc'
          ? 1
          : 0;
    } else if (t.isNull(x) && t.isDefinedValue(y)) {
      result = options.nullRank;
    } else if (t.isUndefined(x) && t.isDefinedValue(y)) {
      result = options.undefinedRank;
    } else if (t.isNull(y) && t.isDefinedValue(x)) {
      result = -options.nullRank;
    } else if (t.isUndefined(y) && t.isDefinedValue(x)) {
      result = -options.undefinedRank;
    } else {
      result = x < y ? -1 : x > y ? 1 : 0;
      if (currOrder === 'desc') {
        result = result * -1;
      }
    }
    if (result === 0 && t.isDefined(by[byIndex + 1])) {
      result = compareFunc(xIn, yIn, byIndex + 1);
    }
    return result
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sortArray);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2QsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsVUFBVTtBQUNyQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EsVUFBVSx5QkFBeUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFNBQVMsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2pzLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9qcy10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9BcHBzLmpzIiwid2VicGFjazovL2pzLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL05vdGlmaWNhdGlvbi5qcyIsIndlYnBhY2s6Ly9qcy10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9TdGF0dXMuanMiLCJ3ZWJwYWNrOi8vanMtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVG9kby5qcyIsIndlYnBhY2s6Ly9qcy10b2RvLWxpc3QvLi9zcmMvY3NzL2NvbW1vbi5jc3MiLCJ3ZWJwYWNrOi8vanMtdG9kby1saXN0Ly4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9qcy10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2pzLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2pzLXRvZG8tbGlzdC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9qcy10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vanMtdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9qcy10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vanMtdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2pzLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2pzLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2pzLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zb3J0LWFycmF5L2Rpc3QvaW5kZXgubWpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IFRvZG8gZnJvbSAnLi9tb2R1bGVzL0FwcHMuanMnO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgY29uc3QgdG9kbyA9IG5ldyBUb2RvKCk7XG4gIHRvZG8uc2hvdygpO1xuICB0b2RvLmV2ZW50cygpO1xufSk7IiwiaW1wb3J0IHNvcnRBcnJheSBmcm9tICcuLi8uLi9ub2RlX21vZHVsZXMvc29ydC1hcnJheS9kaXN0L2luZGV4Lm1qcyc7XG5pbXBvcnQgVG9kbyBmcm9tICcuL1RvZG8uanMnO1xuaW1wb3J0IE5vdGlmeSBmcm9tICcuL05vdGlmaWNhdGlvbi5qcyc7XG5pbXBvcnQgU3RhdHVzIGZyb20gJy4vU3RhdHVzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwcyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSB7fTtcbiAgfVxuXG4gIGV2ZW50cyA9ICgpID0+IHtcbiAgICAvLyBJbnB1dCBldmVudCB0byBzYXZlIG5ldyB0YXNrXG4gICAgY29uc3QgJGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZScpO1xuICAgICRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG4gICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoZS50YXJnZXQudmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgdGhpcy5zYXZlKGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICBlLnRhcmdldC52YWx1ZSA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIE5vdGlmeS5zaG93KCdQbGVhc2Ugd3JpdGUgeW91ciB0YXNrJywgJ2Vycm9yJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBDbGVhciBhbGxcbiAgICBjb25zdCAkY2xlYXJBbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xlYXJhbGwnKTtcbiAgICAkY2xlYXJBbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgJGNoZWNrZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hlY2tib3g6Y2hlY2tlZCcpO1xuICAgICAgJGNoZWNrZWQuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmNvbXBsZXRlZCAhPT0gdHJ1ZSk7XG4gICAgICAgIGxldCBjb3VudCA9IDE7XG4gICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uaW5kZXggPSBjb3VudDtcbiAgICAgICAgICBjb3VudCArPSAxO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zYXZlU3RvcmFnZSh0aGlzLml0ZW1zKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIERlbGV0ZSBhIHRhc2tcbiAgICB0aGlzLmRlbGV0ZUV2ZW50KCk7XG4gICAgLy8gQ2hhbmdlIGl0ZW0gZGVzY3JpcHRpb25cbiAgICB0aGlzLmNoYW5nZUV2ZW50KCk7XG4gICAgLy8gVXBkYXRlIHRhc2sgc3RhdHVzXG4gICAgdGhpcy5jaGFuZ2VTdGF0dXMoKTtcbiAgfTtcblxuICBkZWxldGVFdmVudCA9ICgpID0+IHtcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgY29uc3QgJHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlbGV0ZScpO1xuICAgICR0YXNrcy5mb3JFYWNoKChidG4pID0+IHtcbiAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5kZWxldGUocGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pZCwgMTYpKTtcbiAgICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgICAgIH0sIHsgc2lnbmFsOiB0aGlzLmNvbnRyb2xsZXIuc2lnbmFsIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJlbW92ZUV2ZW50ID0gKCkgPT4ge1xuICAgIHRoaXMuY29udHJvbGxlci5hYm9ydCgpO1xuICB9O1xuXG4gIGNoYW5nZUV2ZW50ID0gKCkgPT4ge1xuICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICBjb25zdCAkaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG9faW5wdXQnKTtcbiAgICAkaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSAnI2ZmY2IwMDI5JztcbiAgICAgIH0sIHsgc2lnbmFsOiB0aGlzLmNvbnRyb2xsZXIuc2lnbmFsIH0pO1xuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgICB9LCB7IHNpZ25hbDogdGhpcy5jb250cm9sbGVyLnNpZ25hbCB9KTtcbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgICAgICAgIHRoaXMudXBkYXRlKGUudGFyZ2V0LnZhbHVlLCBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmlkLCAxNikpO1xuICAgICAgICB9XG4gICAgICB9LCB7IHNpZ25hbDogdGhpcy5jb250cm9sbGVyLnNpZ25hbCB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBjaGFuZ2VTdGF0dXMgPSAoKSA9PiB7XG4gICAgdGhpcy5jb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgIGNvbnN0ICRjaGVja2JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGVja2JveCcpO1xuICAgICRjaGVja2JveC5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICAgICAgU3RhdHVzKHRoaXMuaXRlbXMsIHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuaWQsIDE2KSwgZS50YXJnZXQuY2hlY2tlZCk7XG4gICAgICB9LCB7IHNpZ25hbDogdGhpcy5jb250cm9sbGVyLnNpZ25hbCB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBzaG93ID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGVtcycpLmlubmVySFRNTCA9ICcnO1xuICAgIHRoaXMuaXRlbXMgPSB0aGlzLmdldEl0ZW1zKCk7XG4gICAgY29uc3QgaXRlbXMgPSBzb3J0QXJyYXkodGhpcy5pdGVtcywge1xuICAgICAgYnk6ICdpbmRleCcsXG4gICAgfSk7XG4gICAgaWYgKGl0ZW1zICE9IG51bGwpIHtcbiAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHRoaXMuYWRkSXRlbShpdGVtKSk7XG4gICAgfVxuICB9O1xuXG4gIGFkZEl0ZW0gPSAoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXRlbXMnKTtcbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgbGV0IGNoZWNrZWQgPSAnJztcbiAgICBpZiAoaXRlbS5jb21wbGV0ZWQpIHtcbiAgICAgIGNoZWNrZWQgPSAnY2hlY2tlZCc7XG4gICAgfVxuICAgIGxpLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGlucHV0IGRhdGEtaWQ9XCIke2l0ZW0uaW5kZXh9XCIgdHlwZT1cImNoZWNrYm94XCIgJHtjaGVja2VkfSBjbGFzcz1cImNoZWNrYm94XCI+XG4gICAgICAgIDxpbnB1dCBkYXRhLWlkPVwiJHtpdGVtLmluZGV4fVwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ0b2RvX2lucHV0XCIgdmFsdWU9XCIke2l0ZW0uZGVzY3JpcHRpb259XCI+XG4gICAgICAgIDxpIGRhdGEtaWQ9XCIke2l0ZW0uaW5kZXh9XCIgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLXRyYXNoLWNhbiBkZWxldGVcIj48L2k+XG4gICAgICAgIGA7XG4gICAgbGlzdC5hcHBlbmRDaGlsZChsaSk7XG4gIH07XG5cbiAgZ2V0SXRlbXMgPSAoKSA9PiB7XG4gICAgY29uc3QgJGl0ZW1zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaXRlbXMnKSk7XG4gICAgaWYgKCRpdGVtcykge1xuICAgICAgcmV0dXJuICRpdGVtcztcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9O1xuXG4gIHNhdmVJdGVtcyA9ICgkaXRlbSkgPT4ge1xuICAgIHRoaXMuaXRlbXMucHVzaCgkaXRlbSk7XG4gICAgdGhpcy5zYXZlU3RvcmFnZSh0aGlzLml0ZW1zKTtcbiAgfTtcblxuICBzYXZlID0gKCRkYXRhKSA9PiB7XG4gICAgY29uc3QgJGl0ZW0gPSBuZXcgVG9kbygkZGF0YSwgZmFsc2UsIHRoaXMuaXRlbXMubGVuZ3RoICsgMSk7XG4gICAgdGhpcy5zYXZlSXRlbXMoJGl0ZW0pO1xuICAgIHRoaXMuYWRkSXRlbSgkaXRlbSk7XG4gICAgdGhpcy5yZW1vdmVFdmVudCgpO1xuICAgIHRoaXMuY2hhbmdlRXZlbnQoKTtcbiAgICB0aGlzLmNoYW5nZVN0YXR1cygpO1xuICAgIHRoaXMuZGVsZXRlRXZlbnQoKTtcbiAgfTtcblxuICB1cGRhdGUgPSAoJGRlc2MsICRpZCkgPT4ge1xuICAgIHRoaXMuaXRlbXMuZmluZCgoaXRlbSkgPT4gaXRlbS5pbmRleCA9PT0gJGlkKS5kZXNjcmlwdGlvbiA9ICRkZXNjO1xuICAgIHRoaXMuc2F2ZVN0b3JhZ2UodGhpcy5pdGVtcyk7XG4gIH07XG5cbiAgZGVsZXRlID0gKCRpZCkgPT4ge1xuICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcigoaXRlbSkgPT4gJGlkICE9PSBpdGVtLmluZGV4KTtcbiAgICB0aGlzLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLmluZGV4ID49ICRpZCkge1xuICAgICAgICBpdGVtLmluZGV4IC09IDE7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zYXZlU3RvcmFnZSh0aGlzLml0ZW1zKTtcbiAgICB0aGlzLnNob3coKTtcbiAgICB0aGlzLmNoYW5nZUV2ZW50KCk7XG4gICAgdGhpcy5jaGFuZ2VTdGF0dXMoKTtcbiAgICB0aGlzLmRlbGV0ZUV2ZW50KCk7XG4gIH07XG5cbiAgc2F2ZVN0b3JhZ2UgPSAoJGl0ZW1zKSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2l0ZW1zJywgSlNPTi5zdHJpbmdpZnkoJGl0ZW1zKSk7XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90aWZpY2F0aW9uIHtcbiAgICBzdGF0aWMgc2hvdyA9ICgkbWVzc2FnZSwgJGNsYXNzTmFtZSkgPT4ge1xuICAgICAgY29uc3QgbXNnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBtc2cuY2xhc3NOYW1lID0gYGFsZXJ0IGFsZXJ0LSR7JGNsYXNzTmFtZX1gO1xuICAgICAgbXNnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCRtZXNzYWdlKSk7XG4gICAgICBjb25zdCBjb250YWluZXJFTGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2Zvcm0nKTtcbiAgICAgIGNvbnN0IHBhcmVudERpdiA9IGNvbnRhaW5lckVMZW1lbnRbMF0ucGFyZW50Tm9kZTtcbiAgICAgIHBhcmVudERpdi5pbnNlcnRCZWZvcmUobXNnLCBwYXJlbnREaXYubGFzdEVsZW1lbnRDaGlsZCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydCcpLnJlbW92ZSgpLCAyMDAwKTtcbiAgICB9XG4gIH0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdGF0dXMoJGl0ZW1zLCAkaWQsICRzdGF0dXMpIHtcbiAgICAkaXRlbXMuZmluZCgoaXRlbSkgPT4gaXRlbS5pbmRleCA9PT0gJGlkKS5jb21wbGV0ZWQgPSAkc3RhdHVzO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpdGVtcycsIEpTT04uc3RyaW5naWZ5KCRpdGVtcykpO1xuICB9IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kbyB7XG4gICAgY29uc3RydWN0b3IoZGVzY3JpcHRpb24sIGNvbXBsZXRlZCwgaW5kZXgpIHtcbiAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgIHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkO1xuICAgIH1cbiAgfSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIH1cXG4gIFxcbiAgYm9keSB7XFxuICAgIGZvbnQtZmFtaWx5OiAnTGF0bycsIHNhbnMtc2VyaWY7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuICBcXG4gIGJ1dHRvbixcXG4gIGlucHV0IHtcXG4gICAgcGFkZGluZzogNXB4O1xcbiAgICBvdXRsaW5lOiBub25lO1xcbiAgfVxcbiAgXFxuICAudy05MCB7XFxuICAgIHdpZHRoOiA5MCU7XFxuICB9XFxuICBcXG4gIC50ZXh0LXVwcGVyY2FzZSB7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICB9XFxuICBcXG4gIGltZyB7XFxuICAgIHdpZHRoOiAxNXZ3O1xcbiAgICBoZWlnaHQ6IDh2aDtcXG4gIH1cXG4gIFxcbiAgLmJ0bi1zdWNjZXNzIHtcXG4gICAgbWluLXdpZHRoOiAxMDBweDtcXG4gICAgaGVpZ2h0OiA0MHB4O1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gICAgZm9udC13ZWlnaHQ6IDgwMDtcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICBsaW5lLWhlaWdodDogMTVweDtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgdHJhbnNpdGlvbjogMC4ycyBhbGw7XFxuICAgIGJhY2tncm91bmQ6ICMwMDg1NTI7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICB9XFxuICBcXG4gIC5idG4tc3VjY2Vzczo6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYm90dG9tOiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAwJTtcXG4gICAgdHJhbnNpdGlvbjogMC4ycyBhbGw7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHotaW5kZXg6IC0xMDtcXG4gIH1cXG4gIFxcbiAgLmJ0bi1zdWNjZXNzOmhvdmVyIHtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGJvcmRlci1jb2xvcjogIzM2YjM3ZjtcXG4gICAgYmFja2dyb3VuZDogI2M1ZTlkYSAhaW1wb3J0YW50O1xcbiAgfVxcbiAgXFxuICAuYnRuLXN1Y2Nlc3M6YWN0aXZlIHtcXG4gICAgYmFja2dyb3VuZDogI2ViZjBlZTtcXG4gIH1cXG4gIFxcbiAgLmJ0bi1zdWNjZXNzOmhvdmVyOjpiZWZvcmUge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICB9XFxuICBcXG4gIC5idG4tZGFuZ2VyIHtcXG4gICAgbWluLXdpZHRoOiAxMDBweDtcXG4gICAgaGVpZ2h0OiA0MHB4O1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gICAgZm9udC13ZWlnaHQ6IDgwMDtcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICB0cmFuc2l0aW9uOiAwLjJzIGFsbDtcXG4gICAgYmFja2dyb3VuZDogI2VmNTIzYztcXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gIH1cXG4gIFxcbiAgLmJ0bi1kYW5nZXI6OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJvdHRvbTogMDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMCU7XFxuICAgIHRyYW5zaXRpb246IDAuMnMgYWxsO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB6LWluZGV4OiAtMTA7XFxuICB9XFxuICBcXG4gIC5idG4tZGFuZ2VyOmhvdmVyIHtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGJvcmRlci1jb2xvcjogcmdiKDIzOSA4MiA2MCk7XFxuICAgIGJhY2tncm91bmQ6IHJnYigyMzkgODIgNjAgLyA1NCUpICFpbXBvcnRhbnQ7XFxuICB9XFxuICBcXG4gIC5idG4tZGFuZ2VyOmFjdGl2ZSB7XFxuICAgIGJhY2tncm91bmQ6ICNlMTI3MGQ7XFxuICB9XFxuICBcXG4gIC5idG4tZGFuZ2VyOmhvdmVyOjpiZWZvcmUge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICB9XFxuICBcXG4gIC5idG4tZGVmYXVsdCB7XFxuICAgIG1pbi13aWR0aDogMTAwcHg7XFxuICAgIGhlaWdodDogNDBweDtcXG4gICAgY29sb3I6IGJsYWNrO1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgICBmb250LXdlaWdodDogODAwO1xcbiAgICBmb250LXNpemU6IDE1cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAxNXB4O1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICB0cmFuc2l0aW9uOiAwLjJzIGFsbDtcXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2QzZDNkMztcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgfVxcbiAgXFxuICAuYnRuLWRlZmF1bHQ6OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJvdHRvbTogMDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMCU7XFxuICAgIHRyYW5zaXRpb246IDAuMnMgYWxsO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB6LWluZGV4OiAtMTA7XFxuICB9XFxuICBcXG4gIC5idG4tZGVmYXVsdDpob3ZlciB7XFxuICAgIGNvbG9yOiBibGFjaztcXG4gICAgYm9yZGVyLWNvbG9yOiByZ2IoMTgxIDE4MSAxODEpO1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMjUzIDI1MyAyNTMpICFpbXBvcnRhbnQ7XFxuICB9XFxuICBcXG4gIC5idG4tZGVmYXVsdDphY3RpdmUge1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMTU1IDE1NSAxNTUpO1xcbiAgfVxcbiAgXFxuICAuYnRuLWRlZmF1bHQ6aG92ZXI6OmJlZm9yZSB7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gIH1cXG4gIFxcbiAgLmhpZGRlbiB7XFxuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG4gIH1cXG4gIFxcbiAgLmFsZXJ0LWVycm9yIHtcXG4gICAgY29sb3I6ICM3MjFjMjQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmOGQ3ZGE7XFxuICAgIGJvcmRlci1jb2xvcjogI2Y1YzZjYjtcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICB9XFxuICBcXG4gIC5hbGVydC1zdWNjZXNzIHtcXG4gICAgY29sb3I6ICMxNTU3MjQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkNGVkZGE7XFxuICAgIGJvcmRlci1jb2xvcjogI2MzZTZjYjtcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICB9XFxuICBcIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvY3NzL2NvbW1vbi5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxTQUFTO0lBQ1QsVUFBVTtJQUNWLHNCQUFzQjtFQUN4Qjs7RUFFQTtJQUNFLCtCQUErQjtJQUMvQixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLHVCQUF1QjtJQUN2QixrQkFBa0I7SUFDbEIsbUJBQW1CO0VBQ3JCOztFQUVBOztJQUVFLFlBQVk7SUFDWixhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxVQUFVO0VBQ1o7O0VBRUE7SUFDRSx5QkFBeUI7RUFDM0I7O0VBRUE7SUFDRSxXQUFXO0lBQ1gsV0FBVztFQUNiOztFQUVBO0lBQ0UsZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWixXQUFXO0lBQ1gscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsc0JBQXNCO0lBQ3RCLGFBQWE7SUFDYixvQkFBb0I7SUFDcEIsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsU0FBUztJQUNULFdBQVc7SUFDWCxVQUFVO0lBQ1Ysb0JBQW9CO0lBQ3BCLE9BQU87SUFDUCxZQUFZO0VBQ2Q7O0VBRUE7SUFDRSxXQUFXO0lBQ1gscUJBQXFCO0lBQ3JCLDhCQUE4QjtFQUNoQzs7RUFFQTtJQUNFLG1CQUFtQjtFQUNyQjs7RUFFQTtJQUNFLFlBQVk7RUFDZDs7RUFFQTtJQUNFLGdCQUFnQjtJQUNoQixZQUFZO0lBQ1osV0FBVztJQUNYLHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIsa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2YsYUFBYTtJQUNiLG9CQUFvQjtJQUNwQixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLFNBQVM7SUFDVCxlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsV0FBVztJQUNYLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsV0FBVztJQUNYLFVBQVU7SUFDVixvQkFBb0I7SUFDcEIsT0FBTztJQUNQLFlBQVk7RUFDZDs7RUFFQTtJQUNFLFdBQVc7SUFDWCw0QkFBNEI7SUFDNUIsMkNBQTJDO0VBQzdDOztFQUVBO0lBQ0UsbUJBQW1CO0VBQ3JCOztFQUVBO0lBQ0UsWUFBWTtFQUNkOztFQUVBO0lBQ0UsZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWixZQUFZO0lBQ1oscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsc0JBQXNCO0lBQ3RCLGFBQWE7SUFDYixvQkFBb0I7SUFDcEIsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsU0FBUztJQUNULFdBQVc7SUFDWCxVQUFVO0lBQ1Ysb0JBQW9CO0lBQ3BCLE9BQU87SUFDUCxZQUFZO0VBQ2Q7O0VBRUE7SUFDRSxZQUFZO0lBQ1osOEJBQThCO0lBQzlCLHVDQUF1QztFQUN6Qzs7RUFFQTtJQUNFLDRCQUE0QjtFQUM5Qjs7RUFFQTtJQUNFLFlBQVk7RUFDZDs7RUFFQTtJQUNFLHdCQUF3QjtFQUMxQjs7RUFFQTtJQUNFLGNBQWM7SUFDZCx5QkFBeUI7SUFDekIscUJBQXFCO0lBQ3JCLGVBQWU7SUFDZixhQUFhO0lBQ2Isa0JBQWtCO0VBQ3BCOztFQUVBO0lBQ0UsY0FBYztJQUNkLHlCQUF5QjtJQUN6QixxQkFBcUI7SUFDckIsZUFBZTtJQUNmLGFBQWE7SUFDYixrQkFBa0I7RUFDcEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIH1cXG4gIFxcbiAgYm9keSB7XFxuICAgIGZvbnQtZmFtaWx5OiAnTGF0bycsIHNhbnMtc2VyaWY7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuICBcXG4gIGJ1dHRvbixcXG4gIGlucHV0IHtcXG4gICAgcGFkZGluZzogNXB4O1xcbiAgICBvdXRsaW5lOiBub25lO1xcbiAgfVxcbiAgXFxuICAudy05MCB7XFxuICAgIHdpZHRoOiA5MCU7XFxuICB9XFxuICBcXG4gIC50ZXh0LXVwcGVyY2FzZSB7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICB9XFxuICBcXG4gIGltZyB7XFxuICAgIHdpZHRoOiAxNXZ3O1xcbiAgICBoZWlnaHQ6IDh2aDtcXG4gIH1cXG4gIFxcbiAgLmJ0bi1zdWNjZXNzIHtcXG4gICAgbWluLXdpZHRoOiAxMDBweDtcXG4gICAgaGVpZ2h0OiA0MHB4O1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gICAgZm9udC13ZWlnaHQ6IDgwMDtcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICBsaW5lLWhlaWdodDogMTVweDtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgdHJhbnNpdGlvbjogMC4ycyBhbGw7XFxuICAgIGJhY2tncm91bmQ6ICMwMDg1NTI7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICB9XFxuICBcXG4gIC5idG4tc3VjY2Vzczo6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYm90dG9tOiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAwJTtcXG4gICAgdHJhbnNpdGlvbjogMC4ycyBhbGw7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHotaW5kZXg6IC0xMDtcXG4gIH1cXG4gIFxcbiAgLmJ0bi1zdWNjZXNzOmhvdmVyIHtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGJvcmRlci1jb2xvcjogIzM2YjM3ZjtcXG4gICAgYmFja2dyb3VuZDogI2M1ZTlkYSAhaW1wb3J0YW50O1xcbiAgfVxcbiAgXFxuICAuYnRuLXN1Y2Nlc3M6YWN0aXZlIHtcXG4gICAgYmFja2dyb3VuZDogI2ViZjBlZTtcXG4gIH1cXG4gIFxcbiAgLmJ0bi1zdWNjZXNzOmhvdmVyOjpiZWZvcmUge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICB9XFxuICBcXG4gIC5idG4tZGFuZ2VyIHtcXG4gICAgbWluLXdpZHRoOiAxMDBweDtcXG4gICAgaGVpZ2h0OiA0MHB4O1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gICAgZm9udC13ZWlnaHQ6IDgwMDtcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICB0cmFuc2l0aW9uOiAwLjJzIGFsbDtcXG4gICAgYmFja2dyb3VuZDogI2VmNTIzYztcXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gIH1cXG4gIFxcbiAgLmJ0bi1kYW5nZXI6OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJvdHRvbTogMDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMCU7XFxuICAgIHRyYW5zaXRpb246IDAuMnMgYWxsO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB6LWluZGV4OiAtMTA7XFxuICB9XFxuICBcXG4gIC5idG4tZGFuZ2VyOmhvdmVyIHtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGJvcmRlci1jb2xvcjogcmdiKDIzOSA4MiA2MCk7XFxuICAgIGJhY2tncm91bmQ6IHJnYigyMzkgODIgNjAgLyA1NCUpICFpbXBvcnRhbnQ7XFxuICB9XFxuICBcXG4gIC5idG4tZGFuZ2VyOmFjdGl2ZSB7XFxuICAgIGJhY2tncm91bmQ6ICNlMTI3MGQ7XFxuICB9XFxuICBcXG4gIC5idG4tZGFuZ2VyOmhvdmVyOjpiZWZvcmUge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICB9XFxuICBcXG4gIC5idG4tZGVmYXVsdCB7XFxuICAgIG1pbi13aWR0aDogMTAwcHg7XFxuICAgIGhlaWdodDogNDBweDtcXG4gICAgY29sb3I6IGJsYWNrO1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgICBmb250LXdlaWdodDogODAwO1xcbiAgICBmb250LXNpemU6IDE1cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAxNXB4O1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICB0cmFuc2l0aW9uOiAwLjJzIGFsbDtcXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2QzZDNkMztcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgfVxcbiAgXFxuICAuYnRuLWRlZmF1bHQ6OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJvdHRvbTogMDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMCU7XFxuICAgIHRyYW5zaXRpb246IDAuMnMgYWxsO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB6LWluZGV4OiAtMTA7XFxuICB9XFxuICBcXG4gIC5idG4tZGVmYXVsdDpob3ZlciB7XFxuICAgIGNvbG9yOiBibGFjaztcXG4gICAgYm9yZGVyLWNvbG9yOiByZ2IoMTgxIDE4MSAxODEpO1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMjUzIDI1MyAyNTMpICFpbXBvcnRhbnQ7XFxuICB9XFxuICBcXG4gIC5idG4tZGVmYXVsdDphY3RpdmUge1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMTU1IDE1NSAxNTUpO1xcbiAgfVxcbiAgXFxuICAuYnRuLWRlZmF1bHQ6aG92ZXI6OmJlZm9yZSB7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gIH1cXG4gIFxcbiAgLmhpZGRlbiB7XFxuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG4gIH1cXG4gIFxcbiAgLmFsZXJ0LWVycm9yIHtcXG4gICAgY29sb3I6ICM3MjFjMjQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmOGQ3ZGE7XFxuICAgIGJvcmRlci1jb2xvcjogI2Y1YzZjYjtcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICB9XFxuICBcXG4gIC5hbGVydC1zdWNjZXNzIHtcXG4gICAgY29sb3I6ICMxNTU3MjQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkNGVkZGE7XFxuICAgIGJvcmRlci1jb2xvcjogI2MzZTZjYjtcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICB9XFxuICBcIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BVF9SVUxFX0lNUE9SVF8wX19fIGZyb20gXCItIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vY3NzL2NvbW1vbi5jc3NcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUxhdG8mZGlzcGxheT1zd2FwKTtcIl0pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18uaShfX19DU1NfTE9BREVSX0FUX1JVTEVfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwibWFpbiB7XFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcbiAgbWluLWhlaWdodDogMzUwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuZm9ybSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMzUwcHg7XFxuICBoZWlnaHQ6IGF1dG87XFxuICBib3JkZXI6IDAuNXB4IHNvbGlkICNjY2M7XFxufVxcblxcbi50aXRsZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGJvcmRlci1ib3R0b206IDAuNXB4IHNvbGlkICNjY2M7XFxuICBoZWlnaHQ6IDQ1cHg7XFxufVxcblxcbi50aXRsZSBhIHtcXG4gIHdpZHRoOiAzMnB4O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xcbiAgY29sb3I6IGdyYXk7XFxufVxcblxcbmZvcm0gaDEge1xcbiAgZm9udC1zaXplOiAxMzUlO1xcbiAgcGFkZGluZzogMCAxMHB4O1xcbn1cXG5cXG4uZGF0YV9pbnB1dF93cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBib3JkZXItYm90dG9tOiAwLjVweCBzb2xpZCAjY2NjO1xcbn1cXG5cXG4jZW50ZXIge1xcbiAgaGVpZ2h0OiAyNXB4O1xcbiAgd2lkdGg6IDI1cHg7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XFxuICBjb2xvcjogZ3JheTtcXG59XFxuXFxuLmRhdGFfaW5wdXQge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXI6IG5vbmU7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBwYWRkaW5nOiAwIDEwcHg7XFxufVxcblxcbi5kYXRhX2lucHV0OmZvY3VzIHtcXG4gIG91dGxpbmU6IG5vbmU7XFxufVxcblxcbmZvcm0gPiAqIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA0NXB4O1xcbn1cXG5cXG4udG9kb19saXN0IHtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuLnRvZG9fbGlzdCBsaSB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGhlaWdodDogNDVweDtcXG4gIGJvcmRlci1ib3R0b206IDAuNXB4IHNvbGlkICNjY2M7XFxufVxcblxcbi50b2RvX2xpc3QgLmNoZWNrYm94IHtcXG4gIG1hcmdpbjogYXV0bztcXG59XFxuXFxuLnRvZG9fbGlzdCBsaSAudG9kb19pbnB1dCB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogNzUlO1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG4udG9kb19saXN0IGxpIC5kZWxldGUge1xcbiAgd2lkdGg6IDI4cHg7XFxuICBoZWlnaHQ6IDI4cHg7XFxuICBtYXJnaW46IGF1dG87XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBjb2xvcjogZ3JheTtcXG59XFxuXFxuLmNsZWFyX2NvbXBsZXRlZCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogNDVweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGY4Zjg7XFxuICBjb2xvcjogIzc3NzY3NjtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmNsZWFyX2NvbXBsZXRlZDpob3ZlciB7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuXFxuLyogTGludGVyICovXFxuLmNoZWNrYm94OmNoZWNrZWQgKyAudG9kb19pbnB1dCB7XFxuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcXG59XFxuXFxuLnRvZG9fbGlzdCBsaSAudG9kb19pbnB1dDpmb2N1cyB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUdBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLFlBQVk7RUFDWix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDhCQUE4QjtFQUM5QiwrQkFBK0I7RUFDL0IsWUFBWTtBQUNkOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsV0FBVztBQUNiOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsV0FBVztBQUNiOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixZQUFZO0VBQ1osK0JBQStCO0FBQ2pDOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFVBQVU7RUFDVixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLFlBQVk7RUFDWixlQUFlO0VBQ2YsWUFBWTtFQUNaLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLGNBQWM7RUFDZCxZQUFZO0VBQ1osZUFBZTtBQUNqQjs7QUFFQTtFQUNFLDBCQUEwQjtBQUM1Qjs7QUFFQSxXQUFXO0FBQ1g7RUFDRSw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtBQUNmXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKFxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUxhdG8mZGlzcGxheT1zd2FwXFxcIik7XFxuQGltcG9ydCBcXFwiY3NzL2NvbW1vbi5jc3NcXFwiO1xcblxcbm1haW4ge1xcbiAgbWFyZ2luLXRvcDogMzBweDtcXG4gIG1pbi1oZWlnaHQ6IDM1MHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmZvcm0ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgd2lkdGg6IDM1MHB4O1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgYm9yZGVyOiAwLjVweCBzb2xpZCAjY2NjO1xcbn1cXG5cXG4udGl0bGUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBib3JkZXItYm90dG9tOiAwLjVweCBzb2xpZCAjY2NjO1xcbiAgaGVpZ2h0OiA0NXB4O1xcbn1cXG5cXG4udGl0bGUgYSB7XFxuICB3aWR0aDogMzJweDtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIG1hcmdpbi1yaWdodDogMTVweDtcXG4gIGNvbG9yOiBncmF5O1xcbn1cXG5cXG5mb3JtIGgxIHtcXG4gIGZvbnQtc2l6ZTogMTM1JTtcXG4gIHBhZGRpbmc6IDAgMTBweDtcXG59XFxuXFxuLmRhdGFfaW5wdXRfd3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYm9yZGVyLWJvdHRvbTogMC41cHggc29saWQgI2NjYztcXG59XFxuXFxuI2VudGVyIHtcXG4gIGhlaWdodDogMjVweDtcXG4gIHdpZHRoOiAyNXB4O1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbiAgcGFkZGluZzogNXB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xcbiAgY29sb3I6IGdyYXk7XFxufVxcblxcbi5kYXRhX2lucHV0IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgcGFkZGluZzogMCAxMHB4O1xcbn1cXG5cXG4uZGF0YV9pbnB1dDpmb2N1cyB7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG5mb3JtID4gKiB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogNDVweDtcXG59XFxuXFxuLnRvZG9fbGlzdCB7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbi50b2RvX2xpc3QgbGkge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBoZWlnaHQ6IDQ1cHg7XFxuICBib3JkZXItYm90dG9tOiAwLjVweCBzb2xpZCAjY2NjO1xcbn1cXG5cXG4udG9kb19saXN0IC5jaGVja2JveCB7XFxuICBtYXJnaW46IGF1dG87XFxufVxcblxcbi50b2RvX2xpc3QgbGkgLnRvZG9faW5wdXQge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDc1JTtcXG4gIGJvcmRlcjogbm9uZTtcXG59XFxuXFxuLnRvZG9fbGlzdCBsaSAuZGVsZXRlIHtcXG4gIHdpZHRoOiAyOHB4O1xcbiAgaGVpZ2h0OiAyOHB4O1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgcGFkZGluZzogNXB4O1xcbiAgY29sb3I6IGdyYXk7XFxufVxcblxcbi5jbGVhcl9jb21wbGV0ZWQge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDQ1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOGY4O1xcbiAgY29sb3I6ICM3Nzc2NzY7XFxuICBib3JkZXI6IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5jbGVhcl9jb21wbGV0ZWQ6aG92ZXIge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxufVxcblxcbi8qIExpbnRlciAqL1xcbi5jaGVja2JveDpjaGVja2VkICsgLnRvZG9faW5wdXQge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XFxufVxcblxcbi50b2RvX2xpc3QgbGkgLnRvZG9faW5wdXQ6Zm9jdXMge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLyoqXG4gKiBUYWtlcyBhbnkgaW5wdXQgYW5kIGd1YXJhbnRlZXMgYW4gYXJyYXkgYmFjay5cbiAqXG4gKiAtIENvbnZlcnRzIGFycmF5LWxpa2Ugb2JqZWN0cyAoZS5nLiBgYXJndW1lbnRzYCwgYFNldGApIHRvIGEgcmVhbCBhcnJheS5cbiAqIC0gQ29udmVydHMgYHVuZGVmaW5lZGAgdG8gYW4gZW1wdHkgYXJyYXkuXG4gKiAtIENvbnZlcnRzIGFueSBhbm90aGVyIG90aGVyLCBzaW5ndWxhciB2YWx1ZSAoaW5jbHVkaW5nIGBudWxsYCwgb2JqZWN0cyBhbmQgaXRlcmFibGVzIG90aGVyIHRoYW4gYFNldGApIGludG8gYW4gYXJyYXkgY29udGFpbmluZyB0aGF0IHZhbHVlLlxuICogLSBJZ25vcmVzIGlucHV0IHdoaWNoIGlzIGFscmVhZHkgYW4gYXJyYXkuXG4gKlxuICogQG1vZHVsZSBhcnJheS1iYWNrXG4gKiBAZXhhbXBsZVxuICogPiBjb25zdCBhcnJheWlmeSA9IHJlcXVpcmUoJ2FycmF5LWJhY2snKVxuICpcbiAqID4gYXJyYXlpZnkodW5kZWZpbmVkKVxuICogW11cbiAqXG4gKiA+IGFycmF5aWZ5KG51bGwpXG4gKiBbIG51bGwgXVxuICpcbiAqID4gYXJyYXlpZnkoMClcbiAqIFsgMCBdXG4gKlxuICogPiBhcnJheWlmeShbIDEsIDIgXSlcbiAqIFsgMSwgMiBdXG4gKlxuICogPiBhcnJheWlmeShuZXcgU2V0KFsgMSwgMiBdKSlcbiAqIFsgMSwgMiBdXG4gKlxuICogPiBmdW5jdGlvbiBmKCl7IHJldHVybiBhcnJheWlmeShhcmd1bWVudHMpOyB9XG4gKiA+IGYoMSwyLDMpXG4gKiBbIDEsIDIsIDMgXVxuICovXG5cbmZ1bmN0aW9uIGlzT2JqZWN0JDEgKGlucHV0KSB7XG4gIHJldHVybiB0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnICYmIGlucHV0ICE9PSBudWxsXG59XG5cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlJDEgKGlucHV0KSB7XG4gIHJldHVybiBpc09iamVjdCQxKGlucHV0KSAmJiB0eXBlb2YgaW5wdXQubGVuZ3RoID09PSAnbnVtYmVyJ1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Kn0gLSBUaGUgaW5wdXQgdmFsdWUgdG8gY29udmVydCB0byBhbiBhcnJheVxuICogQHJldHVybnMge0FycmF5fVxuICogQGFsaWFzIG1vZHVsZTphcnJheS1iYWNrXG4gKi9cbmZ1bmN0aW9uIGFycmF5aWZ5IChpbnB1dCkge1xuICBpZiAoQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcbiAgICByZXR1cm4gaW5wdXRcbiAgfSBlbHNlIGlmIChpbnB1dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIFtdXG4gIH0gZWxzZSBpZiAoaXNBcnJheUxpa2UkMShpbnB1dCkgfHwgaW5wdXQgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShpbnB1dClcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW2lucHV0XVxuICB9XG59XG5cbi8qKlxuICogSXNvbW9ycGhpYywgZnVuY3Rpb25hbCB0eXBlLWNoZWNraW5nIGZvciBKYXZhc2NyaXB0LlxuICogQG1vZHVsZSB0eXBpY2FsXG4gKiBAdHlwaWNhbG5hbWUgdFxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHQgPSByZXF1aXJlKCd0eXBpY2FsJylcbiAqIGNvbnN0IGFsbERlZmluZWQgPSBhcnJheS5ldmVyeSh0LmlzRGVmaW5lZClcbiAqL1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBpbnB1dCBpcyBhIG51bWJlci4gSXQgaXMgYSBtb3JlIHJlYXNvbmFibGUgYWx0ZXJuYXRpdmUgdG8gYHR5cGVvZiBuYCB3aGljaCByZXR1cm5zIGBudW1iZXJgIGZvciBgTmFOYCBhbmQgYEluZmluaXR5YC5cbiAqXG4gKiBAcGFyYW0geyp9IC0gdGhlIGlucHV0IHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHN0YXRpY1xuICogQGV4YW1wbGVcbiAqID4gdC5pc051bWJlcigwKVxuICogdHJ1ZVxuICogPiB0LmlzTnVtYmVyKDEpXG4gKiB0cnVlXG4gKiA+IHQuaXNOdW1iZXIoMS4xKVxuICogdHJ1ZVxuICogPiB0LmlzTnVtYmVyKDB4ZmYpXG4gKiB0cnVlXG4gKiA+IHQuaXNOdW1iZXIoMDY0NClcbiAqIHRydWVcbiAqID4gdC5pc051bWJlcig2LjJlNSlcbiAqIHRydWVcbiAqID4gdC5pc051bWJlcihOYU4pXG4gKiBmYWxzZVxuICogPiB0LmlzTnVtYmVyKEluZmluaXR5KVxuICogZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIgKG4pIHtcbiAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KG4pKSAmJiBpc0Zpbml0ZShuKVxufVxuXG4vKipcbiAqIEEgcGxhaW4gb2JqZWN0IGlzIGEgc2ltcGxlIG9iamVjdCBsaXRlcmFsLCBpdCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgYSBjbGFzcy4gUmV0dXJucyB0cnVlIGlmIHRoZSBpbnB1dCBgdHlwZW9mYCBpcyBgb2JqZWN0YCBhbmQgZGlyZWN0bHkgZGVjZW5kcyBmcm9tIGBPYmplY3RgLlxuICpcbiAqIEBwYXJhbSB7Kn0gLSB0aGUgaW5wdXQgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAc3RhdGljXG4gKiBAZXhhbXBsZVxuICogPiB0LmlzUGxhaW5PYmplY3QoeyBzb21ldGhpbmc6ICdvbmUnIH0pXG4gKiB0cnVlXG4gKiA+IHQuaXNQbGFpbk9iamVjdChuZXcgRGF0ZSgpKVxuICogZmFsc2VcbiAqID4gdC5pc1BsYWluT2JqZWN0KFsgMCwgMSBdKVxuICogZmFsc2VcbiAqID4gdC5pc1BsYWluT2JqZWN0KC90ZXN0LylcbiAqIGZhbHNlXG4gKiA+IHQuaXNQbGFpbk9iamVjdCgxKVxuICogZmFsc2VcbiAqID4gdC5pc1BsYWluT2JqZWN0KCdvbmUnKVxuICogZmFsc2VcbiAqID4gdC5pc1BsYWluT2JqZWN0KG51bGwpXG4gKiBmYWxzZVxuICogPiB0LmlzUGxhaW5PYmplY3QoKGZ1bmN0aW9uICogKCkge30pKCkpXG4gKiBmYWxzZVxuICogPiB0LmlzUGxhaW5PYmplY3QoZnVuY3Rpb24gKiAoKSB7fSlcbiAqIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QgKGlucHV0KSB7XG4gIHJldHVybiBpbnB1dCAhPT0gbnVsbCAmJiB0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnICYmIGlucHV0LmNvbnN0cnVjdG9yID09PSBPYmplY3Rcbn1cblxuLyoqXG4gKiBBbiBhcnJheS1saWtlIHZhbHVlIGhhcyBhbGwgdGhlIHByb3BlcnRpZXMgb2YgYW4gYXJyYXkgeWV0IGlzIG5vdCBhbiBhcnJheSBpbnN0YW5jZS4gQW4gZXhhbXBsZSBpcyB0aGUgYGFyZ3VtZW50c2Agb2JqZWN0LiBSZXR1cm5zIGB0cnVlYGAgaWYgdGhlIGlucHV0IHZhbHVlIGlzIGFuIG9iamVjdCwgbm90IGBudWxsYGAgYW5kIGhhcyBhIGBsZW5ndGhgIHByb3BlcnR5IHNldCB3aXRoIGEgbnVtZXJpYyB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0geyp9IC0gdGhlIGlucHV0IHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHN0YXRpY1xuICogQGV4YW1wbGVcbiAqIGZ1bmN0aW9uIHN1bSh4LCB5KXtcbiAqICAgY29uc29sZS5sb2codC5pc0FycmF5TGlrZShhcmd1bWVudHMpKVxuICogICAvLyBwcmludHMgYHRydWVgXG4gKiB9XG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlIChpbnB1dCkge1xuICByZXR1cm4gaXNPYmplY3QoaW5wdXQpICYmIHR5cGVvZiBpbnB1dC5sZW5ndGggPT09ICdudW1iZXInXG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB0eXBlb2YgaW5wdXQgaXMgYCdvYmplY3QnYCBidXQgbm90IG51bGwuXG4gKiBAcGFyYW0geyp9IC0gdGhlIGlucHV0IHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHN0YXRpY1xuICovXG5mdW5jdGlvbiBpc09iamVjdCAoaW5wdXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcgJiYgaW5wdXQgIT09IG51bGxcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGlucHV0IHZhbHVlIGlzIGRlZmluZWQuXG4gKiBAcGFyYW0geyp9IC0gdGhlIGlucHV0IHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHN0YXRpY1xuICovXG5mdW5jdGlvbiBpc0RlZmluZWQgKGlucHV0KSB7XG4gIHJldHVybiB0eXBlb2YgaW5wdXQgIT09ICd1bmRlZmluZWQnXG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbnB1dCB2YWx1ZSBpcyB1bmRlZmluZWQuXG4gKiBAcGFyYW0geyp9IC0gdGhlIGlucHV0IHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHN0YXRpY1xuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCAoaW5wdXQpIHtcbiAgcmV0dXJuICFpc0RlZmluZWQoaW5wdXQpXG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbnB1dCB2YWx1ZSBpcyBudWxsLlxuICogQHBhcmFtIHsqfSAtIHRoZSBpbnB1dCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBzdGF0aWNcbiAqL1xuZnVuY3Rpb24gaXNOdWxsIChpbnB1dCkge1xuIHJldHVybiBpbnB1dCA9PT0gbnVsbFxufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgaW5wdXQgdmFsdWUgaXMgbm90IG9uZSBvZiBgdW5kZWZpbmVkYCwgYG51bGxgLCBvciBgTmFOYC5cbiAqIEBwYXJhbSB7Kn0gLSB0aGUgaW5wdXQgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAc3RhdGljXG4gKi9cbmZ1bmN0aW9uIGlzRGVmaW5lZFZhbHVlIChpbnB1dCkge1xuIHJldHVybiBpc0RlZmluZWQoaW5wdXQpICYmICFpc051bGwoaW5wdXQpICYmICFOdW1iZXIuaXNOYU4oaW5wdXQpXG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbnB1dCB2YWx1ZSBpcyBhbiBFUzIwMTUgYGNsYXNzYC5cbiAqIEBwYXJhbSB7Kn0gLSB0aGUgaW5wdXQgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAc3RhdGljXG4gKi9cbmZ1bmN0aW9uIGlzQ2xhc3MgKGlucHV0KSB7XG4gIGlmICh0eXBlb2YgaW5wdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gL15jbGFzcyAvLnRlc3QoRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbnB1dCBpcyBhIHN0cmluZywgbnVtYmVyLCBzeW1ib2wsIGJvb2xlYW4sIG51bGwgb3IgdW5kZWZpbmVkIHZhbHVlLlxuICogQHBhcmFtIHsqfSAtIHRoZSBpbnB1dCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBzdGF0aWNcbiAqL1xuZnVuY3Rpb24gaXNQcmltaXRpdmUgKGlucHV0KSB7XG4gIGlmIChpbnB1dCA9PT0gbnVsbCkgcmV0dXJuIHRydWVcbiAgc3dpdGNoICh0eXBlb2YgaW5wdXQpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgY2FzZSAnc3ltYm9sJzpcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGlucHV0IGlzIGEgUHJvbWlzZS5cbiAqIEBwYXJhbSB7Kn0gLSB0aGUgaW5wdXQgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAc3RhdGljXG4gKi9cbmZ1bmN0aW9uIGlzUHJvbWlzZSAoaW5wdXQpIHtcbiAgaWYgKGlucHV0KSB7XG4gICAgY29uc3QgaXNQcm9taXNlID0gaXNEZWZpbmVkKFByb21pc2UpICYmIGlucHV0IGluc3RhbmNlb2YgUHJvbWlzZTtcbiAgICBjb25zdCBpc1RoZW5hYmxlID0gaW5wdXQudGhlbiAmJiB0eXBlb2YgaW5wdXQudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbiAgICByZXR1cm4gISEoaXNQcm9taXNlIHx8IGlzVGhlbmFibGUpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGlucHV0IGlzIGFuIGl0ZXJhYmxlIChgTWFwYCwgYFNldGAsIGBBcnJheWAsIEdlbmVyYXRvciBldGMuKS5cbiAqIEBwYXJhbSB7Kn0gLSB0aGUgaW5wdXQgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAc3RhdGljXG4gKiBAZXhhbXBsZVxuICogPiB0LmlzSXRlcmFibGUoJ3N0cmluZycpXG4gKiB0cnVlXG4gKiA+IHQuaXNJdGVyYWJsZShuZXcgTWFwKCkpXG4gKiB0cnVlXG4gKiA+IHQuaXNJdGVyYWJsZShbXSlcbiAqIHRydWVcbiAqID4gdC5pc0l0ZXJhYmxlKChmdW5jdGlvbiAqICgpIHt9KSgpKVxuICogdHJ1ZVxuICogPiB0LmlzSXRlcmFibGUoUHJvbWlzZS5yZXNvbHZlKCkpXG4gKiBmYWxzZVxuICogPiB0LmlzSXRlcmFibGUoUHJvbWlzZSlcbiAqIGZhbHNlXG4gKiA+IHQuaXNJdGVyYWJsZSh0cnVlKVxuICogZmFsc2VcbiAqID4gdC5pc0l0ZXJhYmxlKHt9KVxuICogZmFsc2VcbiAqID4gdC5pc0l0ZXJhYmxlKDApXG4gKiBmYWxzZVxuICogPiB0LmlzSXRlcmFibGUoMS4xKVxuICogZmFsc2VcbiAqID4gdC5pc0l0ZXJhYmxlKE5hTilcbiAqIGZhbHNlXG4gKiA+IHQuaXNJdGVyYWJsZShJbmZpbml0eSlcbiAqIGZhbHNlXG4gKiA+IHQuaXNJdGVyYWJsZShmdW5jdGlvbiAoKSB7fSlcbiAqIGZhbHNlXG4gKiA+IHQuaXNJdGVyYWJsZShEYXRlKVxuICogZmFsc2VcbiAqID4gdC5pc0l0ZXJhYmxlKClcbiAqIGZhbHNlXG4gKiA+IHQuaXNJdGVyYWJsZSh7IHRoZW46IGZ1bmN0aW9uICgpIHt9IH0pXG4gKiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0l0ZXJhYmxlIChpbnB1dCkge1xuICBpZiAoaW5wdXQgPT09IG51bGwgfHwgIWlzRGVmaW5lZChpbnB1dCkpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKFxuICAgICAgdHlwZW9mIGlucHV0W1N5bWJvbC5pdGVyYXRvcl0gPT09ICdmdW5jdGlvbicgfHxcbiAgICAgIHR5cGVvZiBpbnB1dFtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPT09ICdmdW5jdGlvbidcbiAgICApXG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGlucHV0IHZhbHVlIGlzIGEgc3RyaW5nLiBUaGUgZXF1aXZhbGVudCBvZiBgdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJ2AgZm9yIHVzZSBpbiBmdW5jaXRvbmFsIGNvbnRleHRzLlxuICogQHBhcmFtIHsqfSAtIHRoZSBpbnB1dCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBzdGF0aWNcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcgKGlucHV0KSB7XG4gIHJldHVybiB0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnXG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbnB1dCB2YWx1ZSBpcyBhIGZ1bmN0aW9uLiBUaGUgZXF1aXZhbGVudCBvZiBgdHlwZW9mIGlucHV0ID09PSAnZnVuY3Rpb24nYCBmb3IgdXNlIGluIGZ1bmNpdG9uYWwgY29udGV4dHMuXG4gKiBAcGFyYW0geyp9IC0gdGhlIGlucHV0IHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHN0YXRpY1xuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uIChpbnB1dCkge1xuICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnZnVuY3Rpb24nXG59XG5cbnZhciB0ID0ge1xuICBpc051bWJlcixcbiAgaXNQbGFpbk9iamVjdCxcbiAgaXNBcnJheUxpa2UsXG4gIGlzT2JqZWN0LFxuICBpc0RlZmluZWQsXG4gIGlzVW5kZWZpbmVkLFxuICBpc051bGwsXG4gIGlzRGVmaW5lZFZhbHVlLFxuICBpc0NsYXNzLFxuICBpc1ByaW1pdGl2ZSxcbiAgaXNQcm9taXNlLFxuICBpc0l0ZXJhYmxlLFxuICBpc1N0cmluZyxcbiAgaXNGdW5jdGlvblxufTtcblxuLyoqXG4gKiBJc29tb3JwaGljLCBsb2FkLWFueXdoZXJlIGZ1bmN0aW9uIHRvIHNvcnQgYW4gYXJyYXkgYnkgc2NhbGFyLCBkZWVwIG9yIGNvbXB1dGVkIHZhbHVlcyBpbiBhbnkgc3RhbmRhcmQgb3IgY3VzdG9tIG9yZGVyLlxuICpcbiAqIEBtb2R1bGUgc29ydC1hcnJheVxuICogQHR5cGljYWxuYW1lIHNvcnRBcnJheVxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHNvcnRBcnJheSA9IHJlcXVpcmUoJ3NvcnQtYXJyYXknKVxuICovXG5cbi8qKlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgLSBUaGUgaW5wdXQgYXJyYXkgdG8gc29ydC4gSXQgaXMgc29ydGVkIGluIHBsYWNlLlxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSAtIFNvcnQgb3B0aW9ucy5cbiAqIEBwYXJhbSB7c3RyaW5nW119IFtvcHRpb25zLmJ5XSAtIE9uZSBvciBtb3JlIHByb3BlcnR5IG5hbWVzIG9yIGNvbXB1dGVkIGZpZWxkcyB0byBzb3J0IGJ5LiBTcGVjaWZ5aW5nIHByb3BlcnR5IG5hbWVzIGlzIG9ubHkgcmVsZXZhbnQgd2hlbiBzb3J0aW5nIGFuIGFycmF5IG9mIG9iamVjdHMuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBbb3B0aW9ucy5vcmRlcl0gLSBPbmUgb3IgbW9yZSBzb3J0IG9yZGVycy4gU3BlY2lmeSBgJ2FzYydgLCBgJ2Rlc2MnYCBvciBhIHByb3BlcnR5IG5hbWUgZnJvbSB0aGUgYG9wdGlvbnMuY3VzdG9tT3JkZXJzYCBvYmplY3QuXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMuY3VzdG9tT3JkZXJzXSAtIEEgZGljdGlvbmFyeSBvYmplY3QgY29udGFpbmluZyBvbmUgb3IgbW9yZSBjdXN0b20gb3JkZXJzLiBFYWNoIGN1c3RvbSBvcmRlciB2YWx1ZSBtdXN0IGJlIGFuIGFycmF5IGRlZmluaW5nIHRoZSBvcmRlciBleHBlY3RlZCB2YWx1ZXMgbXVzdCBiZSBzb3J0ZWQgaW4uXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMuY29tcHV0ZWRdIC0gQSBkaWN0aW9uYXJ5IG9iamVjdCBjb250YWluaW5nIG9uZSBvciBtb3JlIGNvbXB1dGVkIGZpZWxkIGZ1bmN0aW9ucy4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgaW52b2tlZCBvbmNlIHBlciBpdGVtIGluIHRoZSBhcnJheS4gRWFjaCBpbnZvY2F0aW9uIHdpbGwgcmVjZWl2ZSB0aGUgYXJyYXkgaXRlbSBhcyBpbnB1dCBhbmQgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUgYnkgd2hpY2ggdGhlIGFycmF5IGNhbiBiZSBzb3J0ZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubnVsbFJhbmtdIC0gQ29uZmlndXJlcyB3aGV0aGVyIGBudWxsYCB2YWx1ZXMgd2lsbCBiZSBzb3J0ZWQgYmVmb3JlIG9yIGFmdGVyIGRlZmluZWQgdmFsdWVzLiBTZXQgdG8gYC0xYCBmb3IgYmVmb3JlLCBgMWAgZm9yIGFmdGVyLiBEZWZhdWx0cyB0byBgMWAuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMudW5kZWZpbmVkUmFua10gLSBDb25maWd1cmVzIHdoZXRoZXIgYHVuZGVmaW5lZGAgdmFsdWVzIHdpbGwgYmUgc29ydGVkIGJlZm9yZSBvciBhZnRlciBkZWZpbmVkIHZhbHVlcy4gU2V0IHRvIGAtMWAgZm9yIGJlZm9yZSwgYDFgIGZvciBhZnRlci4gRGVmYXVsdHMgdG8gYDFgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSB0aGF0IHdhcyBwYXNzZWQgaW4uXG4gKiBAYWxpYXMgbW9kdWxlOnNvcnQtYXJyYXlcbiAqL1xuZnVuY3Rpb24gc29ydEFycmF5IChhcnIsIG9wdGlvbnMgPSB7fSkge1xuICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihcbiAgICB7XG4gICAgICBjb21wdXRlZDoge30sXG4gICAgICBjdXN0b21PcmRlcnM6IHt9LFxuICAgICAgbnVsbFJhbms6IDEsXG4gICAgICB1bmRlZmluZWRSYW5rOiAxXG4gICAgfSxcbiAgICBvcHRpb25zXG4gICk7XG4gIGFyci5zb3J0KGdldENvbXBhcmVGdW5jKG9wdGlvbnMpKTtcbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiBnZXRDb21wYXJlRnVuYyAob3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IGJ5ID0gYXJyYXlpZnkob3B0aW9ucy5ieSk7XG4gIGNvbnN0IG9yZGVyID0gYXJyYXlpZnkob3B0aW9ucy5vcmRlcik7XG4gIGNvbnN0IHsgY3VzdG9tT3JkZXJzLCBjb21wdXRlZCB9ID0gb3B0aW9ucztcbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbXBhcmVGdW5jICh4SW4sIHlJbiwgYnlJbmRleCA9IDApIHtcbiAgICBjb25zdCBjdXJyT3JkZXIgPSBvcmRlcltieUluZGV4XSB8fCAnYXNjJztcbiAgICBpZiAoIShjdXJyT3JkZXIgPT09ICdhc2MnIHx8IGN1cnJPcmRlciA9PT0gJ2Rlc2MnIHx8IGN1c3RvbU9yZGVyc1tjdXJyT3JkZXJdKSkge1xuICAgICAgcmV0dXJuIDBcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0LCB4LCB5O1xuICAgIGlmIChieS5sZW5ndGgpIHtcbiAgICAgIHggPSB0LmlzRGVmaW5lZCh4SW5bYnlbYnlJbmRleF1dKVxuICAgICAgICA/IHhJbltieVtieUluZGV4XV1cbiAgICAgICAgOiBjb21wdXRlZFtieVtieUluZGV4XV0gJiYgY29tcHV0ZWRbYnlbYnlJbmRleF1dKHhJbik7XG4gICAgICB5ID0gdC5pc0RlZmluZWQoeUluW2J5W2J5SW5kZXhdXSlcbiAgICAgICAgPyB5SW5bYnlbYnlJbmRleF1dXG4gICAgICAgIDogY29tcHV0ZWRbYnlbYnlJbmRleF1dICYmIGNvbXB1dGVkW2J5W2J5SW5kZXhdXSh5SW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB4ID0geEluO1xuICAgICAgeSA9IHlJbjtcbiAgICB9XG5cbiAgICBpZiAoY3VzdG9tT3JkZXJzICYmIGN1c3RvbU9yZGVyc1tjdXJyT3JkZXJdKSB7XG4gICAgICByZXN1bHQgPSBjdXN0b21PcmRlcnNbY3Vyck9yZGVyXS5pbmRleE9mKHgpIC0gY3VzdG9tT3JkZXJzW2N1cnJPcmRlcl0uaW5kZXhPZih5KTtcbiAgICB9IGVsc2UgaWYgKHggPT09IHkpIHtcbiAgICAgIHJlc3VsdCA9IDA7XG4gICAgfSBlbHNlIGlmICh0LmlzTnVsbCh4KSAmJiB0LmlzVW5kZWZpbmVkKHkpKSB7XG4gICAgICByZXN1bHQgPSBjdXJyT3JkZXIgPT09ICdhc2MnXG4gICAgICAgID8gMVxuICAgICAgICA6IGN1cnJPcmRlciA9PT0gJ2Rlc2MnXG4gICAgICAgICAgPyAtMVxuICAgICAgICAgIDogMDtcbiAgICB9IGVsc2UgaWYgKHQuaXNVbmRlZmluZWQoeCkgJiYgdC5pc051bGwoeSkpIHtcbiAgICAgIHJlc3VsdCA9IGN1cnJPcmRlciA9PT0gJ2FzYydcbiAgICAgICAgPyAtMVxuICAgICAgICA6IGN1cnJPcmRlciA9PT0gJ2Rlc2MnXG4gICAgICAgICAgPyAxXG4gICAgICAgICAgOiAwO1xuICAgIH0gZWxzZSBpZiAodC5pc051bGwoeCkgJiYgdC5pc0RlZmluZWRWYWx1ZSh5KSkge1xuICAgICAgcmVzdWx0ID0gb3B0aW9ucy5udWxsUmFuaztcbiAgICB9IGVsc2UgaWYgKHQuaXNVbmRlZmluZWQoeCkgJiYgdC5pc0RlZmluZWRWYWx1ZSh5KSkge1xuICAgICAgcmVzdWx0ID0gb3B0aW9ucy51bmRlZmluZWRSYW5rO1xuICAgIH0gZWxzZSBpZiAodC5pc051bGwoeSkgJiYgdC5pc0RlZmluZWRWYWx1ZSh4KSkge1xuICAgICAgcmVzdWx0ID0gLW9wdGlvbnMubnVsbFJhbms7XG4gICAgfSBlbHNlIGlmICh0LmlzVW5kZWZpbmVkKHkpICYmIHQuaXNEZWZpbmVkVmFsdWUoeCkpIHtcbiAgICAgIHJlc3VsdCA9IC1vcHRpb25zLnVuZGVmaW5lZFJhbms7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHggPCB5ID8gLTEgOiB4ID4geSA/IDEgOiAwO1xuICAgICAgaWYgKGN1cnJPcmRlciA9PT0gJ2Rlc2MnKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCAqIC0xO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocmVzdWx0ID09PSAwICYmIHQuaXNEZWZpbmVkKGJ5W2J5SW5kZXggKyAxXSkpIHtcbiAgICAgIHJlc3VsdCA9IGNvbXBhcmVGdW5jKHhJbiwgeUluLCBieUluZGV4ICsgMSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzb3J0QXJyYXk7XG4iXSwibmFtZXMiOlsiVG9kbyIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0b2RvIiwic2hvdyIsImV2ZW50cyIsInNvcnRBcnJheSIsIk5vdGlmeSIsIlN0YXR1cyIsIkFwcHMiLCJfY3JlYXRlQ2xhc3MiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsIl9kZWZpbmVQcm9wZXJ0eSIsIiRpbnB1dCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJlIiwia2V5IiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJ2YWx1ZSIsInNhdmUiLCIkY2xlYXJBbGwiLCIkY2hlY2tlZCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiaW5wdXQiLCJwYXJlbnROb2RlIiwicmVtb3ZlIiwiaXRlbXMiLCJmaWx0ZXIiLCJpdGVtIiwiY29tcGxldGVkIiwiY291bnQiLCJpbmRleCIsInNhdmVTdG9yYWdlIiwiZGVsZXRlRXZlbnQiLCJjaGFuZ2VFdmVudCIsImNoYW5nZVN0YXR1cyIsImNvbnRyb2xsZXIiLCJBYm9ydENvbnRyb2xsZXIiLCIkdGFza3MiLCJidG4iLCJwYXJzZUludCIsImRhdGFzZXQiLCJpZCIsInNpZ25hbCIsImFib3J0IiwiJGlucHV0cyIsInN0eWxlIiwiYmFja2dyb3VuZCIsInVwZGF0ZSIsIiRjaGVja2JveCIsImNoZWNrZWQiLCJpbm5lckhUTUwiLCJnZXRJdGVtcyIsImJ5IiwiYWRkSXRlbSIsImxpc3QiLCJsaSIsImNyZWF0ZUVsZW1lbnQiLCJjb25jYXQiLCJkZXNjcmlwdGlvbiIsImFwcGVuZENoaWxkIiwiJGl0ZW1zIiwiSlNPTiIsInBhcnNlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIiRpdGVtIiwicHVzaCIsIiRkYXRhIiwibGVuZ3RoIiwic2F2ZUl0ZW1zIiwicmVtb3ZlRXZlbnQiLCIkZGVzYyIsIiRpZCIsImZpbmQiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiZGVmYXVsdCIsIk5vdGlmaWNhdGlvbiIsIiRtZXNzYWdlIiwiJGNsYXNzTmFtZSIsIm1zZyIsImNsYXNzTmFtZSIsImNyZWF0ZVRleHROb2RlIiwiY29udGFpbmVyRUxlbWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwicGFyZW50RGl2IiwiaW5zZXJ0QmVmb3JlIiwibGFzdEVsZW1lbnRDaGlsZCIsInNldFRpbWVvdXQiLCJxdWVyeVNlbGVjdG9yIiwiJHN0YXR1cyJdLCJzb3VyY2VSb290IjoiIn0=