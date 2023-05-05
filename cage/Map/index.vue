<!--
 * @Author: YangHuaJian
 * @Date: 2023-04-20 16:51:15
 * @LastEditTime: 2023-04-27 10:20:52
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \Water-Marketing-System1\src\views\wams\areaManagement\index.vue
-->


<template>
  <div class="container">
    <MapDraw
      @point="drawPoint"
      @polygon="drawPolygon"
      @end="drawOff"
      @polyline="drawPolyline"
      @getMarker="getMarker"
      @deleteMarker="deleteMarker1"
      @getPolyline="getLine"
      @deleteLine="deleteLine"
      @getArea="getArea"
      @deleteArea="deleteArea"
    ></MapDraw>
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import MapDraw from "./mapDraw";
import {
  createMap,
  deleteImageLayer,
  addImgToMap,
  createMakerByXY,
  deleteMarker,
  addCursorStyle,
  removerCoursorStyle,
  createMakerByLatlng,
  producePolyline,
  deletePolyLine,
  showMarkerDraw,
  showPolygonDraw,
  deleteJsonArea,
  getJsonArea,
  deleteAllDraw,
  produceElectricFence,
  deleteAllElectricFence,
} from "@/utils/map.js";
export default {
  name: "RealTimeList",
  isRouter: true,
  components: {
    MapDraw,
  },
  data() {
    return {
      map: null,
      drawnItems: null,
      // 1. 定义保存面的相关变量
      points: [], // 画的过程中的点
      lines: {}, // 画的过程中生成的多边形
      tempLines: {}, // 鼠标移动中生成的多边形（实际是一条线段）
      polygonList: {}, // 双击结束生成多边形
      facelines: [], // 存储画的多边形
      facetempLines: [], // 存储移动的多边形
      facepolygonList: [], // 存储结束生成的多边形
      latlngs: [
        [
          [23.0, 113.20119],
          [23.1, 113.62119],
          [23.2, 113.12119],
          [23.5, 113.22159],
          [23.2, 113.27119],
          [23.3, 113.22119],
          [23.0241, 113.24639],
          [23.02, 113.25119],
        ],
        [
          [23.08, 113.20119],
          [23.04, 113.20639],
          [23.05, 113.21119],
        ],
      ],
    };
  },
  created() {
    this.$nextTick(() => {
      this.initMap();
      addImgToMap(this.map);
    });
  },
  mounted() {
    this.$baseEventBus.$on("areaClick", (item) => {
      showPolygonDraw(this.map, item.data, item.color, item.id);
    });
    this.$baseEventBus.$on("markerClick", (item) => {
      showMarkerDraw(this.map, item.data, item.type, item.id);
    });
  },
  methods: {
    initMap() {
      this.map = createMap("map");
      // deleteImageLayer(this.map);

      // L.marker([23.0, 113.20119]).addTo(this.map).bindPopup("marker");
      //   .openPopup();
      //   this.map.pm.addControls({
      //     position: "topleft",
      //     drawPolygon: true, // 绘制多边形
      //     drawMarker: false, //绘制标记点
      //     drawCircleMarker: false, //绘制圆形标记
      //     drawPolyline: false, //绘制线条
      //     drawRectangle: true, //绘制矩形
      //     drawCircle: false, //绘制圆圈
      //     editMode: true, //编辑多边形
      //     dragMode: true, //拖动多边形
      //     cutPolygon: true, // 添加一个按钮以删除多边形里面的部分内容
      //     removalMode: true, // 清除多边形
      //   });
      // this.map.pm.setLang("zh");
      // this.map.on("click", this.onMapClick);
      // // 监听绘图事件
      // this.map.on(L.Draw.Event.CREATED, (event) => {
      //   const layer = event.layer;
      //   this.drawnItems.addLayer(layer);
      //   this.$emit("addFeature", layer.toGeoJSON());
      // });
    },
    //获取标注点
    getMarker() {
      deleteMarker(this.map);
      createMakerByXY(this.map, [
        { data: [23.107365208362847, 113.10991287231445], id: 1, type: 1 },
        { data: [23.11589095262163, 113.12175750732422], id: 2, type: 1 },
        { data: [23.108312540016765, 113.13514709472658], id: 3, type: 1 },
        { data: [23.095759853270163, 113.1306838989258], id: 4, type: 1 },
        { data: [23.09007523191837, 113.11128616333008], id: 5, type: 1 },
        { data: [23.10191792166032, 113.113431930542], id: 6, type: 1 },
      ]);
    },
    //清除标注点
    deleteMarker1() {
      deleteMarker(this.map);
    },
    //获取折线
    getLine() {
      deletePolyLine(this.map);
      producePolyline(this.map);
    },
    //清除折线
    deleteLine() {
      deletePolyLine(this.map);
    },
    //获取片区
    getArea() {
      deleteAllElectricFence(this.map);
      produceElectricFence(this.map);
    },
    //清除片区
    deleteArea() {
      deleteAllDraw(this.map);
      deleteAllElectricFence(this.map);
    },
    drawPoint() {
      addCursorStyle(this.map, "pointer-cursor");
      this.map.on("click", (evt) => {
        console.log("evt.latlng", evt.latlng);
        createMakerByLatlng(evt.latlng, 2).addTo(this.map);
      });
    },

    drawPolyline() {
      this.map.pm.disableDraw("Line");
      this.map.pm.disableDraw("Marker");
      this.map.pm.disableDraw("Polygon");
      this.map.pm.disableDraw("Circle");
      this.map.pm.disableDraw("Rectangle");
      let options = {
        // 连接线  标记之间的线
        templineStyle: {
          color: "red",
        },
        // 提示线  从最后一个标记到鼠标光标的线
        hintlineStyle: {
          color: "red",
          dashArray: [5, 5],
        },
        // 绘制完成的样式
        pathOptions: {
          color: "orange",
          fillColor: "red",
        },
      };
      // 启用绘制多边形功能
      this.map.pm.enableDraw("Line", {
        snappable: true, //启⽤捕捉到其他绘制图形的顶点
        snapDistance: 20, //顶点捕捉距离
      });
      this.listener();
    },
    drawPolygon() {
      this.map.pm.disableDraw("Line");
      this.map.pm.disableDraw("Marker");
      this.map.pm.disableDraw("Polygon");
      this.map.pm.disableDraw("Circle");
      this.map.pm.disableDraw("Rectangle");
      let options = {
        // 连接线  标记之间的线
        templineStyle: {
          color: "red",
        },
        // 提示线  从最后一个标记到鼠标光标的线
        hintlineStyle: {
          color: "red",
          dashArray: [5, 5],
        },
        // 绘制完成的样式
        pathOptions: {
          color: "orange",
          fillColor: "red",
        },
      };

      // 启用绘制多边形功能
      this.map.pm.enableDraw("Polygon", {
        snappable: true, //启⽤捕捉到其他绘制图形的顶点
        snapDistance: 20, //顶点捕捉距离
      });
      this.listener();
    },
    drawOff() {
      // 关闭绘制  注意也可以关闭其他模式的绘制功能
      this.map.pm.disableDraw("Polygon");
      // 移除监听地图点击事件
      this.map.off("click");
      this.map.off("mousemove");
      this.map.off("dblclick");
    },
    listener() {
      //pm:drawstart 开始第一个点的时候调用
      //pm:drawend  禁止绘制时调用
      //pm:create  图形创建完成时调用
      this.map.on("pm:drawstart", (e) => {
        console.log(e, "first");
      });
      this.map.on("pm:drawend", (e) => {
        console.log(e, "禁止绘制");
      });
      this.map.on("pm:create", (e) => {
        console.log(e, "绘制完成时调用");
        this.drawOff();
        if (e.shape == "Circle") {
          console.log(e.layer._latlng, e.layer._radius, "绘制坐标");
        } else if (e.shape == "Line") {
          let arr = e.layer._latlngs.map((item) => {
            return [item.lat, item.lng];
          });
          console.log(arr, "绘制折线坐标");
        } else {
          let arr = e.layer._latlngs[0].map((item) => {
            return [item.lat, item.lng];
          });
          console.log(arr, "绘制面坐标");
        }
      });
    },
  },
};
</script>

<style>

#map {
  height: 100%;
  color: rgba(263, 254, 249, 255);
}
img.leaflet-tile.leaflet-tile-loaded {
  filter: url("#x-rays") contrast(1.1);
}
.container{
  height: calc(100vh - 55px);
}
</style>