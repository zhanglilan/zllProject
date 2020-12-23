<template>
  <div class="mainContainer">
    <div class="relative">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">我的订单</el-breadcrumb-item>
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
        </el-row>
        <div class="relative">
          <el-tabs v-model="activeName" class="m-t-b-10">
            <el-tab-pane label="全部订单" name="first"></el-tab-pane>
            <el-tab-pane label="待接单" name="second"></el-tab-pane>
            <el-tab-pane label="处理中" name="third"></el-tab-pane>
            <el-tab-pane label="已完成" name="fourth"></el-tab-pane>
            <el-tab-pane label="异常" name="five"></el-tab-pane>
          </el-tabs>
          <div class="tabPaneOperation">
            <el-link icon="el-icon-s-order" :underline="false" class="m-r-10">随附单据</el-link>
            <el-link icon="el-icon-delete-solid" :underline="false">回收站</el-link>
          </div>
        </div>
        <div class="df jsb m-b-10">
          <el-row>
            <!--如需禁用增加 disabled 即可-->
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="orderDetails()">新建</el-button>
            <el-button size="mini" @click="orderDetails()">编辑</el-button>
            <el-button size="mini" @click="orderTaking()">接单</el-button>
            <el-button size="mini" @click="assign = true">指派</el-button>
            <el-button size="mini" @click="copy = true">复制</el-button>
            <el-button size="mini" @click="documentBinding = true">单证绑定</el-button>
            <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              更多选择<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="exception = true">提交异常</el-dropdown-item>
              <el-dropdown-item @click.native="toVoid = true">作废</el-dropdown-item>
              <el-dropdown-item>打印</el-dropdown-item>
              <el-dropdown-item>导出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
            <!-- <el-select v-model="value" size="mini" filterable placeholder="更多选择" class="m-l-10 width-100">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
          </el-row>
          <div class="df ac secrch">
            <p class="">关键字查询：</p>
            <el-input width="100" v-model="searchInput" placeholder="请输入内容" size="mini"></el-input>
            <el-button size="mini">查询</el-button>
            <el-button size="mini">重置</el-button>
            <el-button size="mini">高级查询</el-button>
          </div>
        </div>
        <div>
          <el-table
          border
          :data="orderTableData"
          align="center"
          tooltip-effect="dark"
          style="width: 100%"
          >
          <el-table-column type="selection" width="55" fixed></el-table-column>
          <el-table-column prop="operation" label="操作" width="60" fixed>
            <template slot-scope="scope">
              <span v-if="scope.row.operation==='0'" class="c-purple cursor"  @click="orderDetails()">处理</span>
              <span v-if="scope.row.operation==='1'" class="c-purple cursor">接单</span>
              <span v-if="scope.row.operation==='2'" class="c-purple cursor">查看</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderState" label="订单状态" width="120" fixed
          :filter-method="filterOrderState"
          :filters="[{text: '处理中', value: '0'},{text: '待接单', value: '1'},{text: '已完成', value: '2'}]">
            <template slot-scope="scope">
              <el-popover
                placement="right"
                width="310"
                trigger="hover"
                >
                <div>
                  <el-tabs v-model="abnormalTip" class="abnormalTip">
                    <el-tab-pane label="异常待处理" name="first">
                      <ol>
                        <li class="font12 c-gray">表头毛重01(1.毛重不得小于1)</li>
                        <li class="font12 c-gray">航次04(1.当报关单类型为002，转关单类型为001，运输方式非2、3、4、6时，此栏目为空)</li>
                        <li class="font12 c-gray">表头毛重01(1.毛重不得小于1)</li>
                        <li class="font12 c-gray">航次04(1.当报关单类型为002，转关单类型为001，运输方式非2、3、4、6时，此栏目为空)</li>
                      </ol>
                    </el-tab-pane>
                    <el-tab-pane label="异常提示" name="second">
                      <ol>
                        <li class="font12 c-gray">异常提示问题1</li>
                        <li class="font12 c-gray">异常提示问题2</li>
                      </ol>
                    </el-tab-pane>
                  </el-tabs>
                </div>
                <span class="c-red cursor" slot="reference" v-if="scope.row.orderState==='0'">・处理中</span>
              </el-popover>
              <span v-if="scope.row.orderState==='1'" class="">待接单</span>
              <span v-if="scope.row.orderState==='2'" class="">已完成</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderNo" label="订单号" width="150">
             <template slot-scope="scope">
              <span  class="cursor"  @click="orderDetails()">{{scope.row.orderNo}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="customerIDNo" label="客户识别号" width="200"></el-table-column>
          <el-table-column prop="clientCode" label="委托客户" width="200"></el-table-column>
          <el-table-column prop="settleCode" label="结算客户" width="200"></el-table-column>
          <el-table-column prop="bizType" label="业务类型" width="120"></el-table-column>
          <el-table-column prop="serviceRqrmnt" label="服务要求" width="100">
            <template slot-scope="scope">
              <el-popover
                  placement="right"
                  width="450"
                  trigger="hover"
                  >
                  <div class="serviceRequirementTip cursor">
                    <el-table :data="gridData" :show-header="false" :row-style="tableRowClass" @row-click="clickData">
                        <el-table-column property="orderNum" label=""></el-table-column>
                        <el-table-column width="100" property="customerOrderNum" label=""></el-table-column>
                        <el-table-column width="80" property="inventory" label=""></el-table-column>
                        <el-table-column width="60" property="examine" label=""></el-table-column>
                        <el-table-column width="50" property="seconds" label=""></el-table-column>
                      </el-table>
                  </div>
                  <span slot="reference" class="cursor">{{scope.row.serviceRqrmnt}}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="orderCreationDate" sortable label="订单创建时间" width="120"></el-table-column>
          <el-table-column prop="tradeCode" label="境内收发货人" width="120"></el-table-column>
          <el-table-column prop="ownerCode" label="消费使用单位/生产销售单位 " width="200"></el-table-column>
          <el-table-column prop="specServiceRqrmnt" label="特殊服务要求" width="120">
            <template slot-scope="scope">
              <el-popover
                  placement="right"
                  width="200"
                  trigger="hover"
                  >
                  <p class="font12 c-gray">这里是特殊服务要求文字说明这里是特殊服务要求文字说明这里是特殊服务要求文字说明这里是特殊服务要求文字说明</p>
                  <span slot="reference" class="cursor">{{scope.row.specServiceRqrmnt}}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="associatedOrderNo" label="关联订单号" width="200">
            <template slot-scope="scope">
              <el-popover
                  placement="right"
                  width="150"
                  trigger="hover"
                  >
                  <div class="serviceRequirementTip cursor">
                    <el-table :data="gridData" :show-header="false" :row-style="tableRowClass" @row-click="clickData">
                        <el-table-column property="orderNum" label=""></el-table-column>
                      </el-table>
                  </div>
                  <span slot="reference" class="cursor">{{scope.row.associatedOrderNo}}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="opeRate" label="业务操作地" width="120"></el-table-column>
          <el-table-column prop="PMT" label="项目管理组" width="120"></el-table-column>
          <el-table-column prop="goodFlow" label="货物流向" width="120"></el-table-column>
          <el-table-column prop="rqstReleaseDate" sortable label="要求放行时间" width="120"></el-table-column>
          <el-table-column prop="uRent" label="是否加急" width="120"></el-table-column>
          <el-table-column prop="urentRemark" label="加急原因" width="120"></el-table-column>
          <el-table-column prop="receiveMan" label="接单人员" width="120"></el-table-column>
          <el-table-column prop="receiveDate" sortable label="接单日期" width="120"></el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>
    <!--指派弹窗-->
    <el-dialog
      title="任务指派"
      :visible.sync="assign"
      width="40%"
      >
      <el-form :inline="true" label-width="90px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item size="small" label="委托客户" class="df">
               <el-select v-model="entrustedClient" filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in entrustedClientOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item size="small" label="项目组" class="df">
               <el-select v-model="projectGroup" filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in projectGroupOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item size="small" label="业务类型" class="df m-b-0">
               <el-select v-model="businessType" filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in businessTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item size="small" label="服务要求" class="df m-b-0">
               <el-select v-model="serviceRequirement" filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in serviceRequirementOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="assign = false">取 消</el-button>
        <el-button type="primary" @click="assign = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--复制弹窗-->
    <el-dialog
      title="订单复制"
      :visible.sync="copy"
      width="30%"
      >
      <div class="df ac jc">
        <span>复制当前订单</span>
        <el-autocomplete
          size="small"
          class="m-l-r-10"
          popper-class="my-autocomplete"
          v-model="state"
          clearable
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          >
          <i
            class="el-icon-edit el-input__icon"
            slot="suffix"
            >
          </i>
          <template slot-scope="{ item }">
            <div class="name">{{ item.value }}</div>
            <span class="addr">{{ item.address }}</span>
          </template>
        </el-autocomplete>
        <span>票</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="copy = false">取 消</el-button>
        <el-button type="primary" @click="copy = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--单证绑定弹窗-->
    <el-dialog width="85%" title="单证绑定" :visible.sync="documentBinding">
        <el-dialog
          width="85%"
          title="匹配与报关单关联的核注清单"
          :visible.sync="innerDocumentBinding"
          append-to-body>
          <el-form :inline="true" label-width="120px" class="formLine">
            <el-row>
              <el-col :span="6">
                <el-form-item size="small" label="客户识别号" class="df">
                  <el-input
                    placeholder="请输入内容"
                    v-model="customerIDNo"
                    clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item size="small" label="单证号" class="df">
                  <el-input
                    placeholder="请输入内容"
                    v-model="orderNo"
                    clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item size="small" label="收发货人" class="df">
                  <el-select v-model="consignee" filterable clearable placeholder="请选择">
                    <el-option
                      v-for="item in consigneeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>`
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item size="small" label="进出口类型" class="df">
                  <el-select v-model="ieFlag" filterable clearable placeholder="请选择">
                    <el-option
                      v-for="item in ieFlagOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>`
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item size="small" label="运输方式" class="df m-b-0">
                  <el-select v-model="trafMode" filterable clearable placeholder="请选择">
                    <el-option
                      v-for="item in trafModeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>`
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item size="small" label="创建时间" class="df m-b-0">
                  <el-date-picker
                    class="width100"
                    v-model="creationDate1"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8" class="m-b-0">
                <el-button size="small" type="primary" icon="el-icon-search">查询</el-button>
                <el-button size="small" icon="el-icon-refresh-right">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
          <el-table
            ref="multipleTable"
            :data="matchingTableData"
            tooltip-effect="dark"
            height="240"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column prop="customerIDNo" label="客户识别号"></el-table-column>
            <el-table-column prop="orderNo" label="单证号"></el-table-column>
            <el-table-column prop="consignee" label="收发货人"></el-table-column>
            <el-table-column prop="ieFlag" label="进出口类型"></el-table-column>
            <el-table-column prop="trafMode" label="运输方式"></el-table-column>
            <el-table-column prop="creationDate" label="创建时间"></el-table-column>
          </el-table>
          <div class="text-right m-t-b-10">
          <el-button @click="innerDocumentBinding = false">取 消</el-button>
          <el-button type="primary" @click="innerDocumentBinding = false">确 定</el-button>
          </div>
        </el-dialog>
        <el-form :inline="true" label-width="120px" class="formLine">
          <el-row>
            <el-col :span="8">
              <el-form-item size="small" label="客户识别号" class="df">
                <el-input
                  placeholder="请输入内容"
                  v-model="customerIDNo"
                  clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item size="small" label="收发货人" class="df">
                <el-select v-model="consignee" filterable clearable placeholder="请选择">
                  <el-option
                    v-for="item in consigneeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>`
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item size="small" label="进出口类型" class="df">
                <el-select v-model="ieFlag" filterable clearable placeholder="请选择">
                  <el-option
                    v-for="item in ieFlagOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>`
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item size="small" label="创建时间" class="df m-b-0">
                <el-date-picker
                  class="width100"
                  v-model="creationDate"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="m-b-0">
              <el-button size="small" type="primary" icon="el-icon-search">查询</el-button>
              <el-button size="small" icon="el-icon-refresh-right">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-row :gutter="40" class="documentsTab">
          <el-col :span="12" class="">
            <p class="m-b-10">已绑定订单单证</p>
            <el-table
              :data="boundTableData"
              height="240"
              >
              <el-table-column prop="HZCustIDNo" label="核注清单客户识别号" width="140"></el-table-column>
              <el-table-column prop="HZDocNo" label="核注清单单证号" width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.HZDocNo==='0'" class="cursor" @click="innerDocumentBinding = true">HZQD00001</span>
                  <span v-if="scope.row.HZDocNo==='1'" class="cursor" @click="innerDocumentBinding = true">去匹配</span>
                </template>
              </el-table-column>
              <el-table-column prop="BGCustIDNo" label="报关单客户识别号" width="140"></el-table-column>
              <el-table-column prop="BGDocNo" label="报关单单证号" width="120"></el-table-column>
              <el-table-column prop="customerIDNo" fixed="right" label="操作" width="180">
                <template slot-scope="">
                  <el-button type="text" size="small">绑定订单</el-button>
                  <el-button type="text" size="small">拆分已关联单证</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="12" class="">
            <p class="m-b-10">未绑定订单单证</p>
            <el-table
              :data="unboundTableData"
              height="240"
              >
              <el-table-column prop="HZCustIDNo" label="核注清单客户识别号" width="140"></el-table-column>
              <el-table-column prop="HZDocNo" label="核注清单单证号" width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.HZDocNo==='0'" class="cursor" @click="innerDocumentBinding = true">HZQD00001</span>
                  <span v-if="scope.row.HZDocNo==='1'" class="cursor" @click="innerDocumentBinding = true">去匹配</span>
                </template>
              </el-table-column>
              <el-table-column prop="BGCustIDNo" label="报关单客户识别号" width="140"></el-table-column>
              <el-table-column prop="BGDocNo" label="报关单单证号" width="120"></el-table-column>
              <el-table-column prop="customerIDNo" fixed="right" label="操作" width="180">
                <template slot-scope="">
                  <el-button type="text" size="small">取消订单绑定</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="documentBinding = false">取 消</el-button>
        <el-button type="primary" @click="innerDocumentBinding = true">确 定</el-button>
      </div>
    </el-dialog>
    <!--作废弹窗-->
    <el-dialog
      title="作废"
      :visible.sync="toVoid"
      width="30%"
      >
      <div class="df jc">
        <i class="el-icon-warning-outline c-purple font18 m-t-3 m-r-5"></i>
        <span>请确认是否可以删除此订单？<br>
        订单号：JDL202001011700009
        </span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="toVoid = false">取 消</el-button>
        <el-button type="primary" @click="toVoid = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--提交异常弹窗-->
    <el-dialog
      title="提交异常"
      :visible.sync="exception"
      width="40%"
      >
      <el-form :inline="true" label-width="120px" class="">
        <el-row>
        <el-col :span="24">
              <el-form-item size="small" label="异常原因" class="df">
                <el-select v-model="abnormalCauses" filterable clearable placeholder="请选择">
                  <el-option
                    v-for="item in abnormalCausesOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>`
                </el-select>
              </el-form-item>
            </el-col>
          <el-col :span="24">
            <el-form-item size="small" label="指定处理人" class="df">
              <el-input
                placeholder="请输入内容"
                v-model="handler"
                clearable>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item size="small" label="上传附件" class="df">
              <el-upload
                class="width100"
                action="https://jsonplaceholder.typicode.com/posts/"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button class="width100" size="small" icon="el-icon-upload" type="primary">选择文件上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
           <el-col :span="24">
            <el-form-item size="small" label="备注" class="df">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6}"
                placeholder="请输入内容"
                v-model="remarks">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exception = false">取 消</el-button>
        <el-button type="primary" @click="exception = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
