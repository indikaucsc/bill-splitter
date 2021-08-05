import * as express from "express";
import {injectable} from "inversify";


@injectable()
export abstract class AbstractInterceptor {


    private excludeOptions = {};

    public abstract handler(req: express.Request, res: express.Response, next: express.NextFunction): void;

    public getExcludeOptions() {
        return this.excludeOptions;
    }

    protected configureExcludeOptions(options) {
        this.excludeOptions = options;
    }
}
