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

### 逻辑综合实验目录 `~/eda-lab/yosys-sta`

.

├── cpu //这个cpu的RTL设计文件夹

├── bin //iSTA可执行文件

│ ├── iSTA

│ └── libyaml-cpp.so.0.6

├── Makefile //整个流程的makefile脚本

├── smic180 //smic180工艺库（部分）

├── README.md

├── result //跑完综合后会自动生成该文件夹，所有综合后的log、rpt都会放在这里

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

#### 1）修改sdc文件

```verilog
set clk_port_name clock
set CLK_FREQ_MHZ 500
if {[info exists env(CLK_FREQ_MHZ)]} {
  set CLK_FREQ_MHZ $::env(CLK_FREQ_MHZ)
} else {
  puts "Warning: Environment CLK_FREQ_MHZ is not defined. Use $CLK_FREQ_MHZ MHz
by default."
}
set clk_io_pct 0.2

set clk_port [get_ports $clk_port_name]
create_clock -name core_clock -period [expr 1000 / $CLK_FREQ_MHZ] $clk_port
```

sdc文件只需要修改第一行内容，这里需要特别注意：该时钟端口名称需要与设计文件保持一致

比如：顶层设计中如果时钟端口是 `input clock` ，则sdc文件第一行应为 `set clk_port_name clock`

你可能注意到第2行似乎还设置了一个时序检查的目标频率，该参数还会在接下来被使用。不过，这里3-6行的内容是说：首先检查环境变量 `CLK_FREQ_MHZ` 是否存在：

- 如果存在，脚本会更新 `CLK_FREQ_MHZ` 为环境变量的值。这是通过使用 `env(CLK_FREQ_MHZ)` 读取环境变量并将其值分配给变量 `CLK_FREQ_MHZ` 来实现的。

- 如果环境变量不存在，它会打印一条警告消息，指出环境变量 `CLK_FREQ_MHZ` 未定义，并将默认使用500 MHz的值。

因此可以看到，第2行只是设置了一个默认值，环境变量中的值将在Makefile文件中设置。

#### 2）在当前目录下运行以下命令完成静态时序分析
```bash
make sta
```

这里需要注意的是，由于Makefile中设定的文件依赖关系，如果不先做 `make syn` 直接 `make sta` ，那么脚本也会自动先执行 `make syn` 命令完成综合。因此可以把 `make sta` 看作一键式的，完成逻辑综合+静态时序分析的命令。

此外Makefile脚本提供了清除result文件夹的命令，在目录下执行 `make clean` 就可以删除result文件
夹。

#### 3）阅读时序分析后的log和rpt

├── result

│ └── full_chip-500MHz

│ ├── full_chip.cap - iSTA的电容违例报告

│ ├── full_chip.fanout - iSTA的扇出违例报告

│ ├── full_chip_hold.skew - iSTA的hold模式下时钟偏斜报告

│ ├── full_chip.netlist.v - Yosys综合的网表文件

│ ├── full_chip.rpt - iSTA的时序分析报告, 包含WNS, TNS和时序路径

│ ├── full_chip_setup.skew - iSTA的setup模式下时钟偏斜报告

│ ├── full_chip.trans - iSTA的转换时间违例报告

│ ├── synth_check.txt - Yosys综合的检查报告, 用户需仔细阅读并决定是否需要排除相应警告

│ ├── synth_stat.txt - Yosys综合的面积报告

│ └── yosys.log - Yosys综合的完整日志

由于本设计的约束脚本（.sdc文件）没有设置skew，max cap，max fanout等信息，因此主要关注full_chip.rpt中的信息内容，其中setup违例应当在逻辑综合阶段重点关注。如果slack出现了**负值**，说明我们的设计“跑不到”设定的目标频率，要么**优化设计**，要么**降低目标频率**，重新综合。

> 阅读full_chip.rpt，查看setup违例相关信息，指出slack值是否为负？如果存在负值，应当降低目标频率重新跑综合。提示：降低目标频率的办法是修改makefile文件第八行的内容：`export CLK_FREQ_MHZ ?=500`，尝试把目标频率改为200M/300M/400MHz，再对比阅读 full_chip.rpt中setup违例的相关信息，slack为负值说明我们的设计依然“跑不到”设定的那么高的目标频率。
{: .prompt-tip }

### 物理后端实验目录 `~/eda-lab/iEDA`

本次实验主要需要关注的是iEDA目录下的scripts文件夹：

.

├── design //该文件夹下存放不同的设计

│ ├── ispd18

│ ├── smic180_full_chip //存放有本次CPU设计和iEDA运行脚本

│ └── sky130_gcd //iEDA项目提供的例程，需要在它的基础上做修改

├── docker

│ ├── build_succeeded.tcl

│ ├── Dockerfile.base

make sta

│ ├── Dockerfile.demogcd

│ ├── Dockerfile.demohello

│ ├── Dockerfile.release

│ └── update_img.sh

├── foundry //使用的工艺库

│ ├── README.md

│ ├── smic180 //本次设计使用的工艺库

│ └── sky130

└── hello.tcl 

以design目录下smic180_full_chip设计为例，目录体系如下：

.

├── iEDA //iEDA可执行文件

├── iEDA_config

├── README.md

├── result //执行后端流程后，报告的存放位置，其中的verilog文件夹需要存放netlist

├── run_iEDA_gui.py //物理后端全流程的可视化python运行脚本

├── run_iEDA.py //物理后端全流程的python运行脚本

├── run_iEDA.sh

└── script //物理后端各子步骤的运行脚本

### 使用脚本完成物理后端全流程

