<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{ modelValue: boolean }>()
const emits = defineEmits(['update:modelValue'])

const value = computed<boolean>({
  get: () => props.modelValue,
  set: (newValue) => emits('update:modelValue', newValue)
})
</script>

<template>
  <el-dialog
      v-model="value"
      title="😆开发不易 还望支持😆"
      width="500px"
  >
    <img src="/donate-qr.jpg" alt="qr.jpg" style="width: 100%">
  </el-dialog>
</template>

<style scoped>

</style>