const http = require('http');
const httpProxy = require('http-proxy');

// ��ȡ�����в���
const targetHost = process.argv[2];

// ����һ������
const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  autoRewrite: true,
  protocolRewrite: 'https',
});

const server = http.createServer((req, res) => {
  // ������Ҫ��ͷ���ֶ�
  req.headers = cleanHeaders(req.headers);

  // ����user-agent�̶�Ϊ�ȸ��������user-agent����ֹ����������
  req.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';

  // ����accept-language�̶�Ϊ���ģ���ֹ����������
  req.headers['accept-language'] = 'zh-CN,zh;q=0.9';

  // ����referer�̶�Ϊ�ٶȣ���ֹ����������
  req.headers['referer'] = 'https://www.baidu.com/';

  // ƴ��Ŀ�� URL
  const targetUrl = `${targetHost}`;
  console.log(req.url);

  // ���������Ŀ�� URL
  proxy.web(req, res, { target: targetUrl }, (error) => {
    if (error) {
      console.error('Proxy error:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Something went wrong.');
    }
  });
});

function cleanHeaders(headers) {
  // ֻ����һЩ��Ҫ��ͷ���ֶΣ����� Range
  const allowedHeaders = ['host', 'accept', 'accept-encoding', 'range'];
  const cleanedHeaders = {};
  for (const key of allowedHeaders) {
    if (headers[key]) {
      cleanedHeaders[key] = headers[key];
    }
  }
  return cleanedHeaders;
}

server.listen(3000, () => {
  console.log(`Proxy server is running on http://127.0.0.1:3000, proxying to ${targetHost}`);
});
