//Ambil nilai input
var nval1 = document.getElementById("val1");
var nval2 = document.getElementById("val2");
//Track Turing
var turingVal = [];
var turingVal2 = [];
var turingVal3 = [];
//Indexing
var i;
//Tape Turing
var j;
var k;
var l;
//Nilai akhir
var result = 0;
//State sekarang
var nowState = 0;
//DOM value
var activeState = document.getElementsByClassName("state-active"); //currState
var trTape = document.getElementById("turing_tape"); //Tape1
var trTape2 = document.getElementById("turing_tape2"); //Tape2
var trTape3 = document.getElementById("turing_tape3"); //Tape3
var dispState = document.getElementById("show-state-now"); //Tampilkan State
var dispAnswer = document.getElementById("show-answer"); //Tampilkan nilai akhir
var stepController = document.getElementById("controller_step"); //Step berikutnya
var instantController = document.getElementById("controller_instant"); //Step berikutnya
var initController = document.getElementById("init_step"); //Submit
var accept = false;
function init() {
  trDelete(); //Clear Turing

  //positif x positif
  if (nval1.value > 0 && nval2.value > 0) {
    //Nilai Blank Awal
    for (i = 0; i < 2; i++) {
      turingVal.push(new createState("B"));
      turingVal2.push(new createState2("B"));
      turingVal3.push(new createState3("B"));
    }
    //Looping nilai 1
    for (i = 0; i < nval1.value; i++) {
      turingVal.push(new createState("X"));
    }
    //Looping nilai 2
    for (i = 0; i < nval2.value; i++) {
      turingVal2.push(new createState2("X"));
    }
    //Menyetarakan Panjang array 1 dan 2
    if (turingVal.length < turingVal2.length) {
      while (turingVal.length < turingVal2.length) {
        turingVal.push(new createState("B"));
      }
    } else if (turingVal2.length < turingVal.length) {
      while (turingVal2.length < turingVal.length) {
        turingVal2.push(new createState2("B"));
      }
    }

    if (turingVal.length == turingVal2.length) {
      //Menyetarakan Nilai Blank
      for (i = 2; i < turingVal.length; i++) {
        turingVal3.push(new createState3("B"));
      }
      //Nilai Blank akhir
      for (i = 0; i < 2; i++) {
        turingVal.push(new createState("B"));
        turingVal2.push(new createState2("B"));
        turingVal3.push(new createState3("B"));
      }
      //Start State
      trTape.childNodes[2].classList.add("state-active");
      trTape2.childNodes[1].classList.add("state-active");
      trTape3.childNodes[1].classList.add("state-active");
    }
  }

  //positif x negatif
  if (nval1.value > 0 && nval2.value < 0) {
    //Nilai Blank Awal
    var intNval2 = parseInt(nval2.value);

    var newNval2 = Math.abs(intNval2);
    console.log(newNval2);
    for (i = 0; i < 2; i++) {
      turingVal.push(new createState("B"));
      turingVal2.push(new createState2("B"));
      turingVal3.push(new createState3("B"));
    }
    //Looping nilai 1
    for (i = 0; i < nval1.value; i++) {
      turingVal.push(new createState("X"));
    }
    //Looping nilai 2
    for (i = 0; i < newNval2; i++) {
      turingVal2.push(new createState2("Y"));
    }
    //Menyetarakan Panjang array 1 dan 2
    if (turingVal.length < turingVal2.length) {
      while (turingVal.length < turingVal2.length) {
        turingVal.push(new createState("B"));
      }
    } else if (turingVal2.length < turingVal.length) {
      while (turingVal2.length < turingVal.length) {
        turingVal2.push(new createState2("B"));
      }
    }

    if (turingVal.length == turingVal2.length) {
      //Menyetarakan Nilai Blank
      for (i = 2; i < turingVal.length; i++) {
        turingVal3.push(new createState3("B"));
      }
      //Nilai Blank akhir
      for (i = 0; i < 2; i++) {
        turingVal.push(new createState("B"));
        turingVal2.push(new createState2("B"));
        turingVal3.push(new createState3("B"));
      }
      //Start State
      trTape.childNodes[2].classList.add("state-active");
      trTape2.childNodes[1].classList.add("state-active");
      trTape3.childNodes[1].classList.add("state-active");
    }
  }

  
  //negatif x negatif
  if (nval1.value < 0 && nval2.value < 0) {
    var intNval1 = parseInt(nval1.value);
    var intNval2 = parseInt(nval2.value);

    var newNval1 = Math.abs(intNval1);
    var newNval2 = Math.abs(intNval2);

    //Nilai Blank Awal
    for (i = 0; i < 2; i++) {
      turingVal.push(new createState("B"));
      turingVal2.push(new createState2("B"));
      turingVal3.push(new createState3("B"));
    }
    //Looping nilai 1
    for (i = 0; i < newNval1; i++) {
      turingVal.push(new createState("Y"));
    }
    //Looping nilai 2
    for (i = 0; i < newNval2; i++) {
      turingVal2.push(new createState2("Y"));
    }
    //Menyetarakan Panjang array 1 dan 2
    if (turingVal.length < turingVal2.length) {
      while (turingVal.length < turingVal2.length) {
        turingVal.push(new createState("B"));
      }
    } else if (turingVal2.length < turingVal.length) {
      while (turingVal2.length < turingVal.length) {
        turingVal2.push(new createState2("B"));
      }
    }

    if (turingVal.length == turingVal2.length) {
      //Menyetarakan Nilai Blank
      for (i = 2; i < turingVal.length; i++) {
        turingVal3.push(new createState3("B"));
      }
      //Nilai Blank akhir
      for (i = 0; i < 2; i++) {
        turingVal.push(new createState("B"));
        turingVal2.push(new createState2("B"));
        turingVal3.push(new createState3("B"));
      }
      //Start State
      trTape.childNodes[2].classList.add("state-active");
      trTape2.childNodes[1].classList.add("state-active");
      trTape3.childNodes[1].classList.add("state-active");
    }
  }

  //negatif x positif
  if (nval1.value < 0 && nval2.value > 0) {
    var intNval1 = parseInt(nval1.value);
    var newNval1 = Math.abs(intNval1);

    //Nilai Blank Awal
    for (i = 0; i < 2; i++) {
      turingVal.push(new createState("B"));
      turingVal2.push(new createState2("B"));
      turingVal3.push(new createState3("B"));
    }
    //Looping nilai 1
    for (i = 0; i < newNval1; i++) {
      turingVal.push(new createState("Y"));
    }
    //Looping nilai 2
    for (i = 0; i < nval2.value; i++) {
      turingVal2.push(new createState2("X"));
    }
    //Menyetarakan Panjang array 1 dan 2
    if (turingVal.length < turingVal2.length) {
      while (turingVal.length < turingVal2.length) {
        turingVal.push(new createState("B"));
      }
    } else if (turingVal2.length < turingVal.length) {
      while (turingVal2.length < turingVal.length) {
        turingVal2.push(new createState2("B"));
      }
    }

    if (turingVal.length == turingVal2.length) {
      //Menyetarakan Nilai Blank
      for (i = 2; i < turingVal.length; i++) {
        turingVal3.push(new createState3("B"));
      }
      //Nilai Blank akhir
      for (i = 0; i < 2; i++) {
        turingVal.push(new createState("B"));
        turingVal2.push(new createState2("B"));
        turingVal3.push(new createState3("B"));
      }
      //Start State
      trTape.childNodes[2].classList.add("state-active");
      trTape2.childNodes[1].classList.add("state-active");
      trTape3.childNodes[1].classList.add("state-active");
    }
  }

  j = 2;
  state = 0;
  k = 1;
  l = 1;
  state = 0;
}

