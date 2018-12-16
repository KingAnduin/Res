
const div_downMid = document.getElementById('down-mid')


// addHeadLine('我是标题');



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
	var xmlhttp;
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
			downMid_addCiYun('downMid_image_CiYun', data.data);
		}
	}
	console.log("downMid_loadCiYun")
	xmlhttp.open("POST", "http://www.pipicat.top:5000/rest/picbyid", true);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.send(JSON.stringify({
		"id": res_id
	}));
}


function downMid_addCiYun(id, url) {
	const img = document.createElement('img');
	img.id = id;
	img.alt = "图片还没有加载出来！";
	img.src = url;
	img.className = 'image_img_downMid'
	div_downMid.appendChild(img);
}