'use strict';
var REG_NUMBER = /^([+-])?0*(\d+)(\.(\d+))?$/;
var REG_E = /^([+-])?0*(\d+)(\.(\d+))?e(([+-])?(\d+))$/i;

//科学计数法转十进制
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
}

exports.getNumbResult = function (num) {
	var result = REG_NUMBER.exec(num.toString());
	if (!result && REG_E.test(num.toString())) {
		result = REG_NUMBER.exec(e2ten(num.toString()))
	}
	if (result) {
		return {
			int: result[2],
			decimal: result[4],
			minus: result[1] == "-",
			num: result.slice(1, 3).join('')
		}
	}
}

//数组归一 (按索引覆盖合并数组,并清空被合并的数组)
exports.centerArray = function centerArray(baseArray, array1 /*[, array2[, ...[, arrayN]]]*/) {
    baseArray.splice.apply(baseArray,[0,array1.length].concat(array1.splice(0, array1.length)));
    if (arguments.length > 2) {
        var r = [].slice.call(arguments, 2);
        r.unshift(baseArray);
        centerArray.apply(null, r);
    }
    return baseArray;
}