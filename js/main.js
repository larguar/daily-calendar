// pull main container
var container = $('main.container');

// get moment() info
var weekday = moment().format('dddd');
var dateString = moment().format('LL');
var currentTime = moment();

// log moment() info
console.log('Current Day: ', weekday.toString());
console.log('Current Date: ', dateString.toString());
console.log('Current Hour Block: ', currentTime.format('h A').toString());
console.log('—————');

// create array by hour blocks
var timeArray = [
	//moment('8 AM', 'h A'),
	//moment('9 AM', 'h A'),
	moment('10 AM', 'h A'), 
	moment('11 AM', 'h A'), 
	moment('12 PM', 'h A'),
	moment('1 PM', 'h A'),
	moment('2 PM', 'h A'),
	moment('3 PM', 'h A'),
	moment('4 PM', 'h A'),
	moment('5 PM', 'h A'),
	moment('6 PM', 'h A'),
	moment('7 PM', 'h A'),
	moment('8 PM', 'h A'),
	moment('9 PM', 'h A')
];

// update header content to pull current week day and full date
$('.title h1').html('<h1 class="mb-0"><span>' + weekday + ' </span>' + dateString + '</h1>');

// 
timeArray.forEach(function(i) {
	
	// create hour block container
	var timeBlock = $('<section>');
	timeBlock.addClass('hour-block row');
	//timeBlock.attr('id', 'hour-' + i.format('h'));
	
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
	textarea.attr('id', 'hour-' + i.format('h'));
	
	// !!!!! HELP HERE !!!!!
	// Can't figure out how to convert this to jQuery
	
/*
	textarea.addEventListener("input", evt => {
		if (this.textArea.value !== '') {
			textArea.style.height = textArea.scrollHeight + "px";
		} else {
			textArea.style.height = '44px';
		}
	});
*/
	
	textarea.keypress(function (event) {
	    if(event.which == 13 && !event.shiftKey) {        
	        $(this).closest("form").submit();
	        event.preventDefault();
	    }
	});
	
	form.on('submit', function(event) {
		event.preventDefault();
		
		// !!!!! HELP HERE !!!!!
		// Can't figure out how to grab the value of the textarea with jQuery
		
		var storedTime = 'test';

		if (storedTime === '') { 
			return;
		}
	
		localStorage.setItem(i.format('h A'), storedTime); // stringify the array and send to local storage
	});
	
	// append all items
	form.append(textarea);
	timeContainer.append(circle);
	timeContainer.append(hour);
	timeBlock.append(timeContainer);
	timeBlock.append(form);
	container.append(timeBlock);
	
});