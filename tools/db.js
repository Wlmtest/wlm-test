//3dsystem数据库连接
const mysql = require('mysql'),
	config = require(`${__dir}config.json`).db;
let cn;

let create = () => new _promise((resolve,reject) => {
		resolve(mysql.createPool(config.yourPool));
});
create().then(conn => cn = conn);

let connect = () => new _promise((resolve,reject) => {
	cn.getConnection((err,connection) => {
		if(err) {
			console.log(err);
			console.log(`retry: set time out 2s: `);
			setTimeout(handerError(),2000);
		}
		resolve(1);
	});
});

//目前就3dsystem,以后要是还有别的，再往里面加.
let query = sql => new _promise((resolve,reject) => {
	cn.query(sql,(err,rows,fields) => {
		console.log(err,rows,fields);
		if (err) {
			reject(err);
		}
		resolve(rows);
	});
});

let close = () => new _promise((resolve,reject) => {
	cn.end(err => {
		if (err) {
			reject(err);
		}
	});
});

let handerError = () => create().then(conn => {
	cn = conn;
	cn.on('error',err => {
		console.log('db error', err);
		// 如果是连接断开，自动重新连接
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			return connect();
		} else {
			throw err;
		}
	});
	return connect();
});
handerError();

module.exports =  {
	connect : connect,
	query : query,
	close : close
};