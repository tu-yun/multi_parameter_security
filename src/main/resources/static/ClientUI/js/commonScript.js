// ajax 403 error 처리
$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
	let error = options.error;
	options.error = function (jqXHR, textStatus, errorThrown) {
		if(jqXHR.status == 403) {
			location.href = "/home/dashBoard";
		}
		if (typeof error === 'function') {
			return $.proxy(error, this)(jqXHR, textStatus, errorThrown);
		}
	};
});

//input 띄어쓰기 방지
document.querySelectorAll("input.rule_noSpace").forEach(function(input){
	input.addEventListener("keyup", function(){
		input.value = input.value.replace(" ", "");
	})
});

//URL 첫 pathname 가져오기
function fn_pathname(suffixPathname){
	let result = "";
	const pathNms = location.pathname.split("/");
	if(pathNms.length > 1 && (pathNms[1] == "apt" || pathNms[1] == "office")){
		result = "/" + pathNms[1] + suffixPathname;
	} else {
		result = suffixPathname;
	}
	return result;
}