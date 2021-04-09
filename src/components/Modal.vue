<template>
  <div
    :style="{'display': displayStyle }"
    :class="`modal-mask ${isVisible ? '' : 'out'}`"
    @click="handleClickMask"
  >
    <div
      :class="`alert-modal ${mode === 'confirm' ? 'confirm-modal' : ''}`"
      @click="(e) => e.stopPropagation()"
    >
      <p>{{content}}</p>
      <button v-if="mode === 'confirm'" type="button" @click="handleLeftBtnClick">{{leftBtnName}}</button>
      <button type="button" class="primary-bold" @click="handleClick">{{btnName}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    mode: {
      type: String,
      default: 'alert',
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: '',
    },
    handleClickMask: {
      type: Function,
      default: () => ({}),
    },
    btnName: {
      type: String,
      default: '',
    },
    handleClick: {
      type: Function,
      default: () => ({}),
    },
    leftBtnName: {
      type: String,
      default: '',
    },
    handleLeftBtnClick: {
      type: Function,
      default: () => ({}),
    },
  },
  watch: {
    isVisible(value) {
      if (value) {
        this.displayStyle = 'block'
        return;
      }
      setTimeout(() => this.displayStyle = 'none', 600);
    }
  },
  data: () => ({
    displayStyle: 'none',
  })
}
</script>

<style lang="scss" scoped>
.modal-mask {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  animation: fade-in 0.3s;
  background-color: rgba(0,0,0,0.60);
  &.out {
    animation: fade-out 0.6s;
  }
  .alert-modal {
    width: 300px;
    color: #333;
    margin: 0 auto;
    font-size: 15px;
    transform: translate3d(0, 35vh, 0);
    animation: modal-bounce 0.6s ease;
    text-align: center;
    border-radius: 4px;
    background-color: #fff;
    p {
      padding: 42.5px 20px;
      word-break: break-word;
      border-bottom: 1px solid #ddd;
    }
    button {
      width: 100%;
      padding: 12.5px 0;
      text-align: center;
      &.primary-bold {
        color: red;
        font-weight: 600;
      }
    }
    &.confirm-modal button {
      width: 50%;
      &:first-of-type {
        border-right: 1px solid #ddd;
      }
    }
  }
}

@keyframes fade-in {
  0% { opacity: 0 }
  100% { opacity: 1 }
}

@keyframes fade-out {
  0% { opacity: 1 }
  100% { opacity: 0 }
}

@keyframes modal-bounce {
  0% { 
    opacity: 0;
    transform: translate3d(0, 100vh, 0); 
  }
  60% { opacity: 1; }
  100% { transform: translate3d(0, 35vh, 0); }
}
</style>