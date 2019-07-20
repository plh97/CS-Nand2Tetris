"use strict";
exports.__esModule = true;
var parser_1 = require("./parser");
// import code from './code'
var symbolTable_1 = require("./symbolTable");
var fs = require("fs");
var fileName = process.argv[2];
var newFile = '';
var data = fs.readFileSync(fileName + ".asm", "utf-8");
var lines = data.split("\n");
lines = lines.map(function (line) { return parser_1["default"].clear(line); }).filter(function (e) { return e; });
var pc = 0;
// 第一轮预处理
// 该阶段主要是在符号表中简历每条命令以及其对应的地址,逐行处理整个汇编程序
// 构建符号表,每一行得用数字记录ROM地址,当命令最终被加载到地址中,这个数字从0开始
// 他就是PC计数器,他遇到注释行代码不自增,或者(XXX)这种 L-COMMAND 不自增,并且在符号表中将他们相关联
for (var pc_1 = 0; pc_1 < lines.length;) {
    var line = lines[pc_1];
    var type = parser_1["default"].commandType(line.trim());
    if (type === "L_COMMAND") {
        symbolTable_1["default"].addEntry(line.replace(/[\(\)]/g, ""), pc_1);
        lines.splice(pc_1, 1);
    }
    else {
        pc_1++;
    }
}
;
// 第二轮真正处理
// 现在对整个程序进行处理,对每一行进行语法树分析
// 每次遇到符号变化A-指令时候,就对@xxx分析他是不是符号,如果能在符号表中查询到,则替换,
// 如果查询不到,则他就代表变量.为了处理这个变量
lines.forEach(function (line) {
    line = parser_1["default"].advance(line);
    line && (newFile += line + "\r\n");
});
fs.writeFileSync(fileName + ".hack", newFile);
console.log(newFile);
