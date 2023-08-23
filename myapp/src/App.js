import React from "react";
import Home from "./pages/Home.jsx";
import { ProductList } from "./pages/ProducList.jsx";
import { Product } from "./pages/Product.jsx";
import { Register } from "./pages/Register.jsx";
import { Login } from "./pages/Login.jsx";
import { Cart } from "./pages/Cart.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useSelector } from "react-redux";
import { ProductForm } from "./components/Admin/Form/ProductForm.jsx";
import { Users } from "./components/Admin/Users.jsx";
import { Products } from "./components/Admin/Products.jsx";
import { AdminRoute, AuthRoute } from "./AuthRoute.jsx";
import { AdminProducts } from "./pagesAdmin/AdminProducts.jsx";
import { AdminUsers } from "./pagesAdmin/AdminUsers.jsx";
import { AdminAccount } from "./pagesAdmin/AdminAccount.jsx";
import { AdminProductNew } from "./pagesAdmin/AdminProductNew.jsx";
import { AdminProductEdit } from "./pagesAdmin/AdminProductEdit.jsx";
import { WishListProduct } from "./pages/WishList.jsx";

const App = () => {
  const user = useSelector(state => state.user.currentUser);

  return ( 
     <BrowserRouter>
      <Routes>
         <Route path="/" element={ <Home />} />
         <Route
            path="/products/:category"
            element={
              <AuthRoute>
                <ProductList />
              </AuthRoute>} 
          />
         <Route
            path="/product/:id" 
            element={
            <AuthRoute>
              <Product />
            </AuthRoute>} 
          />
         <Route 
            path="/cart"
            element={
              <AuthRoute>
                <Cart />
              </AuthRoute>  }
         />
         <Route 
            path="/wishListCart"
            element={
              <AuthRoute>
                <WishListProduct />
              </AuthRoute>  }
         />
         <Route 
            path="/login"
            element={ 
              <AuthRoute>
                <Login/>
              </AuthRoute> 
          }/>
         <Route
            path="/register" 
            element={ <Register /> }/>

         <Route 
            path="/success"
            element={
               <AuthRoute>
                <Login />
               </AuthRoute> } />
              
         {/* <Route 
            path="/adminMain"
            element={
              // <AdminRoute>
                <AdminMain/>
              // </AdminRoute>
            }
         /> */}

         <Route 
            path="/adminProducts"
            element = {
              <AdminRoute>
                <AdminProducts/>
              </AdminRoute>
            }
         />

         <Route 
            path="/addProduct" 
            element={<AdminProductNew/>}
          />
          <Route 
            path="/editProduct/:id" 
            element={<AdminProductEdit/>}
          />

         <Route
            path="/adminUsers"
            element = {
              <AdminRoute>
                <AdminUsers/>
              </AdminRoute>
            }
         />

         <Route
            path="/adminAccount"
            element={
              <AdminRoute>
                <AdminAccount/>
              </AdminRoute>
            }
         />

         <Route 
            path="/newProduct" 
            element={ 
            <AdminRoute>
              <Home/>
            </AdminRoute>}
        />
         <Route path="/users"
            element={ 
              <AdminRoute>
                <Users/>
              </AdminRoute> }
          />
         <Route
            path="/products"
            element={ 
              <AdminRoute>
                <Products/>
              </AdminRoute> }
          />
      </Routes>
     </BrowserRouter>
  );
}

export {App};
