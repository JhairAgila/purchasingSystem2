import React from "react";
import styled from "styled-components";
import { Sidebar } from "../components/Admin/SideBar";
import { Products } from "../components/Admin/Products";
// import { Outlet } from "react-router-dom";

const Container = styled.div`
    display: flex;
    position: absolute;
    background: linear-gradient(rgba(255,255,255, 0.7), rgba(255, 255, 255, 0.7)),
    url("https://i.pinimg.com/736x/09/72/d0/0972d05282f6b3a59ef49772d8613cfe.jpg") center;
    background-size: cover;
`

function AdminProducts(){
    return (
    <Container>
        {/* <Outlet/>  */}
        <Sidebar/>  
        <Products/>
    </Container>);
}

export {AdminProducts};