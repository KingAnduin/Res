const div_upLeft = document.getElementById('up-left')
const id = 'map-wrap';
let ScatterData = [];
let reviewCountData = [];
//type颜色，转成字典后用于mapv里的splitList
let typeColor = [{
		color: '#f2c',
		type: '全部'
	},
	{
		color: '#fc0',
		type: '川菜'
	},
	{
		color: '#f66',
		type: '火锅'
	},
	{
		color: '#c60',
		type: '烧烤'
	},
	{
		color: '#c9c',
		type: '自助餐'
	},
	{
		color: '#ff3',
		type: '快餐简餐'
	},
	{
		color: '#ffc',
		type: '面包甜点'
	},
	{
		color: '#c03',
		type: '西餐'
	},
	{
		color: '#39c',
		type: '韩国料理'
	},
	{
		color: '#a2a',
		type: '日本料理'
	},
	{
		color: '#cf6',
		type: '小吃面食'
	},
	{
		color: '#c96',
		type: '咖啡厅'
	},
	{
		color: '#093',
		type: '东南亚菜'
	},
	{
		color: '#6cc',
		type: '粤菜'
	},
	{
		color: '#cc6',
		type: '江浙菜'
	},
	{
		color: '#cff',
		type: '酒吧'
	},
	{
		color: '#548C00',
		type: '东北菜'
	},
	{
		color: '#0072E3',
		type: '新疆菜'
	},
	{
		color: '#CDCD9A',
		type: '清真菜'
	},
	{
		color: '#FFC1E0',
		type: '湘菜'
	},
	{
		color: '#B15BFF',
		type: '美食'
	},
	{
		color: '#977C00',
		type: '茶馆'
	},
	{
		color: '#C1FFE4',
		type: '食品茶酒'
	},
	{
		color: '#ccc',
		type: '其他'
	}
];

upLeft_getData();

//请求餐店数据
function upLeft_getData() {
	var xmlhttp;
	if(window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//回调函数
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			let str = xmlhttp.responseText
			let data = JSON.parse(str)
			upLeft_syncData(data.data);
		}
	}
	xmlhttp.open("POST", "http://www.pipicat.top:5000/rest/allrest", true);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.send(JSON.stringify({
		"id": "10023099"
	}));
}

//同步数据
function upLeft_syncData(data) {
	for(var i = 0; i < data.length; i++) {
		ScatterData.push({
			name: data[i].name,
			value: [parseFloat(data[i].lng), parseFloat(data[i].lat), data[i].item_cat],
			id: data[i].item_id,
			type: data[i].item_cat,
		});
		reviewCount = "";
		for(let j = 0; j < (data[i].review_count).length - 3; j++) {
			reviewCount += (data[i].review_count)[j];
		}
		reviewCountData.push({
			name: data[i].name,
			value: [parseFloat(data[i].lng), parseFloat(data[i].lat), parseInt(reviewCount)],
		});
	}
	upleft_addScatterDiv(id, ScatterData);
}

//基于echarts的热力图
function upleft_addHeatmapDiv(id, myData) {
	const div = document.createElement('div');
	div.id = id;
	div.className = "divIndownMid_upLeft";
	const hButton = document.createElement("input");
	hButton.id = "hbutton"
	hButton.type = "button";
	hButton.className = "hbutton_upleft";
	hButton.value = "热力图";
	hButton.onclick = function() {
		div_upLeft.removeChild(document.getElementById(id));
		div_upLeft.removeChild(document.getElementById("hbutton"));
		div_upLeft.removeChild(document.getElementById("sbutton"));
		upleft_addHeatmapDiv(id, reviewCountData)
	};
	const sButton = document.createElement("input");
	sButton.id = "sbutton"
	sButton.type = "button";
	sButton.className = "sbutton_upleft";
	sButton.value = "散点图";
	sButton.onclick = function() {
		div_upLeft.removeChild(document.getElementById(id));
		div_upLeft.removeChild(document.getElementById("hbutton"));
		div_upLeft.removeChild(document.getElementById("sbutton"));
		upleft_addScatterDiv(id, ScatterData);
	};
	div_upLeft.appendChild(div);
	div_upLeft.appendChild(hButton);
	div_upLeft.appendChild(sButton);

	let ecConfig = echarts.config;
	const bmapChart = echarts.init(document.getElementById(id));
	const option1 = {
		title: {
			text: '餐饮点评价数量情况', //主标题的文字
			left: 'center', //标题置于中间
			textStyle: { //设置主标题文字的风格
				color: '#000' //设置主标题的颜色
			}
		},
		bmap: {
			center: [104.681536, 31.465778], // 中心位置坐标
			zoom: 10, // 地图缩放比例
			roam: true, // 开启用户缩放
			mapStyle: { // 百度地图自定义样式
			}

		},
		visualMap: { // 视觉映射组件
			show: false,
			top: 'top',
			min: 0,
			max: 1000,
			seriesIndex: 0,
			calculable: true,
			inRange: {
				color: ['blue', 'blue', 'green', 'yellow', 'red']
			}
		},
		series: [{
			name: '餐饮点',
			type: 'heatmap',
			coordinateSystem: 'bmap', // 坐标系使用bmap
			data: myData,
		}]
	}
	bmapChart.setOption(option1);
}

