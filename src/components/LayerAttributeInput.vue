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
</script>

<template>
  <div class="layer-attribute-input">
    <n-dynamic-input v-model:value="dynamicInputValues" :on-create="createDynamicInputValue">
      <template #create-button-default>
        为这个复合材料加一层板
      </template>
      <template #default="{ value }">
        <div style="display: flex; align-items: center; width: 100%">
          <n-input-number
              v-model:value="value.thickness"
              style="flex: 1"
              placeholder="该层的厚度">
            <template #suffix>mm</template>
          </n-input-number>

          <n-input-number
              v-model:value="value.theta"
              style="flex: 1"
              placeholder="纤维方向角 θ">
            <template #suffix>°</template>
          </n-input-number>
        </div>
      </template>
    </n-dynamic-input>

    <div class="layer-amount-display" v-if="dynamicInputValues.length>2">共{{ dynamicInputValues.length }}层</div>
  </div>
</template>

<style scoped>
.layer-attribute-input {
  margin: 3px 0;
}

.layer-amount-display {

}
</style>