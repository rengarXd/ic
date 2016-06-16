/*!
 * 框架名称：AHelper.js
 * 框架作者：新生帝(JsonLei)
 * 编写日期：2015年12月01日
 * 版权所有：中山赢友网络科技有限公司
 * 企业官网：http://www.winu.net
 * 开源协议：GPL v2 License
 * 框架描述：APICloud操作库，一切从简，只为了更懒！
 * 讨论群区：一起改变中国IT教育 18863883
 * 文档地址：http://www.kancloud.cn/winu/ahelper
 * 开源地址：http://git.oschina.net/winu.net/AHelper.js
 */! function(win) {
	var modules = {};
	window.serverUrl = "http://122.114.90.191/apis";
	window.deviceserverUrl = "http://122.114.90.191/deviceapi";
	window.serverUrlPath = "http://122.114.90.191/";
	window.debug = true;
	var nowtime, secondNum;
	var $$com = {
		trim : function(str) {
			return str.replace(/(^\s*)|(\s*$)/g, "")
		},
		isNullOrEmpty : function(str) {
			return (str == null || str == undefined || $$com.trim(str) == "") ? true : false
		},
		isNullOrUndefined : function(str) {
			return (str == null || str == undefined) ? true : false
		},
		extend : function(baseObj, extObj) {
			var inheritObj = baseObj;
			for (var i in extObj) {
				inheritObj[i] = extObj[i]
			}
			return inheritObj
		},
		getFileExt : function(fileName) {
			return fileName.substring(fileName.lastIndexOf(".") + 1)
		},
		scrollToDocButton : function() {
			document.getElementsByTagName("body")[0].scrollTop = document.getElementsByTagName("body")[0].scrollHeight
		},
		getAgeForBirthDay : function(birthday) {
			var r = birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
			if (r == null) {
				return false
			}
			var d = new Date(r[1], r[3] - 1, r[4]);
			if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
				var Y = new Date().getFullYear();
				return (Y - r[1])
			}
			return 0
		},
		isNumber : function(str) {
			return !isNaN(str)
		},
		isPlusDecimal : function(str) {
			return (/^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))$/).test(str)
		},
		isDate : function(str) {
			return (/^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))(\s+([01][0-9]:|2[0-3]:)?[0-5][0-9]:[0-5][0-9])?$/).text(str)
		},
		getNowDateFormat : function(dateSeparator, timeSeparator, isShowTime, datetime) {
			dateSeparator = $$com.isNullOrEmpty(dateSeparator) ? "-" : dateSeparator;
			timeSeparator = $$com.isNullOrEmpty(timeSeparator) ? ":" : timeSeparator;
			isShowTime = ( typeof arguments[2] != "boolean") ? true : arguments[2];
			var now = datetime ? datetime : new Date();
			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			var date = now.getDate();
			var hours = now.getHours();
			var minutes = now.getMinutes();
			var seconds = now.getSeconds();
			if (month >= 1 && month <= 9) {
				month = "0" + month
			}
			if (date >= 0 && date <= 9) {
				date = "0" + date
			}
			var _date = year + dateSeparator + month + dateSeparator + date;
			var _time = hours + timeSeparator + minutes + timeSeparator + seconds;
			return isShowTime ? (_date + " " + _time) : _date
		},
		transPHPTimestamp : function(timestamp) {
			if (timestamp > 0) {
				var dateStr = new Date(timestamp * 1000);
				return dateStr.getFullYear() + "-" + dateStr.getMonth() + 1 + "-" + dateStr.getDate() + " " + dateStr.getHours() + ":" + dateStr.getMinutes() + ":" + dateStr.getSeconds()
			} else {
				return "末知时间"
			}
		},
		transJsTimestamp : function(timestamp) {
			var date = new Date(parseInt(timestamp));
			var Y = date.getFullYear() + "-";
			var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
			var D = date.getDate() + " ";
			var h = date.getHours() + ":";
			var m = date.getMinutes();
			return Y + M + D + h + m
		},
		isFunction : function(func) {
			return ( typeof func == "function")
		},
		jsDateDiff : function(publishTime) {
			nowtime = (new Date).getTime();
			secondNum = parseInt((nowtime - publishTime * 1000) / 1000);
			if (secondNum >= 0 && secondNum < 60) {
				return secondNum + "秒前"
			} else {
				if (secondNum >= 60 && secondNum < 3600) {
					var nTime = parseInt(secondNum / 60);
					return nTime + "分钟前"
				} else {
					if (secondNum >= 3600 && secondNum < 3600 * 24) {
						var nTime = parseInt(secondNum / 3600);
						return nTime + "小时前"
					} else {
						var nTime = parseInt(secondNum / 86400);
						return nTime + "天前"
					}
				}
			}
		},
		isObject : function(obj) {
			return ( typeof obj == "object" && obj != null && obj != undefined)
		},
		isArray : function(arr) {
			return toString.apply(arr) === "[object Array]"
		},
		newGuid : function() {
			function S4() {
				return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
			}

			return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4())
		},
		unique : function(arr) {
			if (!$$com.isArray(arr)) {
				return arr
			}
			var result = [], hash = {};
			for (var i = 0, elem; ( elem = arr[i]) != null; i++) {
				if (!hash[elem]) {
					result.push(elem);
					hash[elem] = true
				}
			}
			return result
		},
		isUrl : function(str) {
			var strRegex = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + "(([0-9]{1,3}.){3}[0-9]{1,3}" + "|" + "([0-9a-z_!~*'()-]+.)*" + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." + "[a-z]{2,6})" + "(:[0-9]{1,4})?" + "((/?)|" + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
			var re = new RegExp(strRegex);
			if (re.test(str)) {
				return (true)
			} else {
				return (false)
			}
		},
		writeObj : function(obj) {
			var description = "";
			for (var i in obj) {
				var property = obj[i];
				description += i + " = " + property + "\n"
			}
			alert(description)
		},
		isdebug : function(msg) {
			if (window.debug) {
				console.log(msg)
			}
		}
	};
	(function(window) {
		var u = {};
		var isAndroid = (/android/gi).test(navigator.appVersion);
		var uzStorage = function() {
			var ls = window.localStorage;
			if (isAndroid) {
				ls = os.localStorage()
			}
			return ls
		};

		function parseArguments(url, data, fnSuc, dataType) {
			if ( typeof (data) == "function") {
				dataType = fnSuc;
				fnSuc = data;
				data = undefined
			}
			if ( typeof (fnSuc) != "function") {
				dataType = fnSuc;
				fnSuc = undefined
			}
			return {
				url : url,
				data : data,
				fnSuc : fnSuc,
				dataType : dataType
			}
		}


		u.trim = function(str) {
			if (String.prototype.trim) {
				return str == null ? "" : String.prototype.trim.call(str)
			} else {
				return str.replace(/(^\s*)|(\s*$)/g, "")
			}
		};
		u.trimAll = function(str) {
			return str.replace(/\s*/g, "")
		};
		u.isElement = function(obj) {
			return !!(obj && obj.nodeType == 1)
		};
		u.isArray = function(obj) {
			if (Array.isArray) {
				return Array.isArray(obj)
			} else {
				return obj instanceof Array
			}
		};
		u.isEmptyObject = function(obj) {
			if (JSON.stringify(obj) === "{}") {
				return true
			}
			return false
		};
		u.addEvt = function(el, name, fn, useCapture) {
			if (!u.isElement(el)) {
				console.warn("$api.addEvt Function need el param, el param must be DOM Element");
				return
			}
			useCapture = useCapture || false;
			if (el.addEventListener) {
				el.addEventListener(name, fn, useCapture)
			}
		};
		u.rmEvt = function(el, name, fn, useCapture) {
			if (!u.isElement(el)) {
				console.warn("$api.rmEvt Function need el param, el param must be DOM Element");
				return
			}
			useCapture = useCapture || false;
			if (el.removeEventListener) {
				el.removeEventListener(name, fn, useCapture)
			}
		};
		u.one = function(el, name, fn, useCapture) {
			if (!u.isElement(el)) {
				console.warn("$api.one Function need el param, el param must be DOM Element");
				return
			}
			useCapture = useCapture || false;
			var that = this;
			var cb = function() {
				fn && fn();
				that.rmEvt(el, name, cb, useCapture)
			};
			that.addEvt(el, name, cb, useCapture)
		};
		u.dom = function(el, selector) {
			if (arguments.length === 1 && typeof arguments[0] == "string") {
				if (document.querySelector) {
					return document.querySelector(arguments[0])
				}
			} else {
				if (arguments.length === 2) {
					if (el.querySelector) {
						return el.querySelector(selector)
					}
				}
			}
		};
		u.domAll = function(el, selector) {
			if (arguments.length === 1 && typeof arguments[0] == "string") {
				if (document.querySelectorAll) {
					return document.querySelectorAll(arguments[0])
				}
			} else {
				if (arguments.length === 2) {
					if (el.querySelectorAll) {
						return el.querySelectorAll(selector)
					}
				}
			}
		};
		u.byId = function(id) {
			return document.getElementById(id)
		};
		u.first = function(el, selector) {
			if (arguments.length === 1) {
				if (!u.isElement(el)) {
					console.warn("$api.first Function need el param, el param must be DOM Element");
					return
				}
				return el.children[0]
			}
			if (arguments.length === 2) {
				return this.dom(el, selector + ":first-child")
			}
		};
		u.last = function(el, selector) {
			if (arguments.length === 1) {
				if (!u.isElement(el)) {
					console.warn("$api.last Function need el param, el param must be DOM Element");
					return
				}
				var children = el.children;
				return children[children.length - 1]
			}
			if (arguments.length === 2) {
				return this.dom(el, selector + ":last-child")
			}
		};
		u.eq = function(el, index) {
			return this.dom(el, ":nth-child(" + index + ")")
		};
		u.not = function(el, selector) {
			return this.domAll(el, ":not(" + selector + ")")
		};
		u.prev = function(el) {
			if (!u.isElement(el)) {
				console.warn("$api.prev Function need el param, el param must be DOM Element");
				return
			}
			var node = el.previousSibling;
			if (node.nodeType && node.nodeType === 3) {
				node = node.previousSibling;
				return node
			}
		};
		u.next = function(el) {
			if (!u.isElement(el)) {
				console.warn("$api.next Function need el param, el param must be DOM Element");
				return
			}
			var node = el.nextSibling;
			if (node.nodeType && node.nodeType === 3) {
				node = node.nextSibling;
				return node
			}
		};
		u.closest = function(el, selector) {
			if (!u.isElement(el)) {
				console.warn("$api.closest Function need el param, el param must be DOM Element");
				return
			}
			var doms, targetDom;
			var isSame = function(doms, el) {
				var i = 0, len = doms.length;
				for (i; i < len; i++) {
					if (doms[i].isEqualNode(el)) {
						return doms[i]
					}
				}
				return false
			};
			var traversal = function(el, selector) {
				doms = u.domAll(el.parentNode, selector);
				targetDom = isSame(doms, el);
				while (!targetDom) {
					el = el.parentNode;
					if (el != null && el.nodeType == el.DOCUMENT_NODE) {
						return false
					}
					traversal(el, selector)
				}
				return targetDom
			};
			return traversal(el, selector)
		};
		u.contains = function(parent, el) {
			var mark = false;
			if (el === parent) {
				mark = true;
				return mark
			} else {
				do {
					el = el.parentNode;
					if (el === parent) {
						mark = true;
						return mark
					}
				} while (el === document.body || el === document.documentElement);
				return mark
			}
		};
		u.remove = function(el) {
			if (el && el.parentNode) {
				el.parentNode.removeChild(el)
			}
		};
		u.attr = function(el, name, value) {
			if (!u.isElement(el)) {
				console.warn("$api.attr Function need el param, el param must be DOM Element");
				return
			}
			if (arguments.length == 2) {
				return el.getAttribute(name)
			} else {
				if (arguments.length == 3) {
					el.setAttribute(name, value);
					return el
				}
			}
		};
		u.removeAttr = function(el, name) {
			if (!u.isElement(el)) {
				console.warn("$api.removeAttr Function need el param, el param must be DOM Element");
				return
			}
			if (arguments.length === 2) {
				el.removeAttribute(name)
			}
		};
		u.hasCls = function(el, cls) {
			if (!u.isElement(el)) {
				console.warn("$api.hasCls Function need el param, el param must be DOM Element");
				return
			}
			if (el.className.indexOf(cls) > -1) {
				return true
			} else {
				return false
			}
		};
		u.addCls = function(el, cls) {
			if (!u.isElement(el)) {
				console.warn("$api.addCls Function need el param, el param must be DOM Element");
				return
			}
			if ("classList" in el) {
				el.classList.add(cls)
			} else {
				var preCls = el.className;
				var newCls = preCls + " " + cls;
				el.className = newCls
			}
			return el
		};
		u.removeCls = function(el, cls) {
			if (!u.isElement(el)) {
				console.warn("$api.removeCls Function need el param, el param must be DOM Element");
				return
			}
			if ("classList" in el) {
				el.classList.remove(cls)
			} else {
				var preCls = el.className;
				var newCls = preCls.replace(cls, "");
				el.className = newCls
			}
			return el
		};
		u.toggleCls = function(el, cls) {
			if (!u.isElement(el)) {
				console.warn("$api.toggleCls Function need el param, el param must be DOM Element");
				return
			}
			if ("classList" in el) {
				el.classList.toggle(cls)
			} else {
				if (u.hasCls(el, cls)) {
					u.removeCls(el, cls)
				} else {
					u.addCls(el, cls)
				}
			}
			return el
		};
		u.val = function(el, val) {
			if (!u.isElement(el)) {
				console.warn("$api.val Function need el param, el param must be DOM Element");
				return
			}
			if (arguments.length === 1) {
				switch (el.tagName) {
					case "SELECT":
						var value = el.options[el.selectedIndex].value;
						return value;
						break;
					case "INPUT":
						return el.value;
						break;
					case "TEXTAREA":
						return el.value;
						break
				}
			}
			if (arguments.length === 2) {
				switch (el.tagName) {
					case "SELECT":
						el.options[el.selectedIndex].value = val;
						return el;
						break;
					case "INPUT":
						el.value = val;
						return el;
						break;
					case "TEXTAREA":
						el.value = val;
						return el;
						break
				}
			}
		};
		u.prepend = function(el, html) {
			if (!u.isElement(el)) {
				console.warn("$api.prepend Function need el param, el param must be DOM Element");
				return
			}
			el.insertAdjacentHTML("afterbegin", html);
			return el
		};
		u.append = function(el, html) {
			if (!u.isElement(el)) {
				console.warn("$api.append Function need el param, el param must be DOM Element");
				return
			}
			el.insertAdjacentHTML("beforeend", html);
			return el
		};
		u.before = function(el, html) {
			if (!u.isElement(el)) {
				console.warn("$api.before Function need el param, el param must be DOM Element");
				return
			}
			el.insertAdjacentHTML("beforebegin", html);
			return el
		};
		u.after = function(el, html) {
			if (!u.isElement(el)) {
				console.warn("$api.after Function need el param, el param must be DOM Element");
				return
			}
			el.insertAdjacentHTML("afterend", html);
			return el
		};
		u.html = function(el, html) {
			if (!u.isElement(el)) {
				console.warn("$api.html Function need el param, el param must be DOM Element");
				return
			}
			if (arguments.length === 1) {
				return el.innerHTML
			} else {
				if (arguments.length === 2) {
					el.innerHTML = html;
					return el
				}
			}
		};
		u.text = function(el, txt) {
			if (!u.isElement(el)) {
				console.warn("$api.text Function need el param, el param must be DOM Element");
				return
			}
			if (arguments.length === 1) {
				return el.textContent
			} else {
				if (arguments.length === 2) {
					el.textContent = txt;
					return el
				}
			}
		};
		u.offset = function(el) {
			if (!u.isElement(el)) {
				console.warn("$api.offset Function need el param, el param must be DOM Element");
				return
			}
			var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
			var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
			var rect = el.getBoundingClientRect();
			return {
				l : rect.left + sl,
				t : rect.top + st,
				w : el.offsetWidth,
				h : el.offsetHeight
			}
		};
		u.css = function(el, css) {
			if (!u.isElement(el)) {
				console.warn("$api.css Function need el param, el param must be DOM Element");
				return
			}
			if ( typeof css == "string" && css.indexOf(":") > 0) {
				el.style && (el.style.cssText += ";" + css)
			}
		};
		u.cssVal = function(el, prop) {
			if (!u.isElement(el)) {
				console.warn("$api.cssVal Function need el param, el param must be DOM Element");
				return
			}
			if (arguments.length === 2) {
				var computedStyle = window.getComputedStyle(el, null);
				return computedStyle.getPropertyValue(prop)
			}
		};
		u.jsonToStr = function(json) {
			if ( typeof json === "object") {
				return JSON && JSON.stringify(json)
			}
		};
		u.strToJson = function(str) {
			if ( typeof str === "string") {
				return JSON && JSON.parse(str)
			}
		};
		u.setStorage = function(key, value) {
			if (arguments.length === 2) {
				var v = value;
				if ( typeof v == "object") {
					v = JSON.stringify(v);
					v = "obj-" + v
				} else {
					v = "str-" + v
				}
				var ls = uzStorage();
				if (ls) {
					ls.setItem(key, v)
				}
			}
		};
		u.getStorage = function(key) {
			var ls = uzStorage();
			if (ls) {
				var v = ls.getItem(key);
				if (!v) {
					return
				}
				if (v.indexOf("obj-") === 0) {
					v = v.slice(4);
					return JSON.parse(v)
				} else {
					if (v.indexOf("str-") === 0) {
						return v.slice(4)
					}
				}
			}
		};
		u.rmStorage = function(key) {
			var ls = uzStorage();
			if (ls && key) {
				ls.removeItem(key)
			}
		};
		u.clearStorage = function() {
			var ls = uzStorage();
			if (ls) {
				ls.clear()
			}
		};
		u.fixIos7Bar = function(el) {
			if (!u.isElement(el)) {
				console.warn("$api.fixIos7Bar Function need el param, el param must be DOM Element");
				return
			}
			var strDM = api.systemType;
			if (strDM == "ios") {
				var strSV = api.systemVersion;
				var numSV = parseInt(strSV, 10);
				var fullScreen = api.fullScreen;
				var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
				if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
					el.style.paddingTop = "20px"
				}
			}
		};
		u.fixStatusBar = function(el) {
			if (!u.isElement(el)) {
				console.warn("$api.fixStatusBar Function need el param, el param must be DOM Element");
				return
			}
			var sysType = api.systemType;
			if (sysType == "ios") {
				u.fixIos7Bar(el)
			} else {
				if (sysType == "android") {
					var ver = api.systemVersion;
					ver = parseFloat(ver);
					if (ver >= 4.4) {
						el.style.paddingTop = "25px"
					}
				}
			}
		};
		u.toast = function(title, text, time) {
			var opts = {};
			var show = function(opts, time) {
				api.showProgress(opts);
				setTimeout(function() {
					api.hideProgress()
				}, time)
			};
			if (arguments.length === 1) {
				var time = time || 500;
				if ( typeof title === "number") {
					time = title
				} else {
					opts.title = title + ""
				}
				show(opts, time)
			} else {
				if (arguments.length === 2) {
					var time = time || 500;
					var text = text;
					if ( typeof text === "number") {
						var tmp = text;
						time = tmp;
						text = null
					}
					if (title) {
						opts.title = title
					}
					if (text) {
						opts.text = text
					}
					show(opts, time)
				}
			}
			if (title) {
				opts.title = title
			}
			if (text) {
				opts.text = text
			}
			time = time || 500;
			show(opts, time)
		};
		u.post = function() {
			var argsToJson = parseArguments.apply(null, arguments);
			var json = {};
			var fnSuc = argsToJson.fnSuc;
			argsToJson.url && (json.url = argsToJson.url);
			argsToJson.data && (json.data = argsToJson.data);
			if (argsToJson.dataType) {
				var type = argsToJson.dataType.toLowerCase();
				if (type == "text" || type == "json") {
					json.dataType = type
				}
			} else {
				json.dataType = "json"
			}
			json.method = "post";
			api.ajax(json, function(ret, err) {
				if (ret) {
					fnSuc && fnSuc(ret)
				}
			})
		};
		u.get = function() {
			var argsToJson = parseArguments.apply(null, arguments);
			var json = {};
			var fnSuc = argsToJson.fnSuc;
			argsToJson.url && (json.url = argsToJson.url);
			if (argsToJson.dataType) {
				var type = argsToJson.dataType.toLowerCase();
				if (type == "text" || type == "json") {
					json.dataType = type
				}
			} else {
				json.dataType = "text"
			}
			json.method = "get";
			api.ajax(json, function(ret, err) {
				if (ret) {
					fnSuc && fnSuc(ret)
				}
			})
		};
		window.$$api = u
	})(win);
	var defaultsOption = {
		alert : {
			title : "温馨提示",
			msg : "",
			buttons : ["确定"]
		},
		confirm : {
			title : "温馨提示",
			msg : "选择您要的操作类型",
			buttons : ["确定", "取消"]
		},
		prompt : {
			title : "温馨提示",
			msg : "请输入内容后点击确定按钮",
			text : "",
			type : "text",
			buttons : ["确定", "取消"]
		},
		actionSheet : {
			title : "选择您要的操作类型",
			cancelTitle : "取 消",
			buttons : ["按钮一", "按钮二", "按钮三"],
			style : {
				layerColor : "rgba(0,0,0,0.4)",
				itemNormalColor : "#F1F1F1",
				itemPressColor : "#E6E6E6",
				fontNormalColor : "#007AFF",
				fontPressColor : "#0060F0",
				titleFontColor : "#8F8F8F"
			}
		},
		showProgress : {
			style : "default",
			animationType : "fade",
			title : "努力加载中...",
			modal : true
		},
		toast : {
			msg : "温馨提示",
			duration : 4000,
			location : "bottom"
		},
		setRefreshHeaderInfo : {
			visible : true,
			loadingImg : "widget://image/refresh.png",
			bgColor : "#f1f1f1",
			textColor : "#999",
			textDown : "下拉刷新...",
			textUp : "松开刷新...",
			textTime : "最后更新：" + $$com.getNowDateFormat(),
			textLoading : "加载中...",
			showTime : true
		},
		getPicture : {
			sourceType : "album",
			encodingType : "jpg",
			mediaValue : "pic",
			destinationType : "url",
			allowEdit : true,
			quality : 80,
			saveToPhotoAlbum : false
		},
		openWin : {
			name : $$com.newGuid(),
			url : "",
			pageParam : {},
			bounces : false,
			bgColor : "rgba(0,0,0,0)",
			scrollToTop : true,
			vScrollBarEnabled : false,
			hScrollBarEnabled : false,
			scaleEnabled : false,
			slidBackEnabled : false,
			animation : {
				type : "movein",
				subType : "from_right",
				duration : 300
			},
			delay : 300,
			showProgress : true,
			reload : false,
			allowEdit : true,
			softInputMode : "auto"
		},
		closeWin : {
			animation : {
				type : "movein",
				subType : "from_left",
				duration : 300
			}
		},
		closeToWin : {
			name : "root",
			animation : {
				type : "movein",
				subType : "from_left",
				duration : 300
			}
		},
		openFrame : {
			name : $$com.newGuid(),
			url : "",
			pageParam : {},
			bounces : false,
			bgColor : "rgba(0,0,0,0)",
			scrollToTop : true,
			vScrollBarEnabled : false,
			hScrollBarEnabled : false,
			scaleEnabled : false,
			showProgress : false,
			reload : false,
			allowEdit : true,
			softInputMode : "auto",
			rect : {
				x : 0,
				y : 0,
				w : 0,
				h : 0,
				marginLeft : 0,
				marginTop : 0,
				marginBottom : 0,
				marginRight : 0
			}
		},
		ajax : {
			url : "",
			tag : $$com.newGuid(),
			method : "get",
			cache : true,
			timeout : 30,
			dataType : "json",
			charset : "utf-8",
			headers : {},
			report : false,
			returnAll : false,
			data : {}
		},
		execScript : {
			name : "root",
			frameName : $$com.newGuid(),
			script : "function ______winu(){}();"
		},
		openFrameGroup : {
			name : $$com.newGuid(),
			url : "",
			background : "#fff",
			scrollEnabled : true,
			rect : {
				x : 0,
				y : 0,
				w : 0,
				h : 0,
				marginLeft : 0,
				marginTop : 0,
				marginBottom : 0,
				marginRight : 0
			},
			index : 0,
			preload : 1,
			frames : []
		},
		setFrameGroupIndex : {
			name : $$com.newGuid(),
			index : 0,
			scroll : true
		},
		openSlidLayout : {
			type : "left",
			leftEdge : 80,
			slidPaneStyle : {
				leftEdge : 80,
				leftScale : 1
			},
			fixedPane : {},
			slidPane : {}
		},
		openApp : {
			appParam : {
				paras : ""
			},
			iosUrl : "http://www.winu.net/",
			androidPkg : "android.intent.action.VIEW",
			mimeType : "text/html",
			uri : "http://www.winu.net"
		},
		imageCache : {
			url : "",
			policy : "default",
			thumbnail : false
		},
		download : {
			url : "http://www.winu.net/a.jpg",
			savePath : "",
			report : true,
			cache : true,
			allowResume : true
		},
		notification : {
			vibrate : [500, 500],
			sound : "default",
			light : false,
			notify : {
				updateCurrent : true,
				extra : ""
			}
		},
		call : {
			type : "tel_prompt",
			number : "18676265646"
		},
		sms : {
			numbers : ["18676265646"],
			text : "大家好，我叫新生帝。"
		},
		mail : {
			recipients : ["winu@winu.net"],
			subject : "我给您发送了一个邮件",
			body : "你好，我叫新生帝。",
			attachments : [],
		},
		openPicker : {
			type : "date_time",
			title : "选择时间"
		}
	};
	var $$apicloud = {
		returnNewMemoryObj : function(obj) {
			return $$api.strToJson(JSON.stringify(obj))
		},
		offset : function(selectorId) {
			if ($$com.isNullOrEmpty(selectorId)) {
				return {
					w : 0,
					h : 0,
					l : 0,
					t : 0
				}
			}
			var element = $$api.byId(selectorId);
			if (element) {
				return $$api.offset(element)
			} else {
				return {
					w : 0,
					h : 0,
					l : 0,
					t : 0
				}
			}
		},
		isIOS : function() {
			return api.systemType == "ios"
		},
		alert : function(callback, options) {
			var o = defaultsOption.alert;
			if ( typeof options == "string") {
				o.msg = options
			} else {
				o = options || {};
				o = $$com.extend(defaultsOption.alert, o)
			}
			if ($$com.isObject(o.msg)) {
				o.msg = JSON.stringify(o.msg)
			}
			api.alert(o, function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		$alert : function(msg) {
			$$apicloud.alert(null, {
				msg : msg
			})
		},
		confirm : function(callback, options) {
			var o = defaultsOption.confirm;
			if ( typeof options == "string") {
				o.msg = options
			} else {
				o = options || {};
				o = $$com.extend(defaultsOption.confirm, o)
			}
			api.confirm(o, function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret)
				}
			})
		},
		$confirm : function(yesFunc, cancelFunc, msg) {
			msg = msg ? msg : defaultsOption.confirm.msg;
			$$apicloud.confirm(function(ret, err) {
				if (ret.buttonIndex == 1) {
					if ($$com.isFunction(yesFunc)) {
						yesFunc()
					}
				} else {
					if (ret.buttonIndex == 2) {
						if ($$com.isFunction(cancelFunc)) {
							cancelFunc()
						}
					} else {
					}
				}
			}, {
				msg : msg
			})
		},
		prompt : function(callback, options) {
			var o = options || {};
			o = $$com.extend(defaultsOption.prompt, o);
			api.prompt(o, function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		$prompt : function(yesFunc, cancelFunc, msg, inputType) {
			msg = msg ? msg : defaultsOption.prompt.msg;
			inputType = inputType ? inputType : defaultsOption.prompt.type;
			$$apicloud.prompt(function(ret, err) {
				if (ret.buttonIndex == 1) {
					if ($$com.isFunction(yesFunc)) {
						yesFunc(ret.text)
					}
				} else {
					if (ret.buttonIndex == 2) {
						if ($$com.isFunction(cancelFunc)) {
							cancelFunc()
						}
					} else {
					}
				}
			}, {
				msg : msg,
				type : inputType
			})
		},
		actionSheet : function(callback, options) {
			var o = options || {};
			o = $$com.extend(defaultsOption.actionSheet, o);
			api.actionSheet(o, function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		showProgress : function(options) {
			var o = options || {};
			o = $$com.extend(defaultsOption.showProgress, o);
			api.showProgress(o)
		},
		$showProgress : function() {
			$$apicloud.showProgress()
		},
		hideProgress : function() {
			api.hideProgress()
		},
		$hideProgress : function() {
			$$apicloud.hideProgress()
		},
		toast : function(callback, options) {
			var o = defaultsOption.toast;
			if ( typeof options == "string") {
				o.msg = options
			} else {
				o = options || {};
				o = $$com.extend(defaultsOption.toast, o)
			}
			if ($$com.isObject(o.msg)) {
				o.msg = JSON.stringify(o.msg)
			}
			api.toast(o);
			setTimeout(function() {
				if ($$com.isFunction(callback)) {
					callback()
				}
			}, o.duration)
		},
		$toast : function(msg) {
			$$apicloud.toast(null, {
				msg : msg
			})
		},
		setRefreshHeaderInfo : function(callback, options) {
			var o = options || {};
			o = $$com.extend(defaultsOption.setRefreshHeaderInfo, o);
			api.setRefreshHeaderInfo(o, function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		$dropdownToRefresh : function(callback) {
			$$apicloud.setRefreshHeaderInfo(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		refreshHeaderLoading : function() {
			api.refreshHeaderLoading()
		},
		$setAutoDropdownToRefresh : function() {
			$$apicloud.refreshHeaderLoading()
		},
		refreshHeaderLoadDone : function() {
			api.refreshHeaderLoadDone()
		},
		$recoverDropdownToNormal : function() {
			$$apicloud.refreshHeaderLoadDone()
		},
		getPicture : function(callback, options) {
			var o = options || {};
			o = $$com.extend(defaultsOption.getPicture, o);
			api.getPicture(o, function(ret, err) {
				if (ret) {
					if ($$com.isFunction(callback)) {
						callback(ret, err)
					}
				} else {
					$$apicloud.alert(null, {
						msg : err
					})
				}
			})
		},
		$getPicture : function(callback, options, isActionSheet) {
			isActionSheet = ( typeof arguments[2] != "boolean") ? true : arguments[2];
			var o = options || {};
			o = $$com.extend(defaultsOption.getPicture, o);
			if (isActionSheet) {
				$$apicloud.actionSheet(function(ret, err) {
					if (ret.buttonIndex == 3) {
						return
					}
					if (ret.buttonIndex == 1) {
						o.sourceType = "camera"
					}
					$$apicloud.getPicture(callback, o)
				}, {
					title : "选择图片来源",
					buttons : ["优雅自拍", "相册收藏"]
				})
			} else {
				$$apicloud.confirm(function(ret, err) {
					if (ret.buttonIndex == 3) {
						return
					}
					if (ret.buttonIndex == 1) {
						o.sourceType = "camera"
					}
					$$apicloud.getPicture(callback, o)
				}, {
					title : "选择图片来源",
					msg : "您想要从哪里选取图片？",
					buttons : ["优雅自拍", "相册收藏", "取消"]
				})
			}
		},
		openWin : function(options, isInit) {
			isInit = typeof isInit == "boolean" ? isInit : false;
			if (!isInit) {
				defaultsOption.openWin.pageParam = api.pageParam;
				defaultsOption.openWin.delay = $$apicloud.isIOS() ? 0 : 300
			}
			var o = options || {};
			o = $$com.extend(defaultsOption.openWin, o);
			api.openWin(o)
		},
		$openWin : function(winName, winUrl, pageParam, animation) {
			pageParam = pageParam ? pageParam : api.pageParam;
			animation = animation ? animation : {
				type : "none",
				duration : 300
			};
			$$apicloud.openWin({
				name : winName,
				url : winUrl,
				pageParam : pageParam,
				animation : animation
			})
		},
		closeWin : function(options) {
			if (options) {
				var o = options || {};
				o = $$com.extend(defaultsOption.closeWin, o);
				api.closeWin(o)
			} else {
				api.closeWin()
			}
		},
		$closeCurrentWin : function() {
			api.closeWin()
		},
		closeToWin : function(options) {
			var o = defaultsOption.closeToWin;
			if ( typeof options == "string") {
				o.name = options
			} else {
				o = options || {};
				o = $$com.extend(defaultsOption.closeToWin, o)
			}
			api.closeToWin(o)
		},
		$closeCurrentToWin : function(winName) {
			winName = winName ? winName : "root";
			if (api.winName != winName) {
				$$apicloud.closeToWin(winName)
			}
		},
		setWinAttr : function(options) {
			var o = options || {};
			api.setWinAttr(o)
		},
		$fixStatusBar : function(callback, headerId) {
			var header = $$api.byId(headerId);
			if (header) {
				var systemType = api.systemType;
				var systemVersion = parseFloat(api.systemVersion);
				if ($$apicloud.isIOS()) {
					$$api.fixIos7Bar(header)
				} else {
					if (systemType == "android") {
						if (systemVersion >= 4.4) {
							header.style.paddingTop = "25px"
						}
					}
				}
				if ($$com.isFunction(callback)) {
					var offset = $$apicloud.offset(headerId);
					callback(offset)
				}
			} else {
				console.wran("传入导航ID有误")
			}
		},
		openFrame : function(options, isInit) {
			isInit = typeof isInit == "boolean" ? isInit : false;
			if (!isInit) {
				defaultsOption.openFrame.pageParam = api.pageParam;
				defaultsOption.openFrame.rect.w = api.winWidth;
				defaultsOption.openFrame.rect.h = api.winHeight
			}
			var o = options || {};
			o = $$com.extend(defaultsOption.openFrame, o);
			o.rect = $$com.extend(o.rect, options.rect || {});
			api.openFrame(o)
		},
		$openFrame : function(frameName, frameUrl, pageParam, rect, bounces) {
			bounces = typeof bounces == "boolean" ? bounces : false;
			pageParam = pageParam ? pageParam : api.pageParam;
			$$apicloud.openFrame({
				name : frameName,
				url : frameUrl,
				pageParam : pageParam,
				rect : rect,
				bounces : bounces
			})
		},
		$openFrameWithNav : function(headerId, options, footerId) {
			$$apicloud.$fixStatusBar(function(offset) {
				var o = options || {};
				o = $$com.extend(defaultsOption.openFrame, o);
				var footerOffset = $$apicloud.offset(footerId);
				if (!options.rect) {
					o.rect.x = offset.l;
					o.rect.h = api.winHeight - offset.h - footerOffset.h;
					o.rect.w = api.winWidth
				}
				o.rect.y = offset.h;
				$$apicloud.openFrame(o, true)
			}, headerId)
		},
		closeFrame : function(frameName) {
			api.closeFrame({
				name : frameName ? frameName : api.frameName
			})
		},
		$closeCurrentFrame : function() {
			$$apicloud.closeFrame(api.frameName)
		},
		setFrameAttr : function(options) {
			var o = options || {};
			api.setFrameAttr(o)
		},
		setFrameStatus : function(frameName, isHidden) {
			isHidden = ( typeof arguments[1] != "boolean") ? false : arguments[1];
			$$apicloud.setFrameAttr({
				name : frameName,
				hidden : isHidden
			})
		},
		$setFrameStatus : function(frameName, isHidden) {
			$$apicloud.setFrameStatus(frameName, isHidden)
		},
		openFrameGroup : function(callback, options, isInit) {
			isInit = typeof isInit == "boolean" ? isInit : false;
			if (!isInit) {
				defaultsOption.openFrameGroup.rect.w = api.winWidth;
				defaultsOption.openFrameGroup.rect.h = api.winHeight
			}
			var o = options || {};
			o = $$com.extend(defaultsOption.openFrameGroup, o);
			o.rect = $$com.extend(o.rect, options.rect || {});
			if (o && o.frames && o.frames.length > 0) {
				defaultsOption.openFrame.pageParam = api.pageParam;
				for (var i = 0; i < o.frames.length; i++) {
					var frame = (o.frames)[i];
					frame = $$com.extend(defaultsOption.openFrame, frame);
					frame = $$apicloud.returnNewMemoryObj(frame);
					delete frame["rect"];
					o.frames[i] = frame
				}
				api.openFrameGroup(o, function(ret, err) {
					if ($$com.isFunction(callback)) {
						callback(ret, err)
					}
				})
			}
		},
		$openFrameGroup : function(callback, groupName, frames, index) {
			frames = frames ? frames : [];
			index = typeof index == "number" ? index : 0;
			if (index > frames.length - 1) {
				index = frames.length - 1
			}
			$$apicloud.openFrameGroup(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, {
				name : groupName,
				frames : frames,
				index : index
			})
		},
		$openFrameGroupWithNav : function(callback, headerId, options, footerId) {
			var o = options || {};
			o = $$com.extend(defaultsOption.openFrameGroup, o);
			$$apicloud.$fixStatusBar(function(offset) {
				var footerOffset = $$apicloud.offset(footerId);
				if (!options.rect) {
					o.rect.x = offset.l;
					o.rect.h = api.winHeight - offset.h - footerOffset.h;
					o.rect.w = api.winWidth
				}
				o.rect.y = offset.h;
				$$apicloud.openFrameGroup(function(ret, err) {
					if ($$com.isFunction(callback)) {
						callback(ret, err)
					}
				}, o, true)
			}, headerId)
		},
		closeFrameGroup : function(frameGroupName) {
			api.closeFrameGroup({
				name : frameGroupName
			})
		},
		setFrameGroupAttr : function(options) {
			var o = options || {};
			api.setFrameGroupAttr(o)
		},
		setFrameGroupStatus : function(groupName, isHidden) {
			isHidden = ( typeof arguments[1] != "boolean") ? false : arguments[1];
			$$apicloud.setFrameGroupAttr({
				hidden : isHidden,
				name : groupName
			})
		},
		$setFrameGroupStatus : function(groupName, isHidden) {
			$$apicloud.setFrameGroupStatus(groupName, isHidden)
		},
		setFrameGroupIndex : function(options) {
			var o = defaultsOption.setFrameGroupIndex;
			if ( typeof options == "number") {
				o.index = options
			} else {
				o = options || {};
				o = $$com.extend(defaultsOption.setFrameGroupIndex, o)
			}
			api.setFrameGroupIndex(o)
		},
		$setFrameGroupIndex : function(groupName, index, scroll) {
			index = typeof index == "number" ? index : 0;
			scroll = typeof scroll == "boolean" ? scroll : true;
			$$apicloud.setFrameGroupIndex({
				name : groupName,
				index : index,
				scroll : scroll
			})
		},
		openSlidLayout : function(callback, options) {
			var o = options || {};
			o = $$com.extend(defaultsOption.openSlidLayout, o);
			defaultsOption.openFrame.pageParam = api.pageParam;
			var _o = defaultsOption.openFrame;
			_o = $$com.extend(defaultsOption.openSlidLayout.fixedPane, o.fixedPane);
			_o = $$apicloud.returnNewMemoryObj(_o);
			var _o2 = defaultsOption.openFrame;
			_o2 = $$com.extend(defaultsOption.openSlidLayout.slidPane, o.slidPane);
			_o2 = $$apicloud.returnNewMemoryObj(_o2);
			delete _o["rect"];
			delete _o2["rect"];
			o.fixedPane = _o;
			o.slidPane = _o2;
			api.openSlidLayout(o, function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		$openSlidLayout : function(callback, fixedPane, slidPane) {
			fixedPane = fixedPane ? fixedPane : {};
			slidPane = slidPane ? slidPane : {};
			$$apicloud.openSlidLayout(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, {
				fixedPane : fixedPane,
				slidPane : slidPane
			})
		},
		openSlidPane : function(type) {
			type = type ? type : "left";
			api.openSlidPane({
				type : type
			})
		},
		closeSlidPane : function() {
			api.closeSlidPane()
		},
		lockSlidPane : function() {
			api.lockSlidPane()
		},
		unlockSlidPane : function() {
			api.unlockSlidPane()
		},
		bringFrameToFront : function(from, to) {
			api.bringFrameToFront({
				from : from,
				to : to
			})
		},
		$bringFrameToFront : function() {
			$$apicloud.bringFrameToFront(api.frameName)
		},
		$getPageParam : function() {
			return api.pageParam
		},
		ajax : function(callback, options) {
			var o = options || {};
			o = $$com.extend(defaultsOption.ajax, o);
			api.ajax(o, function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		cancelAjax : function(tag) {
			api.cancelAjax({
				tag : tag
			})
		},
		$cancelAjax : function(tag) {
			$$apicloud.cancelAjax(tag)
		},
		$ajax : function(callback, url, method, dataType, data, cache, headers) {
			method = method ? method : "get";
			dataType = dataType ? dataType : "json";
			data = data ? data : {};
			headers = headers ? headers : {};
			cache = cache ? cache : false;
			$$apicloud.ajax(callback, {
				url : url,
				method : method,
				dataType : dataType,
				data : data,
				cache : cache,
				headers : headers
			})
		},
		$icAjax : function(callback, url, method, dataType, data, cache, headers) {
			method = method ? method : "get";
			dataType = dataType ? dataType : "json";
			data = data ? data : {};
			headers = headers ? headers : {};
			cache = cache ? cache : false;
			$$apicloud.ajax(callback, {
				url : window.serverUrl + url,
				method : method,
				dataType : dataType,
				data : data,
				cache : cache,
				headers : headers
			})
		},
		setPrefs : function(callback, key, value) {
			api.setPrefs({
				key : key,
				value : value
			}, function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		$setPrefs : function(callback, key, value) {
			$$apicloud.setPrefs(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, key, value)
		},
		getPrefs : function(callback, key) {
			api.getPrefs({
				key : key
			}, function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		$getPrefs : function(callback, key) {
			$$apicloud.getPrefs(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, key)
		},
		$userinfoPf : function(callback) {
			$$apicloud.getPrefs(function(ret, err) {
				userinfoobj = eval('(' + ret.value + ')');
				if ($$com.isFunction(callback)) {
					callback(userinfoobj)
				}
			}, 'userinfo')
		},
		//ic获取用户信息的偏好值，并执行AJAX请求
		//@data:{values:{}}
		//		$userPrefs : function(callback, url, datas) {
		//			datas = datas ? datas : {};
		//			$$apicloud.getPrefs(function(ret, err) {
		//				retobj = eval('(' + ret.value + ')');
		//				$$apicloud.ajax({
		//					url : window.serverUrl + '/' + url + '/token/' + retobj.token + '/user_id/' + retobj.id,
		//					data : datas
		//				}, callback);
		//			}, 'userinfo')
		//		},
		removePrefs : function(callback, key) {
			api.removePrefs({
				key : key
			}, function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		$removePrefs : function(callback, key) {
			$$apicloud.removePrefs(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, key)
		},
		clearCache : function(callback) {
			api.clearCache(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		$clearCache : function(callback) {
			$$apicloud.clearCache(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		setStorage : function(key, value) {
			$$api.setStorage(key, value)
		},
		$setStorage : function(key, value) {
			$$apicloud.setStorage(key, value)
		},
		getStorage : function(key) {
			return $$api.getStorage(key)
		},
		$getStorage : function(key) {
			$$apicloud.getStorage(key)
		},
		removeStorage : function(key) {
			return $$api.rmStorage(key)
		},
		$removeStorage : function(key) {
			$$apicloud.removeStorage(key)
		},
		clearStorage : function() {
			$$api.clearStorage()
		},
		$clearStorage : function() {
			$$apicloud.clearStorage()
		},
		sendEvent : function(eventName, eventData) {
			api.sendEvent({
				name : eventName,
				extra : eventData
			})
		},
		$sendEvent : function(eventName, eventData) {
			eventData = eventData ? eventData : "";
			$$apicloud.sendEvent(eventName, eventData)
		},
		addEventListener : function(callback, eventName, eventData) {
			eventData = eventData ? eventData : {};
			api.addEventListener({
				name : eventName,
				extra : eventData
			}, function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		$addEventListener : function(callback, eventName, eventData) {
			eventData = eventData ? eventData : {};
			$$apicloud.addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, eventName, eventData)
		},
		removeEventListener : function(eventName) {
			api.removeEventListener({
				name : eventName
			})
		},
		$removeEventListener : function(eventName) {
			$$apicloud.removeEventListener(eventName)
		},
		$dblclickToCloseApp : function(todo) {
			var mkeyTime = new Date().getTime();
			$$apicloud.addEventListener(function(ret, err) {
				if ((new Date().getTime() - mkeyTime) > 2000) {
					mkeyTime = new Date().getTime();
					$$apicloud.toast(function() {
					}, {
						msg : "再按一次退出" + api.appName,
						duration : 2000
					})
				} else {
					if ($$com.isFunction(todo)) {
						todo()
					}
					setTimeout(function() {
						api.closeWidget({
							silent : true
						})
					}, 1000)
				}
			}, "keyback")
		},
		scrollToBottom : function(callback, eventDate) {
			$$apicloud.addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback()
				}
			}, "scrolltobottom", eventDate)
		},
		$dropupToAppend : function(callback) {
			$$apicloud.scrollToBottom(function() {
				if ($$com.isFunction(callback)) {
					callback()
				}
			}, {
				threshold : 0
			})
		},
		execScript : function(options) {
			var o = options || {};
			o = $$com.extend(defaultsOption.execScript, o);
			api.execScript(o)
		},
		$execScript : function(winName, frameName, scripts) {
			winName = winName ? winName : api.winName;
			if (frameName) {
				api.execScript({
					name : winName,
					frameName : frameName,
					script : scripts
				})
			} else {
				api.execScript({
					name : winName,
					script : scripts
				})
			}
		},
		openPicker : function(callback, options) {
			var o = options || {};
			o = $$com.extend(defaultsOption.openPicker, o);
			api.openPicker(o, function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		$openPicker : function(callback, type, dateDefaultValue, pickerTitle) {
			$$apicloud.openPicker(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, {
				type : type,
				date : dateDefaultValue,
				title : pickerTitle
			})
		},
		openApp : function(callback, options) {
			var o = options || {};
			o = $$com.extend(defaultsOption.openApp, o);
			api.openApp(o, function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		imageCache : function(callback, options) {
			var o = defaultsOption.imageCache;
			if ( typeof options == "string") {
				o.url = options
			} else {
				o = options || {};
				o = $$com.extend(defaultsOption.imageCache, o)
			}
			api.imageCache(o, function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		$imageCache : function(callback, imgUrl) {
			$$apicloud.imageCache(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, imgUrl)
		},
		readFile : function(callback, path) {
			api.readFile({
				path : path
			}, function(ret, err) {
				if (ret.status) {
					if ($$com.isFunction(callback)) {
						callback(ret, err)
					}
				} else {
					$$apicloud.alert(null, {
						msg : err
					})
				}
			})
		},
		$readFile : function(callback, path) {
			$$apicloud.readFile(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, path)
		},
		writeFile : function(callback, path, data, isAppend) {
			data = data ? data : "";
			isAppend = ( typeof arguments[3] != "boolean") ? false : arguments[3];
			api.writeFile({
				path : path,
				data : data,
				append : isAppend
			}, function(ret, err) {
				if (ret.status) {
					if ($$com.isFunction(callback)) {
						callback(ret, err)
					}
				} else {
					$$apicloud.alert(null, {
						msg : err
					})
				}
			})
		},
		$writeFile : function(callback, path, data, isAppend) {
			data = data ? data : "";
			isAppend = ( typeof arguments[3] != "boolean") ? false : arguments[3];
			$$apicloud.writeFile(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, path, data, isAppend)
		},
		loadSecureValue : function(callback, key) {
			api.loadSecureValue({
				key : key
			}, function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		download : function(callback, options) {
			defaultsOption.download.savePath = api.cacheDir + "/" + $$com.getNowDateFormat(null, null, false) + "/" + $$com.newGuid() + "." + $$com.getFileExt(options.url);
			var o = defaultsOption.download;
			if ( typeof options == "string") {
				o.url = options
			} else {
				o = options || {};
				o = $$com.extend(defaultsOption.download, o)
			}
			api.download(o, function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		cancelDownload : function(url) {
			api.cancelDownload({
				url : url
			})
		},
		$cancelDownload : function(url) {
			url = url ? url : defaultsOption.download.url;
			$$apicloud.cancelDownload(url)
		},
		$download : function(callback, url, savePath) {
			url = url ? url : defaultsOption.download.url;
			savePath = savePath ? savePath : defaultsOption.download.savePath;
			$$apicloud.download(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, {
				url : url,
				savePath : savePath
			})
		},
		notification : function(callback, options) {
			var o = options || {};
			o = $$com.extend(defaultsOption.notification, o);
			api.notification(o, function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		cancelNotification : function(id) {
			id = typeof id == "number" ? id : -1;
			api.cancelNotification({
				id : id
			})
		},
		call : function(options) {
			var o = defaultsOption.call;
			if ( typeof options == "string") {
				o.number = options
			} else {
				o = options || {};
				o = $$com.extend(defaultsOption.call, o)
			}
			api.call(o)
		},
		sms : function(callback, options) {
			var o = options || {};
			o = $$com.extend(defaultsOption.sms, o);
			if ( typeof o.numbers == "string") {
				var numbers = [];
				numbers.push(o.numbers);
				o.numbers = numbers
			}
			api.sms(o, function(ret, err) {
				if (ret.status) {
					if ($$com.isFunction(callback)) {
						callback(ret, err)
					}
				} else {
					$$apicloud.alert(null, {
						msg : err
					})
				}
			})
		},
		mail : function(callback, options) {
			var o = options || {};
			o = $$com.extend(defaultsOption.mail, o);
			if ( typeof o.recipients == "string") {
				var recipients = [];
				recipients.push(o.recipients);
				o.recipients = recipients
			}
			api.mail(o, function(ret, err) {
				if (ret.status) {
					if ($$com.isFunction(callback)) {
						callback(ret, err)
					}
				} else {
					$$apicloud.alert(null, {
						msg : "发送失败"
					})
				}
			})
		},
		openContacts : function(callback) {
			api.openContacts(function(ret, err) {
				if (ret.status) {
					if ($$com.isFunction(callback)) {
						callback(ret, err)
					}
				} else {
					$$apicloud.alert(null, {
						msg : err
					})
				}
			})
		},
		setFullScreen : function(isFullScreen) {
			isFullScreen = ( typeof arguments[0] != "boolean") ? false : arguments[0];
			api.setFullScreen({
				fullScreen : isFullScreen
			})
		},
		setScreenOrientation : function(orientation) {
			api.setScreenOrientation({
				orientation : orientation
			})
		},
		setKeepScreenOn : function(isKeepScreenOn) {
			isKeepScreenOn = ( typeof arguments[0] != "boolean") ? false : arguments[0];
			api.setKeepScreenOn({
				keepOn : isKeepScreenOn
			})
		},
		toLauncher : function() {
			if (!$$apicloud.isIOS()) {
				api.toLauncher()
			}
		},
		setAppIconBadge : function(number) {
			number = typeof number == "number" ? number : 0;
			api.setAppIconBadge({
				badge : number
			})
		},
		$shock : function(isShowMusic) {
			isShowMusic == typeof isShowMusic == "boolean" ? isShowMusic : false;
			$$apicloud.notification(null, {
				vibrate : [300, 500],
				sound : isShowMusic ? "default" : "",
				light : false
			})
		},
		saveMediaToAlbum : function(callback, path) {
			api.saveMediaToAlbum({
				path : path
			}, function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		$saveMediaToAlbum : function(path) {
			$$apicloud.saveMediaToAlbum(function(ret, err) {
				if (ret.status) {
					$$apicloud.toast("保存成功！")
				} else {
					$$apicloud.toast("保存出错！")
				}
			}, path)
		},
		startRecord : function(path) {
			var savePath = api.cacheDir + "/" + $$com.getNowDateFormat(null, null, false) + "/";
			var saveName = $$com.newGuid() + ".amr";
			path = path ? path : savePath + saveName;
			api.startRecord({
				path : path
			})
		},
		$startRecord : function() {
			$$apicloud.startRecord()
		},
		stopRecord : function(callback) {
			api.stopRecord(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		$stopRecord : function(callback) {
			$$apicloud.stopRecord(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			})
		},
		startPlay : function(callback, path) {
			api.startPlay({
				path : path
			}, function() {
				if ($$com.isFunction(callback)) {
					callback()
				}
			})
		},
		$startPlay : function(callback, path) {
			$$apicloud.startPlay(function() {
				if ($$com.isFunction(callback)) {
					callback()
				}
			}, path)
		},
		stopPlay : function() {
			api.stopPlay()
		},
		$stopPlay : function() {
			$$apicloud.stopPlay()
		},
		openVideo : function(url) {
			api.openVideo({
				url : url
			})
		},
		$openVideo : function(url) {
			$$apicloud.openVideo(url)
		},
		ready : function(callback) {
			if ($$com.isFunction(callback)) {
				win.apiready = function() {
					callback()
				}
			}
		},
		require : function(moduleName) {
			return api.require(moduleName)
		},
		$require : function(mds) {
			if ( typeof mds == "string") {
				if (mds.indexOf(",") > -1) {
					var mos = mds.split(",");
					if (mos.length > 0) {
						for (var i = 0; i < mos.length; i++) {
							if (mos[i]) {
								modules[mos[i]] = $$apicloud.require(mos[i])
							}
						}
					}
				} else {
					modules[mds] = $$apicloud.require(mds)
				}
			} else {
				if ($$com.isArray(mds)) {
					if (mds.length > 0) {
						for (var i = 0; i < mds.length; i++) {
							if (mds[i]) {
								modules[mds[i]] = $$apicloud.require(mds[i])
							}
						}
					}
				} else {
					modules[mds] = $$apicloud.require(mds)
				}
			}
		},
		$appintent : function(callback) {
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "appintent")
		},
		$batterylow : function(callback) {
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "batterylow")
		},
		$batterystatus : function(callback) {
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "batterystatus")
		},
		$keyback : function(callback) {
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "keyback")
		},
		$keymenu : function(callback) {
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "keymenu")
		},
		$offline : function(callback) {
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "offline")
		},
		$online : function(callback) {
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "online")
		},
		$pause : function(callback) {
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "pause")
		},
		$resume : function(callback) {
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "resume")
		},
		$scrolltobottom : function(callback, threshold) {
			threshold = typeof threshold == "number" ? Math.abs(threshold) : 0;
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "scrolltobottom", {
				threshold : threshold
			})
		},
		$shake : function(callback) {
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "shake")
		},
		$swipedown : function(callback) {
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "swipedown")
		},
		$swipeleft : function(callback) {
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "swipeleft")
		},
		$swiperight : function(callback) {
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "swiperight")
		},
		$swipeup : function(callback) {
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "swipeup")
		},
		$tap : function(callback) {
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "tap")
		},
		$viewappear : function(callback) {
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "viewappear")
		},
		$viewdisappear : function(callback) {
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "viewdisappear")
		},
		$noticeclicked : function(callback) {
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "noticeclicked")
		},
		$smartupdatefinish : function(callback) {
			H.$addEventListener(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err)
				}
			}, "smartupdatefinish")
		}
	};
	$$apicloud.$tppl_flag = ["[:", ":]"];
	var $$tppl = function(tpl, data) {
		var fn = function(d) {
			var i, k = [], v = [];
			for (i in d) {
				k.push(i);
				v.push(d[i])
			}
			return (new Function(k, fn.$)).apply(d, v)
		};
		if (!fn.$) {
			var tpls = tpl.replace(/[\r\n]/g, "").split($$apicloud.$tppl_flag[0]);
			fn.$ = "var $=''";
			for (var t in tpls) {
				var p = tpls[t].split($$apicloud.$tppl_flag[1]);
				if (t != 0) {
					fn.$ += "=" == p[0].charAt(0) ? "+(" + p[0].substr(1) + ")" : ";" + p[0] + "$=$"
				}
				fn.$ += "+'" + p[p.length - 1].replace(/\'/g, "\\'") + "'"
			}
			fn.$ += ";return $;"
		}
		return data ? fn(data) : fn
	};
	win.H = $$apicloud, win.H.$apicloud = $$apicloud;
	win.H.$com = $$com;
	win.H.$api = $$api;
	win.H.$tppl = $$tppl;
	win.H.$v = "1.1.2";
	win.H.$module = modules
}(window);
