import { publicRequest, userRequest } from "../requestMethods";
import { failure } from "./productRedux";
import { Failure, deleteUserSuccess, Start, loginSuccess, logoutSuccess, updateUserSuccess, getUsersSuccess, createUserSuccess, getUserSuccess } from "./userRedux"


const createUser = async(dispatch, user) => {

    dispatch(Start());
    console.log('object');
    try {
       const {data} =  await publicRequest.post('/auth/register', user);
        console.log(data);
        dispatch(createUserSuccess(user));
        login(dispatch, {username: user.username, password: user.password})
        // alert('Usuario creado');
    } catch (error) {
        dispatch(Failure());
    }
}
// const login = async(dispatch, user) => {
//     try{
//         dispatch(Start()); 
//         const response = await publicRequest.post('/auth/login', user);
//         console.log({response});
//         await dispatch(loginSuccess(response.data));
//     }catch(error){
//         dispatch(Failure());
//         console.log(error);
//     }
// } 

const login = async(dispatch, user) => {
    try{
        dispatch(Start()); 
        const response = await publicRequest.post('/auth/login', user);
        console.log({response});
        dispatch(loginSuccess(response.data));
    }catch(error){
        dispatch(Failure());
        console.log(error);
    }
} 

const getUserToEdit = async(dispatch, id) => {
    dispatch(Start());
    try{
        const res = await userRequest.get(`/users/findUser/${id}`);
        alert(res.data.password);
        dispatch(getUserSuccess(res.data));
    }catch(error){
        dispatch(failure());
    }
}

const logout = async(dispatch) => {
    dispatch(Start());
    try{
        dispatch(logoutSuccess(null));
    }catch(error){
        dispatch(Failure());
    }
}

const getUsersDB = async(dispatch) => {
    dispatch(Start());
    try{
        const res = await userRequest.get('/users');
        console.log(res.data);
        dispatch(getUsersSuccess(res.data));
    }catch(error){
        dispatch(Failure());
    }
}

const deleteUser = async(dispatch, id) => {
    try {
        dispatch(Start());
        await userRequest.delete(`/users/${id}`);
        dispatch(deleteUserSuccess(id));
    } catch (error) {
        
    }
} 

const updateUser = async(dispatch, user) => {
    try{
        dispatch(Start());
        const res = await userRequest.put(`/users/${user._id}`, user);
        dispatch(updateUserSuccess(res.data));
    }catch(error){
        dispatch(Failure());
    }
}

export {login, createUser, getUserToEdit, logout, updateUser, deleteUser, getUsersDB};

