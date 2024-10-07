import React from "react";
import { Navbar } from "../MyNav/Navbar";
import { Footer } from "../MyFooter/Footer";

export const NavAndFooterLayout = ({children}) =>{
    return (
        <div>
            <>
            <Navbar/>
            {children}
            <Footer/>
            </>
        </div>
    )
}