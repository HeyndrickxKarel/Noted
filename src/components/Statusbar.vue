<template>
  <div>
    <transition name="fly-in">
      <div
        class="notification shadow"
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
.notification{
  z-index: 20000;
}

</style>
