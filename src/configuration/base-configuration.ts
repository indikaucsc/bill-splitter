
import {Application} from "express";


export interface BaseConfiguration {
    /**
     * Add express configurations,
     * which will be applied into the inversify express context
     *
     * @param app of Express Application
     */
    configure(app: Application);
}
