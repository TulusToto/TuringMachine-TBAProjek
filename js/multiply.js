var nval1 = document.getElementById('val1');
var nval2 = document.getElementById('val2');
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

function init(){
    trDelete();

    //positif x positif
    if(nval1.value > 0 && nval2.value > 0){
        turingVal.push(new createState("B"));
        turingVal.push(new createState("B"));
        for(i = 0; i < nval1.value; i++){
            turingVal.push(new createState("0"));
        }
        turingVal.push(new createState("C"));
        for(i = 0; i < nval2.value; i++){
            turingVal.push(new createState("0"));
        }
        turingVal.push(new createState("C"));
        turingVal.push(new createState("B"));
        turingVal.push(new createState("B"));
        trTape.childNodes[1].classList.add("state-active");
    }
    //positif x negatif
    else if(nval1.value > 0 && nval2.value < 0){
        turingVal.push(new createState("B"));
        turingVal.push(new createState("B"));
        for(i = 0; i < nval1.value; i++){
            turingVal.push(new createState("0"));
        }
        turingVal.push(new createState("C"));
        for(i = 0; i > nval2.value; i--){
            turingVal.push(new createState("1"));
        }
        turingVal.push(new createState("C"));
        turingVal.push(new createState("B"));
        turingVal.push(new createState("B"));
        trTape.childNodes[1].classList.add("state-active");
    }
    //negatif x positif
    else if(nval1.value < 0 && nval2.value > 0){
        turingVal.push(new createState("B"));
        turingVal.push(new createState("B"));
        for(i = 0; i > nval1.value; i--){
            turingVal.push(new createState("1"));
        }
        turingVal.push(new createState("C"));
        for(i = 0; i < nval2.value; i++){
            turingVal.push(new createState("0"));
        }
        turingVal.push(new createState("C"));
        turingVal.push(new createState("B"));
        turingVal.push(new createState("B"));
        trTape.childNodes[1].classList.add("state-active");
    }
    //negatif x negatif
    else if(nval1.value < 0 && nval2.value < 0){
        turingVal.push(new createState("B"));
        turingVal.push(new createState("B"));
        for(i = 0; i > nval1.value; i--){
            turingVal.push(new createState("1"));
        }
        turingVal.push(new createState("C"));
        for(i = 0; i > nval2.value; i--){
            turingVal.push(new createState("1"));
        }
        turingVal.push(new createState("C"));
        turingVal.push(new createState("B"));
        turingVal.push(new createState("B"));
        trTape.childNodes[1].classList.add("state-active");
    }else{

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
        if(turingVal[i].val == "0"  ){
            result++;
        }
        else if (turingVal[i].val == "1"){
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
    if (nval1.value === '0' || nval2.value === '0') {
        dispAnswer.value = '0';
        return;
      }
    
}

function step(){
    if(turingVal.length){
        for(i=0;i<activeState.length;i++){
            activeState[i].classList.remove("state-active");
        }
    }
    finished = 0;
    //nowState,old value | nextState,newvalue,direction,addblank
    //+ | +
    go(0, '0', 1, 'B','R',0);
    go(1, '0', 1, '0','R',0);
    go(1, 'C', 2, 'C','R',0);
    go(2, '0', 3, 'X','R',0);
    go(3, '0', 3, '0','R',0);
    go(3, 'C', 4, 'C','R',0);
    go(4, '0', 4, '0','R',0);
    go(4, '1', 4, '1','R',0);
    go(4, 'B', 5, '0','L',1);
    go(5, '0', 5, '0','L',0);
    go(5, '1', 5, '1','L',0);
    go(5, 'C', 5, 'C','L',0);
    go(5, 'X', 2, 'X','R',0);
    go(2, 'C', 6, 'C','L',0);
    go(6, 'X', 6, '0','L',0);
    go(6, 'C', 7, 'C','L',0);
    go(7, '0', 7, '0','L',0);
    go(7, 'B', 0, 'B','R',0);
    go(0, 'C', 8, 'B','R',0);
    go(8, '0', 8, 'B','R',0);
    go(8, 'C', 9, 'B','R',0);
    go(9, '0', 9, '0','R',0);
    go(9, 'B', 10, 'C','L',0);

    //+ | -
    go(2, '1', 11, 'X','R',0);
    go(11, '1', 11, '1','R',0);
    go(11, 'C', 12, 'C','R',0);
    go(12, '1', 12, '1','R',0);
    go(12, '0', 12, '0','R',0);
    go(12, 'B', 13, '1','L',1);
    go(13, '0', 13, '0','L',0);
    go(13, '1', 13, '1','L',0);
    go(13, 'C', 13, 'C','L',0);
    go(13, '0', 13, '0','L',0);
    go(13, 'X', 2, 'X','R',0);
    go(9, '1', 20, '1','R',0);
    go(20, '1', 20, '1','R',0);
    go(20, '0', 21, '1','R',0);
    go(21, '0', 21, '1','R',0);
    go(21, 'B', 10, 'C','R',0);

    //- | -
    go(0, '1', 14, 'B','R',0);
    go(14, '1', 14, '1','R',0);
    go(14, 'C', 15, 'C','R',0);
    go(15, '1', 16, 'Y','R',0);
    go(16, '1', 16, '1','R',0);
    go(16, 'C', 4, 'C','R',0);
    go(5, 'Y', 15, 'Y','R',0);
    go(15, 'C', 18, 'C','L',0);
    go(18, 'Y', 18, '1','L',0);
    go(18, 'C', 7, 'C','L',0);
    go(7, '1', 7, '1','L',0);
    go(7, 'B', 0, 'B','R',0);
    go(8, '1', 8, 'B','R',0);

    //- | +
    go(15, '0', 17, 'Y','R',0);
    go(17, '0', 17, '0','R',0);
    go(17, 'C', 12, 'C','R',0);
    go(13, 'Y', 15, 'Y','R',0);

    if(state==10){
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