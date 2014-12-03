var numtoCL = {}

numtoCL.toS = function(num,m){
    var op = {
        ch: '零一二三四五六七八九'
        ,ch_u: '个十百千万亿'
        ,toCL: this.toCL
    }
    ,f = num < 0 ? '负' : ''
    return f + op.toCL(Math.abs(num),m||false);//默认简化10－11的叫法
}

numtoCL.toB = function(num,m){
    var op = {
        ch: '零壹贰叁肆伍陆柒捌玖'
        ,ch_u: '个拾佰仟万亿'
        ,toCL: this.toCL
    }
    ,f = num < 0 ? '負' : ''
    return f + op.toCL(Math.abs(num),m||true);//默认不简化10－11的叫法
}

numtoCL.toMoney = function(num){
    var rmb = '人民币'
        ,f = num < 0 ? '负' : ''
        ,z = '整'
        ,u = '元角分'
    num = Math.abs(num);
    if(num>=10000000000000000){return '超出出范围!'}
    var _num = Math.floor(num*100)
    if(_num%100>0){
        var xs_str = ''
            ,xs = _num.toString().slice(-2);
        xs_str += this.toB(xs[0]) + (xs[0] == 0 ? '' : u[1]);
        xs_str += xs[1] == 0 ? '' : this.toB(xs[1]) + u[2];
        return rmb + f + this.toB(Math.floor(num)) + u[0] + xs_str;
    }else{
        return rmb + f + this.toB(Math.floor(num)) + u[0] + z;
    }
}
numtoCL.toCL = function(num,m){
    var n = Math.floor(+num)
        ,sn = m? num.toString().replace(/\..*$/,'') : n.toString();
    var ch = this.ch || '零一二三四五六七八九'
        ,ch_u = this.ch_u || '个十百千万亿'
        ,n0 = ch[0]
        ,reg = new RegExp(ch[0]+"*$")
        ,reg1 = new RegExp(ch[0]+"+",'g')
    if(n !== n){return '参数错误!'}
    if(n>=10000000000000000){return '超出出范围!'}
    if(!m){
        if(n<10){
            return ch[n];
        }
        if(n<20){
            return ch_u[1]+ch[+sn[1]].replace(reg,'');
        }
    }
    if(sn.length==1){
        return ch[n];
    }else if(sn.length<=4){
        var str = '';
        for(var i=0,n=sn.length;n--;){
            var _num = +sn[i];
            str += this.toCL(sn[i],true) + (_num && n?ch_u[n]:'')
            i++;
        }
        str = str.replace(reg1,n0);
        str = str.replace(reg,'')
        return str;
    }else{
        var d = sn.length/4>>0
            ,y = sn.length%4
            ,str = ''
            ,es = y || 4;
        while (y==0 || !ch_u[3+d]){
            y+=4;
            d--;
        }
        if(+sn.substr(0,y)){
            str = this.toCL(sn.substr(0,y),m) + ch_u[3+d] + this.toCL(sn.substr(y),true)
        }else{
            str = this.toCL(sn.substr(0,y),m) + this.toCL(sn.substr(y),true)
        }
        str = str.replace(reg1,n0);
        if(!m) {str = str.replace(reg,'')}
        return str;
    }
}
