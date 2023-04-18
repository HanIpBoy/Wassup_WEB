import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import styles from './Calendar.module.css';
import MainIcon from '../../images/MainIcon.png';
import CalendarModal from '../Modals/CalendarModal';



const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <>
      <img className={styles.mainIcon} src={MainIcon} />
      <div className={styles.header + ' row'}>

        <div className={styles['col-start']}>
          <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
          <span className={styles.text}>
            {format(currentMonth, 'yyyy')}년
            <span className={`${styles.text} ${styles.month}`}>
              {format(currentMonth, 'M')}월
            </span>
            <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
          </span>

        </div>
        {/* <div className={styles['col-end']}>
        <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
        <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
      </div> */}
      </div>
    </>

  );
};

const RenderDays = () => {
  const days = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'].map((day, index) => (
    <div className={styles.col} key={index}>
      {day}
    </div>
  ));

  return <div className={`${styles.days} row`}>{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const [CalendarModalOn, setCalendarModalOn] = useState(false);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = day;
      days.push(
        <div
          className={`${styles.col} ${styles.cell} ${!isSameMonth(day, monthStart)
              ? styles.disabled
              : isSameDay(day, selectedDate)
                ? styles.selected
                : format(currentMonth, 'M') !== format(day, 'M')
                  ? styles['not-valid']
                  : styles.valid
            }`}
          key={day}
          onClick={() => CalendarModalOn(true)}
        >
          {/* onDateClick(parse(cloneDay)) -> */}
          <span
            className={
              format(currentMonth, 'M') !== format(day, 'M') ? `${styles.text} ${styles['not-valid']}` : styles.text
            }
          >
            {formattedDate}
          </span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className={styles.row} key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className={styles.body}>{rows}</div>;
};

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const [CalendarModalOn, setCalendarModalOn] = useState(false);

  return (
    <>
      <CalendarModal show={CalendarModalOn} onHide={() => CalendarModalOn(false)} />
      <div className={styles.calendar}>
        <RenderHeader
          currentMonth={currentMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
        <RenderDays />
        <RenderCells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={onDateClick}
        />
      </div>
    </>
  );
};

