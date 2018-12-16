const div_downLeft = document.getElementById('down-left')

div_downLeft.onclick = function() {
	downMid_addHeadLine('热门评价词条', 'title_downMid');

	downMid_loadCiYun("10023099");
	

	const downLeft_leiDa_id = 'downLeft_div_1';
	if (!document.getElementById(downLeft_leiDa_id)) {
		//初始化一个节点
		downLeft_addDiv(downLeft_leiDa_id);
	}
	downLeft_loadResDate("10023099");

}


//初始化一个节点，用来存放控件
function downLeft_addDiv(id) {
	const div = document.createElement('div');
	div.id = id;
	div.className = 'div1IndownMid_downLeft'
	div_downLeft.appendChild(div);
}

//网络请求 返回：店铺基本信息
function downLeft_loadResDate(res_id) {
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
			downLeft_LeiDa('downLeft_div_1', data);

		}
	}
	xmlhttp.open("POST", "http://www.pipicat.top:5000/rest/byid", true);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.send(JSON.stringify({
		"id": res_id
	}));
}


//加载雷达图
function downLeft_LeiDa(id, data) {

	// 基于准备好的dom，初始化echarts实例
	const myChart = echarts.init(document.getElementById(id));
	
	let environment = data.data.environment;
	let service = data.data.service;
	let star = data.data.star;
	let tast = data.data.tast;
	let review_count = data.data.review_count;
	let len = review_count.length - 3;
	review_count = review_count.substr(0, len);
	
	console.log(review_count);
	
	// 指定图表的配置项和数据
	const option = {
		title: {
			text: '店铺评分:'+data.data.item_cat
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			orient: 'vertical',
			x: 'right',
			y: 'bottom',
			data: []
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
		polar: [{
			indicator: [{
					text: '环境',
					max: 10
				},
				{
					text: '服务',
					max: 10
				},
				{
					text: '味道',
					max: 10
				},
				
				{
					text: '星级',
					max: 5
				},
				{
					text: '点评数',
					max: 1000
				}
			]
		}],
		calculable: true,
		series: [{
			name: '',
			type: 'radar',
			data: [{
					value: [environment, service, star, tast, review_count],
					name: ''
				}
			]
		}]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);

}
