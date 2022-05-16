<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import FormArea from "./components/FormArea.vue";
import ResultArea from "./components/result-area/ResultArea.vue";

import {useStore} from "../store/store";
import FooterArea from "./components/FooterArea.vue";

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
      <result-area/>
    </el-collapse-item>
    <el-collapse-item title="出错了" name="error" v-if="store.errorMessage">
      <div>错误展示区域</div>
      <div>{{ store.errorMessage }}</div>
      <div>提示：请检查是否已经打开后端服务</div>
    </el-collapse-item>
  </el-collapse>

  <footer-area/>
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

.el-collapse {

}
</style>
