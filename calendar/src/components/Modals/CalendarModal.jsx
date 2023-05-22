import React, { useState } from 'react';
import { Modal, Box, TextField, FormControlLabel, Checkbox, makeStyles } from '@mui/material';
import ColorField from './Fields/ColorField';
import DateField from './Fields/DateField';
import Button from '@mui/material/Button'
import MiniIcon from '../../images/MiniIcon.png';
import axios from '../../axios';
import dayjs from 'dayjs'

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


// TODO: response에 memo 데이터 없음
export default function CalendarModal({ onClose, selectedDate, editMode, groupMode, onSubmitSchedule, onDeleteSchedule, selectedSchedule, onSubmitGroupSchedule }) {

    const initialInput = {
        name: '',
        allday: false,
        start: dayjs(selectedDate), //모달 클릭시 시작날짜 초기화
        end: dayjs(selectedDate),
        memo: '',
        color: '',
        repeat: '',
    }

    const formatSchedule = (schedule) => {
        const input = {
            ...schedule,
            allday: schedule.allDayToggle,
            start: dayjs(schedule.startAt),
            end: dayjs(schedule.endAt),
        }
        return input
    }

    const [input, setInput] = useState(selectedSchedule && editMode ? formatSchedule(selectedSchedule) : initialInput) // editMode, selectedSchedule가 true이면 들어있는 값으로 변경
    // const [input, setInput] = useState(initialInput) // editMode, selectedSchedule가 true이면 들어있는 값으로 변경
    const handleInput = (event) => {
        const { value, name } = event.target
        if (name === 'allday') {
            setInput((prev) => ({
                ...prev,
                allday: !prev.allday
            }))
            return
        }
        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmitGroupSchedule = (event) => {
        onSubmitGroupSchedule(input)
    }

    const handleSubmit = async (event) => {
        const format = (value) => {
            if (value < 10) {
                return '0' + value
            } else return value
        }
        const { start, end } = input
        const startAt = start.$y + '-' + format(start.$M + 1) + '-' + format(start.$D) + 'T' + format(start.$H) + ':' + format(start.$m)
        const endAt = end.$y + '-' + format(end.$M + 1) + '-' + format(end.$D) + 'T' + format(end.$H) + ':' + format(end.$m)

        const payload = {
            ...(selectedSchedule && { originKey: selectedSchedule.originKey }),
            name: input.name,
            startAt: startAt,
            endAt: endAt,
            color: input.color,
            memo: input.memo,
            allDayToggle: input.allday === true ? "true" : "false"
        }
        // 수정 모드일 때는 (editMode) PUT
        // 생성할 때는 POST

        let response

        if (editMode) {
            response = await axios.put('/schedule', payload)
        } else {
            response = await axios.post('/schedule', payload)
        }

        if (response.data.status === 'succeed') {
            onSubmitSchedule(response.data.data[0])
        }
    }

    const handleClose = () => {
        setInput(initialInput)
        onClose()
    }

    const handleDelete = async (event) => { //일정 삭제 핸들러
        onClose()
        const response = await axios.delete(`/schedule/${selectedSchedule.originKey}`)
        if (response.data.status === 'succeed') {
            onDeleteSchedule(response.data.data[0])
        }

    }

    return (
        <div>
            <Modal
                open={true}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={modalHeader}>

                        <Box sx={titleStyle} align="center" marginBottom={2} >
                            {groupMode ? '그룹 일정 추가' : '일정 추가'}
                        </Box>
                        <img src={MiniIcon} style={{ width: '15%', height: '15%', marginLeft: '-5px', marginTop: '-11px' }} />
                    </div>
                    <TextField id="filled-basic"
                        name='name'
                        value={input.name}

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
                        checked={input.allday}
                        onInput={handleInput}
                        control={<Checkbox />}
                        label="하루종일"
                        labelPlacement='start'
                        sx={{ ml: 35, mt: -0.5, fontFamily: 'var(--font-PoorStory)' }}
                    />
                    <div style={{ borderTop: '0.5px solid grey', marginBottom: '10px' }}></div>

                    <div style={flexContainerStyle}>
                        <div>
                            <div style={{ fontSize: '15px', textAlign: 'center', marginTop: '3px', marginBottom: '-4px' }}>시작</div>
                            <DateField
                                name='start'
                                onInput={handleInput}
                                allday={input.allday} //datepicker or datetimepicker
                                value={input.start} //입력값 동기화를 위해
                            />
                        </div>
                        <div>
                            <div style={{ fontSize: '15px', textAlign: 'center', marginTop: '3px', marginBottom: '-4px' }}>종료</div>
                            <DateField
                                name='end'
                                onInput={handleInput}
                                allday={input.allday}
                                value={input.end}
                            />
                        </div>
                    </div>
                    <TextField id="filled-basic"
                        name='memo'
                        value={input.memo}
                        label="메모"
                        variant='filled'
                        margin="dense"
                        fullWidth
                        sx={{ mt: 2.5 }}
                        onInput={handleInput}
                    />
                    {!groupMode &&
                        <ColorField
                            name='color'
                            onInput={handleInput}
                            value={input.color}
                            sx={{ justifyContent: 'center' }}
                        />
                    }
                    {/* <RepeatField
                        name='repeat'
                        onInput={handleInput}
                        value={input.repeat}
                    /> */}
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3, height: 45, fontSize: 16, fontFamily: 'var(--font-PoorStory);' }}
                        onClick={groupMode ? handleSubmitGroupSchedule : handleSubmit}

                    >{editMode ? '수정' : '추가'}</Button>
                    {/* 삼항연산자 사용, editMode에 따라 수정, 추가 버튼 변경 */}
                    {editMode && (
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 1, height: 45, fontSize: 16, backgroundColor: 'red', fontFamily: 'var(--font-PoorStory);', ":hover": { transition: 'background-color 0.4s ease ', backgroundColor: 'rgba(234, 51, 35,0.8)' } }}
                            onClick={handleDelete}
                        >
                            삭제
                        </Button>
                    )}
                </Box>
            </Modal>
        </div>
    );
}