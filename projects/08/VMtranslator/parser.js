"use strict";
// Parser 模块
exports.__esModule = true;
var Parser = /** @class */ (function () {
    function Parser() {
    }
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
    Parser.prototype.commandType = function (line) {
        // console.log(line);
        if (line.indexOf('pop') > -1) {
            return 'C_POP';
        }
        if (line.indexOf("push") > -1) {
            return "C_PUSH";
        }
        if (line.indexOf("label") > -1) {
            return "C_LABEL";
        }
        if (line.indexOf("if-goto") > -1) {
            return "C_IF";
        }
        if (line.indexOf("goto") > -1) {
            return "C_GOTO";
        }
        if (line.indexOf("call") > -1) {
            return "C_CALL";
        }
        if (line.indexOf("return") > -1) {
            return "C_RETURN";
        }
        if (line.indexOf("function") > -1) {
            return "C_FUNCTION";
        }
        return "C_ARITHMETIC";
    };
    return Parser;
}());
exports["default"] = Parser;
