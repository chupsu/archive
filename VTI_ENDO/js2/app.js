(() => {
	"use strict";
	function isWebp() {
		function testWebP(callback) {
			let webP = new Image;
			webP.onload = webP.onerror = function () {
				callback(webP.height == 2);
			};
			webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
		}
		testWebP((function (support) {
			let className = support === true ? "webp" : "no-webp";
			document.documentElement.classList.add(className);
		}));
	}
	let bodyLockStatus = true;
	let bodyLockToggle = (delay = 500) => {
		if (document.documentElement.classList.contains("_lock")) bodyUnlock(delay); else bodyLock(delay);
	};
	let bodyUnlock = (delay = 500) => {
		let body = document.querySelector("body");
		if (bodyLockStatus) {
			let lock_padding = document.querySelectorAll("[data-lp]");
			setTimeout((() => {
				for (let index = 0; index < lock_padding.length; index++) {
					const el = lock_padding[index];
					el.style.paddingRight = "0px";
				}
				body.style.paddingRight = "0px";
				document.documentElement.classList.remove("_lock");
			}), delay);
			bodyLockStatus = false;
			setTimeout((function () {
				bodyLockStatus = true;
			}), delay);
		}
	};
	let bodyLock = (delay = 500) => {
		let body = document.querySelector("body");
		if (bodyLockStatus) {
			let lock_padding = document.querySelectorAll("[data-lp]");
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
			}
			body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
			document.documentElement.classList.add("_lock");
			bodyLockStatus = false;
			setTimeout((function () {
				bodyLockStatus = true;
			}), delay);
		}
	};
	function menuInit() {
		const menuOpenItems = document.querySelectorAll("[data-menu-open]");
		const menuItem = document.querySelector("[data-menu]");
		if (menuOpenItems.length && menuItem) menuOpenItems.forEach((menuOpenItem => {
			menuOpenItem.addEventListener("click", (e => {
				e.preventDefault();
				if (bodyLockStatus) {
					bodyLockToggle();
					menuOpenItem.classList.toggle("_menu-active");
					menuItem.classList.toggle("_menu-active");
				}
			}));
		}));
	}
	function menuClose() {
		const menuOpenItems = document.querySelectorAll("[data-menu-open]");
		const menuItem = document.querySelector("[data-menu]");
		if (menuOpenItems.length && menuItem) {
			bodyUnlock();
			menuOpenItems.forEach((menuOpenItem => {
				menuOpenItem.classList.remove("_menu-active");
			}));
			menuItem.classList.remove("_menu-active");
		}
	}
	const menuCloseItems = document.querySelectorAll("[data-menu-close]");
	if (menuCloseItems.length) {
		menuCloseItems.forEach((menuCloseItem => {
			menuCloseItem.addEventListener("click", (e => {
				e.preventDefault();
				menuClose();
			}));
		}));
		document.addEventListener("click", (e => {
			if (!e.target.closest("[data-menu-main]") && !e.target.closest("[data-menu-open]")) menuClose();
		}));
	}
	function functions_open() {
		const openItems = document.querySelectorAll("[data-open]");
		if (openItems.length) openItems.forEach((openItem => {
			const openBtn = openItem.querySelector("[data-open-btn]");
			const openBody = openItem.querySelector("[data-open-body]");
			const openFill = openItem.querySelector("[data-open-fill]");
			const openClose = openItem.querySelector("[data-open-close]");
			if (openBtn && openBody && openFill) {
				openBtn.addEventListener("click", (function (e) {
					openFill.classList.toggle("_active");
					openBody.classList.toggle("_active");
					openBtn.classList.toggle("_active");
					document.querySelector("._menu-active") ? menuClose() : null;
					e.preventDefault();
				}));
				document.addEventListener("click", (function (e) {
					if (!e.target.closest("[data-open-body]") && !e.target.closest("[data-open-btn]")) {
						openBtn.classList.remove("_active");
						openBody.classList.remove("_active");
						openFill.classList.remove("_active");
					}
				}));
			}
			if (openClose && openBtn && openBody && openFill) openClose.addEventListener("click", (() => {
				openBtn.classList.remove("_active");
				openBody.classList.remove("_active");
				openFill.classList.remove("_active");
			}));
		}));
	}
	function ssr_window_esm_isObject(obj) {
		return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
	}
	function extend(target = {}, src = {}) {
		Object.keys(src).forEach((key => {
			if (typeof target[key] === "undefined") target[key] = src[key]; else if (ssr_window_esm_isObject(src[key]) && ssr_window_esm_isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
		}));
	}
	const ssrDocument = {
		body: {},
		addEventListener() { },
		removeEventListener() { },
		activeElement: {
			blur() { },
			nodeName: ""
		},
		querySelector() {
			return null;
		},
		querySelectorAll() {
			return [];
		},
		getElementById() {
			return null;
		},
		createEvent() {
			return {
				initEvent() { }
			};
		},
		createElement() {
			return {
				children: [],
				childNodes: [],
				style: {},
				setAttribute() { },
				getElementsByTagName() {
					return [];
				}
			};
		},
		createElementNS() {
			return {};
		},
		importNode() {
			return null;
		},
		location: {
			hash: "",
			host: "",
			hostname: "",
			href: "",
			origin: "",
			pathname: "",
			protocol: "",
			search: ""
		}
	};
	function ssr_window_esm_getDocument() {
		const doc = typeof document !== "undefined" ? document : {};
		extend(doc, ssrDocument);
		return doc;
	}
	const ssrWindow = {
		document: ssrDocument,
		navigator: {
			userAgent: ""
		},
		location: {
			hash: "",
			host: "",
			hostname: "",
			href: "",
			origin: "",
			pathname: "",
			protocol: "",
			search: ""
		},
		history: {
			replaceState() { },
			pushState() { },
			go() { },
			back() { }
		},
		CustomEvent: function CustomEvent() {
			return this;
		},
		addEventListener() { },
		removeEventListener() { },
		getComputedStyle() {
			return {
				getPropertyValue() {
					return "";
				}
			};
		},
		Image() { },
		Date() { },
		screen: {},
		setTimeout() { },
		clearTimeout() { },
		matchMedia() {
			return {};
		},
		requestAnimationFrame(callback) {
			if (typeof setTimeout === "undefined") {
				callback();
				return null;
			}
			return setTimeout(callback, 0);
		},
		cancelAnimationFrame(id) {
			if (typeof setTimeout === "undefined") return;
			clearTimeout(id);
		}
	};
	function ssr_window_esm_getWindow() {
		const win = typeof window !== "undefined" ? window : {};
		extend(win, ssrWindow);
		return win;
	}
	function makeReactive(obj) {
		const proto = obj.__proto__;
		Object.defineProperty(obj, "__proto__", {
			get() {
				return proto;
			},
			set(value) {
				proto.__proto__ = value;
			}
		});
	}
	class Dom7 extends Array {
		constructor(items) {
			if (typeof items === "number") super(items); else {
				super(...items || []);
				makeReactive(this);
			}
		}
	}
	function arrayFlat(arr = []) {
		const res = [];
		arr.forEach((el => {
			if (Array.isArray(el)) res.push(...arrayFlat(el)); else res.push(el);
		}));
		return res;
	}
	function arrayFilter(arr, callback) {
		return Array.prototype.filter.call(arr, callback);
	}
	function arrayUnique(arr) {
		const uniqueArray = [];
		for (let i = 0; i < arr.length; i += 1) if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
		return uniqueArray;
	}
	function qsa(selector, context) {
		if (typeof selector !== "string") return [selector];
		const a = [];
		const res = context.querySelectorAll(selector);
		for (let i = 0; i < res.length; i += 1) a.push(res[i]);
		return a;
	}
	function dom7_esm_$(selector, context) {
		const window = ssr_window_esm_getWindow();
		const document = ssr_window_esm_getDocument();
		let arr = [];
		if (!context && selector instanceof Dom7) return selector;
		if (!selector) return new Dom7(arr);
		if (typeof selector === "string") {
			const html = selector.trim();
			if (html.indexOf("<") >= 0 && html.indexOf(">") >= 0) {
				let toCreate = "div";
				if (html.indexOf("<li") === 0) toCreate = "ul";
				if (html.indexOf("<tr") === 0) toCreate = "tbody";
				if (html.indexOf("<td") === 0 || html.indexOf("<th") === 0) toCreate = "tr";
				if (html.indexOf("<tbody") === 0) toCreate = "table";
				if (html.indexOf("<option") === 0) toCreate = "select";
				const tempParent = document.createElement(toCreate);
				tempParent.innerHTML = html;
				for (let i = 0; i < tempParent.childNodes.length; i += 1) arr.push(tempParent.childNodes[i]);
			} else arr = qsa(selector.trim(), context || document);
		} else if (selector.nodeType || selector === window || selector === document) arr.push(selector); else if (Array.isArray(selector)) {
			if (selector instanceof Dom7) return selector;
			arr = selector;
		}
		return new Dom7(arrayUnique(arr));
	}
	dom7_esm_$.fn = Dom7.prototype;
	function addClass(...classes) {
		const classNames = arrayFlat(classes.map((c => c.split(" "))));
		this.forEach((el => {
			el.classList.add(...classNames);
		}));
		return this;
	}
	function removeClass(...classes) {
		const classNames = arrayFlat(classes.map((c => c.split(" "))));
		this.forEach((el => {
			el.classList.remove(...classNames);
		}));
		return this;
	}
	function toggleClass(...classes) {
		const classNames = arrayFlat(classes.map((c => c.split(" "))));
		this.forEach((el => {
			classNames.forEach((className => {
				el.classList.toggle(className);
			}));
		}));
	}
	function hasClass(...classes) {
		const classNames = arrayFlat(classes.map((c => c.split(" "))));
		return arrayFilter(this, (el => classNames.filter((className => el.classList.contains(className))).length > 0)).length > 0;
	}
	function attr(attrs, value) {
		if (arguments.length === 1 && typeof attrs === "string") {
			if (this[0]) return this[0].getAttribute(attrs);
			return;
		}
		for (let i = 0; i < this.length; i += 1) if (arguments.length === 2) this[i].setAttribute(attrs, value); else for (const attrName in attrs) {
			this[i][attrName] = attrs[attrName];
			this[i].setAttribute(attrName, attrs[attrName]);
		}
		return this;
	}
	function removeAttr(attr) {
		for (let i = 0; i < this.length; i += 1) this[i].removeAttribute(attr);
		return this;
	}
	function transform(transform) {
		for (let i = 0; i < this.length; i += 1) this[i].style.transform = transform;
		return this;
	}
	function transition(duration) {
		for (let i = 0; i < this.length; i += 1) this[i].style.transitionDuration = typeof duration !== "string" ? `${duration}ms` : duration;
		return this;
	}
	function on(...args) {
		let [eventType, targetSelector, listener, capture] = args;
		if (typeof args[1] === "function") {
			[eventType, listener, capture] = args;
			targetSelector = void 0;
		}
		if (!capture) capture = false;
		function handleLiveEvent(e) {
			const target = e.target;
			if (!target) return;
			const eventData = e.target.dom7EventData || [];
			if (eventData.indexOf(e) < 0) eventData.unshift(e);
			if (dom7_esm_$(target).is(targetSelector)) listener.apply(target, eventData); else {
				const parents = dom7_esm_$(target).parents();
				for (let k = 0; k < parents.length; k += 1) if (dom7_esm_$(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
			}
		}
		function handleEvent(e) {
			const eventData = e && e.target ? e.target.dom7EventData || [] : [];
			if (eventData.indexOf(e) < 0) eventData.unshift(e);
			listener.apply(this, eventData);
		}
		const events = eventType.split(" ");
		let j;
		for (let i = 0; i < this.length; i += 1) {
			const el = this[i];
			if (!targetSelector) for (j = 0; j < events.length; j += 1) {
				const event = events[j];
				if (!el.dom7Listeners) el.dom7Listeners = {};
				if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
				el.dom7Listeners[event].push({
					listener,
					proxyListener: handleEvent
				});
				el.addEventListener(event, handleEvent, capture);
			} else for (j = 0; j < events.length; j += 1) {
				const event = events[j];
				if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
				if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
				el.dom7LiveListeners[event].push({
					listener,
					proxyListener: handleLiveEvent
				});
				el.addEventListener(event, handleLiveEvent, capture);
			}
		}
		return this;
	}
	function off(...args) {
		let [eventType, targetSelector, listener, capture] = args;
		if (typeof args[1] === "function") {
			[eventType, listener, capture] = args;
			targetSelector = void 0;
		}
		if (!capture) capture = false;
		const events = eventType.split(" ");
		for (let i = 0; i < events.length; i += 1) {
			const event = events[i];
			for (let j = 0; j < this.length; j += 1) {
				const el = this[j];
				let handlers;
				if (!targetSelector && el.dom7Listeners) handlers = el.dom7Listeners[event]; else if (targetSelector && el.dom7LiveListeners) handlers = el.dom7LiveListeners[event];
				if (handlers && handlers.length) for (let k = handlers.length - 1; k >= 0; k -= 1) {
					const handler = handlers[k];
					if (listener && handler.listener === listener) {
						el.removeEventListener(event, handler.proxyListener, capture);
						handlers.splice(k, 1);
					} else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
						el.removeEventListener(event, handler.proxyListener, capture);
						handlers.splice(k, 1);
					} else if (!listener) {
						el.removeEventListener(event, handler.proxyListener, capture);
						handlers.splice(k, 1);
					}
				}
			}
		}
		return this;
	}
	function trigger(...args) {
		const window = ssr_window_esm_getWindow();
		const events = args[0].split(" ");
		const eventData = args[1];
		for (let i = 0; i < events.length; i += 1) {
			const event = events[i];
			for (let j = 0; j < this.length; j += 1) {
				const el = this[j];
				if (window.CustomEvent) {
					const evt = new window.CustomEvent(event, {
						detail: eventData,
						bubbles: true,
						cancelable: true
					});
					el.dom7EventData = args.filter(((data, dataIndex) => dataIndex > 0));
					el.dispatchEvent(evt);
					el.dom7EventData = [];
					delete el.dom7EventData;
				}
			}
		}
		return this;
	}
	function transitionEnd(callback) {
		const dom = this;
		function fireCallBack(e) {
			if (e.target !== this) return;
			callback.call(this, e);
			dom.off("transitionend", fireCallBack);
		}
		if (callback) dom.on("transitionend", fireCallBack);
		return this;
	}
	function dom7_esm_outerWidth(includeMargins) {
		if (this.length > 0) {
			if (includeMargins) {
				const styles = this.styles();
				return this[0].offsetWidth + parseFloat(styles.getPropertyValue("margin-right")) + parseFloat(styles.getPropertyValue("margin-left"));
			}
			return this[0].offsetWidth;
		}
		return null;
	}
	function dom7_esm_outerHeight(includeMargins) {
		if (this.length > 0) {
			if (includeMargins) {
				const styles = this.styles();
				return this[0].offsetHeight + parseFloat(styles.getPropertyValue("margin-top")) + parseFloat(styles.getPropertyValue("margin-bottom"));
			}
			return this[0].offsetHeight;
		}
		return null;
	}
	function offset() {
		if (this.length > 0) {
			const window = ssr_window_esm_getWindow();
			const document = ssr_window_esm_getDocument();
			const el = this[0];
			const box = el.getBoundingClientRect();
			const body = document.body;
			const clientTop = el.clientTop || body.clientTop || 0;
			const clientLeft = el.clientLeft || body.clientLeft || 0;
			const scrollTop = el === window ? window.scrollY : el.scrollTop;
			const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
			return {
				top: box.top + scrollTop - clientTop,
				left: box.left + scrollLeft - clientLeft
			};
		}
		return null;
	}
	function styles() {
		const window = ssr_window_esm_getWindow();
		if (this[0]) return window.getComputedStyle(this[0], null);
		return {};
	}
	function css(props, value) {
		const window = ssr_window_esm_getWindow();
		let i;
		if (arguments.length === 1) if (typeof props === "string") {
			if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
		} else {
			for (i = 0; i < this.length; i += 1) for (const prop in props) this[i].style[prop] = props[prop];
			return this;
		}
		if (arguments.length === 2 && typeof props === "string") {
			for (i = 0; i < this.length; i += 1) this[i].style[props] = value;
			return this;
		}
		return this;
	}
	function each(callback) {
		if (!callback) return this;
		this.forEach(((el, index) => {
			callback.apply(el, [el, index]);
		}));
		return this;
	}
	function filter(callback) {
		const result = arrayFilter(this, callback);
		return dom7_esm_$(result);
	}
	function html(html) {
		if (typeof html === "undefined") return this[0] ? this[0].innerHTML : null;
		for (let i = 0; i < this.length; i += 1) this[i].innerHTML = html;
		return this;
	}
	function dom7_esm_text(text) {
		if (typeof text === "undefined") return this[0] ? this[0].textContent.trim() : null;
		for (let i = 0; i < this.length; i += 1) this[i].textContent = text;
		return this;
	}
	function is(selector) {
		const window = ssr_window_esm_getWindow();
		const document = ssr_window_esm_getDocument();
		const el = this[0];
		let compareWith;
		let i;
		if (!el || typeof selector === "undefined") return false;
		if (typeof selector === "string") {
			if (el.matches) return el.matches(selector);
			if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
			if (el.msMatchesSelector) return el.msMatchesSelector(selector);
			compareWith = dom7_esm_$(selector);
			for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
			return false;
		}
		if (selector === document) return el === document;
		if (selector === window) return el === window;
		if (selector.nodeType || selector instanceof Dom7) {
			compareWith = selector.nodeType ? [selector] : selector;
			for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
			return false;
		}
		return false;
	}
	function index() {
		let child = this[0];
		let i;
		if (child) {
			i = 0;
			while ((child = child.previousSibling) !== null) if (child.nodeType === 1) i += 1;
			return i;
		}
		return;
	}
	function eq(index) {
		if (typeof index === "undefined") return this;
		const length = this.length;
		if (index > length - 1) return dom7_esm_$([]);
		if (index < 0) {
			const returnIndex = length + index;
			if (returnIndex < 0) return dom7_esm_$([]);
			return dom7_esm_$([this[returnIndex]]);
		}
		return dom7_esm_$([this[index]]);
	}
	function append(...els) {
		let newChild;
		const document = ssr_window_esm_getDocument();
		for (let k = 0; k < els.length; k += 1) {
			newChild = els[k];
			for (let i = 0; i < this.length; i += 1) if (typeof newChild === "string") {
				const tempDiv = document.createElement("div");
				tempDiv.innerHTML = newChild;
				while (tempDiv.firstChild) this[i].appendChild(tempDiv.firstChild);
			} else if (newChild instanceof Dom7) for (let j = 0; j < newChild.length; j += 1) this[i].appendChild(newChild[j]); else this[i].appendChild(newChild);
		}
		return this;
	}
	function prepend(newChild) {
		const document = ssr_window_esm_getDocument();
		let i;
		let j;
		for (i = 0; i < this.length; i += 1) if (typeof newChild === "string") {
			const tempDiv = document.createElement("div");
			tempDiv.innerHTML = newChild;
			for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
		} else if (newChild instanceof Dom7) for (j = 0; j < newChild.length; j += 1) this[i].insertBefore(newChild[j], this[i].childNodes[0]); else this[i].insertBefore(newChild, this[i].childNodes[0]);
		return this;
	}
	function next(selector) {
		if (this.length > 0) {
			if (selector) {
				if (this[0].nextElementSibling && dom7_esm_$(this[0].nextElementSibling).is(selector)) return dom7_esm_$([this[0].nextElementSibling]);
				return dom7_esm_$([]);
			}
			if (this[0].nextElementSibling) return dom7_esm_$([this[0].nextElementSibling]);
			return dom7_esm_$([]);
		}
		return dom7_esm_$([]);
	}
	function nextAll(selector) {
		const nextEls = [];
		let el = this[0];
		if (!el) return dom7_esm_$([]);
		while (el.nextElementSibling) {
			const next = el.nextElementSibling;
			if (selector) {
				if (dom7_esm_$(next).is(selector)) nextEls.push(next);
			} else nextEls.push(next);
			el = next;
		}
		return dom7_esm_$(nextEls);
	}
	function prev(selector) {
		if (this.length > 0) {
			const el = this[0];
			if (selector) {
				if (el.previousElementSibling && dom7_esm_$(el.previousElementSibling).is(selector)) return dom7_esm_$([el.previousElementSibling]);
				return dom7_esm_$([]);
			}
			if (el.previousElementSibling) return dom7_esm_$([el.previousElementSibling]);
			return dom7_esm_$([]);
		}
		return dom7_esm_$([]);
	}
	function prevAll(selector) {
		const prevEls = [];
		let el = this[0];
		if (!el) return dom7_esm_$([]);
		while (el.previousElementSibling) {
			const prev = el.previousElementSibling;
			if (selector) {
				if (dom7_esm_$(prev).is(selector)) prevEls.push(prev);
			} else prevEls.push(prev);
			el = prev;
		}
		return dom7_esm_$(prevEls);
	}
	function dom7_esm_parent(selector) {
		const parents = [];
		for (let i = 0; i < this.length; i += 1) if (this[i].parentNode !== null) if (selector) {
			if (dom7_esm_$(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
		} else parents.push(this[i].parentNode);
		return dom7_esm_$(parents);
	}
	function parents(selector) {
		const parents = [];
		for (let i = 0; i < this.length; i += 1) {
			let parent = this[i].parentNode;
			while (parent) {
				if (selector) {
					if (dom7_esm_$(parent).is(selector)) parents.push(parent);
				} else parents.push(parent);
				parent = parent.parentNode;
			}
		}
		return dom7_esm_$(parents);
	}
	function closest(selector) {
		let closest = this;
		if (typeof selector === "undefined") return dom7_esm_$([]);
		if (!closest.is(selector)) closest = closest.parents(selector).eq(0);
		return closest;
	}
	function find(selector) {
		const foundElements = [];
		for (let i = 0; i < this.length; i += 1) {
			const found = this[i].querySelectorAll(selector);
			for (let j = 0; j < found.length; j += 1) foundElements.push(found[j]);
		}
		return dom7_esm_$(foundElements);
	}
	function children(selector) {
		const children = [];
		for (let i = 0; i < this.length; i += 1) {
			const childNodes = this[i].children;
			for (let j = 0; j < childNodes.length; j += 1) if (!selector || dom7_esm_$(childNodes[j]).is(selector)) children.push(childNodes[j]);
		}
		return dom7_esm_$(children);
	}
	function remove() {
		for (let i = 0; i < this.length; i += 1) if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
		return this;
	}
	const noTrigger = "resize scroll".split(" ");
	function shortcut(name) {
		function eventHandler(...args) {
			if (typeof args[0] === "undefined") {
				for (let i = 0; i < this.length; i += 1) if (noTrigger.indexOf(name) < 0) if (name in this[i]) this[i][name](); else dom7_esm_$(this[i]).trigger(name);
				return this;
			}
			return this.on(name, ...args);
		}
		return eventHandler;
	}
	shortcut("click");
	shortcut("blur");
	shortcut("focus");
	shortcut("focusin");
	shortcut("focusout");
	shortcut("keyup");
	shortcut("keydown");
	shortcut("keypress");
	shortcut("submit");
	shortcut("change");
	shortcut("mousedown");
	shortcut("mousemove");
	shortcut("mouseup");
	shortcut("mouseenter");
	shortcut("mouseleave");
	shortcut("mouseout");
	shortcut("mouseover");
	shortcut("touchstart");
	shortcut("touchend");
	shortcut("touchmove");
	shortcut("resize");
	shortcut("scroll");
	const Methods = {
		addClass,
		removeClass,
		hasClass,
		toggleClass,
		attr,
		removeAttr,
		transform,
		transition,
		on,
		off,
		trigger,
		transitionEnd,
		outerWidth: dom7_esm_outerWidth,
		outerHeight: dom7_esm_outerHeight,
		styles,
		offset,
		css,
		each,
		html,
		text: dom7_esm_text,
		is,
		index,
		eq,
		append,
		prepend,
		next,
		nextAll,
		prev,
		prevAll,
		parent: dom7_esm_parent,
		parents,
		closest,
		find,
		children,
		filter,
		remove
	};
	Object.keys(Methods).forEach((methodName => {
		Object.defineProperty(dom7_esm_$.fn, methodName, {
			value: Methods[methodName],
			writable: true
		});
	}));
	const dom = dom7_esm_$;
	function deleteProps(obj) {
		const object = obj;
		Object.keys(object).forEach((key => {
			try {
				object[key] = null;
			} catch (e) { }
			try {
				delete object[key];
			} catch (e) { }
		}));
	}
	function utils_nextTick(callback, delay = 0) {
		return setTimeout(callback, delay);
	}
	function utils_now() {
		return Date.now();
	}
	function utils_getComputedStyle(el) {
		const window = ssr_window_esm_getWindow();
		let style;
		if (window.getComputedStyle) style = window.getComputedStyle(el, null);
		if (!style && el.currentStyle) style = el.currentStyle;
		if (!style) style = el.style;
		return style;
	}
	function utils_getTranslate(el, axis = "x") {
		const window = ssr_window_esm_getWindow();
		let matrix;
		let curTransform;
		let transformMatrix;
		const curStyle = utils_getComputedStyle(el, null);
		if (window.WebKitCSSMatrix) {
			curTransform = curStyle.transform || curStyle.webkitTransform;
			if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
			transformMatrix = new window.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
		} else {
			transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
			matrix = transformMatrix.toString().split(",");
		}
		if (axis === "x") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
		if (axis === "y") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
		return curTransform || 0;
	}
	function utils_isObject(o) {
		return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
	}
	function isNode(node) {
		if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") return node instanceof HTMLElement;
		return node && (node.nodeType === 1 || node.nodeType === 11);
	}
	function utils_extend(...args) {
		const to = Object(args[0]);
		const noExtend = ["__proto__", "constructor", "prototype"];
		for (let i = 1; i < args.length; i += 1) {
			const nextSource = args[i];
			if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
				const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
				for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
					const nextKey = keysArray[nextIndex];
					const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
					if (desc !== void 0 && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
						to[nextKey] = {};
						if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
					} else to[nextKey] = nextSource[nextKey];
				}
			}
		}
		return to;
	}
	function utils_setCSSProperty(el, varName, varValue) {
		el.style.setProperty(varName, varValue);
	}
	function animateCSSModeScroll({ swiper, targetPosition, side }) {
		const window = ssr_window_esm_getWindow();
		const startPosition = -swiper.translate;
		let startTime = null;
		let time;
		const duration = swiper.params.speed;
		swiper.wrapperEl.style.scrollSnapType = "none";
		window.cancelAnimationFrame(swiper.cssModeFrameID);
		const dir = targetPosition > startPosition ? "next" : "prev";
		const isOutOfBound = (current, target) => dir === "next" && current >= target || dir === "prev" && current <= target;
		const animate = () => {
			time = (new Date).getTime();
			if (startTime === null) startTime = time;
			const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
			const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
			let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
			if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
			swiper.wrapperEl.scrollTo({
				[side]: currentPosition
			});
			if (isOutOfBound(currentPosition, targetPosition)) {
				swiper.wrapperEl.style.overflow = "hidden";
				swiper.wrapperEl.style.scrollSnapType = "";
				setTimeout((() => {
					swiper.wrapperEl.style.overflow = "";
					swiper.wrapperEl.scrollTo({
						[side]: currentPosition
					});
				}));
				window.cancelAnimationFrame(swiper.cssModeFrameID);
				return;
			}
			swiper.cssModeFrameID = window.requestAnimationFrame(animate);
		};
		animate();
	}
	let support;
	function calcSupport() {
		const window = ssr_window_esm_getWindow();
		const document = ssr_window_esm_getDocument();
		return {
			smoothScroll: document.documentElement && "scrollBehavior" in document.documentElement.style,
			touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
			passiveListener: function checkPassiveListener() {
				let supportsPassive = false;
				try {
					const opts = Object.defineProperty({}, "passive", {
						get() {
							supportsPassive = true;
						}
					});
					window.addEventListener("testPassiveListener", null, opts);
				} catch (e) { }
				return supportsPassive;
			}(),
			gestures: function checkGestures() {
				return "ongesturestart" in window;
			}()
		};
	}
	function getSupport() {
		if (!support) support = calcSupport();
		return support;
	}
	let deviceCached;
	function calcDevice({ userAgent } = {}) {
		const support = getSupport();
		const window = ssr_window_esm_getWindow();
		const platform = window.navigator.platform;
		const ua = userAgent || window.navigator.userAgent;
		const device = {
			ios: false,
			android: false
		};
		const screenWidth = window.screen.width;
		const screenHeight = window.screen.height;
		const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
		let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
		const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
		const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
		const windows = platform === "Win32";
		let macos = platform === "MacIntel";
		const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
		if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
			ipad = ua.match(/(Version)\/([\d.]+)/);
			if (!ipad) ipad = [0, 1, "13_0_0"];
			macos = false;
		}
		if (android && !windows) {
			device.os = "android";
			device.android = true;
		}
		if (ipad || iphone || ipod) {
			device.os = "ios";
			device.ios = true;
		}
		return device;
	}
	function getDevice(overrides = {}) {
		if (!deviceCached) deviceCached = calcDevice(overrides);
		return deviceCached;
	}
	let browser;
	function calcBrowser() {
		const window = ssr_window_esm_getWindow();
		function isSafari() {
			const ua = window.navigator.userAgent.toLowerCase();
			return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
		}
		return {
			isSafari: isSafari(),
			isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
		};
	}
	function getBrowser() {
		if (!browser) browser = calcBrowser();
		return browser;
	}
	function Resize({ swiper, on, emit }) {
		const window = ssr_window_esm_getWindow();
		let observer = null;
		let animationFrame = null;
		const resizeHandler = () => {
			if (!swiper || swiper.destroyed || !swiper.initialized) return;
			emit("beforeResize");
			emit("resize");
		};
		const createObserver = () => {
			if (!swiper || swiper.destroyed || !swiper.initialized) return;
			observer = new ResizeObserver((entries => {
				animationFrame = window.requestAnimationFrame((() => {
					const { width, height } = swiper;
					let newWidth = width;
					let newHeight = height;
					entries.forEach((({ contentBoxSize, contentRect, target }) => {
						if (target && target !== swiper.el) return;
						newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
						newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
					}));
					if (newWidth !== width || newHeight !== height) resizeHandler();
				}));
			}));
			observer.observe(swiper.el);
		};
		const removeObserver = () => {
			if (animationFrame) window.cancelAnimationFrame(animationFrame);
			if (observer && observer.unobserve && swiper.el) {
				observer.unobserve(swiper.el);
				observer = null;
			}
		};
		const orientationChangeHandler = () => {
			if (!swiper || swiper.destroyed || !swiper.initialized) return;
			emit("orientationchange");
		};
		on("init", (() => {
			if (swiper.params.resizeObserver && typeof window.ResizeObserver !== "undefined") {
				createObserver();
				return;
			}
			window.addEventListener("resize", resizeHandler);
			window.addEventListener("orientationchange", orientationChangeHandler);
		}));
		on("destroy", (() => {
			removeObserver();
			window.removeEventListener("resize", resizeHandler);
			window.removeEventListener("orientationchange", orientationChangeHandler);
		}));
	}
	function Observer({ swiper, extendParams, on, emit }) {
		const observers = [];
		const window = ssr_window_esm_getWindow();
		const attach = (target, options = {}) => {
			const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
			const observer = new ObserverFunc((mutations => {
				if (mutations.length === 1) {
					emit("observerUpdate", mutations[0]);
					return;
				}
				const observerUpdate = function observerUpdate() {
					emit("observerUpdate", mutations[0]);
				};
				if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
			}));
			observer.observe(target, {
				attributes: typeof options.attributes === "undefined" ? true : options.attributes,
				childList: typeof options.childList === "undefined" ? true : options.childList,
				characterData: typeof options.characterData === "undefined" ? true : options.characterData
			});
			observers.push(observer);
		};
		const init = () => {
			if (!swiper.params.observer) return;
			if (swiper.params.observeParents) {
				const containerParents = swiper.$el.parents();
				for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
			}
			attach(swiper.$el[0], {
				childList: swiper.params.observeSlideChildren
			});
			attach(swiper.$wrapperEl[0], {
				attributes: false
			});
		};
		const destroy = () => {
			observers.forEach((observer => {
				observer.disconnect();
			}));
			observers.splice(0, observers.length);
		};
		extendParams({
			observer: false,
			observeParents: false,
			observeSlideChildren: false
		});
		on("init", init);
		on("destroy", destroy);
	}
	const events_emitter = {
		on(events, handler, priority) {
			const self = this;
			if (!self.eventsListeners || self.destroyed) return self;
			if (typeof handler !== "function") return self;
			const method = priority ? "unshift" : "push";
			events.split(" ").forEach((event => {
				if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
				self.eventsListeners[event][method](handler);
			}));
			return self;
		},
		once(events, handler, priority) {
			const self = this;
			if (!self.eventsListeners || self.destroyed) return self;
			if (typeof handler !== "function") return self;
			function onceHandler(...args) {
				self.off(events, onceHandler);
				if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
				handler.apply(self, args);
			}
			onceHandler.__emitterProxy = handler;
			return self.on(events, onceHandler, priority);
		},
		onAny(handler, priority) {
			const self = this;
			if (!self.eventsListeners || self.destroyed) return self;
			if (typeof handler !== "function") return self;
			const method = priority ? "unshift" : "push";
			if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
			return self;
		},
		offAny(handler) {
			const self = this;
			if (!self.eventsListeners || self.destroyed) return self;
			if (!self.eventsAnyListeners) return self;
			const index = self.eventsAnyListeners.indexOf(handler);
			if (index >= 0) self.eventsAnyListeners.splice(index, 1);
			return self;
		},
		off(events, handler) {
			const self = this;
			if (!self.eventsListeners || self.destroyed) return self;
			if (!self.eventsListeners) return self;
			events.split(" ").forEach((event => {
				if (typeof handler === "undefined") self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
					if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
				}));
			}));
			return self;
		},
		emit(...args) {
			const self = this;
			if (!self.eventsListeners || self.destroyed) return self;
			if (!self.eventsListeners) return self;
			let events;
			let data;
			let context;
			if (typeof args[0] === "string" || Array.isArray(args[0])) {
				events = args[0];
				data = args.slice(1, args.length);
				context = self;
			} else {
				events = args[0].events;
				data = args[0].data;
				context = args[0].context || self;
			}
			data.unshift(context);
			const eventsArray = Array.isArray(events) ? events : events.split(" ");
			eventsArray.forEach((event => {
				if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
					eventHandler.apply(context, [event, ...data]);
				}));
				if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
					eventHandler.apply(context, data);
				}));
			}));
			return self;
		}
	};
	function updateSize() {
		const swiper = this;
		let width;
		let height;
		const $el = swiper.$el;
		if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) width = swiper.params.width; else width = $el[0].clientWidth;
		if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) height = swiper.params.height; else height = $el[0].clientHeight;
		if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) return;
		width = width - parseInt($el.css("padding-left") || 0, 10) - parseInt($el.css("padding-right") || 0, 10);
		height = height - parseInt($el.css("padding-top") || 0, 10) - parseInt($el.css("padding-bottom") || 0, 10);
		if (Number.isNaN(width)) width = 0;
		if (Number.isNaN(height)) height = 0;
		Object.assign(swiper, {
			width,
			height,
			size: swiper.isHorizontal() ? width : height
		});
	}
	function updateSlides() {
		const swiper = this;
		function getDirectionLabel(property) {
			if (swiper.isHorizontal()) return property;
			return {
				width: "height",
				"margin-top": "margin-left",
				"margin-bottom ": "margin-right",
				"margin-left": "margin-top",
				"margin-right": "margin-bottom",
				"padding-left": "padding-top",
				"padding-right": "padding-bottom",
				marginRight: "marginBottom"
			}[property];
		}
		function getDirectionPropertyValue(node, label) {
			return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
		}
		const params = swiper.params;
		const { $wrapperEl, size: swiperSize, rtlTranslate: rtl, wrongRTL } = swiper;
		const isVirtual = swiper.virtual && params.virtual.enabled;
		const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
		const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
		const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
		let snapGrid = [];
		const slidesGrid = [];
		const slidesSizesGrid = [];
		let offsetBefore = params.slidesOffsetBefore;
		if (typeof offsetBefore === "function") offsetBefore = params.slidesOffsetBefore.call(swiper);
		let offsetAfter = params.slidesOffsetAfter;
		if (typeof offsetAfter === "function") offsetAfter = params.slidesOffsetAfter.call(swiper);
		const previousSnapGridLength = swiper.snapGrid.length;
		const previousSlidesGridLength = swiper.slidesGrid.length;
		let spaceBetween = params.spaceBetween;
		let slidePosition = -offsetBefore;
		let prevSlideSize = 0;
		let index = 0;
		if (typeof swiperSize === "undefined") return;
		if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
		swiper.virtualSize = -spaceBetween;
		if (rtl) slides.css({
			marginLeft: "",
			marginBottom: "",
			marginTop: ""
		}); else slides.css({
			marginRight: "",
			marginBottom: "",
			marginTop: ""
		});
		if (params.centeredSlides && params.cssMode) {
			utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", "");
			utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", "");
		}
		const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
		if (gridEnabled) swiper.grid.initSlides(slidesLength);
		let slideSize;
		const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key => typeof params.breakpoints[key].slidesPerView !== "undefined")).length > 0;
		for (let i = 0; i < slidesLength; i += 1) {
			slideSize = 0;
			const slide = slides.eq(i);
			if (gridEnabled) swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
			if (slide.css("display") === "none") continue;
			if (params.slidesPerView === "auto") {
				if (shouldResetSlideSize) slides[i].style[getDirectionLabel("width")] = ``;
				const slideStyles = getComputedStyle(slide[0]);
				const currentTransform = slide[0].style.transform;
				const currentWebKitTransform = slide[0].style.webkitTransform;
				if (currentTransform) slide[0].style.transform = "none";
				if (currentWebKitTransform) slide[0].style.webkitTransform = "none";
				if (params.roundLengths) slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true); else {
					const width = getDirectionPropertyValue(slideStyles, "width");
					const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
					const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
					const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
					const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
					const boxSizing = slideStyles.getPropertyValue("box-sizing");
					if (boxSizing && boxSizing === "border-box") slideSize = width + marginLeft + marginRight; else {
						const { clientWidth, offsetWidth } = slide[0];
						slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
					}
				}
				if (currentTransform) slide[0].style.transform = currentTransform;
				if (currentWebKitTransform) slide[0].style.webkitTransform = currentWebKitTransform;
				if (params.roundLengths) slideSize = Math.floor(slideSize);
			} else {
				slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
				if (params.roundLengths) slideSize = Math.floor(slideSize);
				if (slides[i]) slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
			}
			if (slides[i]) slides[i].swiperSlideSize = slideSize;
			slidesSizesGrid.push(slideSize);
			if (params.centeredSlides) {
				slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
				if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
				if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
				if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
				if (params.roundLengths) slidePosition = Math.floor(slidePosition);
				if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
				slidesGrid.push(slidePosition);
			} else {
				if (params.roundLengths) slidePosition = Math.floor(slidePosition);
				if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
				slidesGrid.push(slidePosition);
				slidePosition = slidePosition + slideSize + spaceBetween;
			}
			swiper.virtualSize += slideSize + spaceBetween;
			prevSlideSize = slideSize;
			index += 1;
		}
		swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
		if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) $wrapperEl.css({
			width: `${swiper.virtualSize + params.spaceBetween}px`
		});
		if (params.setWrapperSize) $wrapperEl.css({
			[getDirectionLabel("width")]: `${swiper.virtualSize + params.spaceBetween}px`
		});
		if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
		if (!params.centeredSlides) {
			const newSlidesGrid = [];
			for (let i = 0; i < snapGrid.length; i += 1) {
				let slidesGridItem = snapGrid[i];
				if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
				if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
			}
			snapGrid = newSlidesGrid;
			if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
		}
		if (snapGrid.length === 0) snapGrid = [0];
		if (params.spaceBetween !== 0) {
			const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
			slides.filter(((_, slideIndex) => {
				if (!params.cssMode) return true;
				if (slideIndex === slides.length - 1) return false;
				return true;
			})).css({
				[key]: `${spaceBetween}px`
			});
		}
		if (params.centeredSlides && params.centeredSlidesBounds) {
			let allSlidesSize = 0;
			slidesSizesGrid.forEach((slideSizeValue => {
				allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
			}));
			allSlidesSize -= params.spaceBetween;
			const maxSnap = allSlidesSize - swiperSize;
			snapGrid = snapGrid.map((snap => {
				if (snap < 0) return -offsetBefore;
				if (snap > maxSnap) return maxSnap + offsetAfter;
				return snap;
			}));
		}
		if (params.centerInsufficientSlides) {
			let allSlidesSize = 0;
			slidesSizesGrid.forEach((slideSizeValue => {
				allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
			}));
			allSlidesSize -= params.spaceBetween;
			if (allSlidesSize < swiperSize) {
				const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
				snapGrid.forEach(((snap, snapIndex) => {
					snapGrid[snapIndex] = snap - allSlidesOffset;
				}));
				slidesGrid.forEach(((snap, snapIndex) => {
					slidesGrid[snapIndex] = snap + allSlidesOffset;
				}));
			}
		}
		Object.assign(swiper, {
			slides,
			snapGrid,
			slidesGrid,
			slidesSizesGrid
		});
		if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
			utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
			utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
			const addToSnapGrid = -swiper.snapGrid[0];
			const addToSlidesGrid = -swiper.slidesGrid[0];
			swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
			swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
		}
		if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
		if (snapGrid.length !== previousSnapGridLength) {
			if (swiper.params.watchOverflow) swiper.checkOverflow();
			swiper.emit("snapGridLengthChange");
		}
		if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
		if (params.watchSlidesProgress) swiper.updateSlidesOffset();
		if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
			const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
			const hasClassBackfaceClassAdded = swiper.$el.hasClass(backFaceHiddenClass);
			if (slidesLength <= params.maxBackfaceHiddenSlides) {
				if (!hasClassBackfaceClassAdded) swiper.$el.addClass(backFaceHiddenClass);
			} else if (hasClassBackfaceClassAdded) swiper.$el.removeClass(backFaceHiddenClass);
		}
	}
	function updateAutoHeight(speed) {
		const swiper = this;
		const activeSlides = [];
		const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
		let newHeight = 0;
		let i;
		if (typeof speed === "number") swiper.setTransition(speed); else if (speed === true) swiper.setTransition(swiper.params.speed);
		const getSlideByIndex = index => {
			if (isVirtual) return swiper.slides.filter((el => parseInt(el.getAttribute("data-swiper-slide-index"), 10) === index))[0];
			return swiper.slides.eq(index)[0];
		};
		if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || dom([])).each((slide => {
			activeSlides.push(slide);
		})); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
			const index = swiper.activeIndex + i;
			if (index > swiper.slides.length && !isVirtual) break;
			activeSlides.push(getSlideByIndex(index));
		} else activeSlides.push(getSlideByIndex(swiper.activeIndex));
		for (i = 0; i < activeSlides.length; i += 1) if (typeof activeSlides[i] !== "undefined") {
			const height = activeSlides[i].offsetHeight;
			newHeight = height > newHeight ? height : newHeight;
		}
		if (newHeight || newHeight === 0) swiper.$wrapperEl.css("height", `${newHeight}px`);
	}
	function updateSlidesOffset() {
		const swiper = this;
		const slides = swiper.slides;
		for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
	}
	function updateSlidesProgress(translate = this && this.translate || 0) {
		const swiper = this;
		const params = swiper.params;
		const { slides, rtlTranslate: rtl, snapGrid } = swiper;
		if (slides.length === 0) return;
		if (typeof slides[0].swiperSlideOffset === "undefined") swiper.updateSlidesOffset();
		let offsetCenter = -translate;
		if (rtl) offsetCenter = translate;
		slides.removeClass(params.slideVisibleClass);
		swiper.visibleSlidesIndexes = [];
		swiper.visibleSlides = [];
		for (let i = 0; i < slides.length; i += 1) {
			const slide = slides[i];
			let slideOffset = slide.swiperSlideOffset;
			if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
			const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
			const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
			const slideBefore = -(offsetCenter - slideOffset);
			const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
			const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
			if (isVisible) {
				swiper.visibleSlides.push(slide);
				swiper.visibleSlidesIndexes.push(i);
				slides.eq(i).addClass(params.slideVisibleClass);
			}
			slide.progress = rtl ? -slideProgress : slideProgress;
			slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
		}
		swiper.visibleSlides = dom(swiper.visibleSlides);
	}
	function updateProgress(translate) {
		const swiper = this;
		if (typeof translate === "undefined") {
			const multiplier = swiper.rtlTranslate ? -1 : 1;
			translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
		}
		const params = swiper.params;
		const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
		let { progress, isBeginning, isEnd } = swiper;
		const wasBeginning = isBeginning;
		const wasEnd = isEnd;
		if (translatesDiff === 0) {
			progress = 0;
			isBeginning = true;
			isEnd = true;
		} else {
			progress = (translate - swiper.minTranslate()) / translatesDiff;
			isBeginning = progress <= 0;
			isEnd = progress >= 1;
		}
		Object.assign(swiper, {
			progress,
			isBeginning,
			isEnd
		});
		if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
		if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
		if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
		if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
		swiper.emit("progress", progress);
	}
	function updateSlidesClasses() {
		const swiper = this;
		const { slides, params, $wrapperEl, activeIndex, realIndex } = swiper;
		const isVirtual = swiper.virtual && params.virtual.enabled;
		slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
		let activeSlide;
		if (isVirtual) activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`); else activeSlide = slides.eq(activeIndex);
		activeSlide.addClass(params.slideActiveClass);
		if (params.loop) if (activeSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
		let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);
		if (params.loop && nextSlide.length === 0) {
			nextSlide = slides.eq(0);
			nextSlide.addClass(params.slideNextClass);
		}
		let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);
		if (params.loop && prevSlide.length === 0) {
			prevSlide = slides.eq(-1);
			prevSlide.addClass(params.slidePrevClass);
		}
		if (params.loop) {
			if (nextSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass);
			if (prevSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass);
		}
		swiper.emitSlidesClasses();
	}
	function updateActiveIndex(newActiveIndex) {
		const swiper = this;
		const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
		const { slidesGrid, snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex } = swiper;
		let activeIndex = newActiveIndex;
		let snapIndex;
		if (typeof activeIndex === "undefined") {
			for (let i = 0; i < slidesGrid.length; i += 1) if (typeof slidesGrid[i + 1] !== "undefined") {
				if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
			} else if (translate >= slidesGrid[i]) activeIndex = i;
			if (params.normalizeSlideIndex) if (activeIndex < 0 || typeof activeIndex === "undefined") activeIndex = 0;
		}
		if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
			const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
			snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
		}
		if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
		if (activeIndex === previousIndex) {
			if (snapIndex !== previousSnapIndex) {
				swiper.snapIndex = snapIndex;
				swiper.emit("snapIndexChange");
			}
			return;
		}
		const realIndex = parseInt(swiper.slides.eq(activeIndex).attr("data-swiper-slide-index") || activeIndex, 10);
		Object.assign(swiper, {
			snapIndex,
			realIndex,
			previousIndex,
			activeIndex
		});
		swiper.emit("activeIndexChange");
		swiper.emit("snapIndexChange");
		if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
		if (swiper.initialized || swiper.params.runCallbacksOnInit) swiper.emit("slideChange");
	}
	function updateClickedSlide(e) {
		const swiper = this;
		const params = swiper.params;
		const slide = dom(e).closest(`.${params.slideClass}`)[0];
		let slideFound = false;
		let slideIndex;
		if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
			slideFound = true;
			slideIndex = i;
			break;
		}
		if (slide && slideFound) {
			swiper.clickedSlide = slide;
			if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(dom(slide).attr("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
		} else {
			swiper.clickedSlide = void 0;
			swiper.clickedIndex = void 0;
			return;
		}
		if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
	}
	const update = {
		updateSize,
		updateSlides,
		updateAutoHeight,
		updateSlidesOffset,
		updateSlidesProgress,
		updateProgress,
		updateSlidesClasses,
		updateActiveIndex,
		updateClickedSlide
	};
	function getSwiperTranslate(axis = (this.isHorizontal() ? "x" : "y")) {
		const swiper = this;
		const { params, rtlTranslate: rtl, translate, $wrapperEl } = swiper;
		if (params.virtualTranslate) return rtl ? -translate : translate;
		if (params.cssMode) return translate;
		let currentTranslate = utils_getTranslate($wrapperEl[0], axis);
		if (rtl) currentTranslate = -currentTranslate;
		return currentTranslate || 0;
	}
	function setTranslate(translate, byController) {
		const swiper = this;
		const { rtlTranslate: rtl, params, $wrapperEl, wrapperEl, progress } = swiper;
		let x = 0;
		let y = 0;
		const z = 0;
		if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
		if (params.roundLengths) {
			x = Math.floor(x);
			y = Math.floor(y);
		}
		if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
		swiper.previousTranslate = swiper.translate;
		swiper.translate = swiper.isHorizontal() ? x : y;
		let newProgress;
		const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
		if (translatesDiff === 0) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
		if (newProgress !== progress) swiper.updateProgress(translate);
		swiper.emit("setTranslate", swiper.translate, byController);
	}
	function minTranslate() {
		return -this.snapGrid[0];
	}
	function maxTranslate() {
		return -this.snapGrid[this.snapGrid.length - 1];
	}
	function translateTo(translate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
		const swiper = this;
		const { params, wrapperEl } = swiper;
		if (swiper.animating && params.preventInteractionOnTransition) return false;
		const minTranslate = swiper.minTranslate();
		const maxTranslate = swiper.maxTranslate();
		let newTranslate;
		if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
		swiper.updateProgress(newTranslate);
		if (params.cssMode) {
			const isH = swiper.isHorizontal();
			if (speed === 0) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
				if (!swiper.support.smoothScroll) {
					animateCSSModeScroll({
						swiper,
						targetPosition: -newTranslate,
						side: isH ? "left" : "top"
					});
					return true;
				}
				wrapperEl.scrollTo({
					[isH ? "left" : "top"]: -newTranslate,
					behavior: "smooth"
				});
			}
			return true;
		}
		if (speed === 0) {
			swiper.setTransition(0);
			swiper.setTranslate(newTranslate);
			if (runCallbacks) {
				swiper.emit("beforeTransitionStart", speed, internal);
				swiper.emit("transitionEnd");
			}
		} else {
			swiper.setTransition(speed);
			swiper.setTranslate(newTranslate);
			if (runCallbacks) {
				swiper.emit("beforeTransitionStart", speed, internal);
				swiper.emit("transitionStart");
			}
			if (!swiper.animating) {
				swiper.animating = true;
				if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
					if (!swiper || swiper.destroyed) return;
					if (e.target !== this) return;
					swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
					swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
					swiper.onTranslateToWrapperTransitionEnd = null;
					delete swiper.onTranslateToWrapperTransitionEnd;
					if (runCallbacks) swiper.emit("transitionEnd");
				};
				swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
				swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
			}
		}
		return true;
	}
	const translate = {
		getTranslate: getSwiperTranslate,
		setTranslate,
		minTranslate,
		maxTranslate,
		translateTo
	};
	function setTransition(duration, byController) {
		const swiper = this;
		if (!swiper.params.cssMode) swiper.$wrapperEl.transition(duration);
		swiper.emit("setTransition", duration, byController);
	}
	function transitionEmit({ swiper, runCallbacks, direction, step }) {
		const { activeIndex, previousIndex } = swiper;
		let dir = direction;
		if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
		swiper.emit(`transition${step}`);
		if (runCallbacks && activeIndex !== previousIndex) {
			if (dir === "reset") {
				swiper.emit(`slideResetTransition${step}`);
				return;
			}
			swiper.emit(`slideChangeTransition${step}`);
			if (dir === "next") swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
		}
	}
	function transitionStart_transitionStart(runCallbacks = true, direction) {
		const swiper = this;
		const { params } = swiper;
		if (params.cssMode) return;
		if (params.autoHeight) swiper.updateAutoHeight();
		transitionEmit({
			swiper,
			runCallbacks,
			direction,
			step: "Start"
		});
	}
	function transitionEnd_transitionEnd(runCallbacks = true, direction) {
		const swiper = this;
		const { params } = swiper;
		swiper.animating = false;
		if (params.cssMode) return;
		swiper.setTransition(0);
		transitionEmit({
			swiper,
			runCallbacks,
			direction,
			step: "End"
		});
	}
	const core_transition = {
		setTransition,
		transitionStart: transitionStart_transitionStart,
		transitionEnd: transitionEnd_transitionEnd
	};
	function slideTo(index = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
		if (typeof index !== "number" && typeof index !== "string") throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`);
		if (typeof index === "string") {
			const indexAsNumber = parseInt(index, 10);
			const isValidNumber = isFinite(indexAsNumber);
			if (!isValidNumber) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
			index = indexAsNumber;
		}
		const swiper = this;
		let slideIndex = index;
		if (slideIndex < 0) slideIndex = 0;
		const { params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled } = swiper;
		if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) return false;
		const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
		let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
		if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
		const translate = -snapGrid[snapIndex];
		if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
			const normalizedTranslate = -Math.floor(translate * 100);
			const normalizedGrid = Math.floor(slidesGrid[i] * 100);
			const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
			if (typeof slidesGrid[i + 1] !== "undefined") {
				if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
			} else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
		}
		if (swiper.initialized && slideIndex !== activeIndex) {
			if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) return false;
			if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
		}
		if (slideIndex !== (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
		swiper.updateProgress(translate);
		let direction;
		if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
		if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
			swiper.updateActiveIndex(slideIndex);
			if (params.autoHeight) swiper.updateAutoHeight();
			swiper.updateSlidesClasses();
			if (params.effect !== "slide") swiper.setTranslate(translate);
			if (direction !== "reset") {
				swiper.transitionStart(runCallbacks, direction);
				swiper.transitionEnd(runCallbacks, direction);
			}
			return false;
		}
		if (params.cssMode) {
			const isH = swiper.isHorizontal();
			const t = rtl ? translate : -translate;
			if (speed === 0) {
				const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
				if (isVirtual) {
					swiper.wrapperEl.style.scrollSnapType = "none";
					swiper._immediateVirtual = true;
				}
				wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
				if (isVirtual) requestAnimationFrame((() => {
					swiper.wrapperEl.style.scrollSnapType = "";
					swiper._swiperImmediateVirtual = false;
				}));
			} else {
				if (!swiper.support.smoothScroll) {
					animateCSSModeScroll({
						swiper,
						targetPosition: t,
						side: isH ? "left" : "top"
					});
					return true;
				}
				wrapperEl.scrollTo({
					[isH ? "left" : "top"]: t,
					behavior: "smooth"
				});
			}
			return true;
		}
		swiper.setTransition(speed);
		swiper.setTranslate(translate);
		swiper.updateActiveIndex(slideIndex);
		swiper.updateSlidesClasses();
		swiper.emit("beforeTransitionStart", speed, internal);
		swiper.transitionStart(runCallbacks, direction);
		if (speed === 0) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
			swiper.animating = true;
			if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
				if (!swiper || swiper.destroyed) return;
				if (e.target !== this) return;
				swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
				swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
				swiper.onSlideToWrapperTransitionEnd = null;
				delete swiper.onSlideToWrapperTransitionEnd;
				swiper.transitionEnd(runCallbacks, direction);
			};
			swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
			swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
		}
		return true;
	}
	function slideToLoop(index = 0, speed = this.params.speed, runCallbacks = true, internal) {
		if (typeof index === "string") {
			const indexAsNumber = parseInt(index, 10);
			const isValidNumber = isFinite(indexAsNumber);
			if (!isValidNumber) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
			index = indexAsNumber;
		}
		const swiper = this;
		let newIndex = index;
		if (swiper.params.loop) newIndex += swiper.loopedSlides;
		return swiper.slideTo(newIndex, speed, runCallbacks, internal);
	}
	function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
		const swiper = this;
		const { animating, enabled, params } = swiper;
		if (!enabled) return swiper;
		let perGroup = params.slidesPerGroup;
		if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
		const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
		if (params.loop) {
			if (animating && params.loopPreventsSlide) return false;
			swiper.loopFix();
			swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
		}
		if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
		return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
	}
	function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
		const swiper = this;
		const { params, animating, snapGrid, slidesGrid, rtlTranslate, enabled } = swiper;
		if (!enabled) return swiper;
		if (params.loop) {
			if (animating && params.loopPreventsSlide) return false;
			swiper.loopFix();
			swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
		}
		const translate = rtlTranslate ? swiper.translate : -swiper.translate;
		function normalize(val) {
			if (val < 0) return -Math.floor(Math.abs(val));
			return Math.floor(val);
		}
		const normalizedTranslate = normalize(translate);
		const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
		let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
		if (typeof prevSnap === "undefined" && params.cssMode) {
			let prevSnapIndex;
			snapGrid.forEach(((snap, snapIndex) => {
				if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
			}));
			if (typeof prevSnapIndex !== "undefined") prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
		}
		let prevIndex = 0;
		if (typeof prevSnap !== "undefined") {
			prevIndex = slidesGrid.indexOf(prevSnap);
			if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
			if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
				prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
				prevIndex = Math.max(prevIndex, 0);
			}
		}
		if (params.rewind && swiper.isBeginning) {
			const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
			return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
		}
		return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
	}
	function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
		const swiper = this;
		return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
	}
	function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = .5) {
		const swiper = this;
		let index = swiper.activeIndex;
		const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
		const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
		const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
		if (translate >= swiper.snapGrid[snapIndex]) {
			const currentSnap = swiper.snapGrid[snapIndex];
			const nextSnap = swiper.snapGrid[snapIndex + 1];
			if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
		} else {
			const prevSnap = swiper.snapGrid[snapIndex - 1];
			const currentSnap = swiper.snapGrid[snapIndex];
			if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
		}
		index = Math.max(index, 0);
		index = Math.min(index, swiper.slidesGrid.length - 1);
		return swiper.slideTo(index, speed, runCallbacks, internal);
	}
	function slideToClickedSlide() {
		const swiper = this;
		const { params, $wrapperEl } = swiper;
		const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
		let slideToIndex = swiper.clickedIndex;
		let realIndex;
		if (params.loop) {
			if (swiper.animating) return;
			realIndex = parseInt(dom(swiper.clickedSlide).attr("data-swiper-slide-index"), 10);
			if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
				swiper.loopFix();
				slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
				utils_nextTick((() => {
					swiper.slideTo(slideToIndex);
				}));
			} else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
				swiper.loopFix();
				slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
				utils_nextTick((() => {
					swiper.slideTo(slideToIndex);
				}));
			} else swiper.slideTo(slideToIndex);
		} else swiper.slideTo(slideToIndex);
	}
	const slide = {
		slideTo,
		slideToLoop,
		slideNext,
		slidePrev,
		slideReset,
		slideToClosest,
		slideToClickedSlide
	};
	function loopCreate() {
		const swiper = this;
		const document = ssr_window_esm_getDocument();
		const { params, $wrapperEl } = swiper;
		const $selector = $wrapperEl.children().length > 0 ? dom($wrapperEl.children()[0].parentNode) : $wrapperEl;
		$selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
		let slides = $selector.children(`.${params.slideClass}`);
		if (params.loopFillGroupWithBlank) {
			const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;
			if (blankSlidesNum !== params.slidesPerGroup) {
				for (let i = 0; i < blankSlidesNum; i += 1) {
					const blankNode = dom(document.createElement("div")).addClass(`${params.slideClass} ${params.slideBlankClass}`);
					$selector.append(blankNode);
				}
				slides = $selector.children(`.${params.slideClass}`);
			}
		}
		if (params.slidesPerView === "auto" && !params.loopedSlides) params.loopedSlides = slides.length;
		swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
		swiper.loopedSlides += params.loopAdditionalSlides;
		if (swiper.loopedSlides > slides.length && swiper.params.loopedSlidesLimit) swiper.loopedSlides = slides.length;
		const prependSlides = [];
		const appendSlides = [];
		slides.each(((el, index) => {
			const slide = dom(el);
			slide.attr("data-swiper-slide-index", index);
		}));
		for (let i = 0; i < swiper.loopedSlides; i += 1) {
			const index = i - Math.floor(i / slides.length) * slides.length;
			appendSlides.push(slides.eq(index)[0]);
			prependSlides.unshift(slides.eq(slides.length - index - 1)[0]);
		}
		for (let i = 0; i < appendSlides.length; i += 1) $selector.append(dom(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
		for (let i = prependSlides.length - 1; i >= 0; i -= 1) $selector.prepend(dom(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
	}
	function loopFix() {
		const swiper = this;
		swiper.emit("beforeLoopFix");
		const { activeIndex, slides, loopedSlides, allowSlidePrev, allowSlideNext, snapGrid, rtlTranslate: rtl } = swiper;
		let newIndex;
		swiper.allowSlidePrev = true;
		swiper.allowSlideNext = true;
		const snapTranslate = -snapGrid[activeIndex];
		const diff = snapTranslate - swiper.getTranslate();
		if (activeIndex < loopedSlides) {
			newIndex = slides.length - loopedSlides * 3 + activeIndex;
			newIndex += loopedSlides;
			const slideChanged = swiper.slideTo(newIndex, 0, false, true);
			if (slideChanged && diff !== 0) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
		} else if (activeIndex >= slides.length - loopedSlides) {
			newIndex = -slides.length + activeIndex + loopedSlides;
			newIndex += loopedSlides;
			const slideChanged = swiper.slideTo(newIndex, 0, false, true);
			if (slideChanged && diff !== 0) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
		}
		swiper.allowSlidePrev = allowSlidePrev;
		swiper.allowSlideNext = allowSlideNext;
		swiper.emit("loopFix");
	}
	function loopDestroy() {
		const swiper = this;
		const { $wrapperEl, params, slides } = swiper;
		$wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
		slides.removeAttr("data-swiper-slide-index");
	}
	const loop = {
		loopCreate,
		loopFix,
		loopDestroy
	};
	function setGrabCursor(moving) {
		const swiper = this;
		if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
		const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
		el.style.cursor = "move";
		el.style.cursor = moving ? "grabbing" : "grab";
	}
	function unsetGrabCursor() {
		const swiper = this;
		if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
		swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
	}
	const grab_cursor = {
		setGrabCursor,
		unsetGrabCursor
	};
	function closestElement(selector, base = this) {
		function __closestFrom(el) {
			if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
			if (el.assignedSlot) el = el.assignedSlot;
			const found = el.closest(selector);
			if (!found && !el.getRootNode) return null;
			return found || __closestFrom(el.getRootNode().host);
		}
		return __closestFrom(base);
	}
	function onTouchStart(event) {
		const swiper = this;
		const document = ssr_window_esm_getDocument();
		const window = ssr_window_esm_getWindow();
		const data = swiper.touchEventsData;
		const { params, touches, enabled } = swiper;
		if (!enabled) return;
		if (swiper.animating && params.preventInteractionOnTransition) return;
		if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
		let e = event;
		if (e.originalEvent) e = e.originalEvent;
		let $targetEl = dom(e.target);
		if (params.touchEventsTarget === "wrapper") if (!$targetEl.closest(swiper.wrapperEl).length) return;
		data.isTouchEvent = e.type === "touchstart";
		if (!data.isTouchEvent && "which" in e && e.which === 3) return;
		if (!data.isTouchEvent && "button" in e && e.button > 0) return;
		if (data.isTouched && data.isMoved) return;
		const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
		const eventPath = event.composedPath ? event.composedPath() : event.path;
		if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) $targetEl = dom(eventPath[0]);
		const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
		const isTargetShadow = !!(e.target && e.target.shadowRoot);
		if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, $targetEl[0]) : $targetEl.closest(noSwipingSelector)[0])) {
			swiper.allowClick = true;
			return;
		}
		if (params.swipeHandler) if (!$targetEl.closest(params.swipeHandler)[0]) return;
		touches.currentX = e.type === "touchstart" ? e.targetTouches[0].pageX : e.pageX;
		touches.currentY = e.type === "touchstart" ? e.targetTouches[0].pageY : e.pageY;
		const startX = touches.currentX;
		const startY = touches.currentY;
		const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
		const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
		if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) if (edgeSwipeDetection === "prevent") event.preventDefault(); else return;
		Object.assign(data, {
			isTouched: true,
			isMoved: false,
			allowTouchCallbacks: true,
			isScrolling: void 0,
			startMoving: void 0
		});
		touches.startX = startX;
		touches.startY = startY;
		data.touchStartTime = utils_now();
		swiper.allowClick = true;
		swiper.updateSize();
		swiper.swipeDirection = void 0;
		if (params.threshold > 0) data.allowThresholdMove = false;
		if (e.type !== "touchstart") {
			let preventDefault = true;
			if ($targetEl.is(data.focusableElements)) {
				preventDefault = false;
				if ($targetEl[0].nodeName === "SELECT") data.isTouched = false;
			}
			if (document.activeElement && dom(document.activeElement).is(data.focusableElements) && document.activeElement !== $targetEl[0]) document.activeElement.blur();
			const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
			if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) e.preventDefault();
		}
		if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
		swiper.emit("touchStart", e);
	}
	function onTouchMove(event) {
		const document = ssr_window_esm_getDocument();
		const swiper = this;
		const data = swiper.touchEventsData;
		const { params, touches, rtlTranslate: rtl, enabled } = swiper;
		if (!enabled) return;
		let e = event;
		if (e.originalEvent) e = e.originalEvent;
		if (!data.isTouched) {
			if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
			return;
		}
		if (data.isTouchEvent && e.type !== "touchmove") return;
		const targetTouch = e.type === "touchmove" && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
		const pageX = e.type === "touchmove" ? targetTouch.pageX : e.pageX;
		const pageY = e.type === "touchmove" ? targetTouch.pageY : e.pageY;
		if (e.preventedByNestedSwiper) {
			touches.startX = pageX;
			touches.startY = pageY;
			return;
		}
		if (!swiper.allowTouchMove) {
			if (!dom(e.target).is(data.focusableElements)) swiper.allowClick = false;
			if (data.isTouched) {
				Object.assign(touches, {
					startX: pageX,
					startY: pageY,
					currentX: pageX,
					currentY: pageY
				});
				data.touchStartTime = utils_now();
			}
			return;
		}
		if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
			if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
				data.isTouched = false;
				data.isMoved = false;
				return;
			}
		} else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) return;
		if (data.isTouchEvent && document.activeElement) if (e.target === document.activeElement && dom(e.target).is(data.focusableElements)) {
			data.isMoved = true;
			swiper.allowClick = false;
			return;
		}
		if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
		if (e.targetTouches && e.targetTouches.length > 1) return;
		touches.currentX = pageX;
		touches.currentY = pageY;
		const diffX = touches.currentX - touches.startX;
		const diffY = touches.currentY - touches.startY;
		if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
		if (typeof data.isScrolling === "undefined") {
			let touchAngle;
			if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
				touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
				data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
			}
		}
		if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
		if (typeof data.startMoving === "undefined") if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
		if (data.isScrolling) {
			data.isTouched = false;
			return;
		}
		if (!data.startMoving) return;
		swiper.allowClick = false;
		if (!params.cssMode && e.cancelable) e.preventDefault();
		if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
		if (!data.isMoved) {
			if (params.loop && !params.cssMode) swiper.loopFix();
			data.startTranslate = swiper.getTranslate();
			swiper.setTransition(0);
			if (swiper.animating) swiper.$wrapperEl.trigger("webkitTransitionEnd transitionend");
			data.allowMomentumBounce = false;
			if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(true);
			swiper.emit("sliderFirstMove", e);
		}
		swiper.emit("sliderMove", e);
		data.isMoved = true;
		let diff = swiper.isHorizontal() ? diffX : diffY;
		touches.diff = diff;
		diff *= params.touchRatio;
		if (rtl) diff = -diff;
		swiper.swipeDirection = diff > 0 ? "prev" : "next";
		data.currentTranslate = diff + data.startTranslate;
		let disableParentSwiper = true;
		let resistanceRatio = params.resistanceRatio;
		if (params.touchReleaseOnEdges) resistanceRatio = 0;
		if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
			disableParentSwiper = false;
			if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
		} else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
			disableParentSwiper = false;
			if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
		}
		if (disableParentSwiper) e.preventedByNestedSwiper = true;
		if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
		if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
		if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
		if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
			if (!data.allowThresholdMove) {
				data.allowThresholdMove = true;
				touches.startX = touches.currentX;
				touches.startY = touches.currentY;
				data.currentTranslate = data.startTranslate;
				touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
				return;
			}
		} else {
			data.currentTranslate = data.startTranslate;
			return;
		}
		if (!params.followFinger || params.cssMode) return;
		if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
			swiper.updateActiveIndex();
			swiper.updateSlidesClasses();
		}
		if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
		swiper.updateProgress(data.currentTranslate);
		swiper.setTranslate(data.currentTranslate);
	}
	function onTouchEnd(event) {
		const swiper = this;
		const data = swiper.touchEventsData;
		const { params, touches, rtlTranslate: rtl, slidesGrid, enabled } = swiper;
		if (!enabled) return;
		let e = event;
		if (e.originalEvent) e = e.originalEvent;
		if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
		data.allowTouchCallbacks = false;
		if (!data.isTouched) {
			if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
			data.isMoved = false;
			data.startMoving = false;
			return;
		}
		if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(false);
		const touchEndTime = utils_now();
		const timeDiff = touchEndTime - data.touchStartTime;
		if (swiper.allowClick) {
			const pathTree = e.path || e.composedPath && e.composedPath();
			swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
			swiper.emit("tap click", e);
			if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
		}
		data.lastClickTime = utils_now();
		utils_nextTick((() => {
			if (!swiper.destroyed) swiper.allowClick = true;
		}));
		if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
			data.isTouched = false;
			data.isMoved = false;
			data.startMoving = false;
			return;
		}
		data.isTouched = false;
		data.isMoved = false;
		data.startMoving = false;
		let currentPos;
		if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
		if (params.cssMode) return;
		if (swiper.params.freeMode && params.freeMode.enabled) {
			swiper.freeMode.onTouchEnd({
				currentPos
			});
			return;
		}
		let stopIndex = 0;
		let groupSize = swiper.slidesSizesGrid[0];
		for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
			const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
			if (typeof slidesGrid[i + increment] !== "undefined") {
				if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
					stopIndex = i;
					groupSize = slidesGrid[i + increment] - slidesGrid[i];
				}
			} else if (currentPos >= slidesGrid[i]) {
				stopIndex = i;
				groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
			}
		}
		let rewindFirstIndex = null;
		let rewindLastIndex = null;
		if (params.rewind) if (swiper.isBeginning) rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
		const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
		const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
		if (timeDiff > params.longSwipesMs) {
			if (!params.longSwipes) {
				swiper.slideTo(swiper.activeIndex);
				return;
			}
			if (swiper.swipeDirection === "next") if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
			if (swiper.swipeDirection === "prev") if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
		} else {
			if (!params.shortSwipes) {
				swiper.slideTo(swiper.activeIndex);
				return;
			}
			const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
			if (!isNavButtonTarget) {
				if (swiper.swipeDirection === "next") swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
				if (swiper.swipeDirection === "prev") swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
			} else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
		}
	}
	function onResize() {
		const swiper = this;
		const { params, el } = swiper;
		if (el && el.offsetWidth === 0) return;
		if (params.breakpoints) swiper.setBreakpoint();
		const { allowSlideNext, allowSlidePrev, snapGrid } = swiper;
		swiper.allowSlideNext = true;
		swiper.allowSlidePrev = true;
		swiper.updateSize();
		swiper.updateSlides();
		swiper.updateSlidesClasses();
		if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
		if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.run();
		swiper.allowSlidePrev = allowSlidePrev;
		swiper.allowSlideNext = allowSlideNext;
		if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
	}
	function onClick(e) {
		const swiper = this;
		if (!swiper.enabled) return;
		if (!swiper.allowClick) {
			if (swiper.params.preventClicks) e.preventDefault();
			if (swiper.params.preventClicksPropagation && swiper.animating) {
				e.stopPropagation();
				e.stopImmediatePropagation();
			}
		}
	}
	function onScroll() {
		const swiper = this;
		const { wrapperEl, rtlTranslate, enabled } = swiper;
		if (!enabled) return;
		swiper.previousTranslate = swiper.translate;
		if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
		if (swiper.translate === 0) swiper.translate = 0;
		swiper.updateActiveIndex();
		swiper.updateSlidesClasses();
		let newProgress;
		const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
		if (translatesDiff === 0) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
		if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
		swiper.emit("setTranslate", swiper.translate, false);
	}
	let dummyEventAttached = false;
	function dummyEventListener() { }
	const events = (swiper, method) => {
		const document = ssr_window_esm_getDocument();
		const { params, touchEvents, el, wrapperEl, device, support } = swiper;
		const capture = !!params.nested;
		const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
		const swiperMethod = method;
		if (!support.touch) {
			el[domMethod](touchEvents.start, swiper.onTouchStart, false);
			document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
			document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
		} else {
			const passiveListener = touchEvents.start === "touchstart" && support.passiveListener && params.passiveListeners ? {
				passive: true,
				capture: false
			} : false;
			el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
			el[domMethod](touchEvents.move, swiper.onTouchMove, support.passiveListener ? {
				passive: false,
				capture
			} : capture);
			el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);
			if (touchEvents.cancel) el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
		}
		if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
		if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
		if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
	};
	function attachEvents() {
		const swiper = this;
		const document = ssr_window_esm_getDocument();
		const { params, support } = swiper;
		swiper.onTouchStart = onTouchStart.bind(swiper);
		swiper.onTouchMove = onTouchMove.bind(swiper);
		swiper.onTouchEnd = onTouchEnd.bind(swiper);
		if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
		swiper.onClick = onClick.bind(swiper);
		if (support.touch && !dummyEventAttached) {
			document.addEventListener("touchstart", dummyEventListener);
			dummyEventAttached = true;
		}
		events(swiper, "on");
	}
	function detachEvents() {
		const swiper = this;
		events(swiper, "off");
	}
	const core_events = {
		attachEvents,
		detachEvents
	};
	const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
	function setBreakpoint() {
		const swiper = this;
		const { activeIndex, initialized, loopedSlides = 0, params, $el } = swiper;
		const breakpoints = params.breakpoints;
		if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return;
		const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
		if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
		const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
		const breakpointParams = breakpointOnlyParams || swiper.originalParams;
		const wasMultiRow = isGridEnabled(swiper, params);
		const isMultiRow = isGridEnabled(swiper, breakpointParams);
		const wasEnabled = params.enabled;
		if (wasMultiRow && !isMultiRow) {
			$el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
			swiper.emitContainerClasses();
		} else if (!wasMultiRow && isMultiRow) {
			$el.addClass(`${params.containerModifierClass}grid`);
			if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") $el.addClass(`${params.containerModifierClass}grid-column`);
			swiper.emitContainerClasses();
		}
		["navigation", "pagination", "scrollbar"].forEach((prop => {
			const wasModuleEnabled = params[prop] && params[prop].enabled;
			const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
			if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
			if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
		}));
		const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
		const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
		if (directionChanged && initialized) swiper.changeDirection();
		utils_extend(swiper.params, breakpointParams);
		const isEnabled = swiper.params.enabled;
		Object.assign(swiper, {
			allowTouchMove: swiper.params.allowTouchMove,
			allowSlideNext: swiper.params.allowSlideNext,
			allowSlidePrev: swiper.params.allowSlidePrev
		});
		if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
		swiper.currentBreakpoint = breakpoint;
		swiper.emit("_beforeBreakpoint", breakpointParams);
		if (needsReLoop && initialized) {
			swiper.loopDestroy();
			swiper.loopCreate();
			swiper.updateSlides();
			swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
		}
		swiper.emit("breakpoint", breakpointParams);
	}
	function getBreakpoint(breakpoints, base = "window", containerEl) {
		if (!breakpoints || base === "container" && !containerEl) return;
		let breakpoint = false;
		const window = ssr_window_esm_getWindow();
		const currentHeight = base === "window" ? window.innerHeight : containerEl.clientHeight;
		const points = Object.keys(breakpoints).map((point => {
			if (typeof point === "string" && point.indexOf("@") === 0) {
				const minRatio = parseFloat(point.substr(1));
				const value = currentHeight * minRatio;
				return {
					value,
					point
				};
			}
			return {
				value: point,
				point
			};
		}));
		points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
		for (let i = 0; i < points.length; i += 1) {
			const { point, value } = points[i];
			if (base === "window") {
				if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
			} else if (value <= containerEl.clientWidth) breakpoint = point;
		}
		return breakpoint || "max";
	}
	const breakpoints = {
		setBreakpoint,
		getBreakpoint
	};
	function prepareClasses(entries, prefix) {
		const resultClasses = [];
		entries.forEach((item => {
			if (typeof item === "object") Object.keys(item).forEach((classNames => {
				if (item[classNames]) resultClasses.push(prefix + classNames);
			})); else if (typeof item === "string") resultClasses.push(prefix + item);
		}));
		return resultClasses;
	}
	function addClasses() {
		const swiper = this;
		const { classNames, params, rtl, $el, device, support } = swiper;
		const suffixes = prepareClasses(["initialized", params.direction, {
			"pointer-events": !support.touch
		}, {
				"free-mode": swiper.params.freeMode && params.freeMode.enabled
			}, {
				autoheight: params.autoHeight
			}, {
				rtl
			}, {
				grid: params.grid && params.grid.rows > 1
			}, {
				"grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
			}, {
				android: device.android
			}, {
				ios: device.ios
			}, {
				"css-mode": params.cssMode
			}, {
				centered: params.cssMode && params.centeredSlides
			}, {
				"watch-progress": params.watchSlidesProgress
			}], params.containerModifierClass);
		classNames.push(...suffixes);
		$el.addClass([...classNames].join(" "));
		swiper.emitContainerClasses();
	}
	function removeClasses() {
		const swiper = this;
		const { $el, classNames } = swiper;
		$el.removeClass(classNames.join(" "));
		swiper.emitContainerClasses();
	}
	const classes = {
		addClasses,
		removeClasses
	};
	function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
		const window = ssr_window_esm_getWindow();
		let image;
		function onReady() {
			if (callback) callback();
		}
		const isPicture = dom(imageEl).parent("picture")[0];
		if (!isPicture && (!imageEl.complete || !checkForComplete)) if (src) {
			image = new window.Image;
			image.onload = onReady;
			image.onerror = onReady;
			if (sizes) image.sizes = sizes;
			if (srcset) image.srcset = srcset;
			if (src) image.src = src;
		} else onReady(); else onReady();
	}
	function preloadImages() {
		const swiper = this;
		swiper.imagesToLoad = swiper.$el.find("img");
		function onReady() {
			if (typeof swiper === "undefined" || swiper === null || !swiper || swiper.destroyed) return;
			if (swiper.imagesLoaded !== void 0) swiper.imagesLoaded += 1;
			if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
				if (swiper.params.updateOnImagesReady) swiper.update();
				swiper.emit("imagesReady");
			}
		}
		for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
			const imageEl = swiper.imagesToLoad[i];
			swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute("src"), imageEl.srcset || imageEl.getAttribute("srcset"), imageEl.sizes || imageEl.getAttribute("sizes"), true, onReady);
		}
	}
	const core_images = {
		loadImage,
		preloadImages
	};
	function checkOverflow() {
		const swiper = this;
		const { isLocked: wasLocked, params } = swiper;
		const { slidesOffsetBefore } = params;
		if (slidesOffsetBefore) {
			const lastSlideIndex = swiper.slides.length - 1;
			const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
			swiper.isLocked = swiper.size > lastSlideRightEdge;
		} else swiper.isLocked = swiper.snapGrid.length === 1;
		if (params.allowSlideNext === true) swiper.allowSlideNext = !swiper.isLocked;
		if (params.allowSlidePrev === true) swiper.allowSlidePrev = !swiper.isLocked;
		if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
		if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
	}
	const check_overflow = {
		checkOverflow
	};
	const defaults = {
		init: true,
		direction: "horizontal",
		touchEventsTarget: "wrapper",
		initialSlide: 0,
		speed: 300,
		cssMode: false,
		updateOnWindowResize: true,
		resizeObserver: true,
		nested: false,
		createElements: false,
		enabled: true,
		focusableElements: "input, select, option, textarea, button, video, label",
		width: null,
		height: null,
		preventInteractionOnTransition: false,
		userAgent: null,
		url: null,
		edgeSwipeDetection: false,
		edgeSwipeThreshold: 20,
		autoHeight: false,
		setWrapperSize: false,
		virtualTranslate: false,
		effect: "slide",
		breakpoints: void 0,
		breakpointsBase: "window",
		spaceBetween: 0,
		slidesPerView: 1,
		slidesPerGroup: 1,
		slidesPerGroupSkip: 0,
		slidesPerGroupAuto: false,
		centeredSlides: false,
		centeredSlidesBounds: false,
		slidesOffsetBefore: 0,
		slidesOffsetAfter: 0,
		normalizeSlideIndex: true,
		centerInsufficientSlides: false,
		watchOverflow: true,
		roundLengths: false,
		touchRatio: 1,
		touchAngle: 45,
		simulateTouch: true,
		shortSwipes: true,
		longSwipes: true,
		longSwipesRatio: .5,
		longSwipesMs: 300,
		followFinger: true,
		allowTouchMove: true,
		threshold: 0,
		touchMoveStopPropagation: false,
		touchStartPreventDefault: true,
		touchStartForcePreventDefault: false,
		touchReleaseOnEdges: false,
		uniqueNavElements: true,
		resistance: true,
		resistanceRatio: .85,
		watchSlidesProgress: false,
		grabCursor: false,
		preventClicks: true,
		preventClicksPropagation: true,
		slideToClickedSlide: false,
		preloadImages: true,
		updateOnImagesReady: true,
		loop: false,
		loopAdditionalSlides: 0,
		loopedSlides: null,
		loopedSlidesLimit: true,
		loopFillGroupWithBlank: false,
		loopPreventsSlide: true,
		rewind: false,
		allowSlidePrev: true,
		allowSlideNext: true,
		swipeHandler: null,
		noSwiping: true,
		noSwipingClass: "swiper-no-swiping",
		noSwipingSelector: null,
		passiveListeners: true,
		maxBackfaceHiddenSlides: 10,
		containerModifierClass: "swiper-",
		slideClass: "swiper-slide",
		slideBlankClass: "swiper-slide-invisible-blank",
		slideActiveClass: "swiper-slide-active",
		slideDuplicateActiveClass: "swiper-slide-duplicate-active",
		slideVisibleClass: "swiper-slide-visible",
		slideDuplicateClass: "swiper-slide-duplicate",
		slideNextClass: "swiper-slide-next",
		slideDuplicateNextClass: "swiper-slide-duplicate-next",
		slidePrevClass: "swiper-slide-prev",
		slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
		wrapperClass: "swiper-wrapper",
		runCallbacksOnInit: true,
		_emitClasses: false
	};
	function moduleExtendParams(params, allModulesParams) {
		return function extendParams(obj = {}) {
			const moduleParamName = Object.keys(obj)[0];
			const moduleParams = obj[moduleParamName];
			if (typeof moduleParams !== "object" || moduleParams === null) {
				utils_extend(allModulesParams, obj);
				return;
			}
			if (["navigation", "pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) params[moduleParamName] = {
				auto: true
			};
			if (!(moduleParamName in params && "enabled" in moduleParams)) {
				utils_extend(allModulesParams, obj);
				return;
			}
			if (params[moduleParamName] === true) params[moduleParamName] = {
				enabled: true
			};
			if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
			if (!params[moduleParamName]) params[moduleParamName] = {
				enabled: false
			};
			utils_extend(allModulesParams, obj);
		};
	}
	const prototypes = {
		eventsEmitter: events_emitter,
		update,
		translate,
		transition: core_transition,
		slide,
		loop,
		grabCursor: grab_cursor,
		events: core_events,
		breakpoints,
		checkOverflow: check_overflow,
		classes,
		images: core_images
	};
	const extendedDefaults = {};
	class Swiper {
		constructor(...args) {
			let el;
			let params;
			if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") params = args[0]; else[el, params] = args;
			if (!params) params = {};
			params = utils_extend({}, params);
			if (el && !params.el) params.el = el;
			if (params.el && dom(params.el).length > 1) {
				const swipers = [];
				dom(params.el).each((containerEl => {
					const newParams = utils_extend({}, params, {
						el: containerEl
					});
					swipers.push(new Swiper(newParams));
				}));
				return swipers;
			}
			const swiper = this;
			swiper.__swiper__ = true;
			swiper.support = getSupport();
			swiper.device = getDevice({
				userAgent: params.userAgent
			});
			swiper.browser = getBrowser();
			swiper.eventsListeners = {};
			swiper.eventsAnyListeners = [];
			swiper.modules = [...swiper.__modules__];
			if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
			const allModulesParams = {};
			swiper.modules.forEach((mod => {
				mod({
					swiper,
					extendParams: moduleExtendParams(params, allModulesParams),
					on: swiper.on.bind(swiper),
					once: swiper.once.bind(swiper),
					off: swiper.off.bind(swiper),
					emit: swiper.emit.bind(swiper)
				});
			}));
			const swiperParams = utils_extend({}, defaults, allModulesParams);
			swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
			swiper.originalParams = utils_extend({}, swiper.params);
			swiper.passedParams = utils_extend({}, params);
			if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
				swiper.on(eventName, swiper.params.on[eventName]);
			}));
			if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
			swiper.$ = dom;
			Object.assign(swiper, {
				enabled: swiper.params.enabled,
				el,
				classNames: [],
				slides: dom(),
				slidesGrid: [],
				snapGrid: [],
				slidesSizesGrid: [],
				isHorizontal() {
					return swiper.params.direction === "horizontal";
				},
				isVertical() {
					return swiper.params.direction === "vertical";
				},
				activeIndex: 0,
				realIndex: 0,
				isBeginning: true,
				isEnd: false,
				translate: 0,
				previousTranslate: 0,
				progress: 0,
				velocity: 0,
				animating: false,
				allowSlideNext: swiper.params.allowSlideNext,
				allowSlidePrev: swiper.params.allowSlidePrev,
				touchEvents: function touchEvents() {
					const touch = ["touchstart", "touchmove", "touchend", "touchcancel"];
					const desktop = ["pointerdown", "pointermove", "pointerup"];
					swiper.touchEventsTouch = {
						start: touch[0],
						move: touch[1],
						end: touch[2],
						cancel: touch[3]
					};
					swiper.touchEventsDesktop = {
						start: desktop[0],
						move: desktop[1],
						end: desktop[2]
					};
					return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
				}(),
				touchEventsData: {
					isTouched: void 0,
					isMoved: void 0,
					allowTouchCallbacks: void 0,
					touchStartTime: void 0,
					isScrolling: void 0,
					currentTranslate: void 0,
					startTranslate: void 0,
					allowThresholdMove: void 0,
					focusableElements: swiper.params.focusableElements,
					lastClickTime: utils_now(),
					clickTimeout: void 0,
					velocities: [],
					allowMomentumBounce: void 0,
					isTouchEvent: void 0,
					startMoving: void 0
				},
				allowClick: true,
				allowTouchMove: swiper.params.allowTouchMove,
				touches: {
					startX: 0,
					startY: 0,
					currentX: 0,
					currentY: 0,
					diff: 0
				},
				imagesToLoad: [],
				imagesLoaded: 0
			});
			swiper.emit("_swiper");
			if (swiper.params.init) swiper.init();
			return swiper;
		}
		enable() {
			const swiper = this;
			if (swiper.enabled) return;
			swiper.enabled = true;
			if (swiper.params.grabCursor) swiper.setGrabCursor();
			swiper.emit("enable");
		}
		disable() {
			const swiper = this;
			if (!swiper.enabled) return;
			swiper.enabled = false;
			if (swiper.params.grabCursor) swiper.unsetGrabCursor();
			swiper.emit("disable");
		}
		setProgress(progress, speed) {
			const swiper = this;
			progress = Math.min(Math.max(progress, 0), 1);
			const min = swiper.minTranslate();
			const max = swiper.maxTranslate();
			const current = (max - min) * progress + min;
			swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
			swiper.updateActiveIndex();
			swiper.updateSlidesClasses();
		}
		emitContainerClasses() {
			const swiper = this;
			if (!swiper.params._emitClasses || !swiper.el) return;
			const cls = swiper.el.className.split(" ").filter((className => className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0));
			swiper.emit("_containerClasses", cls.join(" "));
		}
		getSlideClasses(slideEl) {
			const swiper = this;
			if (swiper.destroyed) return "";
			return slideEl.className.split(" ").filter((className => className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0)).join(" ");
		}
		emitSlidesClasses() {
			const swiper = this;
			if (!swiper.params._emitClasses || !swiper.el) return;
			const updates = [];
			swiper.slides.each((slideEl => {
				const classNames = swiper.getSlideClasses(slideEl);
				updates.push({
					slideEl,
					classNames
				});
				swiper.emit("_slideClass", slideEl, classNames);
			}));
			swiper.emit("_slideClasses", updates);
		}
		slidesPerViewDynamic(view = "current", exact = false) {
			const swiper = this;
			const { params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex } = swiper;
			let spv = 1;
			if (params.centeredSlides) {
				let slideSize = slides[activeIndex].swiperSlideSize;
				let breakLoop;
				for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
					slideSize += slides[i].swiperSlideSize;
					spv += 1;
					if (slideSize > swiperSize) breakLoop = true;
				}
				for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
					slideSize += slides[i].swiperSlideSize;
					spv += 1;
					if (slideSize > swiperSize) breakLoop = true;
				}
			} else if (view === "current") for (let i = activeIndex + 1; i < slides.length; i += 1) {
				const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
				if (slideInView) spv += 1;
			} else for (let i = activeIndex - 1; i >= 0; i -= 1) {
				const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
				if (slideInView) spv += 1;
			}
			return spv;
		}
		update() {
			const swiper = this;
			if (!swiper || swiper.destroyed) return;
			const { snapGrid, params } = swiper;
			if (params.breakpoints) swiper.setBreakpoint();
			swiper.updateSize();
			swiper.updateSlides();
			swiper.updateProgress();
			swiper.updateSlidesClasses();
			function setTranslate() {
				const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
				const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
				swiper.setTranslate(newTranslate);
				swiper.updateActiveIndex();
				swiper.updateSlidesClasses();
			}
			let translated;
			if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
				setTranslate();
				if (swiper.params.autoHeight) swiper.updateAutoHeight();
			} else {
				if ((swiper.params.slidesPerView === "auto" || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true); else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
				if (!translated) setTranslate();
			}
			if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
			swiper.emit("update");
		}
		changeDirection(newDirection, needUpdate = true) {
			const swiper = this;
			const currentDirection = swiper.params.direction;
			if (!newDirection) newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
			if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") return swiper;
			swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);
			swiper.emitContainerClasses();
			swiper.params.direction = newDirection;
			swiper.slides.each((slideEl => {
				if (newDirection === "vertical") slideEl.style.width = ""; else slideEl.style.height = "";
			}));
			swiper.emit("changeDirection");
			if (needUpdate) swiper.update();
			return swiper;
		}
		changeLanguageDirection(direction) {
			const swiper = this;
			if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr") return;
			swiper.rtl = direction === "rtl";
			swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
			if (swiper.rtl) {
				swiper.$el.addClass(`${swiper.params.containerModifierClass}rtl`);
				swiper.el.dir = "rtl";
			} else {
				swiper.$el.removeClass(`${swiper.params.containerModifierClass}rtl`);
				swiper.el.dir = "ltr";
			}
			swiper.update();
		}
		mount(el) {
			const swiper = this;
			if (swiper.mounted) return true;
			const $el = dom(el || swiper.params.el);
			el = $el[0];
			if (!el) return false;
			el.swiper = swiper;
			const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
			const getWrapper = () => {
				if (el && el.shadowRoot && el.shadowRoot.querySelector) {
					const res = dom(el.shadowRoot.querySelector(getWrapperSelector()));
					res.children = options => $el.children(options);
					return res;
				}
				if (!$el.children) return dom($el).children(getWrapperSelector());
				return $el.children(getWrapperSelector());
			};
			let $wrapperEl = getWrapper();
			if ($wrapperEl.length === 0 && swiper.params.createElements) {
				const document = ssr_window_esm_getDocument();
				const wrapper = document.createElement("div");
				$wrapperEl = dom(wrapper);
				wrapper.className = swiper.params.wrapperClass;
				$el.append(wrapper);
				$el.children(`.${swiper.params.slideClass}`).each((slideEl => {
					$wrapperEl.append(slideEl);
				}));
			}
			Object.assign(swiper, {
				$el,
				el,
				$wrapperEl,
				wrapperEl: $wrapperEl[0],
				mounted: true,
				rtl: el.dir.toLowerCase() === "rtl" || $el.css("direction") === "rtl",
				rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || $el.css("direction") === "rtl"),
				wrongRTL: $wrapperEl.css("display") === "-webkit-box"
			});
			return true;
		}
		init(el) {
			const swiper = this;
			if (swiper.initialized) return swiper;
			const mounted = swiper.mount(el);
			if (mounted === false) return swiper;
			swiper.emit("beforeInit");
			if (swiper.params.breakpoints) swiper.setBreakpoint();
			swiper.addClasses();
			if (swiper.params.loop) swiper.loopCreate();
			swiper.updateSize();
			swiper.updateSlides();
			if (swiper.params.watchOverflow) swiper.checkOverflow();
			if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
			if (swiper.params.preloadImages) swiper.preloadImages();
			if (swiper.params.loop) swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
			swiper.attachEvents();
			swiper.initialized = true;
			swiper.emit("init");
			swiper.emit("afterInit");
			return swiper;
		}
		destroy(deleteInstance = true, cleanStyles = true) {
			const swiper = this;
			const { params, $el, $wrapperEl, slides } = swiper;
			if (typeof swiper.params === "undefined" || swiper.destroyed) return null;
			swiper.emit("beforeDestroy");
			swiper.initialized = false;
			swiper.detachEvents();
			if (params.loop) swiper.loopDestroy();
			if (cleanStyles) {
				swiper.removeClasses();
				$el.removeAttr("style");
				$wrapperEl.removeAttr("style");
				if (slides && slides.length) slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index");
			}
			swiper.emit("destroy");
			Object.keys(swiper.eventsListeners).forEach((eventName => {
				swiper.off(eventName);
			}));
			if (deleteInstance !== false) {
				swiper.$el[0].swiper = null;
				deleteProps(swiper);
			}
			swiper.destroyed = true;
			return null;
		}
		static extendDefaults(newDefaults) {
			utils_extend(extendedDefaults, newDefaults);
		}
		static get extendedDefaults() {
			return extendedDefaults;
		}
		static get defaults() {
			return defaults;
		}
		static installModule(mod) {
			if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
			const modules = Swiper.prototype.__modules__;
			if (typeof mod === "function" && modules.indexOf(mod) < 0) modules.push(mod);
		}
		static use(module) {
			if (Array.isArray(module)) {
				module.forEach((m => Swiper.installModule(m)));
				return Swiper;
			}
			Swiper.installModule(module);
			return Swiper;
		}
	}
	Object.keys(prototypes).forEach((prototypeGroup => {
		Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
			Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
		}));
	}));
	Swiper.use([Resize, Observer]);
	const core = Swiper;
	function Keyboard({ swiper, extendParams, on, emit }) {
		const document = ssr_window_esm_getDocument();
		const window = ssr_window_esm_getWindow();
		swiper.keyboard = {
			enabled: false
		};
		extendParams({
			keyboard: {
				enabled: false,
				onlyInViewport: true,
				pageUpDown: true
			}
		});
		function handle(event) {
			if (!swiper.enabled) return;
			const { rtlTranslate: rtl } = swiper;
			let e = event;
			if (e.originalEvent) e = e.originalEvent;
			const kc = e.keyCode || e.charCode;
			const pageUpDown = swiper.params.keyboard.pageUpDown;
			const isPageUp = pageUpDown && kc === 33;
			const isPageDown = pageUpDown && kc === 34;
			const isArrowLeft = kc === 37;
			const isArrowRight = kc === 39;
			const isArrowUp = kc === 38;
			const isArrowDown = kc === 40;
			if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) return false;
			if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) return false;
			if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) return;
			if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === "input" || document.activeElement.nodeName.toLowerCase() === "textarea")) return;
			if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
				let inView = false;
				if (swiper.$el.parents(`.${swiper.params.slideClass}`).length > 0 && swiper.$el.parents(`.${swiper.params.slideActiveClass}`).length === 0) return;
				const $el = swiper.$el;
				const swiperWidth = $el[0].clientWidth;
				const swiperHeight = $el[0].clientHeight;
				const windowWidth = window.innerWidth;
				const windowHeight = window.innerHeight;
				const swiperOffset = swiper.$el.offset();
				if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
				const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiperWidth, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiperHeight], [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight]];
				for (let i = 0; i < swiperCoord.length; i += 1) {
					const point = swiperCoord[i];
					if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
						if (point[0] === 0 && point[1] === 0) continue;
						inView = true;
					}
				}
				if (!inView) return;
			}
			if (swiper.isHorizontal()) {
				if (isPageUp || isPageDown || isArrowLeft || isArrowRight) if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
				if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl) swiper.slideNext();
				if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl) swiper.slidePrev();
			} else {
				if (isPageUp || isPageDown || isArrowUp || isArrowDown) if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
				if (isPageDown || isArrowDown) swiper.slideNext();
				if (isPageUp || isArrowUp) swiper.slidePrev();
			}
			emit("keyPress", kc);
			return;
		}
		function enable() {
			if (swiper.keyboard.enabled) return;
			dom(document).on("keydown", handle);
			swiper.keyboard.enabled = true;
		}
		function disable() {
			if (!swiper.keyboard.enabled) return;
			dom(document).off("keydown", handle);
			swiper.keyboard.enabled = false;
		}
		on("init", (() => {
			if (swiper.params.keyboard.enabled) enable();
		}));
		on("destroy", (() => {
			if (swiper.keyboard.enabled) disable();
		}));
		Object.assign(swiper.keyboard, {
			enable,
			disable
		});
	}
	function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
		const document = ssr_window_esm_getDocument();
		if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
			if (!params[key] && params.auto === true) {
				let element = swiper.$el.children(`.${checkProps[key]}`)[0];
				if (!element) {
					element = document.createElement("div");
					element.className = checkProps[key];
					swiper.$el.append(element);
				}
				params[key] = element;
				originalParams[key] = element;
			}
		}));
		return params;
	}
	function Navigation({ swiper, extendParams, on, emit }) {
		extendParams({
			navigation: {
				nextEl: null,
				prevEl: null,
				hideOnClick: false,
				disabledClass: "swiper-button-disabled",
				hiddenClass: "swiper-button-hidden",
				lockClass: "swiper-button-lock",
				navigationDisabledClass: "swiper-navigation-disabled"
			}
		});
		swiper.navigation = {
			nextEl: null,
			$nextEl: null,
			prevEl: null,
			$prevEl: null
		};
		function getEl(el) {
			let $el;
			if (el) {
				$el = dom(el);
				if (swiper.params.uniqueNavElements && typeof el === "string" && $el.length > 1 && swiper.$el.find(el).length === 1) $el = swiper.$el.find(el);
			}
			return $el;
		}
		function toggleEl($el, disabled) {
			const params = swiper.params.navigation;
			if ($el && $el.length > 0) {
				$el[disabled ? "addClass" : "removeClass"](params.disabledClass);
				if ($el[0] && $el[0].tagName === "BUTTON") $el[0].disabled = disabled;
				if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
			}
		}
		function update() {
			if (swiper.params.loop) return;
			const { $nextEl, $prevEl } = swiper.navigation;
			toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);
			toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);
		}
		function onPrevClick(e) {
			e.preventDefault();
			if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
			swiper.slidePrev();
			emit("navigationPrev");
		}
		function onNextClick(e) {
			e.preventDefault();
			if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
			swiper.slideNext();
			emit("navigationNext");
		}
		function init() {
			const params = swiper.params.navigation;
			swiper.params.navigation = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
				nextEl: "swiper-button-next",
				prevEl: "swiper-button-prev"
			});
			if (!(params.nextEl || params.prevEl)) return;
			const $nextEl = getEl(params.nextEl);
			const $prevEl = getEl(params.prevEl);
			if ($nextEl && $nextEl.length > 0) $nextEl.on("click", onNextClick);
			if ($prevEl && $prevEl.length > 0) $prevEl.on("click", onPrevClick);
			Object.assign(swiper.navigation, {
				$nextEl,
				nextEl: $nextEl && $nextEl[0],
				$prevEl,
				prevEl: $prevEl && $prevEl[0]
			});
			if (!swiper.enabled) {
				if ($nextEl) $nextEl.addClass(params.lockClass);
				if ($prevEl) $prevEl.addClass(params.lockClass);
			}
		}
		function destroy() {
			const { $nextEl, $prevEl } = swiper.navigation;
			if ($nextEl && $nextEl.length) {
				$nextEl.off("click", onNextClick);
				$nextEl.removeClass(swiper.params.navigation.disabledClass);
			}
			if ($prevEl && $prevEl.length) {
				$prevEl.off("click", onPrevClick);
				$prevEl.removeClass(swiper.params.navigation.disabledClass);
			}
		}
		on("init", (() => {
			if (swiper.params.navigation.enabled === false) disable(); else {
				init();
				update();
			}
		}));
		on("toEdge fromEdge lock unlock", (() => {
			update();
		}));
		on("destroy", (() => {
			destroy();
		}));
		on("enable disable", (() => {
			const { $nextEl, $prevEl } = swiper.navigation;
			if ($nextEl) $nextEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
			if ($prevEl) $prevEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
		}));
		on("click", ((_s, e) => {
			const { $nextEl, $prevEl } = swiper.navigation;
			const targetEl = e.target;
			if (swiper.params.navigation.hideOnClick && !dom(targetEl).is($prevEl) && !dom(targetEl).is($nextEl)) {
				if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
				let isHidden;
				if ($nextEl) isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass); else if ($prevEl) isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
				if (isHidden === true) emit("navigationShow"); else emit("navigationHide");
				if ($nextEl) $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
				if ($prevEl) $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
			}
		}));
		const enable = () => {
			swiper.$el.removeClass(swiper.params.navigation.navigationDisabledClass);
			init();
			update();
		};
		const disable = () => {
			swiper.$el.addClass(swiper.params.navigation.navigationDisabledClass);
			destroy();
		};
		Object.assign(swiper.navigation, {
			enable,
			disable,
			update,
			init,
			destroy
		});
	}
	function initSliders() {
		if (document.querySelector(".intro__slider")) new core(".intro__slider", {
			modules: [Navigation, Keyboard],
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 500,
			watchOverflow: true,
			observer: true,
			observeParents: true,
			keyboard: {
				enabled: true,
				onlyInViewport: true,
				pageUpDown: false
			}
		});
		if (document.querySelector(".intro__slider-2")) new core(".intro__slider-2", {
			modules: [Navigation, Keyboard],
			slidesPerView: 1,
			spaceBetween: 0,
			initialSlide: 1,
			speed: 500,
			watchOverflow: true,
			observer: true,
			observeParents: true,
			keyboard: {
				enabled: true,
				onlyInViewport: true,
				pageUpDown: false
			}
		});
		if (document.querySelector(".intro__slider-3")) new core(".intro__slider-3", {
			modules: [Navigation, Keyboard],
			slidesPerView: 1,
			spaceBetween: 0,
			initialSlide: 2,
			speed: 500,
			watchOverflow: true,
			observer: true,
			observeParents: true,
			keyboard: {
				enabled: true,
				onlyInViewport: true,
				pageUpDown: false
			}
		});
		if (document.querySelector(".intro__slider-4")) new core(".intro__slider-4", {
			modules: [Navigation, Keyboard],
			slidesPerView: 1,
			spaceBetween: 0,
			initialSlide: 3,
			speed: 500,
			watchOverflow: true,
			observer: true,
			observeParents: true,
			keyboard: {
				enabled: true,
				onlyInViewport: true,
				pageUpDown: false
			}
		});
		const tableSliders = document.querySelectorAll(".table-intro__slider");
		if (tableSliders.length) tableSliders.forEach((tableSlider => {
			new core(tableSlider, {
				modules: [Navigation, Keyboard],
				slidesPerView: 1,
				spaceBetween: 0,
				allowTouchMove: false,
				navigation: {
					prevEl: ".intro__arrow_left",
					nextEl: ".intro__arrow_right"
				},
				speed: 350,
				watchOverflow: true,
				observer: true,
				observeParents: true,
				keyboard: {
					enabled: true,
					onlyInViewport: true,
					pageUpDown: false
				}
			});
		}));
		if (document.querySelector(".names-intro__slider")) new core(document.querySelector(".names-intro__slider"), {
			modules: [Navigation, Keyboard],
			slidesPerView: 1,
			spaceBetween: 0,
			allowTouchMove: false,
			navigation: {
				prevEl: ".intro__arrow_left",
				nextEl: ".intro__arrow_right"
			},
			speed: 350,
			watchOverflow: true,
			observer: true,
			observeParents: true,
			keyboard: {
				enabled: true,
				onlyInViewport: true,
				pageUpDown: false
			}
		});
	}
	window.addEventListener("load", (function () {
		initSliders();
	}));

	/* ------------------ New code ------------------ */

	document.addEventListener('click', (e) => {
		const slideParents = document.querySelectorAll('[data-slide-parent]');

		if (slideParents.length) {
			slideParents.forEach(slideParent => {
				if (slideParent.classList.contains('swiper-slide-active') || slideParent.dataset.slideParent == 'static') {
					const slidePanel = slideParent.querySelector('[data-slide-panel]');

					if (slidePanel && !e.target.closest('[data-slide-more]') && !e.target.closest('.panel-intro__main') && !e.target.closest('.intro__back') && !e.target.closest('.intro__back-2') && !e.target.closest('.item') && !e.target.closest('.argument-img') && !e.target.closest('.intro__arrow') && !e.target.closest('.intro__pdf')) {
						if (!slideParent.classList.contains('_text')) {
							if (!slideParent.classList.contains('_click')) {
								slideParent.classList.add('_click');
								slidePanel.classList.add('_active');
							} else {
								slideParent.classList.remove('_click');
								slidePanel.classList.remove('_active');
							}
						} else {
							const slideAdditional = slideParent.querySelector('[data-slide-additional]');

							if (slideAdditional && !e.target.closest('.panel-intro__text')) {
								slideAdditional.classList.remove('_active');
								slideParent.classList.remove('_text');
							}
						}
					}
				}
			});
		}
	});

	const slideParents = document.querySelectorAll('[data-slide-parent]');

	if (slideParents.length) {
		slideParents.forEach(slideParent => {
			const slideMore = slideParent.querySelector('[data-slide-more]');

			if (slideMore) {
				slideMore.addEventListener('click', (e) => {
					const slideAdditional = slideParent.querySelector('[data-slide-additional]');

					if (slideAdditional) {
						slideAdditional.classList.add('_active');
						slideParent.classList.add('_text');
					}

					e.preventDefault();
				});
			}
		});
	}

	/* ------------------ New code ------------------ */

	isWebp();
	menuInit();
	functions_open();
})();