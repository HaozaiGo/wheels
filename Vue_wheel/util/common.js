/*
 * @Author: xiaoHao
 * @Date: 2021-04-29 10:13:29
 * @LastEditTime: 2021-05-11 09:48:33
 * @LastEditors: Please set LastEditors
 * @Description: CommonMethod
 */
import request from '@/utils/request'

let commonMethod = {
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
  // 打开侧边树without parent
  openLeftTreeWithPar(state, flag, id, top = null) {
    if (state) {
      return (function () {
        if (id) {
          document.getElementById(id).style.width =
            " calc(100% - 215px)";
          document.getElementById(id).style.left =
            "215px";
        }
        if (top) {
          document.getElementsByClassName(top)[0].style.width =
            " calc(100% - 215px)";
          document.getElementsByClassName(top)[0].style.left = "215px";
        }

        document.getElementsByClassName("button-tree")[0].style.opacity = 0;
        document.getElementsByClassName("button-tree")[0].style.display = "none";

        var nod = document.createElement("style");
        var str =
          ".leftDrawer {left: " +
          (!flag ? "190px" : "71px") +
          "!important} ";
        nod.type = "text/css";
        if (nod.styleSheet) {
          //ie下
          nod.styleSheet.cssText = str;
        } else {
          nod.innerHTML = str; //或者写成 nod.appendChild(document.createTextNode(str))
        }
        document.getElementsByTagName("head")[0].appendChild(nod);
      })()
    }

  },

  //关闭侧边树2
  closeLeftTreeWithPar(state, id, top = undefined) {
    if (!state) {
      return (() => {
        if (id) {
          document.getElementById(id).style.width =
            " 100%";
          document.getElementById(id).style.left = "0px";
        }
        if (top) {
          document.getElementsByClassName(top)[0].style.width = " 100%";
          document.getElementsByClassName(top)[0].style.left = "0px";
        }

        document.getElementsByClassName("button-tree")[0].style.opacity = 1;
        document.getElementsByClassName("button-tree")[0].style.display = "block";
      })()
    }
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
  /**
   * @description:  根据参数获取字典表内容
   * @param {*} query
   * @return {*}
   */
  getConstList(query) {
    return request({
      url: `/imrs/system/dict/data/type/${query}`,
      method: 'get'
    })
  }
}
export default commonMethod
