// 引用linebot SDK
var linebot = require("linebot");

// 用於辨識Line Channel的資訊
var bot = linebot({
  channelId: "1660775529",
  channelSecret: "42b8b48ca73997ddc6d86676bcd2de23",
  channelAccessToken:
    "T77SQfWMQpZjEbp+iuBDymRHKtIgro9l6NPs8UVfhgiZiJtBHvX5d51kI/4k9/nCfPRBAXXgP4BFSt6oRVykkZTr4LKk5JN33MwS5NI9r7EtmGeqFigB64wWVBiET+AYFFDXq0m9rKBqRz3WAQ639AdB04t89/1O/w1cDnyilFU=",
});

// 當有人傳送訊息給Bot時
bot.on("message", function (event) {
  // event.message.text是使用者傳給bot的訊息
  // 準備要回傳的內容
  var replyMsg = `cc去吃大便吧!`;
  // 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者
  event
    .reply(replyMsg)
    .then(function (data) {
      console.log("ssfk");

      // 當訊息成功回傳後的處理
    })
    .catch(function (error) {
      console.log("fk");
      // 當訊息回傳失敗後的處理
    });

  if (event.message.type === "image") {
    imgur.serClientId(process.env.IMGUR_CLENT_ID);
    event.message.content().then(function (content) {
      imgur
        .uploadBase64(content.toString("base64"))
        .then((json) => {
          console.log(json.link);
          event.reply(`cc is a pig`);
        })
        .catch((error) => {
          console.error("CC在吃屎中");
          event.reply("CC在吃屎中");
        });
    });
  }
});

// Bot所監聽的webhook路徑與port
bot.listen("/linewebhook", 3000, function () {
  console.log("[BOT已準備就緒]");
});
