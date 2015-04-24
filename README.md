Advocate Things JavaScript Addthis Helper [![Build Status](https://travis-ci.org/digitalanimal/advocate-things-jsaddthis-helper.svg?branch=master)](https://travis-ci.org/digitalanimal/advocate-things-js-addthis-helper)
====

A script to integrate Advocate Things tracking with Addthis buttons

## <a name="api-installation"></a>Insallation
### Browser
In order to use the helper in the browser, simply add the following to your HTML pages just before the Addthis sharebuttons:

```html
<script type="text/javascript" src="https://advocate-things-js-addthis-helper.js" ></script>
<div id="addthis_buttons">...</div>
```

This will automatically do the following:

- Append `shareToken` to the Addthis Share URL
- Add the `shareChannel` to the `_at` object for Advocate Things to track
- Register a share with Advocate Things when someone shares.

To register Shares against separate Sharepoints for each social button, you can register Sharepoints for each share button individually. e.g. to register a Facebook Share as a separate Sharepoint, register `facebookShare` as Sharepoint with an Advocacy Analyst.

**Note: The reason for adding the script just before the Addthis buttons is to handle any dynamically injected share URL settings.**
