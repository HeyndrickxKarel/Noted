<template>
  <div>
      <transition name="drop-in" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
    <div class="notification statusbar" :class="statusMsg.type" v-if="statusMsg.message.length > 0">
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
      discardStatusMsg(){
         this.$store.commit("discardStatusMsg");
      }
  }
};
</script>

<style>
.statusbar{
        -webkit-box-shadow: 10px 10px 30px 0 rgba(0, 0, 0, 0.2);
    box-shadow: 10px 10px 30px 0 rgba(0, 0, 0, 0.2);
}
</style>
