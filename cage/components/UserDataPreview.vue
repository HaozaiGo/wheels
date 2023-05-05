<template>
  <div class="user-data-preview">
    <!-- 左侧数据预览 -->
    <div class="data-overview left-layout" :style="hideBar ? 'width:0px' : 'width:370px'">
      <dv-border-box-12 :style="{ 'height': height }">
        <div style="height:100%">
          <p class="content-title">累计数据概览</p>

        </div>
      </dv-border-box-12>

      <!-- 实时告警监测 -->
      <dv-border-box-12 :style="{ 'height': height }">
        <p class="content-title">实时告警监测</p>
        <div id="flowmeter" class="realTimeWatch" style="height:calc(100% - 31px)"></div>
      </dv-border-box-12>

      <!-- 大片区用水量统计 -->
      <dv-border-box-12 :style="{ 'height': height, 'margin-top': '8px','padding':'10px' }">
        <p class="content-title">大片区用水量统计</p>
        <!-- class="user-details" -->
        <div id="userDetail" style="height: 100%;">

        </div>
      </dv-border-box-12>

      <!-- <div class="city-ranking">
        <p class="content-title">开门用户城市排行</p>
        <ScrollRankingBoard class="ranking" :config="rankingConfig"></ScrollRankingBoard>
      </div> -->
    </div>
    <!-- 右侧状态 -->
    <div class="live-status right-layout" :style="hideBar ? 'width:0px' : 'width:450px'">
      <!-- 夜间最小流量分析  -->
      <dv-border-box-8 class="status-details" :style="{ 'height': height }">
        <p class="content-title">夜间最小流量分析</p>
        <div id="nightFlow" style="height: 100%;"></div>

      </dv-border-box-8>
      <!-- 漏损水量分析 -->
      <dv-border-box-8 class="portrait-crowd" :style="{ 'height': height }">
        <p class="content-title">漏损水量分析</p>
        <div id="slackWaterDetail" style="height: 100%;"></div>
      </dv-border-box-8>
      <dv-border-box-8 class="channel-proportion" :style="{ 'height': height }">
        <p class="content-title">产销差分析</p>
        <div class="content">
          <div id="channelCanvas" style="width: 100%; height: 100%"></div>
        </div>
      </dv-border-box-8>
      <dv-border-box-8 class="channel-proportion" :style="{ 'height': height }">
        <p class="content-title">总分差漏损分析</p>
        <div class="content">
          <div id="111" style="width: 100%; height: 100%"></div>
        </div>
      </dv-border-box-8>
    </div>
  </div>
</template>

