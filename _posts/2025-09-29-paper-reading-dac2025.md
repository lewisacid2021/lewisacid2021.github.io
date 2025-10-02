---
title: My Reading Notes on the Most Influential DAC 2025 Papers
author: lewisacid2021
date: 2025-09-29 14:20:00 +0800
categories: [Blogging,DAC2025,PaperReading]
tags: [PaperReading]
description: >-
    A concise note on the top-cited DAC 2025 works: key insights, methodological advances, and implications for future research in electronic design automation.
image:
  path: /assets/img/posts/dac2025.png
  lqip: /assets/img/posts/dac2025.png
  alt: 2025 62nd ACM/IEEE Design Automation Conference (DAC) 22-25 June 2025
---

# 前言

- DAC（Design Automation Conference） 作为电子设计自动化（EDA）领域最具影响力的国际会议之一，每年都会汇集众多来自学术界与工业界的前沿成果。相比于逐篇盲读，我这次选择从 DAC 2025 被引次数最多的几篇论文 入手，因为它们往往代表了当前最受关注的研究方向，也更容易看出领域的发展趋势。

- 这篇博客将以“阅读笔记”的形式，对这些高被引论文进行简要整理：概述它们所解决的问题、主要方法和贡献，并结合我的理解谈谈可能的启发和不足。希望能为自己理清思路，也给对 EDA 感兴趣的同学提供一些参考。


# 整体趋势


# 论文阅读


## 3D-CIMlet: A Chiplet Co-Design Framework for  Heterogeneous In-Memory Acceleration of Edge  LLM Inference and Continual Learning

> S. Du et al., "3D-CIMlet: A Chiplet Co-Design Framework for Heterogeneous In-Memory Acceleration of Edge LLM Inference and Continual Learning," 2025 62nd ACM/IEEE Design Automation Conference (DAC), San Francisco, CA, USA, 2025, pp. 1-7, doi: 10.1109/DAC63849.2025.11133077. 

- **keywords**: 
Transformers, Memory-Centric Computing, Continual Learning, Heterogeneous Integration, Chiplets

- **Abstract**:
The design space for edge AI hardware supporting large language model (LLM) inference and continual learning is underexplored. We present 3D-CIMlet, a thermal-aware modeling and co-design framework for 2.5D/3D edge-LLM engines exploiting heterogeneous computing-in-memory (CIM) chiplets, adaptable for both inference and continual learning. We develop memory-reliability-aware chiplet mapping strategies for a case study of edge LLM system integrating RRAM, capacitor-less eDRAM, and hybrid chiplets in mixed technology nodes. Compared to 2 D baselines, 2.5D/3D designs improve energy efficiency by up to 9.3 x and 12 x, with up to 90.2% and 92.5% energy-delay product (EDP) reduction respectively, on edge LLM continual learning.

### 研究问题

该篇论文聚焦边缘 AI 硬件设计的创新方向，核心是解决大语言模型（LLM）在边缘设备上的推理与持续学习需求：
1. 核心问题：现有技术的空白
当前支持 LLM 推理与持续学习的边缘 AI 硬件设计空间未被充分探索—— 边缘设备（如手机、物联网设备）受限于体积、功耗，难以高效承载 LLM 这类计算 / 存储密集型任务，而传统 2D 硬件架构在能效、延迟上已无法满足需求。
2. 核心方案：3D-CIMlet 框架
提出3D-CIMlet，这是一个面向 “2.5D/3D 异构集成边缘 LLM 引擎” 的设计框架，核心特点有二：
    - 热感知（thermal-aware）：考虑 3D 集成硬件易产生的散热问题，避免高温影响性能；
    - 协同设计（co-design）：基于 “计算存内（CIM）芯粒（chiplet）” 技术，且能灵活适配 LLM 的推理和持续学习两种场景。
3. 关键设计：存储可靠性与异构集成
以一个 “边缘 LLM 系统” 为案例，重点突破两点：
    - 存储可靠性感知的小芯片映射策略：系统集成了三种异构存储 / 计算单元 ——RRAM（阻变存储器，适合高密度存储与 CIM）、无电容 eDRAM（高速缓存，适合高频数据交互）、混合小芯片，且采用不同工艺节点；设计时需考虑这些单元的可靠性差异，合理分配 LLM 的计算 / 存储任务到不同小芯片，避免存储错误影响模型性能。
    - 2.5D/3D 架构：区别于传统 2D 平面布局，通过2.5D或3D方式集成小芯片，大幅缩短数据传输路径，提升效率。
