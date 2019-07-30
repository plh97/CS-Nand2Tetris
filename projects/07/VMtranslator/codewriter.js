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
        that: "THAT",
        pointer0: "THIS",
        pointer1: "THAT",
        temp0: "5",
        temp1: "6",
        temp2: "7",
        temp3: "8",
        temp4: "9",
        temp5: "10",
        temp6: "11",
        temp7: "12",
        static: "16"
    }
};
var CodeWriter = /** @class */ (function () {
    function CodeWriter() {
    }
    CodeWriter.prototype.writeArithmetic = function (command) {
        // 将给定的算数操作所对应的汇编代码写至输出
        if (command === "add" ||
            command === "sub" ||
            command === "or" ||
            command === "and") {
            return "\n        @SP\n        M=M-1\n        A=M\n        D=M\n        @SP\n        M=M-1\n        A=M\n        M=M" + Map.opera[command] + "D\n        @SP\n        M=M+1\n      ";
        }
        if (command === "neg" || command === "not") {
            return "\n        @SP\n        A=M-1\n        M=" + Map.opera[command] + "M\n      ";
        }
        if (command === "eq" || command === "lt" || command === "gt") {
            var rn = Math.random().toFixed(3) * 1000;
            return "\n        @SP\n        A=M-1\n        D=M\n        @SP\n        M=M-1\n        A=M-1\n        D=M-D\n        @GOTO_TRUE" + rn + "\n        D;J" + command.toUpperCase() + "\n        @GOTO_FALSE" + rn + "\n        0;JMP\n        (GOTO_TRUE" + rn + ")\n        @SP\n        A=M-1\n        M=-1\n        @OUT" + rn + "\n        0;JMP\n        (GOTO_FALSE" + rn + ")\n        @SP\n        A=M-1\n        M=0\n        (OUT" + rn + ")\n      ";
        }
    };
    CodeWriter.prototype.writePushPop = function (Command, segment, index) {
        // 将给定的Command 命令类型为C_PUSH , C_POP, 所对应的汇编代码写入至输出
        if (Command === "C_PUSH") {
            if (segment === "constant") {
                // 将 index 压入栈中 256-2047
                return "\n          @" + index + "\n          D=A\n          @SP\n          A=M\n          M=D\n          @SP\n          M=M+1\n        ";
            }
            if (segment === "that" ||
                segment === "this" ||
                segment === "local" ||
                segment === "argument") {
                // push
                var loopString = "";
                for (; index > 0; index--) {
                    loopString += "A=A+1\n";
                }
                return "\n          @" + Map.segment[segment] + "\n          A=M\n          " + loopString + "\n          D=M\n          @SP\n          A=M\n          M=D\n          @SP\n          M=M+1\n        ";
            }
            if (segment === "temp" || segment === "pointer") {
                // push , 去temp_index 中拿到对应的值然后push到堆栈中
                return "\n          @" + Map.segment[segment + index] + "\n          D=M\n          @SP\n          A=M\n          M=D\n          @SP\n          M=M+1\n        ";
            }
            if (segment === "static") {
                // push 从16 开始, 去拿static 的数据
                return "\n          @" + (Number(Map.segment.static) + Number(index)) + "\n          D=M\n          @SP\n          A=M\n          M=D\n          @SP\n          M=M+1\n        ";
            }
        }
        if (Command === "C_POP") {
            if (segment === "temp" || segment === "pointer") {
                // pop
                return "\n          @SP\n          A=M-1\n          D=M\n          @" + Map.segment[segment + index] + "\n          M=D\n          @SP\n          M=M-1\n        ";
            }
            if (segment === "local" ||
                segment === "argument" ||
                segment === "this" ||
                segment === "that") {
                // 将 栈顶推出到local.0中
                var loopString = "";
                for (; index > 0; index--) {
                    loopString += "A=A+1\n";
                }
                return "\n          @SP\n          A=M-1\n          D=M\n          @" + Map.segment[segment] + "\n          A=M\n          " + loopString + "\n          M=D\n          @SP\n          M=M-1\n        ";
            }
            if (segment === "static") {
                // pop -- 从16 开始, 将当前栈顶数据push到static
                return "\n          @SP\n          A=M-1\n          D=M\n          @" + (Number(Map.segment.static) + Number(index)) + "\n          M=D\n          @SP\n          M=M-1\n        ";
            }
        }
    };
    return CodeWriter;
}());
exports["default"] = CodeWriter;
