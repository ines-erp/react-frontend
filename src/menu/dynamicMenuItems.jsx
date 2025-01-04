import {Link} from "react-router-dom";

/**
 * Function to generate menu items from routes
 * @param routes : menuRoutes[]
 * @returns React.ReactNode
 */
export const dynamicMenuItems = (routes) => {

    let path;
    const linksToNav = []

    for (let route of routes) {
        path = route.path
        linksToNav.push(path)
        
        for (let child of route.children) {
            if (child.path) {
                linksToNav.push(`${path}/${child.path}`)
            }
        }
    }

    return linksToNav.map((menuItem) => {
        return <li key={menuItem}><Link to={menuItem}>{menuItem.split("/")}</Link></li>
    })
}