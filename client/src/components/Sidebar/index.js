import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemText, Divider } from '@material-ui/core';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  link: {
    textDecoration: 'none',
    color: 'initial',
  },
  childList: {
    paddingTop: 0,
    paddingLeft: 24,
  },
});

export default function Sidebar(props) {
  const { open, onClose } = props;
  const classes = useStyles();

  return (
    <Drawer open={open} onClose={onClose}>
      <div className={classes.list} role="presentation" onClick={onClose}>
        <List>
          <Link className={classes.link} to="/list">
            <ListItem button>
              <ListItemText primary="Company List" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Regist" />
          </ListItem>
        </List>
        <List className={classes.childList}>
          <Link className={classes.link} to="/company">
            <ListItem button>
              <ListItemText primary="Company" />
            </ListItem>
          </Link>
          <Link className={classes.link} to="/project">
            <ListItem button>
              <ListItemText primary="Project" />
            </ListItem>
          </Link>
          <Link className={classes.link} to="/application">
            <ListItem button>
              <ListItemText primary="Application" />
            </ListItem>
          </Link>
          <Link className={classes.link} to="/certification">
            <ListItem button>
              <ListItemText primary="iOS Push Certification" />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </div>
    </Drawer>
  );
}
