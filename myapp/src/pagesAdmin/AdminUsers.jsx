import React from 'react';
import styled from 'styled-components';
import { Sidebar } from '../components/Admin/SideBar';
import { Users } from '../components/Admin/Users';

const Container = styled.div`
    display: flex;
    position: absolute;
    background: linear-gradient(rgba(255,255,255, 0.7), rgba(255, 255, 255, 0.7)),
    url("https://i.pinimg.com/736x/09/72/d0/0972d05282f6b3a59ef49772d8613cfe.jpg") center;
    background-size: cover;
`

function AdminUsers(){
    return(
        <Container>
            <Sidebar/>
            <Users/>
        </Container>
    )
}
export {AdminUsers}