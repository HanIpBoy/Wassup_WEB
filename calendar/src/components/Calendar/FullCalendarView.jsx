//https://fullcalendar.io/docs
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import koLocale from '@fullcalendar/core/locales/ko';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState, useRef } from 'react';

/*
schedule [ //데이터 예시
    {
        "originKey": " ", "name": "스케쥴1 ",
        "startAt": "2023-04-17T19:00", "endAt": "2023-04-17T20:00",
        "userId": "abc@naver.com",
        "memo": " !",
        "notification": 1,
        "allDayToogle": 1,
        "createdAt": "2023-03-17-19:11",
        "lastModifiedAt": "2023-03-17-19:11"
    },
    {},
    {}
]
*/
export default function FullCalendarView({ onClickDate, schedule, onClickEvent }) {
    const [events, setEvents] = useState([])
    const [calendarApi, setCalendarApi] = useState();
    const calendarRef = useRef();

    const handleClickEvent = (event) => {
        onClickEvent(event.event)
    }

    const handleClickDate = (event) => {
        onClickDate(event.date)
    }

    useEffect(() => {
        if (calendarRef.current) {
            setCalendarApi(calendarRef.current.getApi())
        }
    }, []);

    useEffect(() => { //스케줄을 FullCalendar library 형식에 맞춰 가공
        if (calendarApi) {
            const events = schedule.map((value, idx) => {
                let event = {
                    id: value.originKey,
                    title: value.name,
                    start: new Date(value.startAt),
                    end: new Date(value.endAt),
                    allDay: value.allDayToggle,
                    // backgroundColor:
                    // borderColor: 
                }
                return event
            })
            setEvents(events)
        }
    }, [calendarApi])

    return (
        <div>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale={koLocale}
                dateClick={handleClickDate}
                eventClick={handleClickEvent}
                events={events}
            />
        </div>
    )
}