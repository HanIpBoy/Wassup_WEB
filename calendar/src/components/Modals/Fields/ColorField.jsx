import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { COLOR_CODE_LIST } from '../../../constants';
function ColorLabel({ color }) {
    const style = {
        width: '25px',
        height: '25px',
        borderRadius: 20,
        background: color
    }
    return (
        <div style={style} />
    )
}
export default function ColorField({ name, onInput, value }) {
    return (
        <div>
            <FormControl
                variant="filled"
                sx={{ mt: 2, minWidth: 120 }}
                fullWidth
                required
            >
                <InputLabel id="demo-simple-select-filled-label" >색상</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={value}
                    onChange={onInput}
                    name={name}
                    sx={{ justifyContent: 'center' }}
                >
                    {
                        COLOR_CODE_LIST.map((value, idx) => {
                            return <MenuItem key={idx} value={value} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}><ColorLabel color={value} /></MenuItem>
                        })
                    }
                    {/* <MenuItem value="빨"><ColorLabel color={'#E45C5C'} /></MenuItem>
                    <MenuItem value="주">주</MenuItem>
                    <MenuItem value="노">노</MenuItem>
                    <MenuItem value="초">초</MenuItem>
                    <MenuItem value="파">파</MenuItem>
                    <MenuItem value="남">남</MenuItem>
                    <MenuItem value="보">보</MenuItem> */}
                </Select>
            </FormControl>
        </div>
    );
}