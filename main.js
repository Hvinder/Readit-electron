const { app, BrowserWindow, ipcMain } = require("electron");
const windowStateKeeper = require("electron-window-state");
const readItem = require("./readItem");
const appMenu = require("./menu");
ipcMain.on("new-item", (e, itemUrl) => {
  readItem(itemUrl, (item) => {
    e.sender.send("new-item-success", item);
  });
});

function createWindow() {
  const state = windowStateKeeper({
    defaultWidth: 500,
    defaultHeight: 650,
  });

  const win = new BrowserWindow({
    x: state.x,
    y: state.y,
    width: state.width,
    height: state.height,
    minWidth: 350,
    maxWidth: 650,
    minHeight: 300,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  appMenu(win.webContents);

  win.loadFile("./renderer/main.html");

  // Open DevTools - Remove for PRODUCTION!
  win.webContents.openDevTools();

  state.manage(win);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
