import React from 'react';
import { GitHub, Instagram, MailOutline } from "@material-ui/icons";
import styled from "styled-components";
import paymentMethods from '../Img/pagesMethods.png';
import { mobile } from '../responsive';

const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column"})}

`
const Left = styled.div`
    flex: 1;
    padding: 20px;
`

const Center = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    ${mobile({ display: "none"})}

`

const Title = styled.h3`
    margin-bottom: 30px;

`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;

`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 5px;
`
const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ backgroundColor: "#fff8f8"})}

`
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`
const Payment = styled.img`
    width: 50%;
`
const Logo = styled.h1``
const Description = styled.p`
    margin: 20px 20px;

`
const SocialContainer = styled.div`
    display: flex;

`
const SocialIcon = styled.a`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`


function Footer() {
    return(
        <Container>
            <Left>
                <Logo> YIRT </Logo>
                <Description> 
                    This Jhair's store... Welcomee!
                </Description>
                <SocialContainer>
                    <SocialIcon color="E4405F"> 
                        <Instagram/>
                    </SocialIcon>
                    <SocialIcon color="000000" href='https://github.com/JhairAgila/Purchasing-System.git' > 
                        <GitHub/>
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>
                    Useful links
                </Title>
                <List> 
                    <ListItem> Home </ListItem>
                    <ListItem> Cart </ListItem>
                    <ListItem> Man Fashion </ListItem>
                    <ListItem> Woman Fashion </ListItem>
                    <ListItem> Accesories </ListItem>
                    <ListItem> My Account </ListItem>
                    <ListItem> Order Tracking </ListItem>
                    <ListItem> WishList </ListItem>
                    <ListItem> Terms </ListItem>

                </List>
            </Center>
            <Right>
                <Title> Contact </Title>
                <ContactItem>
                    <MailOutline style={{marginRight: "20px"}}/> jhairagilTrabajo@gmail.com
                </ContactItem>
                <Payment src={paymentMethods}/>
            </Right>
        </Container>

    );
}

export {Footer};