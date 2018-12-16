const div_downLeft = document.getElementById('down-left')

div_downLeft.onclick = function() {
	downMid_addHeadLine('asd');

	downMid_loadCiYun();
	const id = 'downLeft_div_1';
	if (!document.getElementById(id)) {
		downLeft_addDiv(id);
		downLeft_Zhu(id);
	}
}

function downMid_loadCiYun(shop_id) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//回调函数
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
			//downMid_addCiYun('downMid_image_CiYun', xmlhttp.responseText);
		}
	}
	console.log("downMid_loadCiYun")
	xmlhttp.open("POST", "http://www.pipicat.top:5000/rest/picbyid", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("id=10023099");
}

function downLeft_addDiv(id) {
	const div = document.createElement('div');
	div.id = id;
	div.className = 'div1IndownMid_downLeft'
	div_downLeft.appendChild(div);
}

function downLeft_Zhu(id, data) {
	// 	//清空整个页面
	// 	div_downLeft.innerHTML = "";
	// 基于准备好的dom，初始化echarts实例
	const myChart = echarts.init(document.getElementById(id));
	// 指定图表的配置项和数据
	const option = {
		title: {
			text: 'ECharts 入门示例'
		},
		tooltip: {},
		legend: {
			data: ['销量']
		},
		xAxis: {
			data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
		},
		yAxis: {},
		series: [{
			name: '销量',
			type: 'bar',
			data: [5, 20, 36, 10, 10, 20]
		}]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);

}
