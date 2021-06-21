export const time=res=>{
  let time = new Date(res);
  let n=time.getFullYear();
  let y=time.getMonth()+1;
  let r=time.getDate();
  if(y<10){
    y='0'+y
  }
  if(r<10){
    r='0'+r
  }
  var birthday= n+"-"+y+"-"+r;
  return birthday
}


export const calculate=res=> {
    let i = Math.round(res / 10000)
    if (i > 10000) {
      i = Math.round(i / 10000)
      return i + "亿";
    } else {
      if (i < 0) {
        return res
      } else {
        return i + "万"
      }
    }
}



export default {
  datatimef(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var nowDate = year + "-" + month + "-" + day;
    return nowDate
  },
  dateDiff(d1,d2,str) {
    d1 = new Date(d1.replace(/-/g, '/'));
    d2 = new Date(d2.replace(/-/g, '/'));
    var obj = {}, M1 = d1.getMonth(), D1 = d1.getDate(), M2 = d2.getMonth(), D2 = d2.getDate();
    obj.Y = d2.getFullYear() - d1.getFullYear() + (M1 * 100 + D1 > M2 * 100 + D2 ? -1 : 0);
    obj.M = (obj.Y > 0 ? obj.Y * 12 : 12) + M2 - M1 + (D1 > D2 ? -1 : 0);
    obj.s = Math.floor((d2 - d1) / 1000);//差几秒
    obj.m = Math.floor(obj.s / 60);//差几分钟
    obj.h = Math.floor(obj.m / 60);//差几小时
    obj.D = Math.floor(obj.h / 24);//差几天
    return str.replace(/\w/g, function (a) {
      return obj[a] ? obj[a] : a;
    });
  },
  /*取随机数*/
  rodom(){
    var random_1 = Math.random() + "";
    var ran = random_1.charAt(3);
    return parseInt(ran)
  },
  // 转换成秒
  formatSecond(time) {
    // 取整
    time = ~~time
    var secondTime
    if (time < 10) {
      secondTime = '00:0' + time
    } else if (time < 60) {
      secondTime = '00:' + time
    } else {
      var m = ~~parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
      var s = ~~parseInt((time % (1000 * 60)) / 1000)
      secondTime = Number(m * 60 + s)
    }
    return secondTime
  },
  // 秒转00:00
  formatSecondTime(interval) {
    interval = interval | 0
    const m = (interval / 60) | 0
    const s = interval % 60
    return `${this.formatZero(m, 2)}:${this.formatZero(s, 2)}`
  },
  formatZero(num, len) {
    if (String(num).length > len) return num
    return (Array(len).join(0) + num).slice(-len)
  },
  /**
   * 数字转整数 如 100000 转为10万
   * @param {需要转化的数} num
   * @param {需要保留的小数位数} point
   */
  tranNumber(num, point) {
    let numStr =(num || {}).toString()
    // 十万以内直接返回
    if (numStr.length < 6) {
      return numStr
    }
    //大于8位数是亿
    else if (numStr.length > 8) {
      let decimal = numStr.substring(
          numStr.length - 8,
          numStr.length - 8 + point
      )
      return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
    }
    //大于6位数是十万 (以10W分割 10W以下全部显示)
    else if (numStr.length > 5) {
      let decimal = numStr.substring(
          numStr.length - 4,
          numStr.length - 4 + point
      )
      return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
    }
  },
}



