<template>
  <div class="demo-modal">
    <button class="btn btn-info" @click="isShowAlertModal = true">show alert modal</button>
    <button class="btn btn-info" @click="isShowConfirmModal = true">show confirm modal</button>
    <Modal 
      :isVisible="isShowAlertModal" 
      :content="'測試內容'"
      :handleClickMask="closeAlertModal"
      :btnName="'確定'"
      :handleClick="closeAlertModal"
    ></Modal>
    <Modal
      :mode="'confirm'"
      :isVisible="isShowConfirmModal" 
      :content="'測試內容'"
      :handleClickMask="closeConfirmModal"
      :btnName="'確定'"
      :handleClick="closeConfirmModal"
      :leftBtnName="'取消'"
      :handleLeftBtnClick="closeConfirmModal"
    ></Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  name: 'DemoModal',
  components: {
    Modal,
  },
  data: () => ({
    isShowAlertModal: false,
    isShowConfirmModal: false,
  }),
  methods: {
    closeAlertModal() {
      this.isShowAlertModal = false;
    },
    closeConfirmModal() {
      this.isShowConfirmModal = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-modal {
  text-align: left;
  .btn {
    margin: 10px;
  }
}
</style>