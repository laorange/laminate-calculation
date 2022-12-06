<script setup lang="ts">
import {useStore} from "../store/store";
import LayerAttributeInput from "./LayerAttributeInput.vue";
import LaminateDiagram from "./LaminateDiagram.vue";

const store = useStore();
</script>

<template>
  <div class="form-area">

    <div class="number-input-area">
      <layer-attribute-input/>
    </div>

    <laminate-diagram v-show="store.inputtedLayerInfos.length>1"/>

    <n-progress type="circle" :percentage="store.dataCompletionDegree" v-show="store.inputtedLayerInfos.length>0">
      <div style="display: flex; flex-direction: column; justify-content: center">
        <div>填写进度</div>
        <div>{{ store.dataCompletionDegree }}%</div>
      </div>
    </n-progress>

    <div class="button-area" v-show="store.inputtedLayerInfos.length>0">
      <n-button type="primary" size="large" v-show="store.whetherCanSubmit" @click="store.submitToGetResult">开始计算</n-button>
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
