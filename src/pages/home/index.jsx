import {LayoutOne} from "@/layouts/poc/layoutOne.jsx";
import React from "react";


export const MyComponent = ({customTitle}) => {
    return <>
        <h3>My custom component</h3>
        <h4>{customTitle}</h4>
    </>;
};

const dataLayoutOne = {
    "breadCrumbs": [
        {"label": "Home", "link": "/"},
        {"label": "Home", "link": "/transactions"}
    ],
    "layoutChildren": {
        "optional1": {children: [], isVisible: true, "title": "Optional one"},
        "optional2": {
            children: [
                React.createElement(MyComponent, {customTitle: "Jaca melão"})
            ], isVisible: true, "title": "Optional two"
        },
        "optional3": {
            children: [<MyComponent customTitle="amora abobora"/>],
            isVisible: true,
            "title": "Optional three"
        },
        "optional4": {children: [], isVisible: true, "title": "Optional four"}
    },
    'createFunction': () => {
        console.log("jaca");
    },
    "hasCreateBtn": true,
    "subtitle": "this is the subtitle for page layout one",
    "title": "Page from layout one"

};

export const HomePage = () => {
    return (
        <LayoutOne {...dataLayoutOne} />
        // <>
        //     <Typography variant='h1'>Home</Typography>
        //     <Typography variant='h2'>Home</Typography>
        //     <Typography variant='h3'>Home</Typography>
        //     <Typography variant='h4'>Home</Typography>
        //     <Typography variant='h5'>Home</Typography>
        //     <Typography variant='h6'>Home</Typography>
        // </>
    );
};
