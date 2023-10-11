#!/usr/bin/env node
'use strict';
const convertFont = require('./converter');
const path = require('path');

const inputPath = process.argv[2];

if (!inputPath) {
  console.error('Provide a path to a font file.');
  process.exit(1);
}

const absoluteInputPath = path.resolve(inputPath);
convertFont(absoluteInputPath);
