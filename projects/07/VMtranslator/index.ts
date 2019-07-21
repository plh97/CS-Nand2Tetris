import Parser from "./parser";
import CodeWriter from './codewriter'


const parser = new Parser();

// 用于将生成的hack汇编写入输出文件.asm中,
const codewriter = new CodeWriter()