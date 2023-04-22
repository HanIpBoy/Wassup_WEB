import React from 'react';
import { Modal, Box, TextField, FormControlLabel, Checkbox, makeStyles } from '@mui/material';
import ColorField from './Fields/ColorField';
import RepeatField from './Fields/RepeatField';
import DateField from './Fields/DateField';
import Button from '@mui/material/Button'
import MiniIcon from '../../images/MiniIcon.png';

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

const titleStyle = {
    fontSize: 24,
    color: 'primary.main'
}

const flexContainerStyle = {
    display: 'flex',
    gap: 10,
    alignItems: 'center'
}

const modalHeader = {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    marginLeft: '38%'
}

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
                    <div style={modalHeader}>
                        <Box sx={titleStyle} align="center" marginBottom={2} >
                            일정 등록
                        </Box>
                        <img src={MiniIcon} style={{ width: '15%', height: '15%', marginLeft: '-5px', marginTop: '-11px' }} />
                    </div>
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
                        sx={{ ml: 35, mt: -0.5 }}
                    />
                    <div style={{ borderTop: '0.5px solid grey', marginBottom: '10px' }}></div>

                    <div style={flexContainerStyle}>
                        <div>
                            <div style={{ fontSize: '15px', textAlign: 'center', marginTop: '3px', marginBottom: '-4px' }}>시작</div>
                            <DateField />
                        </div>
                        <div>
                            <div style={{ fontSize: '15px', textAlign: 'center', marginTop: '3px', marginBottom: '-4px' }}>종료</div>
                            <DateField />
                        </div>
                    </div>
                    <TextField id="filled-basic"
                        label="메모"
                        variant='filled'
                        margin="dense"
                        fullWidth
                        sx={{ mt: 2.5 }}
                    />
                    <ColorField />
                    <RepeatField />
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3, height: 45, fontSize: 16 }}
                    >저장</Button>
                </Box>
            </Modal>
        </div>
    );
}