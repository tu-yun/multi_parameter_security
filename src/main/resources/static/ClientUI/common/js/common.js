function convertFormToJSON(form) {
    return $(form)
        .serializeArray()
        .reduce(function (json, {name, value}) {
            if (value != null) {
                json[name] = value;
                return json;
            }
        }, {});
}

//serializeArray data function
function objectifyForm(formArray) {
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

function getCenterLeft(nWidth) {
    var nAvail = getMaxWidth() - nWidth;
    if (nAvail <= 0)
        return 0;
    return parseInt(Number(nAvail / 2));

}

function getCenterTop(nHeight) {
    var nAvail = getMaxHeight() - nHeight;
    if (nAvail <= 0)
        return 0;
    return parseInt(Number(nAvail / 2));

}

function getMaxWidth() {
    return screen.availWidth;
}

function getMaxHeight() {
    return screen.availHeight - 55;
}

function openPopUpWindow(strURL, strName, nWidth, nHeight, nScrollbars, option) {
    var strMsg = "can't open popup window";
    var strFeatures = "";

    var nTop = getCenterTop(nHeight);
    var nLeft = getCenterLeft(nWidth);

    var nToolbar = 0;
    var nDirectory = 0;
    var nFullscreen = 0;

    var nLocation = 0;
    var nMenubar = 0;
    var nResizable = 1;
    var nScrollbars = nScrollbars;
    var nStatus = 0;
    var nTitlebar = 1;
    strFeatures = "top=" + (option && option.top ? option.top : nTop);
    strFeatures += ",left=" + (option && option.left ? option.left : nLeft);
    strFeatures += ",width=" + (option && option.width ? option.width : nWidth);
    strFeatures += ",height=" + (option && option.height ? option.height : nHeight);
    strFeatures += ",toolbar=" + (option && option.toolbar ? option.toolbar : nToolbar);
    strFeatures += ",directory=" + (option && option.directory ? option.directory : nDirectory);
    strFeatures += ",fullscreen=" + (option && option.fullscreen ? option.fullscreen : nFullscreen);
    strFeatures += ",location=" + (option && option.location ? option.location : nLocation);
    strFeatures += ",menubar=" + (option && option.menubar ? option.menubar : nMenubar);
    strFeatures += ",resizable=" + (option && option.resizable ? option.resizable : nResizable);
    strFeatures += ",scrollbars =" + (option && option.scrollbars != null ? option.scrollbars : nScrollbars);
    strFeatures += ",status=" + (option && option.status ? option.status : nStatus);
    strFeatures += ",titlebar=" + (option && option.titlebar ? option.titlebar : nTitlebar);
    try {

        var popWnd = window.open(strURL, strName, strFeatures);

        if (popWnd == null) {
            //alert(strMsg);
            return null;
        }
        popWnd.focus();
        return popWnd;
    } catch (e) {
        alert(e.message);
        return null;
    }

}

function makeYearOption(option) {
    var now = new Date();
    var _option = {
        'count': option && option.count ? option.count : 5,
        'startYear': option && option.startYear ? option.startYear : 2000,
        'endYear': option && option.endYear ? option.endYear : now.getFullYear(),
        'all': option && option.all != null ? option.all : true,
        'selected': option && option.selected ? option.selected : ''
    }
    var rtnHtml = "";
    if (_option.all == true) {
        rtnHtml += "<option value=''>:전체:</option>";
    }
    if (_option.count > 0) {
        for (var y = now.getFullYear(); y > (now.getFullYear() - _option.count); y--) {
            rtnHtml += "<option value='" + y + "'"
            if (_option.selected == y) {
                rtnHtml += " selected "
            }
            rtnHtml += ">" + y + "</option>";
        }
    } else {
        for (var y = _option.startYear; y <= _option.endYear; y++) {
            rtnHtml += "<option value='" + y + "'"
            if (_option.selected == y) {
                rtnHtml += " selected "
            }
            rtnHtml += ">" + y + "</option>";
        }
    }
    return rtnHtml;
}

function fnTableToExcel(tableId, fileNm) {
    var table = $("#" + tableId);
    if (table && table.length) {
        var preserveColors = (table.hasClass('table2excel_with_colors') ? true : false);
        $(table).table2excel({
            exclude: ".noExl",
            name: "Excel Document Name",
            filename: fileNm + '.xls',
            fileext: ".xls",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true,
            preserveColors: preserveColors
        });
    } else {
        alert("존재하지 않는 테이블 입니다.");
        return false;
    }
}

/**
 * 다중 그리드 Excel 다운로드
 * @param fileName
 * @param exportGrids
 */
function fnGridsToExcel(fileName, exportGrids) {
    RealGrid.exportGrid({
        type: 'excel',
        target: 'local',
        fileName: fileName,
        exportGrids: exportGrids
    })
}

/**
 * 그리드 Excel 다운로드
 * @param grid
 * @param fileTitle
 * @param showProgress
 * @param indicator
 * @param header
 * @param footer
 */
function fnGridToExcel(grid, fileTitle, showProgress, indicator, header, footer) {

    /*showProgress - true(기본), false
    indicator - 'default'(기본), 'visible', 'hidden'
    header - 'default'(기본), 'visible', 'hidden'
    footer - 'default'(기본), 'visible', 'hidden'*/

    grid.gridView.exportGrid({
        type: "excel",
        target: "local",
        fileName: fileTitle + ".xlsx",
        showProgress: showProgress,
        progressMessage: "엑셀파일 생성중입니다",
        indicator: indicator,
        header: header,
        footer: footer,
        compatibility: true,
        done: function () {  //내보내기 완료 후 실행되는 함수
            //alert("엑셀 다운로드가 완료되었습니다.")
        }
    });
};

function fn_openAll(treeObj, codeList) {
    if (treeObj && codeList) {
        fn_openTree(codeList);
    }
}

function fn_openTree(obj) {
    if (!obj || obj.length == 0) {
        return false;
    }
    for (var i = 0; i < obj.length; i++) {
        var id = obj[i].id;
        //if (commonCodeTree.getLevel(id) < 3) {
        try {
            commonCodeTree.openItem(id);
            if (obj[i].items) {
                fn_openTree(obj[i].items);
            }
        } catch (e) {
            //console.log(e);
        }
        //}
    }
}

function fn_closeAll(treeObj, codeList) {
    if (treeObj && codeList) {
        fn_closeTree(codeList);
    }
}

function fn_closeTree(obj) {
    if (!obj || obj.length == 0) {
        return false;
    }
    for (var i = 0; i < obj.length; i++) {
        var id = obj[i].id;
        //if (commonCodeTree.getLevel(id) < 3) {
        try {
            commonCodeTree.closeItem(id);
            if (obj[i].items) {
                fn_closeTree(obj[i].items);
            }
        } catch (e) {
            //console.log(e);
        }
        //}
    }
}

function fn_openAllMenu(treeObj, menuList) {
    if (treeObj && menuList) {
        fn_openTreeMenu(menuList);
    }
}

function fn_openTreeMenu(obj) {
    if (!obj || obj.length == 0) {
        return false;
    }
    for (var i = 0; i < obj.length; i++) {
        var id = obj[i].id;
        //if (commonCodeTree.getLevel(id) < 3) {
        try {
            capabilityMenuTree.openItem(id);
            if (obj[i].items) {
                fn_openTreeMenu(obj[i].items);
            }
        } catch (e) {
            //console.log(e);
        }
        //}
    }
}

function fn_closeAllMenu(treeObj, menuList) {
    if (treeObj && menuList) {
        fn_closeTreeMenu(menuList);
    }
}

function fn_closeTreeMenu(obj) {
    if (!obj || obj.length == 0) {
        return false;
    }
    for (var i = 0; i < obj.length; i++) {
        var id = obj[i].id;
        //if (commonCodeTree.getLevel(id) < 3) {
        try {
            capabilityMenuTree.closeItem(id);
            if (obj[i].items) {
                fn_closeTreeMenu(obj[i].items);
            }
        } catch (e) {
            //console.log(e);
        }
        //}
    }
}

function fn_searchAll(treeObj, codeList) {
    if (treeObj && codeList) {
        fn_searchTree(codeList);
    }
}

function fn_treeParentOpenAll(id) {
    try {
        var parentId = commonCodeTree.getParentId(id);
        if (parentId) {
            commonCodeTree.openItem(parentId);
            fn_treeParentOpenAll(parentId);
        }
    } catch (e) {
        //console.log(e);
    }
}

function fn_searchTree(obj) {
    if (!obj || obj.length == 0) {
        return false;
    }
    var search = $('#srch_codeNm').val();
    for (var i = 0; i < obj.length; i++) {
        var id = obj[i].id;
        //if (commonCodeTree.getLevel(id) > 0) {
        try {
            var text = commonCodeTree.getItemText(id);
            if (text.indexOf(search) >= 0) {
                fn_treeParentOpenAll(id);
                /*var parentId = commonCodeTree.getParentId(id);
                if (parentId) {
                    commonCodeTree.openItem(parentId);
                    var parentParentId = commonCodeTree.getParentId(parentId);
                    if (parentParentId) {
                        commonCodeTree.openItem(parentParentId);
                    }
                }*/
                //commonCodeTree.openItem(id);
                //var cnt = commonCodeTree.getSubItems(id);
                //var addItem = cnt && cnt.length > 0 ? " ("+cnt.length+")" : "";
                if (text.indexOf("background-color:yellow") <= 0) {
                    text = text.replaceAll(search, "<span style='background-color:yellow'>" + search + "</span>");
                    text = text.replace(/undefined/gi, "/");
                }
            } else {
                text = text.replaceAll("<span style='background-color:yellow'>", "");
                text = text.replaceAll("</span>", "");
            }
            commonCodeTree.setItemText(id, text);
            //console.log(obj[i].items);
            if (obj[i].items) {
                fn_searchTree(obj[i].items);
            }
        } catch (e) {
            console.log(e);
        }
        //}
    }
}

String.prototype.replaceAll = function (org, dest) {
    return this.split(org).join(dest);
}

function fn_fileDownload(path, name) {
    location.href = "/api/v1/common/download?path=" + path + "&name=" + encodeURI(name);
    return false;
}

function fn_fileDownloadZip(table_id_arr, table_nm) {
    location.href = "/api/v1/common/file/downloadZip?table_id_arr=" + table_id_arr + "&table_nm=" + table_nm
}

function makeFck(objName, callback) {
    try {
        var editor = CKEDITOR.replace(objName, {
            removePlugins: 'easyimage, cloudservices',
            filebrowserUploadUrl: '/api/v1/common/ckeditor/fileUpload?',
            allowedContent: true /*200720 추가*/
        });

        if (callback && typeof callback === 'function') {
            callback(objName, editor);
        }
    } catch (e) {

    }
    /*ClassicEditor.create(document.querySelector('#' + objName), {
        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable','undo','redo'],
        autoParagraph: false,
        enterMode: 'div',
        ShiftEnterMode: 'br'
    }).then(editor=>{
        //editor.setData(ckdata);
        //this.ckEditor = editor;
        //console.log(editor);
        if (callback && typeof callback === 'function') {
            callback(objName, editor);
        }
    }).catch(err=> {
        console.error(err.stack);
    });*/
}

function makeFckWithImage(objName, callback) {
    try {
        var editor = CKEDITOR.replace(objName, {
            removePlugins: 'easyimage, cloudservices',
            filebrowserUploadUrl: '/api/v1/common/ckeditor/fileUpload?',
            allowedContent: true /*200720 추가*/
        });

        if (callback && typeof callback === 'function') {
            callback(objName, editor);
        }
    } catch (e) {

    }
    /*ClassicEditor.create(document.querySelector('#' + objName), {
        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable','undo','redo','imageUpload'],
        autoParagraph: false,
        enterMode: 'div',
        ShiftEnterMode: 'br',
        ckfinder: {
            uploadUrl: '/api/v1/common/ckeditor/fileUpload'
        }
    }).then(editor=>{
        if (callback && typeof callback === 'function') {
            callback(objName, editor);
        }
    }).catch(err=> {
        console.error(err.stack);
    });*/
}

function setCookie(name, value, expirehours, domain) {
    var today = new Date();
    today.setTime(today.getTime() + (60 * 60 * 1000 * expirehours));
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + today.toGMTString() + ";";
    if (domain) {
        document.cookie += "domain=" + domain + ";";
    }
}

function getCookie(name) {
    var find_sw = false;
    var start, end;
    var i = 0;
    for (i = 0; i <= document.cookie.length; i++) {
        start = i;
        end = start + name.length;
        if (document.cookie.substring(start, end) == name) {
            find_sw = true
            break
        }
    }
    if (find_sw == true) {
        start = end + 1;
        end = document.cookie.indexOf(";", start);
        if (end < start) end = document.cookie.length;
        return unescape(document.cookie.substring(start, end));
    }
    return "";
}

function fn_setDhtmlxVault(id, fileList, option) {
    $("#" + id).html("");
    var vault = new dhx.Vault(id, {
        mode: "grid",
        uploader: {
            target: option.uploadUrl,
            downloadURL: ""
        }
    });
    vault.data.parse(fileList);

    vault.toolbar.data.add({
        type: "iconButton",
        id: "all-download",
        tooltip: "All download",
        icon: "dxi-download"
    }, 2);
    /*vault.toolbar.data.add({
        type: "text",
        id: "size"
    }, 3);*/

    vault.toolbar.events.on("click", function (id) {
        if (id === "calc-size") {
            var size = vault.data.reduce(function (sum, item) {
                return sum + item.size;
            }, 0);
            vault.toolbar.data.update("size", {value: getBasis(size)});
            vault.toolbar.show("size");
        } else if (id === "all-download") {
            var data = vault.data;
            if (data.getLength() == 0) {
                alert("파일이 없습니다.");
                return false;
            }
            if (!confirm("해당디스크의 모든 파일을 다운로드하시겠습니까?")) {
                return false;
            }
            var table_id_arr = option.table_id;
            var table_nm = option.table_nm;
            location.href = "/api/v1/common/file/downloadZip?table_id_arr=" + table_id_arr + "&table_nm=" + table_nm
        } else if (id === "remove-all") {
            var data = vault.data;
            if (data.getLength() == 0) {
                alert("파일이 없습니다.");
                return false;
            }
            if (!confirm("해당디스크의 모든 파일을 삭제하시겠습니까?")) {
                return false;
            }
            fn_dhtmlxVaultFileDelete(option.deleteUrl);
        }
    });
    vault.data.events.on("change", function () {
        if (!vault.data.getLength()) {
            vault.toolbar.data.update("size", {value: ""});
            vault.toolbar.hide(["calc-size", "size"]);
        } else {
            vault.toolbar.show(["calc-size", "size"]);
        }
    })
    /*vault.data.events.on("keydown", function() {
        alert("asdasd");
    })*/
    vault.events.on("BeforeRemove", function (file) {
        if (!confirm(file.name + " 을(를) 삭제하시겠습니까?")) {
            return false;
        }

        fn_dhtmlxVaultFileDelete(option.deleteUrl, file.file_id);

        return true;
    });
}

function fn_dhtmlxVaultFileDelete(deleteUrl, file_id) {
    if (file_id) {
        deleteUrl = deleteUrl + "&file_id=" + file_id;
    }
    var jsonData = {};

    $.ajax({
        type: 'post',
        url: deleteUrl,
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(jsonData),
        dataType: 'json',
        success: function (data) {

        },
        error: function (error) {
            alert('error::' + error.statusText);
        }
    });
}

function fn_makeCalendar(id, option) {
    if (!option) {
        option = {};
    }

    console.log(option);
    var jsonData = {
        'empno': '' + (option.empno ? option.empno : '') + ''
    };

    $.ajax({
        type: 'post',
        url: '/api/common/getCalendar',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(jsonData),
        dataType: 'json',
        success: function (data) {
            fn_initCalendar(id, data, option);
        },
        error: function (error) {
            //alert('save error!!!');
            alert('error::' + error.statusText);
        }
    });
}

function fn_initCalendar(id, list, option) {
    if (!id || !list) {
        return false;
    }
    dhtmlXCalendarObject.prototype.langData['ko'] = {
        monthesFNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        daysSNames: ["일", "월", "화", "수", "목", "금", "토"],
    }

    var myCalendar = new dhtmlXCalendarObject(id);
    myCalendar.hideTime();
    myCalendar.show();
    myCalendar.setWeekStartDay(7);
    myCalendar.loadUserLanguage('ko');

    var holidayObj = {};
    var tooltipObj = {};
    $.each(list, function (index, item) {
        var date = getBetweenDates(setStringToDate(item.st_ymd), setStringToDate(item.end_ymd));
        $.each(date, function (index2, item2) {
            if (item.restde_yn == 'Y') {
                holidayObj = setCalendarDupCheck(holidayObj, item2, item.ttl);
            }
            tooltipObj = setCalendarDupCheck(tooltipObj, item2, item.ttl);
        });
    });

    for (var item in holidayObj) {
        myCalendar.setHolidays(item);
    }
    for (var item in tooltipObj) {
        myCalendar.setTooltip(item, tooltipObj[item], true, true);
    }

    myCalendar.attachEvent("onClick", function (date) {
        if (option.callback) {
            option.callback(date.format('yyyy-MM-dd'));
        }
    });
}

function setCalendarDupCheck(obj, date, text) {
    if (obj[date]) {
        obj[date] += "<br/>" + text
    } else {
        obj[date] = text;
    }
    return obj;
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getBetweenDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate).format('yyyy-MM-dd'));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

