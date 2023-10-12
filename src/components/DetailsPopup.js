import { Dialog } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';
import CustomerForm from "./CustomerForm";
import BackendAlert from "./BackendAlert";

export default function DetailsPopup (props) {
    const [formData, setFormData] = useState({ customer_id: '', });
    const [filmInventoryId, setFilmInventoryId] = useState("");
    const [IsFilmAvailable, setIsFilmAvailable] = useState(true);
    const [backendMessage, setBackendMessage] = useState("");
    const [backendSuccess, setBackendSuccess] = useState(false);

    useEffect(() => {
        if(props.type==="movie"){
            axios.post('http://localhost:4000/api/movies/check-available', {film_id: props.item.film_id})
            .then((res) => {
                if(res.data.length === 0){
                    setIsFilmAvailable(false);
                }else{
                    setFilmInventoryId(res.data[0].inventory_id);
                }
            })
            .catch((err) => {
                console.error(err)
            });
        }
    }, [props.type, props.item.film_id, backendSuccess]);

    const handleChange = (e, field) => {
        setFormData({...formData, [field]: e.target.value})
        setBackendSuccess(false);
        setBackendMessage("");
    }

    const handleClick = (type) => {
        if(type === "rent_film"){
            axios.post('http://localhost:4000/api/movies/rent-to-customer', {inventory_id: filmInventoryId, customer_id: formData.customer_id})
                .then((res) => {
                    setBackendMessage(res.data)
                    setBackendSuccess(true);
                })
                .catch((err) => {
                    setBackendMessage(err.response.data.error);
                    setBackendSuccess(false);
            });
        }else{
            console.log(props.item.customer_id)
            if(window.confirm("Are you sure you want to delete this customer? This action is permenant!")){
                axios.post('http://localhost:4000/api/customers/delete-customer-by-id', {customer_id: props.item.customer_id, address_id: props.item.address_id})
                    .then((res) => {
                        setBackendMessage(res.data)
                        setBackendSuccess(true);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    })
                    .catch((err) => {
                        setBackendMessage(err.response.data.error);
                        setBackendSuccess(false);
                });
            }
        }
    }

    return (
        <Dialog open={props.isOpen} onClose={props.handleClose} maxWidth={"lg"} fullWidth>
            { props.type === "movie" && (
                <div className='movie-details' style={{ margin: '0px 20px 20px 20px '}}>
                    <h1>Movie Details: </h1>
                    {Object.entries(props.item).map(([key, value]) =>(
                        <p>{key}: {value}</p>
                    ))}
                    <h2> Rent to Customer: </h2>
                    { IsFilmAvailable ? (
                        <h4 style={{ color: "#008000"}}> Available for Rent! </h4>
                    ) : (
                        <h4 style={{ color: "#FF0000"}}> Out of Stock!! </h4>
                    )}
                    <TextField
                        label="Customer ID"
                        variant="outlined"
                        sx={{ width: '150px', marginRight: '20px'}}
                        onChange={(e) => handleChange(e, 'customer_id')}
                    />
                    <Button
                        variant="contained"
                        sx={{ height: '55px', width: '200px', marginBottom: '10px'}}
                        disabled={!(IsFilmAvailable && formData.customer_id.length !== 0)}
                        onClick={() => handleClick('rent_film')}
                    >
                        Submit Rental
                    </Button>
                    <BackendAlert isSuccessful={backendSuccess} message={backendMessage}/>
                </div>
            )}
            { props.type === "actor" && (
                <div className='actor-details' style={{ margin: '20px'}}>
                    <h1> Actor Details: </h1>
                    {Object.entries(props.item).map(([key, value]) =>(
                        <p>{key}: {value}</p>
                    ))}
                    <h1>Top 5 Rented Movies of this Actor: </h1>
                    <h3>Movie Title:     Rental Count</h3>
                    {props.secondItem.map((movie) => (
                        <p>{movie.movie_title}: {movie.rental_count}</p>
                    ))}
                </div>
            )}
            { props.type === "customer" && (
                <div className='customer-details' style={{ margin: '20px'}}>
                    <h1>Customer Details: </h1>
                    <CustomerForm
                        customer={props.item}
                    />
                    <h1>Movies Rented Out By Customer: </h1>
                    <h3>Title & Return Status</h3>
                    {props.secondItem.map((movie) => (
                        <>
                            <p>{ `${movie.title} - ${movie.return_status}`}</p>
                        </>
                    ))}
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleClick("delete_customer")}
                    > 
                        Delete Customer
                    </Button>
                    <BackendAlert isSuccessful={backendSuccess} message={backendMessage}/>
                </div>
            )}
        </Dialog>
    );
}