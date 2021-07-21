function ieb() {
  var reset = () => {
    for (let i = 0; i < document.querySelectorAll(".examplePage").length; i++) {
      var div = document.querySelectorAll(".examplePage")[i];
      var bdiv = document.querySelectorAll(".exampleBtn")[i];
      div.removeAttribute("active");
      bdiv.removeAttribute("active");
    }
  };
  function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
  for (let i = 0; i < document.querySelectorAll(".exampleBtn").length; i++) {
    var btn = document.querySelectorAll(".exampleBtn")[i];
    if (btn.getAttribute("active") == "") {
      document.getElementById(`examplePage${i+1}`).setAttribute("active", "");
    }
    btn.onclick = function() {
        reset();
        document.getElementById(`examplePage${i + 1}`).setAttribute("active", "");
        document.querySelectorAll(".exampleBtn")[i].setAttribute("active", "");
    }
  }
}
ieb()


let classCode = new Codev("examplePage1");
let fnCode = new Codev("examplePage2");
let loopCode = new Codev("examplePage3");
let dataTypeCode = new Codev("examplePage4");

classCode.supplyCode(`class Test<T> {
    co Test(param) {
        //Some constructor code
    }

    pub v param : T;
    pri v version : string = "v2";
}`)

fnCode.supplyCode(`fn test(param: string) > int {
    ret param.len;
}`)

loopCode.supplyCode(`for (i, 0, 30) {
    //a loop that counts 0 to 30
}`)

dataTypeCode.supplyCode(`v aString : string = "yup it is";
v aChar : char = 'a';
v aInt : int = 123;
v aFloat : float = 1.3;

v aDynamicArray : dynamicArray(5) = [
    'E',
    'L',
    'L',
    'I',
    'E',
];

v aFixedSizeArray : array(2, char) = [
    'I',
    'S'
];

v aCollective : collective(int, string) = {
    0: 'G',
    2: 'O',
    3: 'O',
    4: 'D'
};`)
