import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ProductItem } from "./ProductItem";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function Products({ cat, filters, sort }) {
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const location = useLocation();
  const direction = location.pathname.split("/")[1];
  const productWishList = useSelector(
    (state) => state.wishListProducts.products
  );

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );
        setProducts(response.data);
        // console.log(location.pathname.split('/')[1])
        // console.log(response.data   );
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [cat, filters]);

  useEffect(() => {
    cat &&
      setFilteredProduct(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProduct((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProduct((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilteredProduct((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <Container>
      {console.log(typeof(direction))}
      {cat
        ? filteredProduct.map((product) => (
            <ProductItem item={product} key={product._id} />
          ))
        : direction === "wishListCart"
        ? productWishList.map((product) => (
            <ProductItem item={product} key={product._id} />
          ))
        : products.map((product) => (
            <ProductItem item={product} key={product._id} />
          ))}
    </Container>
  );
}

export { Products };
