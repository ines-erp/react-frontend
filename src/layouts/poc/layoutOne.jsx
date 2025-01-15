export const LayoutOne = ({title, subtitle, hasCreateBtn, createFunction, layoutChildren, breadCrumbs}) => {


    const visibleElements = Object.entries(layoutChildren).map(([_, element]) => {

        if (element.isVisible) {
            return element;
        }
        return undefined;
    });

    return (
        <>
            <div>
                <h1>{title}</h1>
                <p>{subtitle}</p>

                {hasCreateBtn && <button onClick={createFunction}>Create button</button>}
            </div>

            {visibleElements.map(element => {
                return element && (<div style={{marginBottom: "32px"}}>
                    <h2>Element {element.title}</h2>
                    {element.children}
                </div>);
            })}
        </>

    );
};

const dataLayoutOne = {
    "breadCrumbs": [
        {"label": "Home", "link": "/"},
        {"label": "Home", "link": "/transactions"}
    ],
    "children": {
        "optional1": {children: [], isVisible: true, "title": "Optional one"},
        "optional2": {children: [], isVisible: false, "title": "Optional two"},
        "optional3": {children: [], isVisible: false, "title": "Optional three"},
        "optional4": {children: [], isVisible: true, "title": "Optional four"}
    },
    'createFunction': () => {
        console.log("jaca");
    },
    "hasCreateBtn": true,
    "subtitle": "this is the subtitle for page layout one",
    "title": "Page from layout one"

};