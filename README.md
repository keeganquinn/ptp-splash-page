ptp-splash-page
=============

As part of the [PTP SplashPage2014](https://personaltelco.net/wiki/SplashPage2014) effort...

The Personal Telco Project's splash page that user's see when they connect to a node and get redirected by the 'captive portal' 

Benjamin Foote  
2014-02-21   
ben@bnf.net  


## About the splash page

When a user connects to a node, usually via wifi, they cannot immediately
access the internet.  They are bound within a captive portal.  When they 
try to browse to any web pages in a browser (http only) they are redirected
by NoCatAuth to our splash page.  Once they have accepted the terms of service
they are then allowed to access the internet. 

In this way, the splash page is one of our most frequents points of interaction
with the users of the PTP network.

In addition to it's primary funciton it is an opportunity
    - to educate folks about PTP 
    - to acknowledge the node host
    - to ask for donations 
    - to acknowledge donors and contributors

The splash page loads from the router and then the loaded page makes calls
to http://static.personaltelco.net which are the static files from the
[ptp-splash-server repo](https://github.com/personaltelco/ptp-splash-server).  The js files at 'static' then make calls to api.personaltelco.net
which is in the [ptp-api repo](https://github.com/personaltelco/ptp-api).

By keeping the API separate from the router and server logic we hope to allow
folks to easily understand which piece of the puzzle should be worked on at each point.

##  Install and build

````bash
    git clone git@github.com:personaltelco/ptp-splash-page.git
````

### development dependencies

A recent nodejs environment is required.  If you're on Ubuntu 12.04 these instructions will be helpful:

https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager#wiki-ubuntu-mint-elementary-os


### editing the splash page

The splash page is a single page app built using Twitter Bootstrap and 'dust' templates using 'grunt', a nodejs build tool.

Everything that gets loaded to the browser FROM THE ROUTER lives in ./htdocs

The HTML page itself, splash.html is built from a dust template at ./src/dust/splash.dust.html and should be edited
there.

The supporting javascript ptp-splash-page.min.js is built from files in the
./src directory 

to setup the build environment

````bash
    npm install
````

create/edit the file config/config.json based on config.json.example


then run

````
    make
````

which will call 'grunt'.  It will 
   - minifiy and combine the javascript from ./src/  
   - minifiy and combine the css from ./src  
   - build the splash.html from dust templates  
   
These operations are configured in Gruntfile.js

Some of the content is dynamically loaded from the server (as opposed to the router).  

The file config/config.json feeds the dust template to set these variables which are later set in the HTML to be passed to
ptp-splash-server.min.js

    <script>
        var nodeName = 'PTP_NODE_PTP';
        var apibase = 'http://api.personaltelco.net/'; 
    </script>
    <script src="http://static.personaltelco.net/js/ptp-splash-server.min.js"></script>

## Getting it installed on a router and PTP_VARNAME_PTP variables

The ptp-splash-page htdocs directory is consumed as part of the FOOCAB.pl build process of the [ptp-openwrt-files repo](https://github.com/personaltelco/ptp-openwrt-files/)

Specifically these files are placed in the /www directory

The FOOCAB.pl script replaces all PTP_VARNAME_PTP values with information in this file:

https://github.com/personaltelco/openwrt-files/blob/master/nodedb.txt

TODO decide how to integrate the pages here into the ptp-open-wrt repo's www directory

https://github.com/personaltelco/ptp-openwrt-files/tree/master/www

I think it should be a git submodule of a sparse checkout like this:  
https://gist.github.com/johnhunter/3333533


The original requirements, which lays out just a bit of thought around the splashpage

https://personaltelco.net/wiki/NewCaptivePortalFeatures

more on captive portals....  

https://personaltelco.net/wiki/CaptivePortal

tools used:
       Bootstrap - http://getbootstrap.com
       Dust - http://linkedin.github.io/dustjs

