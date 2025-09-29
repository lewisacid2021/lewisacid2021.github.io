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

该篇论文聚焦边缘 AI 硬件设计的创新方向，核心是解决大语言模型（LLM）在边缘设备上的推理与持续学习需求，以下从核心问题、方案、关键设计、性能优势四方面简要解析：
1. 核心问题：现有技术的空白
当前支持 LLM 推理与持续学习的边缘 AI 硬件设计空间未被充分探索—— 边缘设备（如手机、物联网设备）受限于体积、功耗，难以高效承载 LLM 这类计算 / 存储密集型任务，而传统 2D 硬件架构在能效、延迟上已无法满足需求。
2. 核心方案：3D-CIMlet 框架
提出3D-CIMlet，这是一个面向 “2.5D/3D 异构集成边缘 LLM 引擎” 的设计框架，核心特点有二：
    - 热感知（thermal-aware）：考虑 3D 集成硬件易产生的散热问题，避免高温影响性能；
    - 协同设计（co-design）：基于 “计算存内（CIM）小芯片（chiplet）” 技术，且能灵活适配 LLM 的推理和持续学习两种场景（持续学习指模型在边缘设备上可不断学习新数据，无需回传云端）。
3. 关键设计：存储可靠性与异构集成
以一个 “边缘 LLM 系统” 为案例，重点突破两点：
    - 存储可靠性感知的小芯片映射策略：系统集成了三种异构存储 / 计算单元 ——RRAM（阻变存储器，适合高密度存储与 CIM）、无电容 eDRAM（高速缓存，适合高频数据交互）、混合小芯片，且采用不同工艺节点；设计时需考虑这些单元的可靠性差异，合理分配 LLM 的计算 / 存储任务到不同小芯片，避免存储错误影响模型性能。
    - 2.5D/3D 架构：区别于传统 2D 平面布局，通过 2.5D（中介层连接）或 3D（垂直堆叠）方式集成小芯片，大幅缩短数据传输路径，提升效率。
4. 性能优势：碾压 2D 基线方案
对比传统 2D 架构，在边缘 LLM 的持续学习场景下：
    - 2.5D 设计：能效提升最高 9.3 倍，“能量延迟积（EDP，衡量能效与延迟的综合指标）” 降低最高 90.2%；
    - 3D 设计：能效提升最高 12 倍，EDP 降低最高 92.5%—— 充分证明 2.5D/3D 异构 CIM 架构在边缘 LLM 硬件上的可行性与优势。

热感知和存算一体的实现方式?

协同设计流程

不清楚是否流片，能效比如何测得?
