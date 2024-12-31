import {useState} from 'react'
import {FinancePage} from "@/pages/modules/finance/index.jsx";
import {MainMenu} from "@/components/layout/mainMenu.jsx";
import {Box, Flex} from "@chakra-ui/react";
import {Appbar} from "@/components/layout/appbar.jsx";

function App() {

    return (
        <>
            <Appbar/>
            <Flex>
                <MainMenu/>
                <FinancePage/>
            </Flex>
        </>
    )
}

export default App
