<script setup lang="ts">
import {ref, watch} from "vue";
import {useStore} from "../../store/store";

const store = useStore()

interface DynamicInputValue {
  thickness: number | null,
  theta: number | null,
}

const dynamicInputValues = ref<DynamicInputValue[]>([]);

function createDynamicInputValue(): DynamicInputValue {
  const lastLayer = dynamicInputValues.value[dynamicInputValues.value.length - 1]
  return {
    thickness: lastLayer?.thickness ?? null,
    theta: lastLayer?.theta ?? null,
  }
}

watch(() => dynamicInputValues, () => {
  store.inputted.theta_list = dynamicInputValues.value.map(v => v.theta)
  store.inputted.thickness_list = dynamicInputValues.value.map(v => v.thickness)
}, {deep: true})

function thicknessValidator(thickness: number) {
  return thickness > 0
}

function thetaValidator(theta: number) {
  return theta <= 360 && theta >= -360
}
</script>

<template>
  <div class="layer-attribute-input">
    <n-dynamic-input v-model:value="dynamicInputValues" :on-create="createDynamicInputValue">
      <template #create-button-default>
        点击此处来为这个复合材料加第一层板
      </template>
      <template #default="{ value }">
        <div style="display: flex; align-items: center; width: 100%">
          <n-input-number
              v-model:value="value.thickness"
              :validator="thicknessValidator"
              style="flex: 1"
              placeholder="该层的厚度">
            <template #suffix>m</template>
          </n-input-number>

          <n-input-number
              v-model:value="value.theta"
              :validator="thetaValidator"
              style="flex: 1"
              placeholder="纤维方向角 θ">
            <template #suffix>°</template>
          </n-input-number>
        </div>
      </template>
    </n-dynamic-input>

    <div class="add-layer-info" v-if="dynamicInputValues.length===1">想要再加一层板？请点击这里 ↑</div>

    <div class="layer-amount-display" v-if="dynamicInputValues.length>2">共{{ dynamicInputValues.length }}层</div>
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
  align-self: end;
  margin-right: 15px;
}
</style>