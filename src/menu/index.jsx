//TODO: finish that implementation when have menu

//helper function to menu dynamically
import {Link} from "react-router-dom";
import {HomeRoutes} from "@/pages/Home/HomeRoutes.jsx";
import {OtherModuleRoutes} from "@/pages/Other module/OtherModuleRoutes.jsx";

const creatingDinamicMenu = (routingObjLikeArray) => {

    let path;
    const linksToNav = []

    for (let route of routingObjLikeArray) {
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

export const menuItemsListInorder = [...HomeRoutes, ...OtherModuleRoutes]

export const RouterMainMenu = () => {
    
    return (
        <nav>
            menu
            {creatingDinamicMenu(menuItemsListInorder)}
        </nav>
    )
}