
var text=document.querySelector('.nav-list input[type=text]')
var createBtn=document.querySelector('.nav-list input[type=button]')
var nowList=document.querySelector('.now .list')
var nowNum=document.querySelector('.now .num')
var comList=document.querySelector('.com .list')
var comNum=document.querySelector('.com .num')
createBtn.onclick=function(){
	if(text.value==""){
		alert('请输入待办事项内容!')
		return
	}
	var data=getData()
	data.push({title:text.value,done:false})
	text.value==""//数据一提交输入框内容为空
	saveData(data) //保存数据
	reWrite()   //把数据写到页面上
	
}
// getData()
function getData(){
	//data = null || "[{},{}]"
	var data=JSON.parse(localStorage.getItem('todo'));
	return data||[];
}
function changeState(id,state){
	var data=getData()
	data[id].done=state;
	saveData(data);
	reWrite();
}

function changeText(id,txt){
	var data=getData()
	if(data[id].title==txt){	// 如果没有进行修改就直接退出
		return
	}
	data[id].title=txt;
	saveData(data);
	reWrite();
}
function delData(id){
	var data=getData()
	data.splice(id,1)
	saveData(data);
	reWrite();
}
function saveData(data){
	localStorage.setItem('todo',JSON.stringify(data))//先把数组对象转换成字符串
}
function reWrite(txt){
	// alert(1)
	var nStr="";
	var cStr="";
	var nNum=0;
	var cNum=0;
	var data=getData()
	data.forEach(function(o,i){//o对象  i下标
		if(o.done==false){
			nStr+='<li id='+i+'><input type="checkbox" onclick=changeState('+i+',true)><div class="cont" contenteditable=true onblur=changeText('+i+',this.innerHTML)>'+o.title+'</div><input type="button" value="X" onclick=delData('+i+')></li>'
			nNum++;
		}else{	
			// alert(1)
			cStr+='<li id='+i+'><input type="checkbox" checked onclick=changeState('+i+',false)><div class="cont" contenteditable=true onblur=changeText('+i+',this.innerHTML)>'+o.title+'</div><input type="button" value="X" onclick=delData('+i+')></li>'
			cNum++;
		}
	})
	nowList.innerHTML=nStr
	comList.innerHTML=cStr
	nowNum.innerHTML=nNum
	comNum.innerHTML=cNum	
}
document.querySelector('.del').onclick=function(){
	localStorage.clear()
	reWrite()
}
   
/*1.数据结构  整理好
  2.获取 保存
  3.增 删 改 查
*/