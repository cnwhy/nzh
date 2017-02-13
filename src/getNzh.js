var nzhClass = require("./");
function getNzhObjByLang( lang_s, lang_b, obj) {
	obj = obj || {};
	obj.encodeS = function (num, m, ww) {
		return nzhClass.CL.call(lang_s, num,{
			ww: ww == null? obj._y2ww : ww,
			tenMin: m == null ? true : m
		});
	}
	obj.encodeB = function (num, m, ww) {
		return nzhClass.CL.call(lang_b, num, {
			ww: ww == null? obj._y2ww : ww,
			tenMin: m
		});
	}
	obj.decodeS = function (str) {
		return nzhClass.unCL.call(lang_s, str);
	}
	obj.decodeB = function (str) {
		return nzhClass.unCL.call(lang_b, str);
	}
	obj.toMoney = function (num, ww) {
		return nzhClass.toMoney.call(lang_b, num, (ww == null ? obj._y2ww : ww));
	}
	return obj;
}
module.exports = getNzhObjByLang;