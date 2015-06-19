;(function (context) {

    addthishelper = {};

    /**
     * Adds the share channel to the share data when the share occurs.
     */
    addthishelper.registerShareListener = function () {
        addthis.addEventListener('addthis.menu.share', function (evt) {
            var data = JSON.parse(JSON.stringify(window.advocate_things_data));
            data._at.shareChannel = evt.data.service;

            context.AT.consumeToken(
                context.AT.getAddressBarShareToken(),
                data, function (err, token) {
                    if (err) {
                        console.log(err);
                    }

                    context.AT.createToken(window.advocate_things_data);
                });
        });
    };

    addthishelper.registerUpdateShareUrl = function () {
        context.AT.addEventListener(AT.Events.TokenCreated, function (meta) {
            var token = context.AT.getAddressBarShareToken();
            var qpName = context.AT._getQueryParamName(meta);

            if (token) {
                var urlToShare = addthishelper.constructUrl(token, qpName);

                addthishelper.setShareUrl(urlToShare);
            }
        });
    };

    addthishelper.setShareUrl = function (urlToShare) {
        addthis.update('share', 'url', urlToShare);
        addthis.url = urlToShare;
        addthis.ready();
        //addthis.layers.refresh();
        //addthis.toolbox(".addthis_sharing_toolbox");
    };

    addthishelper.constructUrl = function (token, qpName) {
        var parser;
        var url;

        // Instantiate parser
        parser = document.createElement('a');
        // If someone has injected the addthis url then use that, else use the default browser url
        parser.href  = (addthis.url) ? addthis.url : window.top.location.href;

        // Deal with existing token
        if(parser.href.indexOf(qpName + '=') !== -1 ) {
            var re = new RegExp(qpName + "=.[^#&]*", "g");
            parser.href = parser.href.replace(re, qpName + '=' + token);

            return parser.href;
        }

        // Append new token
        url = parser.origin +
            parser.pathname +
            (parser.search
             ? parser.search + '&' + qpName+ '=' + token
             : '?' + qpName + '=' + token) +
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
