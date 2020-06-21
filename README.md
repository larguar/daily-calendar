# Daily Calendar
A simple calendar application that allows a user to save events for each hour of the day. This app runs in the browser and features dynamically updated HTML and CSS powered by jQuery.

## Functionality Highlights
* Pulls and outputs current week day, full date, and current time via Moment.js
* If time block is in the past, circle and date are gray and textarea is muted
* If time block is in the future, circle is blue and date and textarea are at full opacity
* If time block is current, circle animates with border pulse
* If time is after work hours, header color and image change to night mode and alert is diplayed
* Textarea data saves to local storage automatically when you click out of it
* If data is stored in local storage, it auto populates on page load
* Textarea height gets taller if text is longer than the default height

## Todos
* ~~Pull week day, long date, and current time via Moment.js~~
* ~~Display week day, and long date in the header~~
* ~~Store data to local storage when submitted~~
* ~~Pull data from local storage to automatically appear on page refresh~~
* ~~Assign time blocks to actual times~~
* ~~If time block is in the past, gray the circle and time, and mute the textarea~~
* ~~If time block is current hour, display blue circle with animation~~
* ~~If time block is in the future, display blue circle~~
* ~~If time isn't between 9-5, display after hours message~~
* ~~If time isn't between 9-5, swap out header day image with night image~~
* ~~If time isn't between 9-5, update header color~~
* ~~Utilize loops to populate the data on the page~~
* ~~Update last time block form to have a border-bottom~~
* ~~Have the textarea height get taller if the text is longer than the default height~~
* ~~Automatically "save" an entry by hitting the enter key or clicking out of the textarea~~
