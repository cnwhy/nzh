var toCN = testData.toCN;
var toMoney = testData.toMoney;
var custom = testData.custom;

function inTest(td,fn,title){
		title = title ? title + " > " : "";
		if(td.data){
			QUnit.test(title + td.name, function( assert ) {
				//console.log(td.data);
				inIt(assert)(td.data,fn,td.args)
			})
		}
		if(td.its){
			for(var i=0; i<td.its.length; i++){
				inTest(td.its[i],fn,title + td.name);
			}
		}
}

function inIt(assert){
	return function(list,fn,args){
		//console.log(list);
		for(var i=0; i<list.length; i++){
			(function(i){
				fn(assert)(list[i],args)
			})(i)
		}
	}
}

var fncn = new Nzh(Nzh.langs.s);
inTest(toCN,function(assert){
	return function(data,opts){
		assert.equal(fncn.encode(data[0],opts),data[1],data.join(" | ") + " - encode");
		assert.equal(fncn.decode(data[1]),(+data[0]).toString(),data.join(" | ") + " - decode");
	}
})

var fncnb = new Nzh(Nzh.langs.b);

inTest(toMoney,function(assert){
	return function(data,opts){
		assert.equal(fncnb.toMoney(data[0],opts),data[1],data.join(" | ") + " - toMoney");
	}
})


var customClass = new Nzh(custom.lang);
inTest(custom.testCL,function(assert){
	return function(data,opts){
		assert.equal(customClass.encode(data[0],opts),data[1],data.join(" | ") + " - encode");
		assert.equal(customClass.decode(data[1]),(+data[0]).toString(),data.join(" | ") + " - decode");
	}
},custom.name)
inTest(custom.testMoney,function(assert){
	return function(data,opts){
		assert.equal(customClass.toMoney(data[0],opts),data[1],data.join(" | ") + " - toMoney");
	}
},custom.name)