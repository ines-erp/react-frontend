import {mkdir, writeFile} from 'node:fs/promises';
import path from "node:path";

/**
 * Generates a new React page with associated routes and exports them for use in a React Router setup.
 *
 * This script is designed to automate the creation of a new React page component and its corresponding
 * route configuration. It takes command-line arguments to specify the directory path, page name, and
 * route file name. The script then generates the necessary files and directories in the `src/pages` folder.
 *
 * ### Usage:
 * Run the script with the following command-line arguments:
 * - `-dp` or `--dir-path`: Specifies the directory path where the new page will be created.
 * - `-pn` or `--page-name`: Specifies the name of the React component (used for both the component and routes).
 * - `-rf` or `--route-file`: Specifies the name of the route configuration file (without the `.jsx` extension).
 *
 * Example:
 * ```
 * node script.js -dp finance -pn FinanceDashboard -rf financeRoutes
 * ```
 *
 * ### Generated Files:
 * 1. `index.jsx`: Contains the React component for the new page.
 * 2. `<route-file>.jsx`: Contains the route configuration for the new page, including a list of routes
 *    and a parent route with a layout component.
 *
 * ### File Structure:
 * The script creates the following structure in the `src/pages` directory:
 * ```
 * src/pages/
 *   └── <dir-path>/
 *       ├── index.jsx
 *       └── <route-file>.jsx
 * ```
 *
 * ### Route Configuration:
 * The generated route file includes:
 * - A list of routes (`<PageName>RoutesList`) with properties like `element`, `icon`, `isEnabled`, `isInMenu`, `label`, and `path`.
 * - A parent route (`<PageName>Routes`) that wraps the routes in a layout component (`LayoutMenuAppbar`).
 *
 * ### Notes:
 * - The script ensures directories are created recursively if they don't exist.
 * - The generated React component is a simple functional component that renders a heading with the page name.
 * - The route configuration assumes the use of `react-router-dom` and includes an `Outlet` for nested routing.
 *
 * @module addNewPageWithRoutes
 * @requires node:fs/promises
 * @requires node:path
 * @see {@link https://nodejs.org/api/fs.html|Node.js File System}
 * @see {@link https://reactrouter.com/|React Router}
 */

//Argument list
const dPath = process.argv.findIndex((arg) =>
    /^(?:-dp|--dir-path)$/.test(arg),
);
const pageName = process.argv.findIndex((arg) =>
    /^(?:-pn|--page-name)$/.test(arg),
);
const routFile = process.argv.findIndex((arg) =>
    /^(?:-rf|--route-file)$/.test(arg),
);

let filehandle;

const dataForFiles = (jsxPageName, dirPath) => {
    const routesData = `

import {${jsxPageName}} from "@/pages/${dirPath}/index.jsx"; 
import {Outlet} from "react-router-dom"; 

export const ${jsxPageName}RoutesList = [
    {
        element: <${jsxPageName}/>,
        icon: "",
        isEnabled: true,
        isInMenu: true,
        label: "Dashboard",
        parentLabel: "Finance",
        path: ""
    },
    {element: <div>Name</div>, isEnabled: true, isInMenu: false, label: "MENU ROUTE NAME", path: "URL PATH"},
];


export const ${jsxPageName}Routes = [
    {
        children: ${jsxPageName}RoutesList.filter(item => item.isEnabled === true),
        element: <LayoutMenuAppbar/>,
        path: "/XXXX"
    }
];

`;

    const indexData = `export const ${jsxPageName} = () => {
    return<h1>${jsxPageName}</h1>
}`;

    return [indexData, routesData];
};


const addNewPageWithRoutes = async () => {
    if (dPath < 0) {
        return;
    }

    if (pageName < 0) {
        return;
    }

    if (routFile < 0) {
        return;
    }

    const dirPath = process.argv[dPath + 1];
    const jsxPageName = process.argv[pageName + 1];
    const routesFileName = process.argv[routFile + 1];


    const [indexData, routesData] = dataForFiles(jsxPageName, dirPath);


    try {
        const pagesDir = await path.resolve("./src/pages", dirPath);

        await mkdir(`${pagesDir}`, {recursive: true});
        filehandle = await writeFile(`${pagesDir}/index.jsx`, [indexData]);
        filehandle = await writeFile(`${pagesDir}/${routesFileName}.jsx`, [routesData]);

    } finally {
        await filehandle?.close();
    }

};

addNewPageWithRoutes();
