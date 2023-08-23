import { createProductSuccess, deleteProductSuccess, failure,
     getProductSuccess, getProductsSuccess, updateProductSuccess, start } from "./productRedux"
import { publicRequest, userRequest } from "../requestMethods"

const getProducts = async(dispatch) =>{
    dispatch(start())
    try {
        const res = await publicRequest.get('/products');
        dispatch(getProductsSuccess(res.data));
    } catch (error) {
        dispatch(failure());
    }
}

const getProduct = async (dispatch, id) => {
    dispatch(start);
    try{
        const res = await publicRequest.get(`/products/find/${id}`);
        console.log(res.data);
        dispatch(getProductSuccess(res.data));
    }catch(error){
        dispatch(failure());
    }
}

const createProduct = async(dispatch, product) => {
    dispatch(start());
    try {
        await userRequest.post('/products', product);
        dispatch(createProductSuccess(product));
        alert('produtct created');
    } catch (error) {
        dispatch(failure());
    }
}
const updateProduct = async(dispatch, product) => {
    dispatch(start());
    try{
        const res = await userRequest.put(`/products/${product._id}`, product);
        // alert('product modified');
        dispatch(updateProductSuccess(res.data));
    }catch(error){
        dispatch(failure());
    }
}

const deleteProduct = async(dispatch, id) => {
    dispatch(start());
    try {
        await userRequest.delete(`products/${id}`);
        dispatch(deleteProductSuccess(id));
    } catch (error) {
        dispatch(failure());
    }
}

export {getProducts, createProduct, updateProduct, deleteProduct, getProduct};