import React, { useRef, useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@material-ui/core';

export default function Update(props) {
  const {
    open: initOpen,
    contents,
    onClose,
    onUpdate,
  } = props;

  const updateForm = useRef(null);
  const [open, setOpen] = useState(false);
  const [inputList, setInputList] = useState(null);

  useEffect(() => {
    setOpen(initOpen);
    setInputList(contents.map((content) => (
      { ...content, error: false }
    )));
  }, [initOpen]);

  const handleChange = (e, index) => {
    const copyInputList = [...inputList];
    copyInputList[index] = { ...copyInputList[index], value: e.target.value };
    setInputList(copyInputList);
  };
  const handleClick = () => {
    let isError = false;
    const copyInputList = [...inputList];
    const data = {};
    for(let i=0; i<copyInputList.length; i++) {
      const input = copyInputList[i]
      const value = updateForm.current[input.name].value.trim();
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
      onUpdate(data);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="update-dialog-title">
      <DialogTitle id="update-dialog-title">Update</DialogTitle>
      <DialogContent>
        <form ref={updateForm}>
          {inputList && inputList.map((input, index) => {
            const { type, label, value, name, error } = input;
            return (
              <TextField
                key={name}
                type={type}
                label={label}
                name={name}
                value={value}
                error={error}
                margin="dense"
                fullWidth
                helperText={error ? `${label} is required` : ' '}
                onChange={(e) => handleChange(e, index)}
              />
            );
          })}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="primary">Update</Button>
      </DialogActions>
    </Dialog>
  );
}
