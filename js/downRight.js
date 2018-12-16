const div_downRight = document.getElementById('down-right')

// 
div_downRight.onclick = function() {
	
	downRight_addTitle('用户评价', 'title_downRight');
	downRight_commentScroll('comment_downRight');
	
	
	for (let i =1; i<5; i++){
		let urlHead = "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=300421721,1117286362&fm=26&gp=0.jpg";
		let name = "asd";
		let comment = "asdasdasdasd";
		let commentId = "item1_downRight";
		downRight_commentItem(commentId);
		downRight_commentHead(urlHead, name);
		downRight_commentBody(comment);
	}
	
	
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


//评论Item
function downRight_commentItem(id) {
	const comment = document.querySelector('.commentScroll_downRight');
	const div = document.createElement('div');
	div.id = id;
	div.className = 'commentItem_downRight'
	comment.appendChild(div);
}

//用户头像 + 用户姓名
function downRight_commentHead(urlHead, name){
	const item = document.querySelector('.commentItem_downRight');
	const div = document.createElement('div');
	const img = document.createElement('img');
	const div_name = document.createElement('div');
	div_name.innerText = name;
	div_name.className = 'itemName_downRight';
	img.className = 'itemHeadImage_downRight'
	img.src = urlHead;
	div.appendChild(img);
	div.appendChild(div_name);
	item.appendChild(div);

}

//空白占位符 + 用户评论
function downRight_commentBody(userComment){
	const item = document.querySelector('.commentItem_downRight');
	const div = document.createElement('div');
	const div_black = document.createElement('div');
	const div_comment = document.createElement('div');
	div.style.width = '100%'
	div_black.className = 'itemHeadImage_downRight';
	div_comment.className = 'itemComment_downRight';
	div_comment.innerText = userComment;
	div.appendChild(div_black);
	div.appendChild(div_comment);
	item.appendChild(div);
}