4. 性能优势：碾压 2D 基线方案
对比传统 2D 架构，在边缘 LLM 的持续学习场景下：
    - 2.5D 设计：能效提升最高 9.3 倍，EDP降低最高 90.2%；
    - 3D 设计：能效提升最高 12 倍，EDP 降低最高 92.5%—— 充分证明 2.5D/3D 异构 CIM 架构在边缘 LLM 硬件上的可行性与优势。


### Contribution
> 基于原文介绍:

1. 研发了 3D-CIMlet 这一建模与协同设计框架，能助力针对 Transformer 的 2.5D/3D 芯粒加速器架构快速进行设计空间探索，并利用了异构存储技术。
2. 基于 3D-CIMlet，开发出具有 2.5D 和 3D 集成方案的异构 RRAM/eDRAM 存算一体（CIM）系统，以及相应的可靠性感知映射策略，以支持边缘大语言模型（LLMs）的高效推理和持续学习。
3. 通过从芯粒到封装的多尺度设计空间探索（DSE），提供了跨存算一体芯粒设计（芯粒内和芯粒间）、成本感知与热感知系统集成以及持续运行时优化的协同优化指南。

> 主要工作是2.5D/3D异构集成的存算一体系统设计、感知映射策略实现；
其他诸如成本感知、热感知到DSE，并不算是核心工作，但也足够充实；
{: .prompt-tip }

### Methodology


![img-description](/assets/img/posts/dac_3d-cimlet_overview.png)

> Overview of 3D-CIMlet, a 2.5D/3D chiplet-based modeling and co-design framework for edge LLM inference and continual learning.

>论文选题还是要蹭热点的，边缘LLM、2.5D/3D多芯粒、CIM都是热点中的热点，即使工作没有多么突出，看个标题就accepted的概率就很大
{: .prompt-tip }

#### 研究范围
该工作并非泛化的 3D-CIMlet 设计，而是以 **“异构架构中的异构计算存储器” 为案例研究核心**，即重点验证不同类型计算存储器在异构硬件架构中的应用可行性。
#### 硬件架构设计
围绕上述研究范围，团队构建了适配边缘端大语言模型（LLM）的硬件系统，核心是将三类计算存储器设计为 “模块化 CIM 基本单元（primitives）”，覆盖**芯片级与系统级**：
- 存储类型：阻变存储器（RRAM）、无电容嵌入式 DRAM（eDRAM）、RRAM/eDRAM 混合存储；
- 连接与路由：通过 “封装级网络（NoP）” 和 “片上网络（NoC）” 的层级结构，实现 CIM 处理引擎（PE）的 D2D 互连与数据路由，确保不同模块间的通信。

#### 核心组件分级
系统硬件按 “芯片（chiplet）- 处理引擎（PE）” 两级拆解，各层级组件功能明确：
- CIM 芯片级：每个芯片包含 CIM 处理引擎（负责核心计算）、全局缓冲器（数据暂存）、累加器（计算结果汇总）、NoP 驱动器（实现芯片间通信）；
- CIM 处理引擎级：每个 PE 是最小计算单元，包含 CIM 子阵列（核心计算部件，支持电荷型 / 非电荷型计算）、softmax 单元（神经网络激活函数计算）、累加器、缓冲器、NoC 驱动器（实现芯片内 PE 间通信）。

> NoP和NoC的建模使用的是定制的BookSim
{: .prompt-tip }

#### 探索维度

##### 芯粒内设计探索

框架先将输入的模型层（如 AI 模型的计算层）拆分为静态操作（逻辑 / 计算流程相对固定的任务）和动态操作（数据或流程会动态变化的任务），再结合两类关键内存的特性做优化：

涉及的内存类型：一类是传统内存，另一类是 NVM（如文中案例的 RRAM、eDRAM），且这些内存的特性在不同芯粒间存在差异。

此外，芯片粒内还会 **周期精确地模拟NoC**，重点关注 “PE间的数据流” 和 “路由器架构”，并基于 “RC特性” 和 “最小金属间距” 来估算功耗与面积。

