export class ApplicationContext {

    public static getSecurityContext() {
        return this.securityContext;
    }

    public static getGlobalContext(): any {
        return this;
    }

    public static url(url): ApplicationContext {
        this.securityContextItem.url = url;
        return this;
    }

    public static with(httpMethod): ApplicationContext {
        this.securityContextItem.httpMethod = httpMethod;
        return this;
    }

    public static requirePermission(permissions): ApplicationContext {
        this.securityContextItem.permissions = permissions;
        this.securityContext.push(this.securityContextItem);
        this.securityContextItem = {
            url : "",
            httpMethod: "",
            permissions : [],
        };
        return this;
    }

    public static and(): ApplicationContext {
        return this;
    }

    private static securityContext = [];

    private static securityContextItem = {
        url : "",
        httpMethod: "",
        permissions : [],
    };




}
