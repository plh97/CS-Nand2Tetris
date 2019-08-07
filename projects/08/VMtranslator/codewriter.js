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
        this.callIndex = -1; // 函数自我递归调用, 必须加以区分, 才能返回递归调用正确地址
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
    CodeWriter.prototype.writeLabel = function (label) {
        return "\n      (" + label + ")\n    ";
    };
    CodeWriter.prototype.writeGOTO = function (label) {
        return "\n      @" + label + "\n      0;JMP\n    ";
    };
    CodeWriter.prototype.writeIF = function (label) {
        // 将布尔表达式的运算结果从堆栈顶段弹出
        // 如果该值非 0,那么程序就跳转到 label 标志的位置继续进行;
        // 否则,继续执行程序中的下一条命令.
        // 跳转的目的地址必须是位域同一个函数内.
        return "\n      @SP\n      M=M-1\n      A=M\n      D=M\n      @" + label + "\n      D;JNE\n    ";
    };
    CodeWriter.prototype.writeCall = function (functionName, numberLocals) {
        this.callIndex++;
        // push M into Stack behavious
        var str = [
            "LCL",
            "ARG",
            "THAT",
            "THIS"
        ]
            .map(function (e) { return "\n        @" + e + "\n        D=M\n        @SP\n        A=M\n        M=D\n        @SP\n        M=M+1\n      "; })
            .join("\r\n");
        console.log(functionName);
        return "\n      // push return-address\n      @" + functionName + "_RETURN_ADDRESS_" + this.callIndex + "\n      D=A\n      @SP\n      A=M\n      M=D\n      @SP\n      M=M+1\n      // push LCL\n      // push ARG\n      // push THIS\n      // push THAT\n      " + str + "\n      // ARG=SP-n-5\n      @SP\n      D=M\n      @" + numberLocals + "\n      D=D-A\n      @5\n      D=D-A\n      @ARG\n      M=D\n      // LCL=SP\n      @SP\n      D=M\n      @LCL\n      M=D\n      // goto f\n      @" + functionName + "\n      0;JMP\n      // (return-address) \u4E3A\u8FD4\u56DE\u5730\u5740\u58F0\u660E\u6807\u7B7E\n      (" + functionName + "_RETURN_ADDRESS_" + this.callIndex + ")\n    ";
    };
    CodeWriter.prototype.writeReturn = function () {
        // R13-R15 用于存储任何变量
        // THAT = *(FRAME - 1)
        // THIS = *(FRAME - 2)
        // ARG = *(FRAME - 3)
        // LCL = *(FRAME - 4)
        var str = ["THAT", "THIS", "ARG", "LCL"]
            .map(function (e) { return "\n      @R13\n      AM=M-1\n      D=M\n      @" + e + "\n      M=D\n    "; })
            .join("\r\n");
        return "\n      // FRAME = LCL\n      @LCL\n      D=M\n      @R13\n      M=D\n      // RETURN = *(FRAME-5) \u5C06\u8FD4\u56DE\u5730\u5740\u653E\u5165\u4E34\u65F6\u53D8\u91CF\u4E2D\n      @5\n      A=D-A\n      D=M\n      @R14\n      M=D\n      // *ARG = pop()\n      @SP\n      AM=M-1\n      D=M\n      @ARG\n      A=M\n      M=D\n      // SP = ARG+1\n      @ARG\n      D=M\n      @SP\n      M=D+1\n      " + str + "\n      // GOTO RET\n      @R14\n      A=M\n      0;JMP\n    ";
    };
    CodeWriter.prototype.writeFunction = function (functionName, numberLocals) {
        var localString = "";
        for (var i = 0; i < Number(numberLocals); i++) {
            localString += "\n        @SP\n        M=M+1\n        A=M-1\n        M=0\n      ";
        }
        return "\n      (" + functionName + ")\n      @LCL\n      D=M\n      @SP\n      M=D\n      " + localString + "\n    ";
    };
    return CodeWriter;
}());
exports["default"] = CodeWriter;
