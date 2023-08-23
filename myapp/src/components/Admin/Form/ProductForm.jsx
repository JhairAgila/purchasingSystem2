import React, { useEffect, useState } from "react";
import './form.css';
import styled from "styled-components";
import { createProduct } from "../../../redux/apiCallsProduct";
import {useDispatch} from 'react-redux'; 
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    width: calc(100vw - 15vw);
    height: calc(100vh - 5px);
    align-items: center;
    justify-content: center;
`
const BottonAdd = styled.div`
    display: flex;
    cursor: pointer;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    // margin-left: 10px;
    background-color: rgba(225, 87, 195);
    align-items: center;
    justify-content: center;
    font-size: 40px;
    // margin-bottom: 10px;
    &:hover{
        background-color: rgba(255, 31, 31);
    }
`


function ProductForm(props){

    const navigate = useNavigate();

    const [product, setProduct] = useState(props.productInformation || {
        tittle: '',
        amount: null,
        description: '',
        image: '',
        categories: [],
        size: [],
        color: [],
        price: null,
        inStock: true,
    });
    const [colorUsed, setColorUsed] = useState('');
    console.log('product form')
    console.log(product);
    const dispatch = useDispatch();


    const handleSave = (e) => {
        e.preventDefault();
        if(product.tittle !== '' && product.description !== '' && product.image !== ''
        && product.categories.length > 0 && product.categories.length > 0 && product.color.length > 0
        && product.price !== null){
            props.submit(dispatch, product);   
            navigate('/adminProducts');
        }else{
            alert('Rellene todos los campos')
        }
    }
    const handleCancel = (e) => {
        e.preventDefault();
        setProduct({});
        navigate('/adminProducts');

    }
    const handleRadioInput = (e) => {
        let inStockBoolean = e.target.value === "true" ? true : false;
        // console.log( 'text ' + e.target.value)
        // console.log(inStockBoolean);
        setProduct({
            ...product,
            inStock: inStockBoolean,
        });
        // console.log(product.inStock)
    }
    return(
        <Container> 
            <div className="wrapper">
            <h1 className="tittle"> {props.label} </h1>
                <form>                    <input
                        placeholder="Name"
                        className="inputText"
                        value={product.tittle}
                        onChange={(e) => setProduct({
                            ...product,
                           tittle:  e.target.value,
                        })}/>
                    <input
                        placeholder="Description" 
                        className="inputText"
                        value={product.description}
                        onChange={(e) => setProduct({
                            ...product,
                           description:  e.target.value,
                        })}/>
                    <input 
                        placeholder="Image " 
                        className="inputText"
                        value={product.image}
                        onChange={(e) => setProduct({
                            ...product,
                           image:  e.target.value,
                        })}/>
                    <input 
                        placeholder="Categories separated by commas (,)" 
                        className="inputText"
                        value={product.categories}
                        onChange={(e) => setProduct({
                            ...product,
                           categories:  e.target.value.split(','),
                        })}/>
                    <input 
                        placeholder="Size separated by commas (,) " 
                        className = 'inputText'
                        value={product.size}
                        onChange={(e) => setProduct({
                            ...product,
                           size:  e.target.value.split(','),
                        })}/>
                    <input 
                        type="text"
                        placeholder="Add color " 
                        className=  {`inputText ${'inputTextColor'}`}
                        value={product.color}
                        onChange={(e) => setProduct({
                            ...product,
                           color:  e.target.value.split(','),
                        })}/>
                    <input
                        style={{
                            
                            appearance: 'none',
                            border: 'none',
                            width: '60',
                            height: '60',
                            borderRadius: '50%',
                            backgroundColor:'white',
                            scale: 2,
                        }}
                            type="color"
                            id="colorClothes"
                            onClick={(e) => setColorUsed(e.target.value)
                        }
                    />
                    <BottonAdd onClick={() => {
                        let colors = [...product.color];
                        colorUsed != '' ? colors.push(colorUsed) : alert('Seleccione un color');
                        setProduct({
                        ...product,
                        color: colors,
                    })}}>
                        +
                    </BottonAdd>
                    <input 
                        type= 'number'
                        placeholder="Price" 
                        className="inputText"
                        value={product.price}
                        onChange={(e) => setProduct({
                            ...product,
                           price:  parseInt(e.target.value),
                        })}/>
                    <input 
                        type = 'number'
                        placeholder="Cantidad" 
                        className="inputText"
                        value={product.amount}
                        onChange={(e) => setProduct({
                            ...product,
                           amount:  parseInt(e.target.value),
                        })}/>
                    <div 
                        className="optionRadio"> It's at stock : </div>
                    <input 
                        type="radio" 
                        name="inStock" 
                        value="true" 
                        onChange={handleRadioInput}
                        checked={product.inStock === true ? true : false}
                        className="inputRado" /> 
                    <div className="optionRadio"> True </div> 
                    <input 
                        type="radio"
                        name="inStock"
                        value="false"
                        onChange={handleRadioInput}
                        checked = {product.inStock === false ? true : false}

                        className="inputRadio"/> <div className="optionRadio"> False  </div> 
                    <div className="containerBottom">
                        <button onClick={handleSave}> {props.buttonText} </button>
                        <button onClick={handleCancel} > Cancel </button>
                    </div>
                </form>
            </div>

            </Container>
    );
}

export {ProductForm};