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




function getTabs() {
    return browser.tabs.query({ currentWindow: true });
}

function dispTabs() {
    var tabList = getTabs();
    var addToList = document.querySelector("#tabList");
    var tab;
    for (tab in tabList) {
        var newLink = document.createElement("a");
        newLink.setAttribute("href", tab.url);
        newLink.innerHTML = tab.title
        addToList.appendChild(newLink);
        // console.log(tab.url);
    }
}

dispTabs()