import {mkdir, writeFile} from 'node:fs/promises';
import path from "node:path";

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

const dataForFiles = (jsxPageName) => {
    const routesData = `

                        export const paymentMethodsRoutesList = [
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
                        ]`;

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


    const [indexData, routesData] = dataForFiles(jsxPageName);


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
