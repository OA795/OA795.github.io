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
# 线性代数全总结：从解方程到空间变换

线性代数这门课，很多人学完只记得"行列式展开"和"矩阵乘法怎么算"。但如果只停在这一层，相当于把一门语言学成了背单词——考试能过，用不起来。

这篇总结试图把整门课串成一条线：**我们到底在解决什么问题，工具是怎么被逼出来的，每个概念在几何上长什么样。** 内容覆盖从线性方程组一直到 Jordan 标准型与 SVD，力求把严格定义、直观解释、几何意义和应用场景放在一起讲清楚。

---

## 一、起点：线性方程组

一切从这个问题开始：

$$
\begin{cases}
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = b_1 \\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = b_2 \\
\vdots \\
a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n = b_m
\end{cases}
$$

写成矩阵形式就是：

$$
A\mathbf{x} = \mathbf{b}
$$

其中 $A \in \mathbb{R}^{m \times n}$，$\mathbf{x} \in \mathbb{R}^n$，$\mathbf{b} \in \mathbb{R}^m$。

> **核心问题**：给定 $A$ 和 $\mathbf{b}$，$\mathbf{x}$ 是否存在？如果存在，是否唯一？所有解长什么样？

这三个问题贯穿了整门课。后面所有的概念——秩、行列式、特征值——本质上都是在回答它们。

### 1.1 高斯消元：最朴素的武器

解方程组最直接的办法是消元。把增广矩阵 $[A|\mathbf{b}]$ 通过初等行变换化为行阶梯形：

- 交换两行
- 某行乘以非零常数
- 某行加上另一行的倍数

这三种操作不改变解集。化到行最简形后，主元列对应的变量是**主变量**，其余是**自由变量**。

自由变量的个数直接决定了解集的"大小"。如果自由变量个数为 $k$，那么解集是一个 $k$ 维的仿射子空间——可以理解为"一个特解加上零空间的任意元素"。

### 1.2 齐次与非齐次

- **齐次方程** $A\mathbf{x} = \mathbf{0}$：解集是零空间 $\operatorname{Null}(A)$，永远包含零向量，是一个子空间。
- **非齐次方程** $A\mathbf{x} = \mathbf{b}$：若有解，解集是 $\mathbf{x}_p + \operatorname{Null}(A)$，其中 $\mathbf{x}_p$ 是任意一个特解。

这个结构非常重要：**非齐次方程的解 = 一个特解 + 齐次方程的通解**。它在微分方程、差分方程里反复出现，是线性结构的通用模式。

### 1.3 从解方程到矩阵语言

高斯消元看上去只是"操作数表"，但它其实在做一件很深刻的事：**把方程组的信息压缩成矩阵，再用统一的操作处理。** 这标志着从"算术"到"结构"的转变。一旦用矩阵语言描述，我们就能问一些更本质的问题：解集是几维的？哪些变量自由？$A$ 的什么性质决定了解的行为？这些问题引出了后面的秩、零空间和四个基本子空间。

---

## 二、矩阵与向量：不只是"数表"

### 2.1 矩阵的三种身份

一个矩阵 $A \in \mathbb{R}^{m \times n}$ 可以同时被看成：

| 视角 | 含义 |
|------|------|
| 数表 | $m \times n$ 个数排成矩形 |
| 线性映射 | $\mathbf{x} \mapsto A\mathbf{x}$，把 $\mathbb{R}^n$ 的向量送到 $\mathbb{R}^m$ |
| 列向量的集合 | $A = [\mathbf{a}_1, \mathbf{a}_2, \cdots, \mathbf{a}_n]$ |

第三种视角特别重要。矩阵乘向量可以写成：

$$
A\mathbf{x} = x_1\mathbf{a}_1 + x_2\mathbf{a}_2 + \cdots + x_n\mathbf{a}_n
$$

也就是说，$A\mathbf{x}$ 是 $A$ 的列向量的线性组合，系数就是 $\mathbf{x}$ 的分量。于是：

$$
A\mathbf{x} = \mathbf{b} \text{ 有解} \iff \mathbf{b} \in \operatorname{span}\{\mathbf{a}_1, \ldots, \mathbf{a}_n\}
$$

这句话把"解方程"翻译成了"$\mathbf{b}$ 是否在列空间里"，是整门课最重要的翻译之一。

### 2.2 矩阵乘法：复合的代数

