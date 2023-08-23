import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 30px;
    background-color: teal;
    display: flex;
    text-align: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
`

function Announcement() {
    
    
    return(
        <Container>
            It's announcements !!
        </Container>
    );
}

export {Announcement}