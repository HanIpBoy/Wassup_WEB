import React from "react";
import FullCalendar from "@fullcalendar/react";
import Header from "../Header/Header";
import timeGridPlugin from "@fullcalendar/timegrid";
import koLocale from '@fullcalendar/core/locales/ko';
import { useRef } from "react";

export default function GroupDetail() {
    const calendarRef = useRef();

    return (
        <>
            <Header />
            <FullCalendar
                ref={calendarRef}
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                locale={koLocale}
            />
        </>
    )
}