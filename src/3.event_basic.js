/**
 *  作者:Seven
 *  时间:2018/11/1 14:59
 *  Email:csz.seven@gmail.com
 *  描述:events.on
 */
const eventEmitter = require('events');

class customEvent extends eventEmitter {

}

const ce = new customEvent();

ce.on('test', () => {
    console.log('触发test事件:customEvent test')
})

setInterval(() => {
    ce.emit('test')
}, 1000)