##### 芯粒间设计探索

核心是解决 “如何将模型任务分配到不同芯片粒”，并围绕NoP展开分析。

NoP 的模拟维度：考虑 “Die to Die的数据流” 和 “通信流量模式”，覆盖 2D/2.5D 网格、3D 堆叠等主流芯粒集成方案。

功耗与面积估算：进一步结合具体互连硬件 ——2D/2.5D 的数据链路、3D 的 TSV（硅通孔，3D 堆叠的核心互连技术）来建模，确保估算贴合实际硬件架构。

#### 芯粒到封装热建模

- 核心分析方法：**有限元法（FEM）**

> FEM 是一种工程数值模拟技术，能将复杂的 2.5D/3D 集成结构（由多个芯片、中介层等组成）拆解为无数 “小单元”，通过计算每个单元的热行为（如热传导、热对流），最终整合得到整体的热分布、散热效率等关键特性，是分析复杂电子封装热问题的常用手段。
{: .prompt-info }

为模拟热行为，对集成结构做了合理简化与定义：
- 热源与载体：将芯片的 “前段工艺（FEOL）”（即芯片内部核心电路制造环节，是主要产热区）简化为 “面热源”；所有小芯片（chiplets）均搭载在100μm 厚的硅中介层上（硅中介层是 2.5D/3D 集成中连接芯片与基板的关键部件，影响热传导路径）。
- 结构与热隔离：芯片通过 “机械加固” 保证物理稳定性，同时用绝热模塑料封装——“绝热” 特性意味着该材料导热性极低，可减少芯片向外部非目标区域的散热损耗，聚焦分析核心传热路径。
- 热边界条件：对流换热系数
设定了两个关键表面的 “热 transfer 系数（反映表面与周围环境的热交换能力）”，对应实际散热场景：
    1. 硅芯片顶部：1000 W/(m²・K)—— 数值较高，对应 “中度强制对流冷却”（如风扇主动吹风），是芯片主要散热通道；
    2. 有机基板底部：20 W/(m²・K)—— 数值极低，说明底部散热能力弱（可能是自然对流或与低热导材料接触），符合多数电子封装 “顶部主动散热、底部被动散热” 的实际设计。

> 个人对于热建模不太熟悉，但是该项目明显做出了简化，不是工作核心
{: .prompt-tip }

### CHIPLET MAPPING STRATEGIES

![img-description](/assets/img/posts/dac_3d-cimlet_llm_sys.png)

> A reliability-aware mapping strategy for the heterogeneous multi-chiplet edge LLM system. 

- 采用动态分配机制：根据推理任务和持续学习任务的实时需求，灵活调配硬件资源，避免资源闲置，提升系统整体效率。

- 核心硬件组件（芯粒）
提供 3 类模块化、可复用的芯粒作为基础组件，支撑边缘 LLM 引擎的核心功能：
40nm RRAM 芯粒、40nm RRAM/eDRAM 芯粒、14nm eDRAM 芯粒；
- 核心作用：分别负责矩阵向量乘法（MVM）运算映射（AI 任务的核心计算）和片上数据存储，为 LLM 的高效运行提供硬件基础。

Transformer 推理时，仅注意力层中 K（键）、Q（查询）、V（值）之间的**动态矩阵乘（MVM）操作会随输入变化**；其余所有权重（包括预训练主干网络的权重，如 K/Q/V 投影层、前馈层权重，以及训练后的适配器层权重）均为静态权重—— 即无论输入激活如何变化，这些权重值始终固定。

文中将**静态权重分配给40nm RRAM**（阻变存储器）计算引擎（CIM） 处理（对应上图 标注①和③）。
- 选择 RRAM 的核心原因是其 “计算存储一体化（CIM）” 特性：可直接在存储单元内完成矩阵乘运算，避免传统架构中 “数据搬运” 的延迟与能耗；且静态权重无需频繁更新，能适配 RRAM 的存储特性。

**随输入变化的动态注意力激活（标注②） 则分配给40nm eDRAM**（增强型动态随机存取存储器）CIM 引擎。
- 此处的trade-off在于：eDRAM 无 RRAM 的 “耐久性限制”（RRAM 反复读写易导致性能衰减），适合处理需频繁更新的动态数据；但代价是 eDRAM“ retention time（数据保持时间）短”—— 需定期刷新数据以避免丢失，会带来额外能耗或延迟。

