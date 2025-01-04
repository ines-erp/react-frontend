//TODO: finish that implementation when have menu

import {menuRoutes} from "@/menu/menuRoutes.jsx";
import {dynamicMenuItems} from "@/menu/dynamicMenuItems.jsx";


export const RouterMainMenu = () => {

    return (
        <nav>
            {dynamicMenuItems(menuRoutes)}
        </nav>
    )
}