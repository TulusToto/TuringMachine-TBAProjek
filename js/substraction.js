//Mengambil elemen Val1 (input nilai)
var getDomVal = document.getElementById('val1');
//Membuat array kosong
var turingVal = [];
//Membuat index
var i;
var j;
//Hasil awal
var result=0;
//Start State
var nowState = 0;
//Mengambil elemen-elemen pada HTML
var activeState = document.getElementsByClassName('state-active');
var trTape = document.getElementById('turing_tape');
var dispState = document.getElementById('show-state-now');
var dispAnswer = document.getElementById('show-answer');
var stepController = document.getElementById('controller_step');
var initController = document.getElementById('init_step');

//INPUT EXAMPLE; 1-1, 2-2, 5-3

function init(){
    trDelete();
    var nval = getDomVal.value;
    var nvalArr = nval.split("C"); //Hapus Case Sensitive
    //Melakukan pengecekan pada int
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
        if (nval1 > 0 || nval1 == 0){
            newNval1 = nval1;
        }
        if (nval2 > 0 || nval2 == 0){
            newNval2 = nval2;
        }
        //Ubah sesuai tipe angka
        for(i = 0; i < newNval1; i++){
            if (nval1 < 0) {
                turingVal.push(new createState("Y"));
            }else {
                turingVal.push(new createState("X"));
            }
        }
        //Buat pembatas
        turingVal.push(new createState("1"));
        for(i = 0; i < newNval2; i++){
            if (nval2 < 0) {
                turingVal.push(new createState("Y"));
            }else {
                turingVal.push(new createState("X"));
            }
        }
        turingVal.push(new createState("B"));
        turingVal.push(new createState("B"));
        trTape.childNodes[1].classList.add("state-active");
    }else{
        alert('Nilai belum dimasukan/negatif');
    }
    //Start State
    j=2;
    state=0;
}

//Membuat Function Constructor 
function createState(val){
    this.val = val;
    var item = document.createElement("p");
    var n = document.createTextNode(this.val);
    item.appendChild(n);
    trTape.appendChild(item);
    //Merubah nilai value
    this.replaceWith = function(newValue){
        this.val=newValue;
    }
    
}

//Print jawaban
function displayAnswer(){
    for(i=0; i<turingVal.length; i++){
        console.log(turingVal.length);
        if(turingVal[i].val === "X"){
            result++;
        }
        else if(turingVal[i].val === "Y"){
            result--;
        }
        else if(turingVal[i].val === "B"){
            result + 0;
        }
    }
    console.log(result);
    dispAnswer.value = result;
}

//Print State dalam bentuk string
function displayState(str){
    dispState.textContent = str;
}

//Clear Turing Machine
function trDelete(){
    dispState.textContent = "null";
    dispAnswer.value = '0';
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
    //Start State
    go(0, 'X', 1, 'X','R',0);
    go(0, 'Y', 12, 'Y','R',0);
    go(0, '1', 24, 'B','R',0);
    //Case Positive (X)
    //(q1)
    go(1, 'X', 1, 'X', 'R', 0 );
    go(1, 'Y', 1, 'Y', 'R', 0 );
    go(1, '1', 1, '1', 'R', 0 );
    go(1, 'B', 2, 'B', 'L', 0 );
    //(q2)
    go(2, 'X', 3, 'B', 'L', 0 );
    go(2, 'Y', 8, 'B', 'L', 0 );
    go(2, '1', 11, 'B', 'R', 0 ); //Accept Case X - X = X or X - 0
    //(q3)
    go(3, 'X', 3, 'X', 'L', 0 );
    go(3, '1', 3, '1', 'L', 0 );
    go(3, 'B', 4, 'B', 'R', 0 );
    //(q4)
    // go(4, 'X', 1, 'B', 'R', 0 );
    go(4, '1', 5, 'B', 'R', 0 );
    go(4, 'X', 101, 'B', 'R', 0 );//Tambahan
    go(101,'1', 5, 'B', 'R', 0);//Tambahan
    go(101,'X', 1, 'X', 'R', 0);//Tambahan
    //(q5)
    go(5, 'X', 6, 'Y', 'R', 0 );
    //(q6)
    go(6, 'X', 6, 'Y', 'R', 0 );
    go(6, 'B', 7, 'B', 'R', 0 ); //Accept Case X-X = Y
    //(q7)
    //Accept State Accept Case X-Y = X
    //(q8)
    go(8, 'Y', 8, 'Y', 'L', 0);
    go(8, '1', 9, 'X', 'R', 0);
    //(q9)
    go(9, 'Y', 8, 'X', 'R', 0);
    go(9, 'B', 10, 'B', 'R', 0);//Accept Case X-Y = X
    //(q10)
    //Accept State Accept Case X-X = Y
    //(q11)
    //Accept State Accept Case X - X = X or X - 0

    //Case Negative (Y)
    go(12, 'X', 12, 'X', 'R', 0 );
    go(12, 'Y', 12, 'Y', 'R', 0 );
    go(12, '1', 12, '1', 'R', 0 );
    go(12, 'B', 13, 'B', 'L', 0 );
    //(q13)
    go(13, 'X', 14, 'B', 'L', 0 );
    go(13, 'Y', 17, 'B', 'L', 0 );
    go(13, '1', 23, 'B', 'R', 0 ); //Accept Case Y - Y = Y or Y - 0
    //(q14)
    go(14, 'X', 14, 'X', 'L', 0 );
    go(14, '1', 15, 'Y', 'R', 0 );
    //(q15)
    go(15, 'X', 15, 'Y', 'R', 0 );
    go(15, 'B', 16, 'B', 'R', 0 );//Accept Case Y - X = Y
    //(q16)
    //Accepet State Accept Case Y - X = Y
    //(q17)
    go(17, '1', 17, '1', 'L', 0 );
    go(17, 'Y', 17, 'Y', 'L', 0 );
    go(17, 'B', 18, 'B', 'R', 0 );
    //(q18)
    go(18, 'Y', 19, 'B', 'R', 0 );
    //(q19)
    go(19, 'Y', 12, 'Y', 'R', 0 ); 
    go(19, '1', 20, 'B', 'R', 0 ); 
    //(q20)
    go(20, 'Y', 21, 'X', 'R', 0 ); 
    //(q21)
    go(21, 'Y', 21, 'X', 'R', 0 ); 
    go(21, 'B', 22, 'B', 'R', 0 ); //Accept Case Y-Y = X
    //(q22)
    //Accept State Accept Case Y-Y = X
    //(q23)
    //Accept State Accept Case Y - Y = Y or Y - 0

    //Case 0-Y or 0-X or 0-0
    //q(24)
    go(24, 'X', 24, 'Y', 'R', 0 ); 
    go(24, 'Y', 24, 'X', 'R', 0 ); 
    go(24, 'B', 25, 'B', 'R', 0 ); //Accept Case 0-Y or 0-X or 0-0
    //q(25)
    //Accept State Accept Case 0-Y or 0-X or 0-0
    
    
    if(state == 7 || state == 10 || state == 11 || state == 16 || state == 22 || state == 23 || state == 25){
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












