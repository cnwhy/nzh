var getNzhObjByLang = require("./src/autoGet");
var langs = {
	s: require("./src/langs/hk_s"),
	b: require("./src/langs/hk_b"),
}
module.exports = getNzhObjByLang(langs.s, langs.b);