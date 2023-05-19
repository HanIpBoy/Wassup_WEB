import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from '../../axios.js';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function DeleteModal({ onSubmitDeleteGroup, selectedGroup, onClose }) {
    const handleSubmitDeleteGroup = (event) => {
        onSubmitDeleteGroup(selectedGroup)
    }


    return (
        <div>
            <Modal
                open={true}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        그룹을 삭제하시겠습니까?
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            variant='text'
                            fullWidth
                            sx={{ mt: 3, height: 45, fontSize: 16, color: 'gray' }}
                            onClick={handleSubmitDeleteGroup}
                        >
                            예
                        </Button>
                        <Button
                            variant='text'
                            fullWidth
                            sx={{ mt: 3, height: 45, fontSize: 16, color: 'gray' }}
                            onClick={onClose}
                        >
                            아니오
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}