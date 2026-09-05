import * as TabMatrices from "./tab_matrices.js";


/**
 * Load the UI and enable it.
 * @returns a promise
 */
async function loadUi() {
  const toLoad = [
    ["tabContent_matrices", "matrices.html", TabMatrices.init]
  ];

  const loadPromises = [];
  for (const [destinationId, url, initFn] of toLoad) {
    const destination = document.getElementById(destinationId);
    loadPromises.push(loadTab(destination, url, initFn));
  }

  return Promise.all(loadPromises).then( () => {
    makeNavTabsClickable();
  }).catch( (error) => {
    console.error("loadUi() failed: ", error);
    alert("Loading failed: " + error);
  });
}

/**
 * Load a tab -- fetch its HTML, add it to the DOM, run some init code.
 * @param {HTMLElement} destination - add as children of this element.
 * @param {string} url
 * @param {function} initFn - takes nothing, returns nothing
 */
async function loadTab(destination, url, initFn) {
  const response = await fetch(url);
  if (!response.ok) {
    destination.innerHTML = "<p>Loading failed!</p>";
    throw new Error("Fetch of ${url} failed: ${response.status}");
  }

  const text = await response.text();
  const parser = new DOMParser();
  const fetchedDoc = parser.parseFromString(text, "text/html");

  destination.replaceChildren(...fetchedDoc.body.childNodes);
  initFn();
}

/**
 * Make the top navigation tabs clickable.
 */
function makeNavTabsClickable() {
  const tabs = document.getElementById("navTabBar").getElementsByClassName("tab");
  for (const tab of tabs) {
    tab.addEventListener("click", (event) => onNavTabClicked(event, tab));
    tab.removeAttribute("disabled");
  }
}

/**
 * Update the main pane when a top navigation tab is clicked.
 * @param {MouseEvent} event
 * @param {HTMLElement} clickedTab
 */
function onNavTabClicked(event, clickedTab) {
  // Make all tabs look inactive except the clicked one.
  const tabs = document.getElementById("navTabBar").getElementsByClassName("tab");
  for (const tab of tabs) {
    if (tab === clickedTab)
    {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  }

  // Hide all tab contents except the one we want.
  const tabContents = document.getElementById("tabContentWrapper").getElementsByClassName("tabContent");
  for (const tabContentNode of tabContents) {
    if (tabContentNode.id === "tabContent_" + clickedTab.name) {
      tabContentNode.classList.add("active");
    } else {
      tabContentNode.classList.remove("active");
    }
  }
}


await loadUi();
