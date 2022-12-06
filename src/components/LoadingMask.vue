<script setup lang="ts">
import {computed, ref, watch} from "vue";

const props = defineProps({value: Boolean});
const isLoading = ref(false);

class TimeoutStabilizer {
  // 防抖器
  constructor(executedFunc: () => any, stabilizingTime?: number) {
    this.executedFunc = executedFunc;
    this.stabilizingTime = stabilizingTime ?? 500;
  }

  timer: null | number = null;
  executedFunc: () => any;  // 需要添加防抖的函数
  stabilizingTime: number;  // 防抖的最大间隔时间
  execute() {
    setTimeout(
        () => {
          if (this.timer) clearTimeout(this.timer);
          this.timer = setTimeout(this.executedFunc, this.stabilizingTime);
        },
        500,
    );
  }
}

const isLoadingStabilizer = new TimeoutStabilizer(() => isLoading.value = props.value);  // 同步 props.value 与 本地 isLoading
watch(() => props.value, (newStatus) => {
  // 没有加载 => 开始加载
  if (isLoading.value === false && newStatus) isLoading.value = newStatus;
  // 正在加载 => 加载完毕
  else if (isLoading.value === true && !newStatus) {
    isLoadingStabilizer.execute();  // 防抖
  }
}, {immediate: true});
const ellipsisNum = ref<number>(1);
const ellipsis = computed<string>(() => new Array(ellipsisNum.value).fill(".").join(""));
let changeEllipsisNumTimer: null | number = null;
watch(() => isLoading.value, (isLoadingValue) => {
  if (changeEllipsisNumTimer) {
    clearInterval(changeEllipsisNumTimer);
  }
  if (isLoadingValue) {
    changeEllipsisNumTimer = setInterval(() => {
      if (ellipsisNum.value < 3) ellipsisNum.value += 1;
      else ellipsisNum.value = 1;
    }, 333);
  }
}, {immediate: true});
</script>


<template>
  <div v-show="isLoading">
    <div class="Mask"></div>
    <div id="canvasContainer">
      <!-- region: Forked from https://codepen.io/aurer/details/ZEJxpO -->
      <svg id="loading-svg" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
           width="40px" height="40px" viewBox="0 0 50 50" xml:space="preserve"
      >
          <path
              fill="#000"
              d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
          >
            <animateTransform attributeType="xml"
                              attributeName="transform"
                              type="rotate"
                              from="0 25 25"
                              to="360 25 25"
                              dur="0.6s"
                              repeatCount="indefinite"/>
          </path>
      </svg>
      <!-- endregion -->

      <div class="LoadingContent">正在请求数据</div>
      <div class="LoadingContent">{{ ellipsis }}</div>
    </div>
  </div>
</template>


<style scoped>
.Mask {
  background-color: grey;
  opacity: 10%;
  position: fixed;
  width: 100%;
  height: 100%;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 998
}

#canvasContainer {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.LoadingContent {
  margin-top: 10px;
}
</style>
