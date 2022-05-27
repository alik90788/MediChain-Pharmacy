import React, { useEffect, useState } from 'react'
import './Buy_Med.css';
import { Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { addStock } from '../../apis/authentication';
import server_url from '../../config/server';

export const Buy_Med = () => {
    const location = useLocation();
    console.log(location.state.Id);
    var medicine = location.state.Id;
    var newid = location.state.eyed;
    console.log(newid);
    var prod_id = location.state.prodId;
    console.log(prod_id)
    console.log(medicine)
    const med_id = location.state.Id.Id;
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user._id);
    const Id = user._id;
    const [dateTime, setDateTime] = useState(new Date());
    const [quantity, setQuantity] = useState(0);
    const [stockId, setStockId] = useState();
    useEffect(() => {
        getData();
        async function getData() {
            const response = await fetch(`${server_url}/distributorStock/count`);
            const data = await response.json();
            setStockId(data)
            //console.log(data);
        }
    },[])
    const add_stock = () => {
        var date = new Date();
        // var formatedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        console.log({ distributor: Id, qty: parseInt(quantity), createdAt: date, production: prod_id, productionStock: newid, status: "Pending" },"oooooo")
        addStock({ distributor: Id, qty: parseInt(quantity), createdAt: date, production: prod_id, productionStock: newid, status: "Pending" }).then((res) => res.json()).then((stock) => {
            console.log(stock,"stock");
        }).catch((err) => console.log(err,"errrrr"));
        //console.log(quantity, dateTime)
    }
    // const name = location.state.Name.toUpper();
    return (
        <div>
            <div className='contact-sec3'>
                <Container fluid="md">
                    <div className='inputs'>
                        <div className='input-text1'>Enter The Quantity of {location.state.Name}.</div>
                        <input
                            className='formin'
                            type='number'
                            name='message'
                            placeholder='Quantity'
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <button className='formin-btn' onClick={add_stock}>
                            <span>Submit</span>
                        </button>
                        <div className='input-text2'></div>
                        {/* <img src={img5} alt='No' width='200px'></img> */}
                </div>
                </Container>
            </div>
        </div>
    )
}
