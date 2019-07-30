// Parser 模块

export default class Parser {
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
  
  commandType(line: string): "C_ARITHMETIC"| "C_PUSH"| "C_POP"| "C_LABEL"| "C_GOTO"| "C_FUNCTION"| "C_RETURN"| "C_CALL"| "C_IF" {
    if (line.indexOf('pop') > -1){
      return 'C_POP'
    }
    if (line.indexOf("push") > -1) {
      return "C_PUSH";
    }
    return "C_ARITHMETIC";
  }
}
