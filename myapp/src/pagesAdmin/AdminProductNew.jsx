import React from "react";
import styled from "styled-components";
import { Sidebar } from "../components/Admin/SideBar";
import { ProductForm } from "../components/Admin/Form/ProductForm";
import { createProduct } from "../redux/apiCallsProduct";

const Container = styled.div`
    display: flex;
    position: absolute;
    background: linear-gradient(rgba(255,255,255, 0.7), rgba(255, 255, 255, 0.7)),
    url("https://i.pinimg.com/736x/09/72/d0/0972d05282f6b3a59ef49772d8613cfe.jpg") center;
    background-size: cover;
`

function AdminProductNew() {
    return(
        <Container>
            <Sidebar/>
            <ProductForm
                label = 'New Product'
                submit = {(dispatch, product) => createProduct(dispatch, product) }
                buttonText = 'Save'
            />
        </Container>
    );
}

export {AdminProductNew};