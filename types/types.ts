export type Matrix33 = [[number, number, number], [number, number, number], [number, number, number]]

export interface InputtedLayerInfo {
    "E_l": number | null,
    "E_t": number | null,
    "nu_lt": number | null,
    "G_lt": number | null,
    "theta": number | null,
    "thickness": number | null,
}

export interface Layer {
    "E_l": number,
    "E_t": number,
    "E_x": number,
    "E_y": number,
    "G_lt": number,
    "G_xy": number,
    "T": Matrix33,
    "cos_theta": number,
    "eta_xy": number,
    "hat_E_l": number,
    "hat_E_t": number,
    "mu_xy": number,
    "mu_yx": number,
    "nu_lt": number,
    "nu_tl": number,
    "raideur_matrix_on_coordinate_L_T": Matrix33,
    "raideur_matrix_on_coordinate_X_Y": Matrix33,
    "sin_theta": number,
    "souplesse_matrix_on_coordinate_L_T": Matrix33,
    "souplesse_matrix_on_coordinate_X_Y": Matrix33,
    "theta": number
}


export interface Laminate {
    "A": Matrix33,
    "B": Matrix33,
    "C": Matrix33,
    "modules_apparents_matrix": Matrix33,
    "theta_list": number[],
    "thickness_list": number[],
    "total_thickness": number,
    "layers": Layer[]
}