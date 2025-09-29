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
Continuing education;Three-dimensional displays;Chiplets;Computational modeling;Computer architecture;In-memory computing;Transformers;Energy efficiency;Thermal analysis;System analysis and design;Transformers;Memory-Centric Computing;Continual Learning;Heterogeneous Integration;Chiplets

- **Abstract**:
The design space for edge AI hardware supporting large language model (LLM) inference and continual learning is underexplored. We present 3D-CIMlet, a thermal-aware modeling and co-design framework for 2.5D/3D edge-LLM engines exploiting heterogeneous computing-in-memory (CIM) chiplets, adaptable for both inference and continual learning. We develop memory-reliability-aware chiplet mapping strategies for a case study of edge LLM system integrating RRAM, capacitor-less eDRAM, and hybrid chiplets in mixed technology nodes. Compared to 2 D baselines, 2.5D/3D designs improve energy efficiency by up to 9.3 x and 12 x, with up to 90.2% and 92.5% energy-delay product (EDP) reduction respectively, on edge LLM continual learning.

### 研究问题