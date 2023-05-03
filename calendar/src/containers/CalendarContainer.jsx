import axios from "../axios";
import Calendar from "../components/Calendar/Calendar.jsx";
import { useEffect, useState } from "react";

// const dummy = [ //더미 데이터, 서버 작동되면 삭제해도 됨
//     {
//         "originKey": " ", "name": "스케쥴1 ",
//         "startAt": "2023-04-17T19:00", "endAt": "2023-04-20T20:00",
//         "userId": "abc@naver.com",
//         "memo": " !",
//         "notification": 1,
//         "allDayToggle": 1,
//         "createdAt": "2023-03-17T19:11",
//         "lastModifiedAt": "2023-03-17T19:11"
//     },
//     {
//         "originKey": " ", "name": "스케쥴2 ",
//         "startAt": "2023-04-17T19:00", "endAt": "2023-04-17T20:00",
//         "userId": "abc@naver.com",
//         "memo": " !",
//         "notification": 1,
//         "allDayToggle": 1,
//         "createdAt": "2023-03-17T19:11",
//         "lastModifiedAt": "2023-03-17T19:11"
//     },
//     {
//         "originKey": " ", "name": "스케쥴3 ",
//         "startAt": "2023-04-17T19:00", "endAt": "2023-04-20T20:00",
//         "userId": "abc@naver.com",
//         "memo": " !",
//         "notification": 1,
//         "allDayToggle": 1,
//         "createdAt": "2023-03-17T19:11",
//         "lastModifiedAt": "2023-03-17T19:11"
//     },
// ]

function formatDate(datetime) {
    const date = datetime.substring(0, 10)
    const time = datetime.substring(10)
    const formatTime = time.replace('-', 'T')
    const result = date + formatTime

    return result
}

export default function CalendarContainer() {
    const [schedule, setSchedule] = useState()

    useEffect(() => {
        axios.get('/schedule').then((response) => {
            console.log('response', response)

            const schedule = response.data.data.map((value, idx) => {
                value.startAt = formatDate(value.startAt)
                value.endAt = formatDate(value.endAt)

                return value
            })
            setSchedule(schedule)
        })
    }, []);
    return <Calendar schedule={schedule} />
}