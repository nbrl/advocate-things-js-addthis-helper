/*
 * This file requires the advocate things sdk and the addthis library to be pre-loaded.
 * The order of the inclusion should not effect the functionality of this file.
 */

var addthisHelper = {
	// Handle appending token to the share url
	RegisterSharepointSaveHandler: function() {
		if(typeof AT !== 'undefined') {
			AT.addEventListener(AT.Events.SharepointSaved, function (meta) {
				var urlToShare = addthisHelper.constructUrlToShare(meta[0].token, meta[0].queryParamName);
				
				addthisHelper.sharePage(urlToShare);
			});
		} else {
			addthisHelper.error('AT var not found');
		}
	},
	// On share send at data to sharepoint collector
	RegisterAddthisShareListener: function() {
		if(typeof addthis !== 'undefined') {
			addthis.addEventListener('addthis.menu.share', function AT_AddThisShareEventHandler(evt) {
				// This is weird since this is what we were listening for anyway... taken from addthis example
				if (evt.type == 'addthis.menu.share') {
					// Check if the _at object is set, if not throw error in console
					if(typeof window.advocate_things_data == 'undefined') {
						addthisHelper.error('_at object/sharepointName not set! Aborting');

						return false;
					}

					// Save the shareChannel in the at object
			        window.advocate_things_data._at.shareChannel = evt.data.service;

			        // Send sharepoint data
			        AT.sendSharepoint(window.advocate_things_data._at.sharepointName, window.advocate_things_data);
			    }
			});
		} else {
			addthisHelper.error('Addthis var is not defined');
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
	error: function(errorMessage) {
		console.warn('addthisHelper: ' + errorMessage);
	}
};

addthisHelper.RegisterAddthisShareListener();
addthisHelper.RegisterSharepointSaveHandler();