var nval1 = document.getElementById("val1");
var turingVal = [];
var i;
var j;
var result = 1;
var nowState = 0;
var activeState = document.getElementsByClassName("state-active");
var trTape = document.getElementById("turing_tape");
var dispState = document.getElementById("show-state-now");
var dispAnswer = document.getElementById("show-answer");
var stepController = document.getElementById("controller_step");
var initController = document.getElementById("init_step");

//misal inputnya 5, bakal generate tape ex. BB00000BB
function init() {
  trDelete();
  //generate BB
  if (nval1.value > 0) {
    turingVal.push(new createState("B"));
    turingVal.push(new createState("B"));
    //generate 0^nval1 sesuai dengan value dari nval1 / input
    for (i = 0; i < nval1.value; i++) {
      turingVal.push(new createState("1"));
    }
    //generate BB
    turingVal.push(new createState("B"));
    turingVal.push(new createState("B"));
    trTape.childNodes[1].classList.add("state-active"); //set index 1 di tape aktif
  } else {
    alert("Nilai belum dimasukan/negatif");
  }
  j = 2;
  state = 0;
}
//buat generate per blok state
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

function displayAnswer() {
  for (i = 0; i < turingVal.length; i++) {
    console.log(turingVal.length);
    if (turingVal[i].val == "1") {
      result++;
    }
  }
  dispAnswer.value = result;
}

function displayState(str) {
  dispState.textContent = str;
}

function trDelete() {
  dispState.textContent = "null";
  dispAnswer.value = "?";
  trTape.innerHTML = "";
  turingVal = [];
  result = 0;
  stepController.disabled = false;
}

function step() {
  if (turingVal.length) {
    for (i = 1; i < activeState.length; i++) {
      activeState[i].classList.remove("state-active");
    }
  }
  finished = 0;
  //nowState,old value | nextState,newvalue,direction,addblank
  go(0, "1", 1, "1", "R", 0);

  go(1, "1", 2, "1", "R", 0);

  go(2, "1", 3, "X", "R", 0);

  go(3, "X", 3, "X", "R", 0);
  go(3, "1", 4, "X", "L", 0);

  go(4, "1", 4, "1", "L", 0);
  go(4, "X", 4, "X", "L", 0);
  go(4, "0", 4, "0", "L", 0);
  go(4, "B", 5, "B", "R", 0);

  go(5, "1", 5, "0", "R", 0);
  go(5, "X", 6, "1", "R", 0);
  go(5, "0", 6, "1", "R", 0);

  go(6, "0", 6, "0", "R", 0);
  go(6, "1", 6, "1", "R", 0);
  go(6, "X", 3, "X", "R", 0);

  go(3, "B", 7, "B", "L", 0);

  go(7, "X", 7, "B", "L", 0);
  go(7, "0", 7, "0", "L", 0);
  go(7, "1", 7, "1", "L", 0);
  go(7, "B", 8, "B", "R", 0);

  go(8, "0", 8, "1", "R", 0);
  go(8, "1", 9, "1", "R", 0);

  go(9, "0", 9, "1", "R", 0);
  go(9, "1", 10, "1", "R", 0);
  go(9, "B", 11, "B", "L", 0);

  go(10, "1", 10, "1", "R", 0);
  go(10, "0", 10, "1", "R", 0);
  go(10, "B", 12, "B", "L", 0);

  go(2, "B", 11, "B", "L", 0);
  go(1, "B", 11, "B", "L", 0);
  go(11, "1", 12, "B", "R", 0);
  go(0, "B", 12, "B", "R", 0);
  if (state == 12) {
    displayState("Selesai");
    displayAnswer();
    stepController.disabled = true;
  }
}

function go(nowState, oldVal, nextState, newVal, direction, addBlank) {
  if (turingVal[j].val == oldVal && state == nowState && finished == 0) {
    turingVal[j].replaceWith(newVal);
    trTape.childNodes[j].textContent = newVal;
    trTape.childNodes[j].classList.add("state-active");
    trTape.childNodes[j].scrollIntoView();
    state = nextState;
    displayState("(q" + nowState + " | q" + nextState + ") | " + oldVal + "/" + newVal + ", " + direction);
    if (addBlank) {
      turingVal.push(new createState("B"));
    }
    direction == "R" ? j++ : j--;
    finished = 1;
  }
}
