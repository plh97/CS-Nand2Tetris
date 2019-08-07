
    @256
    D=A
    @SP
    M=D
    
      // push return-address
      @Sys.init_RETURN_ADDRESS_0
      D=A
      @SP
      A=M
      M=D
      @SP
      M=M+1
      // push LCL
      // push ARG
      // push THIS
      // push THAT
      
        @LCL
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
      

        @ARG
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
      

        @THAT
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
      

        @THIS
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
      
      // ARG=SP-n-5
      @SP
      D=M
      @0
      D=D-A
      @5
      D=D-A
      @ARG
      M=D
      // LCL=SP
      @SP
      D=M
      @LCL
      M=D
      // goto f
      @Sys.init
      0;JMP
      // (return-address) 为返回地址声明标签
      (Sys.init_RETURN_ADDRESS_0)
    
    
            // ========================= main sub function =========================
            
      (Main.fibonacci)
      @LCL
      D=M
      @SP
      M=D
      
    
          @ARG
          A=M
          
          D=M
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @2
          D=A
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
        @SP
        A=M-1
        D=M
        @SP
        M=M-1
        A=M-1
        D=M-D
        @GOTO_TRUE444
        D;JLT
        @GOTO_FALSE444
        0;JMP
        (GOTO_TRUE444)
        @SP
        A=M-1
        M=-1
        @OUT444
        0;JMP
        (GOTO_FALSE444)
        @SP
        A=M-1
        M=0
        (OUT444)
      
      @SP
      M=M-1
      A=M
      D=M
      @IF_TRUE
      D;JNE
    
      @IF_FALSE
      0;JMP
    
      (IF_TRUE)
    
          @ARG
          A=M
          
          D=M
          @SP
          A=M
          M=D
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
    
      (IF_FALSE)
    
          @ARG
          A=M
          
          D=M
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @2
          D=A
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
      
      // push return-address
      @Main.fibonacci_RETURN_ADDRESS_1
      D=A
      @SP
      A=M
      M=D
      @SP
      M=M+1
      // push LCL
      // push ARG
      // push THIS
      // push THAT
      
        @LCL
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
      

        @ARG
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
      

        @THAT
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
      

        @THIS
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
      
      // ARG=SP-n-5
      @SP
      D=M
      @1
      D=D-A
      @5
      D=D-A
      @ARG
      M=D
      // LCL=SP
      @SP
      D=M
      @LCL
      M=D
      // goto f
      @Main.fibonacci
      0;JMP
      // (return-address) 为返回地址声明标签
      (Main.fibonacci_RETURN_ADDRESS_1)
    
          @ARG
          A=M
          
          D=M
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @1
          D=A
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
      
      // push return-address
      @Main.fibonacci_RETURN_ADDRESS_2
      D=A
      @SP
      A=M
      M=D
      @SP
      M=M+1
      // push LCL
      // push ARG
      // push THIS
      // push THAT
      
        @LCL
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
      

        @ARG
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
      

        @THAT
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
      

        @THIS
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
      
      // ARG=SP-n-5
      @SP
      D=M
      @1
      D=D-A
      @5
      D=D-A
      @ARG
      M=D
      // LCL=SP
      @SP
      D=M
      @LCL
      M=D
      // goto f
      @Main.fibonacci
      0;JMP
      // (return-address) 为返回地址声明标签
      (Main.fibonacci_RETURN_ADDRESS_2)
    
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
    
            // ========================= main sub function =========================
          
      (Sys.init)
      @LCL
      D=M
      @SP
      M=D
      
    
          @4
          D=A
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
      // push return-address
      @Main.fibonacci_RETURN_ADDRESS_3
      D=A
      @SP
      A=M
      M=D
      @SP
      M=M+1
      // push LCL
      // push ARG
      // push THIS
      // push THAT
      
        @LCL
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
      

        @ARG
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
      

        @THAT
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
      

        @THIS
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
      
      // ARG=SP-n-5
      @SP
      D=M
      @1
      D=D-A
      @5
      D=D-A
      @ARG
      M=D
      // LCL=SP
      @SP
      D=M
      @LCL
      M=D
      // goto f
      @Main.fibonacci
      0;JMP
      // (return-address) 为返回地址声明标签
      (Main.fibonacci_RETURN_ADDRESS_3)
    
      (WHILE)
    
      @WHILE
      0;JMP
    
  