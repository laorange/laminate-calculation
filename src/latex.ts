import {Matrix33} from "./types/types";

export const tex = {
    formula: {
        souplesse_equation_lt: `\\left\\{\\begin{array}{c}\\varepsilon_{l} \\\\ \\varepsilon_{t} \\\\ \\gamma_{l t}\\end{array}\\right\\}=\\left[\\begin{array}{ccc}\\frac{1}{E_{l}} & \\frac{-v_{t l}}{E_{t}} & 0 \\\\ \\frac{-\\nu_{l t}}{E_l} & \\frac{1}{E_{t}} & 0 \\\\ 0 & 0 & \\frac{1}{G_{l t}}\\end{array}\\right]\\left\\{\\begin{array}{l}\\sigma_{l} \\\\ \\sigma_{t} \\\\ \\sigma_{l t}\\end{array}\\right\\}(+\\Delta T\\left\\{\\begin{array}{c}\\alpha_{l} \\\\ \\alpha_{t} \\\\ 0\\end{array}\\right\\}\\approx 0)`,
        souplesse_equation_xy: `\\left\\{\\begin{array}{c}\\varepsilon_{x} \\\\ \\varepsilon_{y} \\\\ \\gamma_{x y}\\end{array}\\right\\}=\\left[\\begin{array}{ccc}\\frac{1}{E_{x}} & \\frac{-\\nu_{y x}}{E_{y}} & \\frac{\\eta_{x y}}{G_{x y}} \\\\ -\\frac{\\nu_{x y}}{E_x} & \\frac{1}{E_{y}} & \\frac{\\mu_{x y}}{G_{x y}} \\\\ \\frac{E_{x}}{\\eta_{x}} & \\frac{\\mu_{y}}{E_{y}} & \\frac{1}{G_{x y}}\\end{array}\\right]\\left\\{\\begin{array}{c}\\sigma_{x} \\\\ \\sigma_{y} \\\\ \\sigma_{x y}\\end{array}\\right\\}`,
        raideur_equation_lt: `\\left\\{\\begin{array}{c}\\sigma_{l} \\\\ \\sigma_{t} \\\\ \\sigma_{l t}\\end{array}\\right\\}=\\left[\\begin{array}{ccc}\\frac{E_{l}}{1-\\nu_{l t} \\nu_{t l}} & \\frac{\\nu_{t l} E_{l}}{1-\\nu_{l t} \\nu_{t l}} & 0 \\\\ \\frac{\\nu_{l t} E_{t}}{1-\\nu_{l t} \\nu_{t l}} & \\frac{E_{t}}{1-\\nu_{l t} \\nu_{t l}} & 0 \\\\ 0 & 0 & G_{l t}\\end{array}\\right]\\left\\{\\begin{array}{c}\\varepsilon_{l} \\\\ \\varepsilon_{t} \\\\ 2 \\varepsilon_{l t}\\end{array}\\right\\}=\\left[\\begin{array}{ccc}\\overline{E_{l}} & \\nu_{t l} \\overline{E_{l}} & 0 \\\\ \\nu_{l t} \\overline{E_{t}} & \\overline{E_{t}} & 0 \\\\ 0 & 0 & G_{l t}\\end{array}\\right]\\left\\{\\begin{array}{c}\\varepsilon_{l} \\\\ \\varepsilon_{t} \\\\ 2 \\varepsilon_{l t}\\end{array}\\right\\}`,
        raideur_equation_xy: `\\left\\{\\begin{array}{c}\\sigma_{x} \\\\ \\sigma_{y} \\\\ \\sigma_{x y}\\end{array}\\right\\}=\\left[T_{1}\\right]\\left[\\begin{array}{ccc}\\overline{E_{l}} & \\nu_{t l} \\overline{E_{l}} & 0 \\\\ \\nu_{l t} \\overline{E_{t}} & \\bar{E}_{t} & 0 \\\\ 0 & 0 & G_{l t}\\end{array}\\right]\\left[T_{1}^{\\prime}\\right]\\left\\{\\begin{array}{c}\\varepsilon_{x} \\\\ \\varepsilon_{y} \\\\ \\gamma_{x y}\\end{array}\\right\\}=\\left[\\begin{array}{ccc}\\bar{E}_{11} & \\bar{E}_{12} & \\bar{E}_{13} \\\\ \\bar{E}_{21} & \\bar{E}_{22} & \\bar{E}_{23} \\\\ \\bar{E}_{31} & \\bar{E}_{32} & \\bar{E}_{33}\\end{array}\\right]\\left\\{\\begin{array}{c}\\varepsilon_{x} \\\\ \\varepsilon_{y} \\\\ \\gamma_{x y}\\end{array}\\right\\}`,

        A_ij: `A_{i j}=\\sum\\limits_{k=1^{er} pli}\\limits^{n^{ieme} pli} \\bar{E}_{ij}^{k} e_{k}=A_{ji}`,
        B_ij: `B_{i j}=\\sum\\limits_{k=1^{e r} p l i}\\limits^{k=n^{\\mathrm{e} m e} p l i} \\bar{E}_{i j}^{k} \\frac{z_{k}^{2}-z_{k-1}^{2}}{2}`,
        C_ij: `C_{i j}=\\sum\\limits_{k=1^{e r} p l i}\\limits^{k=n^{\\mathrm{e} m e} p l i} \\bar{E}_{i j}^{k} \\frac{z_{k}^{3}-z_{k-1}^{3}}{3}`,

        modules_apparents_matrix: `\\left\\{\\begin{array}{c}\\varepsilon_{o x} \\\\ \\varepsilon_{o y} \\\\ \\gamma_{o x y}\\end{array}\\right\\}=\\mathrm{h}[A]^{-1}\\left\\{\\begin{array}{c}\\sigma_{0 x} \\\\ \\sigma_{0 y} \\\\ \\sigma_{0 x y}\\end{array}\\right\\} = \\left[\\begin{array}{ccc}\\frac{1}{\\bar{E}_{x}} & -\\frac{\\bar{v}_{y x}}{\\bar{E}_{y}} & \\frac{\\bar{\\eta}_{x y}}{\\bar{G}_{x y}} \\\\ -\\frac{\\bar{v}_{x y}}{\\bar{E}_{x}} & \\frac{1}{\\overline{{E}}_{y}} & \\frac{\\bar{\\nu}_{x y}}{\\bar{G}_{x y}} \\\\ \\bar{\\eta}_{x} & \\bar{\\nu}_{y} & 1 \\\\ \\overline{\\bar{E}}_{x} & \\overline{\\bar{E}}_{y} & \\overline{\\bar{G}}_{x y}\\end{array}\\right]\\left\\{\\begin{array}{l}\\sigma_{0 x} \\\\ \\sigma_{0 y} \\\\ \\sigma_{0 x y}\\end{array}\\right\\}`,
        matrix_A: `\\left\\{\\begin{array}{c}\\sigma_{0 x} \\\\ \\sigma_{0 y} \\\\ \\sigma_{0 x y}\\end{array}\\right\\}=\\frac{1}{h}\\left[\\begin{array}{lll}A_{11} & A_{12} & A_{13} \\\\ A_{21} & A_{22} & A_{23} \\\\ A_{31} & A_{32} & A_{33}\\end{array}\\right]\\left\\{\\begin{array}{c}\\varepsilon_{o x} \\\\ \\varepsilon_{o y} \\\\ \\gamma_{o x y}\\end{array}\\right\\}`,

        matrix_T: `\\left\\{\\begin{array}{l}\\sigma_{l} \\\\ \\sigma_{t} \\\\ \\sigma_{l t}\\end{array}\\right\\}=\\left[\\begin{array}{ccc}c^{2} & s^{2} & -2 c s \\\\ s^{2} & c^{2} & 2 c s \\\\ c s & -c s & c^{2}-s^{2}\\end{array}\\right]\\left\\{\\begin{array}{c}\\sigma_{x} \\\\ \\sigma_{y} \\\\ \\sigma_{x y}\\end{array}\\right\\}=[T]\\left\\{\\begin{array}{c}\\sigma_{x} \\\\ \\sigma_{y} \\\\ \\sigma_{x y}\\end{array}\\right\\}`,

    },


    E_x: (value: number) => `E_{x}(\\theta)=\\frac{1}{\\frac{c^{4}}{E_{l}}+\\frac{s^{4}}{E_{t}}+c^{2} s^{2}\\left(\\frac{1}{G_{l t}}-2 \\frac{v_{t l}}{E_{t}}\\right)} = ${value}`,
    matrix33: (matrix: Matrix33 | undefined) => {
        if (typeof matrix === "undefined") return ""
        return `\\left[\\begin{array}{ccc}${matrix[0][0]} & ${matrix[0][1]} & ${matrix[0][2]} \\\\ ${matrix[1][0]} & ${matrix[1][1]} & ${matrix[1][2]} \\\\ ${matrix[2][0]} & ${matrix[2][1]} & ${matrix[2][2]} \\end{array}\\right]`
    }

}
