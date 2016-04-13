// By default, babel excludes everything in node_modules.
// The trailer-player needs to be parsed by babel, though.
require('babel-register')();

const hook = require('css-modules-require-hook');
const jsdom = require('jsdom').jsdom;

// .scss files should NOT be parsed, as Babel will not know what to do with them
// and Sass will throw errors because of unavailable imports.
// So we just ignore them entirely.
hook({
  extensions: ['.scss'],
  // Return empty function for processor
  preprocessCss: () => () => {},
});

// Set up dummy DOM and provide `window` and `document.`
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
const exposedProperties = ['window', 'navigator', 'document'];
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

// Set variables and cookies here
global.navigator = {
  userAgent: 'node.js',
  language: 'en-US',
};

// Ignore React warnings
process.env.NODE_ENV = 'production';
