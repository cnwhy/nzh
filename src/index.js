var tool = require("./utils");

//数组头部插0
function unshift0(arr, n) {
    if (n == null) n = 1;
    for (; n--;) arr.unshift(0);
}

function zero_comm(str, char_0, type) {
    str = str.split("");
    if (!type || type == "$") {
        for (var i = str.length; i--;) {
            if (str[i] == char_0) {
                str[i] = ""
            } else {
                break;
            }
        }
    }
    if (!type || type == "nto1") {
        var mark = false;
        for (var i = 0; i < str.length; i++) {
            if (str[i] == char_0) {
                if (mark) str[i] = "";
                mark = true;
            } else {
                mark = false;
            }
        }
    }
    return str.join('');
}

/**
 * 阿拉伯数字转中文数字
 * 
 * @param {String} num 阿拉伯数字/字符串 , 科学记数法字符串
 * @param {Object} opration 转换配置 万万(ww)化单位 十的口语化(tenMin)等
 * @returns String
 */
function CL(num, options) {
    var result = tool.getNumbResult(num)
    if (!result) {
        return num;
    }
    options = options ? options : {};
    var ch = this.ch         //数字 字符
        , ch_u = this.ch_u   //单位 字符
        , ch_o = this.other  //负,点 字符
        , n0 = ch.charAt(0); //零 字符
    var _int = result.int             //整数部分
        , _decimal = result.decimal   //小数部分
        , _minus = result.minus;      //负数标识
    var int = ""
        , dicimal = ""
        , minus = _minus ? ch_o.charAt(0) : ''; //符号位
   
    var encodeInt = function encodeInt(_int,_m){
        _int = tool.getNumbResult(_int).int;
        var int = "";
        var tenm = arguments.length > 1 ? arguments[1] : options.tenMin;
        //一位整数 
        if (_int.length == 1) return ch.charAt(+_int);
        //两位整数
        if (tenm && _int.length == 2 && _int.charAt(0) === "1") {
            //10的口语化处理
            int = ch_u.charAt(1);
            int += _int.charAt(1) == "0" ? "" : ch.charAt(+_int.charAt(1));
        } else if (_int.length <= 4) {
            //小于四位
            for (var i = 0, n = _int.length; n--;) {
                var _num = _int.charAt(i++);
                int += ch.charAt(+_num) + (+_num && n ? ch_u.charAt(n) : '')
            }
        } else {
            //大数递归
            var d = _int.length / 4 >> 0
                , y = _int.length % 4
                , es = y || 4;
            while (y == 0 || !ch_u.charAt(3 + d)) {
                y += 4;
                d--;
            }
            int = encodeInt(_int.substr(0, y),tenm) + ch_u.charAt(3 + d)
                + (~(_int.substr(y - 1, 2).indexOf("0")) ? n0 : '')
                + encodeInt(_int.substr(y), false)
        }
        int = zero_comm(int, n0); //修整零
        //console.log(_int,int,tenm);
        return int;
    }

    //转换小数部分
    if (_decimal) {
        _decimal = zero_comm(_decimal,"0","$"); //去除尾部0
        for (var x = 0; x < _decimal.length; x++) {
            dicimal += ch.charAt(+_decimal.charAt(x));
        }
        dicimal = dicimal ? ch_o.charAt(1) + dicimal : "";
    }

    //转换整数部分
    int = encodeInt(_int);  //转换整数
    
    //超级大数的万万化 
    if (options.ww && ch_u.length > 5) {
        var dw_w = ch_u.charAt(4), dw_y = ch_u.charAt(5);
        var lasty = int.lastIndexOf(dw_y);
        if (~lasty) {
            int = int.substring(0, lasty).replace(new RegExp(dw_y, 'g'), dw_w + dw_w) + int.substring(lasty);
        }
    }
    return minus + int + dicimal;
}

/**
 * 中文数字转阿拉伯数字
 * 
 * @param {string} cnnumb 中文数字字符串
 * @returns Number
 */
function unCL(cnnumb) {
    var result = cnnumb.split(this.other.charAt(1));
    var _int = result[0].replace(this.other.charAt(0), "")
        , _decimal = result[1]
        , _minus = !!~result[0].indexOf(this.other.charAt(0));

    var dw_w = this.ch_u.charAt(4), dw_y = this.ch_u.charAt(5);
    _int = _int.replace(new RegExp(dw_w + "{2}", "g"), dw_y);

    var cnarr = _int.split('');
    var rnum = 0, num = 0, _num = 0, dw = 0, maxdw = 0;
    var rnum_a = [], num_a = [], _num_a = [];
    function wei(u) {
        return u >= 5 ? (u - 4) * 4 + 4 : u;
    }
    for (var i = 0; i < cnarr.length; i++) {
        var chr = cnarr[i];
        var n = 0, u = 0;
        if (~(n = this.ch.indexOf(chr))) {
            //_num = _num*10 + n;
            _num_a.unshift(n);
        } else if (~(u = this.ch_u.indexOf(chr))) {
            if (dw > u) {//正常情况
                unshift0(_num_a, wei(u));
                tool.centerArray(num_a, _num_a);
            } else if (u >= maxdw) {//后跟大单位
                maxdw = u;
                if (i == 0) _num_a = [1];
                tool.centerArray(rnum_a, num_a, _num_a);
                unshift0(rnum_a, wei(u));
            } else {
                dw = u;
                tool.centerArray(num_a, _num_a);
                unshift0(num_a, wei(u));
            }
        } else {
            //return cnnumb;
        }
    }
    tool.centerArray(rnum_a, num_a, _num_a).reverse();
    var decimal = 0;
    if (_decimal) {
        rnum_a.push('.')
        decimal = '0.'
        for (var i = 0; i < _decimal.length; i++) {
            decimal += this.ch.indexOf(_decimal.charAt(i));
            rnum_a.push(this.ch.indexOf(_decimal.charAt(i)));
        }
        decimal = +decimal;

    }
    rnum = (rnum + num + _num + decimal) * (_minus ? -1 : 1);
    return rnum_a.join('');
}

/**
 * 阿拉伯数字转金额
 * 
 * @param {String} num 阿拉伯数字/字符串 , 科学记数法字符串
 * @param {Boolean} ww ww 超级大数的万万化开关
 * @returns String
 */
function toMoney(num, ww) {
    var result = tool.getNumbResult(num);
    if (!result) {
        //return '参数错误!'
        return num;
    }
    var _num = result.num
        , _decimal = result.decimal
        , ch_0 = this.ch.charAt(0);
    var xs_str = _decimal ? '' : this.m_z;
    if (_decimal) {
        var mark_0;
        for (var i = 0; i < this.m_u.length - 1; i++) {
            if(_decimal.charAt(i) != "0"){
                xs_str += CL.call(this, _decimal.charAt(i)) + this.m_u.charAt(i + 1);
            }
            if(_decimal.charAt(i) == "0" && !mark_0){
                xs_str += ch_0;
                mark_0 = true;
            }
            xs_str = zero_comm(xs_str,ch_0,"$")
        }
    }
    if (_num != "0" || xs_str == this.m_z || xs_str == '') {
        return this.m_t + CL.call(this, _num, {ww:ww}) + this.m_u.charAt(0) + xs_str;
    } else {
        return this.m_t + xs_str;
    }
}

module.exports = {
    CL:CL,
    unCL:unCL,
    toMoney:toMoney
}