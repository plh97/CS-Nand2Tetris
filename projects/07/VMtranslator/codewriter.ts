// 将VM命令翻译成Hack汇编代码.
// 用于将生成的Hack汇编代码写入相应的输出文件 .asm文件中

const Map = {
  opera: {
    add: "+",
    sub: "-",
    not: "!",
    neg: "-",
    and: "&",
    or: "|"
  },
  segment: {
    local: "LCL",
    argument: "ARG",
    this: "THIS",
    that: "THAT"
  }
};

export default class CodeWriter {
  setFileName(filename: string): void {
    // 通知代码写入程序.,新的VM文件翻译过程已经开始
  }

  writeArithmetic(
    command: "add" | "sub" | "or" | "and" | "neg" | "not" | "eq" | "lt" | "gt"
  ): string {
    // 将给定的算数操作所对应的汇编代码写至输出
    if (
      command === "add" ||
      command === "sub" ||
      command === "or" ||
      command === "and"
    ) {
      return `
        @SP
        A=M-1
        D=M
        @SP
        M=M-1
        A=M-1
        M=D${Map.opera[command]}M
      `;
    }
    if (command === "neg" || command === "not") {
      return `
        @SP
        A=M-1
        M=${Map.opera[command]}M
      `;
    }
    if (command === "eq" || command === "lt" || command === "gt") {
      const ramdomNumner = (Math.random() as any).toFixed(3) * 1000;
      return `
        @SP
        A=M-1
        D=M
        @SP
        M=M-1
        A=M-1
        D=D+M
        @SET_TRUE.${ramdomNumner}
        D;J${command.toUpperCase()}
        @SET_FALSE.${ramdomNumner}
        0;JMP
      (SET_TRUE.${ramdomNumner})
        @SP
        A=M-1
        M=1
      (SET_FALSE.${ramdomNumner})
        @SP
        A=M-1
        M=0
      `;
    }
  }

  writePushPop(
    Command: "C_PUSH" | "C_POP",
    segment:
      | "argument"
      | "constant"
      | "local"
      | "static"
      | "this"
      | "that"
      | "point"
      | "temp",
    index: number
  ): string {
    if (Command === "C_PUSH") {
      if (segment === "constant") {
        // 将 index 压入栈中 256-2047
        return `
          @${index}
          D=A
          @SP
          A=M
          M=D
          @SP
          M=M+1
        `;
      }
      if (
        segment === "that" ||
        segment === "this" ||
        segment === "local" ||
        segment === "argument"
      ) {
        return `
          @${Map.segment[segment]}
          A=A+${index}
          D=M
          @SP
          A=M
          M=D
          @SP
          M=M+1
        `;
      }
    }
    if (Command === "C_POP") {
      if (
        segment === "local" ||
        segment === "argument" ||
        segment === "this" ||
        segment === "that"
      ) {
        // 将 栈顶推出到local.0中
        return `
          @SP
          A=M-1
          D=A
          @${Map.segment[segment]}
          A=A+${index}
          M=D
        `;
      }
    }
    console.log(Command, segment, index);
    return "";

    // 将给定的Command 命令类型为C_PUSH , C_POP, 所对应的汇编代码写入至输出
  }

  close() {
    // 关闭输出文件
  }
}
