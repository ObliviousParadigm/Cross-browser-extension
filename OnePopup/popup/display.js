// FIRST TRY
// function dispTabs(tabs) {
//     var addTabs = document.querySelector('#tabList');
//     for (let tab in tabs) {
//         var node = document.createElement('li');
//         node.innerHTML = tab.url;
//         addTabs.appendChild(node);
//     }
// }

// // var addTabs = document.querySelector('#tabList');
// var querying = browser.tabs.query({ currentWindow: true });
// dispTabs(querying);
// --------------------------------------------------------------


// SECOND TRY
// function getTabs() {
//     return browser.tabs.query({ currentWindow: true });
// }

// function dispTabs() {
//     var tabList = getTabs();
//     var addToList = document.querySelector("#tabList");
//     var tab;
//     for (tab in tabList) {
//         var newLink = document.createElement("a");
//         newLink.setAttribute("href", tab.url);
//         newLink.innerHTML = tab.title
//         addToList.appendChild(newLink);
//         // console.log(tab.url);
//     }
// }

// dispTabs()
// --------------------------------------------------------------

// THIRD TRY

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
		// let limit = 5;
		let counter = 1;

		// Clear the content of tabList to keep refreshing the data 
		// everytime you click on the extension
		tabsList.textContent = '';

		for (let tab of tabs) {
			// if (counter <= limit) {
			let tabLink = document.createElement('a');
			let br = document.createElement('br');

			tabLink.textContent = counter + '. ' + (tab.title || tab.id)
				+ '\n' + tab.lastAccessed + '\n' + tab.windowId;

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