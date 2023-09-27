import { Dialog } from "@mui/material";

export default function DetailsPopup (props) {
    return (
        <Dialog open={props.isOpen} onClose={props.handleClose}>
            <h1> Movie Details: </h1>
            <div className='movie-details'>
                {Object.entries(props.item).map(([key, value]) =>(
                    <p>{key} : {value}</p>
                ))}
            </div>
        </Dialog>
    );
}