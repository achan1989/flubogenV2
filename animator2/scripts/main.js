function makeNavTabsClickable() {
  const tabs = document.getElementById("navTabBar").getElementsByClassName("tab");
  for (const tab of tabs) {
    tab.addEventListener("click", (event) => onNavTabClicked(event, tab));
  }
}

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

function loadTabContents() {
  const tabs = document.querySelectorAll("#navTabBar button.tab");
  for (const tab of tabs) {
    const name = tab.name;
    if (name === "intro") continue;
    const destination = document.querySelector("#tabContent_" + name);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", (evt) => {
      destination.replaceChildren(...xhr.response.body.childNodes)
    });
    xhr.addEventListener("error", (evt) => {
      destination.innerHTML = "<p>Loading failed!</p>";
    });
    xhr.open("GET", "matrices.html");
    xhr.responseType = "document";
    xhr.send();
  }
}


makeNavTabsClickable();
loadTabContents();
