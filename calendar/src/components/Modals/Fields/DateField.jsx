import React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export default function DateField({ name, onInput, allday, value }) {
  const handleChange = (value) => {
    const event = {
      target: {
        name: name,
        value: value
      }
    }
    onInput(event)
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'MobileDateTimePicker'
        ]}
      >
        <DemoItem>
          {
            allday ? <MobileDatePicker value={value} onChange={handleChange} defaultValue={dayjs()} /> : <MobileDateTimePicker value={value} onChange={handleChange} defaultValue={dayjs()} />
          }
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}