function setStringToDate(str) {
    var yyyy = str.substr(0, 4);
    var mm = str.substr(5, 2);
    var dd = str.substr(8, 2);

    return new Date(yyyy, mm - 1, dd);
}

function isApp() {
    var userAgent = navigator.userAgent;
    return (userAgent.indexOf('N2_FULL_APP') > 0);
}

function osCheck() {
    var userAgent = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
    if (userAgent.match('android') != null) {
        return "ANDROID";
    } else if (userAgent.indexOf("iphone") > -1 || userAgent.indexOf("ipad") > -1 || userAgent.indexOf("ipod") > -1) {
        return "IOS";
    } else {
        return "";
    }
}

function fn_setDatePicker(selector, option) {
    if (!option) {
        option = {};
    }
    option.timepicker = false;
    option.format = 'Y-m-d';
    option.scrollMonth = false;
    option.scrollInput = false;
    $(selector).datetimepicker(option);
    $(selector).siblings('.btn_calendar').on('click', function () {
        if (!$(selector).attr('disabled')) {
            $(selector).datetimepicker('show');
        }
    });
}

function fn_setDateTimePicker(selector, option) {
    if (!option) {
        option = {};
    }
    option.format = 'Y-m-d H:i';
    option.scrollMonth = false;
    $(selector).datetimepicker(option);
    $(selector).siblings('.btn_calendar').on('click', function () {
        if (!$(selector).attr('disabled')) {
            $(selector).datetimepicker('show');
        }
    });
}

