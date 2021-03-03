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
