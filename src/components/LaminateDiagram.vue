<script setup lang="ts">
import {useStore} from "../store/store";
import {computed} from "vue";

const store = useStore()

const minTheta = computed(() => {
  let thetaList = store.inputtedLayerInfos.map(li => li.theta)
  let minTheta: null | number = null
  for (const theta of thetaList) {
    if (theta !== null) {
      if (minTheta === null || minTheta > theta) minTheta = theta
    }
  }
  return minTheta === null ? 0 : minTheta
})

function getHue(theta: number | null, bias: number = 60) {
  if (theta === null) return bias

  let hue: number = theta - minTheta.value + bias
  if (hue > 360) return hue - 360
  if (hue < 0) return hue + 360
  return hue
}

const localLayerInfos = computed(() => store.inputtedLayerInfos.map((li, index) => {
  return {...li, key: `${index}${new Date()}`}
}))
</script>

<template>
  <div class="laminate-diagram">
    <div class="layer-diagram">
      <div class="layer-diagram-attribute" style="flex: 1">&nbsp;</div>
      <div class="layer-diagram-attribute">
        <vue-latex expression="\theta"/>
      </div>
      <div class="layer-diagram-attribute">
        <vue-latex expression="E_l"/>
      </div>
      <div class="layer-diagram-attribute">
        <vue-latex expression="E_t"/>
      </div>
      <div class="layer-diagram-attribute">
        <vue-latex expression="G_{tl}"/>
      </div>
      <div class="layer-diagram-attribute">
        <vue-latex expression="\nu_{tl}"/>
      </div>
      <div class="layer-diagram-attribute">
        <vue-latex expression="e"/>
      </div>
    </div>

    <div class="layer-diagram"
         v-for="(layer, index) in localLayerInfos"
         :key="layer.key">
      <div class="layer-diagram-attribute" :style="{backgroundColor: `hsl(${getHue(layer.theta)}, 50%, 50%)`, flex: 1}">&nbsp;</div>
      <div class="layer-diagram-attribute">{{ layer.theta !== null ? `${layer.theta}°` : '?' }}</div>
      <div class="layer-diagram-attribute">{{ layer.E_l !== null ? `${layer.E_l}` : '?' }}</div>
      <div class="layer-diagram-attribute">{{ layer.E_t !== null ? `${layer.E_t}` : '?' }}</div>
      <div class="layer-diagram-attribute">{{ layer.G_lt !== null ? `${layer.G_lt}` : '?' }}</div>
      <div class="layer-diagram-attribute">{{ layer.nu_lt !== null ? `${layer.nu_lt}` : '?' }}</div>
      <div class="layer-diagram-attribute">{{ layer.thickness !== null ? `${layer.thickness}` : '?' }}</div>
    </div>
  </div>
</template>

<style scoped>
.laminate-diagram {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 10px 20px;
}

.layer-diagram {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.layer-diagram-attribute {
  border: black 1px solid;
  flex: 0 0 13%;
}
</style>
