/**
 * Created by Administrator on 2016/12/5.
 */
/*
 clsName 要获取的元素的class的名字
 parent  是父元素的ID，这个值是可选的
 return els
 */

function getByClass(clsName,parent) {
    var oParent=parent?document.getElementById(parent):document,
        // 获取到的值放到这个数组
        eles=[],
        //获取父元素下的所有标签
        elements=oParent.getElementsByTagName("*")
    for(var i=0,m=elements.length;i<m;i++){
        if(elements[i].className==clsName){
            eles.push(elements[i])
        }
    }
    return eles
}

window.onload=drag;

//通过getByClass，获取loginPanel下的login_logo_webqq，并给其绑定onmousedown事件
function drag() {
    var oTitle=getByClass('login_logo_webqq','loginPanel')[0];
    oTitle.onmousedown=fnDown;
}
//鼠标按下事件
function fnDown(event) {
    event=event || window.event;
    var oDrag=document.getElementById('loginPanel')
    document.onmousemove=function (event) {

        oDrag.style.left=event.clientX-+'px';
        oDrag.style.top=event.clientY+'px';
    }
}