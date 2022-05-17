<script setup lang="ts">
import {useStore} from "../../store/store";
import LayerAttributeInput from "./LayerAttributeInput.vue";
import {Odometer} from "@element-plus/icons-vue";

const store = useStore()
</script>

<template>
  <div class="form-area">

    <div class="number-input-area">
      <layer-attribute-input/>
    </div>

    <n-progress type="circle" :percentage="store.dataCompletionDegree" v-show="store.inputtedLayerInfos.length>0">
      <div style="display: flex; flex-direction: column; justify-content: center">
        <div>填写进度</div>
        <div>{{ store.dataCompletionDegree }}%</div>
      </div>
    </n-progress>

    <div class="button-area">
      <el-button type="primary" :icon="Odometer"
                 :disabled="!store.whetherCanSubmit"
                 @click="store.submitToGetResult">
        {{ store.whetherCanSubmit ? "开始计算" : "在开始计算前，需要先在上方补全所有需要填写的数据" }}
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.form-area {

}

.number-input-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-content: center;
}

.button-area {
  display: flex;
  justify-content: center;
  justify-items: center;
  margin: 5px 0;
}
</style>