除了以上负责加速推理的RRAM/eDRAM芯粒组，还有负责持续学习的用14nm eDRAM和40nm的RRAM芯粒。

持续学习的核心是 **“在推理硬件上动态更新部分权重”**，系统通过三步实现：
- 前向传播（FP）：复用推理用的芯粒执行，但区别于纯推理 —— 持续学习的 “适配器权重”（adapter weights）是可学习的（非固定），这是持续学习的标志性设计；
- 反向传播（BP）：规避 RRAM“写入 endurance（耐久性）差” 的缺陷 —— 先将可学习权重从 RRAM 计算引擎③加载到 eDRAM 计算引擎④，再在两类芯粒间分配 BP 运算；
- 梯度计算与存储：反向传播的误差需结合 “转置适配器权重” 和 “转置前向输出激活值” 计算权重梯度，这一步放在高耐久性的 eDRAM 计算引擎 ⑤ 中执行，而静态权重的转置数据则存在高保持性的 RRAM 计算引擎 ⑥ 中，兼顾性能与硬件寿命。

相比基于高带宽内存（HBM）的设计，14nm eDRAM 芯粒支持与 “处理器单元” 进行片上集成：处理器可直接协调将生成的权重梯度存储到 eDRAM 芯粒 ⑦ 中，且梯度会暂存至下一轮前向传播（FP）时，供 eDRAM 计算引擎 ④ 更新权重，减少了片外数据交互，提升效率。

> 不太懂Transformer和LLM背景，欢迎大家一起交流补充
{: .prompt-tip }

### DSE/实验

#### 边缘LLM推理

##### 评估的两大核心维度
明确了评估模型时重点关注的差异点，这些差异直接影响模型在边缘设备上的推理适配性：
- 输入模态差异：分为文本和图像，二者需要不同的 “嵌入策略”（将原始数据转化为模型可处理的向量形式）。
    - 文本模型（如语言模型）：依赖 “嵌入表”（embedding tables）实现数据向量化；
    - 图像模型（如视觉模型）：常依赖 “卷积层”（convolutional layers）完成嵌入，实验中也为视觉 Transformer（Vision Transformer）配置了基于卷积的嵌入层，以贴合这一特性。
- Transformer 架构差异：对比 “仅编码器（encoder-only）” 和 “仅解码器（decoder-only）” 两种主流架构，核心差异在计算方式：
    - 仅解码器模型（如 GPT 类）：因 “自回归” 特性（需逐 token 生成），一次处理一个查询，以 “向量 - 矩阵计算” 为主；
    - 仅编码器模型（如 BERT 类）：无自回归约束，以 “矩阵 - 矩阵乘法” 为主要计算形式。

##### 具体评估的模型与实验设置
基于上述差异，选取了 3 类代表性模型，在对应数据集上开展实验（明确输入长度 / 数据类型，确保评估针对性）：

| Model      | Type                  | Dataset     | Sequence Length / Tokens |
|:----------:|:----------------------|:-----------:|:------------------------:|
| BERT-base  | Encoder-only (text)   | GLUE        | 128 tokens (avg)         |
| GPT-2      | Decoder-only (text)   | Wikitext-2  | 128 tokens / 1024 tokens |
| DeiT-base  | Encoder-only (image)  | ImageNet    | 196 tokens               |

##### 实验结果
作者通过两组设计空间探索（DSE）分析展示了 3D-CIMlet 在推理中的优势。

1. 不同芯粒配置下的性能与能效对比：


![img-description](/assets/img/posts/dac_3d-cimlet_result1.png)


在 BERT、GPT-2 和 DeiT 等 Transformer 推理任务中，采用 异构芯粒设计（同时包含 RRAM 与 eDRAM），相比仅使用 NVM 或电荷型存储的设计，性能最高提升 3.9 倍和 2.6 倍，能效提升 1.4 倍和超过 104 倍。

2. RRAM 与 eDRAM 容量比的影响：

![img-description](/assets/img/posts/dac_3d-cimlet_result2.png)

在 40nm RRAM/eDRAM 芯粒中，RRAM:eDRAM 容量比是关键设计参数。

随着该比值的增加：

- NoC 的能耗和延迟逐渐升高；

