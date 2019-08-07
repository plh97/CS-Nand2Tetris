
      (SimpleFunction.test)
      @LCL
      D=M
      @SP
      M=D
      
        @SP
        M=M+1
        A=M-1
        M=0
      
        @SP
        M=M+1
        A=M-1
        M=0
      
    
          @LCL
          A=M
          
          D=M
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @LCL
          A=M
          A=A+1

          D=M
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
        @SP
        M=M-1
        A=M
        D=M
        @SP
        M=M-1
        A=M
        M=M+D
        @SP
        M=M+1
      
        @SP
        A=M-1
        M=!M
      
          @ARG
          A=M
          
          D=M
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
        @SP
        M=M-1
        A=M
        D=M
        @SP
        M=M-1
        A=M
        M=M+D
        @SP
        M=M+1
      
          @ARG
          A=M
          A=A+1

          D=M
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
        @SP
        M=M-1
        A=M
        D=M
        @SP
        M=M-1
        A=M
        M=M-D
        @SP
        M=M+1
      
      // FRAME = LCL
      @LCL
      D=M
      @R13
      M=D
      // RETURN = *(FRAME-5) 将返回地址放入临时变量中
      @5
      A=D-A
      D=M
      @R14
      M=D
      // *ARG = pop()
      @SP
      AM=M-1
      D=M
      @ARG
      A=M
      M=D
      // SP = ARG+1
      @ARG
      D=M
      @SP
      M=D+1
      
      @R13
      AM=M-1
      D=M
      @THAT
      M=D
    

      @R13
      AM=M-1
      D=M
      @THIS
      M=D
    

      @R13
      AM=M-1
      D=M
      @ARG
      M=D
    

      @R13
      AM=M-1
      D=M
      @LCL
      M=D
    
      // GOTO RET
      @R14
      A=M
      0;JMP
    