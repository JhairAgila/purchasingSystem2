import React from "react";
import './tableBig.css';
import { Delete, Edit } from "@material-ui/icons";
import { deleteUser } from "../../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import DataTable, {createTheme} from 'react-data-table-component';
import styled from 'styled-components';

const Title = styled.h1`
    text-size: 24px;
    text-align: center;
    margin-bottom: 20px;
`

function TableUsers() { 

    const dispatch = useDispatch();
    const {users} = useSelector( (state) => state.user);

    const columns = [
        {
            name: 'Username',
            selector: row => row.username
        },
        {
            name: 'Email',
            selector: row => row.email
        },
        {
            name: 'IsAdmin',
            selector: row => row.isAdmin ? 'True' : 'False'
        },
        {
            name: 'Created',
            selector: row => row.createdAt
        },
        {
            name: 'Actions',
            selector: row => <Delete className="icon"  onClick={() => (handleDelete(row._id))}/> 
        }
    ]
    const handleDelete = (id) => {
        deleteUser(dispatch, id)
    }

    return (

        <div>
            <Title> Users Avaliables </Title>
            <DataTable
                columns={columns}
                data={users}
                pagination
            />
        </div>
        // <table>
        //     <caption> Users </caption>
        //     <thead>
        //         <tr>
        //             <th scope='col'> Username  </th>
        //             <th scope='col'> Email  </th>
        //             <th scope='col'> IsAdmin  </th>
        //             <th scope='col'> Created  </th>
        //             <th scope='col'> Actions  </th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {users.map( (user) => { 
        //             return (<tr key={user._id} > 
        //                 <td>{user.username}</td>
        //                 {/* <td><img src={item.image} className="img"/></td> */}
        //                 <td>{user.email}</td>
        //                 <td>{user.isAdmin === true ? "True" : "False"}</td>
        //                 <td>{user.createdAt}</td>
                        
        //                 <td><Delete className="icon"  onClick={() => (handleDelete(user._id))}/>  </td>
        //             </tr>)
        //             })}
        //     </tbody>
        // </table>
    );

}

export {TableUsers};