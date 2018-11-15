const fs = require('fs')
const promisity = require('util').promisify;
const stat = promisity(fs.stat)
const readdir = promisity(fs.readdir)

module.exports = async function (request, respond, filePath) {
    try {
        const stats = await stat(filePath)
        if (stats.isFile()) {
            respond.statusCode = 200;
            respond.setHeader('Content-Type', 'text/plain')
            fs.createReadStream(filePath).pipe(respond)
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath)

            respond.statusCode = 200;
            respond.setHeader('Content-Type', 'text/plain')
            respond.end(files.join(','))
        }
    } catch (e) {
        respond.statusCode = 404;
        respond.setHeader('Content-Type', 'text/plain')
        respond.end(`${filePath} is not a directory or file`)
    }
}
