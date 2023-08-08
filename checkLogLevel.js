'use strict'
let log, setLevel
const fetch = require('node-fetch')
const BOT_SVC = process.env.BOT_SVC || 'bot:3000'
const SET_NAME = process.env.SET_NAME
let LOG_LEVEL = process.env.LOG_LEVEL || 'info'

const parseResponse = async(res)=>{
  try{
    if(!res) return
    if (res.status?.toString().startsWith('5')) {
      throw('Bad status code '+res.status)
    }
    let body
    if (res.headers?.get('Content-Type')?.includes('application/json')) {
      body = await res?.json()
    } else {
      body = await res?.text()
    }
    if(!body && res?.status === 204) body = res.status

    return body
  }catch(e){
    throw(e);
  }
}
const getLogLevel = async()=>{
  try{
    let res = await fetch(`http://${BOT_SVC}/logLevel`, { method: 'POST', timeout: 10000, compress: true, headers: {'Content-Type': 'application/json'}, body: JSON.stringify({setName: SET_NAME}) })
    return await parseResponse(res)
  }catch(e){
    return
  }
}
const sync = async()=>{
  try{
    let res = await getLogLevel()
    if(res?.logLevel && res?.logLevel !== LOG_LEVEL){
      LOG_LEVEL = res.logLevel
      setLevel(LOG_LEVEL)
      log('info', `Set log level to ${LOG_LEVEL}`)
    }
    setTimeout(sync, 10000)
  }catch(e){
    log('error', e)
    setTimeout(sync, 5000)
  }
}
module.exports = (opts = {}) =>{
  try{
    log = opts.log
    setLevel = opts.setLevel
    if(SET_NAME) sync()
  }catch(e){
    opts.log.error('error', e)
  }
}
