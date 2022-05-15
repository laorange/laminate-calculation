from typing import Union, List
from pprint import pprint

import numpy as np
from numpy import pi

Number = Union[int, float]


def frac(number: Number):
    return 1 / number


def input_a_number(help_text: str = "请输入一个数字", is_int: bool = False) -> Number:
    while 1:
        number = input(help_text + ": ")
        try:
            result = int(number) if is_int else float(number)
            print()
            return result
        except ValueError as e:
            print(e)
            print("您的输入不正确，请重新输入")


def input_a_number_list(help_text: str = "现在请输入一串数字", max_length: int = 1) -> List[Number]:
    ls: List[Number] = []
    print(f"{help_text}, 共需要输入{max_length}个数")
    while 1:
        if len(ls) == max_length:
            return ls
        ls.append(input_a_number(f"现在，请输入第{len(ls) + 1}个数"))


class LayerOnCoordinateLT:
    def __init__(self, E_l: Number, E_t: Number, mu_lt: Number, G_lt: Number):
        super().__init__()
        self.E_l = E_l
        self.E_t = E_t
        self.G_lt = G_lt
        self.mu_lt = mu_lt
        self.mu_tl = mu_lt * E_t / E_l

        self.souplesse_matrix_on_coordinate_L_T = np.array([
            [frac(self.E_l), - self.mu_lt / self.E_l, 0],
            [- self.mu_lt / self.E_l, frac(self.E_t), 0],
            [0, 0, frac(self.G_lt)]
        ])

    def updateWithTheta(self, theta):
        return LayerOnCoordinateXY(self.E_l, self.E_t, self.mu_lt, self.G_lt, theta)


class LayerOnCoordinateXY(LayerOnCoordinateLT):
    def __init__(self, E_l: Number, E_t: Number, mu_lt: Number, G_lt: Number, theta: Number):
        super(LayerOnCoordinateXY, self).__init__(E_l, E_t, mu_lt, G_lt)

        self.theta = theta
        c = self.cos_theta = np.cos(self.theta)
        s = self.sin_theta = np.sin(self.theta)

        hat_E_l = self.hat_E_l = self.E_l / (1 - self.mu_lt * self.mu_tl)
        hat_E_t = self.hat_E_t = self.E_t / (1 - self.mu_lt * self.mu_tl)

        # localization
        mu_tl = self.mu_tl
        frac_mu_lt__E_t = self.mu_lt / self.E_l

        hat_E11 = self.hat_E11 = c ** 4 * hat_E_l + s ** 4 * hat_E_t + 2 * (c * s) ** 2 * (mu_tl * hat_E_l + 2 * G_lt)
        hat_E22 = self.hat_E22 = s ** 4 * hat_E_l + c ** 4 * hat_E_t + 2 * (c * s) ** 2 * (mu_tl * hat_E_l + 2 * G_lt)
        hat_E33 = self.hat_E33 = (c * s) ** 2 * (hat_E_l + hat_E_t - 2 * mu_tl * hat_E_l) + (c ** 2 - s ** 2) ** 2 * G_lt
        hat_E12 = self.hat_E12 = (c * s) ** 2 * (hat_E_l + hat_E_t - 4 * G_lt) + (c ** 4 + s ** 4) * mu_tl * hat_E_l
        hat_E13 = self.hat_E13 = -(c * s) * (c ** 2 * hat_E_l - s ** 2 * hat_E_t - (c ** 2 - s ** 2) * mu_tl * hat_E_l + 2 * G_lt)
        hat_E23 = self.hat_E23 = -(c * s) * (s ** 2 * hat_E_l - c ** 2 * hat_E_t - (c ** 2 - s ** 2) * mu_tl * hat_E_l + 2 * G_lt)
        hat_E21 = self.hat_E21 = self.hat_E12
        hat_E31 = self.hat_E31 = self.hat_E13
        hat_E32 = self.hat_E32 = self.hat_E23

        self.E_x = E_x = 1 / (c ** 4 / E_l + s ** 4 / E_t + (c * s) ** 2 * (frac(G_lt) - 2 * frac_mu_lt__E_t))
        self.E_y = E_y = 1 / (s ** 4 / E_l + c ** 4 / E_t + (c * s) ** 2 * (frac(G_lt) - 2 * frac_mu_lt__E_t))
        self.G_xy = G_xy = 1 / ((4 * (c * s) ** 2) * (frac(E_l) + frac(E_t) + 2 * frac_mu_lt__E_t) + (c ** 2 - s ** 2) ** 2 / G_lt)
        self.mu_yx = mu_yx = (frac_mu_lt__E_t * (c ** 4 + s ** 4) - (c * s) ** 2 * (frac(E_l) + frac(E_t) - frac(G_lt))) * E_y
        self.eta_xy = eta_xy = -2 * c * s * (c ** 2 / E_l - s ** 2 / E_t + (c ** 2 - s ** 2) * (frac_mu_lt__E_t - 0.5 * frac(G_lt))) * G_xy
        self.mu_xy = mu_xy = -2 * c * s * (s ** 2 / E_l - c ** 2 / E_t + (c ** 2 - s ** 2) * (frac_mu_lt__E_t - 0.5 * frac(G_lt))) * G_xy

        self.souplesse_matrix_on_coordinate_X_Y = np.array([
            [frac(E_x), -mu_yx / E_y, eta_xy / G_xy],
            [-mu_yx / E_y, frac(E_y), mu_xy / G_xy],
            [eta_xy / G_xy, mu_xy / G_xy, frac(self.G_lt)]
        ])

        self.raideur_matrix_on_coordinate_L_T = np.array([
            [hat_E_l, self.mu_tl * hat_E_l, 0],
            [hat_E_t * self.mu_lt, hat_E_t, 0],
            [0, 0, self.G_lt]
        ])

        self.raideur_matrix_on_coordinate_X_Y = np.array([
            [hat_E11, hat_E12, hat_E13],
            [hat_E21, hat_E22, hat_E23],
            [hat_E31, hat_E32, hat_E33]
        ])


