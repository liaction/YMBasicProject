(function() {
	var initWidth = window.document.documentElement.clientWidth;
	console.log('width: ' + initWidth);
	document.getElementsByTagName('html')[0].style.fontSize = initWidth / 32 + 'px';
	console.log('html fontSize: '+document.getElementsByTagName('html')[0].style.fontSize);
})()