// Parser 模块

// 分析.vm文件.封装对输入代码的访问,它读取整个VM命令并解析,

export default class Parser {
  // 输入问价你输入流
  // 打开输入文件,准备进行语法解析

  clear(line: string){
    return line.replace(/\/\/[\s\S]+/, '').trim();   // 清空注释后面的文字
  }

  hasMoreCommands(line: string): any {
    // 输入当中还有更多命令吗
    if (line){
      return true
    }
    return false
  }
  
  advance() {
    // 从输入中读取下一条命令,将其指定为`当前命令`,仅hasMoreCommands 返回true.才调用这个程序
  }
  
  commandType(line: string): "C_ARITHMETIC"| "C_PUSH"| "C_POP"| "C_LABEL"| "C_GOTO"| "C_FUNCTION"| "C_RETURN"| "C_CALL"| "C_IF" {
    if (line.indexOf('pop') > -1){
      return 'C_POP'
    }
    if (line.indexOf("push") > -1) {
      return "C_PUSH";
    }
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
