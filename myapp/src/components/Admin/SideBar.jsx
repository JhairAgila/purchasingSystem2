import React from 'react';
import styled from 'styled-components';
import {People, Category, AccountCircle, TrendingUp, ExitToApp } from '@material-ui/icons';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/apiCalls';

const SidebarContainer = styled.div`
    flex: 1;
    height: calc(100vh - 5px);
    background-color: black;
    align-items: center;
    color: white;
    flex-direction: column;
    width: calc(100vw - 85svw);
    display: flex;
    text-align: center;
    justify-content: center;
    // items-align:center;
`
const List = styled.ul`
    font-size: 18px;
    margin-top: 20px;
    list-style: none;
    margin-right: 16px;

`

const Item = styled.li`
    padding: 20px;
    list-style: none;
    cursor: pointer;
    text-align: center;
    &:hover{
        color: green;
    }
`
const Title = styled.div`
    font-size: 22px;
    color: white;
    font-family: cursive;
    weight: 600;
    margin-left: 30px;

`

function Sidebar(){
    const dispatch = useDispatch();
    const {currentUser} = useSelector( state => state.user)

    const hangleLogout = () => {
        logout(dispatch);
    }

    return(
        // <NavLink style={ ( {isActive} ) => ({
        //     color: isActive ? 'red' : 'blue'
        // })} 
        <SidebarContainer>
            <Title> {currentUser.username.toUpperCase()}</Title>
            <List>
                {/* <NavLink style={ ( {isActive} ) => ( {
                    color: isActive ? "red" : "white", 
                    textDecoration: "none", fontWeight: 600,
                } ) } to='/adminMain' >
                    <Item> <TrendingUp style={{marginRight: 10}}/>General features </Item>
                </NavLink> */}
                <NavLink style={ ({isActive}) => ({
                    color: isActive ? "red" : "white", 
                    textDecoration: "none", fontWeight: 600,
                })} to='/adminProducts'  >
                    <Item> < Category style={{marginRight: 10}}/>Products </Item>
                </NavLink>
                <NavLink style={ ({isActive}) => ({
                    color: isActive ? "red" : "white", 
                    textDecoration: "none", fontWeight: 600,
                })} to='/adminUsers'>
                    <Item> <People style={{marginRight: 10}}/> Users </Item>
                </NavLink>
                {/* <NavLink style={ ({isActive}) => ({
                    color: isActive ? "red" : "white", 
                    textDecoration: "none", fontWeight: 600,
                })} to='/adminAccount' >
                    <Item> <AccountCircle style={{marginRight: 10}}/>Acount </Item>
                </NavLink> */}
                <NavLink style={ ({isActive}) => ({
                    color: isActive ? "red" : "white",
                    textDecoration: "none", fontWeight: 600,
                }) } to='/' onClick={hangleLogout}> 
                    <Item> <ExitToApp style={{margin: 10}}/> Logout </Item>
                </NavLink>
            </List>
        </SidebarContainer>
    );
}

export {Sidebar}