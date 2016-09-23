/**
 * Created by wuliming on 9/20/16.
 */
const query = _db.query;

const sqls = {};

sqls.getDataBase = () => {
    let sql = `show databases;`;
    return query(sql);
};

module.exports = sqls;