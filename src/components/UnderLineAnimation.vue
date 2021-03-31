<template>
  <div class="input-box">
    <input placeholder="请输入些什麼..." />
    <hr>
  </div>
</template>

<script>
export default {
  name: 'UnderLineAnimation',
}
</script>

<style lang="scss" scoped>
.input-box {
  height: 40px;
  margin-top: 20px;
  input {
    width: 100%;
    border: 0;
    outline:none;
    text-indent: 20px;
    background-color: transparent;
    &:focus + hr::after {
      width: 100%;
    }
  }
  hr {
    border: 0;
    height: 1px;
    background-color: #b6b6b6;
    &::after {
      content: ' ';
      display: block;
      width: 0;
      height: 1px;
      transition: all 0.3s;
      background-color: #0f6397;
    }
  }
}
</style>