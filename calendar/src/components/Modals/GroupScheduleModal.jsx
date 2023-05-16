import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup';
import MiniIcon from '../../images/MiniIcon.png';
import axios from '../../axios.js';
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


const modalHeader = {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    marginLeft: '38%'
}

const buttons = [
    <Button key="one">단체 연습</Button>,
    <Button key="two">홈 경기</Button>,
    <Button key="three">원정 경기</Button>
]


// TODO: response에 memo 데이터 없음
export default function GroupScheduleModal({ onClose, selectedDate, onClickGroupName, onSubmitSchedule, selectedSchedule }) {

    // const initialInput = {
    //     name: '',
    //     allday: false,
    //     start: dayjs(selectedDate), //모달 클릭시 시작날짜 초기화
    //     end: dayjs(selectedDate),
    //     memo: '',
    //     color: '',
    //     repeat: '',
    // }



    const handleClose = () => {
        onClose()
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
                            축구동아리
                        </Box>
                        <img src={MiniIcon} style={{ width: '15%', height: '15%', marginLeft: '-5px', marginTop: '-11px' }} />
                    </div>

                    <div style={{ borderTop: '0.5px solid grey', marginBottom: '10px' }}></div>
                    <div>

                    </div>
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained button group"
                        variant="text"
                        fullWidth
                    >
                        {buttons}
                    </ButtonGroup>
                </Box>


            </Modal>
        </div>
    );
}