import { TextField, Button } from "@mui/material";
import { useState } from "react";
import BackendAlert from "./BackendAlert";
import axios from "axios";

export default function CustomerForm (props) {
    const customer = props.customer;
    const isEditForm = props.customer ? true : false;
    const [formData, setFormData] = useState({
        customer_id : isEditForm ? customer.customer_id : '0',
        first_name : isEditForm ? customer.first_name : '',
        last_name : isEditForm ? customer.last_name : '',
        email : isEditForm ? customer.email : '',
        address : isEditForm ? customer.address : '',
        city : isEditForm ? customer.city : '',
        district : isEditForm ? customer.district : '',
        postal_code : isEditForm ? customer.postal_code : '',
        phone : isEditForm ? customer.phone : '',
    })
    const [backendSuccess, setBackendSuccess] = useState(false);
    const [backendMessage, setBackendMessage] = useState("");
    const enableSubmit = Object.values(formData).every(value => value !== '');

    const handleChange = (e, field) => {
        setFormData({...formData, [field]: e.target.value})
    }
    const handleClick = () => {
        if(isEditForm){
            console.log(formData)
            axios.post('http://localhost:4000/api/customers/update-customer', formData)
                .then((res) => {
                    setBackendMessage(res.data)
                    setBackendSuccess(true);
                })
                .catch((err) => {
                    setBackendMessage(err.response.data.error);
                    setBackendSuccess(false);
            });
            return
        }
        axios.put('http://localhost:4000/api/customers/add-customer', formData)
            .then((res) => {
                setBackendMessage(res.data)
                setBackendSuccess(true);
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            })
            .catch((err) => {
                setBackendMessage(err.response.data.error);
                setBackendSuccess(false);
        });
    }
    return (
        <div className="customer-form">
            <p>{isEditForm ? `Customer ID: ${customer.customer_id}` : ''}</p>
            <TextField
                label="First Name"
                variant="outlined"
                sx={{ marginRight: '5px'}}
                onChange={(e) => handleChange(e, 'first_name')}
                defaultValue={isEditForm ? customer.first_name : ''}
            />
            <TextField
                label="Last Name"
                variant="outlined"
                onChange={(e) => handleChange(e, 'last_name')}
                defaultValue={isEditForm ? customer.last_name : ''}
            /><br></br>
            <TextField
                label="Email"
                variant="outlined"
                sx={{ width: '450px', marginTop: '10px'}}
                onChange={(e) => handleChange(e, 'email')}
                defaultValue={isEditForm ? customer.email : ''}
            /> <br></br>
            <TextField
                label="Address"
                variant="outlined"
                sx={{ width: '450px', marginTop: '10px'}}
                onChange={(e) => handleChange(e, 'address')}
                defaultValue={isEditForm ? customer.address : ''}
            /> <br></br>
            <TextField
                label="City"
                variant="outlined"
                sx={{ marginRight: '5px', marginTop: '10px'}}
                onChange={(e) => handleChange(e, 'city')}
                defaultValue={isEditForm ? customer.city : ''}
            />
            <TextField
                label="State"
                variant="outlined"
                sx={{ marginTop: '10px'}}
                onChange={(e) => handleChange(e, 'district')}
                defaultValue={isEditForm ? customer.district : ''}
            /><br></br>
            <TextField
                label="Zip Code"
                variant="outlined"
                sx={{ marginRight: '5px', marginTop: '10px'}}
                onChange={(e) => handleChange(e, 'postal_code')}
                defaultValue={isEditForm ? customer.postal_code : ''}
            />
            <TextField
                label="Phone Number"
                variant="outlined"
                sx={{ marginTop: '10px'}}
                onChange={(e) => handleChange(e, 'phone')}
                defaultValue={isEditForm ? customer.phone : ''}
            /><br></br>
            <Button
                variant="contained"
                sx={{ height: '55px', marginTop: '15px', width: '450px', fontSize: '16px'}}
                onClick={handleClick}
                disabled={!enableSubmit}
            >
                {isEditForm ? "Update Customer Info" : "Add Customer"}
            </Button>
            <BackendAlert isSuccessful={backendSuccess} message={backendMessage}/>
        </div>
    );
}