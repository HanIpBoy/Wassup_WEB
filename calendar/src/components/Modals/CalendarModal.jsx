import React from 'react';
import { Modal, Box, TextField, FormControlLabel, Checkbox } from '@mui/material';
import CustomizedMenus from './CustomizedMenus';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


export default function CalendarModal({ open, onClose }) {


    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField id="filled-basic"
                        label="이름"
                        variant='filled'
                        margin="dense"
                        required
                        fullWidth
                    />
                    <br />
                    <FormControlLabel
                        value="start"
                        control={<Checkbox />}
                        label="하루종일"
                        labelPlacement='start'
                        sx={{ ml: 35 }}
                    />
                    <TextField id="filled-basic"
                        label="메모"
                        variant='filled'
                        margin="dense"
                        fullWidth
                    />
                    {/* <CustomizedMenus /> */}
                </Box>
            </Modal>
        </div>
    );
}