<script>
import { previewData, userRankingData, userStates, userPortraitData, userChannelData } from '../jsonData'
import * as echarts from 'echarts'
export default {
  name: 'UserDataPreview',
  components: {},
  props: {
    riseImage: {
      type: String,
    },
    declineImage: {
      type: String,
    },
    height: {
      type: String,
      default: ''
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hideBar: false,
      timer: null,
      numTimer: null,
      pointTimer: null,
      applyRate: 0,
      faceRate: 0,
      applyTotal: 0,
      faceTotal: 0,
      manRate: 0,
      womanRate: 0,
      userData: [],
      allUserNumCount: '',
      allCommunityCount: '',
      cityInfoList: [],
      rankingConfig: {
        data: [],
        formatter: true
      }
    }
  },
  mounted() {
    // 获取全用户数据
    setTimeout(() => {
      // this.initUserMap()
      this.initUserDataPreview()

      this.initFlowMeter()
      this.initUserDetail();
      this.initNightFlow();
      this.initSlackWaterDetail();
      this.initUserChannelCanvas()
    }, 700)
  },
  methods: {
    // 隐藏两侧边栏
    handleHideSideBar() {

      this.hideBar = !this.hideBar;

    },


    //漏损水量
    initSlackWaterDetail() {
      var charts = {
        unit: ['Kbps', 'KKK2'],
        names: ["出口", "入口"],
        lineX: [
          "2018-11-11 17:01",
          "2018-11-11 17:02",
          "2018-11-11 17:03",
          "2018-11-11 17:04",
          "2018-11-11 17:05",
          "2018-11-11 17:06",
          "2018-11-11 17:07",
          "2018-11-11 17:08",
          "2018-11-11 17:09",
          "2018-11-11 17:10",
          "2018-11-11 17:11",
          "2018-11-11 17:12",
          "2018-11-11 17:13",
          "2018-11-11 17:14",
          "2018-11-11 17:15",
          "2018-11-11 17:16",
          "2018-11-11 17:17",
          "2018-11-11 17:18",
          "2018-11-11 17:19",
          "2018-11-11 17:20",
        ],
        value: [
          [
            451, 352, 303, 534, 95, 236, 217, 328, 159, 151, 231, 192, 453, 524, 165,
            236, 527, 328, 129, 530,
          ],
          [
            360, 545, 80, 192, 330, 580, 192, 80, 250, 453, 352, 28, 625, 345, 65,
            325, 468, 108, 253, 98,
          ],
        ],
      };
      var color = ["rgba(23, 255, 243", "rgba(255,100,97"];
      var lineY = [];

      for (var i = 0; i < charts.names.length; i++) {
        var x = i;
        if (x > color.length - 1) {
          x = color.length - 1;
        }
        var data = {
          name: charts.names[i],
          type: "line",
          color: color[x] + ")",
          yAxisIndex: i,
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: color[x] + ", 0.3)",
                  },
                  {
                    offset: 0.8,
                    color: color[x] + ", 0)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10,
            },
          },
          symbol: "circle",
          symbolSize: 5,
          data: charts.value[i],
        };
        lineY.push(data);

      }
      const slackWaterDetail = this.$echarts.init(document.getElementById('slackWaterDetail'));
      let option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: charts.names,
          textStyle: {
            fontSize: 12,
            color: "rgb(0,253,255,0.6)",
          },
          right: "4%",
        },
        grid: {
          top: "14%",
          left: "4%",
          right: "6%",
          bottom: "12%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: charts.lineX,
          axisLabel: {
            textStyle: {
              color: "rgb(0,253,255,0.6)",
            },
            formatter: function (params) {
              return params.split(" ")[0] + "\n" + params.split(" ")[1];
            },
          },
        },
        yAxis: [{
          name: charts.unit[0],
          type: "value",
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "rgb(0,253,255,0.6)",
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgb(23,255,243,0.3)",
            },
          },
          axisLine: {
            lineStyle: {
              color: "rgb(0,253,255,0.6)",
            },
          },
        }, {
          name: charts.unit[1],
          type: "value",
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "rgb(0,253,255,0.6)",
            },
          },

          axisLine: {
            lineStyle: {
              color: "rgb(0,253,255,0.6)",
            },
          },
        }],

        series: lineY,

      };
      slackWaterDetail.setOption(option);
    },

    // 夜间流量分析
    initNightFlow() {

      var data1 = [
        709, 1999, 709, 2299, 3299, 2299, 1999, 2999, 1999, 709, 1999, 709,
      ];
      var data2 = [
        1709, 2999, 1799, 3299, 4299, 3299, 2999, 3999, 2999, 1709, 2999, 1709,
      ];
      const xData = (function () {
        var data = [];
        for (var i = 1; i < 13; i++) {
          data.push(i + "月");
        }
        return data;
      })();
      const nightFlow = this.$echarts.init(document.getElementById('nightFlow'));
      let option = {

        grid: {
          borderWidth: 0,
          top: "20%",
          left: "65",
          bottom: "25%",
          textStyle: {
            color: "#fff",
          },
        },
        legend: {
          top: "0%",
          right: "10%",
          textStyle: {
            fontSize: "20px",
            fontFamily: "MicrosoftYaHeiUI",
            color: "#FFFFFF",
          },
          itemWidth: 28,
          itemHeight: 28,
          data: [
            {
              name: "周转量",
              icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAA1ElEQVR4Xu2WsQ2AMBADP4ghYBtGZxsYAhHEAMQ19tF+g+/PSVqFfy08fwEAA8IJUIFwATgEqQAVCCdABcIF4BagAlQgnAAVCBeAW4AKUIFwAlQgXABuASpABcIJjCtw9O3vfOaquta2f+UYApjO3v8O4P3/e2mfOQEw2jAGpFeg0g9BhwNQZeAlqAi5zzHAfcMqHwYoQu5zDHDfsMqHAYqQ+xwD3Des8mGAIuQ+xwD3Dat8GKAIuc8xwH3DKh8GKELucwxw37DKhwGKkPscA9w3rPI9drIYQbytq9EAAAAASUVORK5CYII=",
            },
            {
              name: "趋势",
              icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA1UlEQVRYR+2UMQ7CMAxFvxdyFtqVhREpZ+AEnIyRM1RiY2NsOQgTXYzSUlVNm9ZWhwrJnvPjpxfHhI2LNu4PAzADZsAM/I+BT5FnAF8JqBl0cb6sNFu0z/N751+nLisy0ISJb2DkTZBQgukshYjyT+ergxhgEA6NQwUQIcQoH4HPGpgKtwZ+NhYglpq3MhM1F5ZcLDmTBJCE1wImZ0DSvAuvfaKRAU3zJIRySAczUBfZg4GjdMInIZTfNALY3wFy6xaNblGJFpFm42nPGoAZMANmwAx8ASjjyiGj/fCxAAAAAElFTkSuQmCC",
            },
          ],
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.5)",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              color: "rgba(255,255,255,0.7)",
              fontSize: 13,
            },
            data: xData,
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              color: "rgba(255,255,255,0.5)",
              fontSize: 15,
            },
            splitArea: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "周转量",
            type: "bar",
            // "stack": "总量",
            barMaxWidth: 35,
            barGap: "10%",
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#05F5FF", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#020D20", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
            data: data1,
          },
          {
            name: "趋势",
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              normal: {
                color: "rgba(255, 196, 53, 1)",
                barBorderRadius: 0,
              },
            },
            lineStyle: {
              normal: {
                width: 4,
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#F0B62A", // 0% 处的颜色
                    },
                    {
                      offset: 0.45,
                      color: "#FFC12B", // 45% 处的颜色
                    },
                    {
                      offset: 0.85,
                      color: "#FFC12B", // 85% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#FFC12B", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
            data: data2,
          },
        ],

      }
      nightFlow.setOption(option);
    },

    // 实时告警监测
    initFlowMeter() {
      const flowmeter = this.$echarts.init(document.getElementById('flowmeter'))

      let option = {
        title: {
          text: '流量计',
          textStyle: {
            color: '#fff'
          },
          subtext: '（在线10台，离线0台）',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          icon: 'circle',
          orient: 'horizontal',
          left: 'left',
          bottom: '0',
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
        },
        series: [
          {
            top: "30%",
            bottom: "60",
            name: 'Access From',
            type: 'pie',
            radius: '90%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            color: ['#61AECF', '#E8684A', '#F6BD16', '#5D7092', '#5AD8A6'],
          }
        ]
      };
      flowmeter.setOption(option)
      this.$LoopShowTooltip(flowmeter, option, { loopSeries: true, interval: 4000 })
    },

    // 大片区用水量统计
    initUserDetail() {
      const userDetail = this.$echarts.init(document.getElementById('userDetail'))
      let dataX = [
        "XX街道",
        "XX街道",
        "XX街道",
        "XX街道",
        "XX街道",
        "XX街道",
        "XX街道",
        "XX街道",
        "XX街道",
        "XX街道",
        "XX街道",
        "XX街道",
        "XX街道",
        "XX街道",
        "XX街道",
        "XX街道",
        "XX街道",
        "XX街道",
      ]; //名称
      let dataY = [
        20, 50, 15, 35, 50, 30, 40, 50, 60, 20, 50, 15, 35, 50, 30, 40, 50, 60,
      ]; //数据
      let zoomShow = false;
      if (dataY.length > 14) {
        zoomShow = true;
      } else {
        zoomShow = false;
      }
      var option = {
        // backgroundColor: "#10101599",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: "8%",
          right: "8%",
          left: "8%",
          bottom: "18%",
        },
        xAxis: [
          {
            type: "category",
            data: dataX,
            axisLine: {
              lineStyle: {
                color: "rgba(66, 192, 255, .3)",
              },
            },
            axisLabel: {
              interval: 0,
              margin: 10,
              color: "#05D5FF",
              textStyle: {
                fontSize: 11,
              },
              rotate: "45",
            },
            axisTick: {
              //刻度
              show: false,
            },
          },
        ],
        yAxis: [
          {
            axisLabel: {
              padding: [3, 0, 0, 0],
              formatter: "{value}",
              color: "rgba(95, 187, 235, 1)",
              textStyle: {
                fontSize: 11,
              },
            },
            axisTick: {
              show: true,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(66, 192, 255, .3)",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,0)",
              },
            },
          },
        ],
        dataZoom: [
          //滚动条
          {
            show: zoomShow,
            type: "slider",
            realtime: true,
            startValue: 0,
            endValue: 14,
            xAxisIndex: [0],
            bottom: "10",
            left: "30",
            height: 10,
            borderColor: "rgba(0,0,0,0)",
            textStyle: {
              color: "#05D5FF",
            },
          },
        ],
        series: [
          {
            type: "bar",
            data: dataY,
            barWidth: "10",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(5, 213, 255, 1)", // 0% 处的颜色
                    },
                    {
                      offset: 0.98,
                      color: "rgba(5, 213, 255, 0)", // 100% 处的颜色
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(5, 213, 255, 1)",
                shadowBlur: 4,
              },
            },
            label: {
              normal: {
                show: true,
                lineHeight: 10,
                formatter: "{c}",
                position: "top",
                textStyle: {
                  color: "#fff",
                  fontSize: 10,
                },
              },
            },
          },
        ],
      };
      userDetail.setOption(option)
    },

    // 用户数据概览
    initUserDataPreview() {
      if (previewData.code !== 0) return
      this.allUserNumCount = previewData.data.allUserNumCount
      this.userData = []
      this.userData.push({
        id: 'allUser',
        name: '累计注册用户',
        value: this.$parent.formatter(previewData.data.allUserNumCount),
        valueArr: this.$parent.formatter(previewData.data.allUserNumCount).split(''),
        type: previewData.data.allUserNumUpType,
        typeValue: `${(+previewData.data.allUserNumPercentage * 100).toFixed(1)}%`
      }, {
        id: 'allUserOpen',
        name: '累计开门人数',
        value: this.$parent.formatter(previewData.data.allUserOpenNumCount),
        valueArr: this.$parent.formatter(previewData.data.allUserOpenNumCount).split(''),
        type: previewData.data.allUserOpenNumUpType,
        typeValue: `${(+previewData.data.allUserOpenNumPercentage * 100).toFixed(1)}%`
      }, {
        id: 'allOpen',
        name: '累计开门次数',
        value: this.$parent.formatter(previewData.data.allOpenNumCount),
        valueArr: this.$parent.formatter(previewData.data.allOpenNumCount).split(''),
        type: previewData.data.allOpenNumUpType,
        typeValue: `${(+previewData.data.allOpenNumCountPercentage * 100).toFixed(1)}%`
      }, {
        id: 'allUserFace',
        name: '累计人脸开门次数',
        value: this.$parent.formatter(previewData.data.allUserFaceOpenNumCount),
        valueArr: this.$parent.formatter(previewData.data.allUserFaceOpenNumCount).split(''),
        type: previewData.data.allUserFaceOpenNumCountUpType,
        typeValue: `${(+previewData.data.allUserFaceOpenNumCountPercentage * 100).toFixed(1)}%`
      })
      setTimeout(() => {
        this.$parent.timedRefresh(this.userData, 'user')
      }, 1000)
    },

    // 产销差分析
    initUserChannelCanvas() {
      if (userChannelData.code !== 0) return
      var charts = {
        unit: ['水量', '率'],
        names: ["出口", "入口"],
        lineX: [
          "2018-11-11 17:01",
          "2018-11-11 17:02",
          "2018-11-11 17:03",
          "2018-11-11 17:04",
          "2018-11-11 17:05",
          "2018-11-11 17:06",
          "2018-11-11 17:07",
          "2018-11-11 17:08",
          "2018-11-11 17:09",
          "2018-11-11 17:10",
          "2018-11-11 17:11",
          "2018-11-11 17:12",
          "2018-11-11 17:13",
          "2018-11-11 17:14",
          "2018-11-11 17:15",
          "2018-11-11 17:16",
          "2018-11-11 17:17",
          "2018-11-11 17:18",
          "2018-11-11 17:19",
          "2018-11-11 17:20",
        ],
        value: [
          [
            451, 352, 303, 534, 95, 236, 217, 328, 159, 151, 231, 192, 453, 524, 165,
            236, 527, 328, 129, 530,
          ],
          [
            360, 545, 80, 192, 330, 580, 192, 80, 250, 453, 352, 28, 625, 345, 65,
            325, 468, 108, 253, 98,
          ],
        ],
      };
      var color = ["rgba(23, 255, 243", "rgba(255,100,97"];
      var lineY = [];

      for (var i = 0; i < charts.names.length; i++) {
        var x = i;
        if (x > color.length - 1) {
          x = color.length - 1;
        }
        var data = {
          name: charts.names[i],
          type: "line",
          color: color[x] + ")",
          yAxisIndex: i,
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: color[x] + ", 0.3)",
                  },
                  {
                    offset: 0.8,
                    color: color[x] + ", 0)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10,
            },
          },
          symbol: "circle",
          symbolSize: 5,
          data: charts.value[i],
        };
        lineY.push(data);

      }
      let myChart = this.$echarts.init(document.getElementById('channelCanvas'))
      let option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: charts.names,
          textStyle: {
            fontSize: 12,
            color: "rgb(0,253,255,0.6)",
          },

          bottom: "0",
        },
        grid: {
          top: "14%",
          left: "4%",
          right: "6%",
          bottom: "12%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: charts.lineX,
          axisLabel: {
            textStyle: {
              color: "rgb(0,253,255,0.6)",
            },
            formatter: function (params) {
              return params.split(" ")[0] + "\n" + params.split(" ")[1];
            },
          },
        },
        yAxis: [{
          name: charts.unit[0],
          type: "value",
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "rgb(0,253,255,0.6)",
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgb(23,255,243,0.3)",
            },
          },
          axisLine: {
            lineStyle: {
              color: "rgb(0,253,255,0.6)",
            },
          },
        }, {
          name: charts.unit[1],
          type: "value",
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "rgb(0,253,255,0.6)",
            },
          },

          axisLine: {
            lineStyle: {
              color: "rgb(0,253,255,0.6)",
            },
          },
        }],

        series: lineY,

      };
      myChart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
.realTimeWatch {
  margin-top: 8px;
  min-height: 250px;
  padding: 0 20px;
  background: rgba(16, 16, 21, 0.6);
  border: 1px solid rgba(56, 155, 255, 0.25);
}

.left-layout {
  transition: all 0.5s;
}

.right-layout {

  transition: all 0.5s;

}
</style>

