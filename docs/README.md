# Nzh

`Nzh` 适用于开发过程中需要将数字转换为中文的场景。

以字符串的方式转换，解决超大数及浮点数等问题，请自行对原数据进行四舍五入等操作。

## 安装

```sh
$ npm install nzh --save
$ bower install nzh --save
```

## 引用

```javascript
var Nzh = require("nzh");
//var Nzhcn = require("nzh/cn"); //简单模式
//var Nzhhk = require("nzh/hk");
```
 * 注: 浏览器直接引用请使用 `dist/`文件夹中的文件

## Demo

```javascript
var nzhcn = Nzh.cn;                 // 使用简体中文，另外有 Nzh.hk -- 繁体中文   

nzhcn.encodeS(100111);              // 转中文小写 >> 十万零一百一十一
nzhcn.encodeB(100111);              // 转中文大写 >> 壹拾万零壹佰壹拾壹
nzhcn.encodeS("1.23456789e+21");    // 科学记数法字符串 >> 十二万三千四百五十六万万七千八百九十万亿
nzhcn.toMoney("100111.11");         // 转中文金额 >> 人民币壹拾万零壹佰壹拾壹元壹角壹分
```

## API
### encodeS(num,options)
转中文小写 

### encodeB(num,options)
转中文大写

### toMoney(num,options)
转中文金额

### decodeS(zh_num)
中文小写转数字

### decodeB(zh_num)
中文大写转数字

### 转换配置 options 说明
 - `tenMin`: 十的口语化开关, `encodeS`方法默认值为 `true`
 - `ww`: "万万"化开关, 默认值为 `true`
 - `complete`: 输出完整金额开关, `toMoney` 函数专用配置, 默认 `false`   
 - `outSymbol`: 输出金额前缀字符, `toMoney` 函数专用配置, 默认 `true` 

```javascript
// tenMin
// 小写默认启用
nzhcn.encodeS("13.5");                 // 十三点五
nzhcn.encodeS("13.5", {tenMin:false}); // 一十三点五
// 大写默人关闭
nzhcn.encodeB("13.5");                 // 壹拾叁點伍
nzhcn.encodeB("13.5", {tenMin:true});  // 拾叁點伍

// ww
//默认未引入兆、京等单位，超千万亿位时，默认以争议较少的万万亿为单位
nzhcn.encodeS(1e16);                // 一万万亿
nzhcn.encodeS(1e16, {ww: false});   // 一亿亿

// complete
nzhcn.toMoney("1");                        //人民币壹元整
nzhcn.toMoney("1",{complete:true});        //人民币壹元零角零分
nzhcn.toMoney("0.1");                      //人民币壹角
nzhcn.toMoney("0.1",{complete:true});      //人民币零元壹角零分

//outSymbol 
nzhcn.toMoney("1");                        //人民币壹元整
nzhcn.toMoney("1",{outSymbol:false});      //壹元整

```

### 自定义转换对像
```javascript
var custom = new Nzh({
    ch: "〇壹贰叁肆伍陆柒捌玖",      // 数字字符
    ch_u: "个十百千万亿兆京",       // 数位单位字符，万以下 10 进制，万以上万进制，个位不能省略
    ch_f: "负",                  // 负数字符
    ch_d: "点",                  // 小数字符
    m_u: "元角分厘",              // 金额单位
    m_t: "人民币",                // 金额前缀
    m_z: "正"                    // 无小数后缀
});
custom.encode("10001000000000000"); // 壹京〇壹兆
custom.decode("壹兆");              // 1000000000000
custom.toMoney("1.234");            // 人民币壹元贰角叁分肆厘
```
