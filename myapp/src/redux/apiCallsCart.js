import {  userRequest } from "../requestMethods";
import { createBill, failure } from "./cartRedux";
const createCart = async(dispatch, cart) => {
    try{
        console.log(cart);
        await userRequest.post('/carts', cart);
        dispatch(createBill(cart));
        alert('Product created');
    }catch(error){
        dispatch(failure());
    }
}

export {createCart};