import { Application } from "express";
import { Configuration } from "../support/decorator/custom-decorator";
import { ApplicationContext } from "../util/application-context";
import { BaseConfiguration } from "./base-configuration";


@Configuration()
export class SecurityConfiguration implements BaseConfiguration {

    public configure(app: Application) {
        this.configureSecurityForUserController();

    }

    /**
     * Configure permission for the APIS defined in the UserController
     */
    configureSecurityForUserController(): void {
        ApplicationContext.getGlobalContext()
            .url("/api/v1/bill/settlements")
            .with("POST")


    }


}
