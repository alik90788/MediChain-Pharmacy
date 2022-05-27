import React, { useEffect, useState } from 'react'
import './Products.css'
import { Card, CardGroup } from "react-bootstrap";
// import CardColumns from 'react-bootstrap/CardColumns'
import { getAllProduction } from '../../apis/authentication';
import { Link } from 'react-router-dom';

const Products = () => {

  const [products, setProducts] = useState([]);
  const fetchData = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const auth = user.token;
      console.log(auth)
      getAllProduction({ auth }).then((res) => res.json()).then((prod) => {
        console.log(prod.result)
        setProducts(prod.result);
      }).catch((e) => console.log(e))
    }
    useEffect(() => {
      fetchData();
    }, []);
    return (
        <div>
        <div className='prod__card'>           
          {products.map(({ _id, name, description}) => (
            <CardGroup className='card__group'>
            <Card className='prod'>
              {/* <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrteLUdRt8VEqjGtfo3W0USGf0_uOFV5vohw&usqp=CAU" /> */}
              <Card.Body>
                <Card.Title>{name} </Card.Title>
                <Card.Text>
                  {description}
                </Card.Text>
                <Link med_link style={{cursor:"pointer", textDecoration: "none"}} to='/production' state={{_id: _id}}>
                    See Medicines
                </Link>
              </Card.Body>
              {/* <Card.Footer>
                <small className="text-muted">Last updated 10 mins ago</small>
              </Card.Footer> */}
            </Card>
            </CardGroup>
          ))}
      </div>
        </div>
    )
}

export default Products
