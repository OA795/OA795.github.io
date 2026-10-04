---
title: "微积分-导数的定义与基本求导法则"
description: "个人微积分学习笔记"
date: 2026-9-13
tags:
  - AP Calculus BC
  - 笔记
category: "笔记"
time: "10min"

---
# 微积分
---
### **导数的定义与基本求导法则**

#### **1. 导数的定义与几何意义**

* **导数的极限定义**
  * **切线斜率与瞬时变化率**：函数 $y = f(x)$ 在 $x = a$ 处的导数表示曲线在该点处切线的斜率，也代表函数在该点的瞬时变化率。
  * **割线趋近于切线**：通过计算连接 $(a, f(a))$ 与附近一点 $(x, f(x))$ 的割线斜率，并在两点无限接近时取极限。
  * **两种等价定义形式**：
    * **$x \to a$ 形式**：
$$f'(a) = \lim_{x \to a} \frac{f(x) - f(a)}{x - a}$$
    * **$h \to 0$ 形式（$\Delta x \to 0$）**：
$$f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}$$
* **导函数 (Derivative Function)**
  * 将每一个使导数存在的 $x$ 映射到其导数值 $f'(x)$ 的函数。
  * **常见记号 (Notations)**：

$$y' = f'(x) = \frac{dy}{dx} = \frac{d}{dx}[f(x)]$$




* **可导性与连续性的关系 (Differentiability and Continuity)**
  * **核心定理**：若 $f(x)$ 在 $x = a$ 处可导，则 $f(x)$ 在 $x = a$ 处**必连续**。
  * **逆命题不成立**：连续不一定可导（例如 $f(x) = \vert{}x\vert{}$ 在 $x = 0$ 处连续但不可导）。
  * **不可导的三种常见情形**：
    * **尖点/折点 (Corner / Cusp)**：左导数与右导数不相等（如 $y = \vert{}x\vert{}$ 在 $x = 0$）。
    * **垂直切线 (Vertical Tangent)**：极限趋于 $\pm\infty$（如 $y = \sqrt[3]{x}$ 在 $x = 0$）。
    * **不连续点 (Discontinuity)**：函数在该点本身不连续（如跳跃或可去间断点）。





---

#### **2. 基本求导法则 (Basic Derivative Rules)**

* **常数与幂函数法则**
  * **常数法则 (Constant Rule)**：$\frac{d}{dx}[c] = 0$
  * **幂法则 (Power Rule)**：对任意实数 $n$：

$$\frac{d}{dx}\left[x^n\right] = n x^{n-1}$$




* **线性性质法则**
  * **常数倍法则 (Constant Multiple Rule)**：$\frac{d}{dx}[c \cdot f(x)] = c \cdot f'(x)$
  * **加减法则 (Sum and Difference Rule)**：$\frac{d}{dx}[f(x) \pm g(x)] = f'(x) \pm g'(x)$


* **乘法与除法法则 (Product & Quotient Rules)**
  * **乘法法则 (Product Rule)**：

$$\frac{d}{dx}[f(x) \cdot g(x)] = f'(x) g(x) + f(x) g'(x)$$



*口诀：前导后不导 + 前不导后导*
  * **除法法则 (Quotient Rule)**：

$$\frac{d}{dx}\left[\frac{f(x)}{g(x)}\right] = \frac{f'(x) g(x) - f(x) g'(x)}{[g(x)]^2} \quad (g(x) \neq 0)$$



*口诀：(子导母 - 子母导) / 母的平方*



---

#### **3. 常见超越函数的导数 (Transcendental Functions)**

* **三角函数导数 (Trigonometric Functions)**
  * $\frac{d}{dx}[\sin x] = \cos x$
  * $\frac{d}{dx}[\cos x] = -\sin x$
  * $\frac{d}{dx}[\tan x] = \sec^2 x$
  * $\frac{d}{dx}[\csc x] = -\csc x \cot x$
  * $\frac{d}{dx}[\sec x] = \sec x \tan x$
  * $\frac{d}{dx}[\cot x] = -\csc^2 x$


* **指数与对数函数导数 (Exponential & Logarithmic Functions)**
  * **自然指数与对数（底数为 $e$）**：
    * $\frac{d}{dx}\left[e^x\right] = e^x$
    * $\frac{d}{dx}[\ln x] = \frac{1}{x} \quad (x > 0)$


  * **一般底数（$a > 0, a \neq 1$）**：
    * $\frac{d}{dx}\left[a^x\right] = a^x \ln a$
    * $\frac{d}{dx}[\log_a x] = \frac{1}{x \ln a}$





---

#### **4. 切线与法线方程应用 (Tangents and Normals)**

* **切线方程 (Tangent Line Equation)**
  * 过点 $(a, f(a))$ 且斜率为 $m = f'(a)$ 的切线点斜式方程：

$$y - f(a) = f'(a)(x - a)$$




* **法线方程 (Normal Line Equation)**
  * 法线与切线垂直，其斜率为切线斜率的负倒数 $m_{\text{normal}} = -\frac{1}{f'(a)}$（前提是 $f'(a) \neq 0$）：

$$y - f(a) = -\frac{1}{f'(a)}(x - a)$$





---

### **答题规范**

1. **利用极限定义求导 (FRQ / 概念题规范)**：
若题目要求“Use the definition of derivative to find $f'(x)$”，**必须完整写出极限符号与步骤**：
* 写出基本公式：$\lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$
* 代入解析式展开并化简分子，消除分子分母中导致 $\frac{0}{0}$ 的因子 $h$
* 明确写出取极限后的最终结果，严禁直接使用求导公式跳过极限计算。


2. **识别“伪装成极限”的导数计算 (MCQ 快速解题)**：
选择题中常出现结构形如 $\lim_{h \to 0} \frac{\cos(\frac{\pi}{3} + h) - \frac{1}{2}}{h}$ 的极限题，不要盲目去用三角公式化简；**必须第一时间辨识出**这是 $f(x) = \cos x$ 在 $x = \frac{\pi}{3}$ 处的导数定义，直接计算 $f'\left(\frac{\pi}{3}\right) = -\sin\left(\frac{\pi}{3}\right) = -\frac{\sqrt{3}}{2}$ 即可。
3. **分段函数在分界点处的求导规范**：
判断分段函数在分界点 $x = c$ 是否可导时，**必须分成两步**：
* **先验证连续性**：证明 $\lim_{x \to c^-} f(x) = \lim_{x \to c^+} f(x) = f(c)$；若不连续则直接判定不可导。
* **再验证左右导数相等**：分别计算左导数 $f'_-(c)$ 与右导数 $f'_+(c)$，指出两极限存在且 $f'_-(c) = f'_+(c)$。