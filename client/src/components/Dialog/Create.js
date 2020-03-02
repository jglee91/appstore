import React, { useRef, useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@material-ui/core';

export default function Create(props) {
  const {
    open: initOpen,
    contents,
    onClose,
    onCreate,
  } = props;

  const createForm = useRef(null);
  const [open, setOpen] = useState(false);
  const [inputList, setInputList] = useState(null);

  useEffect(() => {
    setOpen(initOpen);
    setInputList(contents.map((content) => (
      { ...content, error: false }
    )));
  }, [initOpen]);

  const handleClick = () => {
    let isError = false;
    const copyInputList = [...inputList];
    const data = {};
    for(let i=0; i<copyInputList.length; i++) {
      const input = copyInputList[i]
      const value = createForm.current[input.name].value.trim();
      if (value.length === 0) {
        copyInputList[i] = { ...input, error: true };
        isError = true;
        break;
      } else {
        copyInputList[i] = { ...input, error: false };
        data[input.name] = value;
      }
    }
    setInputList(copyInputList);
    if(!isError) {
      onCreate(data);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="create-dialog-title">
      <DialogTitle id="create-dialog-title">Create</DialogTitle>
      <DialogContent>
        <form ref={createForm}>
          {inputList && inputList.map((input) => {
            const { type, label, name, error } = input;
            return (
              <TextField
                key={name}
                type={type}
                label={label}
                name={name}
                error={error}
                margin="dense"
                fullWidth
                helperText={error ? `${label} is required` : ' '}
              />
            );
          })}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
}
