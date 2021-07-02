/*!
 * nzh v1.0.5
 * Homepage http://cnwhy.github.io/nzh
 * License BSD-2-Clause
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Nzh = factory());
}(this, (function () { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var utils = createCommonjsModule(function (module, exports) {
	var REG_NUMBER = /^([+-])?0*(\d+)(\.(\d+))?$/;
	var REG_E = /^([+-])?0*(\d+)(\.(\d+))?e(([+-])?(\d+))$/i;

	/**
	 * 科学计数法转十进制
	 * 
	 * @param {string} num 科学记数法字符串
	 * @returns string 
	 */
	var e2ten = exports.e2ten = function (num) {
		var result = REG_E.exec(num.toString());
		if (!result) return num;
		var zs = result[2]
			, xs = result[4] || ""
			, e = result[5] ? +result[5] : 0;
		if (e > 0) {
			var _zs = xs.substr(0, e);
			_zs = _zs.length < e ? _zs + new Array(e - _zs.length + 1).join("0") : _zs;
			xs = xs.substr(e);
			zs += _zs;
		} else {
			e = -e;
			var s_start = zs.length - e;
			s_start = s_start < 0 ? 0 : s_start;
			var _xs = zs.substr(s_start, e);
			_xs = _xs.length < e ? new Array(e - _xs.length + 1).join("0") + _xs : _xs;
			zs = zs.substring(0, s_start);
			xs = _xs + xs;
		}
		zs = zs == "" ? "0" : zs;
		return (result[1] == "-" ? "-" : "") + zs + (xs ? "." + xs : "");
	};

	/**
	 * 分析数字字符串
	 * 
	 * @param {string} num NumberString
	 * @returns object
	 */
	exports.getNumbResult = function (num) {
		var result = REG_NUMBER.exec(num.toString());
		if (!result && REG_E.test(num.toString())) {
			result = REG_NUMBER.exec(e2ten(num.toString()));
		}
		if (result) {
			return {
				int: result[2],
				decimal: result[4],
				minus: result[1] == "-",
				num: result.slice(1, 3).join('')
			}
		}
	};

	/**
	 * 数组归一 (按索引覆盖合并数组,并清空被合并的数组)
	 * 
	 * @param {array} baseArray 基础数组
	 * @param {...array} array1 
	 * @returns array
	 */
	exports.centerArray = function centerArray(baseArray, array1 /*[, array2[, ...[, arrayN]]]*/) {
		baseArray.splice.apply(baseArray, [0, array1.length].concat(array1.splice(0, array1.length)));
		if (arguments.length > 2) {
			var r = [].slice.call(arguments, 2);
			r.unshift(baseArray);
			centerArray.apply(null, r);
		}
		return baseArray;
	};

	/**
	 * 检查对像属性 (非原型链)
	 * 
	 * @param {object} obj
	 * @param {string} key
	 * @returns
	 */
	var hasAttr = exports.hasAttr = function (obj, key) {
		return Object.prototype.hasOwnProperty.call(obj, key);
	};

	/**
	 * 扩展对像(浅复制)
	 * 
	 * @param {object} obj
	 * @param {object} obj1
	 * @returns
	 */
	exports.extend = function (obj) {
		var name
			, target = arguments[0] || {};
		var objs = Array.prototype.slice.call(arguments, 1);

		for (var i = 0; i < objs.length; i++) {
			var _obj = objs[i];
			for (name in _obj) {
				if (hasAttr(_obj, name)) {
					target[name] = _obj[name];
				}
			}
		}
		return target;
	};


	/**
	 * 获取真实数位
	 * 
	 * @param {number} index 中文单位的索引
	 */
	exports.getDigit = function (index) {
		return index >= 5 ? (index - 4) * 4 + 4 : index;
	};

	/**
	 * 往数组头部插入0
	 * 
	 * @param {array} arr 
	 * @param {number} n 
	 */
	exports.unshiftZero = function (arr, n) {
		if (n == null) n = 1;
		if (n <= 0) return;
		for (; n--;) arr.unshift(0);
	};

	/**
	 * 清理多余"零"
	 * 
	 * @param {any} str 
	 * @param {any} zero "零"字符
	 * @param {any} type 清理模式 ^ - 开头, $ - 结尾, nto1 - 多个连续变一个
	 * @returns 
	 */
	exports.clearZero = function (str, zero, type) {
		if (str == null) return "";
		var reg0 = ~"*.?+$^[](){}|\\/".indexOf(zero) ? "\\" + zero : zero;
		var arg_s = new RegExp("^" + reg0 + "+")
			, arg_e = new RegExp(reg0 + "+$")
			, arg_d = new RegExp(reg0 + "{2}", "g");
		str = str.toString();
		if (type == "^") {
			str = str.replace(arg_s, "");
		}
		if (!type || type == "$") {
			str = str.replace(arg_e, "");
		}
		if (!type || type == "nto1") {
			str = str.replace(arg_d, zero);
		}
		return str;
	};
	});
	var utils_1 = utils.e2ten;
	var utils_2 = utils.getNumbResult;
	var utils_3 = utils.centerArray;
	var utils_4 = utils.hasAttr;
	var utils_5 = utils.extend;
	var utils_6 = utils.getDigit;
	var utils_7 = utils.unshiftZero;
	var utils_8 = utils.clearZero;

	/**
	 * 阿拉伯数字转中文数字
	 * 
	 * @param {String} num 阿拉伯数字/字符串 , 科学记数法字符串
	 * @param {Object} opration 转换配置
	 *                          {
	 *                              ww: {万万化单位 | false}
	 *                              tenMin: {十的口语化 | false}
	 *                          }
	 * @returns String
	 */
	function CL(num, options) {
		var result = utils.getNumbResult(num);
		if (!result) {
			return num;
		}
		options = options ? options : {};
		var ch = this.ch             //数字
			, ch_u = this.ch_u       //单位
			, ch_f = this.ch_f || "" //负
			, ch_d = this.ch_d || "." //点
			, n0 = ch.charAt(0); //零
		var _int = result.int             //整数部分
			, _decimal = result.decimal   //小数部分
			, _minus = result.minus;      //负数标识
		var int = ""
			, dicimal = ""
			, minus = _minus ? ch_f : ''; //符号位
		var encodeInt = function encodeInt(_int, _m, _dg) {
			_int = utils.getNumbResult(_int).int;
			var int = ""
				, tenm = arguments.length > 1 ? arguments[1] : options.tenMin
				, _length = _int.length;
			//一位整数 
			if (_length == 1) return ch.charAt(+_int);
			if (_length <= 4) { //四位及以下
				for (var i = 0, n = _length; n--;) {
					var _num = +_int.charAt(i);
					int += (tenm && _length == 2 && i == 0 && _num == 1) ? "" : ch.charAt(_num);
					int += (_num && n ? ch_u.charAt(n) : '');
					i++;
				}
			} else {  //大数递归
				var d = _int.length / 4 >> 0
					, y = _int.length % 4;
				//"兆","京"等单位处理
				while (y == 0 || !ch_u.charAt(3 + d)) {
					y += 4;
					d--;
				}
				var _maxLeft = _int.substr(0, y), //最大单位前的数字
					_other = _int.substr(y); //剩余数字

				int = encodeInt(_maxLeft, tenm) + ch_u.charAt(3 + d) 
					+ (_other.charAt(0) == '0' ? n0 : '') //单位后有0则加零 
					+ encodeInt(_other, _other.length > 4 ? tenm : false); 
			}
			int = utils.clearZero(int, n0); //修整零
			return int;
		};

		//转换小数部分
		if (_decimal) {
			_decimal = utils.clearZero(_decimal, "0", "$"); //去除尾部0
			for (var x = 0; x < _decimal.length; x++) {
				dicimal += ch.charAt(+_decimal.charAt(x));
			}
			dicimal = dicimal ? ch_d + dicimal : "";
		}

		//转换整数部分
		int = encodeInt(_int);  //转换整数

		//超级大数的万万化 
		if (options.ww && ch_u.length > 5) {
			var dw_w = ch_u.charAt(4)
				, dw_y = ch_u.charAt(5);
			var lasty = int.lastIndexOf(dw_y);
			if (~lasty) {
				int = int.substring(0, lasty).replace(new RegExp(dw_y, 'g'), dw_w + dw_w) + int.substring(lasty);
			}
		}
		return minus + int + dicimal;
	}

	/**
	 * 中文数字转阿拉伯数字
	 * 
	 * @param {string} cnnumb 中文数字字符串
	 * @returns Number
	 */
	function unCL(cnnumb) {
		cnnumb = cnnumb.toString();
		var result = cnnumb.split(this.ch_d);
		var _int = result[0].replace(this.ch_f, "")
			, _decimal = result[1]
			, _minus = !!~result[0].indexOf(this.ch_f);

		var dw_s = this.ch_u.charAt(1)
			, dw_w = this.ch_u.charAt(4)
			, dw_y = this.ch_u.charAt(5);

		_int = _int.replace(new RegExp(dw_w + "{2}", "g"), dw_y);

		var cnarr = _int.split('');
		var dw = 0, maxdw = 0;
		var rnum_a = [], num_a = [], _num_a = [];
		for (var i = 0; i < cnarr.length; i++) {
			var chr = cnarr[i];
			var n = 0, u = 0;
			if (~(n = this.ch.indexOf(chr))) {
				//_num = _num*10 + n;
				if (n > 0) _num_a.unshift(n);
				//_num_a.unshift(n);
			} else if (~(u = this.ch_u.indexOf(chr))) {
				var digit = utils.getDigit(u);
				if (dw > u) {//正常情况
					utils.unshiftZero(_num_a, digit);
					utils.centerArray(num_a, _num_a);
				} else if (u >= maxdw) {//后跟大单位
					if (i == 0) _num_a = [1];
					utils.centerArray(rnum_a, num_a, _num_a);
					if (rnum_a.length > 0) utils.unshiftZero(rnum_a, digit);
					maxdw = u;
				} else {
					if (_num_a.length == 0 && dw_s == chr) _num_a = [1];
					utils.centerArray(num_a, _num_a);
					utils.unshiftZero(num_a, utils.getDigit(u));
					dw = u;
				}
			}
		}
		utils.centerArray(rnum_a, num_a, _num_a).reverse();
		if (rnum_a.length == 0) rnum_a.push(0);
		var decimal = 0;
		if (_decimal) {
			rnum_a.push('.');
			decimal = '0.';
			for (var i = 0; i < _decimal.length; i++) {
				decimal += this.ch.indexOf(_decimal.charAt(i));
				rnum_a.push(this.ch.indexOf(_decimal.charAt(i)));
			}
			decimal = +decimal;

		}
		if (_minus) rnum_a.unshift('-');
		return parseFloat(rnum_a.join(''));
	}

	/**
	 * 阿拉伯数字转金额
	 * 
	 * @param {String} num 阿拉伯数字/字符串 , 科学记数法字符串
	 * @param {Object} options 转换配置
	 *                         {
	 *                             ww:{万万化开关 | true},
	 *                             complete:{完整金额格式 | false},
	 *                             outSymbol:{就否输出金额符号 | true}                             
	 *                         }
	 * @returns String
	 */
	function toMoney(num, options) {
		var def = { ww: true, complete: false, outSymbol: true };
		var result = utils.getNumbResult(num);
		var ch_0 = this.ch.charAt(0);
		options = typeof options == "object" ? options : {};
		if (!result) { return num; }
		options = utils.extend(def, options);

		var _num = result.num
			, _decimal = result.decimal || "";
		var t_str = options.outSymbol ? this.m_t : ""
			, zs_str = _decimal ? "" : this.m_z
			, xs_str = "";

		if (options.complete) {
			for (var i = 1; i < this.m_u.length; i++) {
				xs_str += CL.call(this, _decimal.charAt(i - 1) || "0") + this.m_u.charAt(i);
			}
			zs_str = CL.call(this, _num, options) + this.m_u.charAt(0);
		} else {
			_decimal = _decimal.substr(0, this.m_u.length-1); 
			_decimal = utils.clearZero(_decimal, "0", "$"); //去除尾部的0
			if (_decimal) {
				var mark_0;
				for (var i = 0; i < this.m_u.length - 1; i++) {
					if (_decimal.charAt(i) && _decimal.charAt(i) != "0") {
						xs_str += CL.call(this, _decimal.charAt(i)) + this.m_u.charAt(i + 1);
						mark_0 = false;
					}
					if (_decimal.charAt(i) === "0" && !mark_0) {
						if (i != 0 || _num != "0") xs_str += ch_0; //当整为0时,小数前无需加零
						mark_0 = true;
					}
				}
				//if(_num == "0"){xs_str = utils.clearZero(xs_str,ch_0,"^")}
			}
			if (_num != "0" || zs_str || !xs_str) {
				zs_str = CL.call(this, _num, options) + this.m_u.charAt(0) + zs_str;
			}
		}
		return t_str + zs_str + xs_str;
	}

	var src = {
		CL: CL,
		unCL: unCL,
		toMoney: toMoney
	};

	function getNzhObjByLang(lang_s, lang_b) {
		return {
			encodeS: function (num, options) {
				options = utils.extend({ ww: true, tenMin: true }, options);
				return src.CL.call(lang_s, num, options);
			},
			encodeB: function (num, options) {
				options = utils.extend({ ww: true }, options);
				return src.CL.call(lang_b, num, options);
			},
			decodeS: function () {
				return src.unCL.apply(lang_s, arguments);
			},
			decodeB: function () {
				return src.unCL.apply(lang_b, arguments);
			},
			toMoney: function (num, options) {
				options = utils.extend({ ww: true }, options);
				return src.toMoney.call(lang_b, num, options);
			}
		}
	}
	var autoGet = getNzhObjByLang;

	var hk_s = {
	    ch: '零一二三四五六七八九'
	    ,ch_u: '個十百千萬億'
	    ,ch_f: '負'
	    ,ch_d: '點'
	};

	var hk_b = {
	    ch: '零壹貳參肆伍陸柒捌玖'
	    ,ch_u: '個拾佰仟萬億'
	    ,ch_f: '負'
	    ,ch_d: '點'
	    ,m_t: '$'
	    ,m_z: '整'
	    ,m_u: '圓角分'
	};

	var langs = {
		s: hk_s,
		b: hk_b,
	};
	var hk = autoGet(langs.s, langs.b);

	return hk;

})));
