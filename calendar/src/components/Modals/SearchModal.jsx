import React, { useState } from 'react';
import { Modal, Box, TextField } from '@mui/material';
import Button from '@mui/material/Button'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
};

export default function SearchModal({ back }) {
    return (
        <>
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Button
                        variant="text"
                        fullWidth
                        sx={{ mt: 3, height: 45, fontSize: 16 }}
                        onClick={back}
                    >뒤로가기</Button>
                    <TextField id="filled-basic"
                        // name='groupName'
                        // value={input.groupName}
                        variant='filled'
                        margin="dense"
                        required
                        fullWidth
                    // onInput={handleInput}
                    />
                </Box>
            </Modal>
        </>
    )
}