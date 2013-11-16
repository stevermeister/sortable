function parseTable(table){
    var data = {headers:[], body:[]},
        row,
        rowData = [],
        rows = table.tBodies[0].rows,
        rowsNumber = rows.length,
        cellsNumber = rows[0].cells.length;

    //parse header
    for(var j = 0; j < cellsNumber; j++){
        rowData.push(rows[0].cells[j].textContent);
    }
    data.headers.push(rowData);

    //parse body
    for(var i = 1; i < rowsNumber; i++){
        row = rows[i];
        rowData = [];
        for(var j = 0; j < cellsNumber; j++){
            rowData.push(row.cells[j].textContent);
        }
        data.body.push(rowData);
    }
    return data;
}

function sort(data, order){

}

function drawTable(table, tableJsonData){
    var cell,
        row = document.createElement('tr'),
        tFragment = document.createElement('documentFragment');

    //draw header
    for(var j=0, len2=tableJsonData.headers[0].length; j<len2; j++){
        cell = document.createElement('th');
        cell.textContent = tableJsonData.headers[0][j];
        row.appendChild(cell);
    }
    tFragment.appendChild(row);

    //draw body
    for(var i=0, len=tableJsonData.body.length; i<len; i++){

        row = document.createElement('tr')

        for(var j=0, len2=tableJsonData.body[i].length; j<len2; j++){
            cell = document.createElement('td');
            cell.textContent = tableJsonData.body[i][j];
            row.appendChild(cell);
        }
        tFragment.appendChild(row);
    }
    console.log(tFragment)
    table.appendChild(tFragment);
}

var table = document.getElementById("taskTable");
var jsonTable = parseTable(table);
table.innerHTML = '';
drawTable(table, jsonTable);


function tableSort(cell){

    var tbl = document.getElementById("taskTable").tBodies[0];
    var store = [];
    for(var i=0, len=tbl.rows.length; i<len; i++){
        var row = tbl.rows[i];
        var sortnr = parseFloat(row.cells[cell].textContent || row.cells[cell].innerText);
        if(!isNaN(sortnr)) store.push([sortnr, row]);
    }
    store.sort(function(x,y){
        return x[0] - y[0];
    });
    for(var i=0, len=store.length; i<len; i++){
        tbl.appendChild(store[i][1]);
    }
    store = null;
}