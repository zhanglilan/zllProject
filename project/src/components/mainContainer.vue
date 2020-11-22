<template>
  <div class="mainContainer">
    <div class="relative">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">我的订单</el-breadcrumb-item>
        <!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
      </el-breadcrumb>
      <a class="aExport c-purple font14">导出数据报告</a>
    </div>
    <div class="myOrder">
      <div class="padding15">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="orderNum df ac">
              <div>
                <p class="title">今日待接单数</p>
                <div class="df afe numValue">
                  <p class="font36 font-blod">93</p>
                  <p class="df"><i class="el-icon-caret-top font24"></i><span>29.46%</span></p>
                </div>
              </div>
              <!-- <div><img width="35" height="25" src="../../public/img/logo-icon.png"></div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="orderNum df ac">
              <div>
                <p class="title">今日异常</p>
                <div class="df afe numValue">
                  <p class="font36 font-blod">06</p>
                  <p class="df"><i class="el-icon-caret-top font24"></i><span>29.46%</span></p>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="orderNum df ac">
              <div>
                <p class="title">今日异常</p>
                <div class="df afe numValue">
                  <p class="font36 font-blod">06</p>
                  <p class="df"><i class="el-icon-caret-top font24"></i><span>29.46%</span></p>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="orderNum df ac">
              <div>
                <p class="title">今日异常</p>
                <div class="df afe numValue">
                  <p class="font36 font-blod">06</p>
                  <p class="df"><i class="el-icon-caret-top font24"></i><span>29.46%</span></p>
                </div>
              </div>
            </div>
          </el-col>
          <!-- <el-col :span="10">
              <div class="orderNum">
                <div id="myChart" style="height: 100px;margin-top: -15px;"></div>
              </div>
          </el-col> -->
        </el-row>
        <div class="relative">
          <el-tabs v-model="activeName" class="m-t-b-10">
            <el-tab-pane label="全部订单" name="first">
              <div class="df jsb">
                <el-row>
                  <el-button size="mini" type="primary" icon="el-icon-plus">新建</el-button>
                  <el-button size="mini">接单</el-button>
                  <el-button size="mini">分配</el-button>
                  <el-button size="mini">合并</el-button>
                  <el-select v-model="value" size="mini" filterable placeholder="更多选择" class="m-l-10 width-100">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-row>
                <div class="df ac secrch">
                  <p class="">关键字查询：</p>
                  <el-input width="100" v-model="input" placeholder="请输入内容" size="mini"></el-input>
                  <el-button size="mini">查询</el-button>
                  <el-button size="mini">重置</el-button>
                  <el-button size="mini" type="primary">高级查询</el-button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="待分配" name="second">待分配</el-tab-pane>
            <el-tab-pane label="待接单" name="third">待接单</el-tab-pane>
            <el-tab-pane label="处理中" name="fourth">处理中</el-tab-pane>
            <el-tab-pane label="已完成" name="five">已完成</el-tab-pane>
            <el-tab-pane label="异常" name="six">异常</el-tab-pane>
          </el-tabs>
          <div class="tabPaneOperation">
            <el-link icon="el-icon-s-order" :underline="false" class="m-r-10">随附单据</el-link>
            <el-link icon="el-icon-delete-solid" :underline="false">回收站</el-link>
          </div>
        </div>
        <div>
          <el-table
          :data="tableData"
          align="center"
          tooltip-effect="dark"
          style="width: 100%"
          >
          <el-table-column type="selection" width="55" fixed></el-table-column>
          <el-table-column prop="operation" label="操作" width="80" fixed>
            <template slot-scope="scope">
              <span v-if="scope.row.operation==='0'" class="c-purple">处理</span>
              <span v-if="scope.row.operation==='1'" class="c-purple">分配</span>
              <span v-if="scope.row.operation==='2'" class="c-purple">接单</span>
              <span v-if="scope.row.operation==='3'" class="c-purple">查看</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderStatus" label="订单状态" width="120" fixed
          :filter-method="filterOrderStatus"
          :filters="[{text: '处理中', value: '0'},{text: '待分配', value: '1'},{text: '待接单', value: '2'},{text: '已完成', value: '3'}]">
            <template slot-scope="scope">
              <el-popover
                placement="right"
                width="200"
                trigger="hover"
                >
                <div>
                  <p class="font-500">异常处标题</p>
                  <p class="font12 c-gray">异常内容异常内容异常内容异常内容异常内容异常内容异常内容异常内容</p>
                </div>
                <span class="c-red cursor" slot="reference" v-if="scope.row.orderStatus==='0'">・处理中</span>
              </el-popover>
              <span v-if="scope.row.orderStatus==='1'" class="">待分配</span>
              <span v-if="scope.row.orderStatus==='2'" class="">待接单</span>
              <span v-if="scope.row.orderStatus==='3'" class="">已完成</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderNum" label="订单号" width="180"></el-table-column>
          <el-table-column prop="entrustedClient" label="委托客户" width="240"></el-table-column>
          <el-table-column prop="customerOrderNum" label="客户订单号" width="120"></el-table-column>
          <el-table-column prop="orderNum" label="订单号" width="180"></el-table-column>
          <el-table-column prop="entrustedClient" label="委托客户" width="240"></el-table-column>
          <el-table-column prop="customerOrderNum" label="客户订单号" width="120"></el-table-column>
          <el-table-column prop="orderNum" label="订单号" width="180"></el-table-column>
          <el-table-column prop="entrustedClient" label="委托客户" width="240"></el-table-column>
          <el-table-column prop="customerOrderNum" label="客户订单号" width="120"></el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
    data() {
      return {
        // msg: 'Welcome to Your Vue.js App',
        activeName: 'first',
        value: '',
        options: [{
          value: '选项1',
          label: '打印'
        }, {
          value: '选项2',
          label: '删除'
        }, {
          value: '选项3',
          label: '导入'
        }, {
          value: '选项4',
          label: '导出'
        }],
        tableData: [{
          operation: '0',
          orderStatus: '0',
          orderNum: 'JDL202001011700009',
          entrustedClient: '无锡佳利达供应链管理有限公司',
          customerOrderNum:'CJ10006'
        },
        {
          operation: '1',
          orderStatus: '1',
          orderNum: 'JDL202001011700009',
          entrustedClient: '无锡佳利达供应链管理有限公司',
          customerOrderNum:'CJ10006'
        },
        {
          operation: '2',
          orderStatus: '2',
          orderNum: 'JDL202001011700009',
          entrustedClient: '无锡佳利达供应链管理有限公司',
          customerOrderNum:'CJ10006'
        },
        {
          operation: '3',
          orderStatus: '3',
          orderNum: 'JDL202001011700009',
          entrustedClient: '无锡佳利达供应链管理有限公司',
          customerOrderNum:'CJ10006'
        },
        {
          operation: '3',
          orderStatus: '3',
          orderNum: 'JDL202001011700009',
          entrustedClient: '无锡佳利达供应链管理有限公司',
          customerOrderNum:'CJ10006'
        },
        {
          operation: '3',
          orderStatus: '3',
          orderNum: 'JDL202001011700009',
          entrustedClient: '无锡佳利达供应链管理有限公司',
          customerOrderNum:'CJ10006'
        },
        {
          operation: '3',
          orderStatus: '3',
          orderNum: 'JDL202001011700009',
          entrustedClient: '无锡佳利达供应链管理有限公司',
          customerOrderNum:'CJ10006'
        },
        {
          operation: '3',
          orderStatus: '3',
          orderNum: 'JDL202001011700009',
          entrustedClient: '无锡佳利达供应链管理有限公司',
          customerOrderNum:'CJ10006'
        },
        {
          operation: '3',
          orderStatus: '3',
          orderNum: 'JDL202001011700009',
          entrustedClient: '无锡佳利达供应链管理有限公司',
          customerOrderNum:'CJ10006'
        },
        {
          operation: '3',
          orderStatus: '3',
          orderNum: 'JDL202001011700009',
          entrustedClient: '无锡佳利达供应链管理有限公司',
          customerOrderNum:'CJ10006'
        }]
      }
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      filterOrderStatus(value, row) {
        return row.orderStatus === value;
      },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {
          
        text: '折线图堆叠',
        textStyle:{
          padding:[0,0,0,0],
          fontSize: 12
        }
        
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告'],
        bottom: '0'
    },
    grid: {
    },
    toolbox: {
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [40, 22, 10, 20, 30, 10, 50]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [40, 22, 10, 20, 30, 10, 50]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [40, 22, 10, 20, 30, 10, 50]
        }
    ]
        });
      }
    }

  }
</script>

<style scoped lang="scss">
.aExport{
  position: fixed;
  top:60px;
  right: 10px;
  z-index: 4;
  font-weight: 500;
}
.orderNum{
  background: #fff;
  height: 110px;
  padding: 20px 30px;
}
.orderNum>div{
  margin-right: 50px;
}
.orderNum .title{
  font-size: 14px;
  font-weight: 500;
  text-align: left;
}
.orderNum .numValue p:first-child{
  line-height: initial;
  position: relative;
  top: 5px;
  padding-right: 20px;
}
.orderNum .numValue p:last-child i{
  color: #DE5346;
}
.secrch p{
  width: 80px;
  font-size: 12px;
}
.secrch .el-input.el-input--mini{
  width: 160px;
  margin-right: 10px;
}
.width-100{
  width: 100px;
}
.tabPaneOperation{
  position: absolute;
  right: 10px;
  top: 8px;
}
.tabPaneOperation>a{
  font-size: 12px;
}
</style>
