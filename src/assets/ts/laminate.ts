import {Matrix33, InputtedLayerInfo, Laminate, Layer} from "../../types/types";

import * as math from "mathjs";


function frac(num: number) {
    return 1 / num
}

export class LayerOnCoordinateLT {
    E_l: number
    E_t: number
    G_lt: number
    nu_lt: number
    nu_tl: number
    souplesse_matrix_on_coordinate_L_T: Matrix33

    constructor(E_l: number, E_t: number, nu_lt: number, G_lt: number) {
        this.E_l = E_l
        this.E_t = E_t
        this.G_lt = G_lt
        this.nu_lt = nu_lt
        this.nu_tl = nu_lt * E_t / E_l

        let souplesse_matrix_on_coordinate_L_T = math.matrix([
            [frac(this.E_l), -this.nu_lt / this.E_l, 0],
            [-this.nu_lt / this.E_l, frac(this.E_t), 0],
            [0, 0, frac(this.G_lt)]
        ])
        this.souplesse_matrix_on_coordinate_L_T = souplesse_matrix_on_coordinate_L_T.valueOf() as Matrix33
    }
}


export class LayerOnCoordinateXY extends LayerOnCoordinateLT implements Layer {
    theta: number
    cos_theta: number
    sin_theta: number
    hat_E_l: number
    hat_E_t: number
    E_x: number
    E_y: number
    G_xy: number
    mu_yx: number
    eta_xy: number
    mu_xy: number
    souplesse_matrix_on_coordinate_X_Y: Matrix33

    T: Matrix33
    raideur_matrix_on_coordinate_L_T: Matrix33
    raideur_matrix_on_coordinate_X_Y: Matrix33

    constructor(E_l: number, E_t: number, nu_lt: number, G_lt: number, theta: number) {
        super(E_l, E_t, nu_lt, G_lt);

        this.theta = theta
        let c = this.cos_theta = math.cos(this.theta)
        let s = this.sin_theta = math.sin(this.theta)
        let hat_E_l = this.hat_E_l = this.E_l / (1 - this.nu_lt * this.nu_tl)
        let hat_E_t = this.hat_E_t = this.E_t / (1 - this.nu_lt * this.nu_tl)
        let nu_tl = this.nu_tl
        let E_x = this.E_x = 1 / (c ** 4 / E_l + s ** 4 / E_t + (c * s) ** 2 * (frac(G_lt) - 2 * nu_lt / E_l))
        let E_y = this.E_y = 1 / (s ** 4 / E_l + c ** 4 / E_t + (c * s) ** 2 * (frac(G_lt) - 2 * nu_lt / E_l))
        let G_xy = this.G_xy = 1 / ((4 * (c * s) ** 2) * (frac(E_l) + frac(E_t) + 2 * nu_lt / E_l) + (c ** 2 - s ** 2) ** 2 / G_lt)
        let mu_yx = this.mu_yx = (nu_lt / E_l * (c ** 4 + s ** 4) - (c * s) ** 2 * (frac(E_l) + frac(E_t) - frac(G_lt))) * E_y
        let eta_xy = this.eta_xy = -2 * c * s * (c ** 2 / E_l - s ** 2 / E_t + (c ** 2 - s ** 2) * (nu_lt / E_l - 0.5 * frac(G_lt))) * G_xy
        let mu_xy = this.mu_xy = -2 * c * s * (s ** 2 / E_l - c ** 2 / E_t + (c ** 2 - s ** 2) * (nu_lt / E_l - 0.5 * frac(G_lt))) * G_xy

        let souplesse_matrix_on_coordinate_X_Y = math.matrix([
            [frac(E_x), -mu_yx / E_y, eta_xy / G_xy],
            [-mu_yx / E_y, frac(E_y), mu_xy / G_xy],
            [eta_xy / G_xy, mu_xy / G_xy, frac(this.G_lt)]
        ])
        this.souplesse_matrix_on_coordinate_X_Y = souplesse_matrix_on_coordinate_X_Y.valueOf() as Matrix33

        let T = math.matrix([
            [c ** 2, s ** 2, -2 * c * s],
            [s ** 2, c ** 2, 2 * c * s],
            [c * s, -c * s, c ** 2 - s ** 2]
        ])
        this.T = T.valueOf() as Matrix33

        let raideur_matrix_on_coordinate_L_T = math.matrix([
            [hat_E_l, nu_tl * hat_E_l, 0],
            [hat_E_t * nu_lt, hat_E_t, 0],
            [0, 0, this.G_lt]
        ])
        this.raideur_matrix_on_coordinate_L_T = raideur_matrix_on_coordinate_L_T.valueOf() as Matrix33

        let raideur_matrix_on_coordinate_X_Y = math.multiply<math.Matrix>(math.multiply(T, this.raideur_matrix_on_coordinate_L_T), math.transpose(T))
        this.raideur_matrix_on_coordinate_X_Y = raideur_matrix_on_coordinate_X_Y.valueOf() as Matrix33
    }
}


