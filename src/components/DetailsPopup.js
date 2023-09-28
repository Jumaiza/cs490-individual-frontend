import { Dialog } from "@mui/material";

export default function DetailsPopup (props) {
    return (
        <Dialog open={props.isOpen} onClose={props.handleClose}>
            { props.type === "movie" && (
                <div className='movie-details'>
                    <h1> Movie Details: </h1>
                    {Object.entries(props.item).map(([key, value]) =>(
                        <p>{key}: {value}</p>
                    ))}
                </div>
            )}
            { props.type === "actor" && (
                <div className='actor-details'>
                    <h1> Top 5 Rented Movies of this Actor: </h1>
                    <h3>Movie Title:     Rental Count</h3>
                    {props.item.map((movie) => (
                        <p>{movie.movie_title}: {movie.rental_count}</p>
                    ))}
                </div>
            )}
            { props.type === "customer" && (
                <div className='customer-details'>
                    <h1> Customer Details: </h1>
                    {Object.entries(props.item).map(([key, value]) =>(
                        <p>{key}: {value}</p>
                    ))}
                    <h1> Movies Rented Out By Customer: </h1>
                    <h3>Title & Days Rented</h3>
                    {props.customerMovies.map((movie) => (
                        <>
                            <p>{ `${movie.title}, ${movie.rental_duration}`}</p>
                        </>
                    ))}
                </div>
            )}
        </Dialog>
    );
}