/* 
待优化点
转金额规则规范化 参考 http://baike.baidu.com/link?url=lqGf7GrSnMPYvmrb4qMP_yS9k7aATfDidjsAC3eHv7Sxm76_hbamjuLaZH_g74n0Mr-a9CwIy6ekOIEK3Lt-G_
 */
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
    var nzhClass = require("./src/");
    var utils = require("./src/utils")
    var langs = {
        s:require("./src/langs/cn_s"),
        b:require("./src/langs/cn_b"),
        hk_s:require("./src/langs/hk_s"),
        hk_b:require("./src/langs/hk_b")
    }
    function getNzhObjByLang(lang_s,lang_b){
        return {
            encodeS: function (num, options) {
                options = utils.extend({ ww: Nzh._ww ,tenMin:true},options);
                return nzhClass.CL.call(lang_s, num,options);
            },
            encodeB: function (num, options) {
                options = utils.extend({ww: Nzh._ww},options);
                return nzhClass.CL.call(lang_b, num, options);
            },
            decodeS: function (){
                return nzhClass.unCL.apply(lang_s, arguments);
            },
            decodeB: function(){
                return nzhClass.unCL.apply(lang_b, arguments);
            },
            toMoney: function (num,options) {
                options = utils.extend({ww:Nzh._ww},options);
                return nzhClass.toMoney.call(lang_b, num, options);
            }
        }
    }
    var Nzh = function(lang){
        this.lang = lang;
        this.encode = function(){return nzhClass.CL.apply(lang,arguments)}
        this.decode = function(){return nzhClass.unCL.apply(lang,arguments)}
        this.toMoney = function(){return nzhClass.toMoney.apply(lang,arguments)}
    };

    Nzh.langs = langs;
    Nzh._ww = true; //默认启用 "万万"
    Nzh.cn = getNzhObjByLang(langs.s,langs.b);
    Nzh.hk = getNzhObjByLang(langs.hk_s,langs.hk_b);

    // console.log(Nzh.cn.toMoney("0",{complete:true}));
    // console.log(Nzh.cn.toMoney("10",{complete:true}));
    // console.log(Nzh.cn.toMoney("0.00",{complete:true}));
    // console.log(Nzh.cn.toMoney("0.00"));
    // console.log(Nzh.cn.toMoney("1.1"));
    // console.log(Nzh.cn.toMoney("0.11"));
    // console.log(Nzh.cn.toMoney("0.01"));
    // console.log(Nzh.cn.toMoney("1.01"));
    // console.log(Nzh.cn.toMoney("-1.1",{complete:true}));
    // console.log(Nzh.cn.toMoney("1e16",{ww:false}));
    // console.log(Nzh.cn.toMoney("1e16",{ww:true}));
    // console.log(Nzh.cn.encodeS("0",{tenMin:true}));
    // console.log(Nzh.cn.encodeS("1.00001",{tenMin:true}));
    // console.log(Nzh.cn.encodeS("1011100010",{tenMin:true}));
    // console.log(Nzh.cn.encodeS("10.011e30",{tenMin:false,ww:true}));
    // console.log(Nzh.cn.decodeS("十亿零十万"));
    //  console.log(Nzh.cn.decodeS("一亿零万三千"));
    
    // 30,0010,0010

    return Nzh;
}));
