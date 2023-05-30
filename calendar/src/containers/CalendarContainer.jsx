import axios from "../axios";
import Calendar from "../components/Calendar/Calendar.jsx";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header.jsx";

function formatDate(datetime) {
    if (datetime) {
        const date = datetime.substring(0, 10)
        const time = datetime.substring(10)
        const formatTime = time.replace('-', 'T')
        const result = date + formatTime
        return result

    }

    return ""
}

export default function CalendarContainer() {
    const [schedule, setSchedule] = useState()

    useEffect(() => {
        axios.get('/schedule').then((response) => {
            const schedule = response.data.data[0]
            const allSchedules = [...schedule.userSchedules, ...schedule.groupSchedules]
            const formattedSchedules = allSchedules.map((value, idx) => {
                value.startAt = formatDate(value.startAt)
                value.endAt = formatDate(value.endAt)

                return value
            })
            setSchedule(formattedSchedules)
        })
    }, []);

    return (
        <>
            <Header />
            <Calendar schedule={schedule} />
        </>
    )
}