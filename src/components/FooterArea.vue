<script setup lang="ts">
import {ref} from "vue";
import {Trophy} from "@element-plus/icons-vue";
import DonateDialog from "./DonateDialog.vue";

const showDonateDialog = ref<boolean>(false)

function open(href: string) {
  window.open(href)
}
</script>

<template>
  <donate-dialog v-model="showDonateDialog"></donate-dialog>
  <el-footer>
    <div>Made with ❤️ by <span @click="open('https://github.com/laorange')" style="cursor: pointer">GitHub@laorange</span></div>
    <el-button type="success" :icon="Trophy" @click="showDonateDialog=true" size="small">赞赏支持</el-button>
  </el-footer>
</template>

<style scoped>
.el-footer {
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: center;
  align-items: center;
}

.el-button {
  margin-left: 10px;
}
</style>