const div_upRight = document.getElementById('up-right')

upRight_getAllData()

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
			let time = new Array()
			var dataAll = new Array()
			dataAll.push(data.data)
			upRight_getAllData2()



			function upRight_getAllData2() {
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
						dataAll.push(data.data)
						upRight_addDiv('UpRightGraph', dataAll)
					}
				}
				console.log("downRight_allData")
				xmlhttp.open("POST", "http://www.pipicat.top:5000/rest/allcom", true);
				xmlhttp.setRequestHeader("Content-type", "application/json");
				xmlhttp.send(JSON.stringify({}));
			}
		}
	}
	//console.log("downRight_allData")
	xmlhttp.open("POST", "http://www.pipicat.top:5000/rest/msg", true);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.send(JSON.stringify({}));
}

//初始化一个节点，用来存放控件
function upRight_addDiv(id, data) {
	if (!document.getElementById(id)) {
		const div = document.createElement('div');
		div.id = id;
		div.className = 'divFirst_upRight';
		div_upRight.appendChild(div);

		// btn-group
		const div_btnlist = document.createElement('div');
		div_btnlist.className = 'up_right_button_toChangeEchars'
		div_upRight.appendChild(div_btnlist)

//		//btn-group-button
//		const upRight_btnlist_btn = document.createElement('button')
//		upRight_btnlist_btn.className = 'btn btn-default dropdown-toggle'
//		upRight_btnlist_btn.setAttribute('data-toggle', 'dropdown')
//		upRight_btnlist_btn.appendChild(document.createTextNode('按钮'))
//
//		//btn-group-button-span
//		const upRight_btnlist_btn_span = document.createElement('span')
//		upRight_btnlist_btn_span.className = 'caret'
//		upRight_btnlist_btn.appendChild(upRight_btnlist_btn_span)
//		div_btnlist.appendChild(upRight_btnlist_btn)
//
//		//btn-group-ul
//		const upRight_btnlist_ul = document.createElement('ul')
//		upRight_btnlist_ul.className = 'dropdown-menu'
//		upRight_btnlist_ul.setAttribute('role', 'menu')
//
//		let nameArys = new Array("各类型餐厅每月消费情况", "各类型餐厅比例", "周每天消费情况", "评分排名")
//		for (let i = 0; i < 4; i++) {
//			//btn-group-ul-li-01
//
//			const upRight_btnlist_li_01 = document.createElement('li')
//			upRight_btnlist_li_01.onclick = function() {
//				upRight_layout(i, 'UpRightGraph', data)
//			}
//			upRight_btnlist_li_01.appendChild(document.createTextNode(nameArys[i]))
//			upRight_btnlist_ul.appendChild(upRight_btnlist_li_01)
//		}

		let nameArys = new Array("各类型餐厅每月消费情况", "各类型餐厅比例", "周每天消费情况")
		for (let i = 0; i < 3; i++) {
			//btn-group-ul-li-01
			const upRight_btnlist_div = document.createElement('div')
			
			const upRight_btnlist_button = document.createElement('button')
			upRight_btnlist_button.innerHTML = nameArys[i]
			upRight_btnlist_button.id = `button${i}`
			upRight_btnlist_button.onclick = function() {
				upRight_layout(i, 'UpRightGraph', data)
			}
			upRight_btnlist_button.className = 'up_right_button01_toChangeEchars'
			
			upRight_btnlist_div.appendChild(upRight_btnlist_button)
			div_btnlist.appendChild(upRight_btnlist_button)
		}

		upRight_layout(0, 'UpRightGraph', data)

	}

}

