/*
 * @Author: xiaoHao
 * @Date: 2021-04-29 10:13:29
 * @LastEditTime: 2022-01-22 15:24:22
 * @LastEditors: Please set LastEditors
 * @Description: CommonMethod
 */




let commonMethod = {

  /** 
 * @description:类型判断
 * @param {*}
 * @return {*}
 */
isUndef(v){
  return v === undefined || v===null
},
isDef(v){
  return v !== undefined || v !== null;
},
isTrue(v){
  return v === true;
},
isFalse(v){
  return v === false;
},

// 原始类型
isPrimitive(v){
  return typeof v === 'string' || typeof v === 'number' || typeof v ==='symbol' || typeof v === 'boolean'
},

 _toString : Object.prototype.toString,

//转为string
toString(v){
  return v ==null?'':Array.isArray(v) || ValidityState.toString === _toSring ? JSON.stringify(v,null,2):String(v)
},
//转换value to num
toNum(v){
  const n = parseFloat(v);
  return isNaN(v)? val:n
},

//对象介入
extend(to,_from){
  for(const key in _from){
    to[key] = _from[key]
  }
  return to
},

//once
once(fn){
  let called = false;
  return function(){
    if(!called){
      called = true
      fn.apply(this.arguments)
    }
    
  }
},

  // if (null)---->‘--’ array是要改变的数组内容,rest要改变的key
  ifNull(array, ...rest) {
    for (let item of array) {
      rest.forEach(i => {
        if (item[i] == null) {
          item[i] = '--'
        }
      })
    }
  },

  /**
   * @description: remove an item from an array删除数组中一项
   * @param {*}
   * @return {*}
   */
  remove: function(arr,item){
    if(arr.length){
      var index = arr.indexOf(item);
      if(index > -1){
        return arr.splice(index,1)
      }
    }
  },

/**
 * @description:  这个对象里面是否有这个属性key 
 * @param {object,key}
 * @return {*}
 */
hasOwn: function(obj,key){
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  return hasOwnProperty.call(obj,key)
},

/**
 * @description: mix properties into target object
 * @param {*}
 * @return {*}
 */
extend: (to,_from) =>{
  for(var key in _from){
    to[key] = _from[key]
  }
  return to
},


  //返回今日日期
  returnToday() {
    return (() => {
      let year = new Date().getFullYear(),
        month = new Date().getMonth(),
        date = new Date().getDate();
      month = month + 1 > 9 ? month + 1 : "0" + (month + 1);
      date = date > 9 ? date : "0" + date;
      return year + '-' + month + '-' + date
    })()
  },

  //返回当前月份
  returnMonth() {
    return (() => {
      let year = new Date().getFullYear();
      let month = new Date().getMonth();
      month = month + 1 > 9 ? month + 1 : "0" + (month + 1);
      return year + '-' + month

    })()
  },
  //返回前个月份
  returnLastMonth() {
    return (() => {
      let year = new Date().getFullYear();
      let month = new Date().getMonth();
      month = (month + 1) > 9 ? month : "0" + month;
      return year + '-' + month

    })()
  },

  // 返回今个星期
  
 
}
export default commonMethod
