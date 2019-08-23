/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => {
    return new Promise( (res, rej) => {
      $.ajax({
        url: `/users/${id}/follow`,
        type: 'POST',
        dataType: 'json',
        success: (thing) => {
          res(thing);
        },
        error: (err) => {
          rej(err);
        }
      });
    });
  },

  unfollowUser: id => {
    return new Promise((res, rej) => {
      $.ajax({
        url: `/users/${id}/follow`,
        type: 'DELETE',
        dataType: 'json',
        success: (thing) => {
          res(thing);
        },
        error: (err) => {
          rej(err);
        }
      });
    });
  },

  searchUsers: queryVal => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `/users/search`,
        type: 'GET',
        dataType: 'json',
        data: {
          query: queryVal
        },
        success: (thing) => {
          resolve(thing);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }
};

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

class FollowToggle {
  
  constructor(userId, initialFollowState) {
    this.userId = userId;
    this.initialFollowState = initialFollowState;
    this.render();
    $('.follow-toggle').click(this.handleClick.bind(this));
  }

  render() {
    let text = this.initialFollowState ? "Unfollow!" : "Follow!";
    $('.follow-toggle').text(text);
    $(".follow-toggle").removeAttr('disabled');
  }

  handleClick(e) {
    $('.follow-toggle').attr('disabled', 'disabled');

    e.preventDefault();
    if (this.initialFollowState) {
      APIUtil.unfollowUser(this.userId).then( (thing) => {
        this.initialFollowState = !this.initialFollowState;
        this.render();
      }).catch( (err) => console.log(err) );
    } else {
      APIUtil.followUser(this.userId).then((thing) => {
        this.initialFollowState = !this.initialFollowState;
        this.render();
      }).catch((err) => console.log(err));
    }
    
    // let method = this.initialFollowState ? 'DELETE' : 'POST'
    // $.ajax({
    //   url: `/users/${this.userId}/follow`,
    //   type: method,
    //   dataType: 'json',
    //   success: (thing) => {
    //     this.initialFollowState = !this.initialFollowState;
    //     this.render();
    //   },
    //   error: (err) => console.log(err)
    // });
  }

}


module.exports = FollowToggle;

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search */ "./frontend/users_search.js");

$(document).ready( () => {

  let $ft = $('.follow-toggle');
  if ($ft.data()) {
    let initFollowState = $ft.data().initialFollowState;
    let userId = $ft.data().userId;
    let follow_toggle = new FollowToggle(userId, initFollowState);
  }
  let users_search = new UsersSearch($('.users-search'), $('.users-search input').attr('name'), $('.users-search ul'));

});

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js"); 

class UsersSearch {
  constructor($el, input, ul) {
    this.$el = $el;
    this.input = input;
    this.ul = ul;
    this.setUpButton();
    // APIUtil.searchUsers('breakfast').then( (thing) => {
    //   console.log("success");
    //   console.log(thing);
    // } ).catch((err) => {
    //   console.log("Error");
    //   console.log(err);
    // });
  }

  setUpButton() {
    $('.users-search button').click( ()=> {

      const userInput = this.$el.children('input').val();
      
      console.log(userInput);
      APIUtil.searchUsers(userInput).then( (users) => {
        // this.ul.append(`<li>${}`)
        this.ul.empty();
        for(let user of users){
          this.ul.append(`<li>${user.username}</li>`);
        }
      });
    });
  }

}

module.exports = UsersSearch;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map