# Nzh

`Nzh` 适用于需要转换**阿拉伯数字**与**中文数字**的场景。  
特点如下:  
 - 以字符串的方式转换，没有超大数及浮点数等问题(请自行对原数据进行四舍五入等操作)
 - 支持科学记数法字符串的转换
 - 支持口语化
 - 支持自定义转换(不论是`兆`,`京`还是`厘`都可以用)
 - 对超大数支持用争议较少的`万万亿`代替`亿亿`
 - 当然,你还可以把中文数字再转回阿拉伯数字

## 安装

```sh
$ npm install nzh --save
$ bower install nzh --save
```

## 引用

```javascript
var Nzh = require("nzh");
var nzhcn = require("nzh/cn"); //直接使用简体中文
var nzhhk = require("nzh/hk"); //繁体中文
```
> 注: 浏览器直接引用请使用 `dist/`文件夹中的文件 (适配CMD,AMD);

## 示例

```javascript
var nzhcn = Nzh.cn;                 // 使用简体中文,  另外有 Nzh.hk -- 繁体中文

nzhcn.encodeS(100111);              // 转中文小写 >> 十万零一百一十一
nzhcn.encodeB(100111);              // 转中文大写 >> 壹拾万零壹佰壹拾壹
nzhcn.encodeS("1.23456789e+21");    // 科学记数法字符串 >> 十二万三千四百五十六万万七千八百九十万亿
nzhcn.toMoney("100111.11");         // 转中文金额 >> 人民币壹拾万零壹佰壹拾壹元壹角壹分
```

## API

### Nzh.cn / Nzh.hk

为方便使用，默认实现了两个对像: 

 - `Nzh.cn` 简体中文
 - `Nzh.hk` 正体中文(繁体中文)

都包含以下方法:

 - `encodeS(num,options)` 转中文小写
 - `encodeB(num,options)` 转中文大写
 - `toMoney(num,options)` 转中文金额
 - `decodeS(zh_num)` 中文小写转数字
 - `decodeB(zh_num)` 中文大写转数字
 
```javascript
// options.tenMin

// encodeS默认true
nzhcn.encodeS("13.5");                 // 十三点五
nzhcn.encodeS("13.5", {tenMin:false}); // 一十三点五
// encodeB默人false
nzhcn.encodeB("13.5");                 // 壹拾叁點伍
nzhcn.encodeB("13.5", {tenMin:true});  // 拾叁點伍

// options.ww

//Nzh.cn和Nzh.hk未引入兆、京等单位，超千万亿位时，默认以争议较少的万万亿为单位
nzhcn.encodeS(1e16);                // 一万万亿
nzhcn.encodeS(1e16, {ww: false});   // 一亿亿

// options.complete

nzhcn.toMoney("1");                        //人民币壹元整
nzhcn.toMoney("1",{complete:true});        //人民币壹元零角零分
nzhcn.toMoney("0.1");                      //人民币壹角
nzhcn.toMoney("0.1",{complete:true});      //人民币零元壹角零分

//outSymbol  默认 true
nzhcn.toMoney("1");                        //人民币壹元整
nzhcn.toMoney("1",{outSymbol:false});      //壹元整
```
### options 说明
 - `tenMin`: 十的口语化开关, 默认值为 `false`
    - *注: `Nzh.cn`和`Nzh.hk`中的`encodeS`方法默认 `true`*
 - `ww`: "万万"化开关, 默认值为 `true`
 - `complete`: 输出完整金额开关, `toMoney` 函数专用配置, 默认 `false`   
 - `outSymbol`: 输出金额前缀字符, `toMoney` 函数专用配置, 默认 `true` 

### new Nzh(langs) 自定义

```javascript
var nzh = new Nzh({
    ch: "〇壹贰叁肆伍陆柒捌玖",      // 数字字符
    ch_u: "个十百千万亿兆京",       // 数位单位字符，万以下十进制，万以上万进制，个位不能省略
    ch_f: "负",                   // 负字符
    ch_d: "点",                   // 小数点字符
    m_u: "元角分厘",              // 金额单位
    m_t: "人民币",                // 金额前缀
    m_z: "正"                    // 金额无小数后缀
});
nzh.encode("10001000000000000"); // 壹京〇壹兆
nzh.decode("壹兆");              // 1000000000000
nzh.toMoney("1.234");           // 人民币壹元贰角叁分肆厘
```

#### nzh.encode(num,options)
数字转中文

#### nzh.decode(zh_num,options)
中文转数字

#### nzh.toMoney(num,options)
数字转金额

## 参考资料
- [繁读法](https://baike.baidu.com/item/%E7%B9%81%E8%AF%BB%E6%B3%95)
- [中文数字](https://baike.baidu.com/item/%E4%B8%AD%E6%96%87%E6%95%B0%E5%AD%97)
