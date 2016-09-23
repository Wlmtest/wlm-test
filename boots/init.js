/*常量*/
global.__dir      = `${process.env.PWD}/`;

/*模块*/
global.should = require('should');
global._promise = require('promise');
global._cheerio = require('cheerio');
global._url = require('url');
global._fs = require('fs');
global._prettyjson = require('prettyjson');
global._json5 = require('json5');
global._ = require('lodash');

/*扩展模块*/
global._db = require(`${__dir}tools/db`);

/*方法*/
global.render = obj => _prettyjson.render(obj,{
	keysColor: 'green',
	dashColor: 'magenta',
	stringColor: 'white'
});

console.log('init global variables complete !');
