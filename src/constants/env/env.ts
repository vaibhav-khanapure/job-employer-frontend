import clientEnv from "./clientEnv";
import serverEnv from "./serverEnv";

const ENV = {
    client: clientEnv,
    server: serverEnv,
    NODE_ENV: process.env.NODE_ENV
};

export default ENV;