import {modulesRoutes} from "@/routes/modulesRoutes.js";


/**
 * @param module - The module key to get the routes children.
 * return a list of routes
 */
export const menuRoutes = (module) => modulesRoutes[module].children;
