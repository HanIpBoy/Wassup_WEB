//https://fullcalendar.io/docs
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import koLocale from '@fullcalendar/core/locales/ko';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState, useRef } from 'react';
import PlusBtn from '../../images/btn_plus.png';

/*
schedule [ //데이터 예시
    {
        "originKey": " ", "name": "스케쥴1 ",
        "startAt": "2023-04-17T19:00", "endAt": "2023-04-17T20:00",
        "userId": "abc@naver.com",
        "memo": " !",
        "notification": 1,
        "allDayToggle": 1,
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
        // schedule 중에 originKey값이 event의 publicId와 같은 리스트아이템을 넘겨준다.
        const publicId = event.event._def.publicId
        // Array.filter() -> Array
        // (Array).find() -> Item

        const target = schedule.find((item) => {
            return item.originKey === publicId
        })

        onClickEvent(target)
    }

    const handleClickDate = (event) => {
        onClickDate(event.date)
    }

    useEffect(() => {
        if (calendarRef.current) {
            setCalendarApi(calendarRef.current.getApi())
        }
    }, [calendarRef.current]);

    useEffect(() => { //스케줄을 FullCalendar library 형식에 맞춰 가공
        if (calendarApi && schedule) {

            const events = schedule.map((value, idx) => {
                const end = new Date(value.endAt).getTime()
                const formattedEnd = new Date(end + 60 * 60 * 24 * 1000) //포맷된 날짜
                let event = {
                    id: value.originKey,
                    title: value.name,
                    start: new Date(value.startAt),
                    end: new Date(formattedEnd),
                    allDay: value.allDayToggle,
                    backgroundColor: value.groupOriginKey ? 'white' : value.color,
                    borderColor: value.groupOriginKey ? '#0040ff' : value.color,
                    textColor: value.groupOriginKey ? 'black' : undefined
                }
                return event
            })
            setEvents(events)
        }
    }, [calendarApi, schedule])

    return (
        <>
            <div style={{ height: '90%' }}>
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
        </>

    )
}