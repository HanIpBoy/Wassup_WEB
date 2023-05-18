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
            console.log('response', response)

            const schedule = response.data.data.map((value, idx) => {
                value.startAt = formatDate(value.startAt)
                value.endAt = formatDate(value.endAt)

                return value
            })
            setSchedule(schedule)
        })
    }, []);

    return (
        <>
            <Header />
            <Calendar schedule={schedule} />
        </>
    )
}