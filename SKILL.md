---
name: 桌面宠物生成器
description: 基于用户提供的 pet.json 和 spritesheet.webp 文件，一键初始化 Electron Mac 桌面宠物项目，包含完整的动画系统、控制面板、定时提醒等功能。
tags:
  - 桌面宠物
  - Electron
  - Mac
  - 动画
  - 定时提醒
version: 0.1.0
author: Trae SOLO
---

# 桌面宠物生成器 (desktop-pet)

基于用户提供的 `pet.json` 和 `spritesheet.webp` 文件，一键初始化 Electron Mac 桌面宠物项目。

## 功能特性

- **透明无边框窗口**：`transparent: true`, `frame: false`, `hasShadow: false`, `alwaysOnTop: true`
- **鼠标事件穿透**：空白区域点击穿透，宠物区域可交互
- **完整动画系统**：
  - 支持 8 种动作状态（idle/walk/run/wave/sit/sleep/happy/eat）
  - 智能帧数检测，避免读取空白帧
  - 非循环动画（如睡觉）播放到最后一帧后停留
  - 一次性动作（招手/开心/吃东西）播放完自动回到 idle
  - 方向翻转逻辑修正，避免倒退问题
- **控制面板**：
  - 可拖动图标展开/收起
  - 宠物大小调整（20%~150%，默认40%）
  - 动作切换下拉菜单
  - Claude Design Style 温暖优雅UI
- **定时提醒系统**：
  - 喝水提醒（15分钟）
  - 站立提醒（30分钟）
  - 气泡弹窗跟随桌宠移动
  - 需点击"知道了"按钮才消失
- **AI 自主行为**：70%概率发呆，智能状态切换，避免鬼畜

## 使用方法

### 1. 准备素材

用户需要提供两个文件：
- `pet.json`：宠物配置文件
- `spritesheet.webp`：精灵图（8列 x 9行）

### 2. 初始化项目

```bash
# Skill 会自动执行以下操作：
# 1. 检查 pet.json 和 spritesheet.webp 是否存在
# 2. 创建 Electron 项目结构
# 3. 生成 main.js、preload.js、package.json、index.html
# 4. 复制用户提供的素材到项目目录
```

### 3. 启动桌面宠物

```bash
cd /path/to/your/pet-project
npm install
npm start
```

## 项目结构

```
pet-project/
├── package.json       # Electron 项目配置
├── main.js            # 主进程入口
├── preload.js         # 预加载脚本
├── index.html         # 渲染页面（包含完整动画系统）
├── pet.json           # 用户提供的宠物配置
└── spritesheet.webp   # 用户提供的精灵图
```

## 精灵图规范

- 格式：WebP
- 布局：8列 x 9行
- 每帧大小相同
- 第0行：idle（闲置）
- 第1行：walk（行走）
- 第2行：run（奔跑）
- 第3行：wave（招手）
- 第4行：sit（坐下）
- 第5行：sleep（睡觉）
- 第6行：happy（开心）
- 第7行：eat（吃东西）

## 注意事项

- 项目仅支持 macOS 系统
- 需要 Node.js 环境
- Electron 版本 ^30.0.0
- 如遇沙盒问题，可使用 `npx electron . --no-sandbox` 启动

## 版本历史

- **v0.1.0** (2026-05-19): 初始版本，包含完整桌面宠物功能
