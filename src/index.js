var utils = require("./utils");

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
	var result = utils.getNumbResult(num)
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
				int += (_num && n ? ch_u.charAt(n) : '')
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
				+ encodeInt(_other, _other.length > 4 ? tenm : false) 
		}
		int = utils.clearZero(int, n0); //修整零
		return int;
	}

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
		rnum_a.push('.')
		decimal = '0.'
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

module.exports = {
	CL: CL,
	unCL: unCL,
	toMoney: toMoney
}