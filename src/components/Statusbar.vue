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
   props: {
    statusMsg: {
      type: Object
    }
  },
  methods: {
    discardStatusMsg() {
      this.$store.commit("discardStatusMsg",this.statusMsg);
    }
  }
};
</script>

<style>
.notification{
  margin-top: 20px;
  word-break: break-all;
}

</style>
