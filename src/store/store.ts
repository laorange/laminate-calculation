import {defineStore} from "pinia";
import {InputtedLayerInfo, Laminate} from "../types/types";
import {CalculativeLaminate} from "../assets/ts/laminate";


type State = {
    isLoading: boolean,
    collapseActiveName: "input" | "result" | "error",
    errorMessage: string,
    inputtedLayerInfos: InputtedLayerInfo[],
    result: Laminate | undefined,
}

export const useStore = defineStore('store', {
    state(): State {
        return {
            isLoading: false,
            collapseActiveName: "input",
            errorMessage: "",
            inputtedLayerInfos: [],
            result: undefined,
        }
    },
    getters: {
        dataCompletionDegree(): number {
            let finished = 0
            if (this.inputtedLayerInfos.length === 0) return 0
            let total = this.inputtedLayerInfos.length * 6

            function ifItIsNotNullAdd1ToFinished(sth: unknown | null) {
                if (sth !== null) finished += 1
            }

            for (const inputtedLayerInfo of this.inputtedLayerInfos) {
                ifItIsNotNullAdd1ToFinished(inputtedLayerInfo.E_l)
                ifItIsNotNullAdd1ToFinished(inputtedLayerInfo.E_t)
                ifItIsNotNullAdd1ToFinished(inputtedLayerInfo.nu_lt)
                ifItIsNotNullAdd1ToFinished(inputtedLayerInfo.G_lt)
                ifItIsNotNullAdd1ToFinished(inputtedLayerInfo.theta)
                ifItIsNotNullAdd1ToFinished(inputtedLayerInfo.thickness)
            }

            return Math.round(finished / total * 100)
        },
        whetherCanSubmit(): boolean {
            return this.dataCompletionDegree === 100
        }
    },
    actions: {
        submitToGetResult() {
            this.errorMessage = ""  // 清除原有错误信息
            console.log("submitToGetResult")
            try {
                this.result = new CalculativeLaminate(this.inputtedLayerInfos)
                this.collapseActiveName = "result"
            } catch (e) {
                this.errorMessage = `${e}`
                this.collapseActiveName = "error"
            }
        },
    },
})
