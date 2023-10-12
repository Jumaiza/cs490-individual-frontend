import { Alert } from "@mui/material";

export default function BackendAlert(props) {
  if (props.message) {
    return (
      <Alert severity={props.isSuccessful ? "success" : "error"}>
        {props.message}
      </Alert>
    );
  }
  return null;
}