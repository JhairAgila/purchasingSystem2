import { Announcement } from "@material-ui/icons";
import React from "react";
import { NavBar } from "../components/NavBar";
import { Products } from "../components/Products";

function WishListProduct(){
    return(
        <div>
            <Announcement />
            <NavBar />
            <Products/>
            
        </div>
    );
}

export {WishListProduct}