export class CalculativeLaminate implements Laminate {
    layers: LayerOnCoordinateXY[]
    A: Matrix33
    B: Matrix33
    C: Matrix33
    modules_apparents_matrix: Matrix33;
    theta_list: number[];
    thickness_list: number[];
    total_thickness: number;

    get_Z_k(k: number) {
        if (k <= 0) {
            return - this.total_thickness / 2
        }
        return (this.thickness_list.slice(0, k).reduce((sum, thickness) => sum + thickness)) - this.total_thickness / 2;
    }

    A_row_col(row: number, col: number) {
        // @ts-ignore
        return math.subset(this.A, math.index(row - 1, col - 1)) as number;
    }

    constructor(layer_infos: InputtedLayerInfo[]) {
        this.layers = layer_infos.map(layer_info =>
            new LayerOnCoordinateXY(
                layer_info.E_l ?? 0,
                layer_info.E_t ?? 0,
                layer_info.nu_lt ?? 0,
                layer_info.G_lt ?? 0,
                (layer_info.theta ?? 0) / 180 * math.pi
            )
        )

        this.theta_list = layer_infos.map(layer_info => layer_info.theta ?? 0)
        let thickness_list = this.thickness_list = layer_infos.map(layer_info => layer_info.thickness ?? 1);

        let total_thickness = this.total_thickness = thickness_list.reduce((sum, thickness) => sum + thickness)

        let A = math.zeros(3, 3)
        let B = math.zeros(3, 3)
        let C = math.zeros(3, 3)
        this.A = A.valueOf() as Matrix33
        this.B = B.valueOf() as Matrix33
        this.C = C.valueOf() as Matrix33

        for (let [layer_index, layer] of this.layers.entries()) {
            debugger
            let Z_k = this.get_Z_k(layer_index + 1)
            let Z_k_minus_1 = this.get_Z_k(layer_index)
            this.A = math.add(this.A, math.dotMultiply(thickness_list[layer_index], layer.raideur_matrix_on_coordinate_X_Y)).valueOf() as Matrix33;
            this.B = math.add(this.B, math.dotMultiply((Z_k ** 2 - Z_k_minus_1 ** 2) / 2, math.matrix(layer.raideur_matrix_on_coordinate_X_Y))).valueOf() as Matrix33;
            this.C = math.add(this.C, math.dotMultiply((Z_k ** 3 - Z_k_minus_1 ** 3) / 3, math.matrix(layer.raideur_matrix_on_coordinate_X_Y))).valueOf() as Matrix33;
        }

        let hat_E_x = (this.A_row_col(1, 1) * this.A_row_col(2, 2) - this.A_row_col(1, 2) ** 2) / (this.A_row_col(2, 2) * total_thickness)
        let hat_E_y = (this.A_row_col(1, 1) * this.A_row_col(2, 2) - this.A_row_col(1, 2) ** 2) / (this.A_row_col(1, 1) * total_thickness)
        let hat_nu_xy = this.A_row_col(2, 1) / this.A_row_col(2, 2)
        let hat_nu_yx = this.A_row_col(2, 1) / this.A_row_col(1, 1)
        let hat_G_xy = this.A_row_col(3, 3) / total_thickness

        let modules_apparents_matrix = math.matrix([
            [frac(hat_E_x), -hat_nu_yx / hat_E_y, 0],
            [-hat_nu_xy / hat_E_x, frac(hat_E_y), 0],
            [0, 0, frac(hat_G_xy)]
        ])
        this.modules_apparents_matrix = modules_apparents_matrix.valueOf() as Matrix33
    }
}
