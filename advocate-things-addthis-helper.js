AT.addEventListener(AT.Events.SharepointSaved, function (meta) {
	var urlToShare = constructUrlToShare(meta[0].token);
	addthis.update('share', 'url', urlToShare);
	addthis.url = urlToShare;
	addthis.ready();
});

function constructUrlToShare(token) {
	var parser = document.createElement('a');
	// If someone has injected the addthis url then use that, else use the default browser url
	parser.href  = (addthis.url) ? addthis.url : window.top.location.href;

	// Deal with existing token
	if(parser.href.indexOf('DA=') !== -1 ) {
		parser.href = parser.href.replace(/DA=.[^#&]*/g, 'DA='+token);

		return parser.href;
	}

	// Append new token
	return parser.protocol +
		'//' +
		parser.hostname +
		parser.host +
		parser.pathname +
		(parser.search? parser.search + '&DA=' + token : '?DA=' + token) +
		parser.hash;
}