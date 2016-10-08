	QUnit.test("常规整数 小于亿亿(万万亿)位", function( assert ) {
		var narr=[
			[0,"零","零"]
			,[1,"一","壹"]
			,[10,"十","壹拾"]
			,[12,"十二","壹拾贰"]
			,[3456789,"三百四十五万六千七百八十九","叁佰肆拾伍万陆仟柒佰捌拾玖"]
			,[9876543210,"九十八亿七千六百五十四万三千二百一十","玖拾捌亿柒仟陆佰伍拾肆万叁仟贰佰壹拾"]
			,[1001000021,"十亿零一百万零二十一","壹拾亿零壹佰万零贰拾壹"]
			,["1010101010101010","一千零一十万零一千零一十亿零一千零一十万零一千零一十","壹仟零壹拾万零壹仟零壹拾亿零壹仟零壹拾万零壹仟零壹拾"]
		]
		for(var i=0; i<narr.length; i++){
			var n = narr[i];
			assert.equal(Nzh.cn.encodeS(n[0]),n[1],"(" + n[0] + ") encodeS");
			assert.equal(Nzh.cn.encodeB(n[0]),n[2],"(" + n[0] + ") encodeB");
			assert.equal(Nzh.cn.decodeS(n[1]),n[0],"(" + n[1] + ") decodeS");
			assert.equal(Nzh.cn.decodeB(n[2]),n[0],"(" + n[2] + ") decodeB");
		}
	});
	QUnit.test("带小数的转换", function( assert ) {
		var narr=[
			[0.1,"零点一","零点壹"]
			,[1.1,"一点一","壹点壹"]
			,[10.01,"十点零一","壹拾点零壹"]
			,[12.10,"十二点一","壹拾贰点壹"]
			,["100111.11","十万零一百一十一点一一","壹拾万零壹佰壹拾壹点壹壹"]
		]
		for(var i=0; i<narr.length; i++){
			var n = narr[i];
			assert.equal(Nzh.cn.encodeS(n[0]) , n[1],n[0] + " encodeS");
			assert.equal(Nzh.cn.encodeB(n[0]) , n[2],n[0] + " encodeB");
			assert.equal(Nzh.cn.decodeS(n[1]) , n[0],n[0] + " decodeS");
			assert.equal(Nzh.cn.decodeB(n[2]) , n[0],n[0] + " decodeB");
		}
	});
	QUnit.test("科学记数法", function( assert ) {
		var narr=[
			['100e-3',"零点一","幂为负数"]
			,['1.01e+3',"一千零一十","幂为正数"]
			,['1.01e3',"一千零一十","幂无符号,默认正数"]
			,['1.01E3',"一千零一十","'e'大小写不敏感"]
		]
		for(var i=0; i<narr.length; i++){
			var n = narr[i];
			assert.equal(Nzh.cn.encodeS(n[0]) , n[1] , n[2]);
		}
	});
	QUnit.test("十的口语化测试", function( assert ) {
		var narr=[
			[10,"一十","十","壹拾","拾"]
			,[100000,"一十万","十万","壹拾万","拾万"]
			,[1000100000,"一十亿零一十万","十亿零一十万","壹拾亿零壹拾万","拾亿零壹拾万"]
		]
		for(var i=0; i<narr.length; i++){
			var n = narr[i];
			assert.equal(Nzh.cn.encodeS(n[0])       , n[2],n[0] + " encodeS");
			assert.equal(Nzh.cn.encodeS(n[0],true)  , n[2],n[0] + " encodeS");
			assert.equal(Nzh.cn.encodeS(n[0],false) , n[1],n[0] + " encodeS");
			
			assert.equal(Nzh.cn.encodeB(n[0])       , n[3],n[0] + " encodeB");
			assert.equal(Nzh.cn.encodeB(n[0],true)  , n[4],n[0] + " encodeB");
			assert.equal(Nzh.cn.encodeB(n[0],false) , n[3],n[0] + " encodeB");

			assert.equal(Nzh.cn.decodeS(n[1])       , n[0],n[1] + " decodeS");
			assert.equal(Nzh.cn.decodeS(n[2])       , n[0],n[2] + " decodeS");
			assert.equal(Nzh.cn.decodeB(n[3])       , n[0],n[3] + " decodeB");
			assert.equal(Nzh.cn.decodeB(n[4])       , n[0],n[4] + " decodeB");
		}
	});
	QUnit.test("超级大数(万万亿级别)'万万'化及不'万万'化", function( assert ) {
		var narr=[
			[1e16,"壹万万亿","壹亿亿"]
			,[10.011e16,"壹拾万万零壹佰壹拾万亿","壹拾亿零壹佰壹拾万亿"]
		]
		for(var i=0; i<narr.length; i++){
			var n = narr[i];
			assert.equal(Nzh.cn.encodeB(n[0])       , n[1],n[0] + " encodeB");
			assert.equal(Nzh.cn.encodeB(n[0],null,false)  , n[2],n[0] + " encodeB");

			assert.equal(Nzh.cn.decodeB(n[1])       , n[0],n[1] + " decodeB");
			assert.equal(Nzh.cn.decodeB(n[2])       , n[0],n[2] + " decodeB");
		}
	});
	QUnit.test("金额转换", function( assert ) {
		var narr=[
			[0,"人民币零元整","整数0"]
			,[1023456789,"人民币壹拾亿零贰仟叁佰肆拾伍万陆仟柒佰捌拾玖元整","整数"]
			,[1.23,"人民币壹元贰角叁分","带小数"]
			,[0.23,"人民币贰角叁分","只有小数"]
			,["1.000","人民币壹元","小数全为0"]
			,["0.00001","人民币零元","突破最小单位数"]
		]
		for(var i=0; i<narr.length; i++){
			var n = narr[i];
			assert.equal(Nzh.cn.toMoney(n[0]) , n[1] , n[2]);
		}
	});


