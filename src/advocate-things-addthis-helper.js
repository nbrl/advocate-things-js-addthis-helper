/*
 * This file requires the advocate things sdk and the addthis library to be pre-loaded.
 * The order of the inclusion should not effect the functionality of this file.
 *
 * To use simply add this file just before the addthis buttons container.
 */

var addthisHelper = {
	// Handle appending token to the share url
	registerSharepointSaveHandler: function() {
		if(typeof AT !== 'undefined') {
			AT.addEventListener(AT.Events.SharepointSaved, function (meta) {
				var queryParamName, urlToShare;

				urlToShare = addthisHelper.constructUrlToShare(meta[0].token, meta[0].queryParamName);
				console.log('urltoshare: ' + urlToShare);

				addthisHelper.sharePage(urlToShare);
			});
		} else {
			addthisHelper.error('AT var not found');
		}
	},
	sharePage: function(urlToShare) {
		addthis.update('share', 'url', urlToShare);
		addthis.url = urlToShare;
		addthis.ready();
	},
	// Private method used by registerSharepointSaveHandler
	constructUrlToShare: function (token, queryParamName) {
		var parser, url;

		// Instantiate parser
		parser = document.createElement('a');
		// If someone has injected the addthis url then use that, else use the default browser url
		parser.href  = (addthis.url) ? addthis.url : window.top.location.href;

		// Deal with existing token
		if(parser.href.indexOf(queryParamName + '=') !== -1 ) {
			var re = new RegExp(queryParamName + "=.[^#&]*", "g");
			parser.href = parser.href.replace(re, queryParamName + '=' + token);

			return parser.href;
		}

		// Append new token
		url = parser.origin +
			parser.pathname +
			(parser.search? parser.search + '&' + queryParamName+ '=' + token : '?' + queryParamName + '=' + token) +
			parser.hash;

		return url;
	},
	// On share send at data to sharepoint collector
	registerAddthisShareListener: function() {
		if(typeof addthis !== 'undefined') {
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
			        AT.sendSharepoint(window.advocate_things_data._at.sharepointName, window.advocate_things_data);
			    }
			});
		} else {
			addthisHelper.error('Addthis var is not defined');
		}
	},
	error: function(errorMessage) {
		console.log('addthisHelper: ' + errorMessage);
	}
};

addthisHelper.registerAddthisShareListener();
addthisHelper.registerSharepointSaveHandler();