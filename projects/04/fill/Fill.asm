// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input. 
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel. When no key is pressed, the
// program clears the screen, i.e. writes "white" in every pixel.

// Put your code here.

(EXIT)

@SCREEN
D=A
@18 // store screen address
M=D
@8192
M=A // store times

(LOOP)
@8192
D=M
M=M-1 // time - 1


@KBD
D=M
@black
D;JGT

(white)
@8192
D=M
@EXIT
D;JLT
@18
A=M
M=0
@18
M=M+1 // screen address + 1
@LOOP
0;JMP

(black)
@8192
D=M
@EXIT
D;JLT
@18
A=M
M=-1
@18
M=M+1 // screen address + 1
@LOOP
0;JMP
