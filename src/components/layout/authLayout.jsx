import {Center} from "@chakra-ui/react";
import {Outlet} from "react-router";

export const AuthLayout = () => {
    return (
        <Center bgColor={'gray.100'} h={'100vh'}>
            <Outlet />
        </Center>
    )
}