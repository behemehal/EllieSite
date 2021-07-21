class Codev {
  #targetDiv;
  #codeViewID;
  #version = "1.1.1";

  #activeLine = 0;
  #activeColumn = 0;

  #codeDiv;
  #lineIndDiv;

  #lines = [];

  #colorize = {
    sfy: {
      reg: new RegExp(/(?!>)string(?!<\/sfy>)(?!>)/g),
      color: "#1400FF",
    },
    cry: {
      reg: new RegExp(/(?!>)char(?!<\/cry>)(?!>)/g),
      color: "#1400FF",
    },
    nmyy: {
      reg: new RegExp(/(?!>)int(?!<\/nmyy>)(?!>)/g),
      color: "#1400FF",
    },
    foint: {
      reg: new RegExp(/(?!>)float(?!<\/foint>)(?!>)/g),
      color: "#1400FF",
    },
    dervy: {
      reg: new RegExp(/(?!>)dynamicArray(?!<\/dervy>)(?!>)/g),
      color: "#1400FF",
    },
    cltvk: {
      reg: new RegExp(/(?!>)collective(?!<\/cltvk>)(?!>)/g),
      color: "#1400FF",
    },
    ryk: {
      reg: new RegExp(/(?!>)array(?!<\/ryk>)(?!>)/g),
      color: "#1400FF",
    },
    fkn: {
      reg: new RegExp(/(?!>)fn(?!<\/fkn>)(?!>)/g),
      color: "#1400FF",
    },
    if: {
      reg: new RegExp(/(?!>)if(?!<\/if>)(?!>)/g),
      color: "#AF00FF",
    },
    ret: {
      reg: new RegExp(/(?!>)ret(?!<\/ret>)(?!>)/g),
      color: "#AF00FF",
    },
    class: {
      reg: new RegExp(/(?!>)class(?!<\/class>)(?!>)/g),
      color: "#AF00FF",
    },
    co: {
      reg: new RegExp(/(?!>)co (?!<\/co>)(?!>)/g),
      color: "#AF00FF",
    },
    for: {
      reg: new RegExp(/(?!>)for (?!<\/for>)(?!>)/g),
      color: "#AF00FF",
    },
    vars: {
      reg: new RegExp(/(c|v|d) /g),
      color: "#AF00FF",
    },
    typeDefChar: {
      reg: new RegExp(/:/g),
      color: "#FF8300",
    },
    eq: {
      reg: new RegExp(/==/g),
      color: "#FF8300",
    },
    ap: {
      reg: new RegExp(/(!?[a-z]|\s|[A-Z])\=(!?[a-z]|\s|[A-Z])/g),
      color: "#FF8300",
    },
    cbraceStart: {
      reg: new RegExp(/{/g),
      color: "#FF8300",
    },
    cbraceEnd: {
      reg: new RegExp(/}/g),
      color: "#FF8300",
    },
    ibraceStart: {
      reg: new RegExp(/\(/g),
      color: "#FF8300",
    },
    ibraceEnd: {
      reg: new RegExp(/\)/g),
      color: "#FF8300",
    },
    srg: {
      reg: new RegExp(/(?!>)(\"+(.)+\")(?!<\/srg>)(?!>)/g),
      color: "#f00",
    },
    crh: {
      reg: new RegExp(/(?!>)(\'+(.)+\')(?!<\/crh>)(?!>)/g),
      color: "#f00",
    },
  };

  constructor(divId, ignoreCss) {
    var q = "ok";
    if (document.getElementById("codev") == null) {
      var stt = document.createElement("style");
      stt.id = "codev";
      stt.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');


        .codeViev[dark] {
        }

        .codeView {
            font-family: 'Fira Code',monospace;
            display: block;
            background-color: #f5eaef;
            height: 100%;
            width: 100%;
            color: #462b45;
            border: 1px solid #462b45;
        }

        .codeView .code {
            height: calc(100% - 20px);
            overflow: auto;
        }

        .codeView .statusBar {
            width: calc(100%);
            height: 20px;
            background-color: #462B45;
            display: flex;
            font-size: 14px;
            color: #F5EAEF;
            line-height: 20px;
            user-select: none;
        }

        .codeView .statusBar .Label {
            margin-left: 10px;
            width: 105px;
            border-right: 1px solid #F5EAEF;
            margin-left: 20px;
        }

        .codeView .statusBar .lineInd {
            margin-left: auto;
            margin-right: 20px;
        }

        .codeView .statusBar .verCode {
            width: 50px;
        }

        .codeView .code {
            overflow:auto;
            font-size: 14px;
        }

        .codeView .code .empty {
            height: 19px;
        }

        .codeView .code .line {
            display: flex;
            height: 19px;
            
        }

        .codeView .code .line .lineInd {
          width: 35px !important;
          text-align: right;
          margin-right: 5px;
          user-select: none;
          min-width: 35px;
        }

        .codeView .code .line .split {
            border-right: 1px solid #462B45;
        }

        .codeView .code .line .lineCode {
            margin-left: 10px;
            white-space: pre;
            min-width: max-content;
        }

        ${Object.entries(this.#colorize)
          .map(
            (x) =>
              ".codeView .code .line .lineCode " +
              x[0] +
              "{ color: " +
              x[1].color +
              ";}"
          )
          .join("\n")}
`;
      document.body.appendChild(stt);
    }

    if (document.getElementById(divId) != null) {
      this.#targetDiv = document.getElementById(divId);
      this.#initializeCodeView();
      this.#render();
    } else {
      throw "Targeted div is not found";
    }
  }

  codeViewId() {
    return this.#codeViewID;
  }

  #generateLineEmpty() {
    var empty = document.createElement("div");
    empty.className = "empty";
    return empty;
  }

  #runRules(text) {
    var re = text;
    Object.entries(this.#colorize).forEach((x) => {
      let reg = RegExp(x[1].reg);
      let item;
      let t = re;

      while ((item = reg.exec(t)) !== null) {
        var data = re.slice(reg.lastIndex - item[0].length, reg.lastIndex);

        var last = re.slice(0, reg.lastIndex - item[0].length);
        var lest = re.slice(reg.lastIndex);
        re = `${last}<${x[0]}>${data}</${x[0]}>${lest}`;
        //console.log(`${last}<${x[0]}item>${data}</${x[0]}item>${lest}`);
      }
    });
    return re;
  }

  #generateLineCode(text, line) {
    var lineDiv = document.createElement("div");
    lineDiv.className = "line";

    var lineInd = document.createElement("div");
    lineInd.className = "lineInd";
    lineInd.innerHTML = line;

    var split = document.createElement("div");
    split.className = "split";

    var codeDiv = document.createElement("div");
    codeDiv.className = "lineCode";
    codeDiv.innerHTML = this.#runRules(text);

    lineDiv.appendChild(lineInd);
    lineDiv.appendChild(split);
    lineDiv.appendChild(codeDiv);
    return lineDiv;
  }

  #render() {
    this.#codeDiv.innerHTML = "";
    for (var i = 0; i < this.#lines.length; i++) {
      this.#codeDiv.appendChild(this.#generateLineCode(this.#lines[i], i + 1));
    }
    for (var i = 0; i < 6; i++) {
      this.#codeDiv.appendChild(this.#generateLineEmpty());
    }
  }

  #initializeCodeView() {
    var div = document.createElement("div");
    div.className = "codeView";

    this.#codeDiv = document.createElement("div");
    this.#codeDiv.className = "code";

    div.appendChild(this.#codeDiv);

    var statusBar = document.createElement("div");
    statusBar.className = "statusBar";

    var label = document.createElement("div");
    label.className = "Label";
    label.innerHTML = "EllieCodev";

    this.#lineIndDiv = document.createElement("div");
    this.#lineIndDiv.className = "lineInd";
    this.#lineIndDiv.innerHTML = `Ln ${this.#activeLine}, Col ${
      this.#activeColumn
    }`;

    var versionDiv = document.createElement("div");
    versionDiv.className = "verCode";
    versionDiv.innerHTML = this.#version;

    statusBar.appendChild(label);
    //statusBar.appendChild(this.#lineIndDiv);
    //statusBar.appendChild(versionDiv);

    div.appendChild(statusBar);
    this.#targetDiv.appendChild(div);
  }

  supplyCode(text) {
    this.#lines = [];
    var whichLineEnding = (source) => {
      var temp = source.indexOf("\n");
      if (source[temp - 1] === "\r") return "\r\n";
      return "\n";
    };
    var code = text.split(whichLineEnding(text));

    function calculateOverflow(text) {
      return {
        has: text.length > 59,
        line: text.slice(0, 59),
        rest: text.slice(59),
      };
    }

    var overflow = "";
    for (var i = 0; i < code.length; i++) {
      var ovw = calculateOverflow(overflow + code[i]);
      if (ovw.has) {
        overflow = ovw.rest;
      } else {
        overflow = "";
      }
      this.#lines.push(ovw.line);
    }

    this.#activeLine = 0;
    this.#activeColumn = 0;
    this.#render();
  }
}

//new Codev("code")
