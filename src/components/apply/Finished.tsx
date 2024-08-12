import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

const Finished: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(true);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    setSnackbarOpen(true);
  }, []);
  return (
    <div className='flex h-screen w-full  flex-col items-center justify-center'>
      <div className='m-19 w-1/2 rounded-lg bg-white p-10 shadow-2xl'>
        <p>
          You have successfully finished the submition process. We will let you
          know about further process through email. Best wishes.
        </p>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity='success'
          sx={{
            width: "100%",
            backgroundColor: "#4CAF50",
            color: "#ffffff",
            "& .MuiAlert-icon": { color: "#ffffff" },
          }}
        >
          Invitation Sent!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Finished;
