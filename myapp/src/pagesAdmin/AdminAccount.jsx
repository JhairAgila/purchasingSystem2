import React from 'react';
import styled from 'styled-components';
import { Sidebar } from '../components/Admin/SideBar';
import { InfoUser } from '../components/Admin/InfoUser';

const Container = styled.div`
    display: flex;
    position: absolute;

`


function AdminAccount(){
    return(
        <Container>
            <Sidebar/>  
            <InfoUser />
        </Container>
    );
}
export {AdminAccount};