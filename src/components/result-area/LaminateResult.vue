<script setup lang="ts">
import {Laminate} from "../../../types/types";
import {tex} from "../../latex";

defineProps<{ laminate: Laminate }>()

</script>

<template>
  <div class="laminate-result">
    <div class="result-block">
      <vue-latex :expression="`${tex.formula.A_ij}`"/>
    </div>
    <div class="result-block">
      <vue-latex :expression="`${tex.formula.matrix_A}`"/>
    </div>
    <div class="result-block">
      <vue-latex :expression="`A = ${tex.matrix33(laminate.A)}`"/>
    </div>

    <n-divider/>

    <div class="result-block">
      <vue-latex :expression="`B = ${tex.matrix33(laminate.B)}`"/>
    </div>
    <div class="result-block">
      <vue-latex :expression="`C = ${tex.matrix33(laminate.C)}`"/>
    </div>

    <n-divider/>

    <div class="result-block">
      <vue-latex :expression="`${tex.formula.modules_apparents_matrix}`"/>
    </div>

    <div class="result-block">
      <vue-latex :expression="`modules\\ apparents = ${tex.matrix33(laminate.modules_apparents_matrix)}`"/>
    </div>

  </div>
</template>

<style scoped>
.laminate-result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
}

div.result-block {
  padding: 10px 0;
}
</style>