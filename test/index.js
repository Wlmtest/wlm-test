console.log(
    `just have fun !

if you want to run your test unit, please require the files into the index.js :

require(\'test_file_path\')

if you have init all of dependencies, you can run with mocha :

mocha --{options} index.js

`);
require(`../boots/init`);
//就从这里加载各种测试用例吧...我想把gulp干掉了
_rd.readSync(`${__dir}describe/`).map(dir => {
    if (_path.extname(dir) === '.js') {
        require(dir);
    }
});

//这里加others的用例
_rd.readSync(`${__dir}others/`).map(dir => {
    if (_path.extname(dir) === '.js') {
        require(dir);
    }
});
