# PSP Remote Stream Server

一个用于远程流式传输PSP游戏资源至PPSSPP的服务器项目。

## 功能介绍

本项目包含两个主要组件：

1. **Node.js服务器端应用**：此部分负责将下载好的ISO文件托管于服务器上，供PPSSPP进行远程流式传输。请将ISO文件放置于`iso`文件夹内。

2. **本地代理Node.js服务器**：此部分适用于使用在线IDE环境搭建服务的情况（如腾讯cloud-studio、CSDN Inscode等），它能够将在线IDE提供的调试网页代理至本地，以便PPSSPP可以使用远程游戏串流功能（注意：PPSSPP的远程流式传输功能仅支持通过IP地址访问）。


## 安装与配置

### 服务器端设置

1. 确保您的服务器环境已安装Node.js。

2. 将下载的ISO文件放置于服务器的`iso`文件夹内。

3. 安装项目依赖：在项目根目录下运行`npm install express`。

4. 启动服务器：执行`node server.js`。


### 本地代理设置

1. 在本地环境安装Node.js。（或下载打包好的EXE文件，配合提供的批处理文件使用）

2. 安装项目依赖：在项目根目录下运行`npm install http-proxy`。

3. 启动本地代理服务器：执行`node proxy.js`。


## 使用说明

1. 确保PPSSPP设备与本地代理服务器（如果有）处于同一网络环境。

2. 在PPSSPP中设置远程流式传输服务器地址（仅支持通过IP），浏览并选择相应的ISO文件进行游戏。

---


# PSP Remote Stream Server

A server project designed for remote streaming of PSP game resources to PPSSPP.

## Features

This project consists of two main components:

1. **Node.js Server Application**: This part is responsible for hosting the downloaded ISO files on the server, allowing for remote streaming to PPSSPP. Place ISO files in the `iso` folder.

2. **Local Proxy Node.js Server**: This is suitable for scenarios where an online IDE environment is used to set up services (such as Tencent cloud-studio, CSDN Inscode, etc.). It can proxy the debugging web pages provided by the online IDE to the local environment, enabling PPSSPP to use the remote game streaming feature (Note: PPSSPP's remote streaming feature only supports access via IP address).

## Installation and Configuration

### Server-Side Setup

1. Ensure Node.js is installed on your server environment.

2. Place the downloaded ISO files in the `iso` folder on the server.

3. Install project dependencies: Run `npm install express` in the project root directory.


4. Start the server: Execute `node server.js`.


### Local Proxy Setup

1. Install Node.js on your local environment. (Alternatively, download the packaged EXE file and use the provided batch file.)

2. Install project dependencies: Run `npm install http-proxy` in the project root directory.

3. Start the local proxy server: Execute `node proxy.js`.

## Usage Instructions

1. Ensure the PPSSPP device and the local proxy server (if used) are on the same network.

2. In PPSSPP, set the remote streaming server address (only supports access via IP), browse and select the corresponding ISO file to start the game.