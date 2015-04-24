Advocate Things JavaScript Addthis Helper [![Build Status](https://travis-ci.org/digitalanimal/advocate-things-jsaddthis-helper.svg?branch=master)](https://travis-ci.org/digitalanimal/advocate-things-js-addthis-helper)
====

A script to integrate advocate things tracking with addthis buttons

## <a name="api-installation"></a>Insallation
### Browser
In order to use the helper in the browser, simply add the following to your HTML pages just before the addthis sharebuttons:

```html
<script type="text/javascript" src="https://advocate-things-js-addthis-helper.js" ></script>
<div id="addthis_buttons">...</div>
```

This will automatically do the following:

- Append `shareToken` to the addthis share URL
- Add the `shareChannel` to the `_at` object for advocate things to track
- Register a share with advocate things when someone shares.

**Note: The reason for adding the script just before the addthis buttons is to handle any dynamically injected share URL settings.**
