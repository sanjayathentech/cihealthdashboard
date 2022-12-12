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
            <form onSubmit={onsuccess}>
              <TextField
                autoFocus
                defaultValue={text}
                size="small"
                ref={ref}
                variant="standard"
                onChange={(e) => setTextfieldvalue(e.target.value)}
                InputProps={{
                  style: {
                    fontSize: "13px"
                  }
                }}
              />
              <IconButton
                type="submit"
                sx={{ height: 20, width: 20, marginLeft: "5px" }}
                color="success"
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
            </form>
          </Box>
        ) : (
          <>
            <Typography className="inlinetext-text" sx={{ fontSize: "13px" }}>{text}</Typography>
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
