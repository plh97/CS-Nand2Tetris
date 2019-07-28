"use strict";
// Parser 模块
exports.__esModule = true;
// 分析.vm文件.封装对输入代码的访问,它读取整个VM命令并解析,
var Parser = /** @class */ (function () {
    function Parser() {
    }
    // 输入问价你输入流
    // 打开输入文件,准备进行语法解析
    Parser.prototype.clear = function (line) {
        return line.replace(/\/\/[\s\S]+/, '').trim(); // 清空注释后面的文字
    };
    Parser.prototype.hasMoreCommands = function (line) {
        // 输入当中还有更多命令吗
        if (line) {
            return true;
        }
        return false;
    };
    Parser.prototype.advance = function () {
        // 从输入中读取下一条命令,将其指定为`当前命令`,仅hasMoreCommands 返回true.才调用这个程序
    };
    Parser.prototype.commandType = function (line) {
        if (line.indexOf('pop') > -1) {
            return 'C_POP';
        }
        if (line.indexOf("push") > -1) {
            return "C_PUSH";
        }
        return "C_ARITHMETIC";
    };
    Parser.prototype.arg1 = function () {
        // 返回当前命令的第一个参数,如果当前命令为 C_ARITHMETHIC , 则返回命令本身, 如 add , sub等, 
        return process.argv[2];
    };
    Parser.prototype.arg2 = function () {
        // 返回当前命令的第一个参数,如果当前命令为 C_ARITHMETHIC , 则返回命令本身, 如 add , sub等, 
        return process.argv[3];
    };
    return Parser;
}());
exports["default"] = Parser;
