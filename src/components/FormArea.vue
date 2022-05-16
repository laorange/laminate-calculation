<script setup lang="ts">
import {useStore} from "../../store/store";
import LayerAttributeInput from "./LayerAttributeInput.vue";
import {Trophy, Odometer} from "@element-plus/icons-vue";

const store = useStore()

</script>

<template>
  <div class="form-area">

    <div class="number-input-area">
      <n-input-number v-model:value="store.inputted.E_l" placeholder="平行于纤维方向的杨氏模量 | Module d’élasticité longitudinal">
        <template #prefix>
          <vue-latex expression="E_l"/>
        </template>
        <template #suffix>
          GPa
        </template>
      </n-input-number>

      <n-input-number v-model:value="store.inputted.E_t" placeholder="垂直于纤维方向的杨氏模量 | Module d’élasticité transversal">
        <template #prefix>
          <vue-latex expression="E_t"/>
        </template>
        <template #suffix>
          GPa
        </template>
      </n-input-number>

      <n-input-number v-model:value="store.inputted.G_lt" placeholder="剪切模量 | Module de cisaillement">
        <template #prefix>
          <vue-latex expression="G_{lt}"/>
        </template>
        <template #suffix>
          GPa
        </template>
      </n-input-number>

      <n-input-number v-model:value="store.inputted.nu_lt" placeholder="泊松比 | Coefficients de Poisson">
        <template #prefix>
          <vue-latex expression="\nu_{lt}"/>
        </template>
        <template #suffix>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </template>
      </n-input-number>

      <layer-attribute-input/>

      <div class="button-area">
        <el-button type="success" :icon="Trophy">赞赏支持</el-button>
        <span>&nbsp;&nbsp;</span>
        <el-button type="primary" :icon="Odometer"
                   :disabled="!store.whetherCanSubmit"
                   @click="store.submitToGetResult">
          {{ store.whetherCanSubmit? "开始计算": "请先在上方填写数据" }}
        </el-button>
      </div>

    </div>

  </div>
</template>

<style scoped>
.form-area {

}

.number-input-area {
  display: flex;
  flex-direction: column;
}

.button-area {
  display: flex;
  justify-content: center;
  justify-items: center;
}
</style>