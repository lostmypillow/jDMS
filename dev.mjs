import { exec } from 'child_process';
import path from 'path';

const commands = [
  { dir: '/client', cmd: 'bun build' },
  { dir: '/server', cmd: 'bun start' },
];

function runCommand({ dir, cmd }) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd: path.resolve(dir) }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command in ${dir}:`, stderr);
        reject(error);
      } else {
        console.log(`Output from ${dir}:\n`, stdout);
        resolve(stdout);
      }
    });
  });
}

async function runCommandsSequentially() {
  try {
    for (const command of commands) {
      await runCommand(command);
    }
    console.log('All commands executed successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

runCommandsSequentially();
