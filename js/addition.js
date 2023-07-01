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
    go(0, '1', 0, '1','R',0);
    go(0, 'C', 1, 'C','R',0);
    //1C1
    // go(1, '1', 2, '1','L',0);
    // go(2, 'C', 2, 'C','L',0);
    // go(2, '1', 8, '1','L',0);
    // go(8, '1', 8, '1','L',0);
    // go(8, 'B', 11, 'B','R',0);
    // go(11, '1', 11, '0','R',0);
    // go(11, 'C', 11, 'C','R',0);
        //COPY NODE CODE = 44X
        // go(11, 'B', 440, 'B','L',0);
        // go(440, '0', 440, '0','L',0);
        // go(440, '1', 440, '1','L',0);
        // go(440, 'C', 440, 'C','L',0);
        // go(440, 'B', 4412, 'B','R',0);
        // go(4412, '0', 4416, 'X','R',0);
        // go(4416, '0', 4416, '0','R',0);
        // go(4416, 'C', 4421, 'C','R',0);
        // go(4421, '0', 4421, '0','R',0);
        // go(4421, 'B', 4426, '0','L',1);
        // go(4426, '0', 4426, '0','L',0);
        // go(4426, 'C', 4427, 'C','L',0);
        // go(4427, '0', 4427, '0','L',0);
        // go(4427, 'X', 4412, 'X','R',0);
        // go(4412, 'C', 441, 'B','R',0);
        // go(441, '0', 441, '1','R',0);
        // go(441, 'B', 420, 'B','R',0);

    //0C0
    go(1, '0', 3, '0','L',0);
    go(3, 'C', 3, 'C','L',0);
    go(3, '0', 7, '0','L',0);
    go(7, '0', 7, '0','L',0);
    go(7, 'B', 12, 'B','R',0);
    go(12, '0', 16, 'X','R',0);
    go(16, '0', 16, '0','R',0);
    go(16, 'C', 21, 'C','R',0);
    go(21, '0', 21, '0','R',0);
    go(21, 'B', 26, '0','L',1);
    go(26, '0', 26, '0','L',0);
    go(26, 'C', 27, 'C','L',0);
    go(27, '0', 27, '0','L',0);
    go(27, 'X', 12, 'X','R',0);
    go(12, 'C', 420, 'B','R',0);

    //1C0
    // go(1, '0', 3, '0','L',0);
    // go(3, 'C', 3, 'C','L',0);
    // go(3, '1', 5, '1','L',0);
    // go(5, '1', 5, '1','L',0);
    // go(5, 'B', 6, 'B','R',0);
    // go(6, '1', 6, '1','R',0);
    // go(6, 'C', 13, 'C','R',0);
    // go(13, '0', 13, '0','R',0);
    // go(13, 'B', 17, 'B','L',0);
    // go(17, '0', 17, '0','L',0);
    // go(17, '1', 17, '1','L',0);
    // go(17, 'C', 17, 'C','L',0);
    // go(17, 'B', 22, 'B','R',0);
    // go(22, '1', 28, 'X','R',0);
    // go(28, '1', 28, '1','R',0);
    // go(28, 'C', 29, 'C','R',0);
    // go(29, '0', 29, '0','R',0);
    // go(29, 'B', 30, 'B','L',0);
    // go(30, 'C', 32, 'C','R',0);
    // go(32, '1', 32, '1','R',0);
    // go(32, 'B', 31, '1','L',0);
    // go(30, '0', 31, 'B','L',0);
    // go(31, '0', 31, '0','L',0);
    // go(31, '1', 31, '1','L',0);
    // go(31, 'C', 31, 'C','L',0);
    // go(31, 'X', 22, 'X','R',0);
    // go(22, 'C', 420, 'B','R',0);

    // //0C1
    // go(1, '1', 2, '1','L',0);
    // go(2, 'C', 2, 'C','L',0);
    // go(2, '0', 4, '0','L',0);
    // go(4, '0', 4, '0','L',0);
    // go(4, 'B', 9, 'B','R',0);
    //     //COPY FIX NODE CODE = 88X
    //     go(9, '0', 9, '1','R',0);
    //     go(9, 'C', 883, 'C','R',0);
    //     go(883, '1', 883, '0','R',0);
    //     go(883, 'B', 884, 'B','L',0);
    //     go(884, '1', 884, '1','L',0);
    //     go(884, '0', 884, '0','L',0);
    //     go(884, 'C', 884, 'C','L',0);
    //     go(884, 'B', 42, 'B','R',0);
    //     go(42, '1', 48, 'X','R',0);
    //     go(48, '1', 48, '1','R',0);
    //     go(48, 'C', 49, 'C','R',0);
    //     go(49, '0', 49, '0','R',0);
    //     go(49, 'B', 50, 'B','L',0);
    //     go(50, 'C', 52, 'C','R',0);
    //     go(52, '1', 52, '1','R',0);
    //     go(52, 'B', 51, '1','L',0);
    //     go(50, '0', 51, 'B','L',0);
    //     go(51, '0', 51, '0','L',0);
    //     go(51, '1', 51, '1','L',0);
    //     go(51, 'C', 51, 'C','L',0);
    //     go(51, 'X', 42, 'X','R',0);
    //     go(42, 'C', 885, 'B','R',0);
    //     go(885, '1', 885, '0','R',0);
    //     go(885, 'B', 420, 'B','R',0);
    
    if(state==420){
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












