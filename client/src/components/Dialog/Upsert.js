import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, NativeSelect, FormHelperText, Button } from '@material-ui/core';
import { AttachFile as AttachFileIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  none: {
    display: 'none',
  },
  fileContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  fileInput: {
    width: '75%',
  },
  fileButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
}));

export default function Upsert(props) {
  const {
    mode,
    open: initOpen,
    contents,
    onClose,
    onClick,
  } = props;

  const classes = useStyles();

  const form = useRef(null);
  const [open, setOpen] = useState(false);
  const [inputList, setInputList] = useState(null);
  const [fileInputList, setFileInputList] = useState(null);

  useEffect(() => {
    setOpen(initOpen);
    setInputList(contents.map((content) => {
      if (content.type === 'text') {
        return { ...content, error: false };
      }
      if (content.type === 'select') {
        return {
          ...content,
          error: false,
          list: [
            { name: `Select a ${content.label.toLowerCase()}`, value: ' ' },
          ].concat(content.list.map((item) => {
            if (typeof item === 'string') {
              return { name: item, value: item };
            } else {
              return item;
            }
          })),
        };
      }
      if (content.type === 'file') {
        return { ...content, error: false };
      }
    }));
    setFileInputList(contents.filter((content) => content.type === 'file'))
  }, [initOpen, contents]);

  const handleChange = (e, name, value) => {
    setInputList(inputList.map((input) => {
      if(input.name === name) {
        return { ...input, value };
      } else {
        return input;
      }
    }));
  };
  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    handleChange(e, name, file.name)
  };
  const handleClick = () => {
    let isError = false;
    const copyInputList = [...inputList];
    const data = {};
    for(let i=0; i<copyInputList.length; i++) {
      const input = copyInputList[i];
      let value;
      if (input.type === 'file') {
        value = form.current[input.name].files[0];
      } else {
        value = form.current[input.name].value.trim();
      }
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
      onClick(data);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="upsert-dialog-title">
      <DialogTitle id="upsert-dialog-title">{mode}</DialogTitle>
      <DialogContent>
        <form ref={form}>
          {inputList && inputList.map((input) => {
            const { type, label, name, error, value, accept } = input;
            if (type === 'text') {
              return (
                <TextField
                  key={name}
                  label={label}
                  name={name}
                  error={error}
                  defaultValue={value}
                  margin="dense"
                  fullWidth
                  helperText={error ? `${label} is required` : ' '}
                />
              );
            }
            if (type === 'select') {
              return (
                <FormControl key={name} fullWidth error={error}>
                  <InputLabel htmlFor={`${label}-select-label`}>{label}</InputLabel>
                  <NativeSelect inputProps={{ name, id: `${label}-select-label`}} defaultValue={value}>
                    {input.list.map((item) => (
                      <option key={item.value} value={item.value}>{item.name}</option>
                    ))}
                  </NativeSelect>
                  <FormHelperText>{error ? `${label} is required` : ' '}</FormHelperText>
                </FormControl>
              );
            }
            if (type === 'file') {
              return (
                <div key={name} className={classes.fileContainer}>
                  <TextField
                    className={classes.fileInput}
                    label={label}
                    value={value || ''}
                    error={error}
                    margin="dense"
                    helperText={error ? `${label} is required` : ' '}
                    InputProps={{
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      shrink: value && value.length !== 0,
                    }}
                  />
                  <input type="file" name={name} className={classes.none} id={`${label}-file-button`} onChange={(e) => handleFileChange(e, name)} accept={accept} />
                  <label htmlFor={`${label}-file-button`} className={classes.fileButton}>
                    <Button
                      variant="outlined"
                      color="primary"
                      component="span"
                      startIcon={<AttachFileIcon />}
                    >
                      Attach
                    </Button>
                  </label>
                </div>
              );
            }
          })}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="primary">Complete</Button>
      </DialogActions>
    </Dialog>
  );
}
