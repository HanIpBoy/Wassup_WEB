import axios from "../axios";
import Calendar from "../components/Calendar/Calendar.jsx";
import { useEffect, useState } from "react";

const dummy = [ //더미 데이터, 서버 작동되면 삭제해도 됨
    {
        "originKey": " ", "name": "스케쥴1 ",
        "startAt": "2023-04-17T19:00", "endAt": "2023-04-20T20:00",
        "userId": "abc@naver.com",
        "memo": " !",
        "notification": 1,
        "allDayToggle": 1,
        "createdAt": "2023-03-17T19:11",
        "lastModifiedAt": "2023-03-17T19:11"
    },
    {
        "originKey": " ", "name": "스케쥴2 ",
        "startAt": "2023-04-17T19:00", "endAt": "2023-04-17T20:00",
        "userId": "abc@naver.com",
        "memo": " !",
        "notification": 1,
        "allDayToggle": 1,
        "createdAt": "2023-03-17T19:11",
        "lastModifiedAt": "2023-03-17T19:11"
    },
    {
        "originKey": " ", "name": "스케쥴3 ",
        "startAt": "2023-04-17T19:00", "endAt": "2023-04-20T20:00",
        "userId": "abc@naver.com",
        "memo": " !",
        "notification": 1,
        "allDayToggle": 1,
        "createdAt": "2023-03-17T19:11",
        "lastModifiedAt": "2023-03-17T19:11"
    },
]

export default function CalendarContainer() {
    const [schedule, setSchedule] = useState(dummy)

    // useEffect(() => {
    //     axios.get('/schedule').then((response) => {
    //         setSchedule(response.data.data)
    //     })
    // }, []);
    return <Calendar schedule={schedule} />
}