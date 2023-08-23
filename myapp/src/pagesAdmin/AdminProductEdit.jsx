import React from 'react';
import styled from 'styled-components';
import { Sidebar } from '../components/Admin/SideBar';
import { ProductForm } from '../components/Admin/Form/ProductForm';
import { getProduct, updateProduct } from '../redux/apiCallsProduct';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import img from '../../src/Img/background-Shopping.jpg';
const Container = styled.div`
    display: flex;
    position: absolute;
    background: linear-gradient(rgba(255,255,255, 0.7), rgba(255, 255, 255, 0.7)),
    url("https://i.pinimg.com/736x/09/72/d0/0972d05282f6b3a59ef49772d8613cfe.jpg") center;
    background-size: cover;
`

function AdminProductEdit() {
    
    const params = useParams();
    const id = Number(params.id);
    // const dispatch = useDispatch();

    
    const product = useSelector( state => state.product.product);
    console.log('producto selected')
    console.log(product)

    // if(location.state?.text){
    //     productSelected = location.state.text;
    // }else{
    //     getProduct(dispatch, id);
    //     productSelected = product;
    // }

    
    return(

        <Container>
            <Sidebar/>
            <ProductForm
                label = 'Edit Product'
                submit = {(dispatch, product) => updateProduct(dispatch, product) }
                buttonText = 'Edit'
                productInformation = {product}
            />
        </Container>
    );
}

export {AdminProductEdit};