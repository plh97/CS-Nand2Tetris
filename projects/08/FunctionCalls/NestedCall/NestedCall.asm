
    @256
    D=A
    @SP
    M=D
    
      // push return-address
      @RETURN_ADDRESS_0
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
      (RETURN_ADDRESS_0)
    
    
      (Sys.init)
      @LCL
      D=M
      @SP
      M=D
      
    
          @4000
          D=A
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @SP
          A=M-1
          D=M
          @THIS
          M=D
          @SP
          M=M-1
        
          @5000
          D=A
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @SP
          A=M-1
          D=M
          @THAT
          M=D
          @SP
          M=M-1
        
      // push return-address
      @RETURN_ADDRESS_1
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
      @Sys.main
      0;JMP
      // (return-address) 为返回地址声明标签
      (RETURN_ADDRESS_1)
    
          @SP
          A=M-1
          D=M
          @6
          M=D
          @SP
          M=M-1
        
      (LOOP)
    
      @LOOP
      0;JMP
    
      (Sys.main)
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
      
        @SP
        M=M+1
        A=M-1
        M=0
      
        @SP
        M=M+1
        A=M-1
        M=0
      
        @SP
        M=M+1
        A=M-1
        M=0
      
    
          @4001
          D=A
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @SP
          A=M-1
          D=M
          @THIS
          M=D
          @SP
          M=M-1
        
          @5001
          D=A
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @SP
          A=M-1
          D=M
          @THAT
          M=D
          @SP
          M=M-1
        
          @200
          D=A
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @SP
          A=M-1
          D=M
          @LCL
          A=M
          A=A+1

          M=D
          @SP
          M=M-1
        
          @40
          D=A
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @SP
          A=M-1
          D=M
          @LCL
          A=M
          A=A+1
A=A+1

          M=D
          @SP
          M=M-1
        
          @6
          D=A
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @SP
          A=M-1
          D=M
          @LCL
          A=M
          A=A+1
A=A+1
A=A+1

          M=D
          @SP
          M=M-1
        
          @123
          D=A
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
      // push return-address
      @RETURN_ADDRESS_2
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
      @Sys.add12
      0;JMP
      // (return-address) 为返回地址声明标签
      (RETURN_ADDRESS_2)
    
          @SP
          A=M-1
          D=M
          @5
          M=D
          @SP
          M=M-1
        
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
        
          @LCL
          A=M
          A=A+1
A=A+1

          D=M
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @LCL
          A=M
          A=A+1
A=A+1
A=A+1

          D=M
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @LCL
          A=M
          A=A+1
A=A+1
A=A+1
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
    
      (Sys.add12)
      @LCL
      D=M
      @SP
      M=D
      
    
          @4002
          D=A
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @SP
          A=M-1
          D=M
          @THIS
          M=D
          @SP
          M=M-1
        
          @5002
          D=A
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @SP
          A=M-1
          D=M
          @THAT
          M=D
          @SP
          M=M-1
        
          @ARG
          A=M
          
          D=M
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @12
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
    
  