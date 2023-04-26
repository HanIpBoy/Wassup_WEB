import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.css';
import MainIcon from '../../images/MainIcon.png';
import CalendarModal from '../Modals/CalendarModal';
import FullCalendarView from './FullCalendarView';

export default function Calendar({ schedule }) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [editMode, setEditMode] = useState(false); //수정모달 띄울지 말지 결정해주는 상태
  const [selectedEvent, setSelectedEvent] = useState(); //스케줄 클릭시 나타나는 모달 정보

  const handleClickDate = (date) => {
    setOpen(true)
    console.log(date)
    setSelectedDate(date)
    setEditMode(false)
  };
  const handleClose = () => setOpen(false);

  const handleClickEvent = (event) => { //FullCalendar 에서 넘겨준 클릭 이벤트
    setOpen(true)
    setEditMode(true)
    setSelectedEvent(event)
  }

  return (
    <>
      {open && <CalendarModal selectedEvent={selectedEvent} selectedDate={selectedDate} editMode={editMode} onClose={handleClose} />}
      <div className={styles.calendar}>
        {/* <RenderHeader
          currentMonth={currentMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
        <RenderDays />
        <RenderCells
          onClose={handleClose}
          onOpen={handleOpen}
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          savedSchedule={schedule}
        /> */}
        <FullCalendarView schedule={schedule} onClickDate={handleClickDate} onClickEvent={handleClickEvent} />  {/* FullCalendarView Library 렌더링 */}
      </div>
    </>
  );
};

