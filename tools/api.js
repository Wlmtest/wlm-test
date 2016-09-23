/**
 * Created by wuliming on 8/24/16.
 */
//3dsystem数据库连接
const request = require('supertest');

const generate = url => {
    if (!url) {
        throw 'unexpect error : require url init for superagent or supertest';
    }
    const api = {};
    const req = request(url);
    //现在还没找到合适的办法封装下面的请求，先这么做吧.
    //hint: 不知道怎么搞的，expect报错之后,request崩盘，runner.js会报错: var retry = test.currentRetry();找不到 'currentRetry'
    //然后reject执行后不结束，继续跳出if执行resolve。。。现在让它强制返回.
    api.query = (data,lazy = true) => {
        if (lazy || !data) {
            data.type = data.type || 'get';
            data.setHeader = data.setHeader || {
                    "Content-Type": 'application/json;charset=utf-8',
                    "UserAgent": 'xxxx-pc',
                    "Language": 'zh-cn'
                };
            data.setHeader['Content-Type'] = data.setHeader['Content-Type'] || 'application/json;charset=utf-8';
            data.setHeader['UserAgent'] = data.setHeader['UserAgent'] || 'xxxx-pc';
            data.setHeader['Language'] = data.setHeader['Language'] || 'zh-cn';
            data.send = data.send || undefined;
            data.expect = data.expect || undefined;
            data.par = encodeURI(data.par || '') ;
        }
        console.log('Request Base Url:');
        console.log(url);
        console.log('API Request Data: ');
        console.log(data);
        return new _promise((resolve, reject) => {
            if (data.expect) {
                req[data.type](data.par)
                    .set(data.setHeader)
                    .expect(data.expect)
                    .send(data.send)
                    .end((err, res) => {
                        //错误返回
                        if (err) {
                            return reject(err);
                        }
                        //字符串解析
                        return resolve(res.text);
                    });
            } else {
                req[data.type](data.par)
                    .set(data.setHeader)
                    .send(data.send)
                    .end((err, res) => {
                        //错误返回
                        if (err) {
                            return reject(err);
                        }
                        //字符串解析
                        return resolve({response: res.text, status: res.status});
                    });
            }
        });
    };
    return api;
};

module.exports = generate;