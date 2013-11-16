(function(){

    function Sortable(tableElement, tableData){

        var self = this;

        if(!tableData){
            tableData = Sortable.parseTable(tableElement);
        }

        sort();

        this.changeOrder = function(column){
            if(tableData.order[column].direction === 'asc'){
                tableData.order[column].direction = 'desc';
            }else{
                tableData.order[column].direction = 'asc';
            }

            sort();
        }

        function sort(){
            tableElement.innerHTML = '';

            tableData.body.sort(function(a, b){
                var cmp;
                for(column in tableData.order){
                    cmp = compare(a[column], b[column], tableData.order[column].type);
                    if(cmp !== 0){
                        return tableData.order[column].direction === 'asc'?cmp:cmp*-1;
                    }
                }

                function compare(a, b, type){
                    if(type === 'number'){
                        return parseFloat(a) - parseFloat(b);
                    }else{
                        if (a < b) return -1;
                        if (a > b) return 1;
                        return 0;
                    }
                }
            });
            drawTable(tableElement, tableData);
        }


        function drawTable(table, tableData){

            drawTableHeader(table, tableData.header);
            drawTableBody(table, tableData.body)
        }

        function drawTableHeader(table, tableHeaderData){
            var sortlink,
                cell,
                row = document.createElement('tr');

            for(var j=0, len2=tableHeaderData.length; j<len2; j++){
                cell = document.createElement('th');
                if(!tableHeaderData[j].order){
                    cell.textContent = tableHeaderData[j].text;
                }else{
                    sortlink = document.createElement('a');
                    sortlink.setAttribute('href', '#');
                    sortlink.textContent = tableHeaderData[j].text;
                    (function(j){
                        sortlink.onclick = function(){
                            self.changeOrder(j)
                            console.log('click', j);
                        }
                    })(j);
                    cell.appendChild(sortlink);
                }

                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        function drawTableBody(table, tableBodyData){
            var cell,
                row = document.createElement('tr'),
                tFragment = document.createDocumentFragment();

            for(var i=0, len=tableBodyData.length; i<len; i++){

                row = document.createElement('tr')

                for(var j=0, len2=tableBodyData[i].length; j<len2; j++){
                    cell = document.createElement('td');
                    cell.textContent = tableBodyData[i][j];
                    row.appendChild(cell);
                }
                tFragment.appendChild(row);
            }
            table.appendChild(tFragment);
        }

    }

    Sortable.parseTable = function (tableElement){
        var data = {header:[], body:[], order:{}},
            cell,
            row,
            rowData = [],
            rows = tableElement.tBodies[0].rows,
            rowsNumber = rows.length,
            cellsNumber = rows[0].cells.length;

        //parse header
        for(var j = 0; j < cellsNumber; j++){
            cell = rows[0].cells[j];


            if(cell.getAttribute('data-sortableOrder')){
                data.order[j] = {
                    direction: cell.getAttribute('data-sortableOrder')?cell.getAttribute('data-sortableOrder'):'asc',
                    type: cell.getAttribute('data-sortableType')?cell.getAttribute('data-sortableType'):'string'
                };
            }

            data.header.push({
                text:cell.textContent,
                order: data.order[j]?true:false
            });

        }

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





    var tables = document.querySelectorAll('.sortable');
    for(var i= 0, len = tables.length; i < len; i++){
        Sortable(tables[i]);
    }


})();

