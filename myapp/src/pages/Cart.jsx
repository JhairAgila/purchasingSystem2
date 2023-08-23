import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import {Link, useNavigate} from 'react-router-dom';
import { deleteProduct, vaciarCart } from "../redux/cartRedux";
import {updateProduct } from '../redux/apiCallsProduct';
import { createCart } from "../redux/apiCallsCart";


// const KEY = "pk_test_51Mv6ctCpub9SwtgZLIvqmUCWEM54Ts1s10fq5LpdZtlwVgFI0Frvow8x9ulFTriRDrCK5v1hXyl8AhARYu5fmmc200PDpUVuHi"
const KEY = process.env.REACT_APP_STRIPE;
const Container = styled.div``;

const Wrapper = styled.div`
    padding:  20px;
    // ${mobile({ padding: "10px" })}
`;

const Button = styled.button`
  border: "none";
  width: 120;
  borderRadius: 5;
  padding: "20px";
  background-color: ${props => props.color == 'limpiar' ? "green" : "black"} ;
  color: "white";
  cursor: "pointer";
`
const Tittle = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopBottom = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "green"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div``;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
  ${mobile({ display: "none" })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-bottom: 20px;
  background: green;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "15px" })}
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const ProductDelete = styled.div`
    background-color: black;
    margin-top: 15px;
    border-radius: 6px;
    font-size: 14px;
    weight: 600;
    padding: 20px 15px;
    color: white;
    cursor: pointer;
    &:hover{
      background-color: red;
    }
`
function Cart() {
  const [ stripeToken, setStripeToken] = useState(null);
  const dispatch = useDispatch();
  const {currentUser} = useSelector( state => state.user)
  const { products, total} = useSelector( state => state.cart);
  const productsState = useSelector( state => state.product.products );
  const quantityProducts = useSelector( state => state.wishListProducts.quantity)
  const [bill, setBill] = useState( {
    userId: currentUser._id,
    products: [],
  } );


  const onToken = (token) => {
    setStripeToken(token);
  }

  const handeleteProduct = (id, price, quantityProduct) => {
    let totalProduct = price * quantityProduct;
    dispatch(deleteProduct({id, totalProduct}));
  }

  const handleCompra = () => {
    let billProducts = [];
    products.map( (product) =>
      {productsState.map( (productState) => 
        {
          if(product._id === productState._id){
            let productUncompress = { productId: product._id, quantity: product.quantity};
            billProducts.push(productUncompress);
            let productModified = {...productState};
            productModified.amount -= product.quantity;
            updateProduct(dispatch, productModified);
          } 
        })});
    setBill({
      ...bill,
      products: billProducts,
    });
    createCart(dispatch, bill);
    dispatch(vaciarCart());
  }

  useEffect( () => {
    const makeRequest = async() => {
        try {
            const response = await userRequest.post("/checkout/payment", {
                tokenId: stripeToken.id,
                amount: total*100,
            });
            // navigate.push("/success", {data:response.data})
        } catch (error) {
            console.log(error);
        }
    }
    stripeToken && makeRequest();
}, [stripeToken, total]);

  return (
    <Container>
      <NavBar />
      <Announcement />
      <Wrapper>
        <Tittle> Your bag </Tittle>
        <Top>
          <Link to='/'>
            <TopBottom> Continue Shopping </TopBottom>
          </Link >
          <TopTexts>
            {/* <TopText> Shopping bag (2)</TopText> */}
            {/* <TopText> Your WishList {quantityProducts} </TopText> */}
          </TopTexts>
          <Link to='/wishListCart'>
            <TopBottom>  Your wishList {quantityProducts} </TopBottom>
          </Link>
        </Top>
        <Bottom>
          <Info>
            {products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.image} />
                  <Details>
                    <ProductName>
                      {" "}
                      <b> Product: </b> {product.tittle}
                    </ProductName>
                    <ProductId>
                      {" "}
                      <b>ID: </b> {product._id}{" "}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      {" "}
                      <b> Size: </b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    {/* <Add /> */}
                    <ProductAmount> {product.quantity} </ProductAmount>
                    {/* <Remove /> */}
                  </ProductAmountContainer>
                  <ProductPrice>
                    {" $"}
                    {product.price * product.quantity}{" "}
                  </ProductPrice>
                  <ProductDelete onClick={() => handeleteProduct(product._id, product.price, product.quantity)}> {"Delete"} </ProductDelete>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>Order sumary</SummaryTitle>
            {/* <SummaryItem>
              <SummaryItemText> Subtototal </SummaryItemText>
              <SummaryItemPrice> {total} </SummaryItemPrice>
            </SummaryItem> */}
            {/* <SummaryItem>
              <SummaryItemText> Estimated </SummaryItemText>
              <SummaryItemPrice> $1.1 </SummaryItemPrice>
            </SummaryItem> */}
            {/* <SummaryItem>
              <SummaryItemText> Shipping-discount </SummaryItemText>
              <SummaryItemPrice> $-3,9 </SummaryItemPrice>
            </SummaryItem> */}
            <SummaryItem type="total">
              <SummaryItemText> Total </SummaryItemText>
              <SummaryItemPrice> {total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Yirt Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description= {`Your total is $${total}`}
              amount={total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>
                Checkout now
              </Button>
            </StripeCheckout>
            <Button color='limpiar' onClick={() => handleCompra()}>
                Limpiar
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export { Cart };
