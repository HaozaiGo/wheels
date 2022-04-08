<!--
 * @Description: xiaoHao
 * @Date: 2022-03-31 14:37:59
 * @LastEditTime: 2022-04-08 10:40:35
 * @FilePath: \Water-Works-System\src\views\ProductionAndOperationManagementSystem\oneFactory\standardApproval\content.vue
-->
<template>
  <div>
    <Header>
      <!-- tab -->
      <template v-slot:left>
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          style=" margin-left: -20px;"
        >
          <el-tab-pane
            label="代办"
            name="first"
            v-if="controlVersion.isWaitApproval"
          >
            <div></div>
          </el-tab-pane>
          <el-tab-pane
            label="全部"
            name="second"
          >

          </el-tab-pane>
        </el-tabs>

        <el-form :inline="true">
          <el-form-item label="变更版本:">
            <el-select
              v-model="versionNum"
              placeholder="请选择"
              @change="handleChangeVersion"
            >
              <el-option
                v-for="item in versionOptions"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="iconfont iconsousuo"
            >查询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template> {{factoryInfo.factoryName}}</template>
    </Header>
    <ake-table
      :tableList="tableList"
      :height="OverallHeight - 100"
      ref="multipleTable"
      sessionStroageName="standardApproval"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
      :total="tableList.total"
      :loading="loading"
      :screenshow='screenshow'
      :currentPage="form.pageNum"
      :checkbox="true"
      @checkboxList="checkboxList"
    >
      <div slot="header">

        <el-button
          type="primary"
          plain
          @click="handleShowApproval"
          :disabled="selection.length!=1"
        >
          <i
            class="iconfont icontianjia"
            style="color:#1890ff"
          ></i>
          查看
        </el-button>
      </div>
    </ake-table>
    <!-- 拉出标准审批 -->
    <el-drawer
      title="过滤条件"
      :modal="false"
      class="rightDrawer"
      :wrapperClosable="false"
      :modal-append-to-body="false"
      :append-to-body="false"
      :visible.sync="showApproval"
      :direction="'rtl'"
      :size="'100%'"
      :with-header="false"
    >
      <div
        class="backicon"
        style="height: 30px"
      >
        <i
          @click="handleClose"
          class="iconfont iconshangyibu"
        ></i>
        <span @click="handleClose">返回</span>
      </div>
      <!-- content -->
      <div>
        <el-tabs
          v-model="approvalDetailTab"
          @tab-click="handleClick2"
        >
          <el-tab-pane
            label="变更详情"
            name="tab1"
          >
            <!-- 更变内容 -->
            <div
              class="flex-sb"
              style="padding:10px  20px 10px 20px;border-bottom: 1px solid #c8c8c8;margin-bottom:10px"
            >
              <div style="color:rgb(64,158,255)">变更内容</div>
              <div>
                <span
                  v-if="selection.length >0"
                  style="margin-right:40px"
                >变更人:{{selection[0].changeUserName}}</span>
                <span v-if="selection.length >0">联系电话:{{selection[0].changeUserPhone}}</span>
              </div>
            </div>
            <div
              class="flex-sb"
              style="padding: 0px 20px"
            >
              <div>
                <div
                  class="flex "
                  style="width: 300px;"
                >
                  <span
                    class="addFont"
                    style="flex:1"
                  >
                    <span class="tag addSty"></span>
                    新增
                  </span>
                  <span
                    class="editFont"
                    style="flex:1"
                  > <span class="tag editSty"></span>修改</span>
                  <span
                    class="delFont"
                    style="flex:1"
                  > <span class="tag delSty"></span>删除</span>
                </div>
                <p style="margin-top:10px;color:#909399">温馨提示：鼠标悬停修改内容可查看修改详情</p>
              </div>
              <div>
                待审批
              </div>

            </div>

            <el-table
              :data="tableData"
              :span-method="objectSpanMethod"
              border
              style="width: 100%; margin-top: 20px"
            >
              <el-table-column
                prop="targetContent"
                label="标准类型"
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="target1Content"
                label="一级指标"
              >
              </el-table-column>
              <el-table-column label="二级指标">
                <template slot-scope="scope">
                  <el-popover
                    trigger="hover"
                    placement="top"
                  >
                    <p v-if="scope.row.target2ContentModifyTip">更变前:{{ scope.row.target2ContentModifyTip.currentTip }}</p>
                    <p v-if="scope.row.target2ContentModifyTip">更变后:{{ scope.row.target2ContentModifyTip.lastTip }}</p>
                    <p v-else>无变更</p>
                    <div
                      slot="reference"
                      class="name-wrapper"
                      :class="{addSty:scope.row.changeType == 1 && scope.row.target2Content, 
                  'editSty':scope.row.changeType == 2 && scope.row.target2ContentModifyTip && scope.row.target2Content, 
                  'delSty':scope.row.changeType == 3 && scope.row.target2Content}"
                    >

                      <p>{{ scope.row.target2Content }}</p>

                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="集团标准">
                <template slot-scope="scope">
                  <el-popover
                    trigger="hover"
                    placement="top"
                  >
                    <p v-if="scope.row.target2StandardModifyTip">更变前:{{ scope.row.target2StandardModifyTip.currentTip }}</p>
                    <p v-if="scope.row.target2StandardModifyTip">更变后:{{ scope.row.target2StandardModifyTip.lastTip }}</p>
                    <p v-else>无变更</p>
                    <div
                      slot="reference"
                      class="name-wrapper"
                      :class="{addSty:scope.row.changeType == 1 && scope.row.target2Standard, 
                  'editSty':scope.row.changeType == 2  && scope.row.target2StandardModifyTip && scope.row.target2Standard, 
                  'delSty':scope.row.changeType == 3 && scope.row.target2Standard}"
                    >

                      <p>{{ scope.row.target2Standard }}</p>

                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                prop="amount3"
                label="控制指标"
              >
                <el-table-column
                  label="下限值"
                  width="120"
                >
                  <template slot-scope="scope">
                    <el-popover
                      trigger="hover"
                      placement="top"
                    >
                      <p v-if="scope.row.lowerLimitModifyTip">更变前:{{ scope.row.lowerLimitModifyTip.currentTip }}</p>
                      <p v-if="scope.row.lowerLimitModifyTip">更变后:{{ scope.row.lowerLimitModifyTip.lastTip }}</p>
                      <p v-else>无变更</p>
                      <div
                        slot="reference"
                        class="name-wrapper"
                        :class="{addSty:scope.row.changeType == 1 && scope.row.lowerLimit, 
                  'editSty':scope.row.changeType == 2  && scope.row.lowerLimitModifyTip && scope.row.lowerLimit, 
                  'delSty':scope.row.changeType == 3 && scope.row.lowerLimit}"
                      >

                        <p>{{ scope.row.lowerLimit }}</p>

                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column
                  label="上限值"
                  width="120"
                >
                  <template slot-scope="scope">
                    <el-popover
                      trigger="hover"
                      placement="top"
                    >
                      <p v-if="scope.row.upperLimitModifyTip">更变前:{{ scope.row.upperLimitModifyTip.currentTip }}</p>
                      <p v-if="scope.row.upperLimitModifyTip">更变后:{{ scope.row.upperLimitModifyTip.lastTip }}</p>
                      <p v-else>无变更</p>
                      <div
                        slot="reference"
                        class="name-wrapper"
                        :class="{addSty:scope.row.changeType == 1 && scope.row.upperLimit, 
                  'editSty':scope.row.changeType == 2  && scope.row.upperLimitModifyTip && scope.row.upperLimit, 
                  'delSty':scope.row.changeType == 3 && scope.row.upperLimit}"
                      >

                        <p>{{ scope.row.upperLimit }}</p>

                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单位"
                  width="120"
                >
                  <template slot-scope="scope">
                    <el-popover
                      trigger="hover"
                      placement="top"
                    >
                      <p v-if="scope.row.unitModifyTip">更变前:{{ scope.row.unitModifyTip.currentTip }}</p>
                      <p v-if="scope.row.unitModifyTip">更变后:{{ scope.row.unitModifyTip.lastTip }}</p>
                      <p v-else>无变更</p>
                      <div
                        slot="reference"
                        class="name-wrapper"
                        :class="{addSty:scope.row.changeType == 1 && scope.row.unit, 
                  'editSty':scope.row.changeType == 2  && scope.row.unitModifyTip && scope.row.unit, 
                  'delSty':scope.row.changeType == 3 && scope.row.unit}"
                      >

                        <p>{{ scope.row.unit }}</p>

                      </div>
                    </el-popover>
                  </template>
                </el-table-column>

              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
              >
                <template slot-scope="scope">
                  <el-popover
                    trigger="hover"
                    placement="top"
                  >
                    <p v-if="scope.row.remarkModifyTip">更变前:{{ scope.row.remarkModifyTip.currentTip }}</p>
                    <p v-if="scope.row.remarkModifyTip">更变后:{{ scope.row.remarkModifyTip.lastTip }}</p>
                    <p v-else>无变更</p>
                    <div
                      slot="reference"
                      class="name-wrapper"
                      :class="{addSty:scope.row.changeType == 1 && scope.row.remark, 
                  'editSty':scope.row.changeType == 2  && scope.row.remarkModifyTip && scope.row.remark, 
                  'delSty':scope.row.changeType == 3 && scope.row.remark}"
                    >

                      <p>{{ scope.row.remark }}</p>

                    </div>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>

            <!-- 审批填写 -->
            <WriteApproval @handleWriteApproval="handleWriteApproval"></WriteApproval>

          </el-tab-pane>
          <el-tab-pane
            label="过程信息"
            name="tab2"
          >
            <!-- 过程信息 -->
            <div style="overflow:scroll;height:82vh;padding-bottom:100px">
              <el-timeline>
                <el-timeline-item
                  v-for="(item,index) in weeklyInfo"
                  :key="index"
                  :timestamp="item.createTime"
                  placement="top"
                >
                  <el-card>
                    <h4>{{item.title}}</h4>
                    <hr>
                    <p v-if="item.detail1.length!=0 && item.title=='发起审批申请'">
                      {{item.detail1[0].applicants||'申请人姓名'}}{{item.detail1[0].name}}
                      <span style="margin-left:90px"> {{item.detail1[0].phone || '申请人联系电话'}}{{item.detail1[0].phoneNumber}}</span>

                    </p>
                    <p v-if="item.detail1.length!=0 && item.title=='完成审核'">
                      {{item.detail1[0].reviewTitle}}：{{item.detail1[0].name}} <span style="margin-left:90px"> {{item.detail1[0].phoneTitle || '申请人联系电话'}}：{{item.detail1[0].phoneNumber}}</span>
                      <span style="display:block;margin-top:15px">
                        {{item.detail1[0].approvalMarkTitle || '审批备注'}}：{{item.detail1[0].approvalMark}}
                      </span>
                      <span style="display:block;margin-top:15px">
                        {{item.detail1[0].approvalResultTitle || '审批结果'}}：{{item.detail1[0].approvalResult}}
                      </span>
                    </p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>

          </el-tab-pane>
        </el-tabs>

      </div>

    </el-drawer>
  </div>
