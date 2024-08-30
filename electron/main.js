const { app, BrowserWindow } = require("electron/main");

const createWindow = () => {
  const win = new BrowserWindow({ show: false });

  win.loadFile("index.html");
  win.maximize();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  // Start the Express server as a utility process
  const child = utilityProcess.fork(path.join(__dirname, "app-out.js"), [], {
    stdio: "pipe",
  });

  child.stdout.on("data", (data) => {
    console.log(`Express server output: ${data}`);
  });

  child.on("exit", (code) => {
    console.log(`Express server exited with code ${code}`);
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    if (child) {
      child.kill();
    }
    app.quit();
  }
});
