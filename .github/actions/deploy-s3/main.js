// All of the code to successfully run a package should be included in the action's folder. That means that the node_modules
// here does not get ignored. It has to go up with the action.

// Although, we could run command line commands here, perhaps we could instead run an install instead of commiting with the
// dependencies?

// https://github.com/actions/toolkit provides a whole bunch of different packages that can be used to building actions.
// The core library provides us with all sorts of util methods for working with actions.
const core = require('@actions/core');
// The Github package can provide all sorts of methods to interact with Github's APIs and get information from GitHub.
// const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
    // We define the input values in the action.yml. Here, we can extract those values.
    // Required true throws an error if no value is yielded.
    const bucketName = core.getInput('the-custom-bucket-name', {required: true});
    // The required option does not have to be the same as in the .yml file.
    // Here we need the value for the proper execution of the logic, so from the POV of this file, it is needed.
    const bucketRegion = core.getInput('the-region-of-our-bucket', {required: true});

    // Exec can be used to execute commands like you would from the command line.
    // Anything that's pre-installed on the environment can be executed here. Consider that we're running this on
    // Github's Ubuntu, so anything on it can be executed here.
    exec.exec(`echo "${bucketName} ${bucketRegion}"`);

    // Notice allows us to log a message into a Github action workflow.
    core.notice('Log a message into a github action.');

    // Set the output for the action.
    core.setOutput('our-custom-website-url', 'https://omfgdogs.com')
}

run();