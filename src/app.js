const http = require('http')
const chalk = require('chalk')
const path = require('path')

// 2.版本（6.4已抽离至 ./helper/route.js）
const route = require('./helper/route')
const conf = require('./config/defaultConfig')
const openUrl = require('./helper/openUrl')

class Server {
    constructor(config) {
        // Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
        // Object.assign(target, ...sources)
        this.conf = Object.assign({}, conf, config)
    }

    start() {
        // 2.版本promise回调改进（6.4）
        const server = http.createServer((request, respond) => {
            const filePath = path.join(this.conf.root, request.url)
            route(request, respond, filePath, this.conf)
        })

        server.listen(this.conf.port, this.conf.hostname, () => {
            const addr = `http://${this.conf.hostname}:${this.conf.port}`
            console.info(`Server started at ${chalk.green(addr)}`)
            openUrl(addr)
        })
    }
}

module.exports = Server;

/**
 * 6.1
 * 6.2
 * 6.3
 * 6.4
 *
 * 6.5
 * 6.6
 * 6.7
 * 6.8
 * 6.9
 * 6.10
 */
