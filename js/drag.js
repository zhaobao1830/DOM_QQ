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

//下面的这些，都是实现QQ登陆框的拖拽功能
window.onload=drag;

//通过getByClass，获取loginPanel下的login_logo_webqq，并给其绑定onmousedown事件
function drag() {
    var oTitle=getByClass('login_logo_webqq','loginPanel')[0];
    //拖拽功能
    oTitle.onmousedown=fnDown;
    //关闭
    var oClose=document.getElementById('ui_boxyClose');
    oClose.onclick=function () {
        document.getElementById('loginPanel').style.display='none';
    }
    //切换状态
    var loginState=document.getElementById('loginState'),
        stateList=document.getElementById('loginStatePanel'),
        lis=document.getElementsByTagName('li'),
        stateTxt=document.getElementById('login2qq_state_txt');

    loginState.onclick=function () {
        stateList.style.display='block';
    }

    //鼠标滑过、离开和点击状态列表时
    for(var i=0,l=lis.length;i<l;i++){
        lis[i].onmousemove=function () {
            this.style.background="#567"
        }
        lis[i].onmouseout=function () {
            this.style.background="#fff"
        }
        lis[i].onclick=function () {
            var id=this.id;
            stateList.style.display='none';
            stateTxt.innerHTML=getByClass('stateSelect_text',id)[0].innerHTML;
        }
    }

}
//鼠标按下事件
function fnDown(event) {
    event=event || window.event;
    var oDrag=document.getElementById('loginPanel');
    //光标按下时光标和面板之间的距离
    var disX=event.clientX-oDrag.offsetLeft;
    var disY=event.clientY-oDrag.offsetTop;

    //移动
    document.onmousemove=function (event) {
        event=event || window.event;
        fnMove(event,disX,disY)
    }
    //释放鼠标
    document.onmouseup=function (event) {
        document.onmousemove=null;
        document.onmouseup=null;
    }
}

function fnMove(e,posX,posY) {
    var oDrag=document.getElementById('loginPanel'),
        l=e.clientX-posX, //oDrag边框的left值
        t=e.clientY-posY, //oDrag边框的top值
        //窗口的宽
        winW=document.documentElement.clientWidth || document.body.clientWidth,
        //窗口的高
        winH=document.documentElement.clientHeight || document.body.clientHeight,
        //oDrag边框距离窗口左边最远的距离
        //多减去10是为了好看
        maxW=winW-oDrag.offsetWidth-10,
        //oDrag边框距离窗口头部最远的距离
        maxH=winH-oDrag.offsetHeight;
    if(l<0){
        l=10;
    }else if(l>maxW){
        l=maxW;
    }
    if(t<0){
        t=10;
    }else if(t>maxH){
        t=maxH;
    }
    oDrag.style.left=l+'px';
    oDrag.style.top=t+"px";
}