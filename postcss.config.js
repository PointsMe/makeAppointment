
// eslint-disable-next-line no-undef
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8"
      ]
    },
    'postcss-pxtorem': {
      rootValue({ file }) {
        console.log("file==>",file)
        // const isMobile = function(){
        //   let userAgentInfo = navigator && navigator?.userAgent;
        //   let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
        //   let getArr = Agents.filter(i => userAgentInfo?.includes(i));
        //   return 75;
        // }
        // return 75
        // file.indexOf("vant") === -1 ? 192 : 75
        return 37.5;
      },
      propList: ['*'],
      selectorBlackList: ['.van-notify',], // 在黑名单中的类名，将不会自动rem转换
    },
  },
};