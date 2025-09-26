---
title: Introduction to Verilog HDL and System Verilog
author: lewisacid2021
date: 2025-09-25 20:40:00 +0800
categories: [Blogging,Verilog,Introduction]
tags: [Verilog]
description: >-
    Personal Learning Notes of Verilog HDL and System Verilog.
---

# Verilog HDL 概述
> 随着**集成电路规模的迅速扩大和复杂度的不断提高**，芯片设计和制造成本不断增加，设计、测试和制造工艺中的环节亦随之增多，相应的设计过程变得越来越复杂，因此，设计者希望通过某种手段提高数字集成电路的**设计、验证的效率和可靠性**。

## 硬件描述语言

- HDL是一种**高级程序设计语言**，通过对数字电路和系统的语言描述，可以对**数字集成电路**进行设计和验证。
- 利用HDL，数字集成电路设计工程师可以根据电路结构的特点，采用层次化的设计结构，将抽象的逻辑功能用电路的方式进行实现。
- 为了提高HDL对数字电路设计、综合和仿真的能力，Mentor、Cadence、Synopsys等公司提供了功能强大的电子设计自动化(EDA)工具，可以将 HDL 程序**综合**成为网表，通过自动**布局布线**工具把网表转换为具体电路布线结构，用于*专用集成电路(Application Specific Integrated Circuit,ASIC)*和*现场可编程门阵列(Field Programmable GateArray，FPGA)的实现*。

## Verilog HDL的发展和国际标准

Verilog HDL 是一种常用的硬件描述语言，可以从系统级、电路级、门级到**开关级**等抽象层次进行数字电路系统的建模、设计和验证工作。利用该语言可以设计出简单的门级电路，甚至功能完整的数字电路系统。

### Verilog HDL 国际标准

| 名称                        | 时间            | 备注 |
|-----------------------------|-----------------|------|
| Verilog IEEE 1364-1995      | 1995年12月      | 基于 Verilog HDL的优越性，IEEE制定了Verilog HDL的IEEE标准，即 Verilog HDL 1364-1995 |
| Verilog-A                   | 1996年<br>1999年 | Verilog-A是由OVI组织提出的一种硬件描述语言，是模拟电路行业的标准建模语言，来源于IEEE1364 Verilog规范 |
| Verilog IEEE 1364-2001      | 2001年          | IEEE制定了Verilog IEEE1364-2001标准，并公开发布；其中HDL部分相对于1995年的标准有较大增强 |
| System Verilog IEEE 1800-2005 | 2005年        | 此标准是继 VHDL 和 Verilog HDL之后仿真工具支持的语言，它建立在 Verilog HDL的基础上，是IEEE 1364 Verilog-2001标准的扩展，兼容 Verilog-2001，将成为下一代硬件设计和验证的语言 |


## Verilog HDL和VHDL

### 设计方法上
- VHDL结构紧凑、灵活性差、设计规则繁琐，但由于语法规则严谨性高，VHDL可综合性和代码一致性很强，适用于规模较大的数字集成电路系统设计
- VerilogHDL的语法结构和设计方式灵活，掌握难度小，但是由于设计代码风格的多样性，当数字电路规模较大时，代码的管理和系统设计难度较大

### 设计范围上
- Verilog HDL可以描述系统级(System)、算法级(Algorithm)、寄存器传输级(RTL)、门级(Gate)和开关级(Switch)电路
- VHDL则不具备**开关级**电路描述能力。
- 在 FPGA 和 CPLD 等用户可配置数字电路的设计中，由于最小可配置电路是门级电路，没有开关级可配置电路，因此两种语言的设计能力相当
- 在 ASIC 设计和开关级描述方面，VerilogHDL的设计范围比 VHDL 略大一些。

![img-description](/assets/img/posts/ic_verilogcmpvhdl.png)

## Verilog HDL在数字集成电路设计流程中的应用
- Verilog HDL in IC Design

- 在集成电路的设计流程中，以 Verilog HDL 为代表的 HDL 发挥了很大作用。
    - 在RTL编码阶段的电路设计过程中，VerilogHDL主要进行系统级和电路级的设计和验证;
    - 在电路验证和后端设计阶段，对于不同阶段的综合网表和物理电路的验证工作，VerilogHDL也被用于电路的验证工作。

![img-description](/assets/img/posts/ic_verilogindesign.png)