//基于mapv的散点图
function upleft_addScatterDiv(id, myData) {
	const div = document.createElement('div');
	div.id = id;
	div.className = "divIndownMid_upLeft";
	const hButton = document.createElement("input");
	hButton.id = "hbutton"
	hButton.type = "button";
	hButton.className = "hbutton_upleft";
	hButton.value = "热力图";
	hButton.onclick = function() {
		div_upLeft.removeChild(document.getElementById(id));
		div_upLeft.removeChild(document.getElementById("hbutton"));
		div_upLeft.removeChild(document.getElementById("sbutton"));
		upleft_addHeatmapDiv(id, reviewCountData)
	};
	const sButton = document.createElement("input");
	sButton.id = "sbutton"
	sButton.type = "button";
	sButton.className = "sbutton_upleft";
	sButton.value = "散点图";
	sButton.onclick = function() {
		div_upLeft.removeChild(document.getElementById(id));
		div_upLeft.removeChild(document.getElementById("hbutton"));
		div_upLeft.removeChild(document.getElementById("sbutton"));
		upleft_addScatterDiv(id, ScatterData);
	};
	div_upLeft.appendChild(div);
	div_upLeft.appendChild(hButton);
	div_upLeft.appendChild(sButton);

	//tooltip
	var d3div = d3.select('body').append("div")
		.attr("class", "tooltip")
		.style("opacity", 0)
		.style("z-index", 1000)
		.style("position", 'absolute')
		.style("color", '#fff')
		.style("padding", '6px 12px')
		.style("border-radius", '3px')
		.style("text-align", 'center')
		.style("line-height", '18px')
		.style("background-color", '#000')
		.style("top", 10 + "px");

	let colorMap = {};
	for(let i = 0; i < typeColor.length; i++) {
		colorMap[typeColor[i].type] = typeColor[i].color;
	}

	// 百度地图API功能
	let map = new BMap.Map(id, {
		enableMapClick: false
	}); // 创建Map实例
	map.centerAndZoom(new BMap.Point(104.681536, 31.465778), 8);
	map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
	let data = [];
	for(let i = 0; i < myData.length; i++) {
		//得到对应splitList里字典的name，用于根据类别绘制不同颜色
		let itemType = getItemType(myData[i].type);
		data.push({
			geometry: {
				type: 'Point',
				coordinates: [myData[i].value[0], myData[i].value[1]],
				item_id: myData[i].id,
				name: myData[i].name,
				reType: itemType
			},
			count: itemType,//按种类渲染颜色
		})
	}
	let allDataSet = new mapv.DataSet(data);
	let dataSet = new mapv.DataSet(data);
	let options = {
		methods: {
			click: function(item) {
				if(item && item.geometry) {
					console.log(item.geometry.item_id);
					//这里调用其他js的网络事件
					downLeft_initAll(item.geometry.item_id);
					downRight_initAll(item.geometry.item_id);
					downMid_initAll(item.geometry.item_id);
				}
			},
			mousemove: function(item, e) {
				if(item) {
					let name = item.geometry.name;
					let reType = item.geometry.reType;
					d3div.transition()
						.duration(500)
						.style("opacity", 1);
					d3div.html("店名：" + name + '</br>' + "类别：" + reType)
						.style("top", e.clientY+10 + "px")
						.style("left", e.clientX+10 + "px");
				} else {
					d3div.transition()
						.duration(10)
						.style("opacity", 0);
				}
			}
		},
		splitList: colorMap,
		size: 5,
		max: typeColor.length + 1,
		draw: 'category'
	}
	let mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
	let legend = mapvLayer.getLegend();
	legend.style.position = 'absolute';
	legend.style.left = '10px';
	legend.style.top = '10px';
	$(legend).children().css('height', '18px');
	$(legend).children().css('line-height', '18px');
	div.appendChild(legend);
	$(legend).delegate('div', 'click', function() {
		let value = $(this).attr('value');
		if(value == '全部') {
			dataSet.set(data);
		} else {
			let filterData = allDataSet.get({
				filter: function(item) {
					if(item.count == value) {
						return true;
					}
				}
			});
			dataSet.set(filterData);
		}
	})
}

/**
 * 获取每一个店所属类型，部分没规定的类型全归为其他
 * @param {Object} type
 */
function getItemType(type) {
	for(let i = 0; i < typeColor.length; i++) {
		if(i == typeColor.length - 1) {
			return "其他";
		} else if(type == typeColor[i].type) {
			return typeColor[i].type;
		}
	}
}