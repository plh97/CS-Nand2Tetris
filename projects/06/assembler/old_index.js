const fs = require("fs")
const fileName = process.argv[2];


let file = fs.readFileSync(`./${fileName}.asm`, 'ASCII')
// let file = fs.readFileSync(`./${fileName.toLowerCase()}/${fileName}.asm`,'ASCII')
let newFile = ""

COMP = {
  '':  '0001100',
  '0': '0101010',
  '1': '0111111',
  '-1': '0111010',
  'D': '0001100',
  'A': '0110000',
  'M': '1110000',
  '!D': '0001101',
  '!A': '0110001',
  '!M': '1110001',
  '-D': '0001111',
  '-A': '0110011',
  '-M': '1110011',
  'D+1': '0011111',
  'A+1': '0110111',
  'M+1': '1110111',
  'D-1': '0001110',
  'A-1': '0110010',
  'M-1': '1110010',
  'D+A': '0000010',
  'D+M': '1000010',
  'D-A': '0010011',
  'D-M': '1010011',
  'A-D': '0000111',
  'M-D': '1000111',
  'D&A': '0000000',
  'D&M': '1000000',
  'D|A': '0010101',
  'D|M': '1010101',
}

DEST = {
  '0': '000',
  'M': '001',
  'D': '010',
  'MD': '011',
  'A': '100',
  'AM': '101',
  'AD': '110',
  'ADM': '111'
}

JUMP = {
  "000": '000',
  "0": '000',
  JGT: '001',
  JEQ: '010',
  JGE: '011',
  JLT: '100',
  JNE: '101',
  JLE: '110',
  JMP: '111',
}
SYMBOLS = {
  'SP': 0,
  'LCL': 1,
  'ARG': 2,
  'THIS': 3,
  'THAT': 4,
  'R0': 0,
  'R1': 1,
  'R2': 2,
  'R3': 3,
  'R4': 4,
  'R5': 5,
  'R6': 6,
  'R7': 7,
  'R8': 8,
  'R9': 9,
  'R10': 10,
  'R11': 11,
  'R12': 12,
  'R13': 13,
  'R14': 14,
  'R15': 15,
  // 'SCREEN': 16384,
  // 'KBD': 24576,
  'SCREEN': 0x4000, 'KBD': 0x6000,
  'screen': 0x4000,
  'screen.0': 0x4000,
  'screen.1': 0x4000 + 1,
  'screen.2': 0x4000 + 2,
  'ponggame.0': 0,
  'memory.0': 0,
  'output.0': 0,
  'output.1': 1,
  'output.2': 2,
  'output.3': 3,
  'output.4': 4,
  'output.5': 5,
  'output.6': 6,
  'math.0': 0,
  'math.1': 1,
}


file = file.split("\r\n")

index=0
let varible = 0;   // 新的变量起始地址, 新的变量占用内存中的地址起始位置
file = file.filter((line,i) => {
  let isSymbol = /\([\w\W]+\)/.test(line) // 如果被占据(xxx)位置
  if (isSymbol){
    SYMBOLS[line.replace(/[\)\(\r]/g, '')] = i+index--
    return false
  }else{
    return true
  }
})
// console.log(SYMBOLS);

file.forEach(el => {
  el = el.replace(/\/\/[\w\W]+/,'')   // 去掉 // 之后的字符
  el=el.trim()
  if (/^[\/\/|\s]/.test(el)) return
  if (/^@/.test(el)){
    // A 指令
    el = el.replace(/@/,'')
    // console.log("A--->", el)
    if (
      el === 'R0' || 
      // el === 'output.0' ||
      // el === 'math.0' ||
      // el === 'memory.0' ||
      // el === 'ponggame.0' ||
      SYMBOLS[el]
    ) {
      el = SYMBOLS[el]
    } else if (!/\d/.test(el)){
      SYMBOLS[el] = varible   // 自定义变量
      el = varible++
    }
    // console.log('A 指令 ->>>', el)
    if (isNaN(el)) {
      console.log('a instruction ---------', el);
    }
    el = '0000000000000000' + parseInt(el).toString(2)
    el = el.substring(el.length-16)
    // console.log('A 指令 ->>>', el)
    newFile+=el+"\n"
  } else {
    // C 指令
    // desp = comp ; jump
    // 1111 a ccccc ddd jjj
    // i  _  _  a  c1 c2 c3 c4 c5 c6 d1 d2 d3 j1 j2 j3
    // 15 14 13 12 11 10 09 08 07 06 05 04 03 02 01 00
    if (el == '') return
    let dest = el;
    let comp = '';
    let jump = '0';
    if (el.match(/;/)) {
      jump = el.split(';')[1]
      dest = el.split(';')[0]
      // if (el == 'D;JGT'){
      //   dest
      // }
    }
    if (el.match(/=/)) {
      comp = el.split('=')[1]
      dest = el.split('=')[0]
    }
    const finalInstruction = `111${COMP[comp]}${DEST[dest]}${JUMP[jump]}`
    newFile += finalInstruction + "\n"
  }
});


fs.writeFileSync(`./${fileName}.hack`, newFile)