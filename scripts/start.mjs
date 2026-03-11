/* eslint-disable no-undef */
import { exec } from 'child_process';
import fs from 'node:fs';
import path from 'node:path';
import enquirer from 'enquirer';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Available projects and their configurations
const projects = {
  'pdc-dashboard': { prefix: 'pdc' },
  'vth-dashboard': { prefix: 'vth' },
};

// Utility: Run a command with streaming output
function runCommand(command) {
  const child = exec(command, {
    cwd: path.resolve(__dirname, '..'),
    shell: true,
  });
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  child.on('error', (err) => {
    console.error(`❌ Failed to start process: ${err.message}`);
  });

  child.on('exit', (code) => {
    if (code === 0) {
      console.log('✅ Command completed successfully');
    } else {
      console.error(`❌ Command failed with exit code ${code}`);
    }
  });
}

// Copy environment file to .env if present (optional)
function copyEnvFile(envFile) {
  const envFilePath = path.resolve(__dirname, '..', envFile);
  const targetEnvPath = path.resolve(__dirname, '..', '.env');

  if (!fs.existsSync(envFilePath)) {
    console.warn(`⚠️ Optional environment file '${envFile}' not found — skipping copy.`);
    return true; // return true so the caller continues
  }

  fs.copyFileSync(envFilePath, targetEnvPath);
  console.log(`📋 Copied ${envFile} to .env`);
  return true;
}

// Docker workflow
const runDocker = async () => {
  const { project } = await enquirer.prompt({
    type: 'select',
    name: 'project',
    message: 'Select Project:',
    choices: Object.keys(projects),
  });

  const { environment } = await enquirer.prompt({
    type: 'select',
    name: 'environment',
    message: 'Select Environment:',
    choices: ['dev', 'prod'],
  });

  const { action } = await enquirer.prompt({
    type: 'select',
    name: 'action',
    message: 'Select Action:',
    choices: ['up --build', 'up', 'down'],
  });

  const prefix = projects[project].prefix;
  const composeFile = `docker-compose.${prefix}.${environment}.yml`;
  const envFile = `.${prefix}.${environment}.env`;

  // Validate docker-compose file
  if (!fs.existsSync(path.resolve(__dirname, '..', composeFile))) {
    console.error(`❌ Docker Compose file '${composeFile}' does not exist.`);
    return;
  }

  // Copy env file to .env (same as deploy.sh)
  if (!copyEnvFile(envFile)) return;

  console.log(`🐳 Running: docker-compose -f ${composeFile} ${action}`);
  runCommand(`docker-compose -f ${composeFile} ${action}`);
};

// Workspace workflow
const runWorkspace = async (mode) => {
  const appChoices = [
    ...Object.keys(projects),
    ...Object.keys(projects).map((p) => p.replace('-dashboard', '-frontend')),
    'both (dashboard + frontend)',
  ];

  const { app } = await enquirer.prompt({
    type: 'select',
    name: 'app',
    message: 'Select App:',
    choices: appChoices,
  });

  if (app === 'both (dashboard + frontend)') {
    const { project } = await enquirer.prompt({
      type: 'select',
      name: 'project',
      message: 'Select Project:',
      choices: [...new Set(Object.values(projects).map((p) => p.prefix))],
    });

    console.log(`🚀 Starting both ${project}-dashboard and ${project}-frontend in ${mode} mode...`);
    runCommand(`pnpm --filter @frameless/${project}-dashboard --filter @frameless/${project}-frontend ${mode}`);
  } else {
    console.log(`🚀 Starting ${app} in ${mode} mode...`);
    runCommand(`pnpm --filter @frameless/${app} ${mode}`);
  }
};

// Entry point
const runOption = async () => {
  try {
    const { option } = await enquirer.prompt({
      type: 'select',
      name: 'option',
      message: 'Select an option:',
      choices: ['Build', 'Dev', 'Start', 'Docker'],
    });

    switch (option) {
      case 'Docker':
        await runDocker();
        break;
      case 'Build':
        await runWorkspace('build');
        break;
      case 'Dev':
        await runWorkspace('dev');
        break;
      case 'Start':
        await runWorkspace('start');
        break;
      default:
        console.log('Invalid option selected');
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    process.exit(1);
  }
};

runOption();
