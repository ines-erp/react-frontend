import {Link} from "react-router-dom";

/**
 * Function to generate menu items from routes
 * @param routes : menuRoutes[]
 * @returns React.ReactNode
 */
export const dynamicMenuItems = (routes) => {

    let path;
    let linksToNav

    for (let route of routes) {
        path = route.path;
        linksToNav = route.children;
    }


    // path: "", element: <HomePage/>, label:"Home", isInMenu: false, isEnabled: false
    return linksToNav.map((menuItem) => {

        console.log(menuItem.isInMenu, menuItem.isEnabled)
        
        if(menuItem.isInMenu && menuItem.isEnabled){
            return (
                <li key={`${path}/${menuItem.path}`}>
                    <Link to={`${path}/${menuItem.path}`}>{menuItem.label}</Link>
                </li>
            )
        }
        
        return null

    })
}