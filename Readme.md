# ChatGPT QQ (Group) Bot

[![asciicast](https://asciinema.org/a/Bajz7vUR6IQXlVQHdKBlu7231.svg)](https://asciinema.org/a/Bajz7vUR6IQXlVQHdKBlu7231)

## Getting Started

### 自搭环境

先安装：

- RabbitMQ
- pnpm

在本地启动RabbitMQ服务，用默认端口。

克隆本仓库并初始化：

```bash
git clone https://github.com/linsyking/ChatGPT-QQBot
cd ChatGPT-QQBot
pnpm install
```

然后启动oicq：

```bash
./bin/oicq.cjs <qq id>
```

首次启动会生成配置文件。

然后再次启动oicq，输入密码/扫描二维码登陆（推荐用二维码，如果不行可以换）。

接着启动bot。

先将`bot/config.sample.js`复制一份到`bot/config.js`，并配置你的`sessionToken`，还有你的输入输出。

输入输出支持群聊/私人聊天。类型分别是`group`和`private`。

然后启动：

```bash
./bin/loop.sh
```

如果你要使用代理，则需要在启动bot之前打开代理。

### Dockerfile

TO-DO

## Plugins

你可以开发自己的插件，放在`./bot/plugins/`中。`chat.js`是一个示例插件。

## 效果展示

（使用`chat.js`插件，它会知道聊天用户的名字）

![log1](https://user-images.githubusercontent.com/49303317/206824539-8175b40f-66ec-4a62-93b4-cdeab1d62bf5.jpeg)

![log2](https://user-images.githubusercontent.com/49303317/206824536-8666e406-3172-419c-8029-4e3f1f72e19f.jpeg)