//Buat Tape baru 1
function createState(val) {
  this.val = val;
  var item = document.createElement("p");
  var n = document.createTextNode(this.val);
  item.appendChild(n);
  trTape.appendChild(item);
  this.replaceWith = function (newValue) {
    this.val = newValue;
  };
}
//Buat Tape baru 2
function createState2(val2) {
  this.val = val2;
  var item2 = document.createElement("p");
  var n2 = document.createTextNode(this.val);
  item2.appendChild(n2);
  trTape2.appendChild(item2);
  this.replaceWith = function (newValue) {
    this.val = newValue;
  };
}
//Buat Tape baru 3
function createState3(val3) {
  this.val = val3;
  var item3 = document.createElement("p");
  var n3 = document.createTextNode(this.val);
  item3.appendChild(n3);
  trTape3.appendChild(item3);
  this.replaceWith = function (newValue) {
    this.val = newValue;
  };
}
//Tampilkan Output
function displayAnswer() {
  for (i = 0; i < turingVal3.length; i++) {
    console.log(turingVal3.length);
    if (turingVal3[i].val == "X") {
      result++;
    } else if (turingVal3[i].val == "Y") {
      result--;
    }
  }
  dispAnswer.value = result;
}

function displayState(str) {
  dispState.textContent = str;
}

