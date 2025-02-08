/*
Logger class for easy and aesthetically pleasing console logging
*/
const chalk = require('chalk');

const Level = {};
Level.ERROR = 'error';
Level.WARN = 'warn';
Level.INFO = 'info';
Level.DEBUG = 'debug';

const LevelMap = {};
LevelMap[Level.ERROR] = 4;
LevelMap[Level.WARN] = 3;
LevelMap[Level.INFO] = 2;
LevelMap[Level.DEBUG] = 1;

let logLevel;
function getTimeStamp(timestamp){
  if(!timestamp) timestamp = Date.now()
  let dateTime = new Date(timestamp)
  return dateTime.toLocaleString('en-US', { timeZone: 'Etc/GMT+5', hour12: false })
}
function getContent(content){
  try{
    if(content?.message) return content.message
    return content
  }catch(e){
    return content
  }
}
function setLevel(level = Level.INFO) {
  if (LevelMap.hasOwnProperty(level)) {
    logLevel = LevelMap[level];
  } else {
    logLevel = LevelMap[Level.INFO];
  }
}
setLevel(Level.INFO);

module.exports.Level = Level;

function log(type, content) {
  if (logLevel <= LevelMap[type]) {

    let timestamp = Date.now()
    let logMsg = getContent(content)
    let prettyTime = getTimeStamp(timestamp)
    switch (type) {
      case Level.ERROR: {
        console.error(`${prettyTime} ${chalk.bgRed(type.toUpperCase())} ${logMsg}`);
        if(logLevel === 1 && content?.message) console.error(content)
        return
      }
      case Level.WARN: {
        console.warn(`${prettyTime} ${chalk.black.bgYellow(type.toUpperCase())} ${logMsg}`);
        if(logLevel === 1 && content?.message) console.warn(content)
        return
      }
      case Level.INFO: {
        console.log(`${prettyTime} ${chalk.bgBlue(type.toUpperCase())} ${logMsg}`);
        if(logLevel === 1 && content?.message) console.error(content)
        return
      }
      case Level.DEBUG: {
        return console.log(`${prettyTime} ${chalk.green(type.toUpperCase())} ${logMsg}`);
      }
      default: throw new TypeError('Logger type must be either error, warn, info/log, or debug.');
    }

  }
};

module.exports.setLevel = setLevel;
module.exports.error = (content) => log(Level.ERROR, content);
module.exports.warn = (content) => log(Level.WARN, content);
module.exports.info = (content) => log(Level.INFO, content);
module.exports.log = (content) => log(Level.INFO, content);
module.exports.debug = (content) => log(Level.DEBUG, content);
//checkLogLevel({log: log, setLevel: setLevel})
