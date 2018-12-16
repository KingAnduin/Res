
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

function downMid_addCiYun(url, id) {
	const img = document.createElement('img');
	img.id = id;
	img.alt = "图片还没有加载出来！";
	img.src = url;
	img.className = 'image_img_downMid'
	div_downMid.appendChild(img);
}