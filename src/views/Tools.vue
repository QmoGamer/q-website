<template>
  <div class="tools">
    <div class="row">
      <div class="col-3">
        <div class="nav flex-column nav-pills">
          <div 
            class="nav-link" 
            :class="{'active': index === activeIndex}" 
            v-for="(item, index) in toolInfoList" 
            :key="index"
            @click="activeIndex = index"
          >{{ item.name }}</div>
        </div>
      </div>
      <div class="col-9">
        <div class="tab-content">
          <div class="tab-pane fade show active">
            <component :is="toolInfoList[activeIndex].component" :noticeList="noticeList"></component>
            <!-- <Marquee :noticeList="noticeList"></Marquee> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Marquee from '@/components/Marquee.vue';
import UnderLineAnimationVue from '@/components/UnderLineAnimation.vue';

export default {
  name: 'Tools',
  components: { 
    Marquee,
    UnderLineAnimationVue,
  },
  data: () => ({
    activeIndex: 0,
    toolInfoList: [
      { name: 'Marquee', component: 'Marquee' },
      { name: 'Under line animation',  component:'UnderLineAnimationVue' }
    ],
    noticeList: ['123', 'test', '456', 'abc']
  })
};
</script>

<style lang="scss" scoped>
.tools {
  width: 1280px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgb(200 232 255 / 50%);
  .nav-link {
    cursor: pointer;
  }
}
</style>
