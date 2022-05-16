<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import FormArea from "./components/FormArea.vue";
import {useStore} from "../store/store";

const store = useStore()

function open(href: string) {
  window.open(href)
}
</script>

<template>
  <h1>复合材料性能 辅助计算程序</h1>

  <el-collapse v-model="store.collapseActiveName" accordion>
    <el-collapse-item title="输入信息" name="input">
      <form-area/>
    </el-collapse-item>
    <el-collapse-item title="获取结果" name="result" v-if="store.result">
      <div>结果展示区域</div>
    </el-collapse-item>
    <el-collapse-item title="出错了" name="error" v-if="store.errorMessage">
      <div>错误展示区域</div>
      <div>{{ store.errorMessage }}</div>
    </el-collapse-item>
  </el-collapse>

  <el-footer>
    <div>Made with ❤️ by <span @click="open('https://github.com/laorange')" style="cursor: pointer">GitHub@laorange</span></div>
  </el-footer>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 90vh;
  margin: 30px;
}

.el-footer {
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
}

.el-collapse {
  min-height: 75vh;
}
</style>
