import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
        bill: null,
        error: false,

    },
    reducers: {
        addProduct: (state, action) => {
            // console.log(state.payload.product)
            state.products.push(action.payload);
            state.quantity += 1;
            state.total += action.payload.price * action.payload.quantity;
        },
        
        deleteProduct: (state, action) => {
            state.products.splice( 
                state.products.findIndex( (product) => product._id === action.payload.id), 1
            );
            state.quantity -= 1;
            state.total -= action.payload.totalProduct; 
            
        },
        vaciarCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
        createBill: (state, action) => {
            state.bill = action.payload;
        },
        failure: (state) => {
            state.error = true
        }
    }
});

export const {addProduct, deleteProduct, vaciarCart, createBill, failure} = cartSlice.actions;
export default cartSlice.reducer;