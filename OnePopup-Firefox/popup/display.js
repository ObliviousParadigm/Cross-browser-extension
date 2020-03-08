// Execute listTabs when display.html is loaded
document.addEventListener("DOMContentLoaded", listTabs);

// browser is the namespace for the WebExtensions API

// This function is used t return all the tabs (as objects?)
// Return tabs.Tab object for tabs in the current window
function getTabs() {
	// ONLY ACTIVE WINDOW
	// return browser.tabs.query({ currentWindow: true });

	// EVERY WINDOW BUT THE ACTIVE WINDOW
	// return browser.tabs.query({ currentWindow: false });

	// ALL WINDOWS
	return browser.tabs.query({});
}

// This function is used to redirect to the tab that has been clicked on
// It takes the event handler, url, and the tab id as parameters
function redirectToTab(e, link, id) {

	// Prevent the anchor tag from opening the link in a new tab
	e.preventDefault();

	// Retrieve all the tabs and compare to find the right tab and its location
	getTabs().then(function (tabs) {
		for (let tab of tabs) {
			if (tab.url == link && tab.id == id) {
				// e.target.innerHTML = 'found'+tab.url+' '+tab.id+' '+tabLink;

				// If the URL and id of the tab matches the one that was clicked 
				// Make that tab the acive tab 
				browser.tabs.update(tab.id, {
					active: true
				});
				// And make that specific window focused 
				browser.windows.update(tab.windowId, {
					focused: true
				});
			}
		}
	});
}

// This function is used to convert the given URL(parameter) into a QR Code 
// Phones can scan this QR Code and open up the specified URL on their phones
function dispQR(url) {
	// At any point in time, only one of the two
	// 1) The tabs 2)The QR Code
	// Will be displayed
	let allTabs = document.querySelector('.switchTabs');
	let qrCode = document.querySelector('.qrCode');

	let body = document.querySelector('body');
	let deets = document.createElement('p');
	let back = document.createElement('button');

	// Hinding the tabs and displaying the QR Code
	allTabs.style.display = 'none';
	qrCode.style.display = 'block';
	back.textContent = 'Display all the websites';

	// This (method)? converts the given URL into a QR Code
	let code = kjua(
		{
			render: 'canvas',
			text: url,
			size: 250,
		});

	// deets.setAttribute('style', 'white-space: pre;');

	// Beautifying the QR Code div elements
	// ---------------------------------------------------------
	deets.classList.add('text-center', 'text-muted', 'text-break');
	back.classList.add('text-center', 'alert', 'alert-danger', 'btn');

	back.setAttribute('style', 'margin: auto; display: block;');
	// body.setAttribute('style', 'height: auto;');

	deets.innerHTML = 'Please scan the QR Code with<br>your phone camera or<br>a QR code reader';
	// ---------------------------------------------------------

	// This button, when clicked, will hide the QR Code and remove it 
	// And display all the tabs
	back.onclick = function () {
		body.removeChild(code);
		body.removeChild(deets);
		body.removeChild(back);
		allTabs.style.display = 'block';
		qrCode.style.display = 'none';
	}

	body.appendChild(code);
	body.appendChild(deets);
	body.appendChild(back);
};

// This is the fucntion that's called first
// It's used to display all the tabs from all the windows
function listTabs() {
	// getTabs() is a promise
	getTabs().then(function (tabs) {
		let tabsList = document.getElementById('tabList');
		let currentTabs = document.createDocumentFragment();
		let tabCounter = 1;
		let winCounter = 1;
		let tab;

		// Clear the content of tabList to keep refreshing the data 
		// everytime you click on the extension
		tabsList.textContent = '';

		let window = Infinity;

		// Looping through all the tabs that have been returned by getTabs()
		for (tab of tabs) {

			// This if statement is used to group the tabs based on 
			// which window they're open in
			// If the windowId isn't the same as the previous Id, then 
			// update the windowId and create a new window box and display the next set of tabs
			if (tab.windowId != window) {
				let newWindow = document.createElement('p');
				newWindow.textContent = 'Window ' + winCounter;

				// Beautifying the window box
				newWindow.setAttribute('style', 'white-space: pre; margin: 7px auto 5px auto; height: auto; width: auto;');
				newWindow.classList.add('para', 'alert', 'alert-dark');

				currentTabs.appendChild(newWindow);

				// Updating and reseting variables
				tabCounter = 1;
				winCounter += 1;
				window = tab.windowId;
			}

			// These are all the variables that will be used to display each tab
			let ul = document.createElement('ul');
			let btn = document.createElement('a');
			let tabLink = document.createElement('a');
			let br = document.createElement('br');
			let time = new Date(tab.lastAccessed).toLocaleString();
			// For button
			let img = document.createElement('img');
			let fig = document.createElement('figure');
			let figCaption = document.createElement('figcaption');

			tabLink.textContent = tabCounter + '. ' + (tab.title || tab.id);
			tabLink.textContent += ' \r\n\tLast accessed: ' + time;
			figCaption.textContent = 'Display QR Code';

			// white-space: pre; is used to add newlne '\n' in textContent
			tabLink.setAttribute('style', 'white-space: pre;');
			tabLink.setAttribute('href', tab.url);
			// data-* are custom attributes that can be used to store 
			// extra details
			tabLink.setAttribute('data-id', tab.id);
			img.setAttribute('src', 'QR.png');
			img.setAttribute('alt', 'QR Code Img');
			// role is an attribute that lets the screen reader know that
			// this is not a link, it is a button
			// it's not really needed but I just wanted to use it
			btn.setAttribute('role', 'button');
			btn.setAttribute('style', 'width: 100px');
			// Displaying the QR Code by sending the link
			// btn.onclick = dispQR(tabLink.getAttribute('href'));

			// btn, when clicked, will display the QR Code of the tab it's associated with
			btn.onclick = () => dispQR(tabLink.getAttribute('href'));
			// tabLink is the anchor tag that displays the details about the tab
			// On clicking this, the user will be redirected to the specified tab
			tabLink.onclick = () => redirectToTab(event, tabLink.getAttribute('href'), tabLink.getAttribute('data-id'));

			// If the tab is the active tab of the window, it will be highlighted via
			// this if statement
			if (tab.active) {
				tabLink.classList.add('active');
			}

			// list-group-item, list-group-item-action are used to beautify the anchor tags 
			// overflow-auto is used to handle text that's longer than the popup
			// by making that anchor tag scrollable
			tabLink.classList.add('list-group-item', 'list-group-item-action', 'overflow-auto');
			btn.classList.add('list-group-item', 'list-group-item-action', 'overflow-auto', 'btn', 'btn-outline-dark', 'button');
			fig.classList.add('mx-auto', 'd-block');
			ul.classList.add('list-group', 'list-group-horizontal');

			fig.appendChild(img);
			fig.appendChild(figCaption);
			btn.appendChild(fig);
			ul.appendChild(tabLink);
			ul.appendChild(btn);
			currentTabs.appendChild(ul);
			currentTabs.appendChild(br);

			// This keeps track of the tab number
			// It will be resetted when a new window is encountered
			tabCounter += 1;
		}
		// This is the div tag that will contain all the tabs and their QR Code
		// buttons 
		tabsList.appendChild(currentTabs);
	});
}