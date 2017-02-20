var nzhClass = require("./");
var utils = require("./utils")
function getNzhObjByLang(lang_s, lang_b) {
	return {
		encodeS: function (num, options) {
			options = utils.extend({ ww: true, tenMin: true }, options);
			return nzhClass.CL.call(lang_s, num, options);
		},
		encodeB: function (num, options) {
			options = utils.extend({ ww: true }, options);
			return nzhClass.CL.call(lang_b, num, options);
		},
		decodeS: function () {
			return nzhClass.unCL.apply(lang_s, arguments);
		},
		decodeB: function () {
			return nzhClass.unCL.apply(lang_b, arguments);
		},
		toMoney: function (num, options) {
			options = utils.extend({ ww: true }, options);
			return nzhClass.toMoney.call(lang_b, num, options);
		}
	}
}
module.exports = getNzhObjByLang;