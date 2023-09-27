import { useState, useEffect} from 'react';
import axios from 'axios';
import { List, ListItemButton, ListItemText } from '@mui/material';
import DetailsPopup from '../components/DetailsPopup';

export default function Home (){
    const [movieData, setMovieData] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isMoviePopupOpen, setIsMoviePopupOpen] = useState(false);
    
    const [actorData, setActorData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/home/top-5-movies')
            .then((res) => {
                setMovieData(res.data);
            })
            .catch((err) => {
                console.error(err)
            });
    }, [])

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
        setIsMoviePopupOpen(true);
    }

    const handleMoviePopupClose = () => {
        setSelectedMovie(null);
        setIsMoviePopupOpen(false);
    }

    return (
        <div className="home">
            <h1> Top 5 Rented Movies: </h1>
            <List>
                {movieData.map((item, index) => (
                    <ListItemButton onClick={() => handleMovieClick(item)}>
                        <ListItemText primary={item.title}/>
                    </ListItemButton>
                ))}
            </List>
            {selectedMovie !== null && (
                <DetailsPopup
                isOpen={isMoviePopupOpen}
                handleClose={handleMoviePopupClose}
                item={selectedMovie}
                />
            )}
        </div>
    );
}