/*function fn_setDateYearMonth(selector, option) {
    if (!option) {
        option = {};
    }
    option.changeMonth = true;
    option.changeYear = true;
    option.showButtonPanel = true;
    option.dateFormat = 'MM yy';
    $(selector).datetimepicker(option);
    $(selector).siblings('.btn_calendar').on('close', function(dateText, inst) {
        var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
        var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
        $(this).datepicker('setDate', new Date(year, month, 1));
    });
}*/

function fn_setTimePicker(selector, option) {
    if (!option) {
        option = {};
    }
    option.datepicker = false;
    option.format = 'H:i';
    option.scrollMonth = false;
    $(selector).datetimepicker(option);
    $(selector).siblings('.btn_calendar').on('click', function () {
        if (!$(selector).attr('disabled')) {
            $(selector).datetimepicker('show');
        }
    });
}

function fn_deleteFile(id, obj) {
    if (!obj || !id) {
        return false;
    }
    $(obj).addClass("btn_del_ajax");
    if (confirm("파일을 삭제하시겠습니까?")) {
        var jsonData = {
            'flPid': '' + id + ''
        };
        $.ajax({
            type: 'post',
            url: '/api/v1/common/file/delete',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(jsonData),
            datatype: 'text',
            success: function (data) {
                if (data === 'ok') {
                    alert('삭제 되었습니다.');
                    $(obj).parent().remove();
                    fn_fileDeleteUI(obj);
                } else {
                    alert('실패되었습니다 관리자에게 문의 하세요');
                }
            },
            error: function (error) {
                //alert('save error!!!');
                alert('error::' + error.statusText);
            }
        });
    }
}

