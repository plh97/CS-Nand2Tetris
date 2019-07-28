"use strict";
// 将VM命令翻译成Hack汇编代码.
// 用于将生成的Hack汇编代码写入相应的输出文件 .asm文件中
exports.__esModule = true;
var Map = {
    opera: {
        add: "+",
        sub: "-",
        not: "!",
        neg: "-",
        and: "&",
        or: "|"
    },
    segment: {
        local: "LCL",
        argument: "ARG",
        "this": "THIS",
        that: "THAT"
    }
};
var CodeWriter = /** @class */ (function () {
    function CodeWriter() {
    }
    CodeWriter.prototype.setFileName = function (filename) {
        // 通知代码写入程序.,新的VM文件翻译过程已经开始
    };
    CodeWriter.prototype.writeArithmetic = function (command) {
        // 将给定的算数操作所对应的汇编代码写至输出
        if (command === "add" ||
            command === "sub" ||
            command === "or" ||
            command === "and") {
            return "\n        @SP\n        A=M-1\n        D=M\n        @SP\n        M=M-1\n        A=M-1\n        M=D" + Map.opera[command] + "M\n      ";
        }
        if (command === "neg" || command === "not") {
            return "\n        @SP\n        A=M-1\n        M=" + Map.opera[command] + "M\n      ";
        }
        if (command === "eq" || command === "lt" || command === "gt") {
            var ramdomNumner = Math.random().toFixed(3) * 1000;
            return "\n        @SP\n        A=M-1\n        D=M\n        @SP\n        M=M-1\n        A=M-1\n        D=D+M\n        @SET_TRUE." + ramdomNumner + "\n        D;J" + command.toUpperCase() + "\n        @SET_FALSE." + ramdomNumner + "\n        0;JMP\n      (SET_TRUE." + ramdomNumner + ")\n        @SP\n        A=M-1\n        M=1\n      (SET_FALSE." + ramdomNumner + ")\n        @SP\n        A=M-1\n        M=0\n      ";
        }
    };
    CodeWriter.prototype.writePushPop = function (Command, segment, index) {
        if (Command === "C_PUSH") {
            if (segment === "constant") {
                // 将 index 压入栈中 256-2047
                return "\n          @" + index + "\n          D=A\n          @SP\n          A=M\n          M=D\n          @SP\n          M=M+1\n        ";
            }
            if (segment === "that" ||
                segment === "this" ||
                segment === "local" ||
                segment === "argument") {
                return "\n          @" + Map.segment[segment] + "\n          A=A+" + index + "\n          D=M\n          @SP\n          A=M\n          M=D\n          @SP\n          M=M+1\n        ";
            }
        }
        if (Command === "C_POP") {
            if (segment === "local" ||
                segment === "argument" ||
                segment === "this" ||
                segment === "that") {
                // 将 栈顶推出到local.0中
                return "\n          @SP\n          A=M-1\n          D=A\n          @" + Map.segment[segment] + "\n          A=A+" + index + "\n          M=D\n        ";
            }
        }
        console.log(Command, segment, index);
        return "";
        // 将给定的Command 命令类型为C_PUSH , C_POP, 所对应的汇编代码写入至输出
    };
    CodeWriter.prototype.close = function () {
        // 关闭输出文件
    };
    return CodeWriter;
}());
exports["default"] = CodeWriter;
