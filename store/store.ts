import {defineStore} from "pinia";
import {Laminate} from "../types/types";
import axios from "axios";


type State = {
    isLoading: boolean,
    collapseActiveName: "input" | "result" | "error",
    errorMessage: string,
    inputted: {
        E_l: number | null,
        E_t: number | null,
        nu_lt: number | null,
        G_lt: number | null,
        theta_list: (number | null)[],
        thickness_list: (number | null)[],
    },
    result: Laminate | undefined,
}

export const useStore = defineStore('store', {
    state(): State {
        return {
            isLoading: false,
            collapseActiveName: "input",
            errorMessage: "",
            inputted: {
                E_l: null,
                E_t: null,
                nu_lt: null,
                G_lt: null,
                theta_list: [],
                thickness_list: [],
            },
            result: undefined,
        }
    },
    getters: {
        whetherCanSubmit(): boolean {
            if (!this.inputted.E_l || !this.inputted.E_t || !this.inputted.nu_lt || !this.inputted.G_lt) {
                return false
            }

            if (this.inputted.theta_list.length === 0 || this.inputted.thickness_list.length === 0) {
                return false;
            }
            for (const theta of this.inputted.theta_list) {
                if (theta === null) return false;
            }
            for (const thickness of this.inputted.thickness_list) {
                if (!thickness) return false  // 厚度不能为0
            }
            return true
        }
    },
    actions: {
        submitToGetResult() {
            this.isLoading = true
            this.errorMessage = ""  // 清除原有错误信息
            console.log("submitToGetResult")
            let postData = {
                E_l: this.inputted.E_l,
                E_t: this.inputted.E_t,
                nu_lt: this.inputted.nu_lt,
                G_lt: this.inputted.G_lt,
                theta_list: this.inputted.theta_list,
                thickness: this.inputted.thickness_list,
            }
            axios.post("http://localhost:8000/", postData).then(
                response => {
                    try {
                        this.result = response.data as Laminate
                        this.collapseActiveName = "result"
                    } catch (e) {
                        this.errorMessage = `${e}`
                        this.collapseActiveName = "error"
                    } finally {
                        console.log("response", response)
                    }
                },
                error => {
                    this.errorMessage = `${error}`
                    this.collapseActiveName = "error"
                },
            ).finally(() => this.isLoading = false);
        },
    },
})