//const { envs } = require('./config/env');
import { envs } from './config/env.js';
//const { startServer } = require('./server/server.js');
import { startServer } from './server/server.js';


const main = async() => {
    startServer({
        PORT: envs.PORT,
        PUBLIC_PATH: envs.PUBLIC_PATH
    });
}

(async() => {
    main();
})()