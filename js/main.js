var weekday = moment().format('dddd');
var dateString = moment().format('MMMM D, YYYY');

$('.title h1').html('<h1 class="mb-0"><span>' + weekday + ' </span>' + dateString + '</h1>');

/*
var textArea = document.querySelector("#event textarea");
textArea.addEventListener("input", evt => {
	if (this.textArea.value !== '') {
		textArea.style.height = textArea.scrollHeight + "px";
	} else {
		textArea.style.height = '44px';
	}
});
*/

var dateString = moment().format('LL');
var weekday = moment().format('dddd');

console.log(weekday.toString());
console.log(dateString.toString());


var container = $('main.container');
var currentTime = moment();
var timeArray = [
	moment('8 AM', 'h A'),
	moment('9 AM', 'h A'),
	moment('10 AM', 'h A'), 
	moment('11 AM', 'h A'), 
	moment('12 PM', 'h A'),
	moment('1 PM', 'h A'),
	moment('2 PM', 'h A'),
	moment('3 PM', 'h A'),
	moment('4 PM', 'h A'),
	moment('5 PM', 'h A'),
	moment('6 PM', 'h A'),
];

console.log('Current Time: ', currentTime.format('h A').toString());
console.log('—————');

timeArray.forEach(function(i) {
	
	console.log(i.format('h A'));
	
	// create hour block container
	var timeBlock = $('<section>');
	timeBlock.addClass('hour-block row');
	
	// add class to hour block if equal to or later than current time
	if (currentTime.format('h A') === i.format('h A')) {
		timeBlock.addClass('current');
	} else if (currentTime.isBefore(i)) {
		timeBlock.addClass('future');
	}
	
	// create time container
	var timeContainer = $('<article>');
	timeContainer.addClass('time col col-small');
	
	// create time indicator circle
	var circle = $('<div>');
	circle.addClass('circle');
	
	// create hour block time
	var hour = $('<div>');
	hour.addClass('hour');
	hour.text(i.format('h A'));
	
	// create event form
	var form = $('<form>');
	form.attr('id', 'event');
	form.attr('method', 'post');
	form.addClass('col');
	
	// create textarea within form
	var textarea = $('<textarea>');
	textarea.attr('name', 'cal-item');
	
	// append all items
	form.append(textarea);
	timeContainer.append(circle);
	timeContainer.append(hour);
	timeBlock.append(timeContainer);
	timeBlock.append(form);
	container.append(timeBlock);
	
});