import React from 'react';
import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const axios = require('axios');
import StripeCheckout from 'react-stripe-checkout';
const PUBLIC_KEY = 'pk_test_51Mv6ctCpub9SwtgZLIvqmUCWEM54Ts1s10fq5LpdZtlwVgFI0Frvow8x9ulFTriRDrCK5v1hXyl8AhARYu5fmmc200PDpUVuHi';

const Pay = () => {
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory();

    const onToken = (token) => {
        setStripeToken(token);
    }

    useEffect( () => {
        const makeRequest = async () =>{
            try{
                const res = await axios.post("http://localhost:5000/api/checkout/payment", 
                    {
                        tokenId: stripeToken.id,
                        amount: 2000,
                    }
                );
                console.log(res.data);
                history.push("/success", )
            }catch(error){
                console.log(error);
            }
        }
        stripeToken && makeRequest
    }, [stripeToken, history])
    return(
        <div 
        style={ {
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
        >
            {stripeToken ? (<span> Processing. Please wait...</span>) : ( 
            <StripeCheckout 
                name="Yirt Shop"
                image="https://avatars.githubusercontent.com/u/1486366?v=4"
                billingAddress
                shippingAddress
                description=' Your total is $20'
                amount={2000}
                token={onToken}
                stripeKey= {PUBLIC_KEY}> 
                <button
                style={{
                    border: "none",
                    width: 120,
                    borderRadius: 5,
                    padding: "20px",
                    backgroundColor: "black",
                    color: "white",
                    cursor: "pointer",
                }}
                >
                    Pay Now
                </button>
            </StripeCheckout>
            )}

        </div>
    );
};

export {Pay};