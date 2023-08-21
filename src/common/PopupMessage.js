import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';

const PopupMessage = ({ message, onClose }) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        onClose();
    };

    return (
        <Snackbar open={open} autoHideDuration={null} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
            <Alert severity="success" onClose={handleClose}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default PopupMessage;