<!--
 * @Author: YangHuaJian
 * @Date: 2023-03-31 10:49:50
 * @LastEditTime: 2023-04-21 11:24:30
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \vue3-vite\src\views\DataCollection\shujukankong\RealTimeList\mapDraw.vue
-->

<template>
  <div class="map-tools">
    <ul>
      <li :class="[{ active: isGetMarker }]" @click="getMarker">流量点</li>

      <li :class="[{ active: isGetPolyline }]" @click="getPolyline">管网</li>
      <li :class="[{ active: isDrawPolygon }]" @click="polygon">压力点</li>
      <li :class="[{ active: isDrawPoint }]" @click="point">一级分区</li>
      <li :class="[{ active: isGetPolyline }]" @click="getPolyline">
        二级分区
      </li>
      <li :class="[{ active: isGetArea }]" @click="getArea">三级分区</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "mapDraw",
  isComponent: true,
  data() {
    return {
      activeTool: "",
      isGetPolyline: false,
      isGetArea: false,
      isDrawPoint: false,
      isDrawPolygon: false,
      isDrawPolyline: false,
      isGetMarker: false,
    };
  },
  methods: {
    point() {
      if (!this.isDrawPoint) {
        this.isDrawPoint = true;
        this.$emit("point");
      } else {
        this.isDrawPoint = false;
        this.$emit("end");
      }
    },
    polyline() {
      if (!this.isDrawPolyline) {
        this.isDrawPolyline = true;
        this.$emit("polyline");
      } else {
        this.isDrawPolyline = false;
        this.$emit("end");
      }
    },
    polygon() {
      if (!this.isDrawPolygon) {
        this.isDrawPolygon = true;
        this.$emit("polygon");
      } else {
        this.isDrawPolygon = false;
        this.$emit("end");
      }
    },
    getMarker() {
      if (!this.isGetMarker) {
        this.isGetMarker = true;
        this.$emit("getMarker");
      } else {
        this.isGetMarker = false;
        this.$emit("deleteMarker");
      }
    },
    getPolyline() {
      if (!this.isGetPolyline) {
        this.isGetPolyline = true;
        this.$emit("getPolyline");
      } else {
        this.isGetPolyline = false;
        this.$emit("deleteLine");
      }
    },
    getArea() {
      if (!this.isGetArea) {
        this.isGetArea = true;
        this.$emit("getArea");
      } else {
        this.isGetArea = false;
        this.$emit("deleteArea");
      }
    },
  },
};
</script>
<style lang="scss">
.map-tools {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  height: 36px;
  box-shadow: 0px 0px 50px 2px rgba(0, 0, 0, 0.35);
  background-color: #fff;

  ul {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      padding: 0 15px;
      height: 36px;
      font-size: 13px;
      line-height: 36px;
      cursor: pointer;
    }

    li.active {
      background-color: rgb(102, 156, 255);
      color: #fff;
    }

    li:hover {
      background-color: rgb(212, 224, 246);
    }
  }
}</style>
