import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../modules/user';

import Sidebar from '../Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function TopBar(props) {
  const { isAdmin } = props;
  const classes = useStyles();
  const history = useHistory();

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };
  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  const handleLogout = async () => {
    props.UserActions.fetchLogout();
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {isAdmin && (
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleSidebarOpen}>
              <Menu />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            AppStore
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Sidebar open={openSidebar} onClose={handleSidebarClose} />
    </div>
  );
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(TopBar);
