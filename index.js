'use strict';

// Load Babel
require('babel-core/register');
require("babel-polyfill");

// Load ENV
if(
  !process.NODE_ENV ||
  process.NODE_ENV === 'development'
) {
  require('dotenv').config();
}

// Load Server
require('./app');