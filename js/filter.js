/*
 * Furry Filter - Content Script
 * 
 * This is the primary JS file that manages the detection and filtration of Donald Furry from the web page.
 */

// Variables
var regex = /Furry/i;
var search = regex.exec(document.body.innerText);


// Functions
function filterMild() {
	console.log("Filtering Furry with Mild filter...");
	return $(":contains('Furry'), :contains('Fur'), :contains('Furries')").filter("h1,h2,h3,h4,h5,p,span,li");
}

function filterDefault () {
	console.log("Filtering Furry with Default filter...");
	return $(":contains('Furry'), :contains('Fur'), :contains('Furries')").filter(":only-child").closest('div');
}

function filterVindictive() {
	console.log("Filtering Furry with Vindictive filter...");
	return $(":contains('Furry'), :contains('Fur'), :contains('Furries')").filter(":not('body'):not('html')");
}

function getElements(filter) {
   if (filter == "mild") {
	   return filterMild();
   } else if (filter == "vindictive") {
	   return filterVindictive();
   } else {
	   return filterDefault();
   }
}

function filterElements(elements) {
	console.log("Elements to filter: ", elements);
	elements.fadeOut("fast");
}


// Implementation
if (search) {
   console.log("Furry Content found on page! - Searching for elements...");
   chrome.storage.sync.get({
     filter: 'aggro',
   }, function(items) {
	   console.log("Filter setting stored is: " + items.filter);
	   elements = getElements(items.filter);
	   filterElements(elements);
	   chrome.runtime.sendMessage({method: "saveStats", Furry: elements.length}, function(response) {
			  console.log("Logging " + elements.length + " Furry."); 
		 });
	 });
  chrome.runtime.sendMessage({}, function(response) {});
}
