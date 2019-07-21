"use strict";
// 将VM命令翻译成Hack汇编代码.
exports.__esModule = true;
var CodeWriter = /** @class */ (function () {
    function CodeWriter() {
        //
    }
    CodeWriter.prototype.setFileName = function (filename) {
        // 通知代码写入程序.,新的VM文件翻译过程已经开始
    };
    CodeWriter.prototype.writeArithmetic = function (command) {
        // 将给定的算数操作所对应的汇编代码写至输出
    };
    CodeWriter.prototype.writePushPop = function (Command, segment, index) {
        // 将给定的Command 命令类型为C_PUSH , C_POP, 所对应的汇编代码写入至输出
    };
    CodeWriter.prototype.close = function () {
        // 关闭输出文件
    };
    return CodeWriter;
}());
exports["default"] = CodeWriter;
