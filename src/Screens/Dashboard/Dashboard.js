import React, { useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import './Dashboard.css'
import { updateOrder } from '../../apis/authentication'
import { useNavigate } from 'react-router-dom'
import server_url from '../../config/server'

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user._id);
  const Id = user._id;
  console.log(Id);
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const update_acceptedOrder = (event, Status) => {
    console.log(event,"event");
    event.Status = Status;
    updateOrder( event ).then((res) => res.json()).then((stock) => {
      console.log(stock);
      getOrders();
      getData();
    }).catch((err) => console.log(err));
  }
  const change = () => {
    navigate("/sell");
  }
  async function getData() {
    const response = await fetch(`${server_url}/distributorStocks/getMyStocks/${Id}`);
    const data = await response.json();
    console.log(data, "product");
    setProducts(data.data)
  }
  async function getOrders() {
    const response = await fetch(`${server_url}/customerOrders/getOrdersByDistributor/${Id}`);
    const data = await response.json();
    console.log(data, 'data');
    setVendors(data)
  }
  useEffect(() => {
    getData();
    getOrders();
  }, []);

  return (
    <div>
      <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
        <Container className="user-greeting mb-5" >
          <h1 className='greeting-text'>
            Hello {user?.name}
          </h1>
        </Container>
        <Container className='container-fluid m-2 mb-3'>
          <h2 style={{ textAlign: "left" }}>
            My Stocks/Purchasings
          </h2>
        </Container>
        <Container className="row d-flex justify-content-center align-items-center">
          {!products.length}
          {products.length >= 0 && products.map(({ units, medicine }) => (
            <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container style={{ fontSize: 30 }} className="text-light letter-spacing text-large">
                    {medicine.Name}
                  </Container>
                  <Container className="text-medium p-3 mt-2 mb-2">
                    {medicine.description}
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-x-medium">
                  {/* <span className="text-large pr-1">$</span> */}
                  No of Units: {units}
                </Container>
                {/* <button className='dash-btn' onClick={change}>
                            <span>Create Order</span>
                        </button> */}
              </Container>
            </Container>
          ))}
        </Container>
      </Container>
      <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
        <Container className='container-fluid m-2 mb-3'>
          <h2 style={{ textAlign: "left" }}>
            Customer Orders
          </h2>
        </Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Medicine</th>
              <th>Purchase Units</th>
              <th>Status</th>
              {/* <th colSpan={2}></th>
            <th colSpan={2}></th> */}
            </tr>
          </thead>
          <tbody>
            {vendors.length >= 1 && vendors.map((e) => {
              var { Id, Customer, PurchasedUnits, Stock, Status } = e;
             return <tr key={Id}>
                <td>{Id}</td>
                <td>{Customer.Name}</td>
                <td>{Stock.Medicine.Name}</td>
                <td>{PurchasedUnits}</td>
                <td>{Status}</td>
                {Status.toLowerCase() == "pending" &&<> <td colSpan={2}><button value={Id} className='dashboard-btn' onClick={() => update_acceptedOrder(e, "Accepted")}>
                  <span>Accept</span>
                </button></td>
                <td colSpan={2}><button className='dashboard-btn' onClick={() => update_acceptedOrder(e, "Rejected")}>
                  <span>Reject</span>
                </button></td> </>}
              </tr>
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default Dashboard