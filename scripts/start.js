const { exec } = require('child_process');
const { prompt } = require('enquirer');
let runningChildProcess = null;

const handleExit = () => {
  if (runningChildProcess) {
    runningChildProcess.kill();
  }
  process.exit();
};

process.on('SIGINT', handleExit);
const projects = [
  {
    type: 'select',
    name: 'frontend',
    message: 'Select Your app name:',
    choices: ['pdc-frontend', 'vth-frontend', 'kennisbank-frontend'],
  },
  {
    type: 'select',
    name: 'dashboard',
    message: 'Select Your Strapi Dashboard app name:',
    choices: ['pdc-dashboard', 'vth-dashboard', 'kennisbank-dashboard'],
  },
];

const getAppChoices = (appType) => {
  switch (appType) {
    case 'frontend':
      return ['pdc-frontend', 'vth-frontend', 'kennisbank-frontend'];

    case 'strapi':
      return ['pdc-dashboard', 'vth-dashboard', 'kennisbank-dashboard'];

    default:
      return [];
  }
};

const runApp = async (appType, mode) => {
  if (getAppChoices(appType).length === 0) throw new Error('Invalid appType provided.');
  const { app } = await prompt({
    type: 'select',
    name: 'app',
    message: `Enter the ${appType} app name:`,
    choices: getAppChoices(appType),
  });
  const command = `APP=${app} npm run ${mode}:${appType}`;

  const childProcess = exec(command);
  childProcess.stdout.pipe(process.stdout); // Pipe standard output to terminal
  childProcess.stderr.pipe(process.stderr); // Pipe standard error to terminal
};

const getTheCurrentOption = ({ dashboard, frontend, mode }) => {
  const command = `APP1=${dashboard} APP2=${frontend} npm run ${mode}:both`;
  const childProcess = exec(command);
  childProcess.stdout.pipe(process.stdout);
  childProcess.stderr.pipe(process.stderr);
};

const runOption = async () => {
  try {
    const { option } = await prompt({
      type: 'select',
      name: 'option',
      message: 'Select an option:',
      choices: ['Build', 'Dev', 'Start'],
    });

    const { appType } = await prompt([
      {
        type: 'select',
        name: 'appType',
        message: 'Select an app:',
        choices: ['Frontend', 'Strapi', 'Both'],
      },
    ]);
    const mode = option?.toLowerCase();
    switch (option) {
      case 'Build':
        if (appType === 'Both') {
          const { frontend, dashboard } = await prompt(projects);
          getTheCurrentOption({ dashboard, frontend, mode });
        } else {
          runApp(appType.toLowerCase(), mode);
        }
        break;

      case 'Dev':
        if (appType === 'Both') {
          const { frontend, dashboard } = await prompt(projects);
          getTheCurrentOption({ dashboard, frontend, mode });
        } else {
          runApp(appType.toLowerCase(), mode);
        }
        break;
      case 'Start':
        if (appType === 'Both') {
          const { frontend, dashboard } = await prompt(projects);
          getTheCurrentOption({ dashboard, frontend, mode });
        } else {
          runApp(appType.toLowerCase(), mode);
        }
        break;

      default:
        break;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('An unexpected error occurred:', error);
    handleExit();
  }
};

runOption();
