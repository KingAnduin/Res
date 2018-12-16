const div_upRight = document.getElementById('up-right')

upRight_getAllData()


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
			//console.log(data)
			
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
			upRight_addDiv('UpRightGraph',data.data)

		}
	}
	console.log("downRight_allData")
	xmlhttp.open("POST", "http://www.pipicat.top:5000/rest/msg", true);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.send(JSON.stringify({
	}));
}


//初始化一个节点，用来存放控件
function upRight_addDiv(id, data){
	if(!document.getElementById(id)){
		const div = document.createElement('div');
		div.id = id;
		div.className = 'divFirst_upRight';
		div_upRight.appendChild(div);
		
		// btn-group
		const div_btnlist = document.createElement('div');
		div_btnlist.className='btn-group'
		div_upRight.appendChild(div_btnlist)
		
		//btn-group-button
		const upRight_btnlist_btn = document.createElement('button')
		upRight_btnlist_btn.className='btn btn-default dropdown-toggle'
		upRight_btnlist_btn.setAttribute('data-toggle','dropdown')
		upRight_btnlist_btn.appendChild(document.createTextNode('按钮'))
		
		//btn-group-button-span
		const upRight_btnlist_btn_span = document.createElement('span')
		upRight_btnlist_btn_span.className='caret'
		upRight_btnlist_btn.appendChild(upRight_btnlist_btn_span)
		div_btnlist.appendChild(upRight_btnlist_btn)
		
		//btn-group-ul
		const upRight_btnlist_ul = document.createElement('ul')
		upRight_btnlist_ul.className='dropdown-menu'
		upRight_btnlist_ul.setAttribute('role','menu')
		
		let nameArys = new Array("各类型餐厅每月消费情况","各类型餐厅比例","周每天消费情况","评分排名")
		for(let i=0; i < 4; i++){
			//btn-group-ul-li-01
			
			const upRight_btnlist_li_01 = document.createElement('li')
			upRight_btnlist_li_01.onclick = function() {upRight_layout(i,'UpRightGraph',data)
			}
			upRight_btnlist_li_01.appendChild(document.createTextNode(nameArys[i]))
			upRight_btnlist_ul.appendChild(upRight_btnlist_li_01)
		}
		
		
		div_btnlist.appendChild(upRight_btnlist_ul)
		
		
	}
	
}


function upRight_layout(code,id,data){
	console.log(data)
	var myCharts = echarts.init(document.getElementById(id));
	if (code == 0){
		upRight_lineMonthAmount(data)
	}else if (code == 1){
		upRight_countOfTypes(data)
	}else if (code == 2){
		
	}else if (code == 3){
		
	}
	//矩形图
	function upRight_countOfTypes(data) {
		
		var dataArr = new Array()
		for (let i in data.type){
			console.log(data.type[i]['NAME'])
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
				data: dataArr
			}]
		};
		
		myCharts.setOption(option);
		
	}
	//折线图
	function upRight_lineMonthAmount(data) {

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
			series: dataArr
		};

		myCharts.setOption(option);


	}
	
}


