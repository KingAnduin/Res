const div_upRight = document.getElementById('up-right')


div_upRight.onclick = function(){
	console.log("div_upRight")
	upRight_addDiv('upRight_rectRestAmount')
	upRight_rectRestAmount('upRight_rectRestAmount');
	upRight_getAllData();
}


//网络请求 返回：各类型餐厅数量 + 各类型餐厅每月的消费数量
function upRight_getAllData(){
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
			
			let dataSetType = {
				"ALLSUM": "",
				"EIGHT": "",
				"ELEVEN": "",
				"FIVE": "",
				"FOUR": "",
				"NAME": "",
				"NINE": "",
				"ONE": "",
				"SEVEN": "",
				"SIX": "",
				"TEN": "",
				"THREE": "",
				"TWELVE": "",
				"TWO": ""
			}
			
			let dataSetTypeAmount = [];
			
			
			for (let i in data.data.type){
				console.log(data.data.type[i]);
				let typeAmount = {
// 					fieldNames: ['name', 'value'],
// 					values:[data.data.type[i].]
				}
			}
			//downMid_addCiYun('downMid_image_CiYun', data.data);
		}
	}
	console.log("downRight_allData")
	xmlhttp.open("POST", "http://www.pipicat.top:5000/rest/msg", true);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.send(JSON.stringify({
	}));
}


//初始化一个节点，用来存放控件
function upRight_addDiv(id){
	if(!document.getElementById(id)){
		const div = document.createElement('div');
		div.id = id;
		div.className = 'divFirst_upRight';
		div_upRight.appendChild(div);
	}
	
}


//矩形图
function upRight_rectRestAmount(id, data) {

	const myCharts = echarts.init(document.getElementById(id));

	for(let i in data){
		console.log(i.data.type)
	}
	
	let option = {
		title: {
			text: '手机占有率',
			subtext: '虚构数据'
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
			data: [{
					name: '三星',
					value: 6
				},
				{
					name: '小米',
					value: 4
				},
				{
					name: '苹果',
					value: 4
				},
				{
					name: '华为',
					value: 2
				},
				{
					name: '联想',
					value: 2
				},
				{
					name: '魅族',
					value: 1
				},
				{
					name: '中兴',
					value: 1
				}
			]
		}]
	};
	
	myCharts.setOption(option);
	
}


//折线图
function upRight_lineMonthAmount(id, data){
	
}

//圆环图
function upRight_circleWeekAmount(id, data){
	
}
