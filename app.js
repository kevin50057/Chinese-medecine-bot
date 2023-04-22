// 引用linebot SDK
var linebot = require("linebot");

var axios = require("axios");

const { ImgurClient } = require("imgur");

const IMGUR_CLENT_ID = "5137f102a1ef894";

const IMGUR_CLIENT_SECRET = "9cd5e9dac1815e160e07675c8b8f443c8fb61ca6";

const REFRESH_TOKEN = "f57d2e0ee75e88c6a4a2d23e8e450348ec65d34d";

const IMGUR_ALBUM_ID = "rcAu8jg";

// 用於辨識Line Channel的資訊
const bot = linebot({
  channelId: "1660775529",
  channelSecret: "42b8b48ca73997ddc6d86676bcd2de23",
  channelAccessToken:
    "T77SQfWMQpZjEbp+iuBDymRHKtIgro9l6NPs8UVfhgiZiJtBHvX5d51kI/4k9/nCfPRBAXXgP4BFSt6oRVykkZTr4LKk5JN33MwS5NI9r7EtmGeqFigB64wWVBiET+AYFFDXq0m9rKBqRz3WAQ639AdB04t89/1O/w1cDnyilFU=",
});

const imgur = new ImgurClient({
  clientId: IMGUR_CLENT_ID,
  cliemtSecret: IMGUR_CLIENT_SECRET,
  refreshToken: REFRESH_TOKEN,
});

// 當有人傳送訊息給Bot時
bot.on("message", async (event) => {
  console.log(event.message);
  if (event.message.type === "text") {
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
  }
  if (event.message.type === "image") {
    // imgur.setClientId(IMGUR_CLENT_ID);

    event.message.content().then(async (content) => {
      const url = await uploadimage(content.toString("base64"));
      console.log(url);
      event
        .reply(url)
        .then(function (data) {
          console.log("ssfk");

          // 當訊息成功回傳後的處理
        })
        .catch(function (error) {
          console.log("fk");
          // 當訊息回傳失敗後的處理
        });
    });
  }
});

// Bot所監聽的webhook路徑與port
bot.listen("/linewebhook", 3000, function () {
  console.log("[BOT已準備就緒]");
});

async function uploadimage(base64) {
  var axios = require("axios");
  var FormData = require("form-data");
  var data = new FormData();
  data.append("image", base64);

  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.imgur.com/3/image",
    headers: {
      Authorization: `Client-ID ${IMGUR_CLENT_ID}`,
      ...data.getHeaders(),
    },
    data: data,
  };

  return axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return response.data.data.link;
    })
    .catch(function (error) {
      console.log(error);
    });
}
