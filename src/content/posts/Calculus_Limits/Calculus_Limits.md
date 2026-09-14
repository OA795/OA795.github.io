---
title: "微积分-极限与连续性"
description: "个人微积分学习笔记"
date: 2026-9-13
tags:
  - AP Calculus BC
  - 笔记
category: "笔记"
time: "10min"
cover: "/images/Cal-Lim-cover.webp"
---
# 微积分
---
### **极限与连续性**

#### **1. 极限的基础概念与性质**

* **双侧极限与单侧极限**
  * **极限定义**：$\lim_{x \to c} f(x) = L$ 表示当 $x$ 无限接近 $c$（但 $x \neq c$）时，$f(x)$ 无限接近 $L$。
  * **单侧极限**：
    * 左极限：$\lim_{x \to c^-} f(x)$（$x$ 从小于 $c$ 的一侧靠近）
    * 右极限：$\lim_{x \to c^+} f(x)$（$x$ 从大于 $c$ 的一侧靠近）


  * **极限存在充分必要条件**：

$$\lim_{x \to c} f(x) = L \iff \lim_{x \to c^-} f(x) = \lim_{x \to c^+} f(x) = L$$




* **极限的基本运算法则 (Limit Laws)**
设 $\lim_{x \to c} f(x) = L$ 且 $\lim_{x \to c} g(x) = M$：
  * 加减法则：$\lim [f(x) \pm g(x)] = L \pm M$
  * 乘法法则：$\lim [f(x) \cdot g(x)] = L \cdot M$
  * 除法法则：$\lim \left[\frac{f(x)}{g(x)}\right] = \frac{L}{M} \quad (M \neq 0)$
  * 复合函数法则：若 $f$ 在 $M$ 处连续，则 $\lim_{x \to c} f(g(x)) = f\left(\lim_{x \to c} g(x)\right) = f(M)$



---

#### **2. 极限的代数求法**

* **直接代入法 (Direct Substitution)**
* 对所有多项式、有理函数（分母不为零时）及连续超越函数，直接代入 $x=c$ 即可求得极限。


* **未定式处理（形如 $\frac{0}{0}$）**
  * **因式分解法 (Factoring)**：消去分子分母中导致零的公因式 $(x-c)$。
  * **分子/分母有理化 (Rationalization)**：含有根式时，乘以共轭根式（Conjugate）。
  * **繁分式通分 (Complex Fractions)**：先化简分子分母的分子，再消去公因式。


* **夹逼定理 (Squeeze / Sandwich Theorem)**
  * **条件**：如果在 $c$ 的某个邻域内（$x=c$ 除外），始终满足 $g(x) \leq f(x) \leq h(x)$，且 $\lim_{x \to c} g(x) = \lim_{x \to c} h(x) = L$。
  * **结论**：$\lim_{x \to c} f(x) = L$。
  * **典型应用**：证明经典三角极限 $\lim_{x \to 0} \frac{\sin x}{x} = 1$。



---

#### **3. 无穷极限与超越函数的极限**

* **垂直渐近线与无穷极限**
  * 若 $\lim_{x \to c^\pm} f(x) = \pm\infty$，则直线 $x = c$ 为曲线 $y = f(x)$ 的**垂直渐近线 (Vertical Asymptote)**。
  * 常见于分母为 0 且分子不为 0 的有理函数点，或像 $\ln x$ 在 $x \to 0^+$ 时的情形。


* **水平渐近线与趋于无穷的极限**
  * 若 $\lim_{x \to \infty} f(x) = L$ 或 $\lim_{x \to -\infty} f(x) = L$，则直线 $y = L$ 为**水平渐近线 (Horizontal Asymptote)**。
  * **有理函数趋于无穷时的性质**（比较分子最高次项 $m$ 与分母最高次项 $n$）：
    * $m < n$：极限为 $0$（水平渐近线 $y = 0$）。
    * $m = n$：极限为最高次项系数之比。
    * $m > n$：极限为 $\pm\infty$（无水平渐近线）。




