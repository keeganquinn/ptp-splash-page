ptp-splash-page
=============

This is the Personal Telco Project splash page. It is presented to users when
they first connect to a node.

In addition to the primary function of presenting the ToS, the splash page is
an opportunity:
 * to educate folks about PTP
 * to acknowledge the node host
 * to ask for donations
 * to acknowledge donors and contributors


Build Procedure
---------------

Node.js and Yarn are required.

The build produces two artifacts: `splash.min.js` and `splash.min.css`.
These are compiled from files in the `src` directory with the assistance of
Webpack. Configuration can be found in `webpack.config.js`.

To perform a build:

````bash
./build.sh
````

You can run a small webserver to test locally:

````bash
yarn server
````

Additional Yarn commands are listed in `package.json`.


Design Notes
------------

The splash page is a single page app built using Bootstrap.

Everything that gets loaded to the browser from the router lives in `htdocs`.

The splash page loads from the router and then the loaded page makes calls
to `static.personaltelco.net` which contains the static files from the
[ptp-splash-server repo](https://github.com/personaltelco/ptp-splash-server).
These in turn then make calls to `api.personaltelco.net`
which is in the [ptp-api repo](https://github.com/personaltelco/ptp-api).

By keeping the API separate from the router and server logic, we hope to allow
folks to easily understand which piece of the puzzle should be worked on at
each point.

Some configuration is present at the end of `splash.html`:

````html
<script>
  var pageConf = {
    ...
  };
</script>
````

More information can be found in the Personal Telco wiki:
https://personaltelco.net/wiki/NewCaptivePortalFeatures


Deployment
----------

The `htdocs` directory is consumed as part of the `FOOCAB.pl` build process.
This script can be found in the
[ptp-openwrt-files repo](https://github.com/personaltelco/ptp-openwrt-files/).

Specifically, these files are placed in the `/www` directory inside the
generated node filesystem.

The `FOOCAB.pl` script also replaces all `PTP_VARNAME_PTP` values with
information stored in the PTP API database.
