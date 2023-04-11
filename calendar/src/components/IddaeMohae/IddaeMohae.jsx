import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import koLocale from 'date-fns/locale/ko';

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: {
        'ko' : koLocale
    }
})


const events = [
    {
        title: "ppt완성",
        allDay: true,
        start: new Date(),
        end: new Date()
    },
    {
        title: "아르바이트",
        start: new Date(2023,3,5),
        end: new Date(2023,3,7)
    },
    {
        title: "Conference",
        start: new Date(),
        end: new Date()
    }
]

export default function IddaeMohae(){
    return(
        <>
        <div>
            <Calendar localizer={localizer} events={events} 
            startAccessor="start" endAccessor="end"
            style={{height: 500, margin: "50px"}} culture="ko" />
        </div>
        </>
    )
}