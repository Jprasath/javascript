let inputValue = document.getElementById('tableInput');
const addVlaue = document.getElementById('addValue');
const rightBtn = document.getElementById('rightClick');
const leftBtn = document.getElementById('leftClick');
const downBtn = document.getElementById('downClick');
const topBtn = document.getElementById('topClick');
const centerBtn = document.getElementById('centerClick');
const colCenterBtn = document.getElementById('colcenterClick');
const rowCenterBtn = document.getElementById('rowcenterClick');
let table,i,j,k,x,activeClass, emptyClass,activeLength;
let ele1 = 'a';
let ele2 = 'b';
let ele3 = 'c';

function createTable(){   
    const num_cols = inputValue.value;
    console.log(num_cols);
    let theader = '<table id="mytable" class="table-wrapper">\n';     
    for(  i=0; i<num_cols;i++){
        theader += "<tr rowIndex="+i+" id="+i+">";       
        for(  j=0; j<num_cols;j++){            
            theader += "<td data-columnIndex="+j+" id="+i+"-"+j+"  class='emptyCell'>";          
            theader += '</td>';
        }
        theader += '</tr>\n';
    }
   
    const tfooter = '</table>';

    document.getElementById('wrapper').innerHTML = theader +  tfooter;
    table = document.getElementById("mytable");       
    let dataA = table.rows[1].cells[0];
    let dataB = table.rows[1].cells[1];
    let dataC = table.rows[2].cells[1];
    dataA.innerHTML = ele1;
    dataA.classList.replace("emptyCell", "active");
    dataB.innerHTML = ele2;
    dataB.classList.replace("emptyCell", "active");
    dataC.innerHTML = ele3;
    dataC.classList.replace("emptyCell", "active");  
    activeCell = document.querySelectorAll(".table-wrapper .active");
}

function checkActiveClass(k,currlength,action){
        activeClass = [];
        emptyClass=[];        
        for(i = 0;i<currlength;i++){
            if(action =='left' || action =='right' || action=="column-center"){
                x = document.getElementById(k+"-"+i);   
            }
            else if(action =='top' || action == 'down' ||  action=="row-center"){
                x = document.getElementById(i+"-"+k);   
            }                
        if(x.classList.contains('active')){
            activeClass.push(k+"-"+i+"-"+x.innerHTML);                
        }
        if(x.classList.contains('emptyCell')){
            emptyClass.push(k+"-"+i);               
        }
        x.classList.replace("active","emptyCell");
    }
}



function rightMove(){
    for( k = 0 ; k<table.rows.length; k++){
        checkActiveClass(k,table.rows[k].cells.length,'right');      
        activeLength = activeClass.length-1;        
         for(j=table.rows[k].cells.length-1; j>=emptyClass.length; --j){           
          let temp = table.rows[k].cells[j];           
            temp.classList.replace("emptyCell", "active");       
            temp.innerHTML=activeClass[activeLength].split("-")[2];                   
            activeLength--; 
        } 
    }
}

function leftMove(){
    for( k = 0 ; k<table.rows.length; k++){ 
        checkActiveClass(k,table.rows[k].cells.length,'left');        
        let activeLength = activeClass.length;            
         for( j=0; j<activeLength; j++){                   
           let temp = table.rows[k].cells[j];            
            temp.classList.replace("emptyCell", "active");                     
           temp.innerHTML=activeClass[j].split("-")[2];                      
        } 
    }           
}

function downMove(){
    for( k=0; k<table.rows[0].cells.length; k++ ){       
        console.log('k-D-',k);
       checkActiveClass(k,table.rows.length,'down');
        let activeLength = activeClass.length-1;
         
         for(j=table.rows.length-1; j>=emptyClass.length; --j){ 
            let temp = table.rows[j].cells[k];           
             temp.classList.replace("emptyCell", "active");       
             temp.innerHTML=activeClass[activeLength].split("-")[2];                   
             activeLength--; 
        }  
    }    
 } 

function topMove(){
    for( k=0; k<table.rows[0].cells.length; k++ ){ 
     checkActiveClass(k,table.rows.length,'top');     
         let activeLength = activeClass.length;
        for(j=0; j<activeLength; j++){       
            let temp = table.rows[j].cells[k];           
            temp.classList.replace("emptyCell", "active");       
            temp.innerHTML=activeClass[j].split("-")[2]; 
        } 
    }    
} 

function colCenterMove(){  
    for(let k = 0 ; k<table.rows.length; k++){
        checkActiveClass(k,table.rows[k].cells.length,'column-center');
        let activeLength = activeClass.length; 
        let tableCellsLength = Math.round(table.rows[k].cells.length/2)-1; 
         for(let j=0; j<activeLength; j++){                     
            let temp = table.rows[k].cells[tableCellsLength];           
            temp.classList.replace("emptyCell", "active");       
            temp.innerHTML=activeClass[j].split("-")[2];
            tableCellsLength--;           
         }             
    }
} 

function rowCenterMove(){ 
    for( k=0; k<table.rows[0].cells.length; k++ ){  
        checkActiveClass(k,table.rows.length,'row-center');
        let activeLength = activeClass.length; 
        let tableCellsLength = Math.round(table.rows[k].cells.length/2)-1; 
         for(let j=0; j<activeLength; j++){                     
            let temp = table.rows[tableCellsLength].cells[k];           
            temp.classList.replace("emptyCell", "active");       
            temp.innerHTML=activeClass[j].split("-")[2];
            tableCellsLength--;           
         }     
    }
} 
 
 document.onkeydown = function(e){
    switch (e.keyCode) {
        case 37:
            leftMove()
            break;
        case 38:
            topMove()
            break;
        case 39:
            rightMove()
            break;
        case 40:
            downMove()
            break;
    }
};

rightBtn.addEventListener('click',rightMove);
leftBtn.addEventListener('click',leftMove);
downBtn.addEventListener('click',downMove);
topBtn.addEventListener('click',topMove);
colCenterBtn.addEventListener('click',colCenterMove);
rowCenterBtn.addEventListener('click',rowCenterMove);

