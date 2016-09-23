/**
 * Created by wuliming on 9/2/16.
 */
const SparkMD5 = require('spark-md5');
const output = {};
output.storeFile = './samples/modelsList.json'; //可以外部引入，或自己写死
output.dataList = null; //获取存入的md5数据列表

output.getList = () => new _promise((resolve,reject) => {
    if (output.dataList == null) {
        _fs.exists(output.storeFile, exist => {
            if (exist) {
                _fs.readFile(output.storeFile,'utf8',(err, data) => {
                    if (err) {
                        console.log('error reading modelList: ');
                        reject(err);
                    }
                    data = data || '[]';
                    output.dataList = _json5.parse(data);
                    console.log(output.dataList);
                    resolve(_json5.parse(data));
                });
            } else {
                _fs.writeFile(output.storeFile, '[]', err => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    output.dataList = [];
                    resolve([]);
                });
            }
        });
    } else {
        resolve(output.dataList);
    }
});

output.getInfo = (fileDir,tagName,modelList = output.dataList) => {
    for(let key in modelList) {
        if (modelList[key].tagName == tagName) {
            console.log('have marked model');
            console.log(modelList[key]);
            return _promise.resolve(modelList[key]);
        }
    }
    console.log(`to caculate model md5,tagName: ${tagName}`);
    return _promise.resolve(output.anaylsis(fileDir,tagName));
};
output.anaylsis = (fileDir,tagName) => new _promise((resolve,reject) => {
    let slice, size = 0
        ,format = fileDir.substring(fileDir.lastIndexOf('.')).substring(1);
    const spark = new SparkMD5.ArrayBuffer(),
        readStream =_fs.createReadStream(fileDir),
        chunkSize = 1024 * 1024 * 2, maxBuffer = 1024 * 64;

    readStream.on('data',chunk => {
        console.log("读取数据：");
        slice = slice || chunk;
        slice = Buffer.concat([slice, chunk]); //每2M进行一次计算.倍减spark调用次数32
        if (slice.length == chunkSize || chunk.length < maxBuffer) {
            spark.append(slice);
            slice = null;
        }
        size += chunk.length;
    });
    readStream.on('end',() => {
        console.log('complete');
        let modelInfo = {"md5":spark.end(), "size":size, "fileDir":fileDir, "tagName":tagName, "format":format};
        output.store(modelInfo).then(
            () => resolve(modelInfo)
        );
    });
    readStream.on('error',err => {
        if (err) {
            console.log('error : ');
            console.log(err);
            reject(err);
        }
    });
});
output.store = val => {
    console.log(output.dataList);
    output.dataList.push(val);
    return new _promise((resolve,reject) => {
       _fs.writeFile(output.storeFile,_json5.stringify(output.dataList),(err) => {
            if (err) {
                console.log('can\' not replace the modelsList info');
                reject(err);
            }
            resolve(1);
        });
    });
};

module.exports = output;