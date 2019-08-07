
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
            
      (Class2.set)
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
        
          @SP
          A=M-1
          D=M
          @16
          M=D
          @SP
          M=M-1
        
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
          A=M-1
          D=M
          @17
          M=D
          @SP
          M=M-1
        
          @0
          D=A
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
    
      (Class2.get)
      @LCL
      D=M
      @SP
      M=D
      
    
          @16
          D=M
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @17
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
    
            // ========================= main sub function =========================
          
            // ========================= main sub function =========================
            
      (Class1.set)
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
        
          @SP
          A=M-1
          D=M
          @16
          M=D
          @SP
          M=M-1
        
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
          A=M-1
          D=M
          @17
          M=D
          @SP
          M=M-1
        
          @0
          D=A
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
    
      (Class1.get)
      @LCL
      D=M
      @SP
      M=D
      
    
          @16
          D=M
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @17
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
    
            // ========================= main sub function =========================
          
      (Sys.init)
      @LCL
      D=M
      @SP
      M=D
      
    
          @6
          D=A
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @8
          D=A
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
      // push return-address
      @Class1.set_RETURN_ADDRESS_1
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
      @2
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
      @Class1.set
      0;JMP
      // (return-address) 为返回地址声明标签
      (Class1.set_RETURN_ADDRESS_1)
    
          @SP
          A=M-1
          D=M
          @5
          M=D
          @SP
          M=M-1
        
          @23
          D=A
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
          @15
          D=A
          @SP
          A=M
          M=D
          @SP
          M=M+1
        
      // push return-address
      @Class2.set_RETURN_ADDRESS_2
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
      @2
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
      @Class2.set
      0;JMP
      // (return-address) 为返回地址声明标签
      (Class2.set_RETURN_ADDRESS_2)
    
          @SP
          A=M-1
          D=M
          @5
          M=D
          @SP
          M=M-1
        
      // push return-address
      @Class1.get_RETURN_ADDRESS_3
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
      @Class1.get
      0;JMP
      // (return-address) 为返回地址声明标签
      (Class1.get_RETURN_ADDRESS_3)
    
      // push return-address
      @Class2.get_RETURN_ADDRESS_4
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
      @Class2.get
      0;JMP
      // (return-address) 为返回地址声明标签
      (Class2.get_RETURN_ADDRESS_4)
    
      (WHILE)
    
      @WHILE
      0;JMP
    
  