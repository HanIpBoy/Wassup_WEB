import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ColorField() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <FormControl
                variant="filled"
                sx={{ mt: 2, minWidth: 120 }}
                fullWidth
                required
            >
                <InputLabel id="demo-simple-select-filled-label">색상</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={age}
                    onChange={handleChange}
                >
                    <MenuItem value="빨">빨</MenuItem>
                    <MenuItem value="주">주</MenuItem>
                    <MenuItem value="노">노</MenuItem>
                    <MenuItem value="초">초</MenuItem>
                    <MenuItem value="파">파</MenuItem>
                    <MenuItem value="남">남</MenuItem>
                    <MenuItem value="보">보</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}