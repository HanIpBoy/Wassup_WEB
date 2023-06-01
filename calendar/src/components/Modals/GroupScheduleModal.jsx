import React, { useEffect, useState } from 'react';
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
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: '10%'
}

// const buttons = [
//     <Button key="one">단체 연습</Button>,
//     <Button key="two">홈 경기</Button>,
//     <Button key="three">원정 경기</Button>
// ]


// TODO: response에 memo 데이터 없음
export default function GroupScheduleModal({ onClose, groupSchedule, group, updatedGroupSchedule }) {

    // const initialInput = {
    //     name: '',
    //     allday: false,
    //     start: dayjs(selectedDate), //모달 클릭시 시작날짜 초기화
    //     end: dayjs(selectedDate),
    //     memo: '',
    //     color: '',
    //     repeat: '',
    // }


    // useEffect(() => {

    // },[])

    // const buttons = [
    //     [updatedGroupSchedule].map((value, idx) => {
    //         console.log('value는?? ', value)
    //         return <Button> {value[idx].name}</ Button>
    //     })
    // ]


    console.log('아오 이거 뭔데 updated야??', updatedGroupSchedule)










    // const start = updatedGroupSchedule.map((value, idx) => { //그룹일정 시작시간
    //     new Date(value[idx].startAt)
    // })

    // const end = updatedGroupSchedule.map((value, idx) => { //그룹일정 종료시간
    //     new Date(value[idx].endAt)
    // })


    // const start = new Date(groupSchedule[0].startAt) //그룹일정 시작시간
    // const end = new Date(groupSchedule[0].endAt) //그룹일정 종료시간







    // if (schedule.allDayToggle === 'true') {
    //     start = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0);
    //     end = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59);
    // }




    const start = updatedGroupSchedule.map(value => new Date(value.startAt));

    const end = updatedGroupSchedule.map(value => new Date(value.endAt));

    console.log('과연..??', updatedGroupSchedule)






    const formatter = new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric', weekday: 'short', hour: 'numeric', minute: '2-digit', hour12: false }); //시간 변환 formatter











    // const formattedDateStart = start.map((date, idx) => {
    //     if (updatedGroupSchedule[idx].allDayToggle === 'true') {
    //         if (date.getHours() === 0 && date.getMinutes() === 0) {
    //             return '00:00';
    //         } else {
    //             date.setHours(0, 0, 0); // 오전 12시 00분으로 설정
    //         }
    //     }
    //     let formattedTime = formatter.format(date).replace('오후', '').replace(':', ':');
    //     if (formattedTime === '24:00') {
    //         formattedTime = '00:00';
    //     }
    //     return formattedTime;
    // });

    // const formattedDateEnd = end.map((date, idx) => {
    //     if (updatedGroupSchedule[idx].allDayToggle === 'true') {
    //         if (date.getHours() === 0 && date.getMinutes() === 0) {
    //             return '00:00';
    //         } else {
    //             date.setHours(23, 59, 59); // 오후 11시 59분으로 설정
    //         }
    //     }
    //     let formattedTime = formatter.format(date).replace('오후', '').replace(':', ':');
    //     if (formattedTime === '24:00') {
    //         formattedTime = '00:00';
    //     }
    //     return formattedTime;
    // });


    // const formattedDateStart = start.map(date => formatter.format(date)).map(str => str.replace('오후', '').replace(':', ':')); //포맷된 그룹일정 시작시간
    // const formattedDateEnd = end.map(date => formatter.format(date)).map(str => str.replace('오후', '').replace(':', ':')); //포맷된 그룹일정 종료시간




    const formattedDateStart = start.map((date, idx) => {
        if (updatedGroupSchedule[idx].allDayToggle === 'true') {
            return '하루종일';
        } else {
            return formatter.format(date).replace('오후', '').replace(':', ':');
        }
    });

    const formattedDateEnd = end.map((date, idx) => {
        if (updatedGroupSchedule[idx].allDayToggle === 'true') {
            return '하루종일';
        } else {
            return formatter.format(date).replace('오후', '').replace(':', ':');
        }
    });




    const buttons = updatedGroupSchedule.map((value, idx) => (

        <>

            <div key={idx} style={{ textAlign: 'center', color: '#3874CB', marginBottom: '5px' }}>{value.name}</div>
            <div style={{ fontSize: '10px', textAlign: 'center', color: 'gray', marginBottom: '10px' }}>
                {formattedDateStart[idx] === '하루종일' && formattedDateEnd[idx] === '하루종일'
                    ? '하루종일'
                    : `${formattedDateStart[idx]} ~ ${formattedDateEnd[idx]}`
                }
            </div>
            <div style={{ borderTop: '0.5px solid grey', marginBottom: '10px' }}></div>
        </>
    ));



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

                        <Box sx={titleStyle} textAlign='center' marginBottom={2} >
                            {group.groupName}
                        </Box>
                        <img src={MiniIcon} style={{ width: '15%', height: '15%', marginLeft: '-5px', marginTop: '-11px' }} />
                    </div>

                    <div style={{ borderTop: '0.5px solid grey', marginBottom: '10px' }}></div>
                    <div>

                    </div>
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained button groupSchedule"
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