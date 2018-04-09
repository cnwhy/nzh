var nzhClass = require("./src/");
var utils = require("./src/utils")
var getNzhObjByLang = require("./src/autoGet");
var langs = {
	s:require("./src/langs/cn_s"),
	b:require("./src/langs/cn_b"),
	hk_s:require("./src/langs/hk_s"),
	hk_b:require("./src/langs/hk_b")
}
var Nzh = function(lang){
	this.lang = lang;
	this.encode = function(){return nzhClass.CL.apply(lang,arguments)}
	this.decode = function(){return nzhClass.unCL.apply(lang,arguments)}
	this.toMoney = function(){return nzhClass.toMoney.apply(lang,arguments)}
}
Nzh.langs = langs;
Nzh.cn = getNzhObjByLang(langs.s,langs.b);
Nzh.hk = getNzhObjByLang(langs.hk_s,langs.hk_b);
module.exports = Nzh;