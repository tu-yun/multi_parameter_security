$(function() {
	$('.file_form').each(function () {
		if(!$(this).hasClass('view')) {
			var $file = this.querySelector(".input_file");
			var dropZone = this.querySelector(".drop_zone");
			var dropZoneArea = dropZone.querySelector(".area");

			var toggleClass = function (className) {

				console.log("current event: " + className);

				var list = ["dragenter", "dragleave", "dragover", "drop"];

				for (var i = 0; i < list.length; i++) {
					if (className === list[i]) {
						dropZone.parentNode.classList.add(list[i]);
					} else {
						dropZone.parentNode.classList.remove(list[i]);
					}
				}
			}

			var showFiles = function (files) {
				dropZoneArea.innerHTML = "";
				for (var i = 0, len = files.length; i < len; i++) {
					var ext = files[i].name.split('.').pop().toLowerCase(),
						size = Math.ceil(files[i].size / 1024) + 'kb';
					dropZoneArea.innerHTML += "<div class='file file_" + ext + "'><p class='file_img'><img src='" + URL.createObjectURL(files[i]) + "' /></p><p class='file_name'>" + files[i].name + "</p><p class='file_size'>" + size + "</p><button type='button' class='btn_del'><span class='blind'>파일 삭제</span></button></div>";
					dropZone.parentNode.classList.add('upload');
				}
			}

			var selectFile = function (files) {
				// input file 영역에 드랍된 파일들로 대체
				$file.files = files;
				showFiles($file.files);
			}

			if ($file != null) {
				$file.addEventListener("change", function (e) {
					showFiles(e.target.files);
				});
			}

			if (dropZone != null) {
				// 드래그한 파일이 최초로 진입했을 때
				dropZone.addEventListener("dragenter", function (e) {
					e.stopPropagation();
					e.preventDefault();

					toggleClass("dragenter");

				});

				// 드래그한 파일이 dropZone 영역을 벗어났을 때
				dropZone.addEventListener("dragleave", function (e) {
					e.stopPropagation();
					e.preventDefault();

					toggleClass("dragleave");

				});

				// 드래그한 파일이 dropZone 영역에 머물러 있을 때
				dropZone.addEventListener("dragover", function (e) {
					e.stopPropagation();
					e.preventDefault();

					toggleClass("dragover");

				});

				// 드래그한 파일이 드랍되었을 때
				dropZone.addEventListener("drop", function (e) {
					e.preventDefault();

					toggleClass("drop");

					var files = e.dataTransfer && e.dataTransfer.files;
					console.log(files)

					if (files != null) {
						if (files.length < 1) {
							alert("폴더 업로드 불가");
							return
						}
						selectFile(files);
					} else {
						alert("ERROR");
					}

				});
			}

			//파일 삭제
			$(document).on('click', function (e) {
				if ($(e.target).hasClass('btn_del')) {
					var agent = navigator.userAgent.toLowerCase(),
						btnFileDel = $(e.target),
						fileForm = btnFileDel.parents('.file_form'),
						fileInput = fileForm.find('.input_file');
					btnFileDel.parent('.file').remove();

					if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) { //ie
						fileInput.replaceWith(fileInput.clone(true));
					} else {//other browser
						fileInput.val('');
					}
					if(fileForm.find('.drop_zone .area > .file').length == 0){
						fileForm.removeClass('upload');
					}
				}
			});
		}
	});
});