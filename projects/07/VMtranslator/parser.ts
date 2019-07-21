// Parser 模块

// 分析.vm文件.封装对输入代码的访问,它读取整个VM命令并解析,

export default class Parser {
  constructor() {
    // 输入问价你输入流
    // 打开输入文件,准备进行语法解析
  }

  hasMoreCommands(): any {
    // 输入当中还有更多命令吗
  }

  advance() {
    // 从输入中读取下一条命令,将其指定为`当前命令`,仅hasMoreCommands 返回true.才调用这个程序
  }

  commandType(): "C_ARITHMETIC"| "C_PUSH"| "C_POP"| "C_LABEL"| "C_GOTO"| "C_FUNCTION"| "C_RETURN"| "C_CALL"| "C_IF" {
    return "C_ARITHMETIC";
  }

  arg1(): string {
    // 返回当前命令的第一个参数,如果当前命令为 C_ARITHMETHIC , 则返回命令本身, 如 add , sub等, 
    return process.argv[2];
  }

  arg2(): string {
    // 返回当前命令的第一个参数,如果当前命令为 C_ARITHMETHIC , 则返回命令本身, 如 add , sub等, 
    return process.argv[3];
  }
}
