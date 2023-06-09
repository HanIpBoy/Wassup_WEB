import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.css';
import MainIcon from '../../images/MainIcon.png';
import CalendarModal from '../Modals/CalendarModal';
import FullCalendarView from './FullCalendarView';
import PlusBtn from '../../images/btn_plus.png';
import PlusBtnHover from '../../images/btn_plus_hover.png';
import axios from '../../axios.js';
import cookie from 'js-cookie'
import { Button } from '@mui/material';

export default function Calendar({ schedule }) {
  const [open, setOpen] = useState(false); // true면 모달 열림, false면 모달 닫힘
  const [selectedDate, setSelectedDate] = useState();
  const [userEditMode, setUserEditMode] = useState(false); //수정모달 띄울지 말지 결정해주는 상태
  const [selectedSchedule, setSelectedSchedule] = useState(); //스케줄 클릭시 나타나는 모달 정보
  const [updatedSchedule, setUpdatedSchedule] = useState();
  const [leaderMode, setLeaderMode] = useState(false)
  const [groupMode, setGroupMode] = useState();
  const [groupEditMode, setGroupEditMode] = useState(false);
  const [selectedGroupScheduleName, setSelectedGroupScheduleName] = useState('');
  const userId = cookie.get('userId')



  useEffect(() => {
    // schedule값이 undefined -> 리스트로 변하면 updatedSchedule을 schedule값으로 바꾼다
    if (schedule !== undefined) {
      setUpdatedSchedule(schedule)
    }
  }, [schedule])

  const handleClickDate = (date) => { // 빈 곳을 클릭했을 때 
    setOpen(true)
    setUserEditMode(false)
    setGroupMode(false)
    setGroupMode(false)
    setLeaderMode(false)
    setSelectedDate(date)
  };
  const handleClose = () => {
    setOpen(false)

  };

  const handleClickEvent = async (event) => {//FullCalendar 에서 넘겨준 클릭 이벤트
    let response


    if (event.groupOriginKey === undefined) { //캘린더에서 개인 일정 클릭시
      setOpen(true)
      setUserEditMode(true)
      setGroupMode(false)
      setGroupEditMode(false)
      setSelectedSchedule(event)
    }
    else {  //캘린더에서 그룹 일정 클릭시
      response = await axios.get(`/group/${event.groupOriginKey}`);
      const leaderId = response.data.data[0].leaderId
      setOpen(true)
      setUserEditMode(false)
      setGroupMode(true)
      setSelectedGroupScheduleName(response.data.data[0].groupName)

      if (leaderId === userId) { // 그룹장일 때
        setLeaderMode(true)
        setGroupEditMode(true)
      }
      else { // 그룹장이 아닐때 
        setLeaderMode(false)
        setGroupEditMode(true)
      }

      setSelectedSchedule(event)
    }
  }

  const handleClickPlusBtn = (event) => { //PlusBtn을 클릭시 일정 추가 모달 띄우기
    setSelectedSchedule()
    setOpen(true)
    setUserEditMode(false)
    setGroupMode(false)
    setLeaderMode(false)
  }

  const handleSubmitSchedule = (schedule) => {
    // 1. 모달을 닫는다
    setOpen(false)
    // 2. schedule을 업데이트한다
    if (userEditMode || groupEditMode) {
      const idx = updatedSchedule.findIndex((value) => value.originKey === schedule.originKey)
      const temp = [...updatedSchedule]
      temp[idx] = schedule
      setUpdatedSchedule(temp)
    } else {
      setUpdatedSchedule([...updatedSchedule, schedule])
    }
  }

  const handleDeleteSchedule = (schedule) => {
    const idx = updatedSchedule.findIndex((value) => value.originKey === schedule.originKey)
    const temp = [...updatedSchedule]
    temp.splice(idx, 1)
    setUpdatedSchedule(temp)
    setUserEditMode(false) //수정된 코드
    setSelectedSchedule(undefined) //수정된 코드
  }

  return (
    <>
      {open &&
        <CalendarModal
          selectedSchedule={selectedSchedule}
          selectedDate={selectedDate}
          userEditMode={userEditMode}
          groupEditMode={groupEditMode}
          groupMode={groupMode}
          leaderMode={leaderMode}
          onClose={handleClose}
          onSubmitSchedule={handleSubmitSchedule}
          onSubmitGroupSchedule={handleSubmitSchedule}
          onDeleteSchedule={handleDeleteSchedule}
          onDeleteGroupSchedule={handleDeleteSchedule}
          selectedGroupScheduleName={selectedGroupScheduleName}
        />
      }
      <div style={{
        backgroundColor: 'rgba(219,230,243,0.5)',
        height: 'auto',
        marginLeft: '15%',
        marginRight: '15%',
        marginBottom: '30px',
        paddingTop: '5px',
        paddingBottom: '40px',
        boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
        // fontFamily: 'var(--font-PoorStory);',
        borderRadius: '10px'
      }}>
        <div className={styles.calendar}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '5px' }}>
            <Button
              variant="text"
              // onClick={handleClick}
              sx={{ cursor: 'pointer', fontFamily: 'var(--font-PoorStory)', fontWeight: 'bold', fontSize: '18px' }}
              onClick={handleClickPlusBtn}
            >
              일정 추가
            </Button>
          </div>

          <FullCalendarView schedule={updatedSchedule} onClickDate={handleClickDate} onClickEvent={handleClickEvent} />  {/* FullCalendarView Library 렌더링 */}
        </div>
        {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={PlusBtn} onClick={handleClickPlusBtn} className={styles.plusBtn} />
        </div> */}
      </div>

    </>
  );
};

