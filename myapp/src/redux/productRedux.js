import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        product: {},
        error: false,
        isFetching: false,
    },
    reducers: {
        start: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        createProductSuccess : (state, action) => {
            state.isFetching = false;
            state.products.push(action.payload);
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false;
            console.log(`item ${action.payload}`)
            console.log(action.payload)
            state.product = action.payload;
            console.log(state.product)
        },
        getProductsSuccess: (state, action) => {
            state.products = action.payload;
            state.isFetching = false;
        },
        updateProductSuccess : (state, action) => {
            let index = state.products.findIndex( (product) => product._id === action.payload._id );
            state.products.splice(index, 1, action.payload);
            state.isFetching = false;
        },
        deleteProductSuccess : (state, action) => {
            state.products.splice(
                state.products.findIndex( product => product._id === action.payload), 1
            );
            // state.products = state.products.filter( (product) => product._id !== action.payload);
            state.isFetching = false;
        },
        failure: (state) => {
            state.error = true;
            state.isFetching = false;
        }
        
    }
});
export const {start, createProductSuccess, getProductSuccess, getProductsSuccess, updateProductSuccess, deleteProductSuccess, failure} = productSlice.actions;
export default productSlice.reducer