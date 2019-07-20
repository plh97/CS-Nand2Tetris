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

### ALU 逻辑计算单元

```vdhl
CHIP ALU {
    IN
        x[16], y[16],  // 16-bit inputs
        zx, // zero the x input?
        nx, // negate the x input?
        zy, // zero the y input?
        ny, // negate the y input?
        f,  // compute out = x + y (if 1) or x & y (if 0)
        no; // negate the out output?

    OUT
        out[16], // 16-bit output
        zr, // 1 if (out == 0), 0 otherwise
        ng; // 1 if (out < 0),  0 otherwise

    PARTS:
    Mux16(a=x, b=false, sel=zx, out=xx);
    Mux16(a=y, b=false, sel=zy, out=yy);

    Not16(in=xx, out=xxx);
    Mux16(a=xx, b=xxx, sel=nx, out=xxxx);
    Not16(in=yy, out=yyy);
    Mux16(a=yy, b=yyy, sel=ny, out=yyyy);

    Add16(a=xxxx, b=yyyy, out=xplusy);
    And16(a=xxxx, b=yyyy, out=xandy);
    Mux16(a=xandy, b=xplusy, sel=f, out=oo);

    Not16(in=oo, out=notoo);
    Mux16(a=oo, b=notoo, sel=no, out[15]=ng, out[0..7]=part1, out[8..15]=part2, out=out);

    Not(in=notzero, out=zr);
    Or(a=or1, b=or2, out=notzero);
    Or8Way(in=part1, out=or1);
    Or8Way(in=part2, out=or2);
}
```

### 冯诺依曼结构体系

非常建议先读一下冯诺依曼结构体系论述,这毕竟是整个计算机结构的基石啊

美籍匈牙利数学家冯·诺伊曼于 1946 年提出存储程序原理，把程序本身当作数据来对待，程序和该程序处理的数据用同样的方式储存。 冯·诺伊曼体系结构冯·诺伊曼理论的要点是：计算机的数制采用二进制；计算机应该按照程序顺序执行。人们把冯·诺伊曼的这个理论称为冯·诺伊曼体系结构。

PC 程序计数器自增指向下一个地址,把程序当做二进制数据来对待.

从 EDVAC 到当前最先进的计算机都采用的是冯·诺伊曼体系结构。所以冯·诺伊曼是当之无愧的数字计算机之父。

### 体系结构编辑

1. 采用存储程序方式，指令和数据不加区别混合存储在同一个存储器中，数据和程序在内存中是没有区别的,它们都是内存中的数据,当 EIP 指针指向哪 CPU 就加载那段内存中的数据,如果是不正确的指令格式,CPU 就会发生错误中断. 在现在 CPU 的保护模式中,每个内存段都有其描述符,这个描述符记录着这个内存段的访问权限(可读,可写,可执行).这就变相的指定了哪些内存中存储的是指令哪些是数据）, 指令和数据都可以送到运算器进行运算，即由指令组成的程序是可以修改的。
2. 存储器是按地址访问的线性编址的一维结构，每个单元的位数是固定的。
3. 指令由操作码和地址组成。操作码指明本指令的操作类型,地址码指明操作数和地址。操作数本身无数据类型的标志，它的数据类型由操作码确定。
4. 通过执行指令直接发出控制信号控制计算机的操作。指令在存储器中按其执行顺序存放，由指令计数器指明要执行的指令所在的单元地址。指令计数器只有一个，一般按顺序递增，但执行顺序可按运算结果或当时的外界条件而改变。
5. 以运算器为中心，I/O 设备与存储器间的数据传送都要经过运算器。
6. 数据以二进制表示。

### Reference

[冯·诺依曼体系结构-百度百科](https://baike.baidu.com/item/%E5%86%AF%C2%B7%E8%AF%BA%E4%BE%9D%E6%9B%BC%E4%BD%93%E7%B3%BB%E7%BB%93%E6%9E%84/4690854?fromtitle=%E5%86%AF%E8%AF%BA%E4%BE%9D%E6%9B%BC%E4%BD%93%E7%B3%BB%E7%BB%93%E6%9E%84&fromid=213926)
