<template>
  <div class="scroll-wrap">
    <transition-group
      :style="carouselHeight"
      class="scroll-content"
      name="marquee"
      tag="ul"
      @after-leave="afterLeave"
    >
      <template v-for="(item, index) in noticeList">
        <li v-if="activeIndex === index" :key="index" :style="translateHeight">{{ item }}</li>
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
      activeIndex: 0,
      height: '40px',
    };
  },
  computed:	{
		carouselHeight() {
			return { "--height": this.height };
		},
		translateHeight() {
			return { "--translateY": `translateY(-${this.height})` };
		}
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
  height: var(--height);
  overflow: hidden;
}

.scroll-content {
  display: flex;
  position: relative;
  transition: top 0.3s;
  flex-direction: column;

  li {
    line-height: var(--height);
  }
}

.marquee-enter-active, .marquee-leave-active {
  transition: all .3s;
}
.marquee-enter-to, .marquee-leave-to
{
  transform: var(--translateY);
}
</style>
