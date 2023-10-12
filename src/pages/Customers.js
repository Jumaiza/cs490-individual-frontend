import { Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { List, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import DetailsPopup from "../components/DetailsPopup";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CustomerForm from "../components/CustomerForm";
import BackendAlert from "../components/BackendAlert";
import jsPDF from 'jspdf';

export default function Customers () {
    const [customerData, setCustomerData] = useState([]);
    const [formData, setFormData] = useState({
        customer_id: '',
        name: '',
        first_name : '',
    })
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customersRentedMovies, setCustomersRentedMovies] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:4000/api/customers/all-customers')
            .then((res) => {
                setCustomerData(res.data);
            })
            .catch((err) => {
                console.error(err)
        });
    }, [])

    const handleChange = (e, field) => {
        setFormData({...formData, [field]: e.target.value})
    }

    const handleSearchClick = (field) => {
        switch(field){
            case 'customer_id':
                axios.post('http://localhost:4000/api/customers/search-by-id', {customer_id: formData.customer_id})
                    .then((res) => {
                        setCustomerData(res.data);
                    })
                    .catch((err) => {
                        console.error(err)
                });
                break;
            case 'name':
                axios.post('http://localhost:4000/api/customers/search-by-name', {name: formData.name})
                    .then((res) => {
                        setCustomerData(res.data)
                    })
                    .catch((err) => {
                        console.error(err)
                });
                break;
            default:
                console.log("Invalid field")
        }
    }

    const handleCustomerClick = (customer) => {
        setSelectedCustomer(customer);
        const reqBody = {customer_id: customer.customer_id};
        axios.post('http://localhost:4000/api/customers/rented-movies-by-id', reqBody)
        .then((res) => {
            setCustomersRentedMovies(res.data)
        })
        .catch((err) => {
            console.error(err)
        });
        setIsPopupOpen(true);
    }

    const handlePopupClose = () => {
        setSelectedCustomer(null);
        setCustomersRentedMovies(null);
        setIsPopupOpen(false);
    }

    const generatePdf = () => {
        const pdf = new jsPDF();
        customerData.forEach((data, index) => {
            if (index > 0) {
              pdf.addPage();
            }
            const content = JSON.stringify(data, null, 4);
            pdf.text(content, 5, 5);
          });
        pdf.save('generated.pdf');
    }

    return (
        <div>
            <h1>Customers</h1>
            <h2>Add a New Customer:</h2>
            <CustomerForm/>
            <BackendAlert/>
            <h2>Filter Customers:</h2>
            <TextField
                label="Customer ID"
                variant="outlined"
                sx={{ width: '500px', marginRight: '5px'}}
                onChange={(e) => handleChange(e, 'customer_id')}
            />
            <Button
                variant="contained"
                sx={{ height: '55px'}}
                onClick={() => handleSearchClick('customer_id')}
            >
                Filter by Customer ID
            </Button>
            <br></br>
            <br></br>
            <TextField
                label="First or Last Name"
                variant="outlined"
                sx={{ width: '500px', marginRight: '5px'}}
                onChange={(e) => handleChange(e, 'name')}
            />
            <Button
                variant="contained"
                sx={{ height: '55px'}}
                onClick={() => handleSearchClick('name')}
            >
                Filter by Customer Name
            </Button>
            <br></br>
            <br></br>
            <div id="pdf-content">
                <h2>Customer Results:</h2>
                <Button variant="outlined" color="secondary" onClick={generatePdf}> GENERATE PDF</Button>
                { customerData.length ? (
                    <List>
                        {customerData.map((customer, i) => (
                            <ListItemButton onClick={() => handleCustomerClick(customer)} sx={{ width: '80%'}} key={i}>
                                <ListItemIcon>
                                    <AccountBoxIcon/>
                                </ListItemIcon>
                                <ListItemText primary={`${customer.first_name} ${customer.last_name}`} secondary={`ID: ${customer.customer_id}`}/>
                            </ListItemButton>
                        ))}
                    </List>
                ) : (
                    <p>No results</p>
                )}
            </div>
            { (selectedCustomer !== null && customersRentedMovies !== null ) && (
                <DetailsPopup
                    isOpen={isPopupOpen}
                    handleClose={handlePopupClose}
                    item={selectedCustomer}
                    secondItem={customersRentedMovies}
                    type="customer"
                />
            )}
        </div>
    );
}