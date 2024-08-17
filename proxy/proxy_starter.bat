@echo off

set NODE_SKIP_PLATFORM_CHECK=1

set /p url=请输入需要代理的网址（需带 http/https）： 

proxy %url%