若 $A \in \mathbb{R}^{m \times n}$，$B \in \mathbb{R}^{n \times p}$，则 $AB \in \mathbb{R}^{m \times p}$：

$$
(AB)_{ij} = \sum_{k=1}^n a_{ik}b_{kj}
$$

从变换的角度看，$AB$ 就是"先做 $B$，再做 $A$"的复合变换。这也是为什么矩阵乘法不满足交换律：先旋转再拉伸，和先拉伸再旋转，结果一般不同。

矩阵乘法满足：

- 结合律：$(AB)C = A(BC)$
- 分配律：$A(B+C) = AB + AC$
- 一般不满足交换律：$AB \neq BA$

### 2.3 逆矩阵

若存在 $A^{-1}$ 使得 $AA^{-1} = A^{-1}A = I$，则称 $A$ 可逆。对 $n \times n$ 矩阵，以下命题等价：

- $A$ 可逆
- $\det(A) \neq 0$
- $\operatorname{rank}(A) = n$
- $\operatorname{Null}(A) = \{\mathbf{0}\}$
- $A$ 的列向量线性无关
- $A\mathbf{x}=\mathbf{b}$ 对任意 $\mathbf{b}$ 有唯一解

逆矩阵的求法：$[A|I] \xrightarrow{\text{行变换}} [I|A^{-1}]$。

对 $2 \times 2$ 矩阵有显式公式：

$$
\begin{pmatrix} a & b \\ c & d \end{pmatrix}^{-1} = \frac{1}{ad-bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}
$$

### 2.4 分块矩阵

大矩阵可以按块处理。若

$$
M = \begin{pmatrix} A & B \\ C & D \end{pmatrix}
$$

在适当条件下（如 $A$ 可逆）有分块求逆公式和分块行列式公式。分块思想在数值计算、控制理论、统计中都很常见。分块乘法把大矩阵运算拆成小矩阵运算，是并行计算和稀疏矩阵算法的基础。

---

## 三、向量空间与子空间

### 3.1 向量空间的严格定义

域 $\mathbb{F}$（通常取 $\mathbb{R}$ 或 $\mathbb{C}$）上的向量空间 $V$ 是一个集合，配有两种运算：加法 $+ : V \times V \to V$ 和数乘 $\cdot : \mathbb{F} \times V \to V$，满足八条公理：

1. 加法交换律：$\mathbf{u}+\mathbf{v} = \mathbf{v}+\mathbf{u}$
2. 加法结合律：$(\mathbf{u}+\mathbf{v})+\mathbf{w} = \mathbf{u}+(\mathbf{v}+\mathbf{w})$
3. 零向量存在：$\exists \mathbf{0}, \mathbf{v}+\mathbf{0} = \mathbf{v}$
4. 负向量存在：$\exists -\mathbf{v}, \mathbf{v}+(-\mathbf{v}) = \mathbf{0}$
5. 数乘结合律：$a(b\mathbf{v}) = (ab)\mathbf{v}$
6. 单位元：$1\mathbf{v} = \mathbf{v}$
7. 分配律一：$a(\mathbf{u}+\mathbf{v}) = a\mathbf{u}+a\mathbf{v}$
8. 分配律二：$(a+b)\mathbf{v} = a\mathbf{v}+b\mathbf{v}$

常见的向量空间：$\mathbb{R}^n$、多项式空间 $\mathcal{P}_n$、连续函数空间 $C[a,b]$、矩阵空间 $\mathbb{R}^{m \times n}$。

### 3.2 子空间

子空间 $W \subseteq V$ 本身也是向量空间。判定只需三条：

1. $\mathbf{0} \in W$
2. $\mathbf{u}, \mathbf{v} \in W \Rightarrow \mathbf{u}+\mathbf{v} \in W$
3. $\mathbf{u} \in W, c \in \mathbb{F} \Rightarrow c\mathbf{u} \in W$

$\mathbb{R}^3$ 中的子空间只有几种：原点、过原点的直线、过原点的平面、整个 $\mathbb{R}^3$。**注意必须过原点**，否则不是子空间。

### 3.3 线性无关、基与维数

向量组 $\{\mathbf{v}_1, \ldots, \mathbf{v}_k\}$ **线性无关**，若

$$
c_1\mathbf{v}_1 + \cdots + c_k\mathbf{v}_k = \mathbf{0} \implies c_1 = \cdots = c_k = 0
$$

