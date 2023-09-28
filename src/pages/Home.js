import { useState, useEffect} from 'react';
import axios from 'axios';
import { List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import DetailsPopup from '../components/DetailsPopup';
import MovieIcon from '@mui/icons-material/Movie';
import BadgeIcon from '@mui/icons-material/Badge';

export default function Home (){
    const [movieData, setMovieData] = useState([]);
    const [actorData, setActorData] = useState([]);
    const [selectedObject, setSelectedObject] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popUpType, setPopupType] = useState('');
    const [actorMovies, setActorMovies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/home/top-5-movies')
            .then((res) => {
                setMovieData(res.data);
            })
            .catch((err) => {
                console.error(err)
        });
        axios.get('http://localhost:4000/api/home/top-5-actors')
            .then((res) => {
                setActorData(res.data);
            })
            .catch((err) => {
                console.error(err)
        });
    }, [])

    const handleClick = (object, type) => {
        setPopupType(type);
        setSelectedObject(object);
        if(type === "actor"){
            const reqBody = {actorId: object.actor_id};
            axios.post('http://localhost:4000/api/home/top-5-films-by-actor-id', reqBody)
            .then((res) => {
                setActorMovies(res.data)
            })
            .catch((err) => {
                console.error(err)
            });
        }
        setIsPopupOpen(true);
    }

    const handlePopupClose = () => {
        setSelectedObject(null);
        setActorMovies(null);
        setIsPopupOpen(false);
    }

    return (
        <div className="home">
            <h1>Home</h1>
            <h2> Top 5 Rented Movies: </h2>
            <List>
                {movieData.map((movie) => (
                    <ListItemButton onClick={() => handleClick(movie, "movie")} sx={{ width: '80%'}}>
                        <ListItemIcon>
                            <MovieIcon/>
                        </ListItemIcon>
                        <ListItemText primary={movie.title}/>
                    </ListItemButton>
                ))}
            </List>
            <h2> Top 5 Actors By # of Films: </h2>
            <List>
                {actorData.map((actor) => (
                    <ListItemButton onClick={() => handleClick(actor, "actor")} sx={{ width: '80%'}}>
                        <ListItemIcon>
                            <BadgeIcon/>
                        </ListItemIcon>
                        <ListItemText primary={`${actor.first_name} ${actor.last_name}`}/>
                    </ListItemButton>
                ))}
            </List>
            {(selectedObject !== null && actorMovies !== null) && (
                <DetailsPopup
                isOpen={isPopupOpen}
                handleClose={handlePopupClose}
                item={selectedObject}
                secondItem={actorMovies}
                type={popUpType}
                />
            )}

        </div>
    );
}