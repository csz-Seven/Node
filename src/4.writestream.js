/**
 *  作者:Seven
 *  时间:2018/11/1 16:02
 *  Email:csz.seven@gmail.com
 *  描述:fs.createWriteStream
 */
const fs = require('fs')
const ws = fs.createWriteStream('./test.txt')

const tid = setInterval(() => {
    const num = parseInt(Math.random() * 10);
    console.log(`当前随机数${num}`)

    if (num < 9) {
        ws.write(num + '')
    } else {
        clearInterval(tid)
        ws.end();
    }
}, 200)

ws.on('finish', () => {
    console.log('随机数写入终止')
})
