//JavaScript document
function gid(txt){
	return(document.getElementById(txt));
}

function Menu(Arr){
	this.el=null; this.menuBaseHeight=20;
	this.baseColor="buttonface";
	this.widthForDiv=0;
	this.setStyle = function(){
		with (this.el.style) {
			backgroundColor=this.baseColor;
			color="black";
			border="2px outset";
			position="absolute";
			top="0px"; left="-2px";
			width="102%";
			padding="0 2 2 2";
			fontFamily="Verdana";
			fontSize="13px";
			zIndex="2";
		}
	}	

	this.buttonClearStyle=function(){ //���������� �� ������
		with (this.style){
			border="1px solid transparent";
			backgroundColor="buttonface";
		}
	}
	this.buttonMousedStyle=function(){ //���������� �� ������
		with (this.style){
			border="1px solid black";
			backgroundColor="b0b0ff";
		}
			//if(gid("menuBase").showedMenu==1){
			 gid("menuBase").hideAll();
			//}
	}
	//������ ������
	this.el=document.createElement("div");
	this.el.showedMenu=false; // ���� �������
	this.el.hideAll=function() {
		for (x=0;x<gid("menuBase").menuCount;x++) {
			gid(x + ".").style.visibility="hidden";
			gid("menuBase").showedMenu=false;
		}
	}
	this.setStyle();
	this.el.style.height=this.menuBaseHeight;
	this.el.style.zIndex="0";
	this.el.id="menuBase";
	this.el.menuCount=0;

	document.body.appendChild(this.el);
	// ���������� ������ �� ������
	for (x=0;x<Arr.length;x++){
		this.el=document.createElement("input");
		this.setStyle();
		with (this.el.style){
			width=Arr[x].length*12 + "px";
			height=this.menuBaseHeight;
			position="";
			top="";	left="";
			border="1px solid transparent";
			marginTop="1px";
		}
		this.el.type="button";
		this.el.value=Arr[x];
		this.el.height=this.menuBaseHeight;
		// ���� �� ��������� ������
		this.el.onclick=function(){
			var tmp=gid(this.id + ".").style.visibility;
			gid("menuBase").hideAll();
			if (tmp=="hidden"){
				gid(this.id + ".").style.visibility="visible";
				gid("menuBase").showedMenu=true;
			}	
			this.blur();
		}
		this.el.onmouseover=this.buttonMousedStyle;
		this.el.onmouseout=this.buttonClearStyle;
		this.el.id=x;
		gid("menuBase").appendChild(this.el);
	
		// ��������� ���� �������
		this.el=document.createElement("span");
		this.setStyle();
		with (this.el.style){
			top=this.menuBaseHeight+5+"px"; 
			padding="2 2 2 2";
			textAlign="left";
			left=this.widthForDiv;
			border="2px outset";
			width=""; visibility="hidden";
		 zIndex="3";
		}
		this.el.id=x + ".";
		this.el.onclick=gid("menuBase").hideAll;
		this.el.itemsCount=0;
		gid("menuBase").appendChild(this.el);
	gid("menuBase").menuCount++;
		this.widthForDiv+=Arr[x].length*12;
	}
	//��������� �������
	this.addItem=function(id,text,proc){
	this.el=document.createElement("div");
		this.el.innerHTML=text;
		this.el.onclick=proc;
		this.el.onmouseover=function(){
			this.style.backgroundColor="c0c0ff";
		}
		this.el.onmouseout=function(){
			this.style.backgroundColor="transparent";
		}
		this.el.onclick=proc;
		this.el.id=id+gid(id).itemsCount;
	this.el.style.cursor="default";
	this.el.style.padding="1 1 1 1";
		gid(id).appendChild(this.el);
		gid(id).itemsCount++;
	}
	// ������� � ����� ���������
	this.hide=function(id){
		id=id || "menuBase";
		try{gid(id).style.display="none";
		} catch(e) {alert(e)}
	}
	this.show=function(id){
		id=id || "menuBase";
		try{gid(id).style.display="block";
		} catch(e) {alert(e)}
	}
}
//---------| ����� ���� �������� | ---------
/*���, ������������� ����, ������������� �������� � ���������,
����� ���� �������� ��� ����� �� ���������.

document.onkeydown = function () {
	switch (self.window.event.keyCode){
		case 27:
			if (!gid("menuBase").showedMenu){
				self.close();
			} else {
				gid("menuBase").hideAll();
			}
			break
	}
}
document.onclick=function(){
	if (window.event.srcElement.id[1]!="." && window.event.srcElement.id.length!=1){
		gid("menuBase").hideAll();
	}
}

*/