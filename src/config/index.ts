import { Config } from "../interfaces/config";

import { config as develop } from "./develop";
import { config as production } from "./production";


let config: Config

if (process.env.DEBUG === 'true') {
    config = production;
} else {
    config = develop
}

export {
    config
}