//Clear Tape
function trDelete() {
    accept = false;
  dispState.textContent = "null";
  dispAnswer.value = "0";
  trTape.innerHTML = "";
  trTape2.innerHTML = "";
  trTape3.innerHTML = "";
  turingVal = [];
  turingVal2 = [];
  turingVal3 = [];
  result = 0;
  stepController.disabled = false;
}

//Perpindahan State & Tape
function step() {
  if (turingVal.length) {
    for (i = 0; i < activeState.length; i++) {
      activeState[i].classList.remove("state-active");
      activeState[i].classList.remove("state-active");
      activeState[i].classList.remove("state-active");
    }
  }
  finished = 0;
  //nowState,oldvalue1,oldvalue2 | nextState,newvalue1,newvalue2,dir1,dir2,dir3,addblank

  //positif / positif
  go(0, "X", "B", "B", 1, "X", "B", "B", "R", "R", "S", 0);
  go(0, "B", "X", "B", 10, "B", "X", "B", "S", "S", "S", 0); //Accept Case 0/X
  go(1, "X", "X", "B", 2, "X", "X", "B", "R", "R", "S", 0);
  go(2, "X", "X", "B", 2, "X", "X", "B", "R", "R", "S", 0);
  go(2, "X", "B", "B", 2, "X", "B", "B", "R", "S", "S", 0);
  go(2, "B", "X", "B", 2, "B", "X", "B", "S", "R", "S", 0);
  go(2, "B", "B", "B", 3, "B", "B", "B", "L", "L", "S", 0);
  go(3, "X", "X", "B", 3, "B", "Z", "B", "L", "L", "S", 0);
  go(3, "X", "B", "B", 4, "X", "B", "X", "R", "R", "R", 0);
  go(3, "B", "X", "B", 5, "B", "X", "B", "S", "S", "S", 0); //Accept Case X/X = X modulo
  go(3, "B", "B", "B", 5, "B", "B", "X", "S", "S", "S", 0); //Accept Case X/X = X (modulo = 0)
  go(4, "B", "Z", "B", 4, "B", "X", "B", "S", "R", "S", 0);
  go(4, "B", "B", "B", 3, "B", "B", "B", "L", "L", "S", 0);
  //(q5) Accept State

  //positif / negatif
  go(1, "X", "Y", "B", 6, "X", "Y", "B", "R", "R", "S", 0);
  go(6, "X", "Y", "B", 6, "X", "Y", "B", "R", "R", "S", 0);
  go(6, "X", "B", "B", 6, "X", "B", "B", "R", "S", "S", 0);
  go(6, "B", "Y", "B", 6, "B", "Y", "B", "S", "R", "S", 0);
  go(6, "B", "B", "B", 7, "B", "B", "B", "L", "L", "S", 0);
  go(7, "X", "Y", "B", 7, "B", "Z", "B", "L", "L", "S", 0);
  go(7, "X", "B", "B", 8, "X", "B", "Y", "R", "R", "R", 0);
  go(7, "B", "Y", "B", 9, "B", "Y", "B", "S", "S", "S", 0); //Accept Case  X/Y = Y Modulo
  go(7, "B", "B", "B", 9, "B", "B", "Y", "S", "S", "S", 0); //Accept Case  X/Y = Y (Modulo = 0)
  go(8, "B", "Z", "B", 8, "B", "Y", "B", "S", "R", "S", 0);
  go(8, "B", "B", "B", 7, "B", "B", "B", "L", "L", "S", 0);
  //(q9) Accept State

  //0/X or 0/Y
  go(0, "B", "X", "B", 10, "B", "X", "B", "S", "S", "S", 0); //Accept Case 0/X
  go(0, "B", "Y", "B", 10, "B", "Y", "B", "S", "S", "S", 0); //Accept Case 0/Y

  //negatif / positif
  go(0, "Y", "B", "B", 11, "Y", "B", "B", "R", "R", "S", 0);
  go(11, "Y", "X", "B", 16, "Y", "X", "B", "R", "R", "S", 0);
  go(16, "Y", "X", "B", 16, "Y", "X", "B", "R", "R", "S", 0);
  go(16, "Y", "B", "B", 16, "Y", "B", "B", "R", "S", "S", 0);
  go(16, "B", "X", "B", 16, "B", "X", "B", "S", "R", "S", 0);
  go(16, "B", "B", "B", 17, "B", "B", "B", "L", "L", "S", 0);
  go(17, "Y", "X", "B", 17, "B", "Z", "B", "L", "L", "S", 0);
  go(17, "Y", "B", "B", 18, "Y", "B", "Y", "R", "R", "R", 0);
  go(17, "B", "X", "B", 19, "B", "X", "B", "S", "S", "S", 0); //Accept Case Y/X = Y Modulo
  go(17, "B", "B", "B", 19, "B", "B", "Y", "S", "S", "S", 0); //Accept Case Y/X = Y (Modulo 0)
  go(18, "B", "Z", "B", 18, "B", "X", "B", "S", "R", "S", 0);
  go(18, "B", "B", "B", 17, "B", "B", "B", "L", "L", "S", 0);
  //q(19) Accept State

  //negatif / negatif
  go(11, "Y", "Y", "B", 12, "Y", "Y", "B", "R", "R", "S", 0);
  go(12, "Y", "Y", "B", 12, "Y", "Y", "B", "R", "R", "S", 0);
  go(12, "Y", "B", "B", 12, "Y", "B", "B", "R", "S", "S", 0);
  go(12, "B", "Y", "B", 12, "B", "Y", "B", "S", "R", "S", 0);
  go(12, "B", "B", "B", 13, "B", "B", "B", "L", "L", "S", 0);
  go(13, "Y", "Y", "B", 13, "B", "Z", "B", "L", "L", "S", 0);
  go(13, "Y", "B", "B", 14, "Y", "B", "X", "R", "R", "R", 0);
  go(13, "B", "X", "B", 15, "B", "X", "B", "S", "S", "S", 0); //Accept Case Y/Y = X Modulo
  go(13, "B", "B", "B", 15, "B", "B", "X", "S", "S", "S", 0); //Accept Case Y/Y = X (Modulo 0)
  go(14, "B", "B", "B", 13, "B", "B", "B", "L", "L", "S", 0);
  //q(15) Accept State

  if (state == 5 || state == 9 || state == 10 || state == 15 || state == 19) {
    accept = true;
    displayState("Selesai");
    displayAnswer();
    stepController.disabled = true;
  }
}

