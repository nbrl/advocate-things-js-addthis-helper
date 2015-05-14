/*
 * This file requires the advocate things sdk and the addthis library to be pre-loaded.
 * The order of the inclusion should not effect the functionality of this file.
 *
 * To use simply add this file just before the addthis buttons container.
 */

// Handle appending token to the share url
AT.addEventListener(AT.Events.SharepointSaved, function (meta) {
	var queryParamName, urlToShare;

	// If queryParam is not defined
	if(typeof meta[0].queryParamName == 'undefined') {
		queryParamName = 'AT';
	}
	else {
		queryParamName = meta[0].queryParamName;
	}

	urlToShare = AT_ConstructUrlToShare(meta[0].token, queryParamName);
	addthis.update('share', 'url', urlToShare);
	addthis.url = urlToShare;
	addthis.ready();
});

function AT_ConstructUrlToShare(token, queryParamName) {
	var parser, url;

	// If no queryParameter is specified, AT is the default
	if(queryParamName === '') {
		queryParamName = 'AT';
	}

	// Instantiate parser
	parser = document.createElement('a');
	// If someone has injected the addthis url then use that, else use the default browser url
	parser.href  = (addthis.url) ? addthis.url : window.top.location.href;

	// Deal with existing token
	if(parser.href.indexOf(queryParamName + '=') !== -1 ) {
		var re = new RegExp("/" + queryParamName + "=.[^#&]*/", "g");
		parser.href = parser.href.replace(re, queryParamName + '=' + token);

		return parser.href;
	}

	// Append new token
	url = parser.protocol +
		'//' +
		parser.hostname +
		parser.host +
		parser.pathname +
		(parser.search? parser.search + '&' + queryParamName+ '=' + token : '?' + queryParamName + '=' + token) +
		parser.hash;

	return url;
}

// On share send at data to sharepoint collector
addthis.addEventListener('addthis.menu.share', function AT_AddThisShareEventHandler(evt) {
	if (evt.type == 'addthis.menu.share') {
		// Save the shareChannel in the at object
        window.advocate_things_data._at.shareChannel = evt.data.service;

        // Send sharepoint data
        // If serviceShare is defined in client config, it will be picked up by the engine otherwise it
        // will stick to the default, this will allow multiple sharepoint on addthis buttons.
        //
        // At the moment this will probably have a collision if someone has more than one website with 
        // addthis buttons, to get around that one should create separate clients possibly or come up 
        // with another solution This could be made even more generic by reading a specific var the at
        // object and appending it to the name, making the sharepoint definition unique for the client's
        // website.
        AT.sendSharepoint(evt.data.service + 'Share', window.advocate_things_data);
    }
});