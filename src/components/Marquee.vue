<template>
  <div class="scroll-wrap">
    <transition-group
      class="scroll-content"
      name="marquee"
      tag="ul"
      @after-leave="afterLeave"
      mode="out-in"
    >
      <template v-for="(item, index) in noticeList">
        <li v-if="activeIndex === index" :key="index">{{ item }}</li>
      </template>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Marquee',
  props: {
    noticeList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      marquee: [],
      activeIndex: 0,
    };
  },
  methods: {
    afterLeave(el) {
      el.remove();
      setTimeout(() => {
        this.activeIndex = this.activeIndex === (this.noticeList.length - 1)
          ? 0 : this.activeIndex + 1;
      }, 3000);
    },
  },
  mounted() {
    setTimeout(() => {
      this.activeIndex = 1;
    }, 3000);
  },
};
</script>

<style lang="scss" scoped>
.scroll-wrap {
  width: 100%;
  height: 40px;
  overflow: hidden;
}

.scroll-content {
  position: relative;
  transition: top 0.3s;

  li {
    line-height: 40px;
  }
}

.marquee-enter-active, .marquee-leave-active {
  transition: all .3s;
}
.marquee-enter-to, .marquee-leave-to
{
  transform: translateY(-40px);
}
</style>
