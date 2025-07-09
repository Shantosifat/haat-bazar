import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Components/Home";
import AllProducts from "../pages/Home/AllProducts/AllProducts";

export const router = createBrowserRouter([
    {
        path:'/',
        Component: MainLayouts,
        children:[
            {
                index:true,
                Component: Home
            },
            {
                path:'allProducts',
                Component: AllProducts
            }
        ]
    }
])