// 语法分析器 parse 模块
// 用于对文件进行语法分析
// 将汇编命令分解成其所表达的内在含义

import code from "./code";
import symbolTable from "./symbolTable";

let varityIndex = 16;

// i  _  _  a  c1 c2 c3 c4 c5 c6 d1 d2 d3 j1 j2 j3
// 15 14 13 12 11 10 09 08 07 06 05 04 03 02 01 00
// c => command
// dest=comp;jump

export default class Parser {
  // 清除多余命令
  static clear(line: string) {
    return line.replace(/\/\/[\s\S]+/, "").trim(); // 清空注释后面的文字
  }

  // 当前命令 返回机器码
  static advance(line: string): string {
    const type = this.commandType(line);

    // @xxx 是符号, 或者 十进制数字
    if (type === "A_COMMAND") {
      line = line.replace(/@/, "");
      if (isNaN(Number(line)) && !symbolTable.contains(line)) {
        // 如果是符号表不包含的字符, 则,他就是变量
        symbolTable.addEntry(line, varityIndex);
        varityIndex++;
      }
      return this.symbol(line);
    }
    if (type === "C_COMMAND") {
      let dest = "0";
      let comp = line;
      let jump = "0";
      if (line.match(/=/)) {
        dest = line.split("=")[0];
        comp = line.split("=")[1];
      }
      if (line.match(/;/)) {
        [comp, jump] = comp.split(";");
      }
      return `111${this.comp(comp)}${this.dest(dest)}${this.jump(jump)}`;
    }
  }

  // ============== 命令类型 ===============
  static commandType(line: string): "A_COMMAND" | "L_COMMAND" | "C_COMMAND" {
    if (/@/.test(line)) {
      return "A_COMMAND";
    }
    // 伪命令 (xxx)
    if (/\([\w\W]+\)/.test(line)) {
      return "L_COMMAND";
    }
    // dest = comp;jump
    if (/[\w\d]+(\=[\w\d\+]+){0,1}/.test(line)) {
      return "C_COMMAND";
    }
  }

  // ============== 命令类型 ===============
  // A,L 命令时候调用
  static symbol(line: string): string {
    return symbolTable.getAddress(line);
  }

  // C 命令调用
  static dest(command: string): string {
    return code.dest(command);
  }
  // C 命令调用
  static comp(command: string): string {
    return code.comp(command);
  }
  // C 命令调用
  static jump(command: string): string {
    return code.jump(command);
  }
}
