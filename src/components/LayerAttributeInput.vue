<script setup lang="ts">
import {useStore} from "../../store/store";
import {InputtedLayerInfo} from "../../types/types";

const store = useStore()

function createDynamicInputValue(): InputtedLayerInfo {
  const lastLayer = store.inputtedLayerInfos[store.inputtedLayerInfos.length - 1]
  return {
    E_l: lastLayer?.E_l ?? null,
    E_t: lastLayer?.E_t ?? null,
    nu_lt: lastLayer?.nu_lt ?? null,
    G_lt: lastLayer?.G_lt ?? null,
    theta: lastLayer?.theta ?? null,
    thickness: lastLayer?.thickness ?? null,
  }
}

const validators = {
  thicknessValidator(thickness: number) {
    return thickness > 0
  },
  thetaValidator(theta: number) {
    return theta <= 360 && theta >= -360
  }
}


function letSymmetric() {
  const copiedInputtedLayerInfos = JSON.parse(JSON.stringify(store.inputtedLayerInfos)) as InputtedLayerInfo[]
  copiedInputtedLayerInfos.reverse()
  store.inputtedLayerInfos = store.inputtedLayerInfos.concat(copiedInputtedLayerInfos)
}
</script>

<template>
  <div class="layer-attribute-input">
    <div class="add-layer-info" v-if="store.inputtedLayerInfos.length===1">
      <div style="flex: 1">&nbsp;</div>
      <div style="font-size: 16px">想要再加一层板？请在填完下方的数据后，点击这里 ↓</div>
    </div>

    <n-dynamic-input v-model:value="store.inputtedLayerInfos" :on-create="createDynamicInputValue">
      <template #create-button-default>
        点击此处来为这个复合材料加第一层板
      </template>
      <template #default="{ value }">
        <div class="layer-attribute-input-inner-part">

          <n-input-number
              v-model:value="value.theta"
              :validator="validators.thetaValidator"
              style="flex: 1"
              placeholder="纤维方向角 (角度制)">
            <template #prefix>
              <vue-latex expression="\theta"/>
            </template>
            <template #suffix>
              <div class="input-number-suffix-div">°</div>
            </template>
          </n-input-number>

          <n-input-number v-model:value="value.E_l" placeholder="平行于纤维方向的杨氏模量 | Module d’élasticité longitudinal">
            <template #prefix>
              <vue-latex expression="E_l"/>
            </template>
            <template #suffix>
              <div class="input-number-suffix-div">MPa</div>
            </template>
          </n-input-number>

          <n-input-number v-model:value="value.E_t" placeholder="垂直于纤维方向的杨氏模量 | Module d’élasticité transversal">
            <template #prefix>
              <vue-latex expression="E_t"/>
            </template>
            <template #suffix>
              <div class="input-number-suffix-div">MPa</div>
            </template>
          </n-input-number>

          <n-input-number v-model:value="value.G_lt" placeholder="剪切模量 | Module de cisaillement">
            <template #prefix>
              <vue-latex expression="G_{lt}"/>
            </template>
            <template #suffix>
              <div class="input-number-suffix-div">MPa</div>
            </template>
          </n-input-number>

          <n-input-number v-model:value="value.nu_lt" placeholder="泊松比 | Coefficients de Poisson">
            <template #prefix>
              <vue-latex expression="\nu_{lt}"/>
            </template>
            <template #suffix>
              <div class="input-number-suffix-div">&nbsp;</div>
            </template>
          </n-input-number>

          <n-input-number
              v-model:value="value.thickness"
              :validator="validators.thicknessValidator"
              style="flex: 1"
              placeholder="该层的厚度 (如果它不重要，那就填1)">
            <template #prefix>
              <vue-latex expression="e"/>
            </template>
            <template #suffix>
              <div class="input-number-suffix-div">mm</div>
            </template>
          </n-input-number>

          <n-divider/>
        </div>

      </template>
    </n-dynamic-input>

    <n-divider v-if="store.inputtedLayerInfos.length > 0">
      <el-button @click="letSymmetric">关于此处上下对称</el-button>
    </n-divider>

    <div class="layer-amount-display" v-if="store.inputtedLayerInfos.length>2">共{{ store.inputtedLayerInfos.length }}层</div>
  </div>
</template>

<style scoped>
.layer-attribute-input {
  margin: 3px 0;
  display: flex;
  flex-direction: column;
}

.layer-amount-display {

}

.add-layer-info {
  display: flex;
  margin-right: 15px;
}

.layer-attribute-input-inner-part {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.input-number-suffix-div {
  width: 35px;
}
</style>