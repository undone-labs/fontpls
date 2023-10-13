#!/usr/bin/env node
'use strict';

import { convertFont } from './converter.js';
import path from 'path';

const inputPath = process.argv[2];

if (!inputPath) {
  console.error('Provide a path to a font file.');
  process.exit(1);
}

const absoluteInputPath = path.resolve(inputPath);
convertFont(absoluteInputPath);
