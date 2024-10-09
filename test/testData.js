(function (name, factory) {
    if (typeof process === "object" && typeof module === "object" && typeof module.exports) {
        module.exports = factory();
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define([], factory);
    } else if (typeof window !== "undefined" || typeof self !== "undefined") {
        var global = typeof window !== "undefined" ? window : self;
        global[name] = factory();
    } else {
        throw new Error("加载 " + name + " 模块失败！，请检查您的环境！")
    }
}('testData', function () {
	var testData = {};
	testData.toCN = {
		name: "数字,中文互转",
		its: [
			{
				name: "整数",
				data: [
					["1", "一"],
					["-1", "负一"],
					["001", "一"],
					["010", "一十"],
					["0010", "一十"],
					["12", "一十二"],
					["123", "一百二十三"],
					["1234", "一千二百三十四"],
					["12345", "一万二千三百四十五"],
					["123456", "一十二万三千四百五十六"],
					["1234567", "一百二十三万四千五百六十七"],
					["12345678", "一千二百三十四万五千六百七十八"],
					["123456789", "一亿二千三百四十五万六千七百八十九"],
					["1234567890", "一十二亿三千四百五十六万七千八百九十"],
					["12301230123", "一百二十三亿零一百二十三万零一百二十三"],
					["123012301230", "一千二百三十亿一千二百三十万一千二百三十"],
					["1230123012301", "一万二千三百零一亿二千三百零一万二千三百零一"],
					["12301230123012", "一十二万三千零一十二亿三千零一十二万三千零一十二"],
					["10000000000000000", "一亿亿"],
					["100000001100000000", "一十亿零一十一亿"],
				]
			},
			{
				name: "插零测试",
				data:[
					["0", "零"],
					["00", "零"],
					["000", "零"],
					["101", "一百零一"],
					["1001", "一千零一"],
					["10001", "一万零一"],
					["100001", "一十万零一"],
					["100010", "一十万零一十"],
					["100100","一十万零一百"],
					["101000","一十万一千"],
					["1010001000","一十亿一千万一千"],
					["1000001000","一十亿零一千"],
				]
			},
			{
				name: "有小数",
				data: [
					["0.0", "零"],
					["1.0", "一"],
					["1.00", "一"],
					["0.1", "零点一"],
					["-0.1", "负零点一"],
					["00.1", "零点一"],
					["01.1", "一点一"],
					["1.10", "一点一"],
					["10.01", "一十点零一"],
					["100111.11", "一十万零一百一十一点一一"],
					["1e16", "一亿亿"]
				]
			},
			{
				name: "科学记数法",
				data: [
					["100e-3", "零点一"],
					["1.01e+3", "一千零一十"],
					["1.01e3", "一千零一十"],
					["1.01E3", "一千零一十"]
				]
			},
			{
				name: "十的口语化测试",
				args: { tenMin: true },
				data: [
					["10", "十"],
					["15", "十五"],
					["100000", "十万"],
					["100010", "十万零一十"],
					["1000100000", "十亿零十万"]
				]
			},
			{
				name: "单位万万化",
				args: { ww: true },
				data: [
					["1e16", "一万万亿"],
					["10.011e16", "一十万万零一百一十万亿"]
				]
			},
			{
				name: "输出字符串开关",
				args: { outputString: true },
				data: [
					["100000000000000000000", "一万亿亿"],
					["-10000000000000000000000000000", "负一万亿亿亿"],
				]
			},
			{
				name: "输出字符串开关1",
				args: { outputString: true, ww: true },
				data: [
					["100000000000000000000", "一万万万亿"],
					["-10000000000000000000000000000", "负一万万万万万亿"],
				]
			}
		]
	}

	testData.toMoney = {
		name: "数字转人民币金额",
		its: [
			{
				name: "整数",
				data: [
					["0", "人民币零元整"],
					["00", "人民币零元整"],
					["000", "人民币零元整"],
					["1", "人民币壹元整"],
					["-1", "人民币负壹元整"],
					["001", "人民币壹元整"],
					["-001", "人民币负壹元整"],
					["010", "人民币壹拾元整"],
					["0010", "人民币壹拾元整"],
					["12", "人民币壹拾贰元整",],
					["3456789", "人民币叁佰肆拾伍万陆仟柒佰捌拾玖元整"],
					["1001000021", "人民币壹拾亿零壹佰万零贰拾壹元整"],
					["10000000000000000", "人民币壹万万亿元整"],
					["100000001100000000", "人民币壹拾万万零壹拾壹亿元整"]
				]
			},
			{
				name: "有小数",
				data: [
					["0.0", "人民币零元"],
					["0.001", "人民币零元"],
					["-0.001", "人民币负零元"],
					["1.0", "人民币壹元"],
					["-1.0", "人民币负壹元"],
					["1.00", "人民币壹元"],
					["0.1", "人民币壹角"],
					["-0.1", "人民币负壹角"],
					["00.1", "人民币壹角"],
					["0.01", "人民币壹分"],
					["01.1", "人民币壹元壹角"],
					["1.10", "人民币壹元壹角"],
					["1.101", "人民币壹元壹角"],
					["10.01", "人民币壹拾元零壹分"],
					["10.012", "人民币壹拾元零壹分"],
					["100111.11", "人民币壹拾万零壹佰壹拾壹元壹角壹分"]
				]
			},
			{
				name: "科学记数法",
				data: [
					["100e-3", "人民币壹角"],
					["1.01e+3", "人民币壹仟零壹拾元整"],
					["1.01e3", "人民币壹仟零壹拾元整"],
					["1.01E3", "人民币壹仟零壹拾元整"]
				]
			},
			{
				name: "不输出前辍",
				args: { outSymbol: false },
				data: [
					["1", "壹元整"]
				]
			},
			{
				name: "不省略元",
				args: { unOmitYuan: true },
				data: [
					["0.1", "人民币零元壹角"],
					["-0.1", "人民币负零元壹角"],
					["0.01", "人民币零元壹分"],
					["00.01", "人民币零元壹分"],
					// ["0.01", "人民币零元零壹分"]
					["-0.01", "人民币负零元壹分"],
					["0.012", "人民币零元壹分"],
				]
			},
			{
				name: "完整格式测试",
				args: { complete: true },
				data: [
					["10", "人民币壹拾元零角零分"],
					["0", "人民币零元零角零分"],
					["0.1", "人民币零元壹角零分"],
					["0.01", "人民币零元零角壹分"]
				]
			},
			{
				name: "不输出前辍",
				args: { outSymbol: false },
				data: [
					["1", "壹元整"]
				]
			},
			{
				name: "强制输出'整'",
				args: { forceZheng: true },
				data: [
					["1.00", "人民币壹元整"],
					["1.1", "人民币壹元壹角整"],
					["0.001", "人民币零元整"],
					["1.001", "人民币壹元整"],
					["0.10", "人民币壹角整"]
				]
			}
		]
	}

	testData.custom = {
		name: "自定义测试",
		lang: {
			ch: "零壹贰叁肆伍陆柒捌玖"
			, ch_u: "个拾佰仟万亿兆京"
			, ch_f: "负"
			, ch_d: "点"
			, m_t: "¥"
			, m_z: "正"
			, m_u: "元角分厘"
		},
		testCL:
		{
			name: "中文,数字互转",
			data: [
				["1000000000000", "壹兆"],
				["10000000000000000", "壹京"]
			]
		},
		testMoney:
		{
			name: "转金额",
			data: [
				["1", "¥壹元正"],
				["1.234", "¥壹元贰角叁分肆厘"]
			],
			its: [
				{
					name: "完整格式测试",
					args: { complete: true },
					data: [
						["10", "¥壹拾元零角零分零厘"],
						["0", "¥零元零角零分零厘"],
						["0.1", "¥零元壹角零分零厘"],
						["0.011", "¥零元零角壹分壹厘"]
					]
				}
			]
		}
	}
	return testData;
}))