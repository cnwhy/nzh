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
    var regs = {
        number : /^([+-])?0*(\d+)(\.(\d+))?$/
        ,number_e: /^([+-])?0*(\d+)(\.(\d+))?e(([+-])?(\d+))$/i  //科学计数法
        ,is10to19 : /^1\d$/
    }
    function unshift0(arr,n){
        if(n == null) n=1; 
        for(;n--;) arr.unshift(0);
    }
    function centerarr(barr, sarr /*[, array2[, ...[, arrayN]]]*/) {
        barr.splice.apply(barr,[0,sarr.length].concat(sarr.splice(0, sarr.length)));
        if (arguments.length > 2) {
            var r = [].slice.call(arguments, 2);
            r.unshift(barr);
            centerarr.apply(null, r);
        }
        return barr;
    }
    //科学记数法转10进制
    function e2ten(num){
        var result = regs.number_e.exec(num.toString());
        if(!result) return num;
        var zs = result[2]
            ,xs = result[4] || ""
            ,e = result[5] ? +result[5] : 0;
        if(e > 0){
            var _zs = xs.substr(0,e);
            _zs = _zs.length < e ? _zs + new Array(e-_zs.length+1).join("0"):_zs;
            xs = xs.substr(e);
            zs += _zs;
        }else{
            e = -e;
            var s_start = zs.length - e;
            s_start = s_start < 0 ? 0 : s_start;
            var _xs = zs.substr(s_start,e);
            _xs = _xs.length < e ? new Array(e-_xs.length+1).join("0") + _xs : _xs;
            zs = zs.substring(0,s_start);
            xs = _xs + xs;
        }
        zs = zs == "" ? "0" : zs;
        return (result[1] == "-" ? "-": "") + zs + (xs ? "." + xs : "");
    }
    function zero_comm(str,char_0,type){
        str = str.split("");
        if(!type || type=="$"){
            for(var i=str.length;i--;){
                if(str[i] == char_0){
                    str[i]=""
                }else{
                    break;
                }
            }
        }
        if(!type || type=="nto1"){
            var mark = false;
            for(var i=0;i<str.length;i++){
                if(str[i] == char_0){
                    if(mark) str[i] = "";
                    mark = true;                
                }else{
                    mark = false;
                }
            }
        }
        return str.join('');
    }
    function getNumbResult(num){
        var result = regs.number.exec(num.toString());
        if(!result && regs.number_e.test(num.toString())){
            result = regs.number.exec(e2ten(num.toString()))
        }
        if(result){
            return {
                int: result[2],
                decimal: result[4],
                minus: result[1] == "-",
                num: result.slice(1,3).join('')
            }
        }
    }
    function toCL(num,m,ww,dg){
        var result = getNumbResult(num)
        if(!result){
            return num;
        }
        var ch = this.ch
            ,ch_u = this.ch_u
            ,ch_o = this.other
            ,n0 = ch.charAt(0)
        var _int = result.int
            ,_decimal = result.decimal
            ,_minus = result.minus;
        var int = ""
            ,dicimal = ""
            ,minus = _minus ? ch_o.charAt(0) : ''; //符号位
        
        //转换小数部分
        if(_decimal){
            _decimal = zero_comm(_decimal,"0","$"); //去除尾部0
            for(var x=0 ; x < _decimal.length ; x++){
                dicimal += ch.charAt(+_decimal.charAt(x));
            }
            dicimal = dicimal ? ch_o.charAt(1) + dicimal : "";
        }

        //转换整数部分
        
        //一位整数 
        if(_int.length == 1) return minus + ch.charAt(+_int) + dicimal;

        //两位整数
        if(m && _int.length == 2 && _int.charAt(0) === "1"){
        //10的口语化处理
            int = ch_u.charAt(1);
            int += _int.charAt(1) == "0" ? "" : ch.charAt(+_int.charAt(1));
        }else if(_int.length<=4){
        //小于四位
            for(var i=0,n=_int.length;n--;){
                var _num = _int.charAt(i++);
                int += ch.charAt(+_num) + (+_num && n?ch_u.charAt(n):'')
            }
        }else{
        //大数递归
            var d = _int.length/4>>0
                ,y = _int.length%4
                ,es = y || 4;
            while (y==0 || !ch_u.charAt(3+d)){
                y+=4;
                d--;
            }
            int = toCL.call(this,_int.substr(0,y),m,ww,1) + ch_u.charAt(3+d) 
                    + (~(_int.substr(y-1,2).indexOf("0"))?n0:'') 
                    + toCL.call(this,_int.substr(y),false,ww,1)
        }
        
        //清理多余的‘零’
        int = zero_comm(int,n0);

        if(!dg && ww && ch_u.length>5){
            var dw_w = ch_u.charAt(4), dw_y = ch_u.charAt(5);
            var lasty = int.lastIndexOf(dw_y);
            if(~lasty){
                int = int.substring(0,lasty).replace(new RegExp(dw_y,'g'),dw_w+dw_w) + int.substring(lasty);
                
            }
        }
        return minus + int + dicimal;
    }
    function unCL(cnnumb){
        var result = cnnumb.split(this.other.charAt(1));
        var _int = result[0].replace(this.other.charAt(0),"")
            ,_decimal = result[1]
            ,_minus = !!~result[0].indexOf(this.other.charAt(0));
        
        var dw_w = this.ch_u.charAt(4), dw_y = this.ch_u.charAt(5);
        _int = _int.replace(new RegExp(dw_w+"{2}","g"),dw_y);

        var cnarr = _int.split('');
        var rnum=0,num=0,_num=0,dw=0,maxdw=0;
        var rnum_a=[],num_a=[],_num_a=[];
        function wei(u){
            return u >= 5 ? (u-4)*4+4 : u;
        }
        for(var i=0;i<cnarr.length;i++){
            var chr = cnarr[i];
            var n=0,u=0;
            if(~(n = this.ch.indexOf(chr))){
                //_num = _num*10 + n;
                _num_a.unshift(n);
            }else if(~(u = this.ch_u.indexOf(chr))){
                if(dw>u){//正常情况
                    unshift0(_num_a,wei(u));
                    centerarr(num_a,_num_a);
                }else if(u>=maxdw){//后跟大单位
                    maxdw = u;
                    if(i==0) _num_a=[1];
                    centerarr(rnum_a,num_a,_num_a);
                    unshift0(rnum_a,wei(u));
                }else{
                    dw = u;
                    centerarr(num_a,_num_a);
                    unshift0(num_a,wei(u));
                }
            }else{
                //return cnnumb;
            }
        }
        centerarr(rnum_a,num_a,_num_a).reverse();
        var decimal = 0;
        if(_decimal){
            rnum_a.push('.')
            decimal = '0.'
            for(var i=0; i<_decimal.length; i++){
                decimal+=this.ch.indexOf(_decimal.charAt(i));
                rnum_a.push(this.ch.indexOf(_decimal.charAt(i)));
            }
            decimal = +decimal;

        }
        rnum = (rnum + num + _num + decimal)*(_minus?-1:1);
        return rnum_a.join('');
    }
    function toMoney(num,ww){
        var result = getNumbResult(num);
        if(!result){
            //return '参数错误!'
            return num;
        }
        var _num = result.num
            ,_decimal = result.decimal;
        
        var xs_str = _decimal ? '' : this.m_z;
        if(_decimal){
            for(var i=0; i<this.m_u.length-1;i++){
                xs_str += _decimal.charAt(i) == 0 ? '' : toCL.call(this,_decimal.charAt(i)) + this.m_u.charAt(i+1);
            }
        }
        if(_num != "0" || xs_str == this.m_z || xs_str == ''){
            return this.m_t + toCL.call(this,_num,null,ww) + this.m_u.charAt(0) + xs_str;
        }else{
            return this.m_t + xs_str;
        }
    }
    function getNzhObjByLang(lang_s,lang_b){
        return {
            encodeS: function(num,m,ww){
                return toCL.call(lang_s,num,(m == null ? true : m),(ww == null ? Nzh._y2ww : ww));
            },
            encodeB: function(num,m,ww){
                return toCL.call(lang_b,num,m,(ww == null ? Nzh._y2ww : ww));
            },
            decodeS: function(str){
                return unCL.call(lang_s,str);
            },
            decodeB: function(str){
                return unCL.call(lang_b,str);
            },
            toMoney: function(num,ww){
                return toMoney.call(lang_b,num,(ww == null ? Nzh._y2ww : ww));
            }
        }
    }

    var Nzh = function(lang){
        this.lang = lang;
    };
    Nzh.prototype = {
        encode:function(){return toCL.apply(this.lang,arguments)}
        ,decode:function(){return unCL.apply(this.lang,arguments)}
        ,toMoney:function(){return toMoney.apply(this.lang,arguments)}
    }
    Nzh.langs = langs;
    Nzh._y2ww = true; //默认启用 "万万"
    Nzh.cn = getNzhObjByLang(langs.s,langs.b);
    Nzh.hk = getNzhObjByLang(langs.s_hk,langs.b_hk);

    return Nzh;
}));
