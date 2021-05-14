import axios from "axios";
import {
  baseURL,
  contentType,
  invalidCode,
  messageDuration,
  noPermissionCode,
  requestTimeout,
  successCode,
  tokenName,
  debounce,
} from "@/config/settings";
import { tansParams } from "@/utils/ruoyi";
import { Loading, Message } from "element-ui";
import { refreshlogin } from "@/api/user";
import { getToken, removeToken, setToken } from "@/utils/auth";
import store from "@/store";
import qs from "qs";
import router from "@/router";
import _ from "lodash";
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: requestTimeout,
  headers: {
    "Content-Type": contentType,
  },
  // responseType: 'arraybuffer'
});
let loadingInstance;

// request拦截器
service.interceptors.request.use(
  (config) => {
    const isToken = (config.headers || {}).isToken === false;
    if (
      config.url != "/api/auth/oauth/token" &&
      config.url != "/api/code" &&
      window.localStorage.getItem("refresh_token") == null
    ) {
      router.push("/login");
      removeToken();
      return;
    }
    if (getToken() && !isToken) {
      config.headers["Authorization"] = "Bearer " + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    } else if (
      getToken() == undefined &&
      location.pathname != "/CSD/login" &&
      config.url != "/api/code" &&
      config.url != "/api/auth/oauth/token" &&
      location.pathname != "/CSD/" &&
      window.localStorage.getItem("refresh_token") != null
    ) {
      return refreshlogin().then((res) => {
        console.log(res)
        if (res.code == 500) {
          window.localStorage.removeItem("refresh_token");
          router.push("/login");
          return;
        }
        if (res.access_token != undefined) {
          window.localStorage.setItem("refresh_token", res.refresh_token);
          config.headers["Authorization"] = "Bearer " + res.access_token; // 让每个请求携带自定义token 请根据实际情况自行修改
          window.localStorage.setItem("expires_in", res.expires_in);
          setToken(res.access_token);
          return config;
        } else {
          router.push("/login");
        }
      });
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

const errorMsg = (message) => {
  return Message({
    message: message,
    type: "error",
    duration: messageDuration,
  });
};
const waringMsg = (message) => {
  return Message({
    message: message,
    type: "warning",
    duration: messageDuration,
  });
};

service.interceptors.response.use(
  (response) => {
    // service.get('/system/dept/list', {
    //   transformRequest: [(params) => {
    //     console.log(params)
    //   }],
    // })
    if (loadingInstance) {
      loadingInstance.close();
    }
    const { status, data, config } = response;
    const { code, msg, access_token, error } = data;
    if (error == "invalid_token") {
      removeToken();
      router.push("/login");
    }
    if (code !== successCode && access_token == undefined) {
      switch (code) {
        case invalidCode:
          removeToken();
          router.push("/login");
          break;
        case noPermissionCode:
          removeToken();
          router.push("/login");
          break;
          code;
        default:
          break;
      }
      return data;
    }
    else {

      return data;
    }
  },
  (error) => {
    if (loadingInstance) {
      loadingInstance.close();
    }
    /*网络连接过程异常处理*/
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
      waringMsg(message || "后端接口未知异常");
    }
    if (message.includes("timeout")) {
      message = "后端接口请求超时";
      waringMsg(message || "后端接口未知异常");
    }
    if (message.includes("Request failed with status code")) {
      if (message.substr(message.length - 3) == "401") {
        refreshlogin().then((res) => {
          if (res.access_token != undefined) {
            window.localStorage.setItem("refresh_token", res.refresh_token);
            setToken(res.access_token);
            return;
          } else {
            removeToken();
            router.push("/login");
          }
        }).catch(error => {
          router.push("/login");
          removeToken()
        });
      }
      return;
      // message = "后端接口" + message.substr(message.length - 3) + "异常";
    }
    return Promise.reject(error);
  }
);

// 通用下载方法
export function download(url, params, filename) {
  return service
    .post(url + "?" + tansParams(params), params, {
      transformRequest: [
        (params) => {
          return tansParams(params);
        },
      ],
      responseType: "blob",
    })
    .then((data) => {
      const content = data;
      const blob = new Blob([content]);
      if ("download" in document.createElement("a")) {
        const elink = document.createElement("a");
        elink.download = filename;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
      } else {
        navigator.msSaveBlob(blob, filename);
      }
    })
    .catch((r) => {
      console.error(r);
    });
}

// 通用下载方法
export function download2(url, data, filename) {
  return service
    .post(url, data, {
      responseType: "blob",
    })
    .then((data) => {
      const content = data;
      const blob = new Blob([content]);
      if ("download" in document.createElement("a")) {
        const elink = document.createElement("a");
        elink.download = filename;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
      } else {
        navigator.msSaveBlob(blob, filename);
      }
    })
    .catch((r) => {
      console.error(r);
    });
}
// 通用下载方法
export function download3(url, data, filename) {
  return service
    .post(url, data.body, {
      responseType: "blob",
    })
    .then((data) => {
      const content = data;
      const blob = new Blob([content]);
      if ("download" in document.createElement("a")) {
        const elink = document.createElement("a");
        elink.download = filename;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
      } else {
        navigator.msSaveBlob(blob, filename);
      }
    })
    .catch((r) => {
      console.error(r);
    });
}

// 通用下载图片方法
export function downloadImg(url) {
  return service
    .get(url, {
      responseType: "arraybuffer",
    })
    .then((data) => {
      return btoa(
        new Uint8Array(data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
    })
    .catch((r) => {
      console.error(r);
    });
}

export default service;
