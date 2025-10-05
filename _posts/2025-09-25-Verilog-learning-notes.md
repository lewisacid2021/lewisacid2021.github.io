---
title: Introduction to Verilog HDL and System Verilog
author: lewisacid2021
date: 2025-09-25 20:40:00 +0800
categories: [Blogging,Verilog,Introduction]
tags: [Verilog]
description: >-
    Personal Learning Notes of Verilog HDL and System Verilog.
---

> 强烈推荐所有Verilog初学者在[HDLBits](https://hdlbits.01xz.net/wiki/Main_Page)上实践学习!!!!
{: .prompt-tip }

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
-  Syntax for integer and real numbers(IEEE-1364-2001)
```ebnf
 number ::= (From Annex A - A.8.7)
        decimal_number
        | octal_number
        | binary_number
        | hex_number
        | real_number
 real_number ::=
        unsigned_number. unsigned_number
        | unsigned_number [ . unsigned_number ] exp [ sign ] unsigned_number
 exp ::=e |E
 decimal_number ::=
        unsigned_number
        | [ size ] decimal_base unsigned_number
        | [ size ] decimal_base x_digit {_ }
        | [ size ] decimal_base z_digit {_ }
 binary_number ::=
        [ size ] binary_base binary_value
 octal_number ::=
        [ size ] octal_base octal_value
 hex_number ::=
        [ size ] hex_base hex_value
 sign ::=+ |
size ::= non_zero_unsigned_number
 non_zero_unsigned_numbera ::= non_zero_decimal_digit { _ | decimal_digit}
 unsigned_numbera ::= decimal_digit {_ | decimal_digit }
 binary_valuea ::= binary_digit {_ | binary_digit }
 octal_valuea ::= octal_digit {_ | octal_digit }
 hex_valuea ::= hex_digit {_ | hex_digit }
 decimal_basea ::='[s|S]d | '[s|S]D
 binary_basea ::='[s|S]b | '[s|S]B
 octal_basea::='[s|S]o | '[s|S]O
 hex_basea ::='[s|S]h | '[s|S]H
 non_zero_decimal_digit ::=1 |2 |3 |4 |5 |6 |7 |8 |9
 decimal_digit ::=0 |1 |2 |3 |4 |5 |6 |7 |8 |9
 binary_digit ::= x_digit | z_digit |0 |1
 octal_digit ::= x_digit | z_digit |0 |1 |2 |3 |4 |5 |6 |7
 hex_digit ::=
        x_digit | z_digit |0 |1 |2 |3 |4 |5 |6 |7 |8 |9
        |a |b |c |d |e |f |A |B |C |D |E |F
 x_digit ::=x |X
 z_digit ::=z |Z |?
```

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
其中，`+/-`是正数和负数标示;`size`指换算过后的二进制数的宽度;`'`为基数格式表示的固有字符,该字符不能缺省,否则为非法表示形式;`base_format`是其基数符号;`number`是可以使用的数字字符集，形式上是相应进制格式下的一串数值。

- 使用整数时需要注意的是:
    1. 较长的数可用下划线分开，提高可读性，本身并无意义，且下划线不能作为首字符
    2. 数字未说明位宽的时候，默认32位
    3. x或z代表的宽度取决于所用的进制，如二进制1位、八进制3位、十六进制4位
    ```Verilog
        8'b1011xxxx //等价于 8'hBx
    ```
    4. 若位宽未定义，则宽度默认为相应值中定义的位数
    ```Verilog
        'o642       //9位八进制数
        'hBD        //8位十六进制数
    ```
    5. 若定义位宽比实际数位大，则左边用0补齐；最左位为x或z则相应用x或z在左边补齐
    ```Verilog
        10'b101     //左边补0, 0000000101
        8'bz0x1     //左边补z, zzzzz0x1
    ```
    6. ?是高阻态z的另一种表示符号。在数字的表示中，字符“?”和Z或z是等价的，可互相替代。例如:`4'b????`等价于`4'bzzzZ`。
    7. 整数可以带正、负号，并且正、负号应写在最左边。负数表示为进制的补码形式。
       例如:-4等价于`4'b1100`。
    8. 如果位宽和进制都缺省，则代表十进制数。例如:-15 代表十进制数-15。
    9. 数字中不能有空格，但在表示进制的字母两侧可以有空格。
    ```Verilog
        8    'h     2A     //正确
        3'      b001    //错误，'和基数b之间不能有空格
    ```

#### 实数及其表示
- 十进制表示法。采用十进制格式，小数点两边必须都有数字，否则为非法的表示形式。例如:`3.0`、`4.54`、`0.2`等都是正确的，而`5.`是错误的。
- 科学计数法。例如:`564.2e2`的值为`56420.0`，`8.7E2`的值为`870.0`(e不分大小写)`3E-3` 的值为 `0.003`。
- Verilog HDL还定义了实数转换为整数的方法,实数通过四舍五入转换为最相近的整数例如:`-13.74`转换为整数是`-14`，`33.27`转换为整数是`33`。

#### 字符串及其表示
字符串是指用双引号括起来的字符序列，它必须包含在同一行中，不能分行书写。若字符串用作 Verilog HDL,表达式或赋值语句中的操作数,则字符串被看做8位的 ASCII 值序列，即一个字符对应8位的 ASCI值。例如`"hello world"`和`"An example for Verilog HDL"`是标准的字符串类型。

### 数据类型

#### 物理数据类型

Verilog HDL最主要的物理数据类型是连线型、寄存器型和存储器型，并使用四种逻辑电平和八种信号强度对实际的硬件电路建模。
- 四值逻辑电平是对信号的抽象表示方式。
- 信号强度表示数字电路中不同强度的驱动源,用来解决不同驱动强度下的赋值冲突,逻辑0和1可以用强度值表示，驱动强度从supply到highz依次递减。


| 标记符   | 名称       | 类型   | 强弱程度 |
|----------|------------|--------|----------|
| supply   | 电源级驱动 | 驱动   | 最强     |
| strong   | 强驱动     | 驱动   |          |
| pull     | 上拉级驱动 | 驱动   |          |
| large    | 大容性     | 存储   |          |
| weak     | 弱驱动     | 驱动   |          |
| medium   | 中性驱动   | 存储   |          |
| small    | 小容性     | 存储   |          |
| highz    | 高容性     | 高阻   | 最弱     |

##### 连线型

|   关键字    |                     功能说明                     |
|:-----------:|:-----------------------------------------------:|
| wire, tri   | 标准连线型（缺省为该类型）                      |
| wor, trior  | 多重驱动时，具有线或特性的连线型                 |
| wand, trand | 多重驱动时，具有线与特性的连线型                 |
| trireg      | 具有电荷保持特性的连线型（特例）                 |
| tri1        | 上拉电阻                                        |
| tri0        | 下拉电阻                                        |
| supply1     | 电源线，用于对电源建模，为高电平 1               |
| supply0     | 电源线，用于对“地”建模，为低电平 0               |

> 连线表示逻辑单元的物理连接，可以对应为电路中的物理信号连线，这种变量类型不能保持电荷(除tireg之外)。连线型变量必须要有驱动源，一种是连接到一个门或者模块的输出端，另一种是用 assign 连续赋值语句对它进行赋值。若没有驱动源，将保持高阻态z。
{: .prompt-tip }

###### 1. wire和tri

在众多的连线型数据类型中，最常见的是 wire(连线)和 tri(三态线)两种，它们的语法和语义一致。不同之处在于:
- wire型变量通常用来表示单个门驱动或连续赋值语句驱动的连线型数据；
- tri型变量则用来表示多驱动器驱动的连线型数据，主要用于定义三态的线网

- wire/tri 的真值表

| 驱动A＼驱动B | 0 | 1 | z | x |
|:------------:|:--:|:--:|:--:|:--:|
| 0            | 0  | x  | 0  | x  |
| 1            | x  | 1  | 1  | x  |
| z            | 0  | 1  | z  | x  |
| x            | x  | x  | x  | x  |

上述真值表可以理解为，同时有两个驱动强度相同的驱动源来驱动wire或tri变量时的输出结果。

```Verilog
       wire [2:0]c;
       assign c = 3'b0x1;
       assign c = 3'b1z1; //c=3'bxx1
```

###### 2. wor和trior
- 多个驱动源驱动时，产生线与结构
- wor/trior 真值表

| 驱动A＼驱动B | 0 | 1 | z | x |
|:------------:|:--:|:--:|:--:|:--:|
| 0            | 0  | x  | 0  | x  |
| 1            | x  | 1  | 1  | x  |
| z            | 0  | 1  | z  | x  |
| x            | x  | x  | x  | x  |

###### 3. wand和triand
- 多个驱动源驱动时，产生线与结构
- wand/triand 真值表

| 驱动A＼驱动B | 0 | 1 | z | x |
|:------------:|:--:|:--:|:--:|:--:|
| 0            | 0  | 0  | 0  | 0  |
| 1            | 0  | 1  | 1  | x  |
| z            | 0  | 1  | z  | x  |
| x            | 0  | x  | x  | x  |

###### 4. tri0和tri1
tri0(tri1)的特征是:若无驱动源驱动，其值为0(tri1的值为1)。
- 多个驱动源情况下 tri0/tri1 的真值表

| tri0＼tri1 | 0 | 1 | z | x |
|:------------:|:--:|:--:|:--:|:--:|
| 0            | 0  | x  | 0  | x  |
| 1            | x  | 1  | 1  | x  |
| z            | 0  | 1  | 0/1  | x  |
| x            | x  | x  | x  | x  |

###### 5. supply0和supply1
supply0用于对“地”建模，即低电平0；supply1用于对电源建模，即高电平1。例如：supply0表示Gnd，supply1表示Vcc。

###### 6. trireg线网
- trireg线网能存储数值(类似于寄存器型数据类型)，并且用于电容节点的建模。当三态寄存器(trireg)的所有驱动源都处于高阻态z时,三态寄存器线网将保存作用在线网上的最后一个逻辑值。三态寄存器线网的缺省初始值为x。
- trireg 网络型数据用于模拟电荷存储。电荷量强度可由下面的关键字来控制:small、medium、large。默认的电荷强度为 medium。一个trireg 网络型数据能够模拟一个电荷存储节点，该节点的电荷量将随时间而逐渐衰减。对于一个tireg 网络型数据，仿真时其电荷衰减时间应当制定为延迟时间。

##### 寄存器型
> reg型变量是最常见也是最重要的寄存器型数据类型，它是数据储存单元的抽象类型，其对应的硬件电路元件具有状态保持作用，能够存储数据，如触发器、锁存器等。
{: .prompt-tip }

- reg型变量常用于行为级描述中，由过程赋值语句对其进行赋值。
- reg 型数据与 wire 型数据的区别在于，reg型数据保持最后一次的赋值，而wire 型数据需要有持续的驱动。一般情况下，reg型数据的默认初始值为不定值x，缺省时的位宽为1位。
```Verilog
    reg a;   //定义一个1位的名为a的reg型变量
    reg [3:0] b:   //定义一个4位的名为b的reg型变量
    reg[8:1]c, d, e;   //定义三个名称分别为c、d、e的8位的reg型变量
```
- reg型量一般为无符号数，若将负数赋给reg型发量，则自动转换成具引不下码形式。例如:
```Verilog
    reg signed[3:0] rega;
    rega =-2:   //rega的值为1110(14)，是2的补码
```
> 在**过程块内被赋值**的每一个信号都必须定义成reg型,并且只能在**always或initial** 过程块中赋值，大多数reg型信号常常是寄存器或触发器的输出。
{: .prompt-warning }

#### 连线型和寄存器型数据类型的声明
##### 1. 连线型数据类型的声明
- 缺省的连线型数据的默认类型为1位(标量)wire类型。Verilog HDL禁止对已经声明过的网络、变量或参数再次声明。连线型数据类型声明的一般语法格式如下:
`<net_declaration><drive_strength><range><delay>[list_of_variables];`
- 其中，`drive_strength`、`range`、`delay`为可选项，而 `list_of_variables` 为必选项。
- 说明：
    1. `net_declaration`:网络型数据类型，可以是wire、tri、tri0、tri1、wand、triand、trior、wor、trireg中的任意一种。对于trireg类型，其声明还有一个`charge_strength`(电荷强度)的可选项。
    2. `drive_strength`:连线变量的驱动强度。
    3. `range`:指定数据为标量或矢量。若该项默认，表示数据类型为1位的标量，超过1位则为矢量形式。
    4. `delay`:指定仿真延迟时间。
    5. `list of variables`:变量名称,一次可定义多个名称，之间用逗号分开。

##### 2. 寄存器型数据类型的声明
- reg 型数据类型声明的一般语法格式如下:
`reg<range><list of register _variables>;`
- 其中，`range`为可选项，它指定了reg型变量的位宽，缺省时为1位。
- 说明:
    - `list_of_register_variables`:变量名称列表，一次可以定义多个名称，之间用逗号分开。

##### 3. 寄存器型数据类型的声明
- 前面已经了解了连线型数据和寄存器型数据这两种物理数据类型的声明格式，下面举例来理解这两种声明格式的用法。
```Verilog
    reg rega;   //定义一一个1位的寄存器型变量
    reg[7:0] regb;  //定义一个8位的寄存器型变量
    tri[7:0] tribus;    //定义一个8位的三态总线
    tri0[15:0] busa;    //定义一个16位的连线型变量，处于三态时为下拉电阻
    tri1 [31:0] busb;   //定义一个32位的连线型变量，处于三态时为上拉电阻
    reg scalared[1 :4]b;    //定义一个4位的标量型寄存器矢量
    wire(pulll, strongO)c = a+b;    //定义一个1和0的驱动强度不同的1位连线型变量c
    trireg(large) storeline;    //定义一个具有大强度的电荷存储功能的存储线
```

#### 存储器型
> 存储器型(memory)本质上还是寄存器型变量阵列，只是 **Verilog HDL中没有多维数组**,所以就用reg型变量建立寄存器组(数组)来实现存储器的功能，也就是扩展的reg 型数据地址范围。存储器型变量可以描述RAM型、ROM型存储器以及reg文件。数组中的每一个单元通过一个数组索引进行寻址。
{: .prompt-tip }
- 存储器型变量的一般声明格式如下:
`reg <rangel><name of register><range2>;`
- 其中，`range1`和`range2`都是可选项，缺省时都为1。
- 说明:
    1. `range1`:存储器中寄存器的位宽，格式为`[msb:lsb]`。
    2. `range2`:寄存器的个数，格式为`[msb:lsb]`，即有`msb-lsb+1`个。
    3. `name_of_register`:变量名称列表，一次可以定义多个名称，之间用逗号分开。

- 存储器变量声明
```Verilog
    reg[7:0]mem1[255:0]; /定义了一个有256个8位寄存器的存储器mem1地址范围是0到255
    reg[15:0]mem2[127:0],regl,reg2; //定义了一个具有128个16 位寄存器的存储器 mem2和2个16位的寄存器regl和reg2
```
- 注意memory型和reg 型数据的区别。一个由n个1位寄存器构成的存储器和一个n位寄存器的意义是不同的。

- 存储器型变量与寄存器型变量的比较。
```Verilog
    reg[n-1:0] a;   //表示个n位的寄存器a
    reg mem1[n-1:0]: //表示一个由n个1位寄存器构成的存储器
```
- 一个n位的寄存器可以在**一条赋值语句**里进行赋值，而一个完整的存储器则不行。例如，对于上例可以进行“rega=0;”的赋值操作，而不能进行“mem1=0;”的赋值操作。如果想对存储器中的存储单元进行读写操作，则必须**指定该单元在存储器中的地址**，例如：
```Verilog
    mem1[2]=0;  //给 mem1存储器中的第3个存储单元(寄存器)赋值为0
```
- 另外，进行寻址的地址索引可以是表达式，这样就可以对存储器中的不同单元进行操作。

#### 抽象数据类型
> 除了物理数据类型外，Verilog HDL还提供了以下几种抽象数据类型:整型(integer)、时间型(time)、实型(real)及参数型(parameter)。它们**只是纯数学的抽象描述，不能够与实际的硬件电路相映射**。
{: .prompt-warning }
##### 1. 整型
- 整型数据常用于对循环控制变量的说明，在算术运算中被视为二进制补码形式的有符号数。除了寄存器型数据被当作无符号数来处理之外，整型数据与32位寄存器型数据在实际意义上相同。
- 整型数据的声明格式如下:
`integer<list of register variables>;`
- 整形数据声明：
```Verilog
    integer index;  //简单的32位有符号整数
    integer i[31:0] //定义了整型数组，它有32个元素
```
##### 2. 时间型
