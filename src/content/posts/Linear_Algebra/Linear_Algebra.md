---
title: "线性代数"
description: "个人线代学习笔记，整理中"
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
  + 作为矩阵乘法的**前一项**时，可理解为把$m$维空间中的$m$个**标准基向量**分别映射到矩阵中的$m$个$n$维向量的**映射关系**，从而实现$m$维到$n$维的**映射**
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
  + $m$维空间$\rArr$$n$维空间
4. $n\times n$矩阵
  + 作为矩阵乘法前一项时，可理解为把原空间中的$n$个标准基向量映射为新的$n$个$n$维向量，实现同维空间内的线性变换（如旋转、缩放、剪切等）
#### 基本运算: 
  + **加法**
    + 显然加号两侧必须均为矩阵；
    + 法则：对应位置的元素分别相加
      + 例:$\begin{bmatrix}
1 & 2 & 3 \\ 4 & 5 & 6
\end{bmatrix}+
\begin{bmatrix}
  1 & 1 & 4 \\ 5 & 1 & 4
\end{bmatrix}=
\begin{bmatrix}
  2 & 3 & 7 \\ 9 & 6 & 10
\end{bmatrix}$
    + 前提：行数列数必须完全相等；
    + 性质：满足交换律、结合律；
    


  + **数乘**
    + 常数$\times$矩阵
    + 法则：用常数$k$乘以矩阵的**每一个元素**
$$kA=\begin{bmatrix}k\cdot a_{i,j}\end{bmatrix}$$
    + 几何意义：放缩($k<0$时镜像反转并放缩)
  + **矩阵乘法**
    + 性质:满足结合律、分配律，不满足**交换律**；
    + 前提:前者的列数（Column）必须等于后者的行数（Row）（即 $A_{m \times n} \cdot B_{n \times p} = C_{m \times p}$）。
      >如何理解：前者可视作对后者的一种操作。若前者列数为$x$，行数为$y$，则前者可视为从$x$维$\rArr y$维的映射，因此被操作的后者的维度必须为$x$维

      >这也解释了为什么不满足交换律:一般情况下,$A$对$B$的操作$\ne$$B$对$A$的操作
    + 代数意义: $C=AB$表示先执行$B$系统的计算,再将结果输入$A$系统
    + 几何意义: $AB\mathbf{x} = A(B\mathbf{x})$ 表示对向量 $\mathbf{x}$ 先施加 $B$ 变换，再施加 $A$ 变换（顺序从右往左）。
    + 法则: $C$ 的第 $i$ 行第 $j$ 列元素，等于 $A$ 的第 $i$ 行向量与 $B$ 的第 $j$ 列向量的**内积**：
$$c_{ij} = \sum_{k=1}^{n} a_{ik} b_{kj}$$
      *举个例子:*
      >$\begin{bmatrix}1&2\\3&4\end{bmatrix}\begin{bmatrix}5&6\\7&8\end{bmatrix}=\begin{bmatrix}\begin{bmatrix}1&2\end{bmatrix}\cdot\begin{bmatrix}5\\7\end{bmatrix}&\begin{bmatrix}1&2\end{bmatrix}\cdot\begin{bmatrix}6\\8\end{bmatrix}\\\begin{bmatrix}3&4\end{bmatrix}\cdot\begin{bmatrix}5\\7\end{bmatrix}&\begin{bmatrix}3&4\end{bmatrix}\cdot\begin{bmatrix}6\\8\end{bmatrix}\end{bmatrix}=\begin{bmatrix}
        1\times5+2\times7&1\times6+2\times8\\3\times5+4\times7&3\times6+4\times8
      \end{bmatrix}=\begin{bmatrix}19&22\\43&50\end{bmatrix}$
    
      ***显然,这看起来并不好记***
      
      如$\begin{bmatrix}0&1\\-1&0\end{bmatrix}\begin{bmatrix}1&1\\0&1\end{bmatrix}$(从左到右分别为*顺时针旋转$90\degree$*, *水平错切*), 有以下两个操作:
      1. 把基向量变为$\begin{bmatrix}1&0\\0&1\end{bmatrix}$描述下的$\begin{bmatrix}1&1\\0&1\end{bmatrix}$(先水平错切)
      2. 在新得到的坐标系中, 把基向量变为$\begin{bmatrix}1&1\\0&1\end{bmatrix}$描述下的$\begin{bmatrix}0&1\\-1&0\end{bmatrix}$(然后在错切的结果上顺时针旋转$90\degree$)
      + 也就是说, 我们实际上干的事, 就是把用$\begin{bmatrix}1&1\\0&1\end{bmatrix}$表示的$\begin{bmatrix}0&1\\-1&0\end{bmatrix}$矩阵用$\begin{bmatrix}1&0\\0&1\end{bmatrix}$表示, 那么不难想到实际上可以把$\begin{bmatrix}1&1\\ &1\end{bmatrix}$的基向量分别进行$\begin{bmatrix}0&1\\-1&0\end{bmatrix}$变换