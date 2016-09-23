/**
 * Created by wuliming on 9/20/16.
 */
const query = _db.query;

const sqls = {};

sqls.getDataBase = () => {
    let sql = `show variables like 'wait_timeout'`;
    return query(sql);
};

module.exports = sqls;