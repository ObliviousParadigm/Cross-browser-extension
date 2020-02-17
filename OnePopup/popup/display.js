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
		let counter = 1;
		let tab;

		// Clear the content of tabList to keep refreshing the data 
		// everytime you click on the extension
		tabsList.textContent = '';

		for (tab of tabs) {
			// let window = tab.windowId;

			let tabLink = document.createElement('a');
			let br = document.createElement('br');
			let time = new Date(tab.lastAccessed).toLocaleString();

			tabLink.textContent = counter + '. ' + (tab.title || tab.id);
			tabLink.textContent += ' \r\nLast accessed: ' + time + tab.windowId;

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
					url: [tab.url]
				});
			})
			// ----------------------------------------------

			tabLink.classList.add('switchTabs');
			currentTabs.appendChild(tabLink);
			currentTabs.appendChild(br);
			// }
			counter += 1;
		}
		tabsList.appendChild(currentTabs);
	});
}