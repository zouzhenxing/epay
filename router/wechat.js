var wechat = require('wechat');

exports.wechat = wechat('yuankuorg').text(function (message, req, res, next) {
  if( message.Content == '买' ) {
      res.reply([
        {
            title: '这是一个神奇网站',
            description: '点击进入可以购卖东西',
            url: 'http://115.28.229.151/weweb/index.html'
        }
      ]);
  }
}).image(function (message, req, res, next) {
  res.reply({
    type: "image",
    content: {
        mediaId: message.MediaId
    }
  });
}).voice(function (message, req, res, next) {
  // TODO
}).video(function (message, req, res, next) {
  // TODO
}).location(function (message, req, res, next) {
  // TODO
}).link(function (message, req, res, next) {
  // TODO
}).event(function (message, req, res, next) {
  // TODO
}).device_text(function (message, req, res, next) {
  // TODO
}).device_event(function (message, req, res, next) {
  // TODO
}).middlewarify()