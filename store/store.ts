import {defineStore} from "pinia";
import {Laminate} from "../types/types";
import axios from "axios";


type State = {
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
            // result: undefined,
            result: {
                "theta_list": [
                    0,
                    1.5707963267948966,
                    1.5707963267948966,
                    0
                ],
                "layers": [
                    {
                        "E_l": 140,
                        "E_t": 5,
                        "G_lt": 5,
                        "nu_lt": 0.35,
                        "nu_tl": 0.0125,
                        "souplesse_matrix_on_coordinate_L_T": [
                            [
                                0.007142857142857143,
                                -0.0025,
                                0
                            ],
                            [
                                -0.0025,
                                0.2,
                                0
                            ],
                            [
                                0,
                                0,
                                0.2
                            ]
                        ],
                        "theta": 0,
                        "cos_theta": 1,
                        "sin_theta": 0,
                        "hat_E_l": 140.61519146264908,
                        "hat_E_t": 5.021971123666039,
                        "E_x": 140,
                        "E_y": 5,
                        "G_xy": 5,
                        "mu_yx": 0.0125,
                        "eta_xy": 0,
                        "mu_xy": 0,
                        "souplesse_matrix_on_coordinate_X_Y": [
                            [
                                0.007142857142857143,
                                -0.0025,
                                0
                            ],
                            [
                                -0.0025,
                                0.2,
                                0
                            ],
                            [
                                0,
                                0,
                                0.2
                            ]
                        ],
                        "T": [
                            [
                                1,
                                0,
                                0
                            ],
                            [
                                0,
                                1,
                                0
                            ],
                            [
                                0,
                                0,
                                1
                            ]
                        ],
                        "raideur_matrix_on_coordinate_L_T": [
                            [
                                140.61519146264908,
                                1.7576898932831135,
                                0
                            ],
                            [
                                1.7576898932831135,
                                5.021971123666039,
                                0
                            ],
                            [
                                0,
                                0,
                                5
                            ]
                        ],
                        "raideur_matrix_on_coordinate_X_Y": [
                            [
                                140.61519146264908,
                                1.7576898932831135,
                                0
                            ],
                            [
                                1.7576898932831135,
                                5.021971123666039,
                                0
                            ],
                            [
                                0,
                                0,
                                5
                            ]
                        ]
                    },
                    {
                        "E_l": 140,
                        "E_t": 5,
                        "G_lt": 5,
                        "nu_lt": 0.35,
                        "nu_tl": 0.0125,
                        "souplesse_matrix_on_coordinate_L_T": [
                            [
                                0.007142857142857143,
                                -0.0025,
                                0
                            ],
                            [
                                -0.0025,
                                0.2,
                                0
                            ],
                            [
                                0,
                                0,
                                0.2
                            ]
                        ],
                        "theta": 1.5707963267948966,
                        "cos_theta": 6.123233995736766e-17,
                        "sin_theta": 1,
                        "hat_E_l": 140.61519146264908,
                        "hat_E_t": 5.021971123666039,
                        "E_x": 5,
                        "E_y": 140,
                        "G_xy": 5,
                        "mu_yx": 0.35000000000000003,
                        "eta_xy": 6.276314845630185e-17,
                        "mu_xy": -6.407527002681688e-17,
                        "souplesse_matrix_on_coordinate_X_Y": [
                            [
                                0.2,
                                -0.0025,
                                1.255262969126037e-17
                            ],
                            [
                                -0.0025,
                                0.007142857142857143,
                                -1.2815054005363376e-17
                            ],
                            [
                                1.255262969126037e-17,
                                -1.2815054005363376e-17,
                                0.2
                            ]
                        ],
                        "T": [
                            [
                                3.749399456654644e-33,
                                1,
                                -1.2246467991473532e-16
                            ],
                            [
                                1,
                                3.749399456654644e-33,
                                1.2246467991473532e-16
                            ],
                            [
                                6.123233995736766e-17,
                                -6.123233995736766e-17,
                                -1
                            ]
                        ],
                        "raideur_matrix_on_coordinate_L_T": [
                            [
                                140.61519146264908,
                                1.7576898932831135,
                                0
                            ],
                            [
                                1.7576898932831135,
                                5.021971123666039,
                                0
                            ],
                            [
                                0,
                                0,
                                5
                            ]
                        ],
                        "raideur_matrix_on_coordinate_X_Y": [
                            [
                                5.021971123666039,
                                1.7576898932831135,
                                4.12443821558415e-16
                            ],
                            [
                                1.7576898932831135,
                                140.61519146264908,
                                7.890246342152453e-15
                            ],
                            [
                                4.1244382155841494e-16,
                                7.890246342152453e-15,
                                5
                            ]
                        ]
                    },
                    {
                        "E_l": 140,
                        "E_t": 5,
                        "G_lt": 5,
                        "nu_lt": 0.35,
                        "nu_tl": 0.0125,
                        "souplesse_matrix_on_coordinate_L_T": [
                            [
                                0.007142857142857143,
                                -0.0025,
                                0
                            ],
                            [
                                -0.0025,
                                0.2,
                                0
                            ],
                            [
                                0,
                                0,
                                0.2
                            ]
                        ],
                        "theta": 1.5707963267948966,
                        "cos_theta": 6.123233995736766e-17,
                        "sin_theta": 1,
                        "hat_E_l": 140.61519146264908,
                        "hat_E_t": 5.021971123666039,
                        "E_x": 5,
                        "E_y": 140,
                        "G_xy": 5,
                        "mu_yx": 0.35000000000000003,
                        "eta_xy": 6.276314845630185e-17,
                        "mu_xy": -6.407527002681688e-17,
                        "souplesse_matrix_on_coordinate_X_Y": [
                            [
                                0.2,
                                -0.0025,
                                1.255262969126037e-17
                            ],
                            [
                                -0.0025,
                                0.007142857142857143,
                                -1.2815054005363376e-17
                            ],
                            [
                                1.255262969126037e-17,
                                -1.2815054005363376e-17,
                                0.2
                            ]
                        ],
                        "T": [
                            [
                                3.749399456654644e-33,
                                1,
                                -1.2246467991473532e-16
                            ],
                            [
                                1,
                                3.749399456654644e-33,
                                1.2246467991473532e-16
                            ],
                            [
                                6.123233995736766e-17,
                                -6.123233995736766e-17,
                                -1
                            ]
                        ],
                        "raideur_matrix_on_coordinate_L_T": [
                            [
                                140.61519146264908,
                                1.7576898932831135,
                                0
                            ],
                            [
                                1.7576898932831135,
                                5.021971123666039,
                                0
                            ],
                            [
                                0,
                                0,
                                5
                            ]
                        ],
                        "raideur_matrix_on_coordinate_X_Y": [
                            [
                                5.021971123666039,
                                1.7576898932831135,
                                4.12443821558415e-16
                            ],
                            [
                                1.7576898932831135,
                                140.61519146264908,
                                7.890246342152453e-15
                            ],
                            [
                                4.1244382155841494e-16,
                                7.890246342152453e-15,
                                5
                            ]
                        ]
                    },
                    {
                        "E_l": 140,
                        "E_t": 5,
                        "G_lt": 5,
                        "nu_lt": 0.35,
                        "nu_tl": 0.0125,
                        "souplesse_matrix_on_coordinate_L_T": [
                            [
                                0.007142857142857143,
                                -0.0025,
                                0
                            ],
                            [
                                -0.0025,
                                0.2,
                                0
                            ],
                            [
                                0,
                                0,
                                0.2
                            ]
                        ],
                        "theta": 0,
                        "cos_theta": 1,
                        "sin_theta": 0,
                        "hat_E_l": 140.61519146264908,
                        "hat_E_t": 5.021971123666039,
                        "E_x": 140,
                        "E_y": 5,
                        "G_xy": 5,
                        "mu_yx": 0.0125,
                        "eta_xy": 0,
                        "mu_xy": 0,
                        "souplesse_matrix_on_coordinate_X_Y": [
                            [
                                0.007142857142857143,
                                -0.0025,
                                0
                            ],
                            [
                                -0.0025,
                                0.2,
                                0
                            ],
                            [
                                0,
                                0,
                                0.2
                            ]
                        ],
                        "T": [
                            [
                                1,
                                0,
                                0
                            ],
                            [
                                0,
                                1,
                                0
                            ],
                            [
                                0,
                                0,
                                1
                            ]
                        ],
                        "raideur_matrix_on_coordinate_L_T": [
                            [
                                140.61519146264908,
                                1.7576898932831135,
                                0
                            ],
                            [
                                1.7576898932831135,
                                5.021971123666039,
                                0
                            ],
                            [
                                0,
                                0,
                                5
                            ]
                        ],
                        "raideur_matrix_on_coordinate_X_Y": [
                            [
                                140.61519146264908,
                                1.7576898932831135,
                                0
                            ],
                            [
                                1.7576898932831135,
                                5.021971123666039,
                                0
                            ],
                            [
                                0,
                                0,
                                5
                            ]
                        ]
                    }
                ],
                "thickness_list": [
                    1,
                    1,
                    1,
                    1
                ],
                "total_thickness": 4,
                "A": [
                    [
                        291.27432517263026,
                        7.030759573132454,
                        8.2488764311683e-16
                    ],
                    [
                        7.030759573132454,
                        291.27432517263026,
                        1.5780492684304905e-14
                    ],
                    [
                        8.248876431168299e-16,
                        1.5780492684304905e-14,
                        20
                    ]
                ],
                "B": [
                    [
                        0,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        0
                    ]
                ],
                "C": [
                    [
                        659.5522075748064,
                        9.37434609750994,
                        2.7496254770560996e-16
                    ],
                    [
                        9.37434609750994,
                        117.17932621887422,
                        5.2601642281016345e-15
                    ],
                    [
                        2.7496254770560996e-16,
                        5.2601642281016345e-15,
                        26.666666666666668
                    ]
                ],
                "modules_apparents_matrix": [
                    [
                        0.013740764535817539,
                        -0.0003316736267266302,
                        0
                    ],
                    [
                        -0.0003316736267266302,
                        0.013740764535817539,
                        0
                    ],
                    [
                        0,
                        0,
                        0.2
                    ]
                ]
            },
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
            axios.post("http://localhost:5000/", postData).then(
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
            )
        },
    },
})