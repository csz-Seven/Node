const {cache} = require('../config/defaultConfig');

function refreshRes(stats, res) {
    const {maxAge, expires, cacheControl, lastModified, etag} = cache

    if (expires) {
        res.setHeader('Expires', (new Date(Date.now() + maxAge * 1000)).toUTCString())
    }

    if (cacheControl) {
        res.setHeader('Cache-Control', `public, max-age=${maxAge}`)
    }

    if (lastModified) {
        res.setHeader('Last-Modified', stats.mtime.toUTCString())
    }

    if (etag) {
        res.setHeader('ETag', `${stats.size}-${stats.mtime}`)
    }
}

module.exports = function isFresh(stats, req, res) {
    refreshRes(stats, res)

    const lastModified = req.headers['if-modified-since'];
    const etag = req.headers['if-none-match']

    if (!lastModified && !etag) {
        return false
    }

    if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
        return false
    }

    if (etag && etag !== res.getHeader('ETag')) {
        return false
    }

    return true;
}

/**
 *  作者:Seven
 *  时间:2018/11/16 17:56
 *  Email:csz.seven@gmail.com
 *  描述:缓存Headers
 *  Expires(旧),Cache-Control
 *  If-Modified-Since/ Last-Modified
 *  If-None-Match/ ETag
 */