否则称为线性相关。

**基**：线性无关且张成整个空间的向量组。任何向量在基下的表示唯一。

**维数**：基中向量的个数，记作 $\dim V$。维数良定义——不同基的向量个数相同。

### 3.4 四个基本子空间

对 $A \in \mathbb{R}^{m \times n}$，定义：

```
列空间 Col(A) ⊆ ℝ^m      维数 = rank(A)
零空间 Null(A) ⊆ ℝ^n     维数 = n - rank(A)
行空间 Row(A) ⊆ ℝ^n      维数 = rank(A)
左零空间 Null(Aᵀ) ⊆ ℝ^m  维数 = m - rank(A)
```

它们满足**正交补**关系：

$$
\operatorname{Null}(A) = \operatorname{Row}(A)^\perp, \qquad \operatorname{Null}(A^T) = \operatorname{Col}(A)^\perp
$$

Strang 的"四个子空间图"值得记一辈子：

```
        ℝ^n                          ℝ^m
  ┌─────────────┐            ┌─────────────┐
  │  Row(A)     │   A→       │  Col(A)     │
  │  dim = r    │            │  dim = r    │
  ├─────────────┤            ├─────────────┤
  │  Null(A)    │   A→       │  Null(Aᵀ)   │
  │  dim = n-r  │            │  dim = m-r  │
  └─────────────┘            └─────────────┘
```

这张图告诉你：$A$ 把行空间同构地送到列空间，把零空间压成零。$\mathbb{R}^n$ 被正交分解为行空间与零空间，$\mathbb{R}^m$ 被正交分解为列空间与左零空间。

### 3.5 秩-零化度定理

$$
\dim \operatorname{Null}(A) + \dim \operatorname{Col}(A) = n
$$

即

$$
\operatorname{nullity}(A) + \operatorname{rank}(A) = n
$$

这是线性代数里最重要的维数公式。它解释了为什么自由变量个数是 $n - r$，也解释了为什么满秩时解唯一。它的抽象版本是：对线性映射 $T: V \to W$，

$$
\dim \ker T + \dim \operatorname{Im} T = \dim V
$$

### 3.6 坐标与基变换

选定了基 $\mathcal{B} = \{\mathbf{b}_1, \ldots, \mathbf{b}_n\}$，每个向量 $\mathbf{v}$ 都可以唯一写成

$$
\mathbf{v} = c_1\mathbf{b}_1 + \cdots + c_n\mathbf{b}_n
$$

系数向量 $(c_1, \ldots, c_n)^T$ 就是 $\mathbf{v}$ 在基 $\mathcal{B}$ 下的坐标，记作 $[\mathbf{v}]_{\mathcal{B}}$。

若另有一组基 $\mathcal{C}$，则存在过渡矩阵 $P_{\mathcal{C} \leftarrow \mathcal{B}}$ 使得

$$
[\mathbf{v}]_{\mathcal{C}} = P_{\mathcal{C} \leftarrow \mathcal{B}} [\mathbf{v}]_{\mathcal{B}}
$$

$P$ 的第 $j$ 列是 $\mathbf{b}_j$ 在 $\mathcal{C}$ 下的坐标。基变换是理解相似矩阵、对角化的关键。

---

## 四、秩：一个数统治一切

**秩** $r = \operatorname{rank}(A)$ 是矩阵中线性无关列的最大个数，也等于线性无关行的最大个数，还等于非零奇异值的个数。

它决定了：

- $A\mathbf{x}=\mathbf{b}$ 有解 $\iff \operatorname{rank}(A) = \operatorname{rank}([A|\mathbf{b}])$
- 有解时，解唯一 $\iff r = n$；有无穷多解 $\iff r < n$
- 自由变量个数 $= n - r$
- 行空间的维数 = 列空间的维数 = $r$

秩的性质：

$$
\operatorname{rank}(A+B) \leq \operatorname{rank}(A) + \operatorname{rank}(B)
$$

$$
\operatorname{rank}(AB) \leq \min\{\operatorname{rank}(A), \operatorname{rank}(B)\}
$$

$$
\operatorname{rank}(A) = \operatorname{rank}(A^T) = \operatorname{rank}(A^TA) = \operatorname{rank}(AA^T)
$$

