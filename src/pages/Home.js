import { useState, useEffect} from 'react';
import axios from 'axios';
import { List, ListItemButton, ListItemText } from '@mui/material';
import DetailsPopup from '../components/DetailsPopup';

export default function Home (){
    const [movieData, setMovieData] = useState([]);
    const [actorData, setActorData] = useState([]);
    const [selectedObject, setSelectedObject] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isActor, setIsActor] = useState(false);

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

    const handleClick = (object, isActor) => {
        setIsActor(isActor);
        if(isActor){
            const reqBody = {actorId: object.actor_id};
            axios.post('http://localhost:4000/api/home/top-5-films-by-actor-id', reqBody)
            .then((res) => {
                setSelectedObject(res.data)
            })
            .catch((err) => {
                console.error(err)
            });
        }else{
            setSelectedObject(object);
        }
        setIsPopupOpen(true);
    }

    const handlePopupClose = () => {
        setSelectedObject(null);
        setIsPopupOpen(false);
    }

    return (
        <div className="home">
            <h1> Top 5 Rented Movies: </h1>
            <List>
                {movieData.map((movie) => (
                    <ListItemButton onClick={() => handleClick(movie, false)}>
                        <ListItemText primary={movie.title}/>
                    </ListItemButton>
                ))}
            </List>
            <h1> Top 5 Actors By # of Films: </h1>
            <List>
                {actorData.map((actor) => (
                    <ListItemButton onClick={() => handleClick(actor, true)}>
                        <ListItemText primary={`${actor.first_name} ${actor.last_name}`}/>
                    </ListItemButton>
                ))}
            </List>
            {selectedObject !== null && (
                <DetailsPopup
                isOpen={isPopupOpen}
                handleClose={handlePopupClose}
                item={selectedObject}
                isActor={isActor}
                />
            )}

        </div>
    );
}