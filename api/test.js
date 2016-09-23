/**
 * Created by wuliming on 9/20/16.
 */
const url = 'https://api.github.com';

const api = {},
    {query} = require(`${__dir}tools/api`)(url);

api.test = () => {
    return query();
};

module.exports = api;