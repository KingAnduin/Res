const div_downMid = document.getElementById('down-mid')

//downMid 初始化函数
//userId ：用户ID
function downMid_initAll(userId){
	downMid_addHeadLine('热门评价词条', 'title_downMid');
	downMid_loadCiYun(userId);
}



//downMid的标题
function downMid_addHeadLine(content, id) {
	div_downMid.innerHTML = ""
	const p = document.createElement('p');
	p.id = id;
	p.innerHTML = content;
	p.className = 'headTitle_p_downMid'
	div_downMid.appendChild(p);
}


//加载downMid界面中的词云
function downMid_loadCiYun(res_id) {
	let xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//回调函数
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log('123'+data);
			let str = xmlhttp.responseText
			let data = JSON.parse(str)
			downMid_addCiYun('downMid_image_CiYun', data.data);
			
		}
	}
	xmlhttp.open("POST", "http://www.pipicat.top:5000/rest/picbyid", true);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.send(JSON.stringify({
		"id": res_id
	}));
}


//创建接收词云的Image
function downMid_addCiYun(id, url) {
	if (!document.getElementById(id)) {
		//div_downMid.innerHTML = ""
		const img = document.createElement('img');
		img.id = id;
		img.alt = "图片还没有加载出来！";
		img.src = url;
		img.className = 'image_img_downMid'
		div_downMid.appendChild(img);
	}
}
