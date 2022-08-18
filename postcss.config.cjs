module.exports = {
  // postcss.config.js
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75;
      },
      propList: ['*'], // 需要做转化处理的属性，如`hight`、`width`、`margin`等，这里设置为['*']全部，假设需要仅对边框进行设置
    },
  },
};
