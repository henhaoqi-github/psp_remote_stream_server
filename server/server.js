const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os'); // 引入os模块
const app = express();
const port = 3000;

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'iso')));
console.log(path.join(__dirname, 'iso'));

// 读取目录下的所有文件
function getFilesInDirectory(directory) {
    try {
        return fs.readdirSync(directory);
    } catch (err) {
        console.error('Unable to scan directory:', err);
        return [];
    }
}

// 创建主页路由，列出所有ISO文件，并在开头添加一个表示当前目录的链接
app.get('/', (req, res) => {
    const directoryPath = path.join(__dirname, 'iso'); // 确保这里指向正确的目录
    const files = getFilesInDirectory(directoryPath);

    // 构建文件链接的纯文本列表，开头添加一个表示当前目录的链接
    let filesList = '/\n'; // 使用 os.EOL 作为换行符
    files.forEach(file => {
        filesList += `/${encodeURIComponent(file)}\n`; // 每个文件名后也添加 \n
    });

    // 设置响应头为纯文本类型
    res.setHeader('Content-Type', 'text/plain');
    
    // 发送纯文本文件列表
    res.send(filesList);
});

// 启动
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
