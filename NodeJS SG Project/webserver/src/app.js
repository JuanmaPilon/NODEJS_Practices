const { envs } = require('./config/env');

const main = async() => {
    console.log(envs);
}

(async() => {
    main();
})()