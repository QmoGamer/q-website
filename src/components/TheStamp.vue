<template>
  <div class="stamp">系統取消<hr>SYSTEM<br>CANCEL</div>
</template>

<script>
export default {
  name: 'TheStamp',
}
</script>

<style lang="scss" scoped>
.stamp
{
  color: #555;
  width: 100px;
  height: 100px;
  border: 2px solid #555;
  padding: 20px;
  display: flex;
  transform: rotate(-20deg);
  font-size: 14px;
  line-height: normal;
  align-items: center;
  border-radius: 100%;
  flex-direction: column;
  justify-content: center;

  hr
  {
    width: 100%;
    margin: 6px;
    border: #333 solid 1px;
  }
}
</style>