import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { NavBar } from '../components/NavBar';
import { Announcement } from '../components/Announcement';
import { Footer } from '../components/Footer';
import { NewsLetter } from '../components/NewsLetter';
import { Add, Remove } from '@material-ui/icons';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../requestMethods';
import { addProduct } from '../redux/cartRedux';

import {useDispatch} from 'react-redux';

const Container = styled.div`

`
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: "column"})}
`;

const ImgContainer = styled.div`
    flex: 1; 
    display: flex;
    align-items: center;
    justify-content: center;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: "10px"})}


`;


const Image = styled.img`
width: 100%;
height: 90vh;
object-fit: cover;
    ${mobile({ height: "40vh"})}

`;



const Description = styled.p`
    margin: 20px 0px;

`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    width: 50%;

    display: flex;
    justify-Content: space-between;
    margin: 30px 0px;

    ${mobile({ width: "100%"})}

`;
const FilterTitle = styled.div`
    font-size: 20px;
    font-weight: 200;
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const Title = styled.span`
    font-weight: 200;
`;
const FilterColor = styled.option`
    margin 6px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    cursor: pointer;

    &:active{
        border: 4px solid black;
    }
`;

const FilterSize = styled.select`
    margin-left: 15px;
`;

const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({ width: "100%"})}

`;
const AmountContainer = styled.div`
    display: flex;
    font-weight: 700;
    align-items: center;
    justify-content: center;

`;
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 6px;
`;
const Buttom = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: black;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: red;
    }
`;

const  Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const[product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();


    const handleQuantity = (type) => {
        if(type === "dec" ){
            quantity > 1 && setQuantity(quantity-1)
        }else{
            quantity < product.amount && setQuantity(quantity+1);
        }
    }

    const handleClick = () => {
        //update our cart
        dispatch(addProduct({...product, quantity, color, size}));
    } 

    useEffect( () => {
        const getProduct = async()  => {
        try {
            console.log("into try");   
           const response = await publicRequest.get(`products/find/${id}`);
           setProduct(response.data);
           console.log(`PRODUCT ${product}`);
        } catch (error) {
            console.log(`error interno  ${error}`);
        }
         }
         getProduct();
    }, [id]);
    return( 
        <Container>
            <NavBar/>
            <Announcement/>
            <Wrapper>
                <ImgContainer>
                    <Image src={product.image}/>
                </ImgContainer>
                <InfoContainer> 
                    <Title> {product.tittle} </Title>
                    <Description>
                        {product.description}
                    </Description>
                    <Price> {product.price} </Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>

                            {/* {alert(product.color)} */}
                            {/* {!!product ? product.size.forEach(color => {
                              alert(color) ; 
                            }) : <p>no hyc kasn</p>} */}
                            {Array.isArray(product.color) ? product.color.map( (c) => (
                                <FilterColor color={c} key={c} onClick={() => setColor(c)}/> 
                             )) : <FilterColor> No hay colores disponibles </FilterColor> }
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={ (e) => setSize(e.target.value)}>
                                {Array.isArray(product.size) ? product.size.map( (s) => (
                                    <FilterSizeOption key={s}>{s}</FilterSizeOption> 
                                )) : <FilterSizeOption> No hay tamanios disponibles </FilterSizeOption> }
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantity("dec") }/>
                            <Amount> {quantity} </Amount>  
                            <Add onClick={() => handleQuantity("inc")}/>
                        </AmountContainer>
                        <Buttom onClick={() => handleClick()}> ADD TO CART </Buttom>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <NewsLetter/>
            <Footer/>
        </Container>
    );
}

export {Product};