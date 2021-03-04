const { ipcRenderer } = require("electron");
const items = require("./items");

// DOM nodes
const showModal = document.querySelector("#show-modal");
const closeModal = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const addItem = document.querySelector("#add-item");
const itemUrl = document.querySelector("#url");
const search = document.querySelector("#search");

// Perform actions from menu
ipcRenderer.on("menu-show-modal", () => {
  showModal.click();
});
ipcRenderer.on("menu-open-item", () => {
  items.open();
});
ipcRenderer.on("menu-open-item-native", () => {
  items.openNative();
});
ipcRenderer.on("menu-delete-item", () => {
  let selectedItem = items.getSelectedItem();
  items.delete(selectedItem.index);
});
ipcRenderer.on("menu-focus-search", () => {
  search.focus();
});

const toggleModalButtons = () => {
  if (addItem.disabled) {
    addItem.disabled = false;
    addItem.style.opacity = 1;
    addItem.innerText = "Add Item";
    closeModal.style.display = "inline";
  } else {
    addItem.disabled = true;
    addItem.style.opacity = 0.5;
    addItem.innerText = "Adding...";
    closeModal.style.display = "none";
  }
};

// filter items on search
search.addEventListener("keyup", (e) => {
  Array.from(document.querySelectorAll(".read-item")).forEach((item) => {
    item.style.display = item.innerText.toLowerCase().includes(search.value)
      ? "flex"
      : "none";
  });
});

// Navigate items using arrow keys
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    items.changeSelection(e.key);
  }
});

// show modal
showModal.addEventListener("click", (e) => {
  modal.style.display = "flex";
  itemUrl.focus();
});

// close modal
closeModal.addEventListener("click", (e) => {
  modal.style.display = "none";
});

// handle new item
addItem.addEventListener("click", (e) => {
  const newUrl = itemUrl.value;
  if (newUrl) {
    ipcRenderer.send("new-item", newUrl);
    toggleModalButtons();
  }
});

ipcRenderer.on("new-item-success", (e, newItem) => {
  items.addItem(newItem, true);

  toggleModalButtons();
  modal.style.display = "none";
  itemUrl.value = "";
});

// Listen for keyboard submit
itemUrl.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addItem.click();
  }
});
