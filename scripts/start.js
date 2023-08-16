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

const runApp = async (appType, mode) => {
    const { app } = await prompt({
        type: 'input',
        name: 'app',
        message: `Enter the ${appType} app name:`,
    });

    const command = `APP=${app} npm run ${mode}:${appType}`;
    const childProcess = exec(command);
    childProcess.stdout.pipe(process.stdout); // Pipe standard output to terminal
    childProcess.stderr.pipe(process.stderr); // Pipe standard error to terminal
};

const runOption = async () => {
    try {
        const { option } = await prompt({
            type: 'select',
            name: 'option',
            message: 'Select an option:',
            choices: [
                'Build',
                'Dev',
                'Start',
            ],
        });

        const { appType, mode } = await prompt([
            {
                type: 'select',
                name: 'appType',
                message: 'Select an app:',
                choices: [
                    'Frontend',
                    'Strapi',
                    'Both',
                ],
            },
            {
                type: 'input',
                name: 'mode',
                message: 'Enter mode (build, dev, start):',
            },
        ]);

        switch (option) {
            case 'Build':
                if (appType === 'Both') {
                    const { strapiApp, frontendApp } = await prompt([
                        {
                            type: 'input',
                            name: 'strapiApp',
                            message: 'Enter the Strapi app name:',
                        },
                        {
                            type: 'input',
                            name: 'frontendApp',
                            message: 'Enter the frontend app name:',
                        },
                    ]);
                    const command = `APP1=${strapiApp} APP2=${frontendApp} npm run ${mode}:both`;
                    const childProcess = exec(command);
                    childProcess.stdout.pipe(process.stdout);
                    childProcess.stderr.pipe(process.stderr);
                } else {
                    runApp(appType.toLowerCase(), mode);
                }
                break;

            case 'Dev':
            case 'Start':
                if (appType === 'Both') {
                    const { strapiApp, frontendApp } = await prompt([
                        {
                            type: 'input',
                            name: 'strapiApp',
                            message: 'Enter the Strapi app name:',
                        },
                        {
                            type: 'input',
                            name: 'frontendApp',
                            message: 'Enter the frontend app name:',
                        },
                    ]);
                    const command = `APP1=${strapiApp} APP2=${frontendApp} npm run ${mode}:both`;
                    const childProcess = exec(command);
                    childProcess.stdout.pipe(process.stdout);
                    childProcess.stderr.pipe(process.stderr);
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
