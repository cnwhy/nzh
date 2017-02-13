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
    var nzhClass = require("./src");
    var langs = {
        s:{
            ch: '零一二三四五六七八九'
            ,ch_u: '个十百千万亿'
            ,other: '负点'
        },
        b:{
            ch: '零壹贰叁肆伍陆柒捌玖'
            ,ch_u: '个拾佰仟万亿'
            ,other: '负点'
            ,m_t: '人民币'
            ,m_z: '整'
            ,m_u: '元角分'
        },
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
    function getNzhObjByLang(lang_s,lang_b){
        return {
            encodeS: function (num, m, ww) {
                return nzhClass.CL.call(lang_s, num,{
                    ww: ww == null? Nzh._y2ww : ww,
                    tenMin: m == null ? true : m
                });
            },
            encodeB: function (num, m, ww) {
                return nzhClass.CL.call(lang_b, num, {
                    ww: ww == null? Nzh._y2ww : ww,
                    tenMin: m
                });
            },
            decodeS: function (str) {
                return nzhClass.unCL.call(lang_s, str);
            },
            decodeB: function(str){
                return nzhClass.unCL.call(lang_b,str);
            },
            toMoney: function (num, ww) {
                return nzhClass.toMoney.call(lang_b, num, (ww == null ? Nzh._y2ww : ww));
            }
        }
    }
    var Nzh = function(lang){
        this.lang = lang;
    };
    Nzh.prototype = {
        encode:function(){return nzhClass.toCL.apply(this.lang,arguments)}
        ,decode:function(){return nzhClass.unCL.apply(this.lang,arguments)}
        ,toMoney:function(){return nzhClass.toMoney.apply(this.lang,arguments)}
    }
    Nzh.langs = langs;
    Nzh._y2ww = true; //默认启用 "万万"
    Nzh.cn = getNzhObjByLang(langs.s,langs.b);
    Nzh.hk = getNzhObjByLang(langs.s_hk,langs.b_hk);
    return Nzh;
}));
