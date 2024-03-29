<script setup lang="ts">
import {useStore} from "../store/store";
import {InputtedLayerInfo} from "../types/types";

const store = useStore();

function createDynamicInputValue(): InputtedLayerInfo {
  const lastLayer = store.inputtedLayerInfos[store.inputtedLayerInfos.length - 1];
  return {
    E_l: lastLayer?.E_l ?? null,
    E_t: lastLayer?.E_t ?? null,
    nu_lt: lastLayer?.nu_lt ?? null,
    G_lt: lastLayer?.G_lt ?? null,
    theta: lastLayer?.theta ?? null,
    thickness: lastLayer?.thickness ?? null,
  };
}

const validators = {
  thicknessValidator(thickness: number) {
    return thickness > 0;
  },
  thetaValidator(theta: number) {
    return theta <= 360 && theta >= -360;
  },
};


function letSymmetric() {
  const copiedInputtedLayerInfos = JSON.parse(JSON.stringify(store.inputtedLayerInfos)) as InputtedLayerInfo[];
  copiedInputtedLayerInfos.reverse();
  store.inputtedLayerInfos = store.inputtedLayerInfos.concat(copiedInputtedLayerInfos);
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
        <h2 style="color: red"> 点击此处来添加第一层板 </h2>
      </template>
      <template #default="{ value, index }">
        <div class="layer-attribute-input-outer-part">

          <div class="layer-attribute-input-inner-part">
            <n-input-number
                v-model:value="value.theta"
                :status="value.theta ? `seccess` : `error`"
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

            <n-input-number v-model:value="value.E_l"
                            :status="value.E_l ? `seccess` : `error`"
                            placeholder="平行于纤维方向的杨氏模量 | Module d’élasticité longitudinal">
              <template #prefix>
                <vue-latex expression="E_l"/>
              </template>
              <template #suffix>
                <div class="input-number-suffix-div">MPa</div>
              </template>
            </n-input-number>
          </div>

          <div class="layer-attribute-input-inner-part">
            <n-input-number v-model:value="value.E_t"
                            :status="value.E_t ? `seccess` : `error`"
                            placeholder="垂直于纤维方向的杨氏模量 | Module d’élasticité transversal">
              <template #prefix>
                <vue-latex expression="E_t"/>
              </template>
              <template #suffix>
                <div class="input-number-suffix-div">MPa</div>
              </template>
            </n-input-number>

            <n-input-number v-model:value="value.G_lt"
                            :status="value.G_lt ? `seccess` : `error`"
                            placeholder="剪切模量 | Module de cisaillement">
              <template #prefix>
                <vue-latex expression="G_{lt}"/>
              </template>
              <template #suffix>
                <div class="input-number-suffix-div">MPa</div>
              </template>
            </n-input-number>
          </div>

          <div class="layer-attribute-input-inner-part">
            <n-input-number v-model:value="value.nu_lt"
                            :status="value.nu_lt ? `seccess` : `error`"
                            placeholder="泊松比 | Coefficients de Poisson">
              <template #prefix>
                <vue-latex expression="\nu_{lt}"/>
              </template>
              <template #suffix>
                <div class="input-number-suffix-div">&nbsp;</div>
              </template>
            </n-input-number>

            <n-input-number
                v-model:value="value.thickness"
                :status="value.thickness ? `seccess` : `error`"
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
          </div>

          <n-divider>↑ 第{{ index + 1 }}层 ↑</n-divider>

        </div>

      </template>
    </n-dynamic-input>

    <n-divider v-if="store.inputtedLayerInfos.length > 1">
      <n-button @click="letSymmetric">需要上下对称？点击此处</n-button>
    </n-divider>
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

.layer-attribute-input-outer-part {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.layer-attribute-input-inner-part {
  display: flex;
}

.n-input-number {
  flex: 0 0 50%;
}

.input-number-suffix-div {
  width: 35px;
}
</style>
