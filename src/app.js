const http = require('http')
const chalk = require('chalk')
const path = require('path')

// 2.版本（6.4已抽离至 ./helper/route.js）
const route = require('./helper/route')
// const fs = require('fs')
// const promisity = require('util').promisify;
// const stat = promisity(fs.stat)
// const readdir = promisity(fs.readdir)

const conf = require('./config/defaultConfig')

// 2.版本promise回调改进（6.4）
const server = http.createServer((request, respond) => {
    const filePath = path.join(conf.root, request.url)
    route(request,respond,filePath)
    // 2.版本（6.4已抽离至 ./helper/route.js）
    // try{
    //     const stats = await stat(filePath)
    //     if (stats.isFile()) {
    //         respond.statusCode = 200;
    //         respond.setHeader('Content-Type', 'text/plain')
    //         fs.createReadStream(filePath).pipe(respond)
    //     } else if (stats.isDirectory()) {
    //         fs.readdir(filePath, (err, files) => {
    //             respond.statusCode = 200;
    //             respond.setHeader('Content-Type', 'text/plain')
    //             respond.end(files.join(','))
    //         })
    //     }
    // }catch (e) {
    //     respond.statusCode = 404;
    //     respond.setHeader('Content-Type', 'text/plain')
    //     respond.end(`${filePath} is not a directory or file`)
    // }
})

// 1.版本（6.3）
// const server = http.createServer((request, respond) => {
//     const filePath = path.join(conf.root, request.url)
//
//     fs.stat(filePath, (err, stats) => {
//         if (err) {
//             respond.statusCode = 404;
//             respond.setHeader('Content-Type', 'text/plain')
//             respond.end(`${filePath} is not a directory or file`)
//             return
//         }
//
//         if (stats.isFile()) {
//             respond.statusCode = 200;
//             respond.setHeader('Content-Type', 'text/plain')
//             fs.createReadStream(filePath).pipe(respond)
//         } else if (stats.isDirectory()) {
//             fs.readdir(filePath, (err, files) => {
//                 respond.statusCode = 200;
//                 respond.setHeader('Content-Type', 'text/plain')
//                 respond.end(files.join(','))
//             })
//         }
//     })
// })

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`
    console.info(`Server started at ${chalk.green(addr)}`)
})


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
 */
