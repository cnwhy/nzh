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
```

## Demo

```javascript
var nzhcn = Nzh.cn;                 // 使用简体中文，另外有 Nzh.hk -- 繁体中文  

nzhcn.encodeS(100111);              // 转中文小写 >> 十万零一百一十一
nzhcn.encodeB(100111);              // 转中文大写 >> 壹拾万零壹佰壹拾壹
nzhcn.toMoney("100111.11");         // 转中文金额 >> 人民币壹拾万零壹佰壹拾壹元壹角壹分
```

### 关于十的口语化

```javascript
// 小写默认启用
nzhcn.encodeS(13.5);                // 十三点五
nzhcn.encodeS(13.5, fasle);         // 一十三点五

// 大写默人关闭
nzhcn.encodeB(13.5);                // 壹拾叁點伍
nzhcn.encodeB(13.5, true);          // 拾叁點伍
```

### 关于关于超级大数

```javascript
// 默认未引入兆、京等单位，超千万亿位时，默认以争议较少的万万亿为单位
nzhcn.encodeS(1e16);                // 一万万亿
nzhcn.encodeS(1e16, null, false);   // 一亿亿
```

### 中文转阿拉伯数字

```javascript
nzhcn.decodeS(str);                 // 小写转数字　十万零一百一十一 =>> 100111
nzhcn.decodeB(str);                 // 大写转数字　壹拾万零壹佰壹拾壹 =>> 100111
```

### 自定义

```javascript
var custom = new Nzh({
    ch: "〇壹贰叁肆伍陆柒捌玖",     // 数字字符
    ch_u: "个十百千万亿兆京",       // 数位单位字符，万以下 10 进制，万以上万进制，个位不能省略
    other: "负点",                  // 负数，小数字符
    m_t: "人民币",                  // 金额前缀
    m_z: "正",                      // 无小数后缀
    m_u: "元角分厘",                // 金额单位
});
custom.encode("10001000000000000"); // 壹京〇壹兆
custom.decode("壹兆");              // 1000000000000
custom.toMoney("1.234");            // 人民币壹元贰角叁分肆厘
```