- NoP 的能耗和延迟逐渐降低。

结果表明，当容量比为 4 时，NoC 与 NoP 的通信开销达到最佳平衡。

#### 边缘LLM持续学习

##### 评估方式

实验对象是Adapter-BERT（带适配层的 BERT 模型），用于持续学习任务，评估分两种模型 + 数据集配置，核心差异在模型规模和输入序列长度：

- 配置 1：BERT-base（12 层编码器、12 个注意力头），基于 GLUE 数据集，输入平均 128 个 token；
- 配置 2：BERT-small（4 层编码器、4 个注意力头），输入平均 32 个 token（模型更小、输入更短，复杂度更低）。

##### 持续学习中的 “动态权重” 与数据 retention time（保留时间）
持续学习过程中，模型训练的 “前向传播（FP）” 与 “反向传播（BP）” 存在特殊数据关联，且数据需在芯片中临时存储，其保留时间受多因素影响：

> 核心概念：BPDW（反向传播动态权重）
FP 过程中各层的输出激活值，会在后续 BP 过程中充当 “动态权重”，与可学习的 “适配层权重” 共同参与参数更新。
{: .prompt-info }

- BPDW 的保留时间：
因 eDRAM 需定期 “刷新” 以维持数据，BPDW 的保留时间会随其所在 “编码器 / 解码器模块的层位置” 变化（不同层的计算时序、数据依赖不同，需存储的时长不同）。

- 权重梯度的保留时间：
权重梯度（更新参数需用的梯度数据）在 “下一次 FP 迭代前” 的保留时间，取决于两个因素：
- 学习模式（串行 / 并行）；
- 批处理大小（batch size）。
##### 两种学习模式对比与 3D-CIMlet 的存储优化
（1）串行 vs 并行学习模式
| 学习模式   | 核心逻辑                                   | 权衡（trade-off）                           |
|:----------:|:------------------------------------------|:-------------------------------------------|
| 串行学习   | 单次迭代中，输入样本的层计算无重叠         | 权重梯度保留时间更长，但系统功耗可能更低     |
| 并行学习   | 多输入样本在多层中同时 “流水式” 计算       | 计算效率更高，但对数据存储的实时性要求更高   |


（2）3D-CIMlet 的存储优化手段
通过DSE（设计空间探索） 统筹芯片级 BP 数据存储，聚焦两个方向：
- 针对 BPDW 存储：探索并优化 “多技术节点 eDRAM 芯粒” 中 “eDRAM 与 SRAM 缓冲器的容量比”（平衡存储容量与访问速度）；
- 针对权重梯度存储：优化 “RRAM（阻变存储器）与 eDRAM 芯粒” 之间的片上存储分配（结合两种存储器的低功耗、高容量特性）。

##### 实验结果

本文的设计空间探索（DSE）揭示了存储策略和封装架构对能效的显著影响：

###### 1.SRAM/eDRAM 混合存储策略：

![img-description](/assets/img/posts/dac_3d-cimlet_result3.png)


- 小规模模型（如 BERT-small）：在先进工艺节点（14/16nm），缩小 SRAM 缓冲可降低能耗。

- 大规模模型（如 BERT-base）：增大 eDRAM/SRAM 容量比会因 eDRAM 高刷新能耗而导致能效恶化；因此需要增大 SRAM 缓冲。

先进节点 eDRAM 适合小规模持续学习；大规模持续学习应增加 SRAM 缓冲，并依赖 eDRAM 的高密度优势平衡面积开销。

###### 2.梯度存储模式：

![img-description](/assets/img/posts/dac_3d-cimlet_result4.png)


- 串行模式：小批次训练适合 eDRAM；大批次下，eDRAM 刷新能耗过高，应转向 RRAM，尤其在 2.5D/3D 封装下更具优势。

- 并行模式：由于梯度保留时间要求宽松，eDRAM 在各种批次和集成方案下均为最佳选择。

###### 3.更广泛的推理与持续学习场景（跨芯粒堆叠架构）：

a）推理任务：

![img-description](/assets/img/posts/dac_3d-cimlet_result5.png)

2.5D/3D 架构显著优于传统 2D，BERT-base 和 DeiT-base 的能效提升分别达到 9.9× 和 4.5×（主要受益于 D2D 通信开销降低，分别占 90.8% 和 78.3% 能量）。

