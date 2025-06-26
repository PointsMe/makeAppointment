  export const reFlushWindows = ()=>{
    //  window.location.reload()
  }
  
  export const getRandomString = (length:number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const getVersion = async () => {
  const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/version.json`;
  // let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/word/it-privice.docx`;
  const response = await fetch(url);
  const res = await response.json();
  if(res.version !== window.localStorage.getItem("version")){
    window.localStorage.setItem("version",res.version);
    window.location.reload();
  }
  return res;
}

export const isMobile = () =>{
  const userAgentInfo = navigator && navigator?.userAgent;
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod','ios' ];
  const getArr = Agents.filter(i => userAgentInfo?.includes(i));
  return getArr.length > 0 ? true : false;
}
export const getTimeZone = () => {
  const offsetMinutes = new Date().getTimezoneOffset();
  const offsetHours = Math.abs(offsetMinutes / 60);
  const offsetSign = offsetMinutes > 0 ? '-' : '+';
  const timeZone = `GMT${offsetSign}${offsetHours < 10 ? '0' : ''}${offsetHours}:00`;
  return timeZone;
}
/**
 * 判断用户设备类型
 * @returns {boolean} true表示移动端，false表示PC端
 */
export const isMobileDevice = (): boolean => {
  // 获取用户代理字符串
  const userAgent = navigator.userAgent.toLowerCase();
  
  // 移动设备关键词
  const mobileKeywords = [
    'android',
    'iphone',
    'ipad',
    'ipod',
    'blackberry',
    'windows phone',
    'mobile',
    'tablet'
  ];
  
  // 检查是否包含移动设备关键词
  const isMobile = mobileKeywords.some(keyword => userAgent.includes(keyword));
  
  // 额外的屏幕尺寸检查（可选）
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const isSmallScreen = screenWidth <= 768 || screenHeight <= 768;
  
  // 如果用户代理检测到移动设备或者屏幕尺寸较小，则认为是移动端
  return isMobile || isSmallScreen;
}

/**
 * 获取设备类型详细信息
 * @returns {object} 包含设备类型信息的对象
 */
export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  
  return {
    isMobile: isMobileDevice(),
    isAndroid: userAgent.includes('android'),
    isIOS: userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod'),
    isWeChat: userAgent.includes('micromessenger'),
    isQQ: userAgent.includes('qq/'),
    isAlipay: userAgent.includes('aliapp'),
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    userAgent: navigator.userAgent
  };
}
