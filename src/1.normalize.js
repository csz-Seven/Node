/**
 *  作者:Seven
 *  时间:2018/10/31 16:09
 *  Email:csz.seven@gmail.com
 *  描述:修复路径path.normalize
 */
const {normalize} = require('path')
console.log(normalize('/Users/laigongqi/SevenProjects///Node'))
///Users/laigongqi/SevenProjects///Node 自动修复为/Users/laigongqi/SevenProjects/Node
