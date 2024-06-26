'use strict';

import Fontmin from 'fontmin';
import rename from 'gulp-rename';
import fs from 'fs'
import path from 'path';

export function convertFont(inputPath) {
  const ext = path.extname(inputPath);
  if (ext !== '.ttf' && ext !== '.otf') {
    console.error('Invalid file extension. Only .ttf and .otf are supported.');
    return;
  }

  const outputPath = path.dirname(inputPath);
  const fileName = path.basename(inputPath, ext);

  const convertFiles = (input, outputDirectory, deleteTtf = false) => {
    const fontmin = new Fontmin()
      .src(input.contents || input)
      .use(rename((path) => {
        path.basename = fileName
      }))
      .use(Fontmin.ttf2eot())
      .use(Fontmin.ttf2svg())
      .use(Fontmin.ttf2woff2())
      .dest(outputDirectory);

    fontmin.run((err, files) => {
      if (err) {
        console.error('Error during conversion:', err);
        return;
      }
      if (deleteTtf) {
        fs.unlink(input.path, err => { if (err) { console.error('Error during ttf file removal: ', err) }})
      }
      console.log('Fonts converted successfully!');
    });
  }

  if (ext === '.otf') {
    const otfFontmin = new Fontmin()
      .src(inputPath)
      .use(Fontmin.otf2ttf());

    otfFontmin.run((err, files) => {
      if (err) {
        console.error('Error during .otf to .ttf conversion: ', err);
        return;
      }
      files.forEach(file => {
        convertFiles(file, outputPath, true);
      });
    });
  } else {
    convertFiles(inputPath, outputPath);
  }

}
