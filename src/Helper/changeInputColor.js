import { makeStyles } from "@material-ui/core/styles";

    export const useStyles = makeStyles({
        root: {
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "blue",
          },
          "& .MuiOutlinedInput-input": {
            color: "white",
          },
          "& .MuiInputLabel-outlined": {
            color: "#c5c5c5",
          },
          "& .MuiTextField-root" : {
            color: "white"
          },
          '& > *': {
            color: "white",
          },
        },
      });