function upRight_layout(code, id, data) {
	//console.log(data)
	var myCharts = echarts.init(document.getElementById(id));
	myCharts.clear()
	if (code == 0) {
		upRight_lineMonthAmount(data[0])
	} else if (code == 1) {
		upRight_countOfTypes(data[0])
	} else if (code == 2) {
		upRight_Circle(data[1])
	} else if (code == 3) {

	}
	//矩形图
	function upRight_countOfTypes(data) {

		var dataArr = new Array()
		for (let i in data.type) {
			//console.log(data.type[i]['NAME'])
			var dic = {}
			dic['name'] = data.type[i]['NAME']
			dic['value'] = data.type[i]['ALLSUM']
			dataArr.push(dic)
		}


		let option = {
			title: {
				text: '各类型餐厅比例',
				//subtext: '虚构数据'
			},
			tooltip: {
				trigger: 'axis',
			},
			grid: {
				up: '10%',
				left: '3%',
				right: '4%',
				containLabel: true
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
				data: dataArr
			}]
		};
		myCharts.setOption(option);

	}
	//折线图
	function upRight_lineMonthAmount(data) {
		let dataArr = [];

		for (let i in data.type) {
			//统计各类型餐厅每月销量
			let saleMonthAmount = {
				"name": data.type[i].NAME,
				"type": 'line',
				"data": [data.type[i].ONE, data.type[i].TWO, data.type[i].THREE,
					data.type[i].FOUR, data.type[i].FIVE, data.type[i].SIX,
					data.type[i].SEVEN, data.type[i].EIGHT, data.type[i].NINE,
					data.type[i].TEN, data.type[i].ELEVEN, data.type[i].TWELVE
				],
				//"month":['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
			}
			dataArr.push(saleMonthAmount);
		}
		let resName = [];
		for (let i in dataArr) {
			resName.push(dataArr[i].name);
		}
		option = {
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: resName,
				padding: 0,
				itemHeight:12
			},
			textStyle:{
				fontSize:10
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
			series: dataArr
		};

		myCharts.setOption(option);


	}

	function upRight_Circle(data) {
		var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
		var myDate
		var dic_date = {}
		dic_date['星期一'] = 0
		dic_date['星期二'] = 0
		dic_date['星期三'] = 0
		dic_date['星期四'] = 0
		dic_date['星期五'] = 0
		dic_date['星期六'] = 0
		dic_date['星期天'] = 0
		for (let i in data) {
			let time_str = ''
			time_str = '2015-' + data[i]
			myDate = new Date(Date.parse(time_str))
			dic_date[weekDay[myDate.getDay()]] += 1
		}
		var dic_arr = []
		var dic = {}
		dic['name'] = '星期一'
		dic['value'] = dic_date['星期一']
		dic_arr.push(dic)
		var dic2 = {}
		dic2['name'] = '星期二'
		dic2['value'] = dic_date['星期二']
		dic_arr.push(dic2)
		var dic3 = {}
		dic3['name'] = '星期三'
		dic3['value'] = dic_date['星期三']
		dic_arr.push(dic3)
		var dic4 = {}
		dic4['name'] = '星期四'
		dic4['value'] = dic_date['星期四']
		dic_arr.push(dic4)
		var dic5 = {}
		dic5['name'] = '星期五'
		dic5['value'] = dic_date['星期五']
		dic_arr.push(dic5)
		var dic6 = {}
		dic6['name'] = '星期六'
		dic6['value'] = dic_date['星期六']
		dic_arr.push(dic6)
		var dic7 = {}
		dic7['name'] = '星期天'
		dic7['value'] = dic_date['星期天']
		dic_arr.push(dic7)
		

		let option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				x: 'left',
				data: ['星期一', '星期二', '星期三', '星期四', '星期五','星期六','星期天']
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
					magicType: {
						show: true,
						type: ['pie', 'funnel'],
						option: {
							funnel: {
								x: '25%',
								width: '50%',
								funnelAlign: 'center',
								max: 1548
							}
						}
					},
					restore: {
						show: true
					},
					saveAsImage: {
						show: true
					}
				}
			},
			calculable: true,
			series: [{
				name: '分布',
				type: 'pie',
				radius: ['50%', '70%'],
				itemStyle: {
					normal: {
						label: {
							show: false
						},
						labelLine: {
							show: false
						}
					},
					emphasis: {
						label: {
							show: true,
							position: 'center',
							textStyle: {
								fontSize: '20',
								fontWeight: 'bold'
							}
						}
					}
				},
				data: dic_arr
			}]
		};
		myCharts.setOption(option);

	}

}