function winPop(url, title, w, h) {
    var top = (screen.height / 2) - (h / 2),
        left = (screen.width / 2) - (w / 2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}

function winPop(url, title, w, h, s) {
    var top = (screen.height / 2) - (h / 2),
        left = (screen.width / 2) - (w / 2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=' + s + ', resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}

function execPostCode(zipCd, addr, dtlAddr) {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 도로명 조합형 주소 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (extraRoadAddr !== '') {
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }
            // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
            if (fullRoadAddr !== '') {
                fullRoadAddr += extraRoadAddr;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            //console.log(data.zonecode);
            //console.log(fullRoadAddr);


            $('#' + zipCd).val(data.zonecode);
            $('#' + addr).val(fullRoadAddr);
            $('#' + dtlAddr).focus();

            /* document.getElementById('signUpUserPostNo').value = data.zonecode; //5자리 새우편번호 사용
            document.getElementById('signUpUserCompanyAddress').value = fullRoadAddr;
            document.getElementById('signUpUserCompanyAddressDetail').value = data.jibunAddress; */
        }
    }).open();
}

function fn_linkUrl(url, target) {
    var jsonData = {
        'cnctUrl': url
    };
    $.ajax({
        type: 'post',
        url: '/api/openData/extraLink',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(jsonData),
        datatype: 'text',
        success: function (data) {
            console.log(data);
            if (target) {
                window.open(url);
            } else {
                location.href = url;
            }
        },
        error: function (error) {
            //alert('save error!!!');
            alert('error::' + error.statusText);
        }
    });
}

function fn_audioEndCheck(id, url, ty, callback) {
    if (!url || !ty) {
        return false;
    }
    var isFirst = true;
    var audio = document.querySelector(id);

    audio.addEventListener('ended', function () {
        fn_viewVideo(url, ty, callback);
        isFirst = false;
    });
}

function fn_videoEndCheck(url, ty, callback) {
    if (!url || !ty) {
        return false;
    }
    if (ty == 'YOUTUBE') {
        var isFirst = true;
        var video2 = videojs('video').ready(function () {
            var player = this;
            player.on('ended', function () {
                if (!isFirst) {
                    return false;
                }
                $("#video").stop();
                fn_viewVideo(url, ty, callback);
                isFirst = false;
            });
        });
    } else if (ty == 'CDN') {
        var isFirst = true;
        var video = document.querySelector('video');

        video.addEventListener('ended', function () {
            fn_viewVideo(url, ty, callback);
            isFirst = false;
        });
    }
}

function fn_viewVideo(url, ty, callback) {
    var jsonData = {
        'cntntsUrl': url,
        'cntntsDvTy': ty
    };
    $.ajax({
        type: 'post',
        url: '/api/openData/viewVideo',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(jsonData),
        datatype: 'text',
        success: function (data) {
            if (callback && typeof callback === 'function') {
                callback(data);
            }
        },
        error: function (error) {
            //alert('save error!!!');
            alert('error::' + error.statusText);
        }
    });
}

function getOnlyNumber(ele) {
    var rtnValue = 0;
    if (ele.value) {
        rtnValue = ele.value.replace(/[^0-9]/g, '');
    }
    return rtnValue;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * hyphen 자동 입력
 *
 * @param ele
 */
function telNoAutoHyphen(ele) {
    ele.value = ele.value.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]{3,4})?([0-9]{4})$/, "$1-$2-$3").replace("--", "-")
}

/**
 * comma 자동 입력
 *
 * @param ele
 */
function numberAutoComma($nmbr) {
    // format number 1234567 to 1,234,567
    return $nmbr.val($nmbr.val().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}

/**
 * 이메일 형식 검증
 *
 * @param $obj jquery obj
 * @returns {boolean}
 */
function verifyEmail($obj) {
    var regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regExp.test($obj.val())) {
        alert('이메일 형식이 올바르지 않습니다.');
        $obj.focus();
        return false;
    }
    return true;
}

/**
 * 전화번호 형식 검증
 *
 * @param $obj
 * @param label
 * @returns {boolean}
 */
function verifyTelNo($obj, label) {
    var regExp = /^(^02|^0505|^1[0-9]{3}|^0[0-9]{2})-([0-9]{3,4})-([0-9]{4})$/;
    if (!regExp.test($obj.val())) {
        alert(label + ' 형식이 올바르지 않습니다.');
        $obj.focus();
        return false;
    }
    return true;
}

