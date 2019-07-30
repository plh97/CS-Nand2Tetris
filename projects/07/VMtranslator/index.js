"use strict";
exports.__esModule = true;
var parser_1 = require("./parser");
var codewriter_1 = require("./codewriter");
var fs = require("fs");
var fileName = process.argv[2];
var parser = new parser_1["default"]();
var codewriter = new codewriter_1["default"]();
var newFile = "";
var data = fs.readFileSync(fileName + ".vm", "utf-8");
var lines = data.split("\r\n");
lines = lines.map(function (e) { return parser.clear(e); }).filter(function (e) { return e; });
for (var pc = 0; pc < lines.length; pc++) {
    var line = lines[pc];
    var C_TYPE = parser.commandType(line);
    var newLine = "";
    if (C_TYPE === "C_PUSH" || C_TYPE === "C_POP") {
        newLine = codewriter.writePushPop(C_TYPE, line.split(" ")[1], Number(line.split(" ")[2]));
    }
    if (C_TYPE === "C_ARITHMETIC") {
        newLine = codewriter.writeArithmetic(line);
    }
    newFile += newLine;
}
fs.writeFileSync(fileName + ".asm", newFile);