若 $A$ 可逆，则 $\operatorname{rank}(AB) = \operatorname{rank}(B)$，$\operatorname{rank}(CA) = \operatorname{rank}(C)$。

> 秩是线性代数里信息量最大的一个整数。它衡量的是矩阵"携带的独立信息量"。

---

## 五、行列式：体积的缩放因子

### 5.1 严格定义

对 $n \times n$ 矩阵 $A$，行列式 $\det(A)$ 是唯一满足以下三条的标量函数：

1. 对每一行线性（多线性）
2. 两行交换，符号变号（交错性）
3. $\det(I) = 1$（归一化）

等价地，可以用 Leibniz 公式定义：

$$
\det(A) = \sum_{\sigma \in S_n} \operatorname{sgn}(\sigma) \prod_{i=1}^n a_{i,\sigma(i)}
$$

其中 $S_n$ 是 $n$ 元置换群，$\operatorname{sgn}(\sigma)$ 是置换的符号。

### 5.2 几何意义

$$
|\det(A)| = \text{线性变换 } \mathbf{x} \mapsto A\mathbf{x} \text{ 对体积的缩放倍数}
$$

- $n=2$：$|\det(A)|$ 是列向量张成的平行四边形面积
- $n=3$：$|\det(A)|$ 是列向量张成的平行六面体体积
- $\det(A) = 0$：变换把空间压扁到更低维，不可逆
- $\det(A) < 0$：还翻转了定向（手性）

### 5.3 关键性质

$$
\det(AB) = \det(A)\det(B)
$$

$$
\det(A^{-1}) = \frac{1}{\det(A)}
$$

$$
\det(A^T) = \det(A)
$$

$$
\det(cA) = c^n \det(A)
$$

若 $A$ 是三角矩阵，$\det(A)$ 等于对角元之积。若 $A$ 分块为上三角

$$
A = \begin{pmatrix} B & C \\ 0 & D \end{pmatrix}
$$

则 $\det(A) = \det(B)\det(D)$。

### 5.4 余子式与伴随矩阵

$A$ 的 $(i,j)$ 余子式 $M_{ij}$ 是删去第 $i$ 行第 $j$ 列后的行列式。代数余子式 $C_{ij} = (-1)^{i+j}M_{ij}$。

拉普拉斯展开：

$$
\det(A) = \sum_{j=1}^n a_{ij}C_{ij}
$$

伴随矩阵 $\operatorname{adj}(A) = (C_{ji})$，满足

$$
A \cdot \operatorname{adj}(A) = \det(A) I
$$

于是当 $\det(A) \neq 0$ 时，

$$
A^{-1} = \frac{1}{\det(A)}\operatorname{adj}(A)
$$

这个公式理论上漂亮，但计算量大，实际求逆一般用高斯消元。

### 5.5 Cramer 法则

若 $A$ 可逆，$A\mathbf{x}=\mathbf{b}$ 的解为

$$
x_i = \frac{\det(A_i)}{\det(A)}
$$

其中 $A_i$ 是把 $A$ 的第 $i$ 列换成 $\mathbf{b}$ 得到的矩阵。Cramer 法则形式优美，但计算复杂度高，主要用于理论推导。

### 5.6 行列式与体积

更一般地，若 $\mathbf{v}_1, \ldots, \mathbf{v}_n \in \mathbb{R}^n$，则它们张成的平行多面体体积为

$$
V = |\det([\mathbf{v}_1, \ldots, \mathbf{v}_n])|
$$

这个事实是多重积分换元公式的基础：$d\mathbf{y} = |\det(J)| d\mathbf{x}$，其中 $J$ 是 Jacobi 矩阵。

---

## 六、线性变换：矩阵的"灵魂"

### 6.1 严格定义

映射 $T: V \to W$ 是线性的，若对任意 $\mathbf{u}, \mathbf{v} \in V$ 和标量 $c$：

$$
T(\mathbf{u}+\mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v}), \qquad T(c\mathbf{u}) = cT(\mathbf{u})
$$

等价地，$T(c\mathbf{u}+\mathbf{v}) = cT(\mathbf{u}) + T(\mathbf{v})$。

### 6.2 矩阵就是线性变换

