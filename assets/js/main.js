/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./sources/js/common/deviceMenu.js":
/*!*****************************************!*\
  !*** ./sources/js/common/deviceMenu.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const DeviceMenu = () => {
  /* Responsive Navigation */
  const hamBurger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.mbnav__backdrop');
  const mbnav = document.querySelector('.mbnav');
  const menuWrap = document.querySelector('.mbnav .menu-wrap');
  const menuClose = () => {
    hamBurger.classList.remove('is-clicked');
    document.body.classList.remove('scroll-fixed');
    mbnav.classList.remove('is-open');
    if (menuWrap) {
      const menuItems = menuWrap.querySelectorAll('li');
      menuItems.forEach(item => item.classList.remove('is-open'));
      document.querySelector('.mbnav__inner > .menu-wrap').style.setProperty('--leftSlide', '0');
    }
  };

  /* Mobile overlay click */
  overlay.addEventListener('click', () => {
    menuClose();
  });
  hamBurger.addEventListener('click', function () {
    if (hamBurger.classList.contains('is-clicked')) {
      menuClose();
    } else {
      hamBurger.classList.add('is-clicked');
      mbnav.classList.add('is-open');
      document.body.classList.add('scroll-fixed');
    }
  });
  const clickable = document.querySelector('.mbnav__state').getAttribute('data-clickable');
  const listItemsWithSubMenu = document.querySelectorAll('.mbnav li:has(ul)');
  listItemsWithSubMenu.forEach(item => item.classList.add('has-sub'));
  const subMenus = document.querySelectorAll('.mbnav li > ul');
  subMenus.forEach(subMenu => subMenu.classList.add('sub-menu'));
  const hasSubLinks = document.querySelectorAll('.mbnav .has-sub > a');
  hasSubLinks.forEach(link => {
    const caret = document.createElement('em');
    caret.classList.add('mbnav__caret');
    link.after(caret);
  });
  const subMenuItems = document.querySelectorAll('.mbnav ul > li:has(ul.sub-menu)');
  subMenuItems.forEach(item => {
    const subMenu = item.querySelector(':scope > ul');
    const parentLink = item.querySelector(':scope > a');
    if (subMenu && parentLink) {
      const backClick = document.createElement('li');
      backClick.classList.add('back-click');
      backClick.textContent = parentLink.textContent.trim();
      subMenu.prepend(backClick);
    }
  });
  if (clickable === 'true') {
    const caretElements = document.querySelectorAll('.mbnav .has-sub > .mbnav__caret');
    caretElements.forEach(caret => caret.classList.add('mbnav__caret'));
  } else {
    const nonClickableLinks = document.querySelectorAll('.mbnav .has-sub > a');
    nonClickableLinks.forEach(link => {
      link.classList.add('mbnav__caret');
      link.setAttribute('href', 'javascript:;');
    });
  }

  // === First part: wrapAll ===
  const menuInner = document.querySelector('.mbnav__inner');
  const children = Array.from(menuInner.children);

  // Create outer wrappers
  const outerWrap = document.createElement('div');
  outerWrap.classList.add('menu-wrap');
  const innerWrap = document.createElement('div');
  innerWrap.classList.add('menu-inner');

  // Move all children into innerWrap
  children.forEach(child => innerWrap.appendChild(child));

  // Append innerWrap to outerWrap, and that to menuInner
  outerWrap.appendChild(innerWrap);
  menuInner.appendChild(outerWrap);
  const submenuElements = document.querySelectorAll('.mbnav__inner ul li.has-sub ul');
  submenuElements.forEach(subMenu => {
    // Create the wrapper structure
    const menuWrap = document.createElement('div');
    menuWrap.classList.add('menu-wrap');
    const innerWrap = document.createElement('div');
    innerWrap.classList.add('menu-inner');

    // Insert the wrapper before the submenu
    subMenu.parentNode.replaceChild(menuWrap, subMenu);

    // Put the submenu inside innerWrap
    innerWrap.appendChild(subMenu);

    // Put innerWrap inside menuWrap
    menuWrap.appendChild(innerWrap);
  });

  // Open menu on caret click
  const caretTriggers = document.querySelectorAll('.mbnav .has-sub > .mbnav__caret');
  caretTriggers.forEach(trigger => {
    trigger.addEventListener('click', function () {
      const element = this.parentElement;
      element.classList.add('is-open');
      document.body.classList.add('scroll-fixed');
      const menuLeftMove = document.querySelector('.mbnav__inner > .menu-wrap');
      const backMove = parseInt(menuLeftMove.getPropertyValue('--leftSlide'), 10);
      menuLeftMove.style.setProperty('--leftSlide', `${backMove + 100}%`);
    });
  });

  // Handle back click
  const backClicks = document.querySelectorAll('.mbnav__inner .back-click');
  backClicks.forEach(backClick => {
    backClick.addEventListener('click', function () {
      const menuItem = this.closest('.menu-item');
      if (menuItem) {
        menuItem.classList.remove('is-open');
      }
      const menuLeftMove = document.querySelector('.mbnav__inner > .menu-wrap');
      const backMove = parseInt(menuLeftMove.getPropertyValue('--leftSlide'), 10);
      menuLeftMove.style.setProperty('--leftSlide', `${backMove - 100}%`);
    });
  });

  // Set padding from header height
  const headerHeight = document.querySelector('header.main-header').offsetHeight;
  const menuInners = document.querySelectorAll('.mbnav .menu-wrap .menu-inner');
  menuInners.forEach(inner => {
    inner.style.paddingTop = `${headerHeight}px`;
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeviceMenu);

/***/ }),

