import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function FormSelect({ labelName, labelVisible, menuItems, selectOption, handleSelectChange, backGroundColor }) {
    return (

        <FormControl
            sx={{
                minWidth: 120,
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: 'none',
                },
                "& .MuiInputLabel-root.Mui-focused": {
                    color: "#0A0A0A"
                },
            }}
            variant="outlined"
            size="small"
            className='app-select'>
            {labelVisible ? <InputLabel id="demo-simple-select-standard-label">{labelName}</InputLabel> : null}
            <Select
                sx={{
                    fontSize: '14px', fontWeight: 600, backgroundColor: backGroundColor,
                    boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 },
                    textTransform: "capitalize"
                }}

                labelId="select-label-id"
                id="select-id"
                value={selectOption}
                onChange={handleSelectChange}
                label={labelName}
            >
                {menuItems?.map((menuItem, key) => (
                    <MenuItem sx={{
                        fontSize: '14px', fontWeight: 400,
                        textTransform: "capitalize"
                    }} value={menuItem.id}>{menuItem.name}</MenuItem>
                ))
                }
            </Select>
        </FormControl>
    )
}
