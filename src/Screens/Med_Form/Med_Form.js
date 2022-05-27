import React, { useEffect, useState } from 'react'
import './Med_Form.css';
import { Container, Dropdown } from 'react-bootstrap';
import { addOrder, getAllMedicines } from '../../apis/authentication';

const Med_Form = () => {
    const [medicines, setMedicines] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.user.Id);
    const Id = user.user.Id;
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("")
    const [id, setId] = useState("")
    const [quantity, setQuantity] = useState(0)
    var medId;
    var stockId;
    async function getData() {
        const response = await fetch(`http://localhost:21487/distributor/getStock/${Id}`);
        const data = await response.json();
        setProducts(data)
        console.log(data, "product");
      }
    const fetchData = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const auth = user.AuthToken;
        console.log(auth)
        getAllMedicines({ auth }).then((res) => res.json()).then((med) => {
          setMedicines(med);
          console.log(med)
        }).catch((e) => console.log(e))
    }
    const submit = (e) => {
        setName(e);
    }
    const submit_form = () => {
        console.log(id);
        console.log(quantity);
        for(var i = 0; i < medicines.length; i++){
            if(name == medicines[i].Name){
                medId = medicines[i].Id;
            }
        }
        for(var i = 0; i < products.length; i++){
            if(medId == products[i].MedicineId){
                stockId = products[i].Id;
            }
        }
        console.log(stockId);
        addOrder({ stockId: stockId, customerId: id, purchasedUnits: quantity, status: "Accepted" }).then((res) => res.json()).then((order) => {
            console.log(order, " order")
        }).catch((err) => console.log(err, "ee"));
    }
    useEffect(() => {
        getData();
        fetchData();
      }, []);
    return (
        <div className='contact-sec3'>
                <Container fluid="md">
                    <div className='inputs'>
                        <div className='input-text1'>ENTER THE MEDICINES THAT YOU SOLD.</div>
                        <input
                            className='formin'
                            type='text'
                            name='userid'
                            placeholder='User ID'
                            onChange={e => setId(e.target.value)}
                            />
                        <Dropdown className='formin-dropdown' onSelect={submit}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Available Medicines
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {medicines.map(({ Name }) => (
                                    <Dropdown.Item eventKey={Name}>{Name}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <input
                            className='formin'
                            type='number'
                            name='quantity'
                            placeholder='Quantity'
                            onChange={e => setQuantity(e.target.value)}
                            />
                        {/* <input
                            className='formin'
                            type='text'
                            id='mess'
                            name='message'
                            placeholder='Any Instructions'
                            /> */}
                        <button className='formin-btn' onClick={submit_form}>
                            <span>Submit</span>
                        </button>
                        <div className='input-text2'></div>
                        {/* <img src={img5} alt='No' width='200px'></img> */}
                </div>
                </Container>
            </div>
    )
}

export default Med_Form
