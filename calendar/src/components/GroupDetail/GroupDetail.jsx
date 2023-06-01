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
import cookie from 'js-cookie'
import MemberIcon from '../MemberIcon.jsx';
import axios from '../../axios.js';

export default function GroupDetail({ group, groupSchedule, groupUserSchedule, onSubmitGroupSchedule, groupMembers }) {
    const calendarRef = useRef();
    const [events, setEvents] = useState([]);
    const [range, setRange] = useState();
    const [open, setOpen] = useState(false); // true면 모달 열림, false면 모달 닫힘
    const [listOpen, setListOpen] = useState(false) // groupname을 눌렀을 때 모달 띄우기
    const [groupMode, setGroupMode] = useState(false) //그룹 일정 추가 모달을 띄울지 일정 추가 모달을 띄울지 결정
    const [groupEditMode, setGroupEditMode] = useState(false) //수정모드
    const [leaderMode, setLeaderMode] = useState(false)
    const [updatedGroupSchedule, setUpdatedGroupSchedule] = useState([])
    const [selectedGroupSchedule, setSelectedGroupSchedule] = useState() //클릭된 그룹스케줄 + 그룹 유저스케줄 의 모달에서 나타나는 정보
    const [calendarApi, setCalendarApi] = useState()



    const userId = cookie.get('userId')

    const handleClickGroupSchedule = () => {
        setOpen(true)
        setGroupMode(true)
        setGroupEditMode(false)
        setLeaderMode(true)
    }

    const handleSubmitSchedule = (schedule) => {
        // 1. 모달을 닫는다
        setOpen(false)
        // 2. schedule을 업데이트한다
        if (groupEditMode) {
            const idx = updatedGroupSchedule.findIndex((value) => value.originKey === schedule.originKey)
            const temp = [...updatedGroupSchedule]
            temp[idx] = schedule
            setUpdatedGroupSchedule(temp)
        } else {
            setUpdatedGroupSchedule([...updatedGroupSchedule, schedule])
        }
    }

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




    // useEffect(() => { //스케줄을 FullCalendar library 형식에 맞춰 가공
    //     if (calendarApi && updatedGroupSchedule) {

    //         const events = updatedGroupSchedule.map((value, idx) => {
    //             console.log('value값은?? ', value)
    //             const end = new Date(value.endAt).getTime()
    //             const formattedEnd = new Date(end + 60 * 60 * 24 * 1000) //포맷된 날짜
    //             let event = {
    //                 id: value.originKey,
    //                 title: value.name,
    //                 start: new Date(value.startAt),
    //                 end: new Date(formattedEnd),
    //                 allDay: value.allDayToggle,
    //                 backgroundColor: value.groupOriginKey ? 'white' : value.color,
    //                 borderColor: value.groupOriginKey ? 'black' : value.color,
    //                 textColor: value.groupOriginKey ? 'black' : undefined
    //             }
    //             return event
    //         })
    //         setEvents(events)
    //     }

    // }, [calendarApi, updatedGroupSchedule])


    // useEffect(() => {
    //     if (calendarRef.current) {
    //         setCalendarApi(calendarRef.current.getApi())
    //     }
    // }, [calendarRef.current]);

    useEffect(() => {
        // schedule값이 undefined -> 리스트로 변하면 updatedSchedule을 schedule값으로 바꾼다
        if (groupSchedule !== undefined) {
            setUpdatedGroupSchedule(groupSchedule)
        }
    }, [groupSchedule])






    const onClickEvent = (event) => {
        if (!(event === undefined)) {
            setOpen(true);
            setGroupMode(true);
            setSelectedGroupSchedule(event);

            if (userId === group.leaderId) { // 그룹장이 그룹 일정을 클릭했을때
                setLeaderMode(true)
                setGroupEditMode(true);
            }
            else {
                setLeaderMode(false)
                setGroupEditMode(true)
            }
        }

    };



    const handleClickGroupEvent = (event) => {
        // schedule 중에 originKey값이 event의 publicId와 같은 리스트아이템을 넘겨준다.
        const publicId = event.event._def.publicId
        // Array.filter() -> Array
        // (Array).find() -> Item

        const target = groupSchedule.find((item) => {
            return item.originKey === publicId
        })
        onClickEvent(target)
    }

    const handleClickGroupName = () => {
        setListOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setListOpen(false)
    };

    const handleDeleteGroupSchedule = (schedule) => {
        const idx = updatedGroupSchedule.findIndex((value) => value.originKey === schedule.originKey)
        const temp = [...updatedGroupSchedule]
        temp.splice(idx, 1)
        setUpdatedGroupSchedule(temp)
        setGroupEditMode(false) //수정된 코드
        setSelectedGroupSchedule(undefined) //수정된 코드
    }




    useEffect(() => {
        const updatedEvents = groupUserSchedule.flatMap((value, userIdx) => {
            const userId = value.userId;
            const groupEvents = value.groupSchedules.map((value) => {
                const schedule = { ...value, userId };
                let start = new Date(schedule.startAt);
                let end = new Date(schedule.endAt);
                if (schedule.allDayToggle === 'true') {
                    start = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0);
                    end = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59);
                }
                const isGroupColor = schedule.groupOriginKey === group.originKey;
                const event = {
                    id: schedule.originKey,
                    start,
                    end,
                    allDay: false,
                    backgroundColor: isGroupColor ? 'white' : COLOR_CODE_LIST[userIdx],
                    borderColor: isGroupColor ? '#0040ff' : COLOR_CODE_LIST[userIdx]
                };
                return event;
            });

            const userEvents = value.userSchedules.map((value) => {
                const schedule = { ...value, userId };
                let start = new Date(schedule.startAt);
                let end = new Date(schedule.endAt);
                if (schedule.allDayToggle === 'true') {
                    start = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0);
                    end = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59);
                }
                const event = {
                    userid: schedule.userId,
                    id: schedule.originKey,
                    start,
                    end,
                    allDay: false,
                    backgroundColor: COLOR_CODE_LIST[userIdx],
                    borderColor: COLOR_CODE_LIST[userIdx]
                };
                return event;
            });

            return [...groupEvents, ...userEvents];
        });

        const filteredEvents = updatedEvents.filter((event, index, self) =>
            index === self.findIndex((e) => e.id === event.id)
        );

        setEvents(filteredEvents);
    }, [groupUserSchedule, groupSchedule]);




    return (
        <>
            {open &&
                <CalendarModal
                    //   selectedSchedule={selectedSchedule}
                    //   selectedDate={selectedDate}
                    //
                    group={group}
                    groupMode={groupMode}
                    groupEditMode={groupEditMode}
                    leaderMode={leaderMode}
                    onClickGroupSchedule={handleClickGroupSchedule}
                    onClose={handleClose}
                    onSubmitGroupSchedule={handleSubmitSchedule}
                    selectedGroupSchedule={selectedGroupSchedule}
                    onDeleteGroupSchedule={handleDeleteGroupSchedule}
                />
            }
            {listOpen &&
                <GroupScheduleModal
                    onClickGroupName={handleClickGroupName}
                    onClose={handleClose}
                    groupSchedule={groupSchedule}
                    group={group}
                    updatedGroupSchedule={updatedGroupSchedule}
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
                borderRadius: '10px',
                boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
                fontFamily: 'var(--font-PoorStory);'
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <div style={{ width: '30%' }}>
                        <Button variant='contained' onClick={handleClickGroupName} style={{ fontSize: '18px' }}>{group.groupName}</Button>
                    </div>
                    <div style={{ width: '55%' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '15px', rowGap: '20px', padding: '0 25px' }}>
                            {groupMembers.map((value, idx) => {
                                return <MemberIcon backgroundColor={COLOR_CODE_LIST[idx]} userName={value} />
                            })}
                        </div>
                    </div>
                    <div style={{ width: '15%' }}>
                        {group.leaderId === userId ?
                            <Button variant="text" sx={{ fontWeight: 'bold', fontSize: '18px', whiteSpace: 'nowrap' }} onClick={handleClickGroupSchedule}>그룹 일정 추가</Button>
                            :
                            ''
                        }
                    </div>
                </div>
                <Box sx={style} style={{ padding: '0 0' }}>
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
                        eventClick={handleClickGroupEvent}
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


