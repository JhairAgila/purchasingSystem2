import {createSlice} from '@reduxjs/toolkit';
// import { deleteProduct } from './cartRedux';

const wishListProductSlice = createSlice({
    name: 'wishListProducts',
    initialState: {
        products: [],
        quantity: 0 
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            state.quantity += 1;
        },
        deleteProductWishList: (state, action) => {
            state.products.splice(
                state.products.findIndex( product => product._id === action.payload ), 1
            )
            state.quantity -= 1;
        },
        emptyWhishListProducts: (state) => {
            state.products = [];
            state.quantity = 0;
        }
    }
});

export const {addProduct, deleteProductWishList, emptyWhishListProducts} = wishListProductSlice.actions;
export default wishListProductSlice.reducer;