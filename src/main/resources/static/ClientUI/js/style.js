 $(document).ready(function(){


	//input
	$(document).on('keyup focusin', '.input', function(e) {
		//input에 텍스트 입력 시 삭제 버튼 활성화
		if($(this).find('input').val() != ''){
			$(this).addClass('active');
		}else{
			$(this).removeClass('active');
		}

		if($(this).hasClass('success') || $(this).hasClass('error')){
			$(this).removeClass('success error');
		}
	}).on('focusout', '.input', function() {
		//input에 포커스 아웃 시 삭제 버튼 비활성화
		$(this).removeClass('active');
	});
	//삭제 버튼 클릭 시 input 내용 클리어
	$(document).on('mousedown', '.input .btn_del', function () {
		$(this).parent('.input').removeClass('active').find('input').val('');
	});

	//전체 선택
	$('.all_chk').each(function () {
		var allChk = $(this),
			chkId = allChk.attr('name'),
			chk = $('input[id^='+chkId+']:not([disabled])'),
			chkNum = chk.length,
			idx = 0;
		allChk.on('change', function () {
			if($(this).is(':checked')){
				idx = chkNum;
				chk.prop('checked',true);
			}else{
				idx = 0;
				chk.prop('checked',false);
			}
		});
		chk.on('change',function(){
			if($(this).is(':checked')){
				idx++;
				if(idx == chkNum){
					allChk.prop('checked',true);
				}
			}else{
				idx--;
				allChk.prop('checked',false);
			}
		});
	});

	//기간 선택 버튼
	var d = new Date(), week = new Date(), month = new Date(), threeMonth = new Date();
	$('.term_form').each(function(){
		var termForm = $(this);
		termForm.find('.btn').each(function(){
			var btn = $(this);
			btn.on('click', function(){
				termForm.children('.datepicker').eq(1).val(d.toLocaleDateString('fr-CA'));
				if(btn.hasClass('btn_today')){ //오늘
					termForm.children('.datepicker').eq(0).val(d.toLocaleDateString('fr-CA'));
				}else if(btn.hasClass('btn_1week')){ //1주일
					week.setDate(week.getDate() - 7);
					termForm.children('.datepicker').eq(0).val(week.toLocaleDateString('fr-CA'));
				}else if(btn.hasClass('btn_1month')){ //최근 1개월
					month.setMonth(month.getMonth() - 1);
					termForm.children('.datepicker').eq(0).val(month.toLocaleDateString('fr-CA'));
				}else if(btn.hasClass('btn_3month')){ //최근 3개월
					threeMonth.setMonth(threeMonth.getMonth() - 3);
					termForm.children('.datepicker').eq(0).val(threeMonth.toLocaleDateString('fr-CA'));
				}
			});
		});
	});

	//select
	$('select').not('.type2').niceSelect();

	//niceSelect
	$('.nice-select').each(function() {
		var niceSelect = $(this),
			select = niceSelect.prev('select');
		//placeholder
		if(niceSelect.find('ul.list li:first-child').hasClass('disabled')){
			niceSelect.addClass('placeholder');
		}else{
			niceSelect.removeClass('placeholder');
		}
		select.on('change', function () {
			niceSelect.removeClass('placeholder');
		});

		//list scrollbar
		niceSelect.on('click', function () {
			var list = niceSelect.find('ul.list li'),
				listSelectIdx = niceSelect.find('ul.list li.selected').index(),
				listTop = 0;

			if (listSelectIdx < 3) {
				list.parent('ul.list').animate({
					scrollTop: 0
				}, 1);
			} else {
				setTimeout(function () {
					for (var i = 0;i < listSelectIdx - 2;i++){
						listTop += list.eq(i).outerHeight();
					}
					list.parent('ul.list').animate({
						scrollTop: listTop
					}, 1);
				}, 10);
			}

		});
	});

	$('.nice-select .current').on('click', function(){
		$('.dim').show()
	})
	$('.nice-select .list_area, .list_area .sel_del').on('click', function(){
		$('.dim').hide()
	})
	$('.nice-select').each(function () {
		$(this).find('.list_area').children('.list').scrollbar();
	});
	$('#wrap>.dim').on('click', function(){
		$(this).hide()
		$('.nice-select.open').removeClass('open')
	})

	//textarea
	$('textarea').each(function () {
		$(this).on('focusin', function() {
			$(this).parents('.scroll-textarea').addClass('active');
		}).on('focusout', function() {
			$(this).parents('.scroll-textarea').removeClass('active');
		});
	});

	//aside toggle
	$('.btn_toggle_aside').on('click', function(){
		$('body').toggleClass('aside_hide');
	});

	$('#aside').mouseenter(function () {
		$(this).addClass('hover');
	}).mouseleave(function () {
		$(this).removeClass('hover');
	});
	$('#aside').focusin(function () {
		$(this).addClass('hover');
	}).focusout(function () {
		$(this).removeClass('hover');
	});

	//tab
	$('.tab > li').each(function () {
		var tabLi = $(this),
			tabLiIdx = tabLi.index();
		tabLi.find('a').on('click', function () {
			tabLi.addClass('active').siblings().removeClass('active');
			tabLi.parent('.tab').siblings('.tab_cont').children('.cont').eq(tabLiIdx).addClass('active').siblings().removeClass('active');
		});
	});

	//Jquery Scrollbar
	$('.jq_scrollbar, #aside nav,  textarea, .contents .tbl_scrollbar, .pop_window .pop_cont').each(function(){
		if(!$(this).hasClass('noscroll')){
			$(this).scrollbar();
		}
	});

	//Snackbar 닫기
	$('.snackbar, .toast').each(function () {
		var snackbar = $(this);
		snackbar.find('.btn_close').on('click', function(){
			snackbar.removeClass('active');
		});
	});

	//레이어 팝업 딤 클릭 시 팝업 닫기
	$('.pop_layer, .system_alert ').each(function () {
		$(this).children('.dim').on('click', function(){
			$(this).parent('.pop_layer, .system_alert').removeClass('active');
			$(this).next('.popup').removeClass('active');
			$('html,body').removeAttr('style');
		});
	});


	$('.btn_reset').on('click', function(e){
		$(this).parents().find('input').val('');
		$(this).parents().find('select').val($('select option:first').val()).niceSelect('update');
	})

	$('.btn_tr_del').on('click', function(){
		var isChecked = $(".tbl_list tbody .checkbox input").is(":checked");
		if (isChecked){
			layerShow('delAlert')
		} else{
			layerShow('noChk')
		}
	})

	//input number comma
/*
	$('.comma').inputmask('numeric', {
		autoGroup: true,
		groupSeparator: ',',
	});
*/




	$(window).scroll(function(){
		scroll();
	});

/*	$(window).resize(function(){
		resize();
	});*/

});