选定 $V$ 的基 $\mathcal{B} = \{\mathbf{b}_1, \ldots, \mathbf{b}_n\}$ 和 $W$ 的基 $\mathcal{C}$，线性变换 $T$ 对应矩阵 $[T]_{\mathcal{C} \leftarrow \mathcal{B}}$，其第 $j$ 列是 $T(\mathbf{b}_j)$ 在 $\mathcal{C}$ 下的坐标。

$$
[T(\mathbf{x})]_{\mathcal{C}} = [T]_{\mathcal{C} \leftarrow \mathcal{B}} [\mathbf{x}]_{\mathcal{B}}
$$

### 6.3 核与像

- **核** $\ker T = \{\mathbf{v} : T(\mathbf{v}) = \mathbf{0}\}$
- **像** $\operatorname{Im} T = \{T(\mathbf{v}) : \mathbf{v} \in V\}$

维数公式：

$$
\dim \ker T + \dim \operatorname{Im} T = \dim V
$$

这其实就是秩-零化度定理的抽象版本。核对应零空间，像对应列空间。

### 6.4 单射、满射、同构

- $T$ 单射 $\iff \ker T = \{\mathbf{0}\}$
- $T$ 满射 $\iff \operatorname{Im} T = W$
- $T$ 同构 $\iff$ 单射且满射 $\iff \dim V = \dim W$ 且 $\ker T = \{\mathbf{0}\}$

同构的线性变换保持一切线性结构，只是"换了标签"。

### 6.5 基变换与相似

同一变换在不同基下的矩阵互为**相似**：

$$
B = P^{-1}AP
$$

其中 $P$ 是过渡矩阵。相似矩阵有相同的特征值、行列式、迹、秩、Jordan 型。

**迹** $\operatorname{tr}(A) = \sum_i a_{ii}$ 满足：

$$
\operatorname{tr}(AB) = \operatorname{tr}(BA), \qquad \operatorname{tr}(P^{-1}AP) = \operatorname{tr}(A)
$$

且 $\operatorname{tr}(A) = \sum_i \lambda_i$，$\det(A) = \prod_i \lambda_i$（代数重数计）。

---

## 七、特征值与特征向量：找到"不变方向"

### 7.1 定义

$$
A\mathbf{v} = \lambda \mathbf{v}, \qquad \mathbf{v} \neq \mathbf{0}
$$

$\lambda$ 是特征值，$\mathbf{v}$ 是对应特征向量。

几何意义：$A$ 作用在 $\mathbf{v}$ 上，只拉伸/压缩，不改变方向。特征值就是拉伸倍数。

### 7.2 怎么求

$$
\det(A - \lambda I) = 0 \quad \Rightarrow \quad \text{特征多项式 } p(\lambda)
$$

$p(\lambda)$ 是 $n$ 次多项式，根就是特征值（含重数）。对每个 $\lambda$，解 $(A-\lambda I)\mathbf{v}=\mathbf{0}$ 得到特征向量。

**代数重数**：$\lambda$ 作为特征多项式根的重数。
**几何重数**：$\dim \operatorname{Null}(A - \lambda I)$。

总有：几何重数 $\leq$ 代数重数。

### 7.3 对角化

若 $A$ 有 $n$ 个线性无关的特征向量：

$$
A = P\Lambda P^{-1}, \qquad \Lambda = \operatorname{diag}(\lambda_1, \ldots, \lambda_n)
$$

**可对角化的充要条件**：每个特征值的几何重数 = 代数重数。

充分条件：$n$ 个互不相同的特征值；或 $A$ 是对称矩阵。

> 对角化的意义：在"特征基"下，$A$ 只是一个逐坐标缩放的变换。这极大地简化了计算，比如 $A^k = P\Lambda^k P^{-1}$。

### 7.4 对称矩阵与正交对角化

实对称矩阵 $A = A^T$ 有：

- 所有特征值为实数
- 不同特征值的特征向量正交
- 可正交对角化：$A = Q\Lambda Q^T$，$Q$ 正交

这是谱定理。它在二次型、PCA、量子力学中都是基石。

### 7.5 二次型与正定性

二次型 $Q(\mathbf{x}) = \mathbf{x}^T A \mathbf{x}$，$A$ 对称。

正定（$Q > 0, \forall \mathbf{x} \neq \mathbf{0}$）的等价条件：

- 所有特征值 $> 0$
- 所有顺序主子式 $> 0$（Sylvester 判据）
- 存在可逆 $R$ 使 $A = R^T R$
- 所有主元 $> 0$（$LDL^T$ 分解）

