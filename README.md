nzh
=====

nzh适用于开发过程中需要将数字转换为中文的场景。  

## demo  
```
var nzhcn = nzh.cn;   //使用简体中文,另外有nzh.hk -- 繁体中文  

nzhcn.encodeS(num)    //转中文小写 100111 =>> 十万零一百一十一
nzhcn.encodeB(num)    //转中文大写 100111 =>> 壹拾万零壹佰壹拾壹
nzhcn.toMoney(num)    //转中文金额 100111.11 =>> 人民币壹拾万零壹佰壹拾壹元壹角壹分
```

**关于十的口语化**  
``` 
//小写默认启用
nzhcn.encodeS(13.5)        //十三点五
nzhcn.encodeS(13.5,fasle)  //一十三点五

//大写默人关闭
nzhcn.encodeB(13.5)        //壹拾叁點伍
nzhcn.encodeB(13.5,true)   //拾叁點伍
```

**关于关于超级大数**  
```
//未引入"兆 京"等单位,超"千万亿"位时,默认以争议教少的"万万亿"为单位
nzhcn.encodeS(1e16)                   //一万万亿
nzhcn.encodeS(1e16,null,false)        //一亿亿
```

**中文转阿拉伯数字**  
```
nzhcn.decodeS(str) //小写转数字　十万零一百一十一 =>> 100111  
nzhcn.decodeB(str) //大写转数字　壹拾万零壹佰壹拾壹 =>> 100111  
```

