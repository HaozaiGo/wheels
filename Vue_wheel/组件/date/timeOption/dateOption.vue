<!--
 * @Author: xiaohao
 * @Date: 2021-07-20 10:30:49
 * @LastEditTime: 2021-11-25 11:23:56
 * @LastEditors: Please set LastEditors
 * @Description:  有范围的日选择器 默认是本月01 - 月尾 包括时分秒
 * @FilePath: \Water-Supply-Drainage\src\components-util\timeOption\dateOption.vue
-->
<template>
  <div>
    <el-date-picker
      v-model="definedTime"
      :type="pickerType"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="timePicker"
      value-format="yyyy-MM-dd HH:mm:ss"
      @change="timeChange"
      :default-time="['00:00:00', '23:59:59']"
    >
    </el-date-picker>
  </div>
</template>

<script>
import commonMethod from "@/utils/common.js";
export default {
  data() {
    
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
            let year = new Date().getFullYear(),
              month = new Date().getMonth(),
              date = new Date().getDate();
              month = month + 1 > 9 ? month + 1 : "0" + (month + 1);
              date = date > 9 ? date : "0" + date;
              const  end =year + '-' + month + '-' + date+" 23:59:59"
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              let year1 = new Date(start).getFullYear(),
              month1 = new Date(start).getMonth(),
              date1 = new Date(start).getDate();
              month1 = month1 + 1 > 9 ? month1 + 1 : "0" + (month1 + 1);
              date1 = date1 > 9 ? date1 : "0" + date1;
              const start1 =year1+ '-' + month1 + '-' + date1+" 00:00:00"
              picker.$emit("pick", [start1, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
            let year = new Date().getFullYear(),
              month = new Date().getMonth(),
              date = new Date().getDate();
              month = month + 1 > 9 ? month + 1 : "0" + (month + 1);
              date = date > 9 ? date : "0" + date;
              const  end =year + '-' + month + '-' + date+" 23:59:59"
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              let year1 = new Date(start).getFullYear(),
              month1 = new Date(start).getMonth(),
              date1 = new Date(start).getDate();
              month1 = month1 + 1 > 9 ? month1 + 1 : "0" + (month1 + 1);
              date1 = date1 > 9 ? date1 : "0" + date1;
              const start1 =year1+ '-' + month1 + '-' + date1+" 00:00:00"
              picker.$emit("pick", [start1, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
            let year = new Date().getFullYear(),
              month = new Date().getMonth(),
              date = new Date().getDate();
              month = month + 1 > 9 ? month + 1 : "0" + (month + 1);
              date = date > 9 ? date : "0" + date;
              const  end =year + '-' + month + '-' + date+" 23:59:59"
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              let year1 = new Date(start).getFullYear(),
              month1 = new Date(start).getMonth(),
              date1 = new Date(start).getDate();
              month1 = month1 + 1 > 9 ? month1 + 1 : "0" + (month1 + 1);
              date1 = date1 > 9 ? date1 : "0" + date1;
              const start1 =year1+ '-' + month1 + '-' + date1+" 00:00:00"
              picker.$emit("pick", [start1, end]);
            },
          },
          {
            text: "最近一年",
            onClick(picker) {
            let year = new Date().getFullYear(),
              month = new Date().getMonth(),
              date = new Date().getDate();
              month = month + 1 > 9 ? month + 1 : "0" + (month + 1);
              date = date > 9 ? date : "0" + date;
              const  end =year + '-' + month + '-' + date+" 23:59:59"
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              let year1 = new Date(start).getFullYear(),
              month1 = new Date(start).getMonth(),
              date1 = new Date(start).getDate();
              month1 = month1 + 1 > 9 ? month1 + 1 : "0" + (month1 + 1);
              date1 = date1 > 9 ? date1 : "0" + date1;
              const start1 =year1+ '-' + month1 + '-' + date1+" 00:00:00"
              picker.$emit("pick", [start1, end]);
            },
          },
        ],
      },
      definedTime: [],
    };
  },
 
  created() {
    this.initTime();
  },
  mounted(){
    setTimeout(() => {
    }, 500);
  },
  props:{
    // 传进来的快捷时间选择
    pickerOption:{
      type:Object,
      default:function(){
        return {}
      }
    },
    // pickType 类型 默认不需要时分秒 
    //‘datetimerange’时分秒
    pickerType:{
      type:String,
      default:'daterange'
    },
    timeType:{
      type:String,
      default:'month'
    },

  },
  computed:{
    timePicker(){
      let isPropOption = Object.keys(this.pickerOption);
      if(isPropOption.length > 0){
        return this.pickerOption
      }else{
        return this.pickerOptions
      }
    }
  },
  methods: {
    initTime() {
      if(this.timeType=='day'){
      this.definedTime[0] = commonMethod.returnToday()+ " 00:00:00";
      this.definedTime[1] = commonMethod.returnToday()+" 23:59:59";
      console.log(this.definedTime[0])
      this.$emit("returnDate", this.definedTime[0], this.definedTime[1]);
      }else{
      this.definedTime[0] = commonMethod.returnMonth() + "-01" + " 00:00:00";
      this.definedTime[1] =
        commonMethod.returnMonth() +
        `-${commonMethod.getDayInMonth(
          new Date().getFullYear(),
          commonMethod.returnMonth()
        )}` +
        " 23:59:59";
      this.$emit("returnDate", this.definedTime[0], this.definedTime[1]);
      }
    },
    timeChange(time) {
      console.log(time)
      this.definedTime[0] = time[0];
      this.definedTime[1] = time[1];
      this.$emit("returnDate", this.definedTime[0], this.definedTime[1]);
    },
  },
  
};
</script>

<style>
</style>