半正定、负定、不定类似定义，只需看特征值符号。

### 7.6 应用：动力系统

离散动力系统 $\mathbf{x}_{k+1} = A\mathbf{x}_k$ 的解为 $\mathbf{x}_k = A^k\mathbf{x}_0$。若 $A = P\Lambda P^{-1}$，则

$$
\mathbf{x}_k = P\Lambda^k P^{-1}\mathbf{x}_0
$$

特征值的模决定长期行为：$|\lambda| < 1$ 衰减，$|\lambda| > 1$ 增长，$|\lambda| = 1$ 振荡。

连续系统 $\dot{\mathbf{x}} = A\mathbf{x}$ 的解为 $\mathbf{x}(t) = e^{At}\mathbf{x}_0$，稳定性由特征值实部决定。

---

## 八、内积、正交与投影

### 8.1 内积

$$
\langle \mathbf{u}, \mathbf{v} \rangle = \mathbf{u}^T\mathbf{v} = \sum_i u_i v_i
$$

性质：对称、双线性、正定。

**Cauchy–Schwarz 不等式**：

$$
|\langle \mathbf{u}, \mathbf{v} \rangle| \leq \|\mathbf{u}\| \|\mathbf{v}\|
$$

**三角不等式**：$\|\mathbf{u}+\mathbf{v}\| \leq \|\mathbf{u}\| + \|\mathbf{v}\|$。

正交：$\mathbf{u}^T\mathbf{v} = 0$。正交组线性无关，这是 Gram–Schmidt 的基础。

### 8.2 投影

$\mathbf{b}$ 在 $\mathbf{a}$ 上的投影：

$$
\operatorname{proj}_{\mathbf{a}}\mathbf{b} = \frac{\mathbf{a}^T\mathbf{b}}{\mathbf{a}^T\mathbf{a}}\mathbf{a}
$$

投影到子空间 $W = \operatorname{Col}(A)$：

$$
\mathbf{p} = A(A^TA)^{-1}A^T\mathbf{b}
$$

其中 $P = A(A^TA)^{-1}A^T$ 是**投影矩阵**，满足

$$
P^2 = P, \qquad P^T = P
$$

这两个条件刻画了正交投影。一般（斜）投影只要求 $P^2 = P$。

### 8.3 Gram–Schmidt 正交化

把一组线性无关向量变成正交组：

$$
\mathbf{q}_k = \mathbf{a}_k - \sum_{i=1}^{k-1} \operatorname{proj}_{\mathbf{q}_i}\mathbf{a}_k
$$

归一化后得到标准正交组。写成矩阵形式就是 $A = QR$ 分解，$Q$ 列正交，$R$ 上三角。

### 8.4 正交矩阵

$Q^TQ = I$ 的矩阵叫正交矩阵。性质：

- 列向量标准正交
- 保长度：$\|Q\mathbf{x}\| = \|\mathbf{x}\|$
- 保内积：$\langle Q\mathbf{u}, Q\mathbf{v} \rangle = \langle \mathbf{u}, \mathbf{v} \rangle$
- $\det(Q) = \pm 1$
- $Q^{-1} = Q^T$

正交矩阵对应旋转或反射。

### 8.5 正交补与正交分解

子空间 $W$ 的正交补定义为

$$
W^\perp = \{\mathbf{v} : \langle \mathbf{v}, \mathbf{w} \rangle = 0, \forall \mathbf{w} \in W\}
$$

整个空间可以正交分解：

$$
V = W \oplus W^\perp
$$

任何向量唯一写成 $\mathbf{v} = \mathbf{w} + \mathbf{w}^\perp$。这是投影和最小二乘的基础。

---

## 九、最小二乘：当方程无解时

$A\mathbf{x}=\mathbf{b}$ 无解时，退而求其次：

$$
\min_{\mathbf{x}} \|A\mathbf{x} - \mathbf{b}\|^2
$$

**正规方程**：

$$
A^TA\mathbf{x} = A^T\mathbf{b}
$$

若 $A$ 列满秩，$A^TA$ 可逆，解为

$$
\hat{\mathbf{x}} = (A^TA)^{-1}A^T\mathbf{b}
$$

几何意义：把 $\mathbf{b}$ 投影到 $\operatorname{Col}(A)$ 上，误差向量 $\mathbf{b} - A\hat{\mathbf{x}}$ 垂直于列空间。

