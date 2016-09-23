/**
 * Created by wuliming on 9/20/16.
 * 相关变量:
 * url:设置请求的域名
 *
 */
const url = 'https://api.github.com';

const {query} = require(`${__dir}tools/api`)(url),
    fun = {};
fun.test = () => {
    let data = {
        type:'get',  //默认get;
        par: undefined,    //默认''
        setHeader: {    //设置发起的http请求头部参数,可以到api test里去设置默认值
            Language:'en'
        },
        expect:200, //http状态码预期code,默认无
        send:{
            callback:'foo'
        } //发送的信息，默认undefined
    };
    return query(data);
};

describe('others files: ',() => {
    it('test unit: ', () => fun.test()
        .then(result => {
            result.should.be.ok();
        })
    );
});