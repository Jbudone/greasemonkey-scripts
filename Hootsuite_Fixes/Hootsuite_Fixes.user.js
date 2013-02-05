// ==UserScript==
// @name        Hootsuite Fixes
// @namespace   hootsuite
// @description Personalized fixes
// @include     http://hootsuite.com/dashboard
// @version     1
// @author	JB Braendel
// @date	Jan, 29. 2013
// ==/UserScript==


// jQuery regex selection
// source: http://james.padolsey.com/javascript/regex-selector-for-jquery/
jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ? 
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}


/******************************************************************/
/** Settings **/

// Which users have BAD profile pictures (usually girls kissing their boyfriends, or posting half-naked pics of their bf's....damn girls -_-)
var fb_user_images=[100000565688978]; // Right click their picture, click 'Inspect Element', find the part that says <a class="_userInfoDropdown networkAvatarLink _userInfoPopupHere _dropDownCreated" userid="user|100000565688978" ...>   the userid number is the one you want. Place that in here

// Which apps to block
var evil_app_details = [['href','apps.facebook.com.*']];
/* TO PROGRAMMERS:
 *  under div.facebookMessage>div.postAttachment>a.attachedLink this is what is searched and destroyed. Just give a pair
 *  of attribute and value contained within that attribute that will be matched and remove the entire message
 *
 * TO NON PROGRAMMERS:
 *  either disregard, or ask a programmer to add new apps to be blocked for you  :)

/******************************************************************/
/** REMOVE APPS **/

check_posts = function() {
	$('div.avatarFacebook>div.facebookMessage:not(.JB_checked)').each(function(el){
		var el=$(this);
		// check stuff on this post
		for (var i=0; i<evil_app_details.length; i++) {
			if ($('div.postAttachment>a.attachedLink:regex('+evil_app_details[i][0]+','+evil_app_details[i][1]+')',this).length) {
				el.remove();
				return;
			}
		}
		el.addClass('JB_checked');
	});
};
 	var update_timer=1000,
		initial_timer=5000,
 		update = function() {
			check_posts();
			setTimeout(update, update_timer);
 	};
 	setTimeout(function(){ update(); }, initial_timer);


/*******************************************************************/
/** REMOVE PROFILE PICTURES **/

var cssinject = document.createElement('style');
cssinject.setAttribute('type','text/css');
for (var i=0; i<fb_user_images.length; i++) {
	cssinject.innerHTML+="div.avatarFacebook div[externaluserid='user|"+fb_user_images[i]+"'] img { display:none; }";
}

document.head.appendChild(cssinject);