应用：线性回归、曲线拟合、信号处理。

> 最小二乘体现了一个重要哲学：**无解时，找"最接近"的解**。这也是伪逆的动机。

---

## 十、矩阵分解大观

矩阵分解是线性代数的"工具箱"，不同分解适合不同场景。

### 10.1 LU 分解

$$
A = LU
$$

$L$ 下三角（单位对角），$U$ 上三角。本质是高斯消元。带部分主元时写作 $PA = LU$。

用途：解线性方程组、求行列式。

### 10.2 QR 分解

$$
A = QR
$$

$Q$ 列正交，$R$ 上三角。由 Gram–Schmidt 或 Householder 变换得到。

用途：最小二乘、特征值算法（QR 迭代）。

### 10.3 特征分解

$$
A = P\Lambda P^{-1}
$$

仅对可对角化矩阵。对称矩阵时 $P$ 可取正交，$A = Q\Lambda Q^T$。

用途：动力系统、马尔可夫链、振动分析。

### 10.4 Cholesky 分解

对正定矩阵 $A$：

$$
A = LL^T
$$

$L$ 下三角。是 LU 的对称版本，计算量减半。

用途：数值优化、蒙特卡洛模拟。

### 10.5 SVD：线性代数的巅峰

任何矩阵 $A \in \mathbb{R}^{m \times n}$ 都可以分解为：

$$
A = U\Sigma V^T
$$

- $U \in \mathbb{R}^{m \times m}$：正交矩阵，列是 $AA^T$ 的特征向量
- $V \in \mathbb{R}^{n \times n}$：正交矩阵，列是 $A^TA$ 的特征向量
- $\Sigma \in \mathbb{R}^{m \times n}$：对角矩阵，对角元 $\sigma_i = \sqrt{\lambda_i(A^TA)} \geq 0$

奇异值按降序排列 $\sigma_1 \geq \sigma_2 \geq \cdots \geq 0$。

**几何意义**：任何线性变换 = 旋转 → 缩放 → 旋转

```
ℝ^n --Vᵀ--> ℝ^n --Σ--> ℝ^m --U--> ℝ^m
     旋转         缩放        旋转
```

**截断 SVD 与低秩近似**：Eckart–Young 定理告诉我们，秩 $k$ 最佳近似是

$$
A_k = \sum_{i=1}^k \sigma_i \mathbf{u}_i\mathbf{v}_i^T
$$

误差 $\|A - A_k\|_2 = \sigma_{k+1}$。

**应用**：

| 应用 | 原理 |
|------|------|
| 降维（PCA） | 保留最大的 $k$ 个奇异值 |
| 图像压缩 | 低秩近似 |
| 伪逆 | $A^+ = V\Sigma^+ U^T$ |
| 推荐系统 | 矩阵补全 + 低秩假设 |
| 潜在语义分析 | 文档-词矩阵分解 |
| 噪声过滤 | 丢弃小奇异值 |

伪逆 $A^+$ 给出了最小二乘的最小范数解：

$$
A^+ = V\Sigma^+ U^T
$$

其中 $\Sigma^+$ 把非零奇异值取倒数再转置。

### 10.6 分解之间的关系

这些分解不是孤立的，它们之间有清晰的层次：

- LU 是最基础的消元分解，适合一般方阵
- QR 用正交性换稳定性，适合最小二乘
- 特征分解揭示不变量，但只对可对角化矩阵
- Cholesky 是正定矩阵的 LU 对称版
- SVD 对任何矩阵都存在，是最通用也最深刻的分解

从 LU 到 SVD，是"从计算到结构"的递进。

---

## 十一、特殊矩阵一览

