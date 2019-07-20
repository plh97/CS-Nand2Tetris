"use strict";
exports.__esModule = true;
var COMP = {
    "": "0001100",
    "0": "0101010",
    "1": "0111111",
    "-1": "0111010",
    D: "0001100",
    A: "0110000",
    M: "1110000",
    "!D": "0001101",
    "!A": "0110001",
    "!M": "1110001",
    "-D": "0001111",
    "-A": "0110011",
    "-M": "1110011",
    "D+1": "0011111",
    "A+1": "0110111",
    "M+1": "1110111",
    "D-1": "0001110",
    "A-1": "0110010",
    "M-1": "1110010",
    "D+A": "0000010",
    "D+M": "1000010",
    "D-A": "0010011",
    "D-M": "1010011",
    "A-D": "0000111",
    "M-D": "1000111",
    "D&A": "0000000",
    "D&M": "1000000",
    "D|A": "0010101",
    "D|M": "1010101"
};
var DEST = {
    "0": "000",
    M: "001",
    D: "010",
    MD: "011",
    A: "100",
    AM: "101",
    AD: "110",
    ADM: "111"
};
var JUMP = {
    "000": "000",
    "0": "000",
    JGT: "001",
    JEQ: "010",
    JGE: "011",
    JLT: "100",
    JNE: "101",
    JLE: "110",
    JMP: "111"
};
var Code = /** @class */ (function () {
    function Code() {
    }
    //返回3个bit
    Code.dest = function (command) {
        //
        return DEST[command];
    };
    // 返回7个bit
    Code.comp = function (command) {
        return COMP[command];
        //
    };
    // 返回3个bit
    Code.jump = function (command) {
        //
        return JUMP[command];
    };
    return Code;
}());
exports["default"] = Code;
