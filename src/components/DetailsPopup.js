import { Dialog } from "@mui/material";

export default function DetailsPopup (props) {
    return (
        <Dialog open={props.isOpen} onClose={props.handleClose}>
            { props.isActor ? (
                <div className='actor-details'>
                    <h1> Top 5 Rented Movies of this Actor: </h1>
                    <h3>Movie Title:     Rental Count</h3>
                    {props.item.map((movie) => (
                        <p>{movie.movie_title}: {movie.rental_count}</p>
                    ))}
                </div>
            ) : (
                <div className='movie-details'>
                    <h1> Movie Details: </h1>
                    {Object.entries(props.item).map(([key, value]) =>(
                        <p>{key}: {value}</p>
                    ))}
                </div>
            )}
        </Dialog>
    );
}