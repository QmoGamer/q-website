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
            <Marquee v-if="toolInfoList[activeIndex].name === 'Marquee'" :noticeList="noticeList"></Marquee>
            <UnderLineAnimationVue v-if="toolInfoList[activeIndex].name === 'Under line animation'"></UnderLineAnimationVue>
            <DemoModal v-if="toolInfoList[activeIndex].name === 'Demo Modal'" :noticeList="noticeList"></DemoModal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Marquee from '@/components/Marquee.vue';
import UnderLineAnimationVue from '@/components/UnderLineAnimation.vue';
import DemoModal from '@/components/DemoModal.vue';

export default {
  name: 'Tools',
  components: { 
    Marquee,
    UnderLineAnimationVue,
    DemoModal,
  },
  data: () => ({
    activeIndex: 0,
    toolInfoList: [
      { name: 'Marquee', component: 'Marquee' },
      { name: 'Under line animation',  component:'UnderLineAnimationVue' },
      { name: 'Demo Modal',  component:'DemoModal' }
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
  border-radius: 4px;
  .nav-link {
    cursor: pointer;
  }
}
</style>
