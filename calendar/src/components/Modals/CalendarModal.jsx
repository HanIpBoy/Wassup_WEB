import React, { useState } from 'react';
import { Modal, Box, TextField, FormControlLabel, Checkbox, makeStyles } from '@mui/material';
import ColorField from './Fields/ColorField';
import RepeatField from './Fields/RepeatField';
import DateField from './Fields/DateField';
import Button from '@mui/material/Button'
import MiniIcon from '../../images/MiniIcon.png';
import axios from 'axios';

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

    const initialInput = {
        name: '',
        allday: false,
        start: '',
        end: '',
        memo: '',
        color: '',
        repeat: ''
    }

    const [input, setInput] = useState(initialInput)
    const handleInput = (event) => {
        const { value, name } = event.target
        if (name === 'allday') {
            setInput((prev) => ({
                ...prev,
                allday: event.target.checked
            }))
            return
        }
        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        const format = (value) => {
            if (value < 10) {
                return '0' + value
            } else return value
        }
        const { start, end } = input
        const startAt = start.$y + '-' + format(start.$M + 1) + '-' + format(start.$D) + '-' + format(start.$H) + ':' + format(start.$m)
        const endAt = end.$y + '-' + format(end.$M + 1) + '-' + format(end.$D) + '-' + format(end.$H) + ':' + format(end.$m)

        const response = await axios.post('http://13.125.122.132:5005/schedule', {
            name: input.name,
            startAt: startAt,
            endAt: endAt,
            userId: '',
            memo: input.memo,
            notification: 0,
            allDayToggle: input.allday === true ? "true" : "false"
        })
    }

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
                        name='name'
                        label="이름"
                        variant='filled'
                        margin="dense"
                        required
                        fullWidth
                        onInput={handleInput}
                    />
                    <br />
                    <FormControlLabel
                        name='allday'
                        value="start"
                        onInput={handleInput}
                        control={<Checkbox />}
                        label="하루종일"
                        labelPlacement='start'
                        sx={{ ml: 35, mt: -0.5 }}
                    />
                    <div style={{ borderTop: '0.5px solid grey', marginBottom: '10px' }}></div>

                    <div style={flexContainerStyle}>
                        <div>
                            <div style={{ fontSize: '15px', textAlign: 'center', marginTop: '3px', marginBottom: '-4px' }}>시작</div>
                            <DateField
                                name='start'
                                onInput={handleInput}
                            />
                        </div>
                        <div>
                            <div style={{ fontSize: '15px', textAlign: 'center', marginTop: '3px', marginBottom: '-4px' }}>종료</div>
                            <DateField
                                name='end'
                                onInput={handleInput}
                            />
                        </div>
                    </div>
                    <TextField id="filled-basic"
                        name='memo'
                        label="메모"
                        variant='filled'
                        margin="dense"
                        fullWidth
                        sx={{ mt: 2.5 }}
                        onInput={handleInput}
                    />
                    <ColorField
                        name='color'
                        onInput={handleInput}
                        value={input.color}
                    />
                    <RepeatField
                        name='repeat'
                        onInput={handleInput}
                        value={input.repeat}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3, height: 45, fontSize: 16 }}
                        onClick={handleSubmit}
                    >저장</Button>
                </Box>
            </Modal>
        </div>
    );
}