function instant() {
    if (!accept) {
      setTimeout(function () {
        step();
        instant(); // Call instant() again after the interval
      }, 25);
    }
  }


function go(
  nowState,
  oldVal,
  oldVal2,
  oldVal3,
  nextState,
  newVal,
  newVal2,
  newVal3,
  directiont1,
  directiont2,
  directiont3,
  addBlank
) {
  if (
    turingVal[j].val == oldVal &&
    turingVal2[k].val == oldVal2 &&
    turingVal3[l].val == oldVal3 &&
    state == nowState &&
    finished == 0
  ) {
    turingVal[j].replaceWith(newVal);
    turingVal2[k].replaceWith(newVal2);
    turingVal3[l].replaceWith(newVal3);
    trTape.childNodes[j].textContent = newVal;
    trTape2.childNodes[k].textContent = newVal2;
    trTape3.childNodes[l].textContent = newVal3;
    trTape.childNodes[j].classList.add("state-active");
    trTape2.childNodes[k].classList.add("state-active");
    trTape3.childNodes[l].classList.add("state-active");
    trTape.childNodes[j].scrollIntoView();
    trTape2.childNodes[k].scrollIntoView();
    trTape3.childNodes[l].scrollIntoView();
    state = nextState;
    displayState(
      "(q" +
        nowState +
        " | q" +
        nextState +
        ") | " +
        oldVal +
        "," +
        oldVal2 +
        "," +
        oldVal3 +
        "/" +
        newVal +
        "," +
        newVal2 +
        "," +
        newVal3 +
        ", " +
        directiont1 +
        "," +
        directiont2 +
        "," +
        directiont3
    );
    if (addBlank) {
      turingVal.push(new createState("B"));
      turingVal2.push(new createState2("B"));
      turingVal3.push(new createState3("B"));
    }
    decide(directiont1, directiont2, directiont3);
    finished = 1;
  }
}

function decide(dt1, dt2, dt3) {
  //mungkin ganti switch case
  if (dt1 == "R") {
    j++;
  } else if (dt1 == "L") {
    j--;
  } else {
    j;
  }
  if (dt2 == "R") {
    k++;
  } else if (dt2 == "L") {
    k--;
  } else {
    k;
  }
  if (dt3 == "R") {
    l++;
  } else if (dt3 == "L") {
    l--;
  } else {
    l;
  }
}