/***/ "./sources/js/common/fancybox.js":
/*!***************************************!*\
  !*** ./sources/js/common/fancybox.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initFancybox: () => (/* binding */ initFancybox)
/* harmony export */ });
/* harmony import */ var _fancyapps_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fancyapps/ui */ "./node_modules/@fancyapps/ui/dist/index.esm.js");
/* harmony import */ var _fancyapps_ui_dist_fancybox_fancybox_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fancyapps/ui/dist/fancybox/fancybox.css */ "./node_modules/@fancyapps/ui/dist/fancybox/fancybox.css");
// fancyboxInit.js


const initFancybox = () => {
  _fancyapps_ui__WEBPACK_IMPORTED_MODULE_0__.Fancybox.bind('[data-fancybox]', {
    loop: true,
    Toolbar: {
      display: ['close']
    }
  });
};

/***/ }),

/***/ "./sources/js/common/swiperInit.js":
/*!*****************************************!*\
  !*** ./sources/js/common/swiperInit.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initHomeSlider: () => (/* binding */ initHomeSlider),
/* harmony export */   initTestimonialSlider: () => (/* binding */ initTestimonialSlider)
/* harmony export */ });
/* harmony import */ var swiper_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper/bundle */ "./node_modules/swiper/swiper-bundle.mjs");
/* harmony import */ var swiper_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper/modules */ "./node_modules/swiper/modules/index.mjs");
/* harmony import */ var swiper_css_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper/css/bundle */ "./node_modules/swiper/swiper-bundle.css");
// swiperInit.js



const initHomeSlider = () => {
  return new swiper_bundle__WEBPACK_IMPORTED_MODULE_0__["default"]('.home-slider', {
    modules: [swiper_modules__WEBPACK_IMPORTED_MODULE_1__.Navigation, swiper_modules__WEBPACK_IMPORTED_MODULE_1__.Pagination],
    loop: true,
    navigation: {
      nextEl: '.home-next',
      prevEl: '.home-prev'
    },
    pagination: {
      el: '.home-pagination',
      clickable: true
    }
  });
};
const initTestimonialSlider = () => {
  return new swiper_bundle__WEBPACK_IMPORTED_MODULE_0__["default"]('.testimonial-slider', {
    modules: [swiper_modules__WEBPACK_IMPORTED_MODULE_1__.Navigation, swiper_modules__WEBPACK_IMPORTED_MODULE_1__.Pagination],
    loop: true,
    slidesPerView: 2,
    spaceBetween: 30,
    pagination: {
      el: '.testimonial-pagination',
      clickable: true
    },
    breakpoints: {
      768: {
        slidesPerView: 1
      }
    }
  });
};

/***/ }),

/***/ "./sources/js/script.js":
/*!******************************!*\
  !*** ./sources/js/script.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_common_swiperInit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @js/common/swiperInit.js */ "./sources/js/common/swiperInit.js");
/* harmony import */ var _js_common_deviceMenu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @js/common/deviceMenu.js */ "./sources/js/common/deviceMenu.js");
/* harmony import */ var _js_common_fancybox_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @js/common/fancybox.js */ "./sources/js/common/fancybox.js");



(0,_js_common_swiperInit_js__WEBPACK_IMPORTED_MODULE_0__.initHomeSlider)();
(0,_js_common_deviceMenu_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
(0,_js_common_fancybox_js__WEBPACK_IMPORTED_MODULE_2__.initFancybox)();

/***/ }),

/***/ "./sources/scss/style.scss":
/*!*********************************!*\
  !*** ./sources/scss/style.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0,
/******/ 			"library/common": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkwp_starter_theme"] = globalThis["webpackChunkwp_starter_theme"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["library/swiper","library/common","library/fancyapps"], () => (__webpack_require__("./sources/js/script.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["library/swiper","library/common","library/fancyapps"], () => (__webpack_require__("./sources/scss/style.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map