<template>
  <div class="about">
    <operationArea></operationArea>
    <div class="orderList">
      <el-row :gutter="10" class="">
        <el-col :span="20">
          <el-tabs v-model="activeName" class="subTab">
            <el-tab-pane label="表头" name="first">
              <div class="centerContent">
                <vxe-table
                  class="mytable-style"
                  border
                  resizable
                  show-overflow
                  :data="tableData"
                  :show-header="false"
                  :cell-class-name="cellClassName"
                  :row-style="rowStyle"
                  :merge-cells="mergeCells"
                  :edit-config="{trigger: 'click', mode: 'cell'}">
                  <vxe-table-column field="one" ></vxe-table-column>
                  <vxe-table-column field="two"  :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                  <vxe-table-column field="three" ></vxe-table-column>
                  <vxe-table-column field="four"  :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                  <vxe-table-column field="five"  ></vxe-table-column>
                  <vxe-table-column field="six"  :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                  <vxe-table-column field="seven" ></vxe-table-column>
                  <vxe-table-column field="eight"  :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
                </vxe-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="表体" name="second">表体</el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="4">
          <div class="rightContent">
            <el-collapse>
              <el-collapse-item>
                <template slot="title">
                  异常信息（整合）<i class="header-icon el-icon-info"></i>
                </template>
                <ol>
                  <li>起运国、装货港01(进口，1.当运输方式为9、Y时，起运国、装货港为142)</li>
                  <li>备案号与报关类型的关系（1.报关单类型为003，004，2，备案号前1位等于H）</li>
                  <li>原产国目的国01（1.进口口岸为2374时，最终目的国非CHN提示）</li>
                  <li>运输方式01(1.报关单类型为001，转关单类型为001，进出口口岸委2374时，报关单运输方式等于Y)</li>
                </ol>
              </el-collapse-item>
              <el-collapse-item title="原始随附单证">
                <div>原始随附单证</div>
              </el-collapse-item>
              <el-collapse-item title="单证填制信息">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
              </el-collapse-item>
              <el-collapse-item title="单证填制信息">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import operationArea from '@/components/operationArea.vue'
export default {
  name: 'about',
  components: {
    operationArea
  },
  data () {
    return {
      activeName: 'first',
      tableData: [
        { id: 10001, one: '预录入统一编号', two: '', three: '清单编号', four: '', five: '*清单类型', six: '普通清单', seven: '*手(账)册编号', eight: '' },
        { id: 10002, one: '*经营单位编码', two: '', three: '经营单位社会信用代码', four: '91320213676366352T', five: '', six: '', seven: '*经营单位名称', eight: '捷普电子(无锡)有限公司' },
        { id: 10003, one: '*加工单位编码', two: '', three: '加工单位社会信用代码', four: '91320213676366352T', five: '进境关别', six: '', seven: '*加工单位名称', eight: '捷普电子(无锡)有限公司' },
        { id: 10004, one: '报关单类型', two: '', three: '海关编号', four: '', five: '进境关别', six: '', seven: '', eight: '进境关别' },
        { id: 10005, one: '报关单类型', two: '', three: '海关编号', four: '', five: '进境关别', six: '', seven: '', eight: '进境关别' },
        { id: 10006, one: '报关单类型', two: '', three: '海关编号', four: '', five: '进境关别', six: '', seven: '', eight: '进境关别' },
        { id: 10007, one: '报关单类型', two: '', three: '海关编号', four: '', five: '进境关别', six: '', seven: '', eight: '进境关别' },
        { id: 10008, one: '报关单类型', two: '', three: '海关编号', four: '', five: '进境关别', six: '', seven: '', eight: '进境关别' },
        { id: 10009, one: '报关单类型', two: '', three: '海关编号', four: '', five: '进境关别', six: '', seven: '', eight: '进境关别' },
        { id: 100010, one: '报关单类型', two: '', three: '海关编号', four: '', five: '进境关别', six: '', seven: '', eight: '进境关别' },
        { id: 100011, one: '报关单类型', two: '', three: '海关编号', four: '', five: '进境关别', six: '', seven: '', eight: '进境关别' },
        { id: 100012, one: '报关单类型', two: '', three: '海关编号', four: '', five: '进境关别', six: '', seven: '', eight: '进境关别' },
        { id: 100013, one: '报关单类型', two: '', three: '海关编号', four: '', five: '进境关别', six: '', seven: '', eight: '进境关别' },
        { id: 100014, one: '报关单类型', two: '', three: '海关编号', four: '', five: '进境关别', six: '', seven: '', eight: '进境关别' },
        { id: 100015, one: '报关单类型', two: '', three: '海关编号', four: '', five: '进境关别', six: '', seven: '', eight: '进境关别' },
        { id: 100016, one: '报关单类型', two: '', three: '海关编号', four: '', five: '进境关别', six: '', seven: '', eight: '进境关别' },
        { id: 100017, one: '报关单类型', two: '', three: '海关编号', four: '', five: '进境关别', six: '', seven: '', eight: '进境关别' },
        { id: 100018, one: '报关单类型', two: '', three: '海关编号', four: '', five: '进境关别', six: '', seven: '', eight: '进境关别' }
      ],
      mergeCells: [
        { row: 1, col: 2, rowspan: 0, colspan: 2 },
        { row: 1, col: 4, rowspan: 0, colspan: 2 },
        { row: 2, col: 2, rowspan: 0, colspan: 2 },
        { row: 2, col: 4, rowspan: 0, colspan: 2 }
        // { row: 5, col: 0, rowspan: 2, colspan: 2 }
      ]
    }
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
.about{

}
.orderList{
  width: 100%;
  padding-top: 100px;
  overflow-x: hidden;
}
.orderList .centerContent,
.orderList .rightContent{
  min-height: 580px;
  background: #fff;
}
.orderList .rightContent{
  box-shadow: rgba(39, 54, 78, 0.11) 0px -2px 10px 0px;
}
.orderList .centerContent{
  padding: 15px;
}
.orderList .rightContent{

}
</style>
