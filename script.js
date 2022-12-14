
const grid = [
    ['1', '6', '8', '', '', '', '9', '', '2'],
    ['', '', '', '3', '', '1', '', '', ''], 
    ['', '3', '', '6', '2', '', '', '', ''], 
    ['', '', '9', '', '', '', '1', '', '6'], 
    ['', '', '1', '', '', '', '3', '7', ''], 
    ['', '4', '3', '5', '', '', '', '', '9'], 
    ['', '', '', '8', '', '2', '6', '', ''], 
    ['', '', '', '9', '', '5', '', '2', '3'], 
    ['2', '', '6', '', '3', '', '7', '', ''], 
];

function drawGrid(){
    let tableDiv = document.createElement("table");
    let rowDiv, colDiv;
    let rowCount = 0;
    let colCount = 0;
    grid.forEach(row => {
        rowDiv = document.createElement("tr");
        colCount = 0;
        row.forEach(col => {
            colDiv = document.createElement("td");
            colDiv.classList.add('row-' + rowCount);
            colDiv.classList.add('col-' + colCount++);
            let inputElement = document.createElement("input");

            if(col.length !== 0){
                inputElement.value = col;
                inputElement.setAttribute("disabled", true);
                inputElement.classList.add('disabledInput');
                colDiv.classList.add('disabledCell');
            }
            colDiv.appendChild(inputElement);
            rowDiv.appendChild(colDiv);
        });
        rowCount++;
        tableDiv.appendChild(rowDiv);
    });
    document.getElementById("grid_div").appendChild(tableDiv);
}

function sudokuChecker(){
    let isGridOk = true;
    for(let i=0; i<grid.length; i++){
        if (!(checkLine(i) && checkColumn(i))){
            isGridOk = false;
        }
    }
    if (!(checkRegions())){
        isGridOk = false;
    }
    showOutput(isGridOk);
}

function checkLine(lineIndex){
    let lineInputList = [];
    for(let colIndex=0; colIndex<grid.length; colIndex++){
        lineInputList.push(document.querySelector(`.row-${lineIndex}.col-${colIndex} input`).value);
    }
    return hasDuplicates(lineInputList);
    
}
function checkColumn(colIndex){
    let colInputList = [];
    for(let lineIndex=0; lineIndex<grid.length; lineIndex++){
        colInputList.push(document.querySelector(`.row-${lineIndex}.col-${colIndex} input`).value);
    }
    return hasDuplicates(colInputList);
}
function checkRegions(){
    let currentBoard = getCurrentBoard();
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid.length; j++){
            if (!isRegionValid(currentBoard, i - i %3, j - j %3)){ return false; }
        }
    }
    return true
}

function  isRegionValid(board, startRow, startCol){
    let st = new Set();
    for(let row = 0; row < 3; row++){
        for(let col = 0; col < 3; col++){
            let curr = board[row + startRow][col + startCol];
            if (st.has(curr)){ return false; }
            if (curr != '.'){ st.add(curr); }
        }
    }
    return true;
}

function getCurrentBoard() {
    let boardInputColList = [];
    let boardInputRowList = [];
    for (let lineIndex = 0; lineIndex < grid.length; lineIndex++) {
        boardInputColList = [];
        for (let colIndex = 0; colIndex < grid.length; colIndex++) {
            boardInputColList.push(document.querySelector(`.row-${lineIndex}.col-${colIndex} input`).value);
        }
        boardInputRowList.push(boardInputColList);
    }
    return boardInputRowList;
}

function hasDuplicates(array) {
    return (new Set(array)).size === array.length;
}

function showOutput(isGridOk){
    let resultDiv = document.getElementById('result_div');
    if(isGridOk){
        resultDiv.innerHTML ="Sudoku is correct !";
    } else {
        resultDiv.innerHTML ="Sudoku is incorrect, try again";
    }
}