(function (name, factory) {
	if (typeof process === "object" && typeof module === "object" && typeof module.exports) {
		module.exports = factory();
	} else if (typeof define === 'function' && (define.amd || define.cmd)) {
		define([], factory);
	} else if (typeof window !== "undefined" || typeof self !== "undefined") {
		var global = typeof window !== "undefined" ? window : self;
		global[name] = factory();
	} else {
		throw new Error("加载 " + name + " 模块失败！，请检查您的环境！")
	}
}('Nzh', function () {
	var getNzhObjByLang = require("./src/getNzh");
	var langs = {
		s: {
			ch: '零一二三四五六七八九'
			, ch_u: '个十百千万亿'
			, other: '负点'
		},
		b: {
			ch: '零壹贰叁肆伍陆柒捌玖'
			, ch_u: '个拾佰仟万亿'
			, other: '负点'
			, m_t: '人民币'
			, m_z: '整'
			, m_u: '元角分'
		},
	}
	var Nzh = { _y2ww: true }
	return getNzhObjByLang(langs.s, langs.b, Nzh);
}))