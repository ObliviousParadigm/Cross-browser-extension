// Execute listTabs when display.html is loaded
document.addEventListener("DOMContentLoaded", listTabs);

function getTabs() {
	// Return tabs.Tab object for tabs in the current window

	// ONLY ACTIVE WINDOW
	// return browser.tabs.query({ currentWindow: true });

	// EVERY WINDOW BUT THE ACTIVE WINDOW
	// return browser.tabs.query({ currentWindow: false });

	// ALL WINDOWS
	return browser.tabs.query({});
}

function listTabs() {
	getTabs().then(function (tabs) {
		let tabsList = document.getElementById('tabList');
		let currentTabs = document.createDocumentFragment();
		let tabCounter = 1;
		let winCounter = 1;
		let tab;
		let arr = [];

		// Clear the content of tabList to keep refreshing the data 
		// everytime you click on the extension
		tabsList.textContent = '';

		// Collecting all the window numbers
		for (tab of tabs) {
			if (!arr.includes(tab.windowId)) {
				arr.push(tab.windowId)
			}
		}

		let window = Infinity;

		for (tab of tabs) {

			if (tab.windowId != window) {
				let newWindow = document.createElement('p');
				newWindow.innerHTML = 'Window ' + winCounter + '\n<hr>';

				newWindow.setAttribute('style', 'white-space: pre;');

				currentTabs.appendChild(newWindow);

				// Updating and reseting variables
				tabCounter = 1
				winCounter += 1
				window = tab.windowId;
			}
			
			let tabLink = document.createElement('a');
			let br = document.createElement('br');
			let time = new Date(tab.lastAccessed).toLocaleString();

			tabLink.textContent = tabCounter + '. ' + (tab.title || tab.id);
			tabLink.textContent += ' \r\n\tLast accessed: ' + time + tab.windowId;

			// This is used to add linebreak in textContent.
			tabLink.setAttribute('style', 'white-space: pre;');
			tabLink.setAttribute('href', tab.url);

			// tabLink.onclick = function () {
			// 	// window.open(tab.id, tab.title);
			// 	// browser.tabs.create({ "url": tabs.url })
			// 	// browser.tab.remove(tab.id);
			// }


			// WIP-------------------------------------------
			tabLink.addEventListener("click", function (e) {
				e.preventDefault();
				browser.windows.create({
					url: tabLink.getAttribute('href')
				});
				// window.open(tabLink.getAttribute('href'));
			})
			// ----------------------------------------------

			tabLink.classList.add('switchTabs');
			currentTabs.appendChild(tabLink);
			currentTabs.appendChild(br);

			tabCounter += 1;

		}
		tabsList.appendChild(currentTabs);
	});
}