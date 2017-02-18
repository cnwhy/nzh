/**
 * XadillaX created at 2016-09-23 15:04:08 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

require("should");
var Nzh = require("../nzh");
var toCN = require("./data").toCN;
var toMoney = require("./data").toMoney;
var nzhcn = Nzh.cn;

//console.log(toCN);
function inTest(td,fn){
    describe(td.name,function(){
        if(td.its){
            for(var i=0; i<td.its.length; i++){
                inTest(td.its[i],fn);
            }
        }
        if(td.data){
            //console.log(td.data);
            inIt(td.data,fn,td.args)
        }
    })
}

function inIt(list,fn,args){
    //console.log(list);
    for(var i=0; i<list.length; i++){
        (function(i){
            fn(list[i],args)
        })(i)
    }
}

var fncn = new Nzh(require("../src/langs/cn_s"));
inTest(toCN,function(data,opts){
    //console.log(data);
    it(data.join(" to "),function(){
        fncn.encode(data[0],opts).should.equal(data[1]);
        fncn.decode(data[1]).should.equal((+data[0]).toString());
    })
})

var fncnb = new Nzh(require("../src/langs/cn_b"));
inTest(toMoney,function(data,opts){
    //console.log(data);
    it(data.join(" to "),function(){
        fncnb.toMoney(data[0],opts).should.equal(data[1]);
    })
})

return;