/**
 * 휴대전화번호 형식 검증
 *
 * @param $obj
 * @returns {boolean}
 */
function verifyPhoneNo($obj) {
    var regExp = /^01([0|1|6|7|8|9]?)-([0-9]{3,4})-([0-9]{4})$/;
    if (!regExp.test($obj.val())) {
        alert('휴대전화번호 형식이 올바르지 않습니다.');
        $obj.focus();
        return false;
    }
    return true;
}

/**
 * 도로명주소 - 좌표 제공 검색 api
 * @see : https://business.juso.go.kr/addrlink/addrLinkApi.do
 * 좌표계 : UTM-K(GRS80), EPSG:5179
 *
 * 해당 사용 페이지에서 callback 함수 정의 필요 ex) fn_callbackAddress(zip, addr1, addr2, x, y, admCd)
 *
 * 사용 변수
 * - zipNo : 우편번호
 * - roadAddrPart1 : 도로명주소
 * - addrDetail : 상세주소
 * - entX : 위도
 * - entY : 경도
 * - admCd : 읍면동코드 (행정구역코드)
 */
function fn_searchAddressApi(callback, obj) {
    $(".searchAddressForm").remove();

    let html = '<form id="searchAddressForm" class="searchAddressForm" method="post" target="pop" action="/api/v1/searchAddress">' +
        '        <input type="hidden" id="returnUrl" name="returnUrl" value=""/>' +
        '        </form>';

    $(obj).append(html);

    window.name = 'searchAddressApi';

    window.open('', 'pop', "width=570,height=420, scrollbars=yes, resizable=yes");

    $("#returnUrl").val(location.protocol + "//" + location.host + "/api/v1/searchAddressApi/" + callback);
    $('#searchAddressForm').prop('action', "/api/v1/searchAddressApi/" + callback);

    $('#searchAddressForm').submit();
}

//사용자검색팝업
function fn_userSearch(page, state) {
    $('.userSrchPaging').remove();
    const popupSrchField = $('#popupSrchField').val();
    const popupSrchWord = $('#popupSrchWord').val();

    const jsonData = {
        srchField: popupSrchField,
        srchWord: popupSrchWord,
        perPageNum: 5,
        page: page,
        state: state
    }
    $.ajax({
        url: "/api/v1/system/customerAccount/userList",
        contentType: 'application/json;charset=utf-8',
        type: 'POST',
        data: JSON.stringify(jsonData),
        dataType: 'json',
        success: function (data) {
            //console.log(data);
            let pageMaker = data.pageMaker;
            let list = data.list;
            $('.total_num').text("총 " + pageMaker.totalCount + "명의 사용자가 있습니다.");
            let html = '';
            if (list.length == 0) {
                html += '<tr>' +
                    '<td colspan="4" class="nodata">등록된 사용자가 없습니다.</td>' +
                    '</tr>';
            } else {
                for (var i = 0; i < list.length; i++) {
                    html += '<tr>' +
                        '<td>' + list[i].deptNm + '</td>' +
                        '<td><b><a href="javascript:;" onclick="fn_selectSrchUser(\'' + list[i].korNm + '\',\'' + list[i].email + '\',\'' + list[i].mbtlnum + '\',\'' + list[i].deptNm + '\',\'' + list[i].grdNm + '\',\'' + list[i].empno + '\' ,\'' + list[i].userId + '\',\'' + list[i].deptCd + '\')">' + list[i].userNm + '</a></b></td>' +
                        '<td>' + list[i].empno + '</td>' +
                        '<td>' + list[i].grdNm + '</td>' +
                        '</tr>';
                }
            }
            $('#userSrchBody').html(html);
            const start = Math.floor((pageMaker.cri.page - 1) / 10) * 10 + 1;
            const last = start + 9 < pageMaker.totalPages ? start + 9 : (pageMaker.totalPages == 0 ? 1 : pageMaker.totalPages);
            let paging = '';
            if (state == 'insert') {
                paging += '<div class="pagination_area userSrchPaging">' +
                    '<div class="pagination clearfix">' +
                    '<a href="javascript:;" onclick="fn_userSearch(' + pageMaker.firstPage + ',\'' + state + '\')" class="page_nav first"><span class="blind">처음</span></a>' +
                    '<a href="javascript:;" onclick="fn_userSearch(' + (pageMaker.cri.page == pageMaker.firstPage ? pageMaker.firstPage : pageMaker.cri.page - 1) + ',\'' + state + '\')" class="page_nav prev"><span class="blind">이전</span></a>';
                for (var j = start; j <= last; j++) {
                    paging += '<a href="javascript:;" onclick="fn_userSearch(' + j + ',\'' + state + '\')"';
                    if (j == pageMaker.cri.page) {
                        paging += 'class="active"';
                    }
                    paging += ' >' + j + '</a>';
                }
                paging += '<a href="javascript:;" onclick="fn_userSearch(' + (pageMaker.cri.page == pageMaker.lastPage ? pageMaker.cri.page : pageMaker.cri.page + 1) + ',\'' + state + '\')" class="page_nav next"><span class="blind">다음</span></a>' +
                    '<a href="javascript:;" onclick="fn_userSearch(' + pageMaker.lastPage + ',\'' + state + '\')" class="page_nav last"><span class="blind">마지막</span></a>' +
                    '</div>' +
                    '</div>';
            } else {
                paging += '<div class="pagination_area userSrchPaging">' +
                    '<div class="pagination clearfix">' +
                    '<a href="javascript:;" onclick="fn_userSearch(' + pageMaker.firstPage + ')" class="page_nav first"><span class="blind">처음</span></a>' +
                    '<a href="javascript:;" onclick="fn_userSearch(' + (pageMaker.cri.page == pageMaker.firstPage ? pageMaker.firstPage : pageMaker.cri.page - 1) + ')" class="page_nav prev"><span class="blind">이전</span></a>';
                for (var j = start; j <= last; j++) {
                    paging += '<a href="javascript:;" onclick="fn_userSearch(' + j + ')"';
                    if (j == pageMaker.cri.page) {
                        paging += 'class="active"';
                    }
                    paging += ' >' + j + '</a>';
                }
                paging += '<a href="javascript:;" onclick="fn_userSearch(' + (pageMaker.cri.page == pageMaker.lastPage ? pageMaker.cri.page : pageMaker.cri.page + 1) + ')" class="page_nav next"><span class="blind">다음</span></a>' +
                    '<a href="javascript:;" onclick="fn_userSearch(' + pageMaker.lastPage + ')" class="page_nav last"><span class="blind">마지막</span></a>' +
                    '</div>' +
                    '</div>';
            }
            $('#userSrchArea').after(paging);
        },
        error: function (error) {
            alert('시스템장애입니다. 관리자에게 문의하세요!');
        }
    });
}

