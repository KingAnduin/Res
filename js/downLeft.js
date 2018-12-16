const div_downLeft = document.getElementById('down-left')

div_downLeft.onclick = function() {
	downMid_addHeadLine('热门评价词条', 'title_downMid');

	downMid_loadCiYun("10023099");
	
	const downLeft_leiDa_id = 'downLeft_div_1';
	if (!document.getElementById(downLeft_leiDa_id)) {
		//初始化一个节点
		downLeft_addDiv(downLeft_leiDa_id);
		//来存放雷达图
		downLeft_LeiDa(downLeft_leiDa_id);
	}


}


//初始化一个节点，用来存放控件
function downLeft_addDiv(id) {
	const div = document.createElement('div');
	div.id = id;
	div.className = 'div1IndownMid_downLeft'
	div_downLeft.appendChild(div);
}


//加载雷达图
function downLeft_LeiDa(id, data) {

	// 基于准备好的dom，初始化echarts实例
	const myChart = echarts.init(document.getElementById(id));
	// 指定图表的配置项和数据
	const option = {
		title: {
			text: '店铺评分'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			orient: 'vertical',
			x: 'right',
			y: 'bottom',
			data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
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
					text: '销售（sales）',
					max: 6000
				},
				{
					text: '管理（Administration）',
					max: 16000
				},
				{
					text: '信息技术（Information Techology）',
					max: 30000
				},
				{
					text: '客服（Customer Support）',
					max: 38000
				},
				{
					text: '研发（Development）',
					max: 52000
				},
				{
					text: '市场（Marketing）',
					max: 25000
				}
			]
		}],
		calculable: true,
		series: [{
			name: '预算 vs 开销（Budget vs spending）',
			type: 'radar',
			data: [{
					value: [4300, 10000, 28000, 35000, 50000, 19000],
					name: '预算分配（Allocated Budget）'
				},
				{
					value: [5000, 14000, 28000, 31000, 42000, 21000],
					name: '实际开销（Actual Spending）'
				}
			]
		}]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);

}
