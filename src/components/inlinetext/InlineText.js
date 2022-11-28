import { Check, Clear, Edit } from "@mui/icons-material";
import { IconButton, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useRef, useState } from "react";

function InlineText({ text, handlechange }) {
  const [open, setOpen] = useState(false);
  const [textfieldvalue, setTextfieldvalue] = useState(text);
  const ref = useRef();

  const openedit = () => {
    setOpen(true);
  };

  const onclose = () => {
    setOpen(false);
  };

  const onsuccess = () => {
    setOpen(false);
    handlechange(textfieldvalue);
  };
  return (
    <div>
      <Stack direction="row" spacing={1} alignItems="center">
        {open ? (
          <>
            <TextField
              defaultValue={text}
              size="small"
              ref={ref}
              autoFocus
              variant="standard"
              onChange={(e) => setTextfieldvalue(e.target.value)}
            />
            <IconButton
              sx={{ height: 20, width: 20 }}
              color="success"
              onClick={onsuccess}
            >
              <Check sx={{ height: 20, width: 20 }} />
            </IconButton>
            <IconButton
              sx={{ height: 20, width: 20 }}
              color="error"
              onClick={onclose}
            >
              <Clear sx={{ height: 20, width: 20 }} />
            </IconButton>
          </>
        ) : (
          <>
            <Typography className="inlinetext-text">{text}</Typography>
            <IconButton
              onClick={openedit}
              sx={{ height: 20, width: 20 }}
              color="primary"
            >
              <Edit sx={{ height: 20, width: 20 }} />
            </IconButton>
          </>
        )}
      </Stack>
    </div>
  );
}

export default InlineText;
