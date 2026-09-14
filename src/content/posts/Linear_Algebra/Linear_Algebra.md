---
title: "线性代数"
description: "个人线代学习笔记"
date: 2026-9-6
tags:
  - 线性代数
  - 笔记
category: "笔记"
time: "idk"
cover: "/images/LA-cover.webp"
---
# 线性代数
*个人理解，如有纰漏欢迎指正。*
## 矩阵
#### 定义：
由 $m \times n$ 个数排成的 $m$ 行 $n$ 列矩形阵列
#### 意义：
1. $n\times 1$矩阵，我们称之为**列向量**，可视为$n$维向量，*如$\begin{bmatrix}
    a \\ b
  \end{bmatrix}$可视为向量$(a,b)$*
2. $1\times n$矩阵，我们称之为**行向量**，可视为$n$维向量，*如$\begin{bmatrix}
    a & b
  \end{bmatrix}$可视为向量$(a,b)$*
3. $n\times m$矩阵
  + 可视为$m$个$n$维向量
    + *如$\begin{bmatrix}
    1 & 1 & 4 \\
    5 & 1 & 4
  \end{bmatrix}$可以看作三个向量$\begin{bmatrix}
    1\\5
  \end{bmatrix}$、$\begin{bmatrix}
    1\\1
  \end{bmatrix}$和$\begin{bmatrix}
    4\\4
  \end{bmatrix}$*
  + 作为矩阵乘法的**前一项**时，可理解为把$m$维空间中的$m$个**标准基向量**分别映射到矩阵中的$m$个$n$维向量，从而实现$m$维到$n$维的**映射**
  如矩阵$\begin{bmatrix}
    1 & 1 & 4 \\
    5 & 1 & 4
  \end{bmatrix}$把$\begin{bmatrix}
    1 \\ 0 \\ 0
  \end{bmatrix}$,$\begin{bmatrix}
    0 \\ 1 \\ 0
  \end{bmatrix}$,$\begin{bmatrix}
    0 \\ 0 \\ 1
  \end{bmatrix}$
  分别变为$\begin{bmatrix}
    1\\5
  \end{bmatrix}$、$\begin{bmatrix}
    1\\1
  \end{bmatrix}$和$\begin{bmatrix}
    4\\4
  \end{bmatrix}$，实现了把三维空间压缩到二维空间的操作
  + 将$m$维空间变换到$n$维空间
4. $n\times n$矩阵
  + 作为矩阵乘法前一项时，可理解为把原空间中的$n$个标准基向量映射为新的$n$个$n$维向量，实现同维空间内的线性变换（如旋转、缩放、剪切等）
#### 基本运算: 
  + **加法**
    + 满足交换律、结合律；
    + 行数列数必须完全相等；
    + 对应位置的元素分别相加
      + 例:$\begin{bmatrix}
  1 & 2 & 3 \\ 4 & 5 & 6
\end{bmatrix}+
\begin{bmatrix}
  1 & 1 & 4 \\ 5 & 1 & 4
\end{bmatrix}=
\begin{bmatrix}
  2 & 3 & 7 \\ 9 & 6 & 10
\end{bmatrix}$

  + **乘法**
    + 满足结合律、分配律，不满足**交换律**；
    + 前者的列数（Column）必须等于后者的行数（Row）
 