import React, { useEffect, useState } from 'react'
import './Production.css'
import { Card, CardGroup } from "react-bootstrap";
// import CardColumns from 'react-bootstrap/CardColumns'
import { getMedicine } from '../../apis/authentication';
import { Link, useLocation } from 'react-router-dom';
import server_url from '../../config/server'
import moment from 'moment';

const Production = (props) => {
    const location = useLocation();
    console.log(location.state._id);
    const prod_Id = location.state._id;
    const [products, setProducts] = useState([]);
    async function getData() {
      const response = await fetch(`${server_url}/productionStocks/getStocksByProduction/${prod_Id}`);
      const data = await response.json();
      console.log(data.data,"data");
      setProducts(data.data)
    }
    useEffect(() => {
      getData();
    }, []);
    return (
        <div>
        <div className='prod__card'>           
          {products.map(({expiryDate, manDate, medicine, units, _id }) => (
            <CardGroup className='card__group'>
            <Card className='prod'>
              <Card.Body>
                <Card.Title style={{fontSize: 24}}>{medicine.name} </Card.Title>
                <Card.Text style={{fontSize: 20}}>
                  {medicine.description}
                </Card.Text>
                <Card.Text style={{fontSize: 18}}className=''>
                  Units Available: {units}
                </Card.Text>
                <Card.Text style={{fontSize: 20}}className=''>
                  Manufacturing Date: {moment(manDate).format("MMM Do YYYY")}
                </Card.Text>
                <Card.Text style={{fontSize: 20}}className=''>
                  Expiry Date: {moment(expiryDate).format("MMM Do YYYY")}
                </Card.Text>
                <Link className='med_link' style={{cursor:"pointer", outline: "none", border: "none", listStyle: "none", textDecoration: "none"}} to='/buy_med' 
                state={{Id: medicine._id, Name: medicine.name, prodId: prod_Id, eyed: _id}}>
                    Buy Medicine
                </Link>
              </Card.Body>
            </Card>
            </CardGroup>
          ))}
      </div>
        </div>
    )
}

export default Production
