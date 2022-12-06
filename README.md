# 复合材料性能 辅助计算程序

> 求解复合材料层合板的柔度矩阵、刚度矩阵等力学性能参数

项目地址：[GitHub](https://github.com/laorange/laminate-calculation)

## 快速开始

在线访问：[GitHub Page](https://laorange.github.io/laminate-calculation/)

安装包下载(用于离线使用)：[Releases](https://github.com/laorange/laminate-calculation/releases)

## 更新日志

截至目前，本项目共有三个阶段，各阶段以[分支](https://github.com/laorange/laminate-calculation/branches)的形式保留：

1. 完全使用 `python` 输入、计算、输出，可查看 `v1.x ` 分支
2. 沿用 `v1.x ` 的 `laminate.py`，`v2.x` 使用 `flask` 做后端；使用 `ts+vue3` 做前端
3. 沿用了 `v2.x` 的前端，以 `laminate.ts` 替换了 `laminate.py`，项目完全前端化，可以依托于 GitPage 在线运行。
4. `v3.0`: 但若想直接在本地打开 html，会因 file协议跨域，因此使用 `golang` 的 `http.FileServer ` 开启静态文件服务，并完成了单文件打包，双击即可开始离线使用。
5. `v3.1`: 使用[插件](https://www.npmjs.com/package/vite-plugin-singlefile)，将项目打包为html单文件，至此可以直接使用浏览器离线打开。

## 引用

+ 组件库: [NaiveUi](https://www.naiveui.com/), [VantUi ](https://vant-contrib.gitee.io/vant/#/zh-CN/home)，三者都有用
+ 显示公式用的是 [Vatex](https://github.com/Shimada666/VaTex)
+ 科学计算使用的是 [math.js](https://mathjs.org/index.html)
+ [pinia](https://pinia.vuejs.org/) 等常用库

## 截图

![1.png](demo/demo1.png)

----

![2.png](demo/demo2.png)

----

![3.png](demo/demo3.png)

