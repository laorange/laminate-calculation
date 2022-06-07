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
    <div>源代码: <a href="https://github.com/laorange/LaminateCalculation">GitHub</a> | <a href="https://gitee.com/laorange/LaminateCalculation">Gitee</a></div>
    <div class="donate-button-area">
      <div>Developed by <span @click="open('https://github.com/laorange')" style="cursor: pointer">GitHub@laorange</span></div>
      <el-button type="success" :icon="Trophy" @click="showDonateDialog=true" size="small">赞赏支持</el-button>
    </div>
  </el-footer>
</template>

<style scoped>
.el-footer {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100px;
}

.donate-button-area {
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