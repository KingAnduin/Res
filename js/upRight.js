const div_upRight = document.getElementById('up-right')

console.log('div_upRight', div_upRight)
div_upRight.onclick = function(){
	console.log("div_upRight")
	upRight_addDiv('upRight_rectRestAmount')
	upRight_rectRestAmount('upRight_rectRestAmount');
}


//初始化一个节点，用来存放控件
function upRight_addDiv(id){
	const div = document.createElement('div');
	div.id = id;
	div.className = 'divFirst_upRight';
	div_upRight.appendChild(div);
}


//矩形图
function upRight_rectRestAmount(id, data) {

	const myCharts = echarts.init(document.getElementById(id));

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
