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

// Which streams are specific to Facebook? (these are the ones that will be searched)
var fb_boxes=[59982602,55962668]; // right click on the box title, click 'Inspect Element', find the part that says <div id="box55962668" class"_boxstream" data-boxid="55962668" ...>   the data-boxid is the number you want. Place that in here

// Which users have BAD profile pictures (usually girls kissing their boyfriends, or posting half-naked pics of their bf's....damn girls -_-)
var fb_user_images=[100000565688978]; // Right click their picture, click 'Inspect Element', find the part that says <a class="_userInfoDropdown networkAvatarLink _userInfoPopupHere _dropDownCreated" userid="user|100000565688978" ...>   the userid number is the one you want. Place that in here

// Timers (in milliseconds)
// wait_to_start: how long to wait before loading this script (you want to set this to however long it takes for things to properly load up; otherwise nothing will work)
// update_timer: how long to wait before checking if the stream is updating (500 is probably good)
// initial_timer: how long to wait before initially clearing the images and apps
var wait_to_start = 5000, update_timer=500;
var initial_timer=wait_to_start+2000;
	


/******************************************************************/
/** Functionaliy **/

clear_images = function() {
	// People with annoying profile pics
	for (var i=0; i<fb_boxes.length; i++) {
		for (var j=0; j<fb_user_images.length; j++) {
			$('div[data-boxid="'+fb_boxes[i]+'"] div[externaluserid="user|'+fb_user_images[j]+'"] img').attr('src','');
		}
	}
};

clear_apps = function() {
	// Clear annoying app-posts
	for (var i=0; i<fb_boxes.length; i++) {
		$('div[data-boxid="'+fb_boxes[i]+'"] a:regex(href,apps.facebook.com.*)').parent().parent().remove();
		$('div[data-boxid="'+fb_boxes[i]+'"] a:regex(href,platform.ak.fbcdn.net.*)').parent().parent().remove();
		$('div[data-boxid="'+fb_boxes[i]+'"] a:regex(href,schoolfeed.classmates.*)').parent().parent().remove();

	}
};


is_updating = null;

setTimeout((function(){
	is_updating = (function() {
		// Global update
		var global_stream = $('div.controls span[class="icon-19 refresh"]').parent(),
		    individual_streams = $('div.message-more');
		return function() {
			if (global_stream.css('display')=='none') return true;
			for (var i=0; i<individual_streams.length; i++) { 
				if ($(individual_streams[i]).hasClass('_tweetMoreHidden')) {
					return true;
				}
			}
		}
	}());
}), wait_to_start);


/******************************************************************/
/** Clearing **/


	
	var update = function(force) {
		if (force || is_updating()) {
			console.log('updating!');
			clear_images();
			clear_apps();
		}
		setTimeout(update, update_timer);
	};

	setTimeout(function(){ update(true); }, initial_timer);