阅读[iEDA的user_guide](https://gitee.com/oscc-project/iEDA/blob/master/docs/user_guide/iEDA_user_guide-cn.md)中“物理后端设计全流程运行”这一章节内容，追踪从run_iEDA.py脚本开始，调用的各个子步骤的脚本顺序，并从中找出需要修改的文件和内容，为自己所用，下面我会将关键步骤做简单提炼。

#### 1）将本次cpu的netlist和sdc文件拷贝到相应位置

拷贝sdc文件到 iEDA/scripts/design/smic180_full_chip/result/verilog/

```bash
# 拷贝 sdc 文件到目录 ./scripts/design/smic180_full_chip/result/verilog/
cp <sdc_path>/*.sdc scripts/design/smic180_full_chip/result/verilog/.
```

需要将上述命令中的<sdc_path>做替换，换为实际的sdc文件目录。下面拷贝Netlist文件到目录iEDA/scripts/design/smic180_full_chip/result/verilog/

```bash
# 拷贝 .v 文件到目录 ./scripts/design/smic180_full_chip/result/verilog/
cp <netlist_path>/full_chip.netlist.v ./scripts/design/smic180_full_chip/result/verilog/.
```

需要将上述命令中的<netlist_path>做替换，换为实际的网表文件目录。

#### 2）修改db_path_setting.tcl文件

```tcl
#===========================================================
## set lef path
#===========================================================
set TECH_LEF_PATH "./../../foundry/smic180/scc018u_6m_1tm1.lef"
set LEF_PATH "./../../foundry/smic180/scc018ug_uhd_rvt.lef \
              ./../../foundry/smic180/SP018_V1p5_6MT.lef"

#set DEF_PATH "./result/netlist_result.def"
set VERILOG_PATH
"./../../design/smic180_full_chip/result/verilog/full_chip.netlist.v"

set LIB_PATH "./../../foundry/smic180/scc018ug_uhd_rvt_ss_v1p62_125c_basic.lib \
              ./../../foundry/smic180/SP018_V1p4_max.lib"

set LIB_PATH_FIXFANOUT ${LIB_PATH}
set LIB_PATH_DRV ${LIB_PATH}
set LIB_PATH_HOLD ${LIB_PATH}
set LIB_PATH_SETUP ${LIB_PATH}

set SDC_PATH_BEFORE_CTS
"./../../design/smic180_full_chip/result/verilog/full_chip.sdc"
set SDC_PATH "./../../design/smic180_full_chip/result/verilog/full_chip.sdc"
set SPEF_PATH ""
```

#### 3）其他修改

完成上述修改后，用 `./run_iEDA.py` 命令应当可以完成物理后端全流程。不过后端流程中，各子步骤参数的设置以及报告的阅读是十分关键的。

比如第一步floorplan，run_iFP.tcl文件中：

```tcl
set DIE_AREA "0.0 0.0 1560 1600"
set CORE_AREA "200.48 200.48 1359.52 1399.52"
set PLACE_SITE uhd_CoreSite
set IO_SITE IOSite
set CORNER_SITE CornerSite

init_floorplan \
  -die_area $DIE_AREA \
  -core_area $CORE_AREA \
  -core_site $PLACE_SITE \
  -io_site $IO_SITE \
  -corner_site $CORNER_SITE
```

这里是设置DIE_AREA和CORE_AREA，根据[iEDA的user_guide](https://gitee.com/oscc-project/iEDA/blob/master/docs/user_guide/iEDA_user_guide-cn.md)中相关内容，DIE_AREA指芯片版图 DIE 面积，单位是平方微米，CORE_AREA指芯片版图 CORE 面积， 单位是平方微米，CORE 的面积为所有标准单元ROW的面积之和。这里设置参数时，应当需要参考前端设计结束后输出的synth_stat.txt文件，里面包含芯片的面积等参数。

诸如此类的修改还有许多，应当结合具体情况做修改。完成物理后端流程后，各子步骤报告和最后的版
图在 ./result/report目录下。

#### 4）物理后端设计分步骤/全流程运行

参考[iEDA的user_guide](https://gitee.com/oscc-project/iEDA/blob/master/docs/user_guide/iEDA_user_guide-cn.md)中物理后端设计全流程运行部分

注意：run_iEDA.py脚本中使用的iEDA可执行文件是在**当前smic180_full_chip目录下的iEDA文件**，因此
如果在iEDA目录下重新编译构建了iEDA可执行文件，需要使用 
```bash
cp ./bin/iEDA scripts/design/smic180_full_chip/. 
```
命令把新编译构建好的iEDA可执行文件拷贝过来

#### 5）查看各阶段生成的报告和生成的版图（gds2文件）

阅读[iEDA的user_guide](https://gitee.com/oscc-project/iEDA/blob/master/docs/user_guide/iEDA_user_guide-cn.md)中对于各个步骤后生成报告的解读，理解生成的报告

对于生成的.gds2文件，可以使用相关软件查看。除了iEDA自带的gui界面（使用`run_iEDA_gui.py'脚本运行物理后端设计全流程），也可以使用[Klayout](https://www.klayout.de/build.html)等软件打开gds2文件查看，环境中并未安装，可以自行尝试，效果如下：

![img-description](/assets/img/posts/cpu.png)

> 在运行iEDA过程中，LVS（版图与原理图一致性）检查出现异常：`[IdbPin Error]`。针对该异常，已就问题咨询 iEDA 项目组相关人员，其反馈此为流程内正常出现的 error，但具体成因（如 PDK 文件相关问题或约束脚本参数缺失）尚未查明，该问题不会对全流程的正常运行产生影响，感兴趣的同学可以进一步探索。
{: .prompt-info }