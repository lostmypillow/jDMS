const { spawn } = require("node:child_process");
const direc = process.cwd() + "/python/main.py";

function train() {
  const pythonProcess = spawn("python", [direc, "-t"]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  pythonProcess.stderr.on("data", (data) => {
    console.log(`Error: ${data.toString()}`);
  });

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      console.log(`Python script exited with code ${code}`);
    }
  });
}

function predict(headline) {
  const pythonProcess = spawn("python", [direc, "-c", headline]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  pythonProcess.stderr.on("data", (data) => {
    console.log(`Error: ${data.toString()}`);
  });

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      console.log(`Python script exited with code ${code}`);
    }
  });
}

function predictCategory(headline) {
  headline?  predict(headline) : train()
}

module.exports = predictCategory;