function fn_excelTemplateDownload(type, workDvTy, name) {
    let url = 'https://keywe-img.ntoday.kr/excel/templates/' + type + '/' + workDvTy + '/' + encodeURI(name);
    location.href = url;
    return false;
}

/****************************************************************************
 * 숫자에 세자리 마다,넣기                                      *
 ***************************************************************************/
function fn_setCommas(num) {
    if (!isNaN(num))
        return Number(num).toLocaleString('ko-KR')
    else
        return num;
}

/****************************************************************************
 * 숫자에 세자리 마다,넣기                                      *
 * cnt * unit
 ***************************************************************************/
function fn_getCommaFrmtAmt(cnt, unit) {
    cnt = cnt * unit;
    if (!isNaN(cnt))
        return Number(cnt).toLocaleString('ko-KR')
    else
        return cnt;
}

/****************************************************************************
 * input 초기화
 * id
 * type : input type
 ***************************************************************************/
function fn_resetInputById(id, type, val) {
    val = $.trim(val) ? val : '';
    if (type === 'number') {
        val = 0;
    }

    if (type === 'select') {
        $('#' + id).val(val).niceSelect('update');
    } else {
        $('#' + id).val(val);
    }
}

/****************************************************************************
 * datepicker 유효성 검사
 * id, name
 * type : input type
 ***************************************************************************/
function fn_validationCheckDatePicker(id) {
    let result = true;
    const el = $('#' + id);
    const value = el.val();
    const lt = value.length;

    if (value && lt > 10) {
        result = false;
        el.focus();
        alert('올바르지 않은 형식의 ' + el.attr('title') + '입니다.');
    }

    return result;
}

function dateToYYYYMMDD(date) {
    let formatted = date.getFullYear() +
        '-' + ((date.getMonth() + 1) < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) +
        '-' + ((date.getDate()) < 9 ? "0" + (date.getDate()) : (date.getDate()));
    return formatted;
}

/**
 * 검색 영역 내 팝업에서 검색어만 입력 후 선택하지 않았을 경우(지사, 품목 등..)
 */
function fn_validationCheckExistId(idPrefix) {
    let result = true;
    let title = '';

    if (idPrefix) {
        let $pid = $('#' + idPrefix + 'Pid');
        let $id = $('#' + idPrefix + 'Id');
        let $name = $('#' + idPrefix + 'Nm');
        let $number = $('#' + idPrefix + 'No');
        let $no = $('#' + idPrefix + 'no');
        let pid = $pid.val();
        let id = $id.val();
        let name = $name.val();
        let number = $number.val();
        let no = $no.val();

        if (idPrefix === 'srchAtmb') {
            if ($.trim(number)) {
                $pid = $('#srchCarPid');
                pid = $pid.val();
                if (!pid) {
                    result = false;
                }
            }
        } else if (idPrefix === 'srchEmp') {
            if ($.trim(name)) {
                if (!no) {
                    result = false;
                }
            }
        } else if (idPrefix === 'hipassCard' || idPrefix === 'lbrctCard') {
            if ($.trim(number)) {
                if (!pid) {
                    result = false;
                }
            }
        } else {
            if ($.trim(name)) {
                if (!pid && !id) {
                    result = false;
                }
            }
        }

        if (!result) {
            if ($.trim(name)) {
                title = $name.attr('title');
            } else {
                title = $number.attr('title');
            }

            alert(title + '을(를) 선택해 주세요.');
        }
    }
    return result;
}

function fn_getSearchCategoriesCustom(type, lv, value, selectedValue) {
    let option = "<option value=''>:선택:</option>";
    let srchMsrtCodePid;
    let srchSsrtCodePid;
    if (type === 'register') {
        srchMsrtCodePid = $('#registerSrchMsrtCodePid');
        srchSsrtCodePid = $('#registerSrchSsrtCodePid');
    } else if (type === 'update') {
        srchMsrtCodePid = $('#mfregisterSrchMsrtCodePid');
        srchSsrtCodePid = $('#mfregisterSrchSsrtCodePid');
    } else {
        srchMsrtCodePid = $('#srchMsrtCodePid');
        srchSsrtCodePid = $('#srchSsrtCodePid');
    }

    // let srchThngNm = $('#srchThngNm');

    if (!value) {
        if (lv === 2) {
            srchMsrtCodePid.html(option).niceSelect('update');
            if (type === 'register') {
                fn_initNiceSelect('registerSrchMsrtCodePid');
            } else if (type === 'update') {
                fn_initNiceSelect('mfregisterSrchMsrtCodePid');
            } else {
                fn_initNiceSelect('srchMsrtCodePid');
            }

        }

        srchSsrtCodePid.html(option).niceSelect('update');
        // srchThngNm.html(option).niceSelect('update');

        if (type === 'register') {
            fn_initNiceSelect('registerSrchSsrtCodePid');
        } else if (type === 'update') {
            fn_initNiceSelect('mfregisterSrchSsrtCodePid');
        } else {
            fn_initNiceSelect('srchSsrtCodePid');
        }
        // fn_initNiceSelect('srchThngNm');
        return false;
    }

    const jsonData = {
        'prntCodePid': '' + value + ''
    }

    $.ajax({
        type: 'post',
        url: '/api/v1/system/commonCode/list',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(jsonData),
        dataType: 'json',
        success: function (data) {
            $.each(data, function (index, value) {
                if (value['prntCodePid'] !== null) {
                    option += "<option value='" + value['codePid'] + "'>" + value['codeNm'] + "</option>";
                }
            });
            if (lv === 2) {
                srchMsrtCodePid.html(option).niceSelect('update');
                if (type === 'update') {
                    $('#mfregisterSrchMsrtCodePid').val($('#mfregisterSrchMsrtCodePid_hidden').val()).niceSelect('update');
                }
            } else {
                srchSsrtCodePid.html(option).niceSelect('update');
                if (type === 'update') {
                    $('#mfregisterSrchSsrtCodePid').val($('#mfregisterSrchSsrtCodePid_hidden').val()).niceSelect('update');
                }
            }

            if (type === 'register') {
                fn_initNiceSelect('registerSrchMsrtCodePid');
            } else if (type === 'update') {
                fn_initNiceSelect('mfregisterSrchMsrtCodePid');
            } else {
                fn_initNiceSelect('srchMsrtCodePid');
            }


            if (type === 'register') {
                fn_initNiceSelect('registerSrchSsrtCodePid');
            } else if (type === 'update') {
                fn_initNiceSelect('mfregisterSrchSsrtCodePid');
            } else {
                fn_initNiceSelect('srchSsrtCodePid');
            }
        },
        error: function (error) {
            alert('error::' + error.statusText);
        }
    });
}

