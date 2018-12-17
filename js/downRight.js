const div_downRight = document.getElementById('down-right')

// 
div_downRight.onclick = function() {

	downRight_addTitle('用户评价', 'title_downRight');
	downRight_commentScroll('comment_downRight');
	downRight_getCommentById('10023099');

}


//downRight的标题
function downRight_addTitle(content, id) {
	div_downRight.innerHTML = "";
	const p = document.createElement('p');
	p.id = id;
	p.innerHTML = content;
	p.className = 'title_downRight';
	div_downRight.appendChild(p);
}

//初始化滚动条
function downRight_commentScroll(id) {
	//div_downRight.innerHTML = "";
	const div = document.createElement('div');
	div.id = id;
	div.className = 'commentScroll_downRight'
	div_downRight.appendChild(div);
}

//网络请求
function downRight_getCommentById(res_id) {
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

			console.log(data.data);
			for (let i in data.data) {
				console.log(data.data[i].user_pic);
				let urlHead = "http://i3.dpfile.com/s/img/uc/default-avatar48c48.png";
				let name = data.data[i].user_name;
				let comment = data.data[i].review;
				let commentId = "downRight_comment_"+data.data[i].data_id;
				downRight_commentItem(commentId);
				downRight_commentHead(commentId, urlHead, name);
				downRight_commentBody(commentId, comment);
			}
		}
	}
	console.log("downRight_getCommentById")
	xmlhttp.open("POST", "http://www.pipicat.top:5000/rest/combyid", true);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.send(JSON.stringify({
		"id": res_id
	}));
}


//评论Item
function downRight_commentItem(id) {
	const comment = document.querySelector('.commentScroll_downRight');
	const div = document.createElement('div');
	div.id = id;
	div.className = 'commentItem_downRight'
	comment.appendChild(div);
}

//用户头像 + 用户姓名
function downRight_commentHead(item_id, urlHead, names) {
	const item = document.querySelector('#' + item_id);
	const div = document.createElement('div');
	
	const img = document.createElement('img');
	const name = document.createElement('div');
	name.innerText = names;
	name.className = 'itemName_downRight';
	img.className = 'itemHeadImage_downRight'
	img.src = urlHead;
	
	div.appendChild(img);
	div.appendChild(name);
	item.appendChild(div);

}

// 用户评论
function downRight_commentBody(item_id, userComment) {
	const item = document.querySelector('#' + item_id);
	const div_comment = document.createElement('div');
	
	div_comment.className = 'itemComment_downRight';
	div_comment.innerText = userComment;

	item.appendChild(div_comment);
}