</template>

<script>
import Header from '@/components/VE_com/header.vue';
import akeTable from "@/components-util/akeTable.vue";
import WriteApproval from '@/components/VE_com/writeApproval.vue'
import { mapGetters } from "vuex"
import { weeklyInfo } from '@/api/water/weeklyApproval/WeeklyApproval.js'
import { getVersion, getApprovalList, ApprovalDetail, writeApproval } from '@/api/water/zhongxin/standardApproval.js'
export default {
  data () {
    return {
      loading: false,
      activeName: '',
      screenshow: true,
      form: { pageNum: 1 },
      versionNum: '',
      versionOptions: [],  //版本控制
      selection: [],
      showApproval: false,
      controlVersion: {

      },
      weeklyInfo: [],
      approvalDetailTab: 'tab1',
      tableList: {
        total: 0,
        tableData: [],
        tr: [
          {
            index: 0,
            label: "变更版本",
            prop: "ver",
            isShow: true,
          },
          {
            index: 1,
            label: "变更人",
            prop: "changeUserName",
            isShow: true,
          },
          {
            index: 2,
            label: "变更人联系电话",
            prop: "changeUserPhone",
            isShow: true,
          },
          {
            index: 3,
            label: "变更人时间",
            prop: 'changeTime',
            isShow: true,
          },
        ],
      },
      tableData: [{
        id: '工艺指标1',
        name: '水量管理指标1',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '工艺指标1',
        name: '水量管理指标1',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '工艺指标2',
        name: '水量管理指标',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '工艺指标23',
        name: '设备管理指标123',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '工艺指标',
        name: '设备管理指标',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      },
      {
        id: '工艺指标',
        name: '设备管理指标',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      },
      {
        id: '工艺指标',
        name: '设备管理指标',
        amount1: '339',
        amount2: '4.1',
        amount3: 15
      }
      ]
    }
  },

  props: ['factoryInfo'],
  watch: {
    factoryInfo: function () {
      this.approvalList();
    },

    activeName: function (val) {
      if (val === 'second') {
        this.tableList.tr.push({
          index: 4,
          label: "审批状态",
          prop: "remark",
          "min-width": 100,
          isShow: true,
        })
      } else {
        this.tableList.tr.pop()
      }
    }
  },
  components: {
    Header, akeTable, WriteApproval
  },
  computed: {
    ...mapGetters({
      OverallHeight: "settings/OverallHeight"
    })
  },
  mounted () {
    this.getVersionList();

    this.initData();
    this.approvalList();

  },
  methods: {



    async getVersionList () {
      const res = await getVersion(this.factoryInfo.factoryId)

      this.controlVersion = res.data;
      // 控制头部tab
      if (this.controlVersion.isWaitApproval) {
        this.activeName = 'first'
      } else {
        this.activeName = 'second';
        this.tableList.tr = [
          {
            index: 0,
            label: "变更版本",
            prop: "ver",
            isShow: true,
          },
          {
            index: 1,
            label: "变更人",
            prop: "changeUserName",
            isShow: true,
          },
          {
            index: 2,
            label: "变更人联系电话",
            prop: "changeUserPhone",
            isShow: true,
          },
          {
            index: 3,
            label: "变更人时间",
            prop: 'changeTime',
            isShow: true,
          },
          // {
          //   index: 4,
          //   label: "审批状态",
          //   prop: "remark",
          //   "min-width": 100,
          //   isShow: true,
          // }
        ]
      }
      // 控制版本信息
      if (this.controlVersion.isWaitApproval && this.activeName == 'first') {
        this.versionOptions = this.controlVersion.waitApprovalVerList
      } else (
        this.versionOptions = this.controlVersion.allApprovalVerList
      )

      // console.log(this.controlVersion)

    },

    async approvalList () {
      let body = {
        factoryId: this.factoryInfo.factoryId,
        ver: this.versionNum
      }
      const res = await getApprovalList(body)
      console.log(res)
      this.tableList.tableData = res.rows;
      this.tableList.total = res.total;
    },
    handleClick (tab, e) {
      console.log(tab, e)
    },
    async handleClick2 (tab, e) {
      if (tab.index == 1) {
        const body = { prodId: this.selection[0].prodId };
        const res = await weeklyInfo(body);
        res.rows.forEach(item => {
          if (item.detail != '') {
            item.detail1 = []
            item.detail1.push(JSON.parse(item.detail))
          } else {
            item.detail1 = []
          }

          console.log(item)
        })
        console.log(this.weeklyInfo)
        this.weeklyInfo = res.rows;

      }
      console.log(tab.index, e)
    },
    handleCurrentChange () { },
    handleSizeChange () { },
    checkboxList (val) {


      this.selection = [];
      this.selection = val
      console.log(this.selection)
    },
    // 查看详情
    async handleShowApproval () {
      this.showApproval = true;
      let body = {
        factoryId: this.selection[0].factoryId,
        prodId: this.selection[0].prodId,
        verSeq: this.selection[0].verSeq
      }
      // let body = {
      //   prodId: 2,
      //   factoryId: 1,

      //   verSeq: 2
      // }
      const res = await ApprovalDetail(body)

      this.tableData = res.data
      console.log(res)
    },
    handleClose () { this.showApproval = false },

    //初始data数组
    initData () {
      // this.tableData.splice(0, 0, this.tableData[0])
    },
    handleChangeVersion () {
      this.approvalList()
    },
    async handleWriteApproval (val) {
      let body = {
        prodId: this.selection[0].prodId,
        ...val

      }
      const res = await writeApproval(body)
      console.log(res)
      res.code == 200 ? this.$message.success(res.msg) : this.$message.error(res.msg)


    },


    // 计算合并列
    countColumn (name) {
      let columnArr = [];
      let contactDot = 0;

      // console.log(this.tableData)
      // 处理当只有一条的时候
      if (this.tableData.length == 1) {
        return [1]
      }
      for (let i = 1; i < this.tableData.length; i++) {
        columnArr.push(1)
        try {

          if (this.tableData[i][name] != this.tableData[i - 1][name]) {

            // columnArr[i - 1] = 1;
            columnArr[contactDot] += 0.5;
            contactDot = i;
          }
          if (this.tableData[i][name] == this.tableData[i - 1][name]) {

            columnArr[contactDot] += 1;

          }
        } catch (err) {
          console.log(err)
        }

      }
      // 过滤 
      let res = columnArr.filter((x, index) => {


        return x

      })
      // console.log(res)
      return res
    },

    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {

      if (columnIndex === 0) {

        let sameColumn = this.countColumn('id')
        // console.log(rowIndex)
        // console.log(sameColumn)
        //处理最后一行
        if (rowIndex === this.tableData.length - 1 && sameColumn[rowIndex] === 1) {
          console.log('last')
          return {
            rowspan: 1,
            colspan: 1
          }
        }
        // 处理第一行
        else if (rowIndex === 0 && sameColumn[rowIndex] === 1) {
          return {
            rowspan: 1,
            colspan: 1
          }
        }
        else {
          return {
            rowspan: sameColumn[rowIndex],
            colspan: sameColumn[rowIndex] > 1 ? 1 : 0
            // colspan: sameColumn[rowIndex] > 1 ? 1 : 0
          }
        }
      }

      if (columnIndex === 1) {
        let sameColumn = this.countColumn('name')
        // console.log(rowIndex)
        console.log(sameColumn)
        //处理最后一行
        if (rowIndex === this.tableData.length - 1 && sameColumn[rowIndex] === 1) {
          console.log('last')
          return {
            rowspan: 1,
            colspan: 1
          }
        }
        // 处理第一行
        else if (rowIndex === 0 && sameColumn[rowIndex] === 1) {
          return {
            rowspan: 1,
            colspan: 1
          }
        }
        else {
          return {
            rowspan: sameColumn[rowIndex],
            colspan: sameColumn[rowIndex] > 1 ? 1 : 0
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.el-table >>> .el-table__body-wrapper td {
  padding: 0px;
}
.el-table >>> .cell {
  padding: 0px !important;
}
.cell p {
  padding: 5px;
}
.el-table td {
  padding: 0px !important;
}
.el-tag {
  background-color: #fff;
  border: none;
}
.el-popover {
  background: initial !important;
}
.woms-white tbody .cell span {
  height: 100%;
  width: 100%;
  color: inherit !important;
}
/* 新增样式 */
.addSty {
  background: rgb(103, 194, 58);
}
.addFont {
  color: rgb(103, 194, 58);
}
/* 编辑样式 */
.editSty {
  background: rgb(245, 108, 108);
}
.editFont {
  color: rgb(245, 108, 108);
}
/* 删除样式 */
.delSty {
  background: rgb(144, 147, 153);
}
.delFont {
  color: rgb(144, 147, 153);
}
.tag {
  display: inline-block;
  width: 25px;
  height: 10px;
  border-radius: 3px;
  margin-right: 5px;
}
</style>