const { Menu, shell } = require("electron");

module.exports = (appWin) => {
  const template = [
    {
      label: "Items",
      submenu: [
        {
          label: "Add New",
          click: () => {
            appWin.send("menu-show-modal");
          },
          accelerator: "CmdOrCtrl+O",
        },
        {
          label: "Read Item",
          click: () => {
            appWin.send("menu-open-item");
          },
          accelerator: "CmdOrCtrl+Enter",
        },
        {
          label: "Delete Item",
          click: () => {
            appWin.send("menu-delete-item");
          },
          accelerator: "CmdOrCtrl+Backspace",
        },
        {
          label: "Open in Browser",
          click: () => {
            appWin.send("menu-open-item-native");
          },
          accelerator: "CmdOrCtrl+Shift+Enter",
        },
        {
          label: "Search Items",
          click: () => {
            appWin.send("menu-focus-search");
          },
          accelerator: "CmdOrCtrl+S",
        },
      ],
    },
    { role: "editMenu" },
    { role: "windowMenu" },
    {
      role: "help",
      submenu: [
        {
          label: "Learn more",
          click: () => {
            shell.openExternal("https://github.com/Hvinder/Readit-electron");
          },
        },
      ],
    },
  ];

  if (process.platform === "darwin") {
    template.unshift({ role: "appMenu" });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
