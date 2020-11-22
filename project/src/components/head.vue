<template>
  <div class="head df jsb">
    <div class="logoLeft df ac">
      <div class="df ac">
         <img width="30" height="25" src="../../public/img/logo.png">
        <p>i-CDC智能关务平台</p>
      </div>
      <div class="weather">
        <img width="294" height="20" src="../../public/img/weather.png">
      </div>
    </div>
    <div class="topRight df ac">
      <el-badge is-dot class="topBadge">通知</el-badge>
      <span>帮助</span>
      <span>|</span>
      <span class="el-icon-user-solid font16"></span>
      <p class="signOut">
        <i class="el-icon-news"></i>
      </p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
.head{
  background: #161616;
  height: 50px;
  position: fixed;
  width: 100%;
  top:0;
  left: 0;
  z-index: 999;
}
.logoLeft{
  padding-left:15px;
}
.logoLeft p{
  padding-left: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  position: relative;
  top: 3px;
}
.weather{
  height: 16px;
  margin-left: 15px;
}
.signOut{
  width: 70px;
  height: 100%;
  background: #5576FC;
  color: #fff;
  font-size: 14px;
  line-height: 50px;
  text-align: center;
}
.topRight span{
  font-size: 14px;
  padding: 10px;
  color: #fff;
}
.signOut i{
  width: 28px;
  height: 28px;
  border-radius: 100%;
  color: #fff;
  background: rgba(255,255,255,0.2);
  line-height: 28px;
}
</style>
