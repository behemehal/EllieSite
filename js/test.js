new Codev("code").supplyCode(`

fn test(param: string) > int {

    if param.len == 0 {
        ret -1;
    } else {
        ret param.len;
    }
}

c test : string = "ok";
v test : string = "ok";
d test = "ok";


`);