export default {
    data() {
      return {
        remarks:'',
        upload:'',
        abnormalCauses:'',
        handler:'',
        trafMode:'',
        creationDate:'',
        creationDate1:'',
        consignee:'',
        ieFlag:'',
        customerIDNo:'',
        restaurants: [],
        state: '',
        orderNo: '',
        entrustedClient:'',
        projectGroup:'',
        businessType:'',
        serviceRequirement:'',
        assign: false,
        copy: false,
        toVoid: false,
        exception: false,
        documentBinding: false,
        innerDocumentBinding: false,
        activeName: 'first',
        abnormalTip: 'first',
        value: '',
        searchInput:'',
        matchingTableData: [{
          customerIDNo: 'W1JCI202010000001',
          orderNo: 'HZQD00001',
          consignee: '收发货人',
          ieFlag: '进出口类型',
          trafMode: '运输方式',
          creationDate: '2020-12-12'
        },{
          customerIDNo: 'W1JCI202010000001',
          orderNo: 'HZQD00001',
          consignee: '收发货人',
          ieFlag: '进出口类型',
          trafMode: '运输方式',
          creationDate: '2020-12-12'
        }],
        multipleSelection: [],
        boundTableData:[{
          HZCustIDNo: 'W1JCI202010000001',
          HZDocNo: '0',
          BGCustIDNo: 'WXJD202010000001',
          BGDocNo: 'BGD00001',
          customerIDNo: ''
        }, {
          HZCustIDNo: 'W1JCI202010000001',
          HZDocNo: '0',
          BGCustIDNo: 'WXJD202010000001',
          BGDocNo: 'BGD00001',
          customerIDNo: ''
        }, {
          HZCustIDNo: 'W1JCI202010000001',
          HZDocNo: '1',
          BGCustIDNo: 'WXJD202010000001',
          BGDocNo: 'BGD00001',
          customerIDNo: ''
        }, {
          HZCustIDNo: 'W1JCI202010000001',
          HZDocNo: '1',
          BGCustIDNo: 'WXJD202010000001',
          BGDocNo: 'BGD00001',
          customerIDNo: ''
        }, {
          HZCustIDNo: 'W1JCI202010000001',
          HZDocNo: '1',
          BGCustIDNo: 'WXJD202010000001',
          BGDocNo: 'BGD00001',
          customerIDNo: ''
        }, {
          HZCustIDNo: 'W1JCI202010000001',
          HZDocNo: '1',
          BGCustIDNo: 'WXJD202010000001',
          BGDocNo: 'BGD00001',
          customerIDNo: ''
        }],
        unboundTableData:[{
          HZCustIDNo: 'W1JCI202010000001',
          HZDocNo: '0',
          BGCustIDNo: 'WXJD202010000001',
          BGDocNo: 'BGD00001',
          customerIDNo: ''
        }, {
          HZCustIDNo: 'W1JCI202010000001',
          HZDocNo: '1',
          BGCustIDNo: 'WXJD202010000001',
          BGDocNo: 'BGD00001',
          customerIDNo: ''
        }],
        gridData:[{
          orderNum: 'W1JCI202010000001',
          customerOrderNum: 'CJ10001_1',
          inventory: '核注清单',
          examine: '审单中',
          seconds: '15S'
        }, {
          orderNum: 'W1JCI202010000001',
          customerOrderNum: 'CJ10001_1',
          inventory: '核注清单',
          examine: '审单中',
          seconds: '15S'
        }, {
          orderNum: 'W1JCI202010000001',
          customerOrderNum: 'CJ10001_1',
          inventory: '核注清单',
          examine: '审单中',
          seconds: '0S'
        }, {
          orderNum: 'W1JCI202010000001',
          customerOrderNum: 'CJ10001_1',
          inventory: '核注清单',
          examine: '审单中',
          seconds: '0S'
        }],
        entrustedClientOptions: [{
          value: '选项1',
          label: '委托客户1'
        }, {
          value: '选项2',
          label: '委托客户2'
        }],
        projectGroupOptions: [{
          value: '选项1',
          label: '项目组1'
        }, {
          value: '选项2',
          label: '项目组2'
        }],
        businessTypeOptions: [{
          value: '选项1',
          label: '业务类型1'
        }, {
          value: '选项2',
          label: '业务类型2'
        }],
        serviceRequirementOptions: [{
          value: '选项1',
          label: '服务要求1'
        }, {
          value: '选项2',
          label: '服务要求2'
        }],
        consigneeOptions: [{
          value: '选项1',
          label: '收货人1'
        }, {
          value: '选项2',
          label: '收货人2'
        }],
        ieFlagOptions: [{
          value: '选项1',
          label: '进出口类型1'
        }, {
          value: '选项2',
          label: '进出口类型2'
        }],
        trafModeOptions: [{
          value: '选项1',
          label: '运输方式1'
        }, {
          value: '选项2',
          label: '运输方式2'
        }],
        abnormalCausesOptions: [{
          value: '选项1',
          label: '系统预设原因1'
        }, {
          value: '选项2',
          label: '系统预设原因2'
        }],
        options: [{
          value: '选项1',
          label: '提交异常'
        }, {
          value: '选项2',
          label: '打印'
        }, {
          value: '选项3',
          label: '作废'
        }, {
          value: '选项4',
          label: '导出'
        }],
        orderTableData: [{
          operation: '0',
          orderState: '0',
          orderNo: 'JDL202001011700009',
          customerIDNo: 'JDL202001011700009',
          clientCode: '无锡佳利达供应链管理有限公司',
          settleCode: '无锡佳利达供应链管理有限公司',
          bizType: '业务类型',
          serviceRqrmnt: '查看明细',
          orderCreationDate: '2020-12-10',
          tradeCode: '李小米',
          ownerCode: '单位一',
          specServiceRqrmnt: '特殊服务要求',
          associatedOrderNo: 'GLJDL202001011700009',
          opeRate: '业务操作地',
          PMT: 'PMT',
          goodFlow: '货物流向',
          rqstReleaseDate: '2020-12-19',
          uRent: '是',
          urentRemark: '加急原因是...',
          receiveMan: '张小米',
          receiveDate: '2020-12-10',
        },
        {
          operation: '1',
          orderState: '1',
          orderNo: 'JDL202001011700009',
          customerIDNo: 'JDL202001011700009',
          clientCode: '无锡佳利达供应链管理有限公司',
          settleCode: '无锡佳利达供应链管理有限公司',
          bizType: '业务类型',
          serviceRqrmnt: '查看明细',
          orderCreationDate: '2020-12-10',
          tradeCode: '李小米',
          ownerCode: '单位一',
          specServiceRqrmnt: '特殊服务要求',
          associatedOrderNo: 'GLJDL202001011700009',
          opeRate: '业务操作地',
          PMT: 'PMT',
          goodFlow: '货物流向',
          rqstReleaseDate: '2020-12-19',
          uRent: '是',
          urentRemark: '加急原因是...',
          receiveMan: '张小米',
          receiveDate: '2020-12-12',
        },
        {
          operation: '2',
          orderState: '2',
          orderNo: 'JDL202001011700009',
          customerIDNo: 'JDL202001011700009',
          clientCode: '无锡佳利达供应链管理有限公司',
          settleCode: '无锡佳利达供应链管理有限公司',
          bizType: '业务类型',
          serviceRqrmnt: '查看明细',
          orderCreationDate: '2020-12-10',
          tradeCode: '李小米',
          ownerCode: '单位一',
          specServiceRqrmnt: '特殊服务要求',
          associatedOrderNo: 'GLJDL202001011700009',
          opeRate: '业务操作地',
          PMT: 'PMT',
          goodFlow: '货物流向',
          rqstReleaseDate: '2020-12-19',
          uRent: '是',
          urentRemark: '加急原因是...',
          receiveMan: '张小米',
          receiveDate: '2020-12-12',
        },
        {
          operation: '2',
          orderState: '2',
          orderNo: 'JDL202001011700009',
          customerIDNo: 'JDL202001011700009',
          clientCode: '无锡佳利达供应链管理有限公司',
          settleCode: '无锡佳利达供应链管理有限公司',
          bizType: '业务类型',
          serviceRqrmnt: '查看明细',
          orderCreationDate: '2020-12-10',
          tradeCode: '李小米',
          ownerCode: '单位一',
          specServiceRqrmnt: '特殊服务要求',
          associatedOrderNo: 'GLJDL202001011700009',
          opeRate: '业务操作地',
          PMT: 'PMT',
          goodFlow: '货物流向',
          rqstReleaseDate: '2020-12-19',
          uRent: '是',
          urentRemark: '加急原因是...',
          receiveMan: '张小米',
          receiveDate: '2020-12-12',
        },
        {
          operation: '2',
          orderState: '2',
          orderNo: 'JDL202001011700009',
          customerIDNo: 'JDL202001011700009',
          clientCode: '无锡佳利达供应链管理有限公司',
          settleCode: '无锡佳利达供应链管理有限公司',
          bizType: '业务类型',
          serviceRqrmnt: '查看明细',
          orderCreationDate: '2020-12-10',
          tradeCode: '李小米',
          ownerCode: '单位一',
          specServiceRqrmnt: '特殊服务要求',
          associatedOrderNo: 'GLJDL202001011700009',
          opeRate: '业务操作地',
          PMT: 'PMT',
          goodFlow: '货物流向',
          rqstReleaseDate: '2020-12-19',
          uRent: '是',
          urentRemark: '加急原因是...',
          receiveMan: '张小米',
          receiveDate: '2020-12-12',
        },
        {
          operation: '2',
          orderState: '2',
          orderNo: 'JDL202001011700009',
          customerIDNo: 'JDL202001011700009',
          clientCode: '无锡佳利达供应链管理有限公司',
          settleCode: '无锡佳利达供应链管理有限公司',
          bizType: '业务类型',
          serviceRqrmnt: '查看明细',
          orderCreationDate: '2020-12-10',
          tradeCode: '李小米',
          ownerCode: '单位一',
          specServiceRqrmnt: '特殊服务要求',
          associatedOrderNo: 'GLJDL202001011700009',
          opeRate: '业务操作地',
          PMT: 'PMT',
          goodFlow: '货物流向',
          rqstReleaseDate: '2020-12-19',
          uRent: '是',
          urentRemark: '加急原因是...',
          receiveMan: '张小米',
          receiveDate: '2020-12-12',
        },
        {
          operation: '2',
          orderState: '2',
          orderNo: 'JDL202001011700009',
          customerIDNo: 'JDL202001011700009',
          clientCode: '无锡佳利达供应链管理有限公司',
          settleCode: '无锡佳利达供应链管理有限公司',
          bizType: '业务类型',
          serviceRqrmnt: '查看明细',
          orderCreationDate: '2020-12-10',
          tradeCode: '李小米',
          ownerCode: '单位一',
          specServiceRqrmnt: '特殊服务要求',
          associatedOrderNo: 'GLJDL202001011700009',
          opeRate: '业务操作地',
          PMT: 'PMT',
          goodFlow: '货物流向',
          rqstReleaseDate: '2020-12-19',
          uRent: '是',
          urentRemark: '加急原因是...',
          receiveMan: '张小米',
          receiveDate: '2020-12-12',
        },
        {
          operation: '2',
          orderState: '2',
          orderNo: 'JDL202001011700009',
          customerIDNo: 'JDL202001011700009',
          clientCode: '无锡佳利达供应链管理有限公司',
          settleCode: '无锡佳利达供应链管理有限公司',
          bizType: '业务类型',
          serviceRqrmnt: '查看明细',
          orderCreationDate: '2020-12-10',
          tradeCode: '李小米',
          ownerCode: '单位一',
          specServiceRqrmnt: '特殊服务要求',
          associatedOrderNo: 'GLJDL202001011700009',
          opeRate: '业务操作地',
          PMT: 'PMT',
          goodFlow: '货物流向',
          rqstReleaseDate: '2020-12-19',
          uRent: '是',
          urentRemark: '加急原因是...',
          receiveMan: '张小米',
          receiveDate: '2020-12-12',
        },
        {
          operation: '2',
          orderState: '2',
          orderNo: 'JDL202001011700009',
          customerIDNo: 'JDL202001011700009',
          clientCode: '无锡佳利达供应链管理有限公司',
          settleCode: '无锡佳利达供应链管理有限公司',
          bizType: '业务类型',
          serviceRqrmnt: '查看明细',
          orderCreationDate: '2020-12-10',
          tradeCode: '李小米',
          ownerCode: '单位一',
          specServiceRqrmnt: '特殊服务要求',
          associatedOrderNo: 'GLJDL202001011700009',
          opeRate: '业务操作地',
          PMT: 'PMT',
          goodFlow: '货物流向',
          rqstReleaseDate: '2020-12-19',
          uRent: '是',
          urentRemark: '加急原因是...',
          receiveMan: '张小米',
          receiveDate: '2020-12-12',
        },
        {
          operation: '2',
          orderState: '2',
          orderNo: 'JDL202001011700009',
          customerIDNo: 'JDL202001011700009',
          clientCode: '无锡佳利达供应链管理有限公司',
          settleCode: '无锡佳利达供应链管理有限公司',
          bizType: '业务类型',
          serviceRqrmnt: '查看明细',
          orderCreationDate: '2020-12-10',
          tradeCode: '李小米',
          ownerCode: '单位一',
          specServiceRqrmnt: '特殊服务要求',
          associatedOrderNo: 'GLJDL202001011700009',
          opeRate: '业务操作地',
          PMT: 'PMT',
          goodFlow: '货物流向',
          rqstReleaseDate: '2020-12-19',
          uRent: '是',
          urentRemark: '加急原因是...',
          receiveMan: '张小米',
          receiveDate: '2020-12-12',
        }],
        page6: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 300
        },
      //上传附件
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      }
    },
    methods: {
      //上传附件
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //table复选
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //可输入可下拉开始
       querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "1"},
          { "value": "2"},
          { "value": "3"},
          { "value": "4"},
          { "value": "5"},
          { "value": "6"},
        ]
      },
      //接单
      orderTaking() {
        this.$notify({
          // title: 'HTML 片段',
          dangerouslyUseHTMLString: true,
          showClose: false,
          // offset: 50,
          // duration: 0,
          message: '<div class="df afs"><i class="c-purple el-icon-circle-check font16 font-500 m-r-5 m-t-3"></i><p class="font12">接单成功，请在处理中列表查看<br>订单号：JDL202001011700009</p></div>'
        });
      },
      clickData(row, event, column) {   
　　　　　　this.$router.push({path: "/orderDetails"})
      },   
      tableRowClass({row, rowIndex}) {
        // row 该行数据， rowIndex 该行索引
        if(rowIndex%2 == 0) {
          return {"color": "#FF0000"} //！返回值要是对象格式！
        }
      },  
      orderDetails() {
        this.$router.push({path: "/orderDetails"})
      },
      filterOrderState(value, row) {
        return row.orderState === value;
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
    },
    mounted(){
      // this.drawLine(),
      this.restaurants = this.loadAll()
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
.el-tabs__header {
  margin: 0 0 5px;
}
.abnormalTip ol li{
  border-bottom:1px solid #eee;
  padding-bottom: 5px;
  margin-top: 5px;
}
.formLine{
  border-bottom: 1px solid #dcdfe6;
    padding-bottom: 15px;
    margin-bottom: 10px;
}
</style>