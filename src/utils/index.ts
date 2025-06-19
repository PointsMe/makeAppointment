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
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
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