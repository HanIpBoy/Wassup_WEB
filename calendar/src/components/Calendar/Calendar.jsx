import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.css';
import MainIcon from '../../images/MainIcon.png';
import CalendarModal from '../Modals/CalendarModal';
import FullCalendarView from './FullCalendarView';
import PlusBtn from '../../images/btn_plus.png';
import PlusBtnHover from '../../images/btn_plus_hover.png';

export default function Calendar({ schedule }) {
  const [open, setOpen] = useState(false); // true면 모달 열림, false면 모달 닫힘
  const [selectedDate, setSelectedDate] = useState();
  const [editMode, setEditMode] = useState(false); //수정모달 띄울지 말지 결정해주는 상태
  const [selectedSchedule, setSelectedSchedule] = useState(); //스케줄 클릭시 나타나는 모달 정보
  const [updatedSchedule, setUpdatedSchedule] = useState();

  useEffect(() => {
    // schedule값이 undefined -> 리스트로 변하면 updatedSchedule을 schedule값으로 바꾼다
    if (schedule !== undefined) {
      setUpdatedSchedule(schedule)
    }
  }, [schedule])

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
    setSelectedSchedule(event)
  }

  const handleClickPlusBtn = (event) => { //PlusBtn을 클릭시 일정 추가 모달 띄우기
    setSelectedSchedule()
    setEditMode(false)
    setOpen(true)
  }

  const handleSubmitSchedule = (event) => {
    // 1. 모달을 닫는다
    setOpen(false)
    // 2. schedule을 업데이트한다
    setUpdatedSchedule(event)

  }


  return (
    <>
      {open &&
        <CalendarModal
          selectedSchedule={selectedSchedule}
          selectedDate={selectedDate}
          editMode={editMode}
          onClose={handleClose}
          onSubmitSchedule={handleSubmitSchedule}
        />
      }
      <div style={{
        backgroundColor: 'rgba(219,230,243,0.5)',
        height: 'auto',
        marginLeft: '20%',
        marginRight: '20%',
        marginBottom: '50px',
        padding: '35px 0',
        borderRadius: '30px',
        boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
        fontFamily: 'var(--font-PoorStory);'
      }}>
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
          <FullCalendarView schedule={updatedSchedule} onClickDate={handleClickDate} onClickEvent={handleClickEvent} />  {/* FullCalendarView Library 렌더링 */}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={PlusBtn} onClick={handleClickPlusBtn} className={styles.plusBtn} />
        </div>
      </div>

    </>
  );
};

