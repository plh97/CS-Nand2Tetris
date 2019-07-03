// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input. 
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel. When no key is pressed, the
// program clears the screen, i.e. writes "white" in every pixel.

// Put your code here.
@i
M=0

(loop)
@KBD
D=M
@black
D;JGT   // >
@white
D;JEQ   // 相等

(black)
// i大于0 直接推出到loop
@i
D=M
@8192 // 256*512/16 = 8192
D=D-A
@loop
D;JEQ
@i
D=M
@SCREEN  // 屏幕内容由于RAM地址位16384这个地址(Ox4000)开始的一个8k内存映射开始表示
A=A+D
M=-1
@i
M=M+1
@loop
0;JMP

(white)
@i
D=M
@loop
D;JLT  // i<0 直接推出到loop
@i
D=M
@SCREEN
A=A+D
M=0
@i
M=M-1
@loop
0;JMP