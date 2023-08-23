import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { userRequest } from "../../requestMethods";
import { TableUsers } from "./Table/TableUsers";
import { Add } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsersDB } from "../../redux/apiCalls";

const Container = styled.div`
    width: calc(100vw - 15vw);
    height: calc(100vh-15px);
    display: flex;
    align-items: center;
    justify-content: center;

`





function Users() {


    // const [users, setUsers] = useState([]); 
    const dispatch = useDispatch();
    const {users} = useSelector( (state) => state.user);
    useEffect ( () => { 
        const getUsers = async() => {
            try {
                await getUsersDB(dispatch);
                console.log(users);
            } catch (error) {
                console.log(error);
            }
        }
        getUsers();     
    }, []);

    return(
        <Container>
            {/* <Title> Users </Title> */}
            <TableUsers> </TableUsers>
        </Container>    
    );
}

export {Users};