// 引入node自带的gzip、deflate压缩
const {createGzip, createDeflate} = require('zlib')
const chalk = require('chalk')

module.exports = (rs, req, res) => {
    const acceptEncoding = req.headers['accept-encoding'];
    if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
        return rs
    } else if (acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding', 'gzip');
        console.log(`${chalk.green('进入Gzip压缩')}`)
        return rs.pipe(createGzip())
    } else if (acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate');
        return rs.pipe(createDeflate())
    }
}
