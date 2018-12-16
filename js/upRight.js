const div_upRight = document.getElementById('up-right')


div_upRight.onclick = function() {
	console.log("div_upRight")
	upRight_addDiv('upRight_rectRestAmount')
	//upRight_rectRestAmount('upRight_rectRestAmount');
	//upRight_getAllData();
	upRight_getCommentTime();
}


//网络请求 返回：各类型餐厅数量 + 各类型餐厅每月的消费数量
function upRight_getAllData() {
	let xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//回调函数
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			let str = xmlhttp.responseText
			let data = JSON.parse(str)
			console.log(data)


			let dataSetTypeAmount = [];

			let dataSetSaleMonthAmount = [];

			for (let i in data.data.type) {
				//统计各类型的餐厅数量
				let typeAmount = {
					"name": data.data.type[i].NAME,
					"value": data.data.type[i].ALLSUM
				}
				dataSetTypeAmount.push(typeAmount);

				//统计各类型餐厅每月销量
				let saleMonthAmount = {
					"name": data.data.type[i].NAME,
					"type": 'line',
					"stack": '总量',
					"data": [data.data.type[i].ONE, data.data.type[i].TWO, data.data.type[i].THREE,
						data.data.type[i].FOUR, data.data.type[i].FIVE, data.data.type[i].SIX,
						data.data.type[i].SEVEN, data.data.type[i].EIGHT, data.data.type[i].NINE,
						data.data.type[i].TEN, data.data.type[i].ELEVEN, data.data.type[i].TWELVE
					],
					//"month":['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
				}
				dataSetSaleMonthAmount.push(saleMonthAmount);

			}

			//加载矩形树图
			//upRight_rectRestAmount('upRight_rectRestAmount', dataSetTypeAmount);
			//加载折线图
			upRight_lineMonthAmount('upRight_rectRestAmount', dataSetSaleMonthAmount);
			//加载圆环图
			//upRight_circleWeekAmount('upRight_rectRestAmount', );
		}
	}
	console.log("upRight_getAllData")
	xmlhttp.open("POST", "http://www.pipicat.top:5000/rest/msg", true);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.send(JSON.stringify({}));
}

//网络请求 返回：所有评论时间
function upRight_getCommentTime() {
	let xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//回调函数
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			let str = xmlhttp.responseText
			let data = JSON.parse(str)
			
// 			let y = 2015
// 			let m = 02;
// 			let d = 03;
// 			m = m+12;
// 			console.log(m);
// 			console.log(d);
// 			let week = parseInt((d+2*m+3*(m+1)/5+y+y/4-y/100+y/400)%7);
// 			console.log(week);
			for (let i in data.data){
				
				let date = data.data[i].split('-');
				if(date[1].length<=2){
					let y = 2015;
					let m = date[0];
					let d = date[1];
					
					if(m <= 2){
						m = m + 12;
						y = 2014;
					}
					let week = parseInt((d+2*m+3*(m+1)/5+y+y/4-y/100+y/400)%7);
					console.log(week);
				}
			}
		}
	}
	console.log("upRight_getCommentTime")
	xmlhttp.open("POST", "http://www.pipicat.top:5000/rest/allcom", true);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.send(JSON.stringify({}));
}


//初始化一个节点，用来存放控件
function upRight_addDiv(id) {
	if (!document.getElementById(id)) {
		const div = document.createElement('div');
		div.id = id;
		div.className = 'divFirst_upRight';
		div_upRight.appendChild(div);
	}

}


//矩形图
function upRight_rectRestAmount(id, data) {

	const myCharts = echarts.init(document.getElementById(id));


	let option = {
		title: {
			text: '餐厅类型比例',
		},
		tooltip: {
			trigger: 'item',
			formatter: "{b}: {c}"
		},
		toolbox: {
			show: true,
			feature: {
				mark: {
					show: true
				},
				dataView: {
					show: true,
					readOnly: false
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		calculable: false,
		series: [{
			name: '矩形图',
			type: 'treemap',
			itemStyle: {
				normal: {
					label: {
						show: true,
						formatter: "{b}"
					},
					borderWidth: 1
				},
				emphasis: {
					label: {
						show: true
					}
				}
			},
			data: data
		}]
	};

	myCharts.setOption(option);

}


//折线图
function upRight_lineMonthAmount(id, data) {

	const myCharts = echarts.init(document.getElementById(id));


	let resName = [];
	for (let i in data) {
		resName.push(data[i].name);
	}

	option = {
		title: {
			text: '折线图堆叠'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: resName
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

		},
		yAxis: {
			type: 'value'
		},
		series: data
	};

	myCharts.setOption(option);


}

//圆环图
function upRight_circleWeekAmount(id, data) {

	const myCharts = echarts.init(document.getElementById(id));



	myCharts.setOption(option);

}
