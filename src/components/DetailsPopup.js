import { Dialog } from "@mui/material";
import { Button, TextField, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function DetailsPopup (props) {
    const [formData, setFormData] = useState({ customer_id: '', });
    const [filmInventoryId, setFilmInventoryId] = useState("");
    const [IsFilmAvailable, setIsFilmAvailable] = useState(true);
    const [backendAlert, setBackendAlert] = useState("");
    const [rentedSuccess, setRentedSuccess] = useState(false);

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
    }, [props.type, props.item.film_id, rentedSuccess]);

    const handleChange = (e, field) => {
        setFormData({...formData, [field]: e.target.value})
        setRentedSuccess(false);
        setBackendAlert("");
    }

    const handleClick = (type) => {
        axios.post('http://localhost:4000/api/movies/rent-to-customer',
        {inventory_id: filmInventoryId, customer_id: formData.customer_id})
            .then((res) => {
                setBackendAlert(res.data)
                setRentedSuccess(true);
            })
            .catch((err) => {
                setBackendAlert(err.response.data);
        });
    }

    return (
        <Dialog open={props.isOpen} onClose={props.handleClose}>
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
                    { (rentedSuccess && backendAlert !== "" ) && (
                        <Alert severity="success"> {backendAlert} </Alert>
                    )} 
                    { (!rentedSuccess && backendAlert !== "")  && (
                        <Alert severity="error"> {backendAlert} </Alert>
                    )}
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
                    {Object.entries(props.item).map(([key, value]) =>(
                        <p>{key}: {value}</p>
                    ))}
                    <h1>Movies Rented Out By Customer: </h1>
                    <h3>Title & Days Rented</h3>
                    {props.secondItem.map((movie) => (
                        <>
                            <p>{ `${movie.title}, ${movie.rental_duration}`}</p>
                        </>
                    ))}
                </div>
            )}
        </Dialog>
    );
}