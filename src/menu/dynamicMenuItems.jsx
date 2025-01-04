import {Link} from "react-router-dom";

/**
 * Function to generate menu items from routes
 * @param routes : menuRoutes[]
 * @returns React.ReactNode
 */
export const dynamicMenuItems = (routes) => {

    // path: "", element: <HomePage/>, label:"Home", isInMenu: false, isEnabled: false
    return routes.map((route) => {

        if (route.children.length > 0) {
            return route.children.map((childRoute) => {
                if(childRoute.isInMenu && childRoute.isEnabled){
                    return (
                        <li>
                            <Link to={`${route.path}/${childRoute.path}`}>{childRoute.label}</Link>
                        </li>
                    )
                }
                return null
            })
        }

        return <li>
            <Link to={`${route.path}`}>{route.label}</Link>
        </li>

    })
}