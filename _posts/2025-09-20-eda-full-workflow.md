---
title: Reproducing the Full Workflow of Open-Source EDA Tools——A Lab Practice
author: lewisacid2021
date: 2025-09-20 02:20:00 +0800
categories: [Blogging,EDA,Workflow]
tags: [EDA]
description: >-
    A hands-on lab record detailing the use of open-source EDA tools: logic synthesis with Yosys, timing analysis via iSTA, and physical backend design using iEDA following its user_guide.
image:
  path: /assets/img/posts/iEDA_flow.png
  lqip: /assets/img/posts/iEDA_flow.png
  alt: iEDA Tool Set Flow
---

> 1. 通过开源RTL综合器[yosys](https://github.com/YosysHQ/yosys)对RTL设计进行逻辑综合，使用开源静态时序分析工具[iSTA](https://github.com/OSCC-Project/iEDA/tree/master/src/operation/iSTA)评估RTL设计中的关
键时序路径，实验设计参考[yosys-sta](https://github.com/OSCPU/yosys-sta)
2. 基于生成的网表，使用[iEDA](https://gitee.com/oscc-project/iEDA)工具，物理后端设计流程并分析结果。有关iEDA的使用流程完全参照iEDA的[user_guide](https://gitee.com/oscc-project/iEDA/blob/master/docs/user_guide/iEDA_user_guide-cn.md)，实验中遇到的问题几乎都可以从中找到答案。

## 环境要求
- Yosys
- iEDA（需要Ubuntu 20.04.5 LTS及以上Ubuntu系统）
> 本次实验在Ubuntu 22.04.5 LTS虚拟机上运行
- Smic180 PDK

## 实验步骤

### 逻辑综合实验目录
- ：`~/eda-lab/yosys-sta`
.
├── cpu //这个cpu的RTL设计文件夹
├── bin //iSTA可执行文件
│ ├── iSTA
│ └── libyaml-cpp.so.0.6
├── Makefile //整个流程的makefile脚本
├── smic180 //smic180工艺库（部分）
├── README.md
├── result //跑完综合后会自动生成该文件夹，所有综合后
的log、rpt都会放在这里
│ └── cpu-10MHz //自动命名格式是DESIGNNAME-xMHz
├── sta.tcl //make sta命令调用的sta脚本
└── yosys.tcl //make syn命令调用的syn脚本

### 使用yosys完成逻辑综合

#### 1）在CPU顶层外围包IO/PAD

提供的CPU代码的最顶层是 cpu.v，不包含 IO，真实芯片中，需要通过 IO cell 和芯片外部进行互连。IO的作用一是完成 core 电平和 IO 电平转换，例如 core是 1.8V，IO 是 3.3V；二是完成特殊逻辑功能，例如双向 IO、三态 IO；三是提供 ESD 保护。有关基于smic180nm工艺的IO/PAD的具体信息需要参考手册：smic180路径下的SMIC_SP018_IO_DataBook_Ver1p3.pdf文档。

在CPU顶层外围包IO/PAD的具体方法是建立新的顶层文件，比如full_chip.v，在其中例化相应的IO cell并
例化原先顶层模块，把原先顶层模块的input/output通过IO cell拉到芯片外部。在cpu文件夹下编写
full_chip.v文件如下：

```verilog
module full_chip (
  input rst_,
  input clock,
  input [7:0] data_out,
  output rd,
  output wr,
  output [7:0] data_in,
  output halt,
  output [4:0] addr
);
wire clock_pin;
wire rst_pin;
wire [7:0] data_out_pin;

wire [7:0] data_in_pin;
wire [4:0] addr_pin;
wire rd_pin;
wire wr_pin;

PI u_pad_clock ( .PAD(clock), .C(clock_pin));
PI u_pad_rst_ ( .PAD(rst_), .C(rst_pin));

PI u_pad_data_out7 ( .PAD(data_out[7]), .C(data_out_pin[7]));
PI u_pad_data_out6 ( .PAD(data_out[6]), .C(data_out_pin[6]));
PI u_pad_data_out5 ( .PAD(data_out[5]), .C(data_out_pin[5]));
PI u_pad_data_out4 ( .PAD(data_out[4]), .C(data_out_pin[4]));
PI u_pad_data_out3 ( .PAD(data_out[3]), .C(data_out_pin[3]));
PI u_pad_data_out2 ( .PAD(data_out[2]), .C(data_out_pin[2]));
PI u_pad_data_out1 ( .PAD(data_out[1]), .C(data_out_pin[1]));
PI u_pad_data_out0 ( .PAD(data_out[0]), .C(data_out_pin[0]));

PO8 u_pad_data_in7 ( .I(data_in_pin[7]), .PAD(data_in[7]));
PO8 u_pad_data_in6 ( .I(data_in_pin[6]), .PAD(data_in[6]));
PO8 u_pad_data_in5 ( .I(data_in_pin[5]), .PAD(data_in[5]));
PO8 u_pad_data_in4 ( .I(data_in_pin[4]), .PAD(data_in[4]));
PO8 u_pad_data_in3 ( .I(data_in_pin[3]), .PAD(data_in[3]));
PO8 u_pad_data_in2 ( .I(data_in_pin[2]), .PAD(data_in[2]));
PO8 u_pad_data_in1 ( .I(data_in_pin[1]), .PAD(data_in[1]));
PO8 u_pad_data_in0 ( .I(data_in_pin[0]), .PAD(data_in[0]));

PO8 u_pad_addr4 ( .I(addr_pin[4]), .PAD(addr[4]));
PO8 u_pad_addr3 ( .I(addr_pin[3]), .PAD(addr[3]));
PO8 u_pad_addr2 ( .I(addr_pin[2]), .PAD(addr[2]));
PO8 u_pad_addr1 ( .I(addr_pin[1]), .PAD(addr[1]));
PO8 u_pad_addr0 ( .I(addr_pin[0]), .PAD(addr[0]));

PO8 u_pad_rd ( .I(rd_pin), .PAD(rd));
PO8 u_pad_wr ( .I(wr_pin), .PAD(wr));

cpu u_cpu(
  .rst_ (rst_pin ),
  .clock (clock_pin ),
  .data_out (data_out_pin ),
  .data_in (data_in_pin ),
  .addr (addr_pin ),
  .rd (rd_pin ),
  .halt (halt ),
  .wr (wr_pin )
);
endmodule
```
#### 2）修改Makefile文件

本实验使用Makefile脚本调用yosys工具做逻辑综合，需要根据情况对Makefile脚本做修改。

```makefile
PROJ_PATH = $(shell pwd)
DESIGN ?= full_chip
SDC_FILE ?= $(PROJ_PATH)/cpu/CPU.sdc
#RTL_FILES ?= $(shell find $(PROJ_PATH)/example -name "*.v")
RTL_FILES ?= $(PROJ_PATH)/cpu/full_chip.v $(PROJ_PATH)/cpu/cpu.v
$(PROJ_PATH)/cpu/register.v $(PROJ_PATH)/cpu/mux.v $(PROJ_PATH)/cpu/counter.v
$(PROJ_PATH)/cpu/control.v $(PROJ_PATH)/cpu/scale_mux.v $(PROJ_PATH)/cpu/dffr.v
$(PROJ_PATH)/cpu/alu.v
export CLK_FREQ_MHZ ?= 500
```

`PROJ_PATH = $(shell pwd)` 一般无需修改，也就是将当前目录设置为 `PROJ_PATH` 的值，以便在脚本的
之后部分使用。

`DESIGN ?= full_chip` ，这里需要将该变量修改为RTL设计中顶层设计的名称。

`SDC_FILE ?= $(PROJ_PATH)/cpu/CPU.sdc` ，这里需要将该变量修改为sdc文件路径。（不过综合时不
会调用这个文件，该sdc文件是sta时用到的）

还需要将 `RTL_FILES` 变量的值修改为所有希望进行综合的.v文件。在脚本的第5行还提供了另外一种给
`RTL_FILES` 变量赋值的办法，不过暂时使用#将其注释。这种办法是使用了[find](https://www.runoob.com/linux/linux-comm-find.html)这个命令：
```bash
find $(PROJ_PATH)/RTL -name "*.v" 
```
可以遍历该目录下所有子文件夹，找到所有后缀为.v的文件。一般会把所有待综合的.v文件都集中放在一个文件夹下，并使用这种方式给 `RTL_FILES` 变量赋值。

这里没有采用这种方法的原因是：很多人会把各模块testbench的.v文件也放在和可综合模块相同的目录
下，因此为了避免习惯上的冲突，干脆采用后面这种“枚举”所有.v文件的方式给 `RTL_FILES` 变量赋值。

这里需要特别注意：在RTL_FILES的文件中必须包含一个名为DESIGN的module

`export CLK_FREQ_MHZ ?= 500` ，在这里你需要设定目标综合频率，注意单位是MHz。

#### 3）在当前目录下运行以下命令完成综合
```bash
make syn
```
在这里可能会遇到各种各样报错，应当根据报错对设计进行修改，相关报错应当优先参考[yosys的github
网址下的issues部分](https://github.com/YosysHQ/yosys/issues)。

#### 4）阅读综合后的log和rpt

在result目录下，可以看到综合后的log和rpt文件，以及最关键的netlist网表文件，该文件夹目录说明如下：
├── result
│ └── full_chip-500MHz
│ ├── full_chip.netlist.v - Yosys综合的网表文件
│ ├── synth_check.txt - Yosys综合的检查报告, 用户需仔细阅读并决定是否需要排除相
应警告
│ ├── synth_stat.txt - Yosys综合的面积报告
│ └── yosys.log - Yosys综合的完整日志

大体来讲，synth_check.txt文件应当是首先阅读的，应当确保里面没有“error”提示，此外文件中的
“warning”也需要一一阅读。

Yosys综合生成的网表文件是逻辑综合后得到的关键输出文件，网表是由标准单元组成的“门级”电路。有
关标准单元的信息可以查看标准单元手册：smic180目录下的scc018ug_uhd_rvt.pdf文档，有助于理解
full_chip.netlist.v文件。

### 使用iSTA工具做简单的时序评估
