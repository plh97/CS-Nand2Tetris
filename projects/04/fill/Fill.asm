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
D;JNE
@white
D;JMP

(black)
@i
D=M
@8192
D=D-A
@loop
D;JEQ
@i
D=M
@SCREEN
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
D;JLT
@i
D=M
@SCREEN
A=A+D
M=0
@i
M=M-1
@loop
0;JMP
