// 将VM命令翻译成Hack汇编代码.

export default class CodeWriter {
  constructor(){
    //
  }

  setFileName(filename: string): void{
    // 通知代码写入程序.,新的VM文件翻译过程已经开始
  }

  writeArithmetic(command:string): void{
    // 将给定的算数操作所对应的汇编代码写至输出
  }

  writePushPop(Command: 'C_PUSH'|'C_POP', segment: string, index: number): void {
    // 将给定的Command 命令类型为C_PUSH , C_POP, 所对应的汇编代码写入至输出
  }

  close(){
    // 关闭输出文件
  }
}