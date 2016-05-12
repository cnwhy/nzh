QUnit.test("自定义", function( assert ) {
	var custom = window.custom = new Nzh({
			ch: '零壹贰叁肆伍陆柒捌玖'
			,ch_u: '个拾佰仟万亿兆京'
			,other: '负点'
			,m_t: '人民币'
			,m_z: '正'
			,m_u: '元角分厘'
		});
	assert.equal(custom.encode("1000000000000"),"壹兆","增加大单位");
	assert.equal(custom.decode("壹兆"),"1000000000000","增加大单位");
	assert.equal(custom.encode("10000000000000000"),"壹京","增加大单位");
	assert.equal(custom.decode("壹京"),"10000000000000000","增加大单位");
	
	assert.equal(custom.toMoney("1"),"人民币壹元正","改整为正");
	assert.equal(custom.toMoney("1.234"),"人民币壹元贰角叁分肆厘","增加单位厘");
});
QUnit.test("随机测试", function( assert ) {
	for(var i = 0; i<1000; i++){
		var n = Math.random() * 1e10
		assert.equal(Nzh.cn.decodeB(Nzh.cn.encodeB(n)),n,n);
	}
});