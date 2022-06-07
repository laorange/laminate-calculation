<script setup lang="ts">
import {Layer} from "../../../types/types";
import {tex} from "../../latex";

defineProps<{ layer: Layer }>()

</script>

<template>
  <div class="layer-result">
    <div class="result-block">
      <vue-latex :expression="`\\theta = ${Math.round(layer.theta / 3.1416 * 180)}^{\\circ}`"/>
    </div>

    <n-divider/>

    <div class="result-block">
      <vue-latex :expression="tex.formula.matrix_T"/>
    </div>
    <div class="result-block">
      <vue-latex :expression="`T = ${tex.matrix33(layer.T)}`"/>
    </div>

    <n-divider/>

    <div class="result-block">
      <vue-latex :expression="tex.formula.souplesse_equation_lt"/>
    </div>
    <div class="result-block">
      <vue-latex :expression="`\\mathrm{Matrice\\ de\\ souplesse}_{lt} = ${tex.matrix33(layer.souplesse_matrix_on_coordinate_L_T)}`"/>
    </div>
    <div class="result-block">
      <vue-latex :expression="tex.formula.souplesse_equation_xy"/>
    </div>
    <div class="result-block">
      <vue-latex :expression="`\\mathrm{Matrice\\ de\\ souplesse}_{xy} = ${tex.matrix33(layer.souplesse_matrix_on_coordinate_X_Y)}`"/>
    </div>

    <n-divider/>

    <div class="result-block">
      <vue-latex :expression="tex.formula.raideur_equation_lt"/>
    </div>
    <div class="result-block">
      <vue-latex :expression="`\\mathrm{Matrice\\ de\\ raideur}_{lt} = ${tex.matrix33(layer.raideur_matrix_on_coordinate_L_T)}`"/>
    </div>
    <div class="result-block">
      <vue-latex :expression="tex.formula.raideur_equation_xy"/>
    </div>
    <div class="result-block">
      <vue-latex :expression="`\\mathrm{Matrice\\ de\\ raideur}_{xy}\\ (\\bar{E}) = ${tex.matrix33(layer.raideur_matrix_on_coordinate_X_Y)}`"/>
    </div>

  </div>
</template>

<style scoped>
.layer-result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
}

.result-block {
  padding: 10px 0;
}
</style>