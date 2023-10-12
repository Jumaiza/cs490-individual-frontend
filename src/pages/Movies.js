import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { List, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import DetailsPopup from "../components/DetailsPopup";
import MovieIcon from '@mui/icons-material/Movie';

export default function Movies () {
    const [formData, setFormData] = useState({
        film_title: '',
        actor_name: '',
        film_category: '',
    });
    const [movieData, setMovieData] = useState([]);
    const [fieldClicked, setFieldClicked] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleChange = (e, field) => {
        setFormData({...formData, [field]: e.target.value})
    }
    
    const handleClick = (field) => {
        setFieldClicked(field);
        switch(field){
            case 'film_title':
                axios.post('http://localhost:4000/api/movies/search-by-title', {film_title: formData.film_title})
                    .then((res) => {
                        setMovieData(res.data);
                    })
                    .catch((err) => {
                        console.error(err)
                });
                break;
            case 'actor_name':
                axios.post('http://localhost:4000/api/movies/search-by-actor-name', {actor_name: formData.actor_name})
                    .then((res) => {
                        setMovieData(res.data)
                    })
                    .catch((err) => {
                        console.error(err)
                });
                break;
            case 'film_category':
                axios.post('http://localhost:4000/api/movies/search-by-category', {film_category: formData.film_category})
                    .then((res) => {
                        setMovieData(res.data)
                    })
                    .catch((err) => {
                        console.error(err)
                });
                break;
            default:
                console.log("Invalid field")
        }
    }

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
        setIsPopupOpen(true);
    }
    const handlePopupClose = () => {
        setSelectedMovie(null);
        setIsPopupOpen(false);
    }

    return (
        <div className="movies">
            <h1>Movies</h1>
            <h2>Search For A Movie:</h2>
            <TextField
                label="Film Title"
                variant="outlined"
                title="film-title-input"
                sx={{ width: '500px', marginRight: '5px'}}
                onChange={(e) => handleChange(e, 'film_title')}
            />
            <Button
                title="film-title-search"
                variant="contained"
                sx={{ height: '55px'}}
                onClick={() => handleClick('film_title')}
            >
                Search by Film Title
            </Button>
            <br></br>
            <br></br>
            <TextField
                label="Actor Name"
                variant="outlined"
                sx={{ width: '500px', marginRight: '5px'}}
                onChange={(e) => handleChange(e, 'actor_name')}
            />
            <Button
                variant="contained"
                sx={{ height: '55px'}}
                onClick={() => handleClick('actor_name')}
            >
                Search by Actor Name
            </Button>
            <br></br>
            <br></br>
            <TextField
                label="Film Category"
                variant="outlined"
                sx={{ width: '500px', marginRight: '5px'}}
                onChange={(e) => handleChange(e, 'film_category')}
            />
            <Button
                variant="contained"
                sx={{ height: '55px'}}
                onClick={() => handleClick('film_category')}
            >
                Search by Film Cateogry
            </Button>
            <br></br>
            <br></br>
            <h2>Movie Results:</h2>
            { movieData.length ? (
                <List>
                    {movieData.map((movie) => (
                        <ListItemButton onClick={() => handleMovieClick(movie)} sx={{ width: '80%'}}>
                            <ListItemIcon>
                                <MovieIcon/>
                            </ListItemIcon>
                            {fieldClicked === 'film_title' && (
                                <ListItemText primary={movie.title} />
                            )}
                            {fieldClicked === 'actor_name' && (
                                <ListItemText primary={movie.title} secondary={`Actor: ${movie.first_name} ${movie.last_name}`}/>
                            )}
                            {fieldClicked === 'film_category' && (
                                <ListItemText primary={movie.title} secondary={`Category: ${movie.name}`}/>
                            )}
                        </ListItemButton>
                    ))}
                </List>
            ) : (
                <p>No results</p>
            )}
            {selectedMovie !== null && (
                <DetailsPopup
                    isOpen={isPopupOpen}
                    handleClose={handlePopupClose}
                    item={selectedMovie}
                    type="movie"
                />
            )}
        </div>
    );
}