import React from "react";
import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import { vaciarCart } from "../redux/cartRedux";
import { emptyWhishListProducts } from "../redux/wishListRedux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  // justify-content: space-between;
  // align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Lenguage = styled.span`
  font-size: 16px;
  cursor: pointer;
  ${mobile({ display: "none" })};
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  tetx-align: center;
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
`;
const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

function NavBar() {
  const user = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();

  const { isFeching, error } = useSelector((state) => state.user);
  const hangleLogout = () => {
    logout(dispatch);
    dispatch(vaciarCart());
    dispatch(emptyWhishListProducts());
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Lenguage> EN </Lenguage>
          {/* <SearchContainer>
                        <Input placeholder='Search...'/>
                        <Search style={{color: 'gray', fontSize: 16}}/>
                    </SearchContainer> */}
        </Left>
        <Center>
          {" "}
          <Logo>YIRT</Logo>{" "}
        </Center>
        <Right>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <MenuItem>Inicio</MenuItem>
          </Link>
          {!user ? (
            <>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem> Register </MenuItem>
              </Link>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem> Sign in </MenuItem>
              </Link>
            </>
          ) : (
            <>
              <MenuItem onClick={hangleLogout} disabled={isFeching}>
                {" "}
                Log out
              </MenuItem>
              <Link to="/cart">
                <MenuItem>
                  <Badge badgeContent={quantity} color="primary" overlap="rectangular">
                    <ShoppingCartOutlined />
                  </Badge>
                </MenuItem>
              </Link>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
}

export { NavBar };
