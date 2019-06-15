(function detectIPad(){
	if(!navigator.userAgent.match(/iPad/ig)) return 0;
	if(navigator.userAgent.match(/3_2/g)) return 1;
	return 2;
})()