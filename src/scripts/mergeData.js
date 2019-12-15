const childProcess = require('child_process')
const fs = require('fs')

const runScript = (scriptPath, callback)  => {
    let invoked = false;
    const process = childProcess.fork(scriptPath);

 
    process.on('error',  (err) => {
        if (invoked) return;
        invoked = true;
        callback(err);
    });
    process.on('exit',  (code) => {
        if (invoked) return;
        invoked = true;
        const err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}

const onEnd =  (err) => {
    if (err) throw err;
}


runScript('./parseAppleStoreData.js', onEnd );
runScript('./parseGooglePlayData.js', onEnd );

const androidData = require('./outAndroid.json')
const iosData = require('./outIOS.json')

const writeToJSON = () => {

    const out = mergeData()
    fs.writeFile('out.json', JSON.stringify(out, null, 1), err => {
      if (err) {
        console.log('Error writing file', err)
      } else {
        console.log('Successfully wrote file')
      }
    })
  }

  const mergeData = () => {
    const out = []
    const maxLength = androidData.length > iosData.length ? androidData.length: iosData.length
    for(let i = 0; i < maxLength; i++) {
        androidData[i] && out.push(androidData[i])
        iosData[i] && out.push(iosData[i])
    }
    return out
  }

  writeToJSON()