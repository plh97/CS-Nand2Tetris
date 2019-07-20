"use strict";
// 语法分析器 parse 模块
// 用于对文件进行语法分析
// 将汇编命令分解成其所表达的内在含义
exports.__esModule = true;
var code_1 = require("./code");
var symbolTable_1 = require("./symbolTable");
var varityIndex = 16;
var Parser = /** @class */ (function () {
    function Parser() {
    }
    // 清除多余命令
    Parser.clear = function (line) {
        return line.replace(/\/\/[\s\S]+/, "").trim(); // 清空注释后面的文字
    };
    // 当前命令 返回机器码
    Parser.advance = function (line) {
        var type = this.commandType(line);
        // @xxx 是符号, 或者 十进制数字
        if (type === "A_COMMAND") {
            line = line.replace(/@/, '');
            if (isNaN(Number(line)) && !symbolTable_1["default"].contains(line)) {
                // 如果是符号表不包含的字符, 则,他就是变量
                symbolTable_1["default"].addEntry(line, varityIndex);
                varityIndex++;
            }
            return this.symbol(line);
        }
        if (type === "C_COMMAND") {
            var dest = line;
            var comp = "";
            var jump = "0";
            if (line.match(/;/)) {
                jump = line.split(";")[1];
                dest = line.split(";")[0];
            }
            if (line.match(/=/)) {
                comp = line.split("=")[1];
                dest = line.split("=")[0];
            }
            return "111" + this.comp(comp) + this.dest(dest) + this.jump(jump);
        }
    };
    // ============== 命令类型 ===============
    Parser.commandType = function (line) {
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
    };
    // ============== 命令类型 ===============
    // A,L 命令时候调用
    Parser.symbol = function (line) {
        return symbolTable_1["default"].getAddress(line);
    };
    // C 命令调用
    Parser.dest = function (command) {
        return code_1["default"].dest(command);
    };
    // C 命令调用
    Parser.comp = function (command) {
        return code_1["default"].comp(command);
    };
    // C 命令调用
    Parser.jump = function (command) {
        return code_1["default"].jump(command);
    };
    return Parser;
}());
exports["default"] = Parser;
