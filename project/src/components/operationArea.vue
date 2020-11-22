<template>
  <div class="operationArea df">
    <div class="df ac jsb p-l-15 width100">
      <div class="operationAreaLeft">
        <i class="el-icon-arrow-left cursor"></i>
        <a class="m-l-5">
          整合制单
          <div class="leftContent">
            <div>
              cccc
              <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
              22222
              <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
              22222
              <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
              22222
              <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
              22222
              <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
              22222
              <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
              22222
              <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
              22222
              <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
              22222
              <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
              22222
              <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
            </div>
          </div>
        </a>
      </div>
      <div class="operationAreaCenter df ac">
        <el-link :underline="false"><i class="el-icon-document-checked"></i><span>保存</span></el-link>
        <el-link :underline="false" disabled><i class="el-icon-takeaway-box"></i><span>存为模板</span></el-link>
        <el-link :underline="false"><i class="el-icon-reading"></i><span>加载模版</span></el-link>
        <el-link :underline="false"><i class="el-icon-copy-document"></i><span>复制</span></el-link>
        <el-link :underline="false"><i class="el-icon-printer"></i><span>打印</span></el-link>
        <el-link :underline="false"><i class="el-icon-video-play"></i><span>暂停/启动</span></el-link>
        <el-link :underline="false"><i class="el-icon-document-copy"></i><span>拆分</span></el-link>
        <el-link :underline="false"><i class="el-icon-refresh-right"></i><span>异常</span></el-link>
        <el-link :underline="false"><i class="el-icon-folder-checked"></i><span>提交审单</span></el-link>
        <el-link :underline="false"><i class="el-icon-view"></i><span>预览</span></el-link>
      </div>
      <div class="operationAreaRright df ac">
        <p class="df ac font16 m-r-10"><i class="el-icon-s-platform m-r-10"></i><span>00:00:06</span></p>
        <p class="fullScreen"><i class="el-icon-c-scale-to-original"></i></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
.operationArea{
  position: fixed;
  top:50px;
  background: #fff;
  height: 50px;
  width: 100%;
  box-shadow: rgba(100, 100, 100, 0.2) 0px 2px 3px 0px;
  z-index: 4;
}
.operationAreaCenter p{
  cursor: pointer;
}
.operationArea>div .operationAreaLeft>a .leftContent{
  height: calc(100vh);
  overflow: auto;
  background: #fff;
  box-shadow: rgba(39, 54, 78, 0.11) 0px -2px 10px 0px;
  position: fixed;
  width: 200px;
  left: 0;
  z-index: 4;
  display: none;
  top: 0px;
  padding-top: 50px;
}
.operationArea>div .operationAreaLeft>a:hover .leftContent{
  display: block;
}
.operationAreaRright .fullScreen{
  width: 70px;
  height: 100%;
  background: #fff;
  border-left: 1px solid #E1E1E1;
  font-size: 14px;
  line-height: 50px;
  text-align: center;
}
.operationAreaRright .fullScreen i{
  width: 28px;
  height: 28px;
  border-radius: 100%;
  background: #F2F2F2;
  line-height: 28px;
}
</style>
