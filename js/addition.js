var getDomVal = document.getElementById('val1');
var turingVal = [];
var i;
var j;
var result=0;
var nowState = 0;
var activeState = document.getElementsByClassName('state-active');
var trTape = document.getElementById('turing_tape');
var dispState = document.getElementById('show-state-now');
var dispAnswer = document.getElementById('show-answer');
var stepController = document.getElementById('controller_step');
var initController = document.getElementById('init_step');

//INPUT EXAMPLE; 1+1, 2+2, 5+3

function init(){
    trDelete();
    var nval = getDomVal.value;
    var nvalArr = nval.split("+");
    var nval1 = parseInt(nvalArr[0]);
    var nval2 = parseInt(nvalArr[1]);
    console.log(nval2);
    if(nval1 != undefined && nval2 != undefined){
        turingVal.push(new createState("B"));
        turingVal.push(new createState("B"));
        //if input negative
        if (nval1 < 0){
            newNval1 = nval1 * -1;
        }
        if (nval2 < 0){
            newNval2 = nval2 * -1;
        }
        if (nval1 >= 0){
            newNval1 = nval1;
        }
        if (nval2 >= 0){
            newNval2 = nval2;
        }
        for(i = 0; i < newNval1; i++){
            if (nval1 < 0) {
                turingVal.push(new createState("1"));
            }else {
                turingVal.push(new createState("0"));
            }
        }
        turingVal.push(new createState("C"));
        for(i = 0; i < newNval2; i++){
            if (nval2 < 0) {
                turingVal.push(new createState("1"));
            }else {
                turingVal.push(new createState("0"));
            }
        }
        turingVal.push(new createState("B"));
        turingVal.push(new createState("B"));
        trTape.childNodes[1].classList.add("state-active");
    }else{
        alert('Nilai belum dimasukan/negatif');
    }
    j=2;
    state=0;
}

function createState(val){
    this.val = val;
    var item = document.createElement("p");
    var n = document.createTextNode(this.val);
    item.appendChild(n);
    trTape.appendChild(item);
    this.replaceWith = function(newValue){
        this.val=newValue;
    }
    
}

function displayAnswer(){
    for(i=0; i<turingVal.length; i++){
        console.log(turingVal.length);
        if(turingVal[i].val == "0"){
            result++;
        }
        if(turingVal[i].val == "0"){
            result--;
        }
    }
    dispAnswer.value = result;
}

function displayState(str){
    dispState.textContent = str;
}

function trDelete(){
    dispState.textContent = "null";
    dispAnswer.value = '?';
    trTape.innerHTML = "";
    turingVal = [];
    result = 0;
    stepController.disabled = false;
}

function step(){
    if(turingVal.length){
        for(i=0;i<activeState.length;i++){
            activeState[i].classList.remove("state-active");
        }
    }
    finished = 0;
    //nowState,old value | nextState,newvalue,direction,addblank
    go(0, '0', 0, '0','R',0);
    go(0, 'C', 1, 'C','R',0);
    go(0, '1', 19, '1','R',0);
    go(19, '1', 19, '1','R',0);
    go(19, 'C', 20, 'C','R',0);

    //0C0
    go(1, '0', 2, '0','L',0);
    go(1, 'B', 4, 'B','L',0);
    go(2, 'C', 2, 'C','L',0);
    go(2, 'B', 4, 'B','R',0);
    go(2, '0', 3, '0','L',0);
    go(3, '0', 3, '0','L',0);
    go(3, 'B', 4, 'B','R',0);
    go(4, '0', 5, 'X','R',0);
    go(5, '0', 5, '0','R',0);
    go(5, 'C', 6, 'C','R',0);
    go(6, '0', 6, '0','R',0);
    go(6, 'B', 7, '0','L',1);
    go(7, '0', 7, '0','L',0);
    go(7, 'C', 8, 'C','L',0);
    go(8, '0', 8, '0','L',0);
    go(8, 'X', 4, 'X','R',0);
    go(4, 'C', 9, 'B','R',0);

    //0C1
    go(1, '1', 10, '1','L',0);
    go(10, 'C', 11, 'C','L',0);
    go(11, '0', 11, '0','L',0);
    go(11, 'B', 12, 'B','R',0);
    go(12, '0', 13, 'X','R',0);
    go(13, '0', 13, '0','R',0);
    go(13, 'C', 14, 'C','R',0);
    go(14, 'X', 14, 'X','R',0);
    go(14, '1', 15, 'X','R',0);
    go(15, '1', 16, '1','L',0);
    go(15, 'B', 18, 'B','L',0);
    go(18, 'X', 18, 'X','L',0);
    go(18, 'C', 9, 'X','R',0);
    go(16, 'X', 16, 'X','L',0);
    go(16, 'C', 17, 'C','L',0);
    go(17, '0', 17, '0','L',0);
    go(17, 'X', 12, 'X','R',0);
    go(12, 'C', 9, 'X','R',0);

    //1C0
    go(20, '0', 21, '0','L',0);
    go(21, 'C', 21, 'C','L',0);
    go(21, '1', 22, '1','L',0);
    go(22, '1', 22, '1','L',0);
    go(22, 'B', 23, 'B','R',0);
    go(22, 'B', 23, 'B','R',0);
    go(23, '1', 24, 'X','R',0);
    go(24, '1', 24, '1','R',0);
    go(24, 'C', 25, 'C','R',0);
    go(25, 'X', 25, 'X','R',0);
    go(25, '0', 26, 'X','R',0);
    go(26, '0', 27, '0','L',0);
    go(27, 'X', 27, 'X','L',0);
    go(27, 'C', 28, 'C','L',0);
    go(28, '1', 28, '1','L',0);
    go(28, 'X', 23, 'X','R',0);
    go(26, 'B', 30, 'B','L',0);
    go(30, 'X', 30, 'X','L',0);
    go(30, 'C', 29, 'X','R',0);
    go(23, 'C', 29, 'X','R',0);
    go(20, 'B', 23, 'B','L',0);
    
    //1C1
    go(20, '1', 31, '1','L',0);
    go(31, 'C', 31, 'C','L',0);
    go(31, '1', 32, '1','L',0);
    go(32, '1', 32, '1','L',0);
    go(32, 'B', 33, 'B','R',0);
    go(33, '1', 34, 'X','R',0);
    go(34, '1', 34, '1','R',0);
    go(34, 'C', 35, 'C','R',0);
    go(35, '1', 35, '1','R',0);
    go(35, 'B', 36, '1','L',1);
    go(36, '1', 36, '1','L',0);
    go(36, 'C', 37, 'C','L',0);
    go(37, '1', 37, '1','L',0);
    go(37, 'X', 33, 'X','R',0);
    go(33, 'C', 29, 'X','R',0);

    if(state==9||state==29){
        displayState("Selesai");
        displayAnswer();
        stepController.disabled = true;
    }
}

function go(nowState,oldVal,nextState,newVal,direction,addBlank){
    if(turingVal[j].val == oldVal && state == nowState && finished == 0){
        turingVal[j].replaceWith(newVal);
        trTape.childNodes[j].textContent = newVal;
        trTape.childNodes[j].classList.add("state-active");
        trTape.childNodes[j].scrollIntoView();
        state = nextState;
        displayState("(q"+nowState+" | q"+nextState+") | "+oldVal+"/"+newVal+", "+direction);
        if(addBlank){
            turingVal.push(new createState("B"));
        }
        (direction =='R') ? j++ : j--;
        finished = 1;
    }
}












