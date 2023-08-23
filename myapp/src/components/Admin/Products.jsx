import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TableProducts } from "./Table/TableProducts";
import axios from "axios";
import { userRequest } from "../../requestMethods";
import { Add } from "@material-ui/icons";
import { ProductForm } from "./Form/ProductForm";
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getProducts} from '../../redux/apiCallsProduct';
const Container = styled.div`
  width: calc(100vw - 15vw);
  height: calc(100vh - 5px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`

    display: block;
    text-align: center;
    font-decoration: cursive;
//   margin: 15px 0px 15px 0px;
`;

const AddProduct = styled.button`
    display: flex;
    background-color: rgb(217, 244, 208);
    height: 40px;
    width: 40px;
    border-radius: 50%;
    position: fixed;
    align-items: center;
    justify-content: center;
    text-align: center;
    bottom: 20px;
    right: 20px;
    transition: all 0.5s ease;

    &:hover{
        box-shadow: 0px 0px 2px 2px green;
        transform: scale(1.5);
        background-color: rgb(99, 244, 50);
    }
`



function Products() {
  // const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {products} = useSelector( (state) => state.product);

  useEffect(() => {
    const getProductss = async() => {
      try {
        await getProducts(dispatch);
      } catch (error) {
        console.log(error);
      }
    }
    getProductss();
  }, []);
  return (
    <Container>
      <TableProducts />
      <AddProduct onClick={() => navigate('/addProduct')}><Add style={{fontSize: 30}}/></AddProduct>
    </Container>
  );
}

export { Products };
