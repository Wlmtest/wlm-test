/**
 * Created by wuliming on 9/20/16.
 */
describe('test expamle', () => {
    let q_api,q_db;

    before('before all of mocha tests run, do something:',() => {
        q_api = require(`${__dir}api/test`);
        q_db = require(`${__dir}db/test`);
    });

    context('the sub-describe ,rename as context: ',() => {
        let i = 0;
        it('test unit 1,base unit test: ',function () {
            this.retries(4);
            this.timeout(0);
            [].should.be.empty();
            console.log(`retries times: ${i++}`);
            [Math.random(),Math.random(),Math.random(),Math.random()].map(val => {
                console.log(val);
                val.should.be.Number();
                (val < .5).should.be.true();
            });
        });
    });

    context('the sub-describe ,rename as context: ',() => {
        it('test unit 2: ',function () {
            this.timeout(0);
            return q_api.test().then(result => {
                console.log(result);
                result.should.not.be.empty();
            });
        });
    });

    context('the sub-describe ,rename as context: ',() => {
        it('test unit 3 local databse show: ',() => {
            return q_db.getDataBase().then(result => {
                console.log(result);
                result.should.not.be.empty();
            });
        });
    });

    after('before all of mocha tests run, do something:',() => {

    });
});