function fn_setDatePicker(selector) {
	$(selector).daterangepicker({
		"singleDatePicker": true,
		"autoApply": true,
		"locale": {
			format: 'YYYY-MM-DD',
			separator: ' ~ ',
			applyLabel: '확인',
			cancelLabel: '닫기',
			daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
			monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			firstDay: 1
		},
		"drops": "auto"
	});
}



function fn_setDateRangePicker(selector) {
	$(selector).daterangepicker({
		"autoApply": true,
		"locale": {
			format: 'YYYY-MM-DD',
			separator: ' ~ ',
			applyLabel: '확인',
			cancelLabel: '닫기',
			daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
			monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			firstDay: 1
		},
		"drops": "auto"
	});
}



function  fn_setDatePickerTime(selector) {
	$(selector).daterangepicker({
		"singleDatePicker": true,
		"timePicker": true,
		"timePickerIncrement": 10,
		"locale": {
			format: 'YYYY-MM-DD HH:mm',
			separator: ' ~ ',
			applyLabel: '확인',
			cancelLabel: '닫기',
			daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
			monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			firstDay: 1,
		},
		"drops": "auto",
		"timePickerIncrement": 1,
	});
}

function  fn_setDateRangePickerTime(selector) {
	$(selector).daterangepicker({
		"timePicker": true,
		"locale": {
			format: 'YYYY-MM-DD HH:mm',
			separator: ' ~ ',
			applyLabel: '확인',
			cancelLabel: '닫기',
			daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
			monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			firstDay: 1
		},
		"drops": "auto",
		"timePickerIncrement": 1,
	});
}



