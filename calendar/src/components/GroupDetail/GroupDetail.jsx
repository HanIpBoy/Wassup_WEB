import React from 'react';
import FullCalendar from '@fullcalendar/react';
import Header from '../Header/Header';
import timeGridPlugin from '@fullcalendar/timegrid';
import koLocale from '@fullcalendar/core/locales/ko';
import { useRef, useState, useEffect } from 'react';
import { COLOR_CODE_LIST } from '../../constants';
import { Box } from '@mui/material';
import Avatar from '../Avatar';

const dummy = [
    {
        originKey: '0',
        userId: 'a@naver.com',
        userName: '김에이',
        name: 'a의 일정1',
        startAt: '2023-05-07T08:00',
        endAt: '2023-05-07T19:00',
        memo: '메모',
        allDayToogle: false,
    },
    {
        originKey: '1',
        userId: 'b@naver.com',
        userName: '김비비',
        name: 'b의 일정1',
        startAt: '2023-05-07T10:30',
        endAt: '2023-05-07T14:00',
        memo: '메모',
        allDayToogle: false,
    },
    {
        originKey: '2',
        userId: 'c@naver.com',
        userName: '김씨씨',
        name: 'c의 일정1',
        startAt: '2023-05-20',
        endAt: '2023-05-21',
        memo: '메모',
        allDayToogle: true,
    },
];
export default function GroupDetail() {
    const calendarRef = useRef();
    const [schedules, setSchedules] = useState(dummy);
    const [events, setEvents] = useState([]);
    const [range, setRange] = useState();

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
        const events = schedules.map((value, idx) => {
            let start = value.startAt;
            let end = value.endAt;
            if (value.allDayToogle) {
                // allDay이면 시간을 00시부터 23시 59분 59초까지로 변경
                start = new Date(value.startAt).toJSON().substring(0, 11) + '00:00:00';
                end = new Date(value.endAt).toJSON().substring(0, 11) + '23:59:59';
            }
            let event = {
                id: value.originKey,
                start,
                end,
                allDay: false,
                backgroundColor: COLOR_CODE_LIST[idx],
                borderColor: COLOR_CODE_LIST[idx],
                order: idx,
            };
            return event;
        });
        setEvents(events);
    }, [schedules]);

    return (
        <>
            <Header />
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
                />
            </Box>
        </>
    );
}

const style = {
    '.custom-event': {
        width: '10px !important',
    },
};
