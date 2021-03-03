const fs = require("fs");
let readerJS;
fs.readFile(`${__dirname}/reader.js`, (err, data) => {
  readerJS = data.toString();
});

let items = document.querySelector("#items");

exports.storage = JSON.parse(localStorage.getItem("readit-items")) || [];

// Listen for DONE event from proxy window
window.addEventListener("message", (e) => {
  if (e.data.action === "delete-reader-item") {
    this.delete(e.data.itemIndex);
    e.source.close();
  }
});

exports.delete = (itemIndex) => {
  items.removeChild(items.childNodes[itemIndex]);
  this.storage.splice(itemIndex, 1);
  this.save();

  if (this.storage.length) {
    let newSelectedItemIndex = itemIndex === 0 ? 0 : itemIndex - 1;
    document
      .getElementsByClassName("read-item")
      [newSelectedItemIndex].classList.add("selected");
  }
};

exports.getSelectedItem = () => {
  const currentItem = document.querySelector(".read-item.selected");
  let itemIndex = 0;
  let child = currentItem;
  while ((child = child.previousElementSibling) != null) itemIndex++;

  return { node: currentItem, index: itemIndex };
};

exports.save = () => {
  localStorage.setItem("readit-items", JSON.stringify(this.storage));
};

exports.select = (e) => {
  this.getSelectedItem().node.classList.remove("selected");
  e.currentTarget.classList.add("selected");
};

exports.open = () => {
  if (!this.storage.length) return;

  let selectedItem = this.getSelectedItem().node;
  let contentURL = selectedItem.dataset.url;
  let readerWin = window.open(
    contentURL,
    "",
    `
    maxWidth=2000,
    maxHeight=2000,
    width=1200,
    height=800,
    backgroundColor=#DEDEDE,
    nodeIntegration=0,
    contextIsolation=1
  `
  );
  readerWin.eval(readerJS.replace("{{index}}", this.getSelectedItem().index));
};

exports.changeSelection = (direction) => {
  const currentItem = this.getSelectedItem().node;
  if (direction === "ArrowUp" && currentItem.previousElementSibling) {
    currentItem.classList.remove("selected");
    currentItem.previousElementSibling.classList.add("selected");
  } else if (direction === "ArrowDown" && currentItem.nextElementSibling) {
    currentItem.classList.remove("selected");
    currentItem.nextElementSibling.classList.add("selected");
  }
};

exports.addItem = (item, isNew = false) => {
  const itemNode = document.createElement("div");
  itemNode.setAttribute("class", "read-item");
  itemNode.setAttribute("data-url", item.url);
  itemNode.innerHTML = `<img src="${item.screenshot}"><h2>${item.title}</h2>`;
  items.appendChild(itemNode);
  itemNode.addEventListener("click", this.select);
  itemNode.addEventListener("dblclick", this.open);
  if (document.querySelectorAll(".read-item").length === 1) {
    itemNode.classList.add("selected");
  }
  if (isNew) {
    this.storage.push(item);
    this.save();
  }
};

this.storage.forEach((item) => {
  this.addItem(item);
});