/* 물품 대중소 분류 */
function fn_getSearchCategories(lv, value, selectedValue) {
    let option = "<option value=''>:선택:</option>";

    if (lv === 2) {
        $('#srchMsrtCodePid').html(option).niceSelect('update');
        $('#srchSsrtCodePid').html(option).niceSelect('update');
        $('#srchDetailSsrtCodePid').html(option).niceSelect('update');
    } else if (lv === 3 && !value) {
        $('#srchSsrtCodePid').html(option).niceSelect('update');
        $('#srchDetailSsrtCodePid').html(option).niceSelect('update');
    }

    const jsonData = {
        'prntCodePid': '' + value + ''
    }

    $.ajax({
        type: 'post',
        url: '/api/v1/system/commonCode/list',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(jsonData),
        dataType: 'json',
        success: function (data) {
            $.each(data, function (index, value) {
                if (value['prntCodePid'] !== null) {
                    option += "<option value='" + value['codePid'] + "'>" + value['codeNm'] + "</option>";
                }
            });
            if (lv === 2) {
                $('#srchMsrtCodePid').html(option).niceSelect('update');

                if (selectedValue != null) {
                    $('#srchMsrtCodePid').val(selectedValue).niceSelect('update');
                }
            } else {
                $('#srchSsrtCodePid').html(option).niceSelect('update');
            }
        },
        error: function (error) {
            alert('error::' + error.statusText);
        }
    });
}

function fn_setCategories(type, lsrtCodePid, msrtCodePid, ssrtCodePid) {
    const setMsrtCodePid = function (param) {
        return new Promise(function (resolve, reject) {
            window.setTimeout(function () {
                if (param) {
                    if (type === 'search') {
                        $('#srchLsrtCodePid').val(param).niceSelect('update');
                    } else {
                        $('#lsrtCodePid').val(param).niceSelect('update');
                    }
                    resolve(param);
                } else {
                    reject(new Error("Request is failed"));
                }
            }, 10);
        });
    };

    const setSsrtCodePid = function (param) {
        return new Promise(function (resolve, reject) {
            if (param) {
                resolve(param);
            } else {
                reject(new Error("Request is failed"));
            }
        });
    };

    setMsrtCodePid(lsrtCodePid)
        .then(function (param) {
            if (type === 'search') {
                fn_getSearchCategories(2, param, msrtCodePid);
            } else {
                fn_getCategories(2, param, msrtCodePid);
            }

            setSsrtCodePid(msrtCodePid)
                .then(function (param) {
                    if (ssrtCodePid !== '') {
                        if (type === 'search') {
                            fn_getSearchCategories(3, param, ssrtCodePid);
                        } else {
                            fn_getCategories(3, param, ssrtCodePid);
                        }
                    } else {
                        fn_getSearchCategories(3, param);
                    }
                }, function (error) {
                    console.error(error);
                });
        }, function (error) {
            console.error(error);
        });
}

/**
 * select to niceSelect and create scroll bar
 */
function fn_initNiceSelect(id) {
    let selectTit;
    if (id) {
        const elementSelector = $('#' + id);
        selectTit = elementSelector.attr('title');
        elementSelector.niceSelect();
        if (selectTit != '') {
            elementSelector.next('.nice-select').attr('title', selectTit);
        }
    } else {
        $('select').each(function () {
            selectTit = $(this).attr('title');
            $(this).niceSelect();
            if (selectTit != '') {
                $(this).next('.nice-select').attr('title', selectTit);
            }
        });
    }

    $('.nice-select .list').scrollbar({
        "showArrows": true,
        "scrollx": "advanced",
        "scrolly": "advanced"
    })
}

function fn_showLoading() {
    $('#loading_layer').show();
}

function fn_hideLoading() {
    $('#loading_layer').hide();
}

/*
* 파일폼 초기화
* */
function fn_resetFileForm(id) {
    const selector = $('#' + id);
    selector.val('');
    selector.siblings('.drop_zone').children('.area').children('.file').remove();
    selector.parent('.file_form').removeClass('upload');
    $('.file_tip').show();
}

/*검색 기간(n일전 ~ 당일)*/
function fn_resetStDtEdDt(minusDay) {
    let today = new Date();	// 현재 날짜 및 시간
    let nDaysAgo = new Date(new Date().setDate(new Date().getDate() - minusDay));	// n일전

    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    if (mm === '00') {
        mm = '12';
        yyyy = yyyy - 1;
    }
    today = yyyy + '-' + mm + '-' + dd;
    $('#srchEdDt').val(today);

    dd = String(nDaysAgo.getDate()).padStart(2, '0');
    mm = String(nDaysAgo.getMonth() + 1).padStart(2, '0'); //January is 0!
    yyyy = nDaysAgo.getFullYear();
    if (mm === '00') {
        mm = '12';
        yyyy = yyyy - 1;
    }
    nDaysAgo = yyyy + '-' + mm + '-' + dd;
    $('#srchStDt').val(nDaysAgo);

    var srchDtStr = $('#srchDtStr');
    srchDtStr.val(nDaysAgo + '~' + today);

    $('#allChkRangeDatePicker').prop('checked', false);
    srchDtStr.prop('disabled', false);
}

/**
 * rangeDatePicker 초기화
 *
 * 검색 기간(minusDay일전 ~ plusDay일까지)
 * @param prefix id접두어
 * @param firstId 시작날짜id
 * @param lastId 종료날짜id
 * @param minusDay n일전 시작
 * @param plusDay n일후 종료
 * */
