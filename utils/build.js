// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.ASSET_PATH = '/';
const fs = require('fs/promises')
const fs2 = require('fs')
const path = require('path')
const archiver = require('archiver');

const webpack = require('webpack');
const config = require('../webpack.config');

delete config.chromeExtensionBoilerplate;

config.mode = 'production';

webpack(config, async (err, stats) => { // [Stats Object](#stats-object)
  if (err || stats.hasErrors()) {
    console.log(err, 'Virhe')
  }
  // Done processing

  const items = fs.readdir(path.resolve(__dirname, '../build/'))

  const filteredItems = (await items).filter((a) => a !== 'manifest.json');

  (await items).forEach((iName) => {
    fs.copyFile(path.resolve(__dirname, `../build/${iName}`), path.resolve(__dirname, `../packages/chrome/${iName}`))
  })

  filteredItems.forEach((iName) => {
    fs.copyFile(path.resolve(__dirname, `../build/${iName}`), path.resolve(__dirname, `../packages/firefox/${iName}`))
  })

  const output = fs2.createWriteStream(path.resolve(__dirname, '../packages/build/Firefox.zip'));
  const chromeOutput = fs2.createWriteStream(path.resolve(__dirname, '../packages/build/Chrome.zip'));

  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  const chromeArchive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  archive.pipe(output);
  chromeArchive.pipe(chromeOutput);

  archive.directory(path.resolve(__dirname, '../packages/firefox'), false)
  chromeArchive.directory(path.resolve(__dirname, '../packages/chrome'), false)

  archive.finalize()
  chromeArchive.finalize()
});
