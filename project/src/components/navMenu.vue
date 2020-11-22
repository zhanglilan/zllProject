<template>
  <div class="navMenu">
    <el-menu
      default-active="1-3-1"
      class="el-menu-vertical-demo"
      >
      <el-menu-item index="9">
        <i class="el-icon-s-data"></i>
        <span slot="title">统计图表</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>订单中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1"><i class="el-icon-s-order"></i>委外订单</el-menu-item>
          <el-menu-item index="1-2"><i class="el-icon-s-claim"></i>预订单</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-3">
          <template slot="title"><i class="el-icon-menu"></i>正式订单</template>
          <el-menu-item index="1-3-1"><i class="el-icon-s-platform"></i>我的订单</el-menu-item>
          <el-menu-item index="1-3-2"><i class="el-icon-location"></i>我的制单</el-menu-item>
          <el-menu-item index="1-3-3"><i class="el-icon-location"></i>我的审单</el-menu-item>
          <el-menu-item index="1-3-4"><i class="el-icon-location"></i>我的待申报</el-menu-item>
          <el-menu-item index="1-3-5"><i class="el-icon-location"></i>我的申报中</el-menu-item>
          <el-menu-item index="1-3-6"><i class="el-icon-s-tools"></i>已完成</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">异常管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">随附单据管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">现场海关管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">业务跟踪</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-setting"></i>
        <span slot="title">辅助管理</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-setting"></i>
        <span slot="title">结算管理</span>
      </el-menu-item>
      <el-menu-item index="8">
        <i class="el-icon-s-tools"></i>
        <span slot="title">系统管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
</style>
