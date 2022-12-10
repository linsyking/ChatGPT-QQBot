"use strict";
const path = require("path");
const fs = require("fs");
const os = require("os");
const crypto = require("crypto");
const oicq = require("oicq");
const filter = require("oicq/http-api/filter");
const api = require("oicq/http-api/api");
const transNotice = require("oicq/http-api/cq-notice");
const amqp = require('amqplib/callback_api');

// Configure your group

let group_in;
let group_out;

/**
 * @type {oicq.ConfBot}
 */
const config = {};

/**
 * @type {oicq.Client}
 */
let bot;


let account = 0, passdir = "", wsrCreated = false;

function send_mq(msg) {
    amqp.connect('amqp://127.0.0.1', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'qq';

            channel.assertQueue(queue, {
                durable: false
            });

            channel.sendToQueue(queue, Buffer.from(msg));
            console.log("Sent", msg);

        });
    });
}

function init_receiver() {
    amqp.connect('amqp://127.0.0.1', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'qqsend';
            channel.assertQueue(queue, {
                durable: false
            });

            channel.consume(queue, function (msg) {
                console.log("Received", msg.content.toString());
                bot.sendGroupMsg(group_out, msg.content.toString());
            }, {
                noAck: true
            });

        });
    });
}

/**
 * 启动
 * arg1: account id
 * arg2: config
 * arg3: group in
 * arg4: group out
 */
function startup(arg1, arg2, arg3, arg4) {
    init_receiver();
    group_in = arg3;
    group_out = arg4;
    account = arg1;
    Object.assign(config, arg2);
    config.data_dir = path.join(os.homedir(), ".oicq");
    passdir = path.join(os.homedir(), ".oicq", String(account));
    console.log("已加载配置文件：", config);
    filter.init(config.event_filter);
    createBot();
    // createServer();
    setTimeout(botLogin, 500);
}

/**
 * 输入密码
 */
function inputPassword() {
    console.log("请输入密码(扫码登录直接按回车)：");
    process.stdin.once("data", (input) => {
        input = input.toString().trim();
        if (!input.length) {
            fs.writeFileSync(path.join(passdir, "password"), "", { mode: 0o600 });
            return bot.login();
        }
        const password = crypto.createHash("md5").update(input).digest();
        fs.writeFileSync(path.join(passdir, "password"), password, { mode: 0o600 });
        bot.login(password);
    })
}

function botLogin() {
    const filepath = path.join(passdir, "password");
    try {
        const password = fs.readFileSync(filepath);
        bot.login(password.length ? password : null);
    } catch {
        inputPassword();
    }
}

/**
 * 创建bot
 */
function createBot() {
    bot = oicq.createClient(account, config);
    api.setBot(bot, config.rate_limit_interval);
    bot.on("system.login.slider", () => {
        process.stdin.once("data", (input) => {
            input = String(input).trim().replace("ticket:", "").trim().replace(/"/g, "");
            bot.sliderLogin(input);
        });
    });
    bot.on("system.login.qrcode", () => {
        bot.logger.mark("扫码完成后回车登录。");
        process.stdin.once("data", () => {
            bot.login();
        });
    });
    bot.on("system.login.device", () => {
        bot.logger.mark("验证完成后回车登录。");
        process.stdin.once("data", () => {
            bot.login();
        });
    });
    bot.on("system.login.error", (data) => {
        if (data.code === -2)
            return bot.login();
        if (data.message.includes("密码错误"))
            inputPassword();
        else
            bot.terminate();
    });

    bot.on("system.online", () => {
        console.log("登录成功");
    });

    bot.on("notice", (data) => {
        if (config.use_cqhttp_notice)
            transNotice(data);
    });
    bot.on("message", (data) => {
        if (config.post_message_format === "string")
            data.message = data.raw_message;
        if (data.group_id && data.group_id == group_in) {
            // Send to rabbit mq
            console.log(data.message)
            var msg_string = ""
            if (data.message[0]["type"] === "text") {
                msg_string = data.message[0]["data"]["text"]
            } else if (data.message[0]["type"] === "at" && data.message[1]["type"] === "text") {
                // at someone
                msg_string = data.message[0]["data"]["text"] + "，" + data.message[1]["data"]["text"]
            } else {
                console.log(data.message[0]["type"], "is not text")
                return;
            }
            var real_sq = data.sender["nickname"] + "：" + msg_string;
            send_mq(real_sq)

        }
    });
}

module.exports = startup;
