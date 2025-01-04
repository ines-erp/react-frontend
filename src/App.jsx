import {RouterProvider} from "react-router-dom";
import router from "@/routes/Router.jsx"


// routes > mainRoutesFiles > Function to routing > children > specific files for each module and routes the follows the same structure


function App() {

    return (
        <RouterProvider router={router}/>
    )
}


export default App
