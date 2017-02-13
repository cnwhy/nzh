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
        s_hk:{
            ch: '零一二三四五六七八九'
            ,ch_u: '個十百千萬億'
            ,other: '負點' 
        },
        b_hk:{
            ch: '零壹貳參肆伍陸柒捌玖'
            ,ch_u: '個拾佰仟萬億'
            ,other: '負點' 
            ,m_t: '$'
            ,m_z: '整'
            ,m_u: '圓角分'
        }
    }
	var Nzh = { _y2ww: true }
	return getNzhObjByLang(langs.s_hk, langs.b_hk, Nzh);
}))