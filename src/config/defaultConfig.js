module.exports = {
    hostname: '127.0.0.1',
    port: 7777,
    root:process.cwd(), // 方法返回 Node.js 进程当前工作的目录。
    // root:'/Users/laigongqi/SevenProjects/Node'
    compress: /\.(html|js|css|md)/  // 支持的压缩正则
}
