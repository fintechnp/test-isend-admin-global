export default function buildRoute(routePath, ...params) {
    let arrayContainsObject = params.some((e) => Object.prototype.toString.call(e) === "[object Object]");

    if (arrayContainsObject && params.length > 1)
        throw new Error("Expected only single parameter while route parameter has an object as a parameter");

    if (arrayContainsObject) {
        routePath = routePath.split("/");

        let routeParams = params[0];

        Object.keys(routeParams).forEach((key) => {
            routePath = routePath.map((path) => {
                if (`:${key}` === path) {
                    let value = routeParams[key];
                    delete routeParams[key];
                    return value;
                }
                return path;
            });
        });

        routePath = routePath.join("/");

        if (Object.keys(routeParams).length > 0) {
            routePath = routePath + "?" + new URLSearchParams(routeParams);
        }
    } else {
        routePath = routePath.replace(/:([^/]+)/, params[0]);

        params.shift();

        if (params.length > 0) {
            routePath = routePath + "?" + params.join("&");
        }
    }
    return routePath;
}