function fn_resetRangeDatePicker(prefix, firstId, lastId, minusDay, plusDay) {
    let today = new Date();	// 현재 날짜 및 시간
    let nDaysAgo = new Date(new Date().setDate(today.getDate() - minusDay));	// minusDay일전
    let nDaysAfter = new Date(new Date().setDate(today.getDate() + plusDay));	// minusDay일후

    let dd = String(nDaysAfter.getDate()).padStart(2, '0');
    let mm = String(nDaysAfter.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = nDaysAfter.getFullYear();
    if (mm === '00') {
        mm = '12';
        yyyy = yyyy - 1;
    }
    nDaysAfter = yyyy + '-' + mm + '-' + dd;
    $('#' + prefix + lastId).val(nDaysAfter);

    dd = String(nDaysAgo.getDate()).padStart(2, '0');
    mm = String(nDaysAgo.getMonth() + 1).padStart(2, '0'); //January is 0!
    yyyy = nDaysAgo.getFullYear();
    if (mm === '00') {
        mm = '12';
        yyyy = yyyy - 1;
    }
    nDaysAgo = yyyy + '-' + mm + '-' + dd;
    $('#' + prefix + firstId).val(nDaysAgo);

    var srchDtStr = $('#srchDtStr');
    srchDtStr.val(nDaysAgo + '~' + nDaysAfter);

}

/*숫자 형식만 체크*/
function fn_chkNumber(obj) {
    let regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;	//정규식 구문
    if (regExp.test(obj.value)) {
        // 특수문자 모두 제거
        obj.value = obj.value.replace(regExp, '');
    }
    let num = /[^0-9]/g;
    if (num.test(obj.value)) {
        obj.value = obj.value.replace(num, '');
    }

}

/*한글, 영어만 체크*/
function fn_chkKorAndEng(obj) {
    let regExp = /[^(ㄱ-힣a-zA-Z)]/gi;

    if (regExp.test(obj.value)) {
        obj.value = obj.value.replace(regExp, '');
    }
}

/*영어, 숫자만 체크*/
function fn_chkEngAndNum(obj) {
    let regExp = /[^(0-9a-zA-Z)]/gi;

    if (regExp.test(obj.value)) {
        obj.value = obj.value.replace(regExp, '');
    }
}

/*한글, 영어, 숫자만 체크*/
function fn_chkKorAndEngAndNum(obj) {
    let regExp = /[^(0-9ㄱ-힣a-zA-Z)]/gi;

    if (regExp.test(obj.value)) {
        obj.value = obj.value.replace(regExp, '');
    }
}

/*특수문자 체크*/
function fn_chkSpecialChar(obj) {
    let reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
    if (reg.test(obj.value)) {
        //특수문자 제거후
        obj.value = obj.value.replace(reg, '');
    }
}

function fn_appendYears(selector, startYear) {
    const currentYear = new Date().getFullYear();
    const years = Array.from({length: currentYear - (startYear - 1)}, (_, i) => startYear + i);
    $(selector).empty();
    years.forEach(function (year) {
        $(selector).append(`<option value="${year}">${year}</option>`);
    })
    $(selector).val(currentYear).niceSelect('update');
    fn_initNiceSelect(selector.replace('#', ''));
}

/**
 * 출력
 */
function printByJquery(selector) {
    $(selector).printThis({
        debug: false,
        importCSS: true,
        importStyle: false,
        printContainer: true,
        /*loadCSS: "/asset/css/vms/popup.css",*/
        pageTitle: "",
        removeInline: false,
        printDelay: 333,
        header: null,
        formValues: true
    });
}

/**
 * 전화번호 마스킹
 * @param phoneNumber
 * @returns {string|*}
 */
function maskPhoneNumber(phoneNumber) {
    // '-' 또는 '-' 없는 10자리 숫자 추출
    const regExp = /(\d{3})([-\s]?)(\d{4})([-\s]?)(\d{4})/;
    const match = regExp.exec(phoneNumber);
    if (match) {
        let maskedNumber = "";
        // 전화번호 문자열의 길이가 10인 경우
        if (match[1].length === 3 && match[3].length === 4 && match[5].length === 4) {
            maskedNumber = match[1] + "-****-" + match[5];
        }
        // 전화번호 문자열의 길이가 11인 경우
        else if (match[1].length === 3 && match[3].length === 3 && match[5].length === 4) {
            maskedNumber = match[1] + "-***-****-" + match[5];
        }
        return maskedNumber;
    } else {
        return phoneNumber;
    }
}

/**
 * 이름 마스킹
 * @param name
 * @returns {string}
 */
function maskName(name) {
    if (name.length > 2) {
        return name.slice(0, 1) + "*".repeat(name.length - 2) + name.slice(-1);
    } else if (name.length === 2) {
        return name.slice(0, 1) + "*";
    } else {
        return name;
    }
}

const CURRENCY_WON_CNT_ARR = [
    {'fiftythousandwon': 50000}
    , {'tenthousandwon': 10000}
    , {'fivethousandwon': 5000}
    , {'onethousandwon': 1000}
    , {'fivehundredwon': 500}
    , {'onehundredwon': 100}
    , {'fiftywon': 50}
    , {'tenwon': 10}
];

function getMltpl(inputNm) {
    return CURRENCY_WON_CNT_ARR.find(value => value[inputNm])[inputNm];
}

function fn_chkNumberSetComma(obj) {
    let regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;	//정규식 구문
    if (regExp.test(obj.value)) {
        // 특수문자 모두 제거
        obj.value = fn_setCommas(obj.value.replace(regExp, ''));
    }
    let num = /[^0-9]/g;
    if (num.test(obj.value)) {
        obj.value = fn_setCommas(obj.value.replace(num, ''));
    }
    obj.value = fn_setCommas(obj.value);
}

function fn_chkNumberSetDot(obj) {
    // .은 한 번만 입력 가능하며 두 번째 소수점은 지워짐
    let regExp = /[^0-9.]|\.(?=.*\.)|^[.]+/g;
    let match = obj.value.match(/\./g);
    // 연속된 .이 아닌 두번째로 입력된 .은 삭제
    if (match && match.length > 1) {
        let lastIndex = obj.value.lastIndexOf('.');
        obj.value = obj.value.substring(0, lastIndex) + obj.value.substring(lastIndex + 1);
    }
    if (regExp.test(obj.value)) {
        obj.value = obj.value.replace(regExp, '');
    }
}










