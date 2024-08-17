const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os'); // ����osģ��
const app = express();
const port = 3000;

// ���þ�̬�ļ�Ŀ¼
app.use(express.static(path.join(__dirname, 'iso')));
console.log(path.join(__dirname, 'iso'));

// ��ȡĿ¼�µ������ļ�
function getFilesInDirectory(directory) {
    try {
        return fs.readdirSync(directory);
    } catch (err) {
        console.error('Unable to scan directory:', err);
        return [];
    }
}

// ������ҳ·�ɣ��г�����ISO�ļ������ڿ�ͷ���һ����ʾ��ǰĿ¼������
app.get('/', (req, res) => {
    const directoryPath = path.join(__dirname, 'iso'); // ȷ������ָ����ȷ��Ŀ¼
    const files = getFilesInDirectory(directoryPath);

    // �����ļ����ӵĴ��ı��б���ͷ���һ����ʾ��ǰĿ¼������
    let filesList = '/\n'; // ʹ�� os.EOL ��Ϊ���з�
    files.forEach(file => {
        filesList += `/${encodeURIComponent(file)}\n`; // ÿ���ļ�����Ҳ��� \n
    });

    // ������ӦͷΪ���ı�����
    res.setHeader('Content-Type', 'text/plain');
    
    // ���ʹ��ı��ļ��б�
    res.send(filesList);
});

// ����
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