//레이어 팝업 열기
function layerShow(ele, obj, ajax) {
	$('html, body').css({'overflow':'hidden'});
	// $('body').addClass('active');
	// $('html body').css({'overflow-x':'hidden','overflow-y':'scroll','position':'fixed','left':'0','top':'0','width':'100%'});
	$('#' + ele).addClass('active');

	setTimeout(function(){
		$('#'+ele).find('.popup').addClass('active');
	},100);


	if ($('#' + ele).hasClass('pop_layer')) {
		if (obj) {
			obj.setAttribute('data-focus', 'on');
		}
	} else {
		if (obj) {
			obj.setAttribute('data-focus', 'alert');
		}
	}
	$('#' + ele).attr('tabindex', '0').focus();

	//팝업 열때 콘텐츠 스크롤바 추가
	if (!$('#' + ele).hasClass('no_scroll') && !$('#' + ele).hasClass('system_alert')) {
		$('#' + ele).find('.pop_cont').scrollbar();
	}

	var popupH = parseInt($('#' + ele).find('.popup').height()),
		popdivH = parseInt($('#' + ele).find('.pop_cont.scroll-content > div').outerHeight()),
		popheadH = parseInt($('#' + ele).find('.pop_head').outerHeight()),
		popfootH = parseInt($('#' + ele).find('.pop_foot').outerHeight()),
		popwrapH = 120 + popheadH + popfootH;


	//팝업 높이가 홀수일 경우 translate 수정
	if (popupH % 2 != 0) {
		$('#' + ele).find('.popup.scroll-wrapper').css({'transform': 'translate(-50%, calc(-50% + 0.5px))'});
	}

	$('.nice-select').each(function () {
		var niceSelect = $(this),
			listIdx = niceSelect.find('ul.list li').length;

		if (listIdx < 6) {
			niceSelect.find('.list.scroll-content, .scroll-element').removeClass('scroll-scrolly_visible');
		} else {
			return;
		}
	});

	$('.nice-select .list').scrollbar()


}
//레이어 팝업 닫기
function layerHide(ele) {
	$('#' + ele).removeClass('active');
	$('html, body').removeAttr('style');
	$('#'+ele).find('.popup').removeClass('active');

	if ($('#' + ele).hasClass('pop_layer')) {
		$('[data-focus~=on]').focus();
		window.setTimeout(function () {
			$('[data-focus~=on]').removeAttr('data-focus');
		});
	} else {
		$('[data-focus~=alert]').focus();
		window.setTimeout(function () {
			$('[data-focus~=alert]').removeAttr('data-focus');
		});
	}
	$('#' + ele).removeAttr('tabindex', '0');
}

//윈도우 팝업
function winPop(url, title, w, h){
	var top = (screen.height/2)-(h/2),
		left = (screen.width/2)-(w/2);
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

function systemMsg(ele){
	$('#'+ele).addClass('active');

	//Toast 3초 뒤 숨김
	var toast = setTimeout(function () {
		if($('#'+ele).hasClass('toast')){
			$('#'+ele).removeClass('active');
			clearTimeout(toast);
		}
	}, 3000);
}

function tblTrRemove(tableId) {
	var table = $('#' + tableId);
	var checkboxes = table.find('tbody input[type="checkbox"]:checked');

	checkboxes.each(function () {
		var row = $(this).closest('tr');
		row.remove();
	});
}


function fn_lnb_init(){
	//nav
	$('.nav li').each(function(){
		var li = $(this);
		li.children('a').on('click', function(e){
			$('.logo').removeClass('bg');
			$('.nav>li.active').removeClass('bg02')
			if($(this).attr('href') == '#'){
				e.preventDefault();
			}
			li.toggleClass('active').children('.depth').stop().slideToggle();
			li.siblings().removeClass('active').children('.depth').stop().slideUp();

			//1depth 1번째 li 활성화 시 배경 이미지 추가
			if($('.nav > li:first-child').hasClass('active')){
				$('.logo').addClass('bg');
			}
			if($('.nav > li.active > ul > li:last-child').hasClass('active')){
				$('.nav>li.active').addClass('bg02')
			}
		});
		if(li.hasClass('active')){
			li.children('.depth').show();
		}else{
			li.children('.depth').hide();
		}
		//1depth 1번째 li 활성화 시 배경 이미지 추가
		if($('.nav > li:first-child').hasClass('active')){
			$('.logo').addClass('bg');
		}

		if($('.nav > li.active > ul > li:last-child').hasClass('active')){
			$('.nav>li.active').addClass('bg02')
		}
	});
}

$(document).ready(function(){
	$('.eps1.u_txt').each(function(){
		var epsTxt = $(this).text()
		$(this).text(epsTxt)
	})
})

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
});


function updatePrevButtonState() {
	if (document.querySelector('.no-previous-month')) {
		$('.button-previous-month').attr('disabled', true)
	} else {
		$('.button-previous-month').attr('disabled', false)
	}

	if (document.querySelector('.no-next-month')) {
		$('.button-next-month').attr('disabled', true)
	} else {
		$('.button-next-month').attr('disabled', false)
	}
}