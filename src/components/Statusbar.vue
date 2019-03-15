<template>
  <div>
    <transition name="fly-in">
      <div
        class="notification statusbar"
        :class="statusMsg.type"
        v-if="statusMsg.message.length > 0"
      >
        <button class="delete" v-on:click="discardStatusMsg"></button>
        {{statusMsg.message}}
      </div>
    </transition>
    
  </div>
</template>

<script>
export default {
  computed: {
    statusMsg() {
      return this.$store.getters.statusMsg;
    }
  },
  methods: {
    discardStatusMsg() {
      this.$store.commit("discardStatusMsg");
    }
  }
};
</script>

<style>
.statusbar {
  -webkit-box-shadow: 10px 10px 30px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 10px 10px 30px 0 rgba(0, 0, 0, 0.2);
}
.fly-in {
  animation: fly-in 4s;
}
.fly-in-enter-active {
  animation: fly-in 0.5s;
}
.fly-in-leave-active {
  animation: fly-in 0.5s reverse;
}
@keyframes fly-in {
  0% {
    transform: scale(0.7);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