| 矩阵类型 | 定义 | 关键性质 |
|----------|------|----------|
| 对称矩阵 | $A = A^T$ | 实特征值，可正交对角化 |
| 反对称矩阵 | $A = -A^T$ | 特征值为纯虚数或零 |
| 正交矩阵 | $Q^TQ = I$ | 保长度，$\det = \pm 1$ |
| 正定矩阵 | $\mathbf{x}^TA\mathbf{x} > 0$ | 所有特征值 $>0$，$A = R^TR$ |
| 幂等矩阵 | $P^2 = P$ | 投影矩阵，特征值只能是 0 或 1 |
| 幂零矩阵 | $N^k = 0$ | 所有特征值为 0 |
| 相似矩阵 | $B = P^{-1}AP$ | 同特征值、同迹、同行列式 |
| 合同矩阵 | $B = P^TAP$ | 同惯性指数（Sylvester 定律） |
| 正规矩阵 | $A^TA = AA^T$ | 可酉对角化 |
| Hermite 矩阵 | $A = A^*$ | 实特征值，可酉对角化 |
| 酉矩阵 | $U^*U = I$ | 复版本正交矩阵 |
| 对角占优矩阵 | $|a_{ii}| > \sum_{j \neq i}|a_{ij}|$ | 可逆，迭代法收敛 |
| 三角矩阵 | 上/下三角 | 行列式 = 对角元之积 |
| 带状矩阵 | 非零元集中在带宽内 | 稀疏，计算高效 |
| Toeplitz 矩阵 | 每条对角线常数 | 卷积、信号处理 |

---

## 十二、Jordan 标准型：对角化的"补丁"

当 $A$ 不能对角化时，退而求其次：

$$
A = PJP^{-1}
$$

其中 $J$ 是 Jordan 矩阵，由若干 Jordan 块组成：

$$
J_i = \begin{pmatrix}
\lambda_i & 1 & & \\
& \lambda_i & \ddots & \\
& & \ddots & 1 \\
& & & \lambda_i
\end{pmatrix}
$$

每个特征值对应若干个 Jordan 块，块的大小由特征向量的"缺失"决定。

**广义特征向量**：满足 $(A-\lambda I)^k\mathbf{v} = \mathbf{0}$ 的向量。Jordan 链就是由广义特征向量组成的。

> Jordan 型告诉我们：即使不能完全对角化，也能把矩阵化到"几乎对角"的形式。它是相似分类的完整答案。

Jordan 型的应用：解线性微分方程组、矩阵函数（如 $e^{At}$）、差分方程。

---

## 十三、数值线性代数一瞥

理论上的公式在计算机上未必好用。数值线性代数关注：

- **稳定性**：浮点误差会不会被放大
- **复杂度**：算法需要多少次运算
- **稀疏性**：大矩阵通常稀疏，要利用结构

常用结论：

- 解 $n \times n$ 方程组：高斯消元 $O(n^3)$
- 矩阵乘法：朴素 $O(n^3)$，Strassen $O(n^{2.81})$，最优下界未知
- 特征值：QR 算法 $O(n^3)$
- SVD：$O(mn^2)$（$m \geq n$）

**条件数** $\kappa(A) = \|A\|\|A^{-1}\| = \sigma_{\max}/\sigma_{\min}$ 衡量问题敏感度。条件数大意味着病态，微小扰动会导致解剧烈变化。

**迭代法**（Jacobi、Gauss–Seidel、共轭梯度）适合大型稀疏系统，比直接法更高效。

---

## 十四、应用地图：线性代数在哪里出现

线性代数不是孤立的数学分支，它是几乎所有定量学科的通用语言。

| 领域 | 线性代数的角色 |
|------|----------------|
| 机器学习 | 数据矩阵、PCA、神经网络权重、最小二乘 |
| 计算机图形学 | 变换矩阵、投影、旋转、光照模型 |
| 信号处理 | Fourier 变换、滤波器、卷积 |
| 控制理论 | 状态空间、能控性、能观性、Lyapunov 方程 |
| 量子力学 | 态向量、算符、Hermite 矩阵、酉演化 |
| 统计学 | 协方差矩阵、回归、多元分析 |
| 图论 | 邻接矩阵、拉普拉斯矩阵、谱聚类 |
| 密码学 | 有限域上的线性代数、纠错码 |
| 经济学 | 投入产出模型、均衡分析 |
| 计算流体力学 | 稀疏线性系统、迭代求解 |
| 运筹学 | 线性规划、单纯形法 |
| 网络分析 | PageRank、马尔可夫链、中心性度量 |

### 14.1 一个具体例子：PCA

给定数据矩阵 $X \in \mathbb{R}^{n \times d}$（$n$ 个样本，$d$ 个特征），中心化后计算协方差矩阵

$$
C = \frac{1}{n-1}X^TX
$$

对 $C$ 做特征分解，取最大的 $k$ 个特征值对应的特征向量作为主成分。等价地，对 $X$ 做 SVD，取前 $