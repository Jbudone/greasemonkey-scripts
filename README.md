" JB's Greasemonkey Scripts

My personal scripts for Greasemonkey
Feel free to clone, steal, rewrite, destroy or claim them as your own

Hoodsuite Fixes
=================

Hoodsuite is pretty damn awesome..until you link it to Facebook and realize how many friends you have that are hooked on those silly apps, and spam your damn feed with the latest badge they got in Toy-Kicker; or all those girls who you thought were respectable individuals, who happen to have a profile picture of her and her latest boyfriend kissing at full-zoom in closeup. 

TL;DR: some people on fb are kind of annoying..

This script removes those annoying parts of your friends on Fb, and only keeps the good

Installation
``````
	add script to Greasemonkey & link to your Dashboard
	Edit the settings accordingly:
		fb_boxes=[...]; should contain an array of boxid's for each Facebook box-stream (right click the facebook stream, Inspect Element and you'll find it there)
		fb_user_images=[...]; contains the userid's of users who's profiles you do not want to say (eg. girls with boyfriend/kissing pictures, guys with half-naked pictures of themselves); right click the user profile pic, Inspect Element and you'll find userid="user|******" with the number there
``````
 Warning: Do NOT tell these people that you've added them to the following list...they may not take it so lightly
