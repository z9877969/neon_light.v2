import { Alert, AlertTitle, Snackbar } from "@mui/material";

const CustomizedAlert = ({ message, closeAlert }) => {
  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  const handleClose = (event, reason) => {
    //   if (reason === "clickaway") {
    //     return;
    //   }

    //   setOpen(false);
    closeAlert(null);
  };

  return (
    // <Snackbar
    //   anchorOrigin={{ vertical: "top", horizontal: "center" }}
    //   open={Boolean(message)}
    //   onClose={handleClose}
    //   message={message}
    // //   key={vertical + horizontal}
    // />
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={Boolean(message)}
      //   autoHideDuration={10000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        sx={{ width: "50%", fontSize: "18px" }}
      >
        <AlertTitle sx={{ fontSize: "24px" }}>
          {message.split("\n")[0]}
        </AlertTitle>
        {message.split("\n")[1]}
      </Alert>
    </Snackbar>
  );
};

export default CustomizedAlert;
