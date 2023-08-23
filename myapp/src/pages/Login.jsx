import React, { useState } from 'react';
import styled from "styled-components";
import { mobile } from '../responsive';
import { login } from '../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate, Link  } from 'react-router-dom';
import { NavBar } from '../components/NavBar';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; 

    background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
    background-size: cover;
`;

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%"})}


`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    background-color: white;

`;

const Tittle = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Input = styled.input`
    flex: 1;
    min-width: 90%;
    margin: 10px 0px;
    padding: 10px;
`;



const Buttom = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: ${(props) => props.type === 'home' ? 'orange' : 'teal'};
    color: white;
    cursor: pointer;
    
    &:disabled{
        color: green;
        cursor: not-allowed;
    }
`
// const LinkOption = styled.a`
//     margin: 5px 0px
//     font-size: 12px;
//     text-decoraton: underline;
//     cursor: pointer;
//     margin-bottom: 10px;
//     `;
// const Error = styled.span`
//     color: red;
//     `

function Login(){
    const [username, setUserName] = useState('');
    const[password, setPassword] = useState('');
    // const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const { currentUser} = useSelector( (state) => state.user);

    const handleLogin = (e) => { 
        e.preventDefault();
        // let from = -1;
        // let from = location.state?.from?.pathname || -1;
        login(dispatch, {username, password});
        // dispatch(login({username, password})),
        // navigate(from, {replace: true});
        // console.log(`dentro de ${currentUser.isAdmin}`),
        return currentUser == null ? navigate('/') : currentUser.isAdmin ?  navigate('/adminProducts') :  navigate('/');
    }

    return (
        <Container>
                <Wrapper>
                    <Tittle> SIGN IN </Tittle>
                    <Form>
                        
                        <Input placeholder="Username"
                        onChange={(e) => setUserName(e.target.value)}/>
                        <Input placeholder="Password" type='password'
                        onChange={(e) => setPassword(e.target.value)}/>
                        
                        <Buttom onClick={handleLogin} > Login  </Buttom>
                        {/* {error && <Error> Credential invalids </Error>} */}
                        <Buttom type='home' onClick={() => navigate('/')}> Home </Buttom>
                        {/* {!!error ? <Error> Credential invalids </Error> : navigate('/')} */}
                        {/* <Link> Do not you remember the pasword? </Link> */}
                        <Link to='/register' style={{textDecoration: 'none', weight: 600, color: 'black'}}> Create a new account </Link>
                    </Form>
                </Wrapper>
        </Container>
    );
}

export {Login};