class Laminate:
    def __init__(self,
                 E_l: Number, E_t: Number, mu_lt: Number, G_lt: Number,
                 theta_list: List[Union[int, float]], thickness: Number):
        self.layers: List[LayerOnCoordinateXY] = [LayerOnCoordinateXY(E_l, E_t, mu_lt, G_lt, theta) for theta in theta_list]

        self.layer_amount = len(theta_list) / 2
        self.theta_list = [theta / 180 * pi for theta in theta_list]
        self.thickness = thickness
        total_thickness = self.total_thickness = len(theta_list) * thickness

        self.A = np.zeros((3, 3))
        self.B = np.zeros((3, 3))
        self.C = np.zeros((3, 3))
        for layer_index, layer in enumerate(self.layers):
            Z_k = self.get_Z_k(layer_index + 1)
            Z_k_minus_1 = self.get_Z_k(layer_index)
            self.A += thickness * layer.raideur_matrix_on_coordinate_X_Y
            self.B += layer.raideur_matrix_on_coordinate_X_Y * (Z_k ** 2 - Z_k_minus_1 ** 2) / 2
            self.B += layer.raideur_matrix_on_coordinate_X_Y * (Z_k ** 3 - Z_k_minus_1 ** 3) / 3

        self.hat_E_x = (self.A_row_col(1, 1) * self.A_row_col(2, 2) - self.A_row_col(1, 2) ** 2) / (self.A_row_col(2, 2) * total_thickness)
        self.hat_E_y = (self.A_row_col(1, 1) * self.A_row_col(2, 2) - self.A_row_col(1, 2) ** 2) / (self.A_row_col(1, 1) * total_thickness)
        self.hat_mu_x_y = self.A_row_col(2, 1) / self.A_row_col(2, 2)
        self.hat_mu_y_x = self.A_row_col(2, 1) / self.A_row_col(1, 1)

    def get_Z_k(self, k: int):
        """
        :param k:  第k层板，从1开始计数
        :return: Z_k
        """
        layer_amount = self.layer_amount
        thickness = self.thickness
        if k == 0:
            return 0
        elif k <= layer_amount:
            return (-layer_amount / 2 + k - 1) * thickness
        else:
            return (k - layer_amount / 2) * thickness

    def A_row_col(self, row, col):
        return self.A[row - 1][col - 1]

    def print(self):
        print("Laminate:")
        pprint(self.__dict__)
        for index, layer in enumerate(self.layers):
            print(f"\n\n\n-----layer{index + 1}:")
            pprint(layer.__dict__)

    @staticmethod
    def transform_ndarray_property(obj):
        for key, value in obj.__dict__.items():
            if isinstance(value, np.ndarray):
                obj.__setattr__(key, value.tolist())

    def destructive_print(self):
        self.transform_ndarray_property(self)
        for layer in self.layers:
            self.transform_ndarray_property(layer)
        self.print()


if __name__ == '__main__':
    DEBUG = True
    if DEBUG:
        inputted_E_l = 140e9
        inputted_E_t = 5e9
        inputted_mu_lt = 0.35
        inputted_G_lt = 4
        inputted_theta_list = [0, 90, 90, 0]
        inputted_thickness = 10
    else:
        inputted_E_l = input_a_number("请输入E_l(参考值: 140e9)")
        inputted_E_t = input_a_number("请输入E_t(参考值: 5e9)")
        inputted_mu_lt = input_a_number("请输入mu_lt(参考值: 0.35)")
        inputted_G_lt = input_a_number("请输入G_lt(参考值: 4)")
        inputted_layer_amount = input_a_number("请输入层合板的层数(参考值: 4)", is_int=True)
        inputted_theta_list = input_a_number_list("请逐个输入各层板的纤维角度(参考值: 0,45,60,90)", max_length=inputted_layer_amount)
        inputted_thickness = input_a_number("请输入单板层的厚度(0.1)")

    print("\n\n-------------\n\n")

    laminate = Laminate(E_l=inputted_E_l,
                        E_t=inputted_E_t,
                        mu_lt=inputted_mu_lt,
                        G_lt=inputted_G_lt,
                        theta_list=inputted_theta_list,
                        thickness=inputted_thickness)

    laminate.destructive_print()
