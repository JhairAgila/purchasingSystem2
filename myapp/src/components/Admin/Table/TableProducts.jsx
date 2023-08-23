import React from "react";
// import './table.css';
import './tableBig.css';
import { Delete, Edit } from "@material-ui/icons";
import { deleteProduct, getProduct, updateProduct } from "../../../redux/apiCallsProduct";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DataTable, {createTheme} from 'react-data-table-component';
import styled from "styled-components";

const Image = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    background-color: white;
    border-radius: 50%;
`
const Tittle = styled.h1`
    text-size: 24px;
    text-align: center;
    margin-bottom: 20px;
`

const FilterColor = styled.div`
    margin: 6px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`

function TableProducts() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {products} = useSelector( (state) => state.product);

    const columns = [
        {
            name: 'Name',
            selector: row => row.tittle,
        },
        {
            name: 'Image',
            selector: row => <Image src={row.image}/>,
            width: '200px',
        },
        {
            name: 'Amount',
            selector: row => row.amount,
        },
        {
            name: 'Categories',
            selector: row => row.categories
        },
        {
            name: 'Size',
            selector: row => row.size
        },
        {
            name: 'Color',
            selector: row => 
            Array.isArray(row.color) ? row.color.map( (c) => (
                <FilterColor color={c} key={c}  />
            )) : 'No hay colores'
        },
        {
            name: 'Price',
            selector: row => row.price
        },
        {
            name: 'Amount',
            selector: row => row.amount
        },
        {
            name: 'In-stock',
            selector: row => row.inStock ? 'True' : 'False'
        },
        {
            name: 'Delete',
            selector: row => <Delete className="icon" onClick={() => handleDelete(row._id)} />
        },
        {
            name: 'Edit', 
            selector: row => <Edit className="icon" onClick={() => handleEdit(row._id, row)} />
        }
    ];
    const handleEdit = async (id, productInformation) => {
        console.log(productInformation.tittle);
        await getProduct(dispatch, id);
        navigate(`/editProduct/${id}`);
        // {replace: true,
        // state:{ text: productInformation}});

    } 
    const handleDelete = (id) => {
        deleteProduct(dispatch, id);
    }


// createTheme creates a new theme named solarized that overrides the build in dark theme
createTheme('custom', {
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
  },
  background: {
    default: '#002b36',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
}, 'dark');

    return( 
        <div>
            <Tittle> Products Avaliables</Tittle>
            <DataTable
                columns={columns}
                data={products}
                theme="custom"
                pagination
            />
        </div>
    );
}

export {TableProducts}
