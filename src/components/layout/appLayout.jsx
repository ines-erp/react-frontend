import {Outlet} from "react-router";
import {Flex, SimpleGrid} from "@chakra-ui/react";
import {Appbar} from "@/components/layout/appbar.jsx";
import {MainMenu} from "@/components/layout/mainMenu.jsx";

export const AppLayout = () => {
    return (
        <SimpleGrid>
            <Appbar/>
            <Flex>
                <MainMenu/>
                <Outlet/>
            </Flex>
        </SimpleGrid>
    )
}