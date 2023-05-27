import React from 'react';
import FullCalendar from '@fullcalendar/react';
import Header from '../Header/Header';
import timeGridPlugin from '@fullcalendar/timegrid';
import koLocale from '@fullcalendar/core/locales/ko';
import { useRef, useState, useEffect } from 'react';
import { COLOR_CODE_LIST } from '../../constants';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import CalendarModal from '../Modals/CalendarModal';
import Avartar from '../Avatar';
import GroupItem from '../Group/GroupItem';
import GroupScheduleModal from '../Modals/GroupScheduleModal';
import cookie from 'js-cookie'
import MemberIcon from '../MemberIcon';
import axios from '../../axios.js';

export default function GroupDetail({ group, groupSchedule, groupUserSchedule, onSubmitGroupSchedule, groupMembers }) {
    const calendarRef = useRef();
    const [events, setEvents] = useState([]);
    const [range, setRange] = useState();
    const [open, setOpen] = useState(false); // true면 모달 열림, false면 모달 닫힘
    const [listOpen, setListOpen] = useState(false) // groupname을 눌렀을 때 모달 띄우기
    const [groupMode, setGroupMode] = useState(false) //그룹 일정 추가 모달을 띄울지 일정 추가 모달을 띄울지 결정
    const [editMode, setEditMode] = useState(false) //수정모드
    const [updatedGroupSchedule, setUpdatedGroupSchedule] = useState()

    const handleClickGroupSchedule = () => {
        setGroupMode(true)
        setOpen(true)
    }

    const handleSubmitSchedule = (schedule) => {
        // 1. 모달을 닫는다
        setOpen(false)
        // 2. schedule을 업데이트한다
        setUpdatedGroupSchedule([...updatedGroupSchedule], schedule)
        // if (groupEditMode) {
        //   const idx = updatedGroupSchedule.findIndex((value) => value.originKey === schedule.originKey)
        //   const temp = [...updatedGroupSchedule]
        //   temp[idx] = schedule
        //   setUpdatedGroupSchedule(temp)
        // } else {
        //   setUpdatedGroupSchedule([...updatedGroupSchedule, schedule])
        // }
    }

    const handleClickGroupName = () => {
        setListOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setListOpen(false)
    };

    useEffect(() => {
        function updateRange() {
            if (calendarRef.current) {
                const currentRange = calendarRef.current.calendar.currentData.dateProfile.currentRange;
                setRange(currentRange);
            }
        }

        document
            .querySelectorAll('.fc-toolbar-chunk button')
            .forEach((el) => el.addEventListener('click', updateRange));
        updateRange();
    }, []);

    useEffect(() => {
        const events = groupUserSchedule.map((value, userIdx) => {
            const userId = value.userId
            const groupEvents = value.groupSchedules.map((value) => {//포맷한 groupSchedules의 그룹스케줄


                const schedule = { ...value, userId }

                let start = new Date(schedule.startAt)
                let end = new Date(schedule.endAt)
                if (schedule.allDayToggle === 'true') {
                    start = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0)
                    end = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59)
                }
                let isGroupColor = schedule.groupOriginKey === group.originKey
                let event = {
                    id: schedule.originKey,
                    start: start,
                    end: end,
                    allDay: false,
                    backgroundColor: isGroupColor ? 'white' : COLOR_CODE_LIST[userIdx],
                    borderColor: isGroupColor ? 'black' : COLOR_CODE_LIST[userIdx]
                }
                return event
            })

            const userEvents = value.userSchedules.map((value) => { //포맷한 groupSchedule의 유저스케줄

                const schedule = { ...value, userId }

                let start = new Date(schedule.startAt)
                let end = new Date(schedule.endAt)
                if (schedule.allDayToggle === 'true') {
                    start = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0)
                    end = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59)
                }

                let event = {
                    userid: schedule.userId,
                    id: schedule.originKey,
                    start: start,
                    end: end,
                    allDay: false,
                    backgroundColor: COLOR_CODE_LIST[userIdx],
                    borderColor: COLOR_CODE_LIST[userIdx]
                }

                return event


            })
            return [...groupEvents, ...userEvents]
        })
        setEvents(...events) //...events
        console.log('group : ', group)
        console.log('userId : : :   '.userId)

    }, [groupUserSchedule, groupSchedule])

    const userId = cookie.get('userId')


    return (
        <>
            {open &&
                <CalendarModal
                    //   selectedSchedule={selectedSchedule}
                    //   selectedDate={selectedDate}
                    //
                    group={group}
                    groupMode={groupMode}
                    onClickGroupSchedule={handleClickGroupSchedule}
                    onClose={handleClose}
                    onSubmitGroupSchedule={handleSubmitSchedule}
                />
            }
            {listOpen &&
                <GroupScheduleModal
                    onClickGroupName={handleClickGroupName}
                    onClose={handleClose}
                    groupSchedule={groupSchedule}
                    group={group}
                />

            }
            <Header />
            <div style={{
                backgroundColor: 'rgba(219,230,243,0.5)',
                height: 'auto',
                marginLeft: '15%',
                marginRight: '15%',
                marginBottom: '50px',
                padding: '35px 50px',
                borderRadius: '30px',
                boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
                fontFamily: 'var(--font-PoorStory);'
            }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '20%' }}>
                        <Button variant='contained' onClick={handleClickGroupName} style={{ marginBottom: '10px', fontSize: '18px' }}>{group.groupName}</Button>
                    </div>
                    {/* <div style={{ width: '60%' }}>
                        {/* 이 자리에 아바타들 만들어야 함. }
                        <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '30px', rowGap: '15px', padding: '10px 25px' }}>
                            {[group].map((value, idx) => {
                                console.log('group.map의 value에는 뭐가 있니!!!!', value)
                                return <MemberIcon backgroundColor={COLOR_CODE_LIST[idx]} userName={groupMembers[idx]} />
                            })}
                        </div>
                    </div> */}
                    <div style={{ width: '20%' }}>
                        {group.leaderId === userId ?
                            <Button variant="text" sx={{ fontWeight: 'bold', fontSize: '18px' }} onClick={handleClickGroupSchedule}>그룹 일정 추가</Button>
                            :
                            ''
                        }
                    </div>
                </div>
                <Box sx={style}>
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[timeGridPlugin]}
                        initialView='timeGridWeek'
                        locale={koLocale}
                        events={events}
                        displayEventTime={false}
                        eventOverlap={false}
                        eventClassNames={'custom-event'}
                        eventOrder={(a, b) => a.order - b.order}
                        allDaySlot={false}
                        height={'600px'}
                        updatedGroupSchedule={updatedGroupSchedule}
                    />
                </Box>
            </div>
        </>
    );
}

const style = {
    '.custom-event': {
        width: '10px !important'
    },
};
