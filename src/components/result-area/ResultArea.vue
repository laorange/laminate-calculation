<script setup lang="ts">
import {ref} from "vue";
import LaminateResult from "./LaminateResult.vue";
import LayerResult from "./LayerResult.vue";
import {useStore} from "../../store/store";

const store = useStore()

const activeTabIndex = ref("")
</script>

<template>
  <van-tabs v-model:active="activeTabIndex">
    <van-tab title="整块板">
      <laminate-result :laminate="store.result" />
    </van-tab>
    <van-tab v-for="(layer, layerIndex) in store.result?.layers" :key="`layer${layerIndex}`" :title="`第${layerIndex+1}层板`">
      <layer-result :layer="layer"></layer-result>
    </van-tab>
  </van-tabs>
</template>

<style scoped>

</style>
