'use strict';
const Fontmin = require('fontmin');
const fs = require('fs');
const path = require('path');

function convertFont(inputPath) {
  const ext = path.extname(inputPath);
  if (ext !== '.ttf' && ext !== '.otf') {
    console.error('Invalid file extension. Only .ttf and .otf are supported.');
    return;
  }

  const outputPath = path.dirname(inputPath);
  const fileName = path.basename(inputPath, ext);

  const fontmin = new Fontmin()
    .src(inputPath)
    .use(Fontmin.ttf2eot())
    .use(Fontmin.ttf2svg())
    .use(Fontmin.ttf2woff2())
    .dest(outputPath);

  fontmin.run((err, files) => {
    if (err) {
      console.error('Error during conversion:', err);
      return;
    }

    files.forEach((file) => {
      const outputFilePath = path.join(outputPath, `${fileName}${path.extname(file.path)}`);
      fs.writeFileSync(outputFilePath, file.contents);
    });

    console.log('Fonts converted successfully!');
  });
}

module.exports = convertFont;
