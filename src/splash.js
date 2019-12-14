import $ from 'jquery';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faBan, faBug, faDollarSign, faEnvelope, faKeyboard,
  faSitemap, faStar, faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

require('bootstrap/js/src/collapse.js');
require('bootstrap/js/src/carousel.js');
require('bootstrap/js/src/scrollspy.js');
require('bootstrap/js/src/util.js');

// Load server-side assets
const { pageConf } = window;
window.$ = $;
window.smoothScrolling = () => {};

if (!document.getElementById('serverJs')) {
  const body = document.getElementsByTagName('body')[0];
  const script = document.createElement('script');
  script.id = 'serverJs';
  script.src = `${pageConf.staticbaseurl}/js/ptp-splash-server.min.js`;
  body.appendChild(script);
}

if (!document.getElementById('serverCss')) {
  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.id = 'serverCss';
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = `${pageConf.staticbaseurl}/css/ptp-splash-server.min.css`;
  link.media = 'all';
  head.appendChild(link);
}

// Enable required font-awesome glyphs
library.add(
  faGithub, faTwitter,
  faBan, faBug, faDollarSign, faEnvelope, faKeyboard,
  faSitemap, faStar, faQuestionCircle,
);
dom.watch();

// Enable custom behaviors after page is loaded
document.addEventListener('DOMContentLoaded', () => {
  $('#staticworks').text(
    `Dynamic content successfully loaded from ${pageConf.staticserver}`,
  );
  $('#statusSidebarWords').text('connected');
  $('#statusSidebarWords').addClass('text-success');
  $('#statusSidebarIcons').html('<i class="fa fa-sitemap text-success"></i>');

  // donors can opt out of public acknowledgement
  // by clicking on the checkbox in the donors section
  // we manipulate some variables which are eventually
  // consumed by the donor polling tools that back
  // http://api.personaltelco.net/api/v0/donors
  $('#optoutpublic').click(() => {
    if ($('#optoutpublic').is(':checked')) {
      $('#item_number').val(`splash2014_opt_out_${pageConf.node}`);
      $('#item_name').val('Personal Telco Project - Anonymous Donation');
    } else {
      $('#item_number').val(`splash2014_${pageConf.node}`);
      $('#item_name').val('Personal Telco Project - Donation');
    }
  });

  // Improve navbar behavior
  $('.navbar a').on('click', () => {
    $('.collapse').collapse('hide');
  });
});
