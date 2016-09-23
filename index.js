require(`./boots/init`);
console.log(
    `just have fun !

if you want to run your test unit, please require the files into the index.js :

require(\'test_file_path\')

if you have init all of dependencies, you can run with mocha :

mocha --{options} index.js

`);

require(`${__dir}describe/test`);

