// pull main container
var container = $('main.container');

// get moment() info
var weekday = moment().format('dddd');
var dateString = moment().format('LL');
var currentTime = moment();

// log moment() info
console.log('Current Day: ', weekday.toString());
console.log('Current Date: ', dateString.toString());
console.log('Current Time: ', currentTime.toString());
console.log('Current Hour Block: ', currentTime.format('h A').toString());
console.log('—————');

// create array by hour blocks
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
	moment('6 PM', 'h A')
];

// update header content to pull current week day and full date
$('.title h1').html('<h1 class="mb-0"><span>' + weekday + ' </span>' + dateString + '</h1>');


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
	
	// if events are stored, output them on page load
	var stored = localStorage.getItem(i.format('h A'));
	if (stored !== null) { // if elements are stored,
		textarea.val(stored);
		textarea.css('height', 'auto!important');
	}
	
	// adjusts textarea height if you input multiple lines
	textarea.on("input", function() {
		if ( $(this).val() !== '' ) {
			$(this).css('height', $(this).prop('scrollHeight') + 'px');
		} else {
			$(this).css('height', '44px');
		}
	});
	
	// allows you to shift+return in the textarea, but return submits the form
	textarea.keypress(function (event) {
	    if(event.which == 13 && !event.shiftKey) {        
	        $(this).closest("form").submit();
	        event.preventDefault();
	    }
	});
	
	// on form submit, send value of textarea to local storage
	form.on('submit', function(event) {
		event.preventDefault();
		
		var storedTime = textarea.val().trim();

		if (storedTime === '') { 
			return;
		}
		
		localStorage.setItem(i.format('h A'), storedTime);
	});
	
	// append all items
	form.append(textarea);
	timeContainer.append(circle);
	timeContainer.append(hour);
	timeBlock.append(timeContainer);
	timeBlock.append(form);
	container.append(timeBlock);
	
});

// get current, before, and after hour number
var currentHour = currentTime.hour();
var startHour = moment('8:00:00 AM', "HH:mm:ss a").hour();
var endHour = moment('6:00:00 PM', "HH:mm:ss a").hour();

// change data if before, after, or during work hours
if (currentHour < startHour) {
	
	$('header').css('background', '#000c4f');
	$('.day-icon img').attr('src', 'img/night.svg');
	
	var alert = $('<p>').attr('id', 'after-hours').addClass('text-center');
	alert.text('Not quite time to work yet! Check back at 8 AM.');
	$('main.container').append(alert);
	
} else if (currentHour >= endHour) {
	
	$('header').css('background', '#000c4f');
	$('.day-icon img').attr('src', 'img/night.svg');
	
	var alert = $('<p>').attr('id', 'after-hours').addClass('text-center')
	alert.text('Done for the day! Check back tomorrow at 8 AM.');
	$('main.container').append(alert);
	
} else {
	
	$('header').css('background', '#3B59FF');
	$('.day-icon img').attr('src', 'img/day.svg');
	
}