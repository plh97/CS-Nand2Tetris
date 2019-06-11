# nand2tetris

计算机系统要素-从零开始构建现代计算机 项目

![封面](https://github.com/ytzys/nand2tetris/blob/master/1.jpg)

建议和[<<深入理解计算机系统>>](https://github.com/pengliheng/cs-app3e)这本一起看, 一本自下而上讲述计算机,另一本自上而下讲述计算机.都是非常经典的书籍.

## 关键术语中英文对照表

| 英文术语        | 翻译         |
| --------------- | ------------ |
| allocation      | 内存分配     |
| assembly        | 汇编         |
| class           | 类           |
| class type      | "类"类型     |
| compiler        | 编译器       |
| constant        | 常量         |
| constructor     | 构造函数     |
| de-allocation   | 内存去配     |
| dispose         | 清除         |
| field           | 域;字段      |
| identifier      | 标识符       |
| invoke          | 唤起(执行)   |
| object-oriented | 面向对象     |
| object-base     | 面向基类     |
| object instance | 对象实例     |
| parse/parsing   | (语法)分析   |
| parser          | (语法)分析器 |
| parser talbe    | (语法)分析表 |
| parser tree     | (语法)分析树 |
| pointer         | 指针         |
| procedure       | 过程         |
| procedural      | 过程化       |
| reference       | 引用         |
| subroutine      | 子程序       |
| symbol          | 符号         |
| syntax          | 语法         |
| syntax tree     | 语法树       |
| syntax analysis | 语法分析     |
| syntax analyzer | 语法分析器   |
| token           | 字元         |
| tokenize        | 字元化       |
| tokenizer       | 字元转化器   |
| type conversion | 类型转换     |
| variable        | 变量         |

## 本书涵盖的主题

- **硬件**: 逻辑门;布尔运算;multiplexor(多路复用器);触发器(flip-flop);寄存器(register);RAM 单元;计数器;硬件描述语言(HDL,Hardware Description Language);芯片的仿真及测试.

- **体系架构**: ALU/CPU 的设计与实现;机器代码;汇编语言程序设计;取址模式;I/O 内存印象.

- **操作系统**: 内存管理;数学计算程序库;基本 I/O 驱动程序;屏幕管理;文件 I/O;对高级语言的支持

- **程序设计语言**: 基于对象(object-base)的设计和编程模式;抽象数据类型;作用域;语法和语义;引用(reference)机制.

- **编译器**: 词法分析: 自顶向下的语法分析;符号表(symbol table); 基于堆栈(stack-based)的虚拟机;代码生成: 数组和对象的实现.

- **数据结构和算法**: 堆栈;哈希表;链表;递归;算术算法;几何算法;运行效率.

- **软件工程**: 模块化设计;接口/实现范式;API 设计和文档;自动式测试;广义的程序概念设计;质量保证体系.

## 计算机构造层

- 典型的软件阶层体系
  - 高层语言
  - 操作系统
  - 编译器
  - 虚拟机
  - 汇编编译器
  - 机器语言
- 典型的硬件阶层体系
  - 机器语言
  - 计算机体系结构
  - ALU | 记忆(储存)元素
  - 布尔算数 | 时序逻辑
  - 布尔逻辑
