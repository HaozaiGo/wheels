<!--
 * @Author: xiaohao
 * @Date: 2022-01-06 13:51:07
 * @LastEditTime: 2022-01-06 20:02:52
 * @LastEditors: Please set LastEditors
 * @Description: 九宫格
 * @FilePath: \Water-Works-System\src\views\system\index1.vue
-->
<template>
  <div class="bg">
    <div
      class="content"
      v-if="showPage"
    >
      <div><img
          src="@/assets/login/logo1.png"
          alt="中信环境技术"
        >
      </div>
      <div>
        <span class="title">
          welcome! 中信环境水务运营管理系统
        </span>
      </div>
      <div style="margin-top:10px">
        <span class="infomation">
          欢迎您！<span style="color:#0F79C9">{{username}}</span> <span style="margin-left:20px">今天是：{{time.year}}年{{time.month}}-{{time.day}}日 {{time.week}}
          </span></span>
      </div>
      <div class="desk">
        <div class="menu_row">
          <div
            class="menu"
            v-for="(item,index) in routerList"
            :key="item.meta.title"
            @click="gotoSystem(item,index)"
          >
            <img
              :src="require(`../../assets/grid/pic${index}.png`)"
              alt=""
              style="width:36px"
            >
            <div class="line"></div>
            <div class="menu_tit">{{item.meta.title}}</div>

          </div>

        </div>

        <img
          src="@/assets/grid/desk.png"
          alt="底座"
          srcset=""
          class="bottom_desk"
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  getRouterList,
  getWeather,
  usersubprojects,
  currentproject,
  getFavorites,
} from "@/api/router";
import router from "@/router";
export default {
  data () {
    return {
      username: '',
      routerList: [],
      showPage: false, //控制显示page
      time: {
        year: '',
        month: '',
        day: '',
        week: ''
      }
    }
  },
  computed: {

  },
  created () {
    this.init();
    this.getRouter();
  },
  methods: {
    init () {
      var weeks = new Array("日", "一", "二", "三", "四", "五", "六");
      this.username = window.localStorage.getItem('username')
      this.time.year = new Date().getFullYear();
      this.time.month = new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1);
      this.time.day = new Date().getDate() > 9 ? new Date().getDate() : '0' + new Date().getDate();

      const nowDay = new Date().getDay();
      this.time.week = '星期' + weeks[nowDay]

    },
    getRouter () {
      getRouterList().then((res) => {
        this.routerList = res.data.slice(0, 5);
        this.showPage = true;
      });
    },
    gotoSystem (children) {

      const self = this;
      console.log(children);

      var layoutTemp = {
        children: [],
        component: "Layout",
        path: "/DataQuery",
      };
      for (let i = 0; i < children.children.length; i++) {
        if (children.children[i].component !== "Layout") {
          let temp = JSON.parse(JSON.stringify(children.children[i]));
          children.children[i] = JSON.parse(JSON.stringify(layoutTemp));
          children.children[i].children = JSON.parse(JSON.stringify([temp]));
        }
      }

      window.localStorage.setItem("系统name", children.meta.title);
      window.localStorage.setItem(
        "routes",
        JSON.stringify(children.children)
      );
      this.$store.dispatch("routes/setAllRoutes").then((res) => {
        router.addRoutes(res);
      });
      this.$store.dispatch("tagsBar/delAllRoutes");
      if (children.id == 199998) {
        setTimeout(() => {
          if (
            children.children != undefined &&
            children.children[0].component == "Layout"
          ) {
            console.log(children.children[0].path, children.path);
            self.$router.push({
              path: children.children[0].path + "/" + children.path,
            });
          } else {
            self.$router.push({ path: children.children[0].path });
          }
        }, 500);
      } else {

        setTimeout(() => {
          if (
            children.children != undefined &&
            children.children[0].component == "Layout"
          ) {
            console.log(
              children.children[0].path,
              children.children[0].children[0].path
            );
            self.$router.push({
              path:
                children.children[0].path +
                "/" +
                children.children[0].children[0].path,
            });
          } else {
            self.$router.push({ path: children.children[0].path });
          }
        }, 500);
      }
    },
    handleClickMenu (child, index) {
      const self = this;
      console.log(child)
      window.localStorage.setItem("系统name", child.meta.title);
      window.localStorage.setItem(
        "routes",
        JSON.stringify(child.children)
      );
      this.$store.dispatch("routes/setAllRoutes").then((res) => {
        console.log(res)
        // router.addRoute(res);
      });
      this.$store.dispatch("tagsBar/delAllRoutes");
      setTimeout(() => {
        if (
          child.children != undefined &&
          child.children[0].component == "Layout"
        ) {
          console.log(child.children[0].path, child.path);
          self.$router.push({
            path: child.children[0].path + "/" + child.path,
          });
        } else {
          self.$router.push({ path: child.children[0].path });
        }
      }, 500);
    }
  }
}
</script>

<style lang="scss" scoped>
$gridColor: #1a3368;

.bg {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/grid/gridBg.png");
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  position: relative;
  font-family: FZZC;
  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .title {
      font-size: 2.8rem;
      color: #1f7fca;
      line-height: 101px;
    }
    .infomation {
      color: $gridColor;
      font-size: 20px;
    }
  }
}
.menu_row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  margin: 0 auto;

  .menu {
    background-image: url("../../assets/grid/notChoose.png");
    background-size: 100% 100%;
    transform: translateY(35px);
    // transition: all 1s;
    cursor: pointer;
    // width: 274px;
    // height: 225px;
    width: 14vw;
    height: 11vw;
    text-align: center;
    padding-top: 3vw;
    .menu_tit {
      font-size: 20px;
      color: $gridColor;
    }
    &:hover {
      background-image: url("../../assets/grid/choosed.png");
    }
  }
}
.line {
  margin: 20px auto;
  width: 28px;
  height: 4px;
  background: $gridColor;
}
.desk {
  margin-top: 80px;
  margin-bottom: 30px;
  width: 100vw;
}
.bottom_desk {
  max-width: 100%;
}
</style>
