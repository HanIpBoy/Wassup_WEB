import axios from "../axios";
import Calendar from "../components/Calendar/Calendar.jsx";
import { useEffect, useState } from "react";

const dummy = [ //더미 데이터, 서버 작동되면 삭제해도 됨
    {
        "originKey": " ", "name": " ",
        "startAt": "2023-04-17-19:00", "endAt": "2023-04-17-20:00",
        "userId": "abc@naver.com",
        "memo": " !",
        "notification": 1,
        "allDayToogle": 1,
        "createdAt": "2023-03-17-19:11",
        "lastModifiedAt": "2023-03-17-19:11"
    }
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