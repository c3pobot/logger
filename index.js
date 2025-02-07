/*
Logger class for easy and aesthetically pleasing console logging
*/
//const checkLogLevel = require('./checkLogLevel')
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
function getContent(msg){
  try{
    if(!msg?.message || logLevel = 1) return msg
    if(msg?.message) return msg.message
    return msg    
  }catch(e){
    return msg
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

function log(type, message) {
  if (logLevel <= LevelMap[type]) {
    let timestamp = Date.now()
    let content = getContent(message)
    let prettyTime = getTimeStamp(timestamp)
    switch (type) {
      case Level.ERROR: {
        return console.error(`${prettyTime} ${chalk.bgRed(type.toUpperCase())} ${content}`);
      }
      case Level.WARN: {
        return console.warn(`${prettyTime} ${chalk.black.bgYellow(type.toUpperCase())} ${content}`);
      }
      case Level.INFO: {
        return console.log(`${prettyTime} ${chalk.bgBlue(type.toUpperCase())} ${content}`);
      }
      case Level.DEBUG: {
        return console.log(`${prettyTime} ${chalk.green(type.toUpperCase())} ${content}`);
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