# Verilog HDL 基础
> Verilog HDL语法来源于C语言基本语法，其基本词法约定与C语言类似。程序的语言要素也称为词法，是由符号、数据类型、运算符和表达式构成的，其中符号包括空白符、注释符、标识符和转义标识符、关键字、数值等。
{: .prompt-info }

## 语言要素

### 空白符
- 换行符、制表符、空格符、换页符等
- 编译和综合时被忽略

### 注释符
- 注释格式与C语言相同
    1. 单行注释:单行注释以“//”开始，Verilog HDL忽略从此处到行尾的内容。
    2. 多行注释:多行注释以“/\*”开始，到“\*/”结束，Verilog HDL 忽略其中的注释内容。

> 需要注意的是，多行注释不允许嵌套，但是单行注释可以嵌套在多行注释中。
{: .prompt-tip }

### 标识符和转义标识符
- 在 Verilog HDL 中，标识符(Identifier)被用来命名信号、模块、参数等
- 它可以是任意一组字母、数字、$符号和(下划线)符号的组合。
> 应该注意的是，标识符的字母区分大小写并且第一个字符必须是字母或者下划线。
{: .prompt-tip }

### 关键字

- Verilog 1364-2001 Keywords (103 total)

| always   | and     | assign   | begin   | buf     | bufif0   | bufif1   | case     | casex   | casez   |
|----------|---------|----------|---------|---------|----------|----------|----------|---------|---------|
| cmos     | deassign| default  | defparam| disable | edge     | else     | end      | endcase | endfunction |
| endmodule| endprimitive | endspecify | endtable | endtask | event | for     | force   | forever | fork    |
| function | highz0  | highz1   | if      | initial | inout    | input    | integer  | join    | large   |
| macromodule | medium | module | nand    | negedge | nmos     | nor      | not      | notif0  | notif1  |
| or       | output  | parameter| pmos    | posedge | primitive| pull0    | pull1    | pulldown| pullup  |
| rcmos    | real    | realtime | reg     | release | repeat   | rnmos    | rpmos    | rtran   | rtranif0 |
| rtranif1 | scalared| small    | specify | specparam | strong0 | strong1 | supply0  | supply1 | table   |
| task     | time    | tran     | tranif0 | tranif1 | tri      | tri0     | tri1     | triand  | trior   |
| trireg   | vectored| wait     | wand    | weak0   | weak1    | while    | wire     | xnor    | xor     |

### 数值
- Verilog HDL,有四种基本的逻辑数值状态，用数字或字符表达数字电路中传送的逻辑状态和存储信息。Verilog HDL逻辑数值中,x和z都不区分大小写

| 状态                   | 说明                 |
|------------------------|----------------------|
| 0 | 低电平、逻辑0 或 “假”   |
| 1 | 高电平、逻辑1 或 “真”   |
| x 或 X                 | 不确定或未知的逻辑状态 |
| z 或 Z                 | 高阻态               |

- 在数值中，下划线符号“_”除了不能放于数值的首位外，可以随意用在整型数与实型数中，它们对数值大小没有任何改变，只是为了提高可读性。例如，16'b1011000110001100和16'b1011_0001_1000_1100的数值大小是相同的，只是后一种的表达方式可读性更强。

#### 整数及其表示
- Verilog HDL中的整数可以是二进制(b 或 B)、八进制(o 或 O)、十进制(d 或 D)与十六进制(h或H)，其基数符号与可以采用的数字字符集如表所示。

| 数制   | 基数符号 | 数字字符集                              |
|--------|----------|-----------------------------------------|
| 二进制 | b 或 B  | 0、1、x、X、z、Z、?、-                  |
| 八进制 | o 或 O  | 0~7、x、X、z、Z、?、-                   |
| 十进制 | d 或 D  | 0\~9、-                                  |
| 十六进制 | h 或 H | 0\~9、a\~f、A\~F、x、X、z、Z、?、-         |

- 整数的表示形式如下:
`+/-<size>'<base format><number>`
其中，“+/-”是正数和负数标示;`size`指换算过后的二进制数的宽度;“'”为基数格式其中，表示的固有字符,该字符不能缺省,否则为非法表示形式;`base_format`是其基数符号;`number`是可以使用的数字字符集，形式上是相应进制格式下的一串数值。

- 使用整数时需要注意的是:
    1. 较长的数可用下划线分开