* **必须熟记的关键超越极限**
  * $\lim_{x \to 0} \frac{\sin x}{x} = 1$
  * $\lim_{x \to 0} \frac{1 - \cos x}{x} = 0$
  * $\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e \quad \text{或} \quad \lim_{x \to 0} (1 + x)^{\frac{1}{x}} = e$



---

#### **4. 连续性 (Continuity)**

* **点连续的定义（三要素测试 - 考试重点）**
函数 $f(x)$ 在 $x = c$ 处连续，**必须同时满足**以下三个条件：
1. $f(c)$ 有定义（即 $c$ 在 $f$ 的定义域内）。
2. $\lim_{x \to c} f(x)$ 存在。
3. $\lim_{x \to c} f(x) = f(c)$。


* **间断点的分类 (Discontinuities)**
  * **可去间断点 (Removable Discontinuity)**：
    * 特征：$\lim_{x \to c} f(x)$ 存在，但 $\lim_{x \to c} f(x) \neq f(c)$ 或 $f(c)$ 未定义。
    * 表现：图像上为一个空心点（Hole）。


  * **跳跃间断点 (Jump Discontinuity)**：
    * 特征：左极限和右极限均存在且有限，但 $\lim_{x \to c^-} f(x) \neq \lim_{x \to c^+} f(x)$。
    * 常见于分段函数。


  * **无穷间断点 (Infinite Discontinuity)**：
    * 特征：至少有一个单侧极限为 $\pm\infty$。
    * 对应垂直渐近线。


  * **震荡间断点 (Oscillating Discontinuity)**：
    * 特征：函数值在靠近该点时无休止震荡（如 $\sin\left(\frac{1}{x}\right)$ 在 $x=0$ 处）。





---

#### **5. 连续函数的两大核心定理**

* **介值定理 (Intermediate Value Theorem, IVT)**
  * **条件**：$f(x)$ 在闭区间 $[a, b]$ 上**连续**。
  * **结论**：若 $k$ 是介于 $f(a)$ 和 $f(b)$ 之间的任意实数，则在开区间 $(a, b)$ 内**至少存在一个**实数 $c$，使得：

$$f(c) = k$$


  * **常见应用（零点定理）**：若 $f(a)$ 与 $f(b)$ 异号（即 $f(a) \cdot f(b) < 0$），则 $(a, b)$ 内至少存在一个解 $c$ 满足 $f(c) = 0$。


* **极值定理 (Extreme Value Theorem, EVT)**
  * **条件**：$f(x)$ 在闭区间 $[a, b]$ 上**连续**。
  * **结论**：$f(x)$ 在 $[a, b]$ 上必能取得**绝对最大值 (Absolute Maximum)** 和 **绝对最小值 (Absolute Minimum)**。



---

### **答题规范**

1. **FRQ 证明连续性的规范写法**：
在解答题中要证明 $f(x)$ 在 $x=c$ 连续，**必须完整列出三步**：
* 计算并给出 $f(c) = \dots$
* 分别计算左极限与右极限，说明 $\lim_{x \to c^-} f(x) = \lim_{x \to c^+} f(x) = L$，从而证明 $\lim_{x \to c} f(x) = L$
* 明确写出 $\lim_{x \to c} f(x) = f(c)$，最后得出结论。


2. **应用定理（如 IVT）前必须先验证条件**：
在使用 IVT 之前，**第一句必须写上**："Since $f(x)$ is continuous on $[a, b]$..."。如果遗漏“函数连续”这一前提条件，该步得分会被直接扣除。
3. **洛必达法则 (L'Hôpital's Rule) 的前置准备**：
虽然洛必达法则属于后续单元，但在求极限时极常用。注意 AP 阅卷要求：**严禁**写出 $\frac{\lim f}{\lim g} = \frac{0}{0}$ 或 $\frac{\infty}{\infty}$ 这种不规范表达；必须分别列出 $\lim_{x \to c} f(x) = 0$ 且 $\lim_{x \to c} g(x) = 0$，再指明应用 L'Hôpital's Rule。