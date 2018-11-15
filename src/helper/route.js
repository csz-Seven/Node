const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const promisity = require('util').promisify;
const stat = promisity(fs.stat)
const readdir = promisity(fs.readdir)
const config = require('../config/defaultConfig')

const tplPath = path.join(__dirname, '../template/dir.html')
const source = fs.readFileSync(tplPath)
// const source = fs.readFileSync(tplPath,'utf-8')

const template = Handlebars.compile(source.toString())
// const source =fs.readFileSync('../template/dir.html')

const mime = require('./mime')

module.exports = async function (request, respond, filePath) {
    try {
        const stats = await stat(filePath)
        if (stats.isFile()) {
            const contentType = mime(filePath)

            respond.statusCode = 200;
                respond.setHeader('Content-Type', contentType + ';charset=utf-8')
            // respond.setHeader('Content-Type', 'text/plain')
            fs.createReadStream(filePath).pipe(respond)
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath)

            respond.statusCode = 200;
            respond.setHeader('Content-Type', 'text/html')
            const dir = path.relative(config.root, filePath)
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files: files.map(file => {
                    return {
                        file,
                        icon: mime(file)
                    }
                })

            }

            // console.log(data)
            respond.end(template(data))
            // respond.end(files.join(','))
        }
    } catch (e) {
        respond.statusCode = 404;
        respond.setHeader('Content-Type', 'text/plain')
        respond.end(`${filePath} is not a directory or file`)
    }
}
