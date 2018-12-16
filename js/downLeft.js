const div_downLeft = document.getElementById('down-left')

div_downLeft.onclick = function() {
	downMid_addHeadLine('asd');

	downMid_loadCiYun("10023099");
	const downLeft_id = 'downLeft_div_1';
	if (!document.getElementById(downLeft_id)) {
		//初始化一个节点
		downLeft_addDiv(downLeft_id);
		//来存放柱状图
		downLeft_Zhu(downLeft_id);
	}
	
	
}


//初始化一个节点，用来存放控件
function downLeft_addDiv(id) {
	const div = document.createElement('div');
	div.id = id;
	div.className = 'div1IndownMid_downLeft'
	div_downLeft.appendChild(div);
}


//加载柱状图
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
