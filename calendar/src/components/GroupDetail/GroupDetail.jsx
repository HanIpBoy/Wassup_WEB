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
import Avatar from '../Avatar';
import GroupItem from '../Group/GroupItem';
import GroupScheduleModal from '../Modals/GroupScheduleModal';

const dummy = [
    {
        originKey: '0',
        userId: 'a@naver.com',
        userName: '김에이',
        name: 'a의 일정1',
        startAt: '2023-05-15T08:00',
        endAt: '2023-05-16T19:00',
        memo: '메모',
        allDayToogle: false,
    },
    {
        originKey: '1',
        userId: 'b@naver.com',
        userName: '김비비',
        name: 'b의 일정1',
        startAt: '2023-05-15T10:30',
        endAt: '2023-05-15T14:00',
        memo: '메모',
        allDayToogle: false,
    },
    {
        originKey: '2',
        userId: 'c@naver.com',
        userName: '김씨씨',
        name: 'c의 일정1',
        startAt: '2023-05-15T10:00',
        endAt: '2023-05-15T13:00',
        memo: '메모',
        allDayToogle: false,
    },
    {
        originKey: '3',
        userId: 'd@naver.com',
        userName: '김디디',
        name: 'd의 일정1',
        startAt: '2023-05-20',
        endAt: '2023-05-21',
        memo: '메모',
        allDayToogle: true,
    },
    {
        originKey: '4',
        userId: 'e@naver.com',
        userName: '김이이',
        name: 'e의 일정1',
        startAt: '2023-05-15',
        endAt: '2023-05-16',
        memo: '메모',
        allDayToogle: true,
    },
];
export default function GroupDetail({ group, groupUserSchedule }) {
    const calendarRef = useRef();
    const [events, setEvents] = useState([]);
    const [range, setRange] = useState();
    const [open, setOpen] = useState(false); // true면 모달 열림, false면 모달 닫힘
    const [listOpen, setListOpen] = useState(false) // groupname을 눌렀을 때 모달 띄우기
    const [groupMode, setGroupMode] = useState(false)

    const handleClickGroupSchedule = () => {
        setGroupMode(true)
        setOpen(true)

    }

    const handleSubmitSchedule = (input) => { //그룹 일정 추가 눌렀을 때 핸들러

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
        const events = groupUserSchedule.map((value, userIdx) => { //포맷한 groupSchedules의 그룹스케줄
            const userId = value.userId

            const groupEvents = value.groupSchedules.map((value) => {
                const schedule = { ...value, userId }
                let isGroupColor = schedule.groupOriginKey === group.originKey
                let event = {
                    id: schedule.originKey,
                    start: schedule.startAt,
                    end: schedule.endAt,
                    allDay: schedule.allDayToggle,
                    backgroundColor: isGroupColor ? 'white' : COLOR_CODE_LIST[userIdx],
                    borderColor: isGroupColor ? 'black' : COLOR_CODE_LIST[userIdx]
                }
                return event
            })

            const userEvents = value.userSchedules.map((value) => { //포맷한 groupSchedule의 유저스케줄
                const schedule = { ...value, userId }
                let event = {
                    id: schedule.originKey,
                    start: schedule.startAt,
                    end: schedule.endAt,
                    allDay: schedule.allDayToggle,
                    backgroundColor: COLOR_CODE_LIST[userIdx],
                    borderColor: COLOR_CODE_LIST[userIdx]
                }
                return event
            })
            return [...groupEvents, ...userEvents]
        })
        console.log(events)
        setEvents(...events)

    }, [groupUserSchedule]);



    return (
        <>
            {open &&
                <CalendarModal
                    //   selectedSchedule={selectedSchedule}
                    //   selectedDate={selectedDate}
                    //
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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <Button variant='text' onClick={handleClickGroupName} style={{ marginBottom: '10px', fontSize: '18px' }}>{group.groupName}</Button>
                    </div>
                    <Button variant="text" sx={{ fontWeight: 'bold', fontSize: '18px' }} onClick={handleClickGroupSchedule}>그룹 일정 추가</Button>
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
