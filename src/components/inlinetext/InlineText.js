import { Check, Clear, Edit } from "@mui/icons-material";
import { formLabelClasses, IconButton, TextField, Typography, Box } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useRef, useState } from "react";

function InlineText({ text, handlechange, saveName, showEdit, handleEdit }) {
  const [open, setOpen] = useState(false);
  const [textfieldvalue, setTextfieldvalue] = useState(text);
  const ref = useRef();

  const openedit = () => {
    setOpen(true);
    handleEdit(true)

  };

  const onclose = () => {
    setOpen(false);
    handleEdit(false)
  };

  const onsuccess = () => {
    setOpen(false);
    handlechange(textfieldvalue, false);
  };
  return (
    <div>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
        {open ? (
          <Box

          >
            <TextField
              defaultValue={text}
              size="small"
              ref={ref}
              autoFocus
              variant="standard"
              onChange={(e) => setTextfieldvalue(e.target.value)}
              InputProps={{
                style: {
                  fontFamily: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'system-ui',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Web"',
                    'sans-serif',
                  ].join(','), fontSize: "13px"
                }
              }}
            />
            <IconButton
              sx={{ height: 20, width: 20, marginLeft: "5px" }}
              color="success"
              onClick={onsuccess}
            >
              <Check sx={{ height: 20, width: 20 }} />
            </IconButton>
            <IconButton
              sx={{ height: 20, width: 20, marginLeft: "5px" }}
              color="error"
              onClick={onclose}
            >
              <Clear sx={{ height: 20, width: 20 }} />
            </IconButton>
          </Box>
        ) : (
          <>
            <Typography className="inlinetext-text" sx={{
              fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'system-ui',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Web"',
                'sans-serif',
              ].join(','), fontSize: "13px"
            }}>{text}</Typography>
            <IconButton
              onClick={openedit}
              sx={{
                height: 20, width: 20, marginRight: "100px !important"
              }}
              color="primary"
            >
              <Edit sx={{ height: 20, width: 20 }} />
            </IconButton>
          </>
        )
        }
      </Stack >
    </div >
  );
}

export default InlineText;
