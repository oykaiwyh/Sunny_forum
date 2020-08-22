<template>
  <div>
    <sunny-panel />
    <router-view />
  </div>
</template>

<script>
import Panel from "@/components/Panel";

export default {
  name: "home",
  components: {
    "sunny-panel": Panel
  }
};
</script>

<style lang="scss" scoped>
</style>