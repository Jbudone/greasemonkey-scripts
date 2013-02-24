// ==UserScript==
// @name        Outlook
// @namespace   hootsuite
// @include     https://blu002.mail.live.com/default.aspx
// @include     https://*.mail.live.com/default
// @include	https://blu002.mail.live.com/default.aspx?wa=wsignin1.0
// @include	https://blu002.mail.live.com/default.aspx?wa=wsignin1.0&rru=inbox
// @version     1
// ==/UserScript==


// Stretch MainContent to full view
setTimeout(function(){
	var jbs_css_inject=document.createElement('style');
	jbs_css_inject.innerText="#MainContent { right:0px !important; }";
	document.head.appendChild(jbs_css_inject);
	document.getElementById('MainContent').style.right="0px";
},1000);
