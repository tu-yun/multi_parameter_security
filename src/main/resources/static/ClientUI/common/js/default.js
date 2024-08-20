function defaultSetting(){
	fn_setDatePicker('#srchStDt', {
		onShow: function (ct) {
			this.setOptions({
				maxDate: $('#srchEdDt').val() ? $('#srchEdDt').val() : false
			});
		}
	});

	fn_setDatePicker('#srchEdDt', {
		onShow: function (ct) {
			this.setOptions({
				minDate: $('#srchStDt').val() ? $('#srchStDt').val() : false
			});
		}
	});

	fn_reset();

	$('#pageSize').change(function () {
		getGridData(1, true,false);
	});
}
