import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getUserToEdit, updateUser } from "../../redux/apiCalls";

const Container = styled.div`
  width: calc(100vw - 15vw);
  height: calc(100vh -15vh);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 70%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid gray;
  background-color: gray;
`;

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(223, 220, 220);
`;
const ContainerForm = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ButtomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Buttom = styled.button`
  width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    &:disabled{
        color: green;
        cursor: not-allowed;
    }
`;
const InputText = styled.input`
  padding: 15px 20px;
  margin: 20px 10px 0px 0px;
  min-width: 40%;
  max-height: 10px;
`;

const Label = styled.label`
  color: black;
  font-size: 16px;
  font-weight: 600;
  padding: 5px 10px;
  margin: 25px 10px 0px 0px;
`;

const Title = styled.div`
    font-size: 28px;
    font-style: italic;
    font-weight: 600;
    margin-bottom: 20px;
`
function InfoUser() {
  const {currentUser} = useSelector( (state) => state.user);
  const [ableEdit, setAbleEdit] = useState(true);
  const dispatch = useDispatch();

  useEffect( () => {
    const takeUser = async() => {
      getUserToEdit(dispatch, currentUser._id);
      console.log(currentUser.password)
    }
    takeUser();
  }, [ableEdit])
    const [user, setUser] = useState({
        ...currentUser,
    })

    const handleEdit = async(e) => {
    e.preventDefault();
    setAbleEdit(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(dispatch, user);
    console.log(currentUser);
    setAbleEdit(true);
  };


  return (
    <Container>
      <Wrapper>
        <Title> {currentUser.username} </Title>
        <Form>
          <ContainerForm>
            <Label>User: </Label>
            <Label>Email: </Label>
            <Label>Password: </Label>
            <Label>Admin: </Label>
            <Label>Created: </Label>
          </ContainerForm>
          <ContainerForm>
            <InputText 
                placeholder="Username" 
                value={user.username} 
                onChange={ (event) => {
                    setUser({
                        ...user,
                        username: event.target.value,
                    });
                }
            }
                disabled={ableEdit}/>
            <InputText 
                placeholder="email" 
                value={user.email} 
                onChange={ (event) => {
                    setUser({
                        ...user,
                        email: event.target.value,
                    });
                }}
                
                disabled={ableEdit}/>
            <InputText 
                placeholder="password" 
                type="text" 
                value={user.password} 
                // onChange={ (event) => {
                //     setUser({
                //         ...user,
                //         password: event.target.value,
                //     });
                // }}
                disabled={ableEdit}/>
            <InputText 
                placeholder="idAdmin" 
                value={user.isAdmin} 
                disabled={ableEdit}
                // onChange={ (event) => {
                //     setUser({
                //         ...user,
                //         isAdmin: event.target.value,
                //     });
                // }}
            />
            <InputText 
                placeholder="createdAt: " 
                value={user.createdAt} 
                disabled/>
          </ContainerForm>
          <ButtomContainer>
            <Buttom onClick={handleEdit} > Editar </Buttom>
            <Buttom onClick={handleSave}
             disabled={ableEdit}> Guardar </Buttom>
          </ButtomContainer>
        </Form>
      </Wrapper>
    </Container>
  );
}

export { InfoUser };
