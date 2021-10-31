var errors = [{
        "code": "0x00",
        "title": "SyntaxError",
        "detail": "This error indicates a wrong syntax usage applied to code",
        "runAble": true,
        "example": `
            fn test() => string {
               //     ^
               //SyntaxError: Unexpected token
            }
        
        `
    },
    {
        "code": "0x01",
        "title": "SyntaxError",
        "ignored": true,
        "example": `NOT`,
    },
    {
        "code": "0x02",
        "title": "ReferenceError",
        "detail": "This error indicates a type used according to definition",
        "runAble": true,
        "example": `
            fn test(param: string) {}

            test(1);
           //    ^
           //ReferenceError: Expected 'string' found 'int'
        `
    },
    {
        "code": "0x03",
        "title": "ReferenceError",
        "detail": "Referenced class parameter is missing in body",
        "runAble": true,
        "example": `
            class Test {
                co (exampleParam);
                    // ^
                    //ReferenceError: Targeted variable 'exampleParam' not found in scope
                v anotherParam: string; 
            }
        `
    },
    {
        "code": "0x04",
        "title": "ReferenceError",
        "ignored": true,
        "example": `NOT`,
    },
    {
        "code": "0x05",
        "title": "ReferenceError",
        "detail": "Referenced variable is not defined in scope",
        "runAble": true,
        "example": `
            v aVariable = "test";
            fn test(param: string) {}
            test(aVariableWithWrongName);
            //           ^
            //ReferenceError: Expected 'aVariableWithWrongName' not defined
        `
    },
    {
        "code": "0x06",
        "title": "ReferenceError",
        "detail": "Function call parameters is not matching expected parameter length",
        "runAble": true,
        "example": `
            fn test(param: string, secondParam: string) {}
            test("test");
            //^
            //ReferenceError: Function requires '2' parameters, found '1' length of parameters
            
            //By defining a multi argument function you can fix this issue
            fn multipleArgs(*param: string) {}
        `
    },
    {
        "code": "0x07",
        "title": "ReferenceError",
        "detail": "Variable declarations should contain types",
        "runAble": true,
        "example": `
            v aVariable;
            //^
            //ReferenceError: Expected type annotations
            // Variable declarations should have type annotations
            v GoodVariable: string;
        `
    },
    {
        "code": "0x08",
        "title": "TypeError",
        "ignored": true,
    },
    {
        "code": "0x09",
        "title": "TypeError",
        "detail": "Duplicated parameter declared in constructor or function definition",
        "runAble": true,
        "example": `
            fn test(param: string, param: string) {}
            //                       ^
            //TypeError: Duplicate parameter
            
            //By defining a multi argument function you can fix this issue
            fn multipleArgs(*param: string) {}
        `
    },
    {
        "code": "0x10",
        "title": "TypeError",
        "ignored": true,
    },
    {
        "code": "0x11",
        "title": "SyntaxError",
        "ignored": true,
    },
    {
        "code": "0x12",
        "title": "SyntaxError",
        "detail": "Unexpected token in operator declaration",
        "runAble": true,
        "code": `
            if (true &? true) {
                    //^
                    //SyntaxError: Expected operator found '?'
            }
        `
    },
    {
        "code": "0x13",
        "title": "TypeError",
        "detail": "Cannot leave char empty",
        "runAble": true,
        "code": `
            v testChar = '';
                       //^
                       //TypeError: Cannot leave char empty
            v GoodChar = '\0';
        `
    },
    {
        "code": "0x14",
        "title": "TypeError",
        "detail": "Char type can only take single character",
        "runAble": true,
        "code": `
            v ellie = 'ellie';
                       //^
                       //TypeError: Char type can take one character only
            v GoodEllie = ['e', 'l', 'l', 'i', 'e'];
        `
    },
    {
        "code": "0x15",
        "title": "OverflowError",
        "detail": "Number size overflowed"
    },
    {
        "code": "0x16",
        "title": "OverflowError",
        "detail": "Float size overflowed"
    },
    {
        "code": "0x17",
        "title": "TypeError",
        "ignored": true,
    },
    {
        "code": "0x18",
        "title": "OverflowError",
        "detail": "Defined parameter size overflowed",
        "runAble": true,
        "code": `
            v testCloak : cloak(int, string) = (1, "test", 't');
            //                                              ^
            //OverflowError: Fixed size exceeded: expected '2' elements, got '3' elements

            v testArray : array(int, 1) = (1, 2);
            //                                ^
            //OverflowError: Fixed size exceeded: expected '2' elements, got '3' elements

            class Test {
                co Test(paramFirst, paramSecond);
                v paramFirst: int;
                v paramSecond: int;
            }
        `
    },
    {
        "code": "0x19",
        "title": "TypeError",
        "ignored": "true",
    },
    {
        "code": "0x20",
        "title": "SyntaxError",
        "detail": "Reserved keyword cannot be used",
        "runAble": true,
        "example": `
            class class {}
              //    ^
              //SyntaxError: Reserved keyword 'class'
        `
    },
    {
        "code": "0x21",
        "title": "SyntaxError",
        "detail": "Constructor of a class should have same class name",
        "runAble": true,
        "example": `
            class Test {
                co AnotherTest();
                //      ^
                //SyntaxError: Constructor name should be same as class name
            }
        `
    },
    {
        "code": "0x22",
        "title": "SyntaxError",
        "detail": "Getter is not found in scope",
        "runAble": true,
        "example": `
            getterCall;
            //   ^
            //ReferenceError: Getter 'getterCall' is not found in scope
        `
    },
    {
        "code": "0x23",
        "title": "ReferenceError",
        "detail": "Another item with same name exists in scope",
        "runAble": true,
        "example": `
            v aVariable = "123";
            
            class aVariable {
                //   ^
                //ReferenceError: 'aVariable' is already defined

            }

        `
    },
    {
        "code": "0x24",
        "title": "TypeError",
        "detail": "Referenced item that wanted to call is not a function",
        "runAble": true,
        "example": `
            v aVariable = "123";
            aVariable();
            //   ^
            //TypeError: 'aVariable' is not a function
        `
    },
    {
        "code": "0x25",
        "title": "SyntaxError",
        "detail": "Code ended without finishing last item",
        "runAble": false,
        "example": `
            v te.....
            //   ^
            //TypeError: 'aVariable' is not a function
        `
    },
    {
        "code": "0x26",
        "title": "TypeError",
        "detail": "Declaring data on generic typed variable is wrong",
        "runAble": true,
        "example": `
            class Test<T> {
                v variable: T = "test";
                //   ^
                //TypeError: 'aVariable' is not a function
            }
        `
    },
    {
        "code": "0x27",
        "title": "ImportError",
        "detail": "If there is a syntax error in the imported file this error should be thrown",
        "runAble": false,
        "example": `
            import ./aFileThatBroken;
            //           ^
            //ImportError: Cannot resolve './aFileThatBroken' module
            //..Errors in the imported file
        `
    },
    {
        "code": "0x28",
        "title": "TypeError",
        "detail": "A non iterable type supplied",
        "runAble": true,
        "example": `
            for (i, 1) {
                //  ^
                //Unexpected Token 'int' is not iterable
            }
        `
    },
    {
        "code": "0x29",
        "title": "TypeError",
        "detail": "Classes can only have one constructor",
        "runAble": true,
        "example": `
            class Test {
                co Test();
                co Test();
                //  ^
                //TypeError: Class can only have one constructor
            }
        `
    },
    {
        "code": "0x30",
        "title": "TypeError",
        "detail": "Referenced item is not constructable",
        "runAble": true,
        "example": `
            fn test() {}
            new test();
                 ^
        `
    },
    {
        "code": "0x31",
        "title": "ImportError",
        "ignored": true,
    },
    {
        "code": "0x32",
        "title": "ImportError",
        "detail": "Import failed",
        "ignored": true
    },
    {
        "code": "0x33",
        "title": "TypeError",
        "detail": "Targeted variable, method, getter or setter is not found in target",
        "runAble": true,
        "example": `
            class Test {
                v aVariable = 123;

                g test : int {
                    ret 1;
                }
            }

            v aInt = new Test().aVariableNotExists;
            //                          ^
            //TypeError: 'aVariableNotExists' is not found in properties
        `
    },
    {
        "code": "0x34",
        "title": "SyntaxError",
        "detail": "Cannot declare a new variable after multiple arg parameter",
        "runAble": true,
        "example": `
            fn multipleArgs(*param: string, secondParam: string) {}
            //                                          ^
            //SyntaxError: Cannot add a new parameter after multiple parameter
        `
    },
    {
        "code": "0x35",
        "title": "SyntaxError",
        "detail": "Some data types cannot be declared as a collective key",
        "runAble": true,
        "example": `
            v collective = {
                false: "test",
                //^
                //SyntaxError: 'bool' cannot be used as collective parameter
            };
        `
    },
    {
        "code": "0x36",
        "title": "SyntaxError",
        "ignored": "true"
    },
    {
        "code": "0x37",
        "title": "ReferenceError",
        "detail": "A type declared in other scope should be declared in this scope",
        "runAble": false,
        "example": `
            //File2
            class OtherClass {
                v param = "test";
            }

            //File1
            import File2
            class Test {
                v data: OtherClass;
            }

            //CurrentFile
            import File1;

            v test = new Test().data;
            //                    ^
            //ReferenceError: 'OtherClass' required in scope
        `
    },
    {
        "code": "0x38",
        "title": "SyntaxError",
        "detail": "Cannot declare builtin data types",
        "runAble": true,
        "example": `
            class int {}
            //     ^
            //ReferenceError: Cannot define built-in types
        `
    },
    {
        "code": "0x39",
        "title": "ParserError",
        "detail": "ParserTime file keys such as parserWarn, parserInfo and parserAbort should have string data",
        "runAble": true,
        "example": `
            @parserInfo=1;
            //          ^
            //ParserError: Parser messages value can only be string, but found 'int'
        `
    },
    {
        "code": "0x40",
        "title": "ParserIntegrityError",
        "ignored": true,
    },
    {
        "code": "0x41",
        "title": "SyntaxError",
        "detail": "Targeted variable, method, getter or setter is not found in target",
        "runAble": true,
        "example": `
            class Test {}

            v aInt = new Test().aVariableNotExists;
            //                          ^
            //TypeError: 'aVariableNotExists' is not found in 'Test' properties
        `
    },
    {
        "code": "0x42",
        "title": "TypeError",
        "detail": "A left side of assignment should be reference to item",
        "runAble": true,
        "example": `
            123 += 123;
        //   ^
        //TypeError: Invalid left-hand side in assignment
        `
    }
]