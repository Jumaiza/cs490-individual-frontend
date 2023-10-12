import { TextField, Button } from "@mui/material";
import { useState } from "react";
import BackendAlert from "./BackendAlert";
import axios from "axios";

export default function CustomerForm (props) {
    const isEditForm = props.customer ? true : false;
    const [formData, setFormData] = useState({
        first_name : '',
        last_name : '',
        email : '',
        address : '',
        city : '',
        district : '',
        postal_code : '',
        phone : '',
    })
    const [backendSuccess, setBackendSuccess] = useState(false);
    const [backendMessage, setBackendMessage] = useState("");
    const enableSubmit = Object.values(formData).every(value => value !== '');

    const handleChange = (e, field) => {
        setFormData({...formData, [field]: e.target.value})
    }
    const handleClick = () => {
        if(isEditForm){
            console.log("submit update")
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
        });
    }
    return (
        <div className="customer-form">
            <p>{isEditForm ? `Customer ID: ${props.customer.customer_id}` : ''}</p>
            <TextField
                label="First Name"
                variant="outlined"
                sx={{ marginRight: '5px'}}
                onChange={(e) => handleChange(e, 'first_name')}
                defaultValue={isEditForm ? props.customer.first_name : ''}
            />
            <TextField
                label="Last Name"
                variant="outlined"
                onChange={(e) => handleChange(e, 'last_name')}
                defaultValue={isEditForm ? props.customer.last_name : ''}
            /><br></br>
            <TextField
                label="Email"
                variant="outlined"
                sx={{ width: '450px', marginTop: '10px'}}
                onChange={(e) => handleChange(e, 'email')}
                defaultValue={isEditForm ? props.customer.email : ''}
            /> <br></br>
            <TextField
                label="Address"
                variant="outlined"
                sx={{ width: '450px', marginTop: '10px'}}
                onChange={(e) => handleChange(e, 'address')}
                defaultValue={isEditForm ? props.customer.address : ''}
            /> <br></br>
            <TextField
                label="City"
                variant="outlined"
                sx={{ marginRight: '5px', marginTop: '10px'}}
                onChange={(e) => handleChange(e, 'city')}
                defaultValue={isEditForm ? props.customer.city : ''}
            />
            <TextField
                label="State"
                variant="outlined"
                sx={{ marginTop: '10px'}}
                onChange={(e) => handleChange(e, 'district')}
                defaultValue={isEditForm ? props.customer.district : ''}
            /><br></br>
            <TextField
                label="Zip Code"
                variant="outlined"
                sx={{ marginRight: '5px', marginTop: '10px'}}
                onChange={(e) => handleChange(e, 'postal_code')}
                defaultValue={isEditForm ? props.customer.postal_code : ''}
            />
            <TextField
                label="Phone Number"
                variant="outlined"
                sx={{ marginTop: '10px'}}
                onChange={(e) => handleChange(e, 'phone')}
                defaultValue={isEditForm ? props.customer.phone : ''}
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