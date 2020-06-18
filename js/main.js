var textArea = document.querySelector("#event textarea");
textArea.addEventListener("input", evt => {
	if (this.textArea.value !== '') {
		textArea.style.height = textArea.scrollHeight + "px";
	} else {
		textArea.style.height = '44px';
	}
});

/*
var textArea = $("#event textarea");
textArea.on("input", evt => {
	if ($(this).text.value !== '') {
		textArea.height(textArea.scrollHeight + "px");
	} else {
		textArea.height('44px');
	}
});
*/