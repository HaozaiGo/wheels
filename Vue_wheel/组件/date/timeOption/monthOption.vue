<!--
 * @Author: xiaohao
 * @Date: 2021-07-20 10:30:49
 * @LastEditTime: 2021-07-20 11:08:09
 * @LastEditors: Please set LastEditors
 * @Description: 月选择器 ---默认是本月-- 包括时分秒
 * @FilePath: \Water-Supply-Drainage\src\components-util\timeOption\dateOption.vue
-->
<template>
  <div>
    <el-date-picker
          v-model="definedTime"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="yyyy-MM"
          @change="timeChange"
        >
        </el-date-picker>
  </div>
</template>

<script>
import commonMethod from '@/utils/common.js'
export default {
  data(){
    return{
      definedTime:[],
    }
  },
  props:{
    needInit:{
      default:false,
      type:Boolean
    }
  },
  created(){
    this.needInit?this.initTime():false
    
  },
  methods:{
       initTime() {
      this.definedTime[0] = commonMethod.returnMonth() + "-01" + " 00:00:00";
      this.definedTime[1] =
        commonMethod.returnMonth() +
        `-${commonMethod.getDayInMonth(
          new Date().getFullYear(),
          commonMethod.returnMonth()
        )}` +
        " 23:59:59";
      console.log(this.definedTime);
      this.$emit('monthChange',this.definedTime[0],this.definedTime[1])
    },
    timeChange(time){
        let year0 = time[0].slice(0, 4),
          month0 = time[0].slice(5, 7),
          year1 = time[1].slice(0, 4),
          month1 = time[1].slice(5, 7);
        const day0 = commonMethod.getDayInMonth(year0, month0);
        const day1 = commonMethod.getDayInMonth(year1, month1);

        this.definedTime[0] = time[0] + "-" + "01" + " 00:00:00";
        this.definedTime[1] = time[1] + "-" + day1 + " 23:59:59";
      this.$emit('monthChange',this.definedTime[0],this.definedTime[1])
    }
  }
}
</script>

<style>

</style>