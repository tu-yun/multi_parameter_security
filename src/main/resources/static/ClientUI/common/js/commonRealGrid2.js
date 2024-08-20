/**
 * get checked rows
 * @param gridObj
 * @return rowDatas
 * */
function getGridCheckedRows(gridObj) {
    var rowDatas = [];
    var rows = gridObj.gridView.getCheckedRows();
    for (var i in rows) {
        var data = gridObj.dataProvider.getJsonRow(rows[i]);
        rowDatas.push(data);
    }
    return rowDatas;
}

/**
 * realGrid2 공통 초기 세팅
 *
 * @param id grid div 아이디
 * @param obj grid Object
 * @param data
 * @param columnWidth
 * @param pageSize
 * @param isOnLoadRealGrid
 * @param searchYn
 * @param isNotPaging
 * @return obj
 */
function fn_initRealGrid2(id, obj, data, columnWidth, pageSize, isOnLoadRealGrid, searchYn, isNotPaging) {
    // init
    obj = SimpleRealGrid2(id);
    // set fields
    obj.setFields(JSON.parse(data.fields));
    // set columns
    obj.setColumns(JSON.parse(data.columns));

    // 추가 컬럼 스타일 필요시 배열 생성 후 아래 반복문 실행
    $.each(JSON.parse(data.fields), function (index, item) {
        if (columnWidth.length > index && columnWidth[index]) {
            obj.gridView.setColumnProperty(item.fieldName, "width", columnWidth[index]);
        }
    });
    //header 높이
    obj.gridView.header.height = 45;
    // row 높이
    obj.gridView.setDisplayOptions({
        rowHeight: 41,
    });
    // indicator 사용여부
    obj.gridView.setRowIndicator({
        visible: false
    });

    obj.gridView.setDisplayOptions({
        rowHeight: 41,
        showEmptyMessage: true,
        emptyMessage: searchYn ? "조회된 데이터가 없습니다." : "등록된 데이터가 없습니다"
    });

    if (!isNotPaging && data.list && data.list.length > 0) {
        $(".pagination_area").show();
    } else {
        $(".pagination_area").hide();
    }

    $('#page').val(data.form.page);
    // set data
    obj.setJsonData(data.list);
    // 페이징 추가, param : id, 한화면에 나타낼 페이지 수, 한 페이지에 나타낼 데이터 수, 현재페이지(default:1)
    let totCnt = data.totCnt;
    if (!isNotPaging && isOnLoadRealGrid) {
        obj.setPaging(id + "Page", 10, pageSize, data.form.page, totCnt);
    }
    $("#" + id + "TotalCnt").html(fn_setCommas(totCnt));

    return obj;
}

/* creagrid 공통 */
function fn_commonGrid(data, columnWidth, pageSize, isOnLoadRealGrid, searchYn) {
    // init
    let realGrid2 = SimpleRealGrid2("realgrid");
    // set fields
    realGrid2.setFields(JSON.parse(data.fields));
    // set columns
    realGrid2.setColumns(JSON.parse(data.columns));

    // 추가 컬럼 스타일 필요시 배열 생성 후 아래 반복문 실행
    $.each(JSON.parse(data.fields), function (index, item) {
        if (columnWidth.length > index && columnWidth[index]) {
            realGrid2.gridView.setColumnProperty(item.fieldName, "width", columnWidth[index]);
        }
    });
    //header 높이
    realGrid2.gridView.header.height = 45;
    // row 높이
    realGrid2.gridView.setDisplayOptions({
        rowHeight: 41,
    });
    // indicator 사요여부
    realGrid2.gridView.setRowIndicator({
        visible: false
    });

    realGrid2.gridView.setDisplayOptions({
        rowHeight: 41,
        showEmptyMessage: true,
        emptyMessage: searchYn ? "조회된 데이터가 없습니다." : "등록된 데이터가 없습니다"
    });

    if (data.list && data.list.length > 0 && pageSize > 0) {
        $(".pagination_area").show();
    } else {
        $(".pagination_area").hide();
    }

    $('#page').val(data.form.page);
    // set data
    realGrid2.setJsonData(data.list);
    // 페이징 추가, param : id, 한화면에 나타낼 페이지 수, 한 페이지에 나타낼 데이터 수, 현재페이지(default:1)

    let totCnt = data.totCnt;

    if (isOnLoadRealGrid &&  pageSize > 0) {
        realGrid2.setPaging("realgridPage", 10, pageSize, data.form.page, totCnt);
    }
    $("#realgridTotalCnt").html(fn_setCommas(totCnt));

    return realGrid2;
}

function fn_editGrid(data, columEditList) {
    //그리드 편집 가능
    realGrid2.gridView.setEditOptions({
        editable: true,
        updatable: true
    });

    $.each(JSON.parse(data.fields), function (index, item) {
        if (!columEditList.includes(item.fieldName)) {
            realGrid2.gridView.columnByName(item.fieldName).editable = false;
        }
    });

}

/**
 * 컬럼별 footer 합계 생성
 *
 * @param column gridObj.gridView.columnByName('name')
 */
function setGridFooterByColumnByName(column) {
    column.setFooters({
        numberFormat: "#,##0",
        valueCallback: function (grid, column, footerIndex, columnFooter, value) {
            let sum = 0;
            let prod = grid.getDataSource();
            let cnt = prod.getRowCount();

            for (let i = 0; i < cnt; i++) {
                let value = prod.getValue(i, column.fieldName) ?? 0;
                if (typeof value === 'number') {
                    value = value.toString();
                }
                sum += parseInt(value.replaceAll(',', ''));
            }

            return sum;
        },
    });
}

/**
 * 컬럼별 footer 합계 생성
 *
 * @param column gridObj.gridView.columnByName('name')
 */
function setGridFooterByColumnByNameAndMultipl(column, multipl) {
    column.setFooters({
        numberFormat: "#,##0",
        valueCallback: function (grid, column, footerIndex, columnFooter, value) {
            let sum = 0;
            let prod = grid.getDataSource();
            let cnt = prod.getRowCount();

            for (let i = 0; i < cnt; i++) {
                let value = prod.getValue(i, column.fieldName);
                if (typeof value === 'number') {
                    if (multipl) {
                        value = (value * multipl).toString();
                    }
                }
                sum += parseInt(value.replaceAll(',', ''));
            }

            return sum;
        },
    });
}