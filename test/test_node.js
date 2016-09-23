/**
 * XadillaX created at 2016-09-23 15:04:08 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

require("should");

const Nzh = require("../nzh");

describe("test for node.js", function() {
    it("常规整数，小于亿亿（万万亿）位", function() {
        const arr = [
            [ 0, "零", "零" ],
            [ 1, "一", "壹" ],
            [ 10, "十", "壹拾" ],
            [ 12, "十二", "壹拾贰" ],
            [ 3456789, "三百四十五万六千七百八十九", "叁佰肆拾伍万陆仟柒佰捌拾玖" ],
            [ 9876543210, "九十八亿七千六百五十四万三千二百一十", "玖拾捌亿柒仟陆佰伍拾肆万叁仟贰佰壹拾" ],
            [ 1001000021, "十亿零一百万零二十一", "壹拾亿零壹佰万零贰拾壹" ],
            [
                "1010101010101010",
                "一千零一十万零一千零一十亿零一千零一十万零一千零一十",
                "壹仟零壹拾万零壹仟零壹拾亿零壹仟零壹拾万零壹仟零壹拾"
            ]
        ];
        for(let i = 0; i < arr.length; i++) {
            const n = arr[i];
            Nzh.cn.encodeS(n[0]).should.equal(n[1]);
            Nzh.cn.encodeB(n[0]).should.equal(n[2]);
            Nzh.cn.decodeS(n[1]).should.equal(n[0].toString());
            Nzh.cn.decodeB(n[2]).should.equal(n[0].toString());
        }
    });

    it("带小数的转换", function() {
        const arr = [
            [ 0.1, "零点一", "零点壹" ],
            [ 1.1, "一点一", "壹点壹" ],
            [ 10.01, "十点零一", "壹拾点零壹" ],
            [ 12.10, "十二点一", "壹拾贰点壹" ],
            [ "100111.11", "十万零一百一十一点一一", "壹拾万零壹佰壹拾壹点壹壹" ]
        ];
        for(let i = 0; i < arr.length; i++) {
            var n = arr[i];
            Nzh.cn.encodeS(n[0]).should.equal(n[1]);
            Nzh.cn.encodeB(n[0]).should.equal(n[2]);
            Nzh.cn.decodeS(n[1]).should.equal(n[0].toString());
            Nzh.cn.decodeB(n[2]).should.equal(n[0].toString());
        }
    });

    it("十的口语化测试", function() {
        const arr = [
            [ 10, "一十", "十", "壹拾", "拾" ],
            [ 100000, "一十万", "十万", "壹拾万", "拾万" ],
            [ 1000100000, "一十亿零一十万", "十亿零一十万", "壹拾亿零壹拾万", "拾亿零壹拾万" ]
        ];
        for(let i = 0; i < arr.length; i++) {
            const n = arr[i];
            Nzh.cn.encodeS(n[0]).should.equal(n[2]);
            Nzh.cn.encodeS(n[0], true).should.equal(n[2]);
            Nzh.cn.encodeS(n[0], false).should.equal(n[1]);

            Nzh.cn.encodeB(n[0]).should.equal(n[3]);
            Nzh.cn.encodeB(n[0], true).should.equal(n[4]);
            Nzh.cn.encodeB(n[0], false).should.equal(n[3]);

            Nzh.cn.decodeS(n[1]).should.equal(n[0].toString());
            Nzh.cn.decodeS(n[2]).should.equal(n[0].toString());
            Nzh.cn.decodeB(n[3]).should.equal(n[0].toString());
            Nzh.cn.decodeB(n[4]).should.equal(n[0].toString());
        }
    });

    it("超级大数（万万亿级别），万万化及非万万化", function() {
        const arr = [
            [ 1e16, "壹万万亿", "壹亿亿" ],
            [ 10.011e16, "壹拾万万零壹佰壹拾万亿", "壹拾亿零壹佰壹拾万亿" ]
        ];
        for(let i = 0; i < arr.length; i++) {
            const n = arr[i];
            Nzh.cn.encodeB(n[0]).should.equal(n[1]);
            Nzh.cn.encodeB(n[0], null, false).should.equal(n[2]);

            Nzh.cn.decodeB(n[1]).should.equal(n[0].toString());
            Nzh.cn.decodeB(n[2]).should.equal(n[0].toString());
        }
    });

    it("金额转换", function() {
        var arr = [
            [ 0, "人民币零元整", "整数0" ],
            [ 1023456789, "人民币壹拾亿零贰仟叁佰肆拾伍万陆仟柒佰捌拾玖元整", "整数" ],
            [ 1.23, "人民币壹元贰角叁分", "带小数" ],
            [ 0.23, "人民币贰角叁分", "只有小数" ],
            [ "1.000", "人民币壹元", "小数全为0" ],
            [ "0.00001", "人民币零元", "突破最小单位数" ]
        ];
        for(var i = 0; i < arr.length; i++) {
            var n = arr[i];
            Nzh.cn.toMoney(n[0]).should.equal(n[1]);
        }
    });
});
