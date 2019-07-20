# 汇编编译器

## 核心模块

- 主程序 index.js 用于驱动整个编译过程
- Parser 用于对文件进行语法分析
- Code 用来提供所有汇编命令所对应的二进制代码
- Symbol Table 用于处理符号

## 两个阶段

- 第一阶段,在编写汇编编译器来翻译无符号汇编程序,可通过 Parser 和 Code 模块来实现
- 第二阶段,将其扩展成具有符号处理的汇编编译器.

## 运行命令

```bash
# 去到当前目录
cd projects/06

# 开发模式运行的命令, 用于监听编译typescript
tsc assembler/index.ts  --watch

# 运行编译程序
# Add
nodemon ./assembler add/Add
nodemon ./assembler add/AddL

# Max
nodemon ./assembler max/Max
nodemon ./assembler max/MaxL

# Rect
nodemon ./assembler rect/Rect
nodemon ./assembler rect/RectL

# Pong
nodemon ./assembler pong/Pong
nodemon ./assembler pong/PongL
```
