"use strict";
exports.__esModule = true;
var parser_1 = require("./parser");
var codewriter_1 = require("./codewriter");
var fs = require("fs");
var path = require("path");
var argv2 = process.argv[2];
var parser = new parser_1["default"]();
var codewriter = new codewriter_1["default"]();
var Main = /** @class */ (function () {
    function Main() {
    }
    // true -> 有文件
    // false -> 没有这个文件
    Main.isFileExist = function (fileName) {
        return fs.existsSync(path.resolve("./projects", fileName + ".vm"));
    };
    Main.readFile = function (fileName) {
        var isExist = Main.isFileExist(fileName);
        if (isExist) {
            return fs.readFileSync(path.resolve("./projects", "" + fileName) + ".vm", "utf-8");
        }
        else {
            return fs.readFileSync(path.resolve("./projects", "" + fileName, "../Sys.vm"), "utf-8");
        }
    };
    Main.init = function (fileName) {
        var newFile = "";
        var data = Main.readFile(fileName);
        var lines = data.split("\r\n");
        lines = lines.map(function (e) { return parser.clear(e); }).filter(function (e) { return e; });
        var _loop_1 = function (pc) {
            var line = lines[pc];
            var C_TYPE = parser.commandType(line);
            var newLine = "";
            if (C_TYPE === "C_PUSH" || C_TYPE === "C_POP") {
                newLine = codewriter.writePushPop(C_TYPE, line.split(" ")[1], Number(line.split(" ")[2]));
            }
            if (C_TYPE === "C_ARITHMETIC") {
                newLine = codewriter.writeArithmetic(line);
            }
            var command1 = line.split(" ")[1];
            var command2 = line.split(" ")[2];
            if (C_TYPE === "C_LABEL") {
                newLine = codewriter.writeLabel(command1);
            }
            if (C_TYPE === "C_IF") {
                newLine = codewriter.writeIF(command1);
            }
            if (C_TYPE === "C_GOTO") {
                newLine = codewriter.writeGOTO(command1);
            }
            if (C_TYPE === "C_FUNCTION") {
                newLine = codewriter.writeFunction(command1, command2);
            }
            if (C_TYPE === "C_RETURN") {
                newLine = codewriter.writeReturn();
            }
            if (C_TYPE === "C_CALL") {
                var _a = command1.split("."), fileName_1 = _a[0], functionName = _a[1];
                if (!RegExp("(" + fileName_1 + ")").test(newFile)) {
                    newFile =
                        "\n            // ========================= main sub function =========================\n            " + Main.init(argv2
                            .split("/")
                            .map(function (e, i, a) { return (i == a.length - 1 ? fileName_1 : e); })
                            .join("/")) + "\n            // ========================= main sub function =========================\n          " + newFile;
                }
                newLine = codewriter.writeCall(command1, command2);
            }
            if (!newLine) {
                console.log(newLine);
            }
            newFile += newLine;
        };
        for (var pc = 0; pc < lines.length; pc++) {
            _loop_1(pc);
        }
        return newFile;
    };
    return Main;
}());
if (Main.isFileExist(argv2)) {
    fs.writeFileSync(path.resolve("./projects", argv2 + ".asm"), Main.init(argv2));
}
else {
    // 找不到 就默认 Sys 文件
    fs.writeFileSync(path.resolve("./projects", argv2 + ".asm"), "\n    @256\n    D=A\n    @SP\n    M=D\n    " + codewriter.writeCall("Sys.init", "0") + "\n    " + Main.init(argv2) + "\n  ");
}
