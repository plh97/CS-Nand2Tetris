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
    that: "THAT",
    pointer0: "THIS",
    pointer1: "THAT",
    temp0: "5",
    temp1: "6",
    temp2: "7",
    temp3: "8",
    temp4: "9",
    temp5: "10",
    temp6: "11",
    temp7: "12",
    static: "16"
  }
};

export default class CodeWriter {
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
        M=M-1
        A=M
        D=M
        @SP
        M=M-1
        A=M
        M=M${Map.opera[command]}D
        @SP
        M=M+1
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
      const rn = (Math.random() as any).toFixed(3) * 1000;
      return `
        @SP
        A=M-1
        D=M
        @SP
        M=M-1
        A=M-1
        D=M-D
        @GOTO_TRUE${rn}
        D;J${command.toUpperCase()}
        @GOTO_FALSE${rn}
        0;JMP
        (GOTO_TRUE${rn})
        @SP
        A=M-1
        M=-1
        @OUT${rn}
        0;JMP
        (GOTO_FALSE${rn})
        @SP
        A=M-1
        M=0
        (OUT${rn})
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
      | "pointer"
      | "point"
      | "temp",
    index: number
  ): string {
    // 将给定的Command 命令类型为C_PUSH , C_POP, 所对应的汇编代码写入至输出
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
        // push
        let loopString: string = "";
        for (; index > 0; index--) {
          loopString += `A=A+1\n`;
        }
        return `
          @${Map.segment[segment]}
          A=M
          ${loopString}
          D=M
          @SP
          A=M
          M=D
          @SP
          M=M+1
        `;
      }
      if (segment === "temp" || segment === "pointer") {
        // push , 去temp_index 中拿到对应的值然后push到堆栈中
        return `
          @${Map.segment[segment + index]}
          D=M
          @SP
          A=M
          M=D
          @SP
          M=M+1
        `;
      }
      if (segment === "static") {
        // push 从16 开始, 去拿static 的数据
        return `
          @${Number(Map.segment.static) + Number(index)}
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
      if (segment === "temp" || segment === "pointer") {
        // pop
        return `
          @SP
          A=M-1
          D=M
          @${Map.segment[segment + index]}
          M=D
          @SP
          M=M-1
        `;
      }
      if (
        segment === "local" ||
        segment === "argument" ||
        segment === "this" ||
        segment === "that"
      ) {
        // 将 栈顶推出到local.0中
        let loopString: string = "";
        for (; index > 0; index--) {
          loopString += `A=A+1\n`;
        }
        return `
          @SP
          A=M-1
          D=M
          @${Map.segment[segment]}
          A=M
          ${loopString}
          M=D
          @SP
          M=M-1
        `;
      }
      if (segment === "static") {
        // pop -- 从16 开始, 将当前栈顶数据push到static
        return `
          @SP
          A=M-1
          D=M
          @${Number(Map.segment.static) + Number(index)}
          M=D
          @SP
          M=M-1
        `;
      }
    }
  }
}
