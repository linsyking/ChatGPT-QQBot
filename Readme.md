# ChatGPT QQ Bot

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

首次启动会生成配置文件，请先修改配置文件中的`group_in`和`group_out`。分别代表输入的群和输出的群。可以一样。

然后再次启动oicq，输入密码/扫描二维码登陆。

接着启动bot。

先在`bot/game.js`中配置你的`sessionToken`。

然后启动：

```bash
./bin/loop.sh
```

如果你要使用代理，则需要在启动bot之前打开代理。

### Dockerfile

TO-DO

## Prompt

你可以在`game.js`中修改初始prompt。可以修改bot名字等等。
