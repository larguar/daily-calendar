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
	moment('5 PM', 'h A')
];

// update header content to pull current week day and full date
$('.title h1').html('<h1 class="mb-0"><span>' + weekday + ' </span>' + dateString + '</h1>');


// loop through timeArray elements
timeArray.forEach(function(i) {
	
	// create hour block container
	var timeBlock = $('<section>').addClass('hour-block row');
	
	// add class to hour block if equal to or later than current time
	if (currentTime.format('h A') === i.format('h A')) {
		timeBlock.addClass('current');
	} else if (currentTime.isBefore(i)) {
		timeBlock.addClass('future');
	}
	
	// create time container
	var timeContainer = $('<article>').addClass('time col col-small');
	
	// create time indicator circle
	var circle = $('<div>').addClass('circle');
	
	// create hour block time
	var hour = $('<div>').addClass('hour').text(i.format('h A'));
	
	// create event form
	var form = $('<form>').attr('method', 'post').addClass('col');
	
	// create textarea within form
	var textarea = $('<textarea>').attr('id', 'time-' + i.format('hA'));
	
	// if events are stored, output them on page load
	var storageName = i.format('h A');
	var stored = localStorage.getItem(storageName);
	var height = localStorage.getItem(storageName + ' height');
	if (stored !== null) { // if elements are stored,
		textarea.val(stored).height(parseInt(height) + 20);
	}
	
	// adjusts textarea height if you input multiple lines
	textarea.on('input', function() {
		if ( $(this).val() !== '' ) {
			$(this).css('height', $(this).prop('scrollHeight') + 'px');
		} else {
			$(this).css('height', '44px');
		}
	});
	
	// allows you to shift+return in the textarea, but return submits the form
	textarea.keypress(function (event) {
	    if(event.which == 13 && !event.shiftKey) {        
	        $(this).closest('form').submit();
	        event.preventDefault();
	    }
	});
	
	// on form submit, send value of textarea to local storage
	form.on('change', function(event) {
		event.preventDefault();
		
		var storedTime = textarea.val();

		if (storedTime === '') { 
			return;
		}
		
		var textareaHeight = textarea.height();
		localStorage.setItem(storageName + ' height', textareaHeight);
		localStorage.setItem(storageName, storedTime);
	});
	
	// append all items
	form.append(textarea);
	timeContainer.append(circle);
	timeContainer.append(hour);
	timeBlock.append(timeContainer);
	timeBlock.append(form);
	container.append(timeBlock);
	
});

$('#time-5PM').parent().css('border-bottom', '1px solid #ebebeb');

var sixBlock = $('<section>').attr('id', 'six').addClass('hour-block row');
var sixTimeContainer = $('<article>').addClass('time col col-small');
var sixCircle = $('<div>').addClass('circle');
var sixHour = $('<div>').addClass('hour').text('6 PM');
sixTimeContainer.append(sixCircle, sixHour);
sixBlock.append(sixTimeContainer);
container.append(sixBlock);

// get current, before, and after hour number
var currentHour = currentTime.hour();
var startHour = moment('8:00:00 AM', 'HH:mm:ss a').hour();
var endHour = moment('6:00:00 PM', 'HH:mm:ss a').hour();

// change data if before, after, or during work hours
if (currentHour < startHour) {
	
	$('header').css('background', '#000c4f');
	$('.day-icon img').attr('src', 'img/night.svg');
	
	var alert = $('<p>').attr('id', 'after-hours');
	alert.text('Not quite time to work yet! Check back at 8 AM.');
	$('main.container').append(alert);
	
} else if (currentHour >= endHour) {
	
	$('header').css('background', '#000c4f');
	$('.day-icon img').attr('src', 'img/night.svg');
	
	var alert = $('<p>').attr('id', 'after-hours');
	alert.text('Done for the day! Check back tomorrow at 8 AM.');
	$('main.container').append(alert);
	
} else {
	
	$('header').css('background', '#3B59FF');
	$('.day-icon img').attr('src', 'img/day.svg');
	
	$('#six .circle').css('background', '#3B59FF');
	$('#six .hour').css('color', '#1e1e1e');
	
}