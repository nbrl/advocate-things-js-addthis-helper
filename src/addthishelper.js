;(function (context) {

    addthishelper = {};

    /**
     * Adds the share channel to the share data when the share occurs.
     */
    addthishelper.registerShareListener = function () {
        addthis.addEventListener('addthis.menu.share', function (evt) {
            context.AT.consumeToken(
                context.AT.getAddressBarShareToken(),
                { _at: { shareChannel: evt.data.service } }
            );
        });
    };

    addthishelper.registerUpdateShareUrl = function () {
        context.AT.addEventListener(AT.Events.TokenCreated, function (meta) {
            var token = context.AT.getAddressBarShareToken();
            var qpName = context.AT._getQueryParamName(meta);

            if (token) {
                var urlToShare = addthishelper.constructUrl(token, qpName);

                addthis.update('share', 'url', urlToShare);
                addthis.url = urlToShare;
                addthis.ready();
            }
        });
    };

    addthishelper.constructUrl = function (token, qpName) {
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
c
        // Append new token
        url = parser.origin +
            parser.pathname +
            (parser.search
             ? parser.search + '&' + queryParamName+ '=' + token
             : '?' + queryParamName + '=' + token) +
            parser.hash;

        return url;
    };

    /**
     * Initialise helper.
     */
    addthishelper.init = function () {
        addthishelper.registerShareListener();
        addthishelper.registerUpdateShareUrl();
    };
    addthishelper.init();

    context.AT.addthishelper = addthishelper;

}(this));
