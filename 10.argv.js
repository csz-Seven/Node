/**
 *  作者:Seven
 *  时间:2018/10/31 15:51
 *  Email:csz.seven@gmail.com
 *  描述:argv\argv0\execArgv\execPath
 */

const {argv, argv0, execArgv, execPath} = process;

argv.forEach(item=>{
    console.log(item)
})
