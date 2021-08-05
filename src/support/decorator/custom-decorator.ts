import * as Cluster from "cluster";
import * as Config from "config";
import * as Glob from "glob";
import * as OS from "os";
import * as PATH from "path";
import "reflect-metadata";

import {Wove} from "aspect.js";
import * as unless from "express-unless";
import {Container, decorate} from "inversify";
import {buildProviderModule, provide} from "inversify-binding-decorators";
import {controller} from "inversify-express-utils";
import {InversifyExpressServer} from "inversify-express-utils";
import {BaseConfiguration} from "../../configuration/base-configuration";
import {TYPES} from "../../constant/system-constant";
import {AbstractInterceptor} from "../../controller/interceptor/abstract-interceptor";
import {ProblemTranslator} from "../../problem/problem-translator";
import {Logger} from "../../util/logger";

// class meta data map
const metaDataMap = [];

/**
 * Push Metadata into local map helper method
 *
 * @param className
 */
function pushIntoMetaData(className: string) {
    metaDataMap.push(className);
}

/**
 * Service Decorator
 *
 * @param serviceIdentifier
 * @constructor
 */
export function Service(serviceIdentifier: any) {
    return (target: any) => {
        pushIntoMetaData(target.name);
        decorate(Wove(), target);
        decorate(provide(serviceIdentifier), target);
    };
}

/**
 * repository Decorator
 *
 * @param serviceIdentifier
 * @constructor
 */
export function Repository(serviceIdentifier: any) {
    return (target: any) => {
        pushIntoMetaData(target.name);
        decorate(Wove(), target);
        decorate(provide(serviceIdentifier), target);
    };
}


/**
 * Remote Proxy Decorator
 *
 * @param serviceIdentifier
 * @constructor
 */
export function RestController(url: string) {
    return (target: any) => {
        decorate(Wove(), target);
        decorate(controller(url), target);
    };
}

/**
 * Configuration Decorator
 *
 * @constructor
 */
export function Configuration() {
    return (target: any) => {
        pushIntoMetaData(target.name);
        decorate(provide(TYPES.Configuration), target);
    };
}

/**
 * Interceptor Decorator
 *
 * @constructor
 */
export function Interceptor() {
    return (target: any) => {
        decorate(provide(TYPES.Interceptor), target);
    };
}


/**
 * Problem Handler Decorator
 *
 * @constructor
 */
export function ProblemHandler() {
    return (target: any) => {
        decorate(provide(TYPES.ProblemTranslator), target);
    };
}

/**
 * Interceptor Wrapper
 *
 * @param interceptFunction
 */
export function interceptWrapper(interceptFunction) {
    const customMiddleware = (interceptFunction) as unless.RequestHandler;
    customMiddleware.unless = unless;
    return customMiddleware;
}

/**
 * Node Cloud Application Class Decorator
 * This Handles the node-express application specific configurations handling
 *
 * @param constructor
 * @constructor
 */
export function NodeApplication<T extends new(...args: any[]) => {}>(constructor: T) {

    const isClusterEnabled: boolean = getBoolean(process.env.CLUSTER);
    Logger.getLogger().info(`isClusterEnabled ::: ` + isClusterEnabled);

    if (isClusterEnabled && Cluster.isMaster) {
        // Create a worker for each CPU
        for (const cpu of OS.cpus()) {
            Cluster.fork();
        }
        // Listen for dying workers
        Cluster.on("exit", (worker) => {
            Logger.getLogger().info(`Worker ${worker.id} died !...`);
            // Replace the dead worker,
            Cluster.fork();
        });
    } else {
        // scan modules
        scanModules();

        // build inversify container
        const container = new Container();
        // scan provider modules
        container.load(buildProviderModule());

        // make inversify Express server
        const server = new InversifyExpressServer(container);
        server.setConfig((app) => {
            // apply configs into app
            container.getAll(TYPES.Configuration).forEach((config: BaseConfiguration) => {
                config.configure(app);
            });

            // container.getAll(TYPES.Interceptor).forEach((interceptor: AbstractInterceptor) => {
            //     app.use(interceptWrapper((req, res, next) => {
            //         interceptor.handler(req, res, next);
            //     }).unless(interceptor.getExcludeOptions()));
            // });
        });

        server.setErrorConfig((app) => {
            app.use((problem: Error, request, response, nextFunc) => {
                const exceptionHandler = container.get<ProblemTranslator>(TYPES.ProblemTranslator);
                exceptionHandler.process(problem, response);
            });
        });

        // build server instance
        const serverInstance = server.build();
        serverInstance.listen(process.env.APP_PORT);
        // call `main run` method
        return constructor.prototype.run.call(this);
    }
}

/**
 * Import Modules Dynamically
 * If meta-data not present in metaDataMap, those modules will be discarded
 *
 * @constructor
 */
export function scanModules() {
    // return function (target: any) {
    Glob.sync(PATH.join(__dirname, `../../**/*.ts`)).forEach((file) => {
        const module = require(file.replace(".ts", ""));
        if (Object.keys(module)[0] && metaDataMap.indexOf(Object.keys(module)[0]) === -1) {
            // module name not found as auto importing one
            delete require.cache[require.resolve(file.replace(".ts", ""))];
        }
    });
}


function getBoolean(value){
    switch(value){
        case true:
        case "true":
        case 1:
        case "1":
        case "on":
        case "yes":
            return true;
        default:
            return false;
    }
}



