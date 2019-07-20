const Map = {
  SP: 0,
  LCL: 1,
  ARG: 2,
  THIS: 3,
  THAT: 4,
  R0: 0,
  R1: 1,
  R2: 2,
  R3: 3,
  R4: 4,
  R5: 5,
  R6: 6,
  R7: 7,
  R8: 8,
  R9: 9,
  R10: 10,
  R11: 11,
  R12: 12,
  R13: 13,
  R14: 14,
  R15: 15,
  'SCREEN': 16384,
  'KBD': 24576,
};
export default class SymbolTable{
  // 将 symbol和 address 配对加入字符表
  static addEntry(symbol:string, address:number):void {
    Map[symbol] = address
  }

  // 符号表是否包含了指定的symbol
  static contains(symbol:string):boolean {
    return Map.hasOwnProperty(symbol);
  }

  // 获取与 sybmol 相关的地址
  static getAddress(symbol:string): string {
    symbol = symbol.replace(/@/, "");
    if (this.contains(symbol)){
      symbol = Map[symbol];
    }
    
    const res = "0000000000000000" + parseInt(symbol).toString(2);
    return res.substring(res.length - 16);
  }
}