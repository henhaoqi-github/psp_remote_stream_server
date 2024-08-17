const http = require('http');
const httpProxy = require('http-proxy');

// 获取命令行参数
const targetHost = process.argv[2];

// 创建一个代理
const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  autoRewrite: true,
  protocolRewrite: 'https',
});

const server = http.createServer((req, res) => {
  // 清理不必要的头部字段
  req.headers = cleanHeaders(req.headers);

  // 设置user-agent固定为谷歌浏览器的user-agent，防止被当做爬虫
  req.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';

  // 设置accept-language固定为中文，防止被当做爬虫
  req.headers['accept-language'] = 'zh-CN,zh;q=0.9';

  // 设置referer固定为百度，防止被当做爬虫
  req.headers['referer'] = 'https://www.baidu.com/';

  // 拼接目标 URL
  const targetUrl = `${targetHost}`;
  console.log(req.url);

  // 将请求代理到目标 URL
  proxy.web(req, res, { target: targetUrl }, (error) => {
    if (error) {
      console.error('Proxy error:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Something went wrong.');
    }
  });
});

function cleanHeaders(headers) {
  // 只保留一些必要的头部字段，包括 Range
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