GPT-2 因自回归生成，通信成本较低（NoP 仅占 8.7%），因此提升有限（仅 1.1×）。

b）持续学习任务：

![img-description](/assets/img/posts/dac_3d-cimlet_result6.png)

2.5D 和 3D 堆叠带来 9.3× 和 12.0× 的能效提升，EDP 分别降低 90.2% 和 92.5%。

但在 40nm RRAM/eDRAM 芯粒条件下，推理改进有限；在微调（fine-tuning）场景下，片上计算增加抵消了通信优化，提升幅度减小。

>本文DSE相关实验足够充分，从边缘LLM推理和持续学习的任务出发，探究了2种异构内存芯粒、不同工艺组合的效果和2.5D/3D封装的下的能效影响
{: .prompt-tip }

#### 热分析

![img-description](/assets/img/posts/dac_3d-cimlet_result7.png)

在 边缘 LLM 持续学习 场景下，芯粒到封装的热分析揭示了 2.5D/3D 封装的关键热挑战与取舍：

- 温度分布不均：不同芯粒的功率差异导致明显的非均匀温度分布。

- 2.5D 封装：Tmax≈29.3 K，∆T≈12.2 K，整体热应力适中，但 14nm eDRAM 芯粒因功率密度高和散热受限而形成持久热点。

- 3D 封装：热阻更高、散热更低效，导致最严重的热应力，需额外冷却措施。

- 存储分布影响：3D 芯粒中 RRAM/eDRAM 宏的分配与封装结构共同决定峰值温度分布，其中 eDRAM 相对更冷，有助于减轻刷新保持压力。

2.5D 设计在温度均匀性上优于 3D，但仍面临局部热点问题，同时牺牲了系统级计算密度。

### 总结

#### 论文质量评价

##### 优点：

**选题新颖且前沿**：针对 edge LLM inference 与 continual learning 的硬件支持，这在边缘智能和大模型部署中是非常前沿的方向。

**方法完整**：提出了 3D-CIMlet 框架，涵盖架构、存储映射、NoC/NoP 通信优化、热分析等多方面的设计空间探索，体现了一个较为系统的 co-design 思路。

**实验全面**：对比了 BERT、GPT-2、DeiT 等不同结构的 Transformer，既覆盖 NLP 又覆盖 CV，验证了框架的普适性。

**定量分析到位**：能效提升（最高 12×）、EDP 降低（90%+）、热特性建模等都有比较明确的数据支撑，而不仅仅是概念性讨论。

**结合工艺现实**：不仅讨论 2.5D/3D 封装，还考虑 40nm RRAM、14/16nm eDRAM 等“成本可行”的节点，而非仅停留在理想假设。

##### 不足或局限性：

**缺乏真实芯片实现**：目前停留在建模与仿真层面，没有流片或 FPGA/ASIC 原型，可能限制了结论的落地性。

热分析偏简化（不是重点）：尽管有 FEM 热建模，但对动态工作负载下的温度波动、散热器设计、冷却解决方案等讨论不够深入。

#### 对发EDA领域论文的帮助

##### 研究思路启发：

它是一个 “framework + case study” 型论文，不是仅提出一个电路，而是搭了一个 设计空间探索框架，这对EDA论文写作很有借鉴意义。

我们也可以在自己的工作里强调“工具链 + 设计空间探索”，而不仅仅是算法或电路点优化。

##### 跨层 co-design 案例：

论文横跨 电路级（SRAM/eDRAM/RRAM）—架构级（NoC/NoP）—封装级（2.5D/3D）—系统级（LLM workload）—热分析，很符合EDA“多层次协同优化”的趋势。

EDA方向的论文，可以学习这种 跨层次建模 + 联合优化 的组织方式。

##### 实验展示风格：

它的数据展示非常清晰：能效提升、EDP、热分布图、不同模型对比。

写论文时要强调“定量结果 + 可视化 + trade-off 分析”，而不是停留在定性描述。

##### 选题相关性：

EDA方向，特别是涉及 3DIC设计、Chiplet集成、热建模、存储架构优化，这篇论文能提供非常好的参考文献和研究方向切入点。

它也说明了 EDA 研究中 chiplet-aware, memory-aware, thermal-aware 工具的潜力。