'use strict'
const fs = require('fs-extra');
const path = require('path')
let app = require('../build/webpack.base.conf').entry.app;
let currentSpa= app.substring(app.lastIndexOf('/')+1);

// console.log(currentSpa);

const targetDir = `F:\\ws_space\\QingBlog\\QingBlogBackend\\static\\${currentSpa}`;
console.log(`copying dist/${currentSpa} to ${targetDir}`);
fs.removeSync(targetDir);
fs.copySync(path.resolve(`dist/${currentSpa}`), targetDir);
console.log('copy complete !!!');
