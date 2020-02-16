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

function msToTime(duration) {
	var milliseconds = parseInt((duration % 1000) / 100),
		seconds = Math.floor((duration / 1000) % 60),
		minutes = Math.floor((duration / (1000 * 60)) % 60),
		hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;

	return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
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
			tabLink.textContent += ' Last accessed: ' + time + ' \n' + tab.windowId;

			tabLink.setAttribute('href', tab.url);

			// tabLink.onclick = () => {
			// 	window.open(tab.id, tab.title);
			// 	browser.tabs.create({"url": tabs.url})
			// 	browser.tab.remove(tab.id);
			// }

			tabLink.classList.add('switchTabs');
			currentTabs.appendChild(tabLink);
			currentTabs.appendChild(br);
			// }
			counter += 1;
		}
		tabsList.appendChild(currentTabs);
	});
}