import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Tooltip, IconButton } from '@material-ui/core';
import { Create as CreateIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import * as companyActions from '../../modules/company';

import CreateDialog from '../../components/Dialog/Create';
import UpdateDialog from '../../components/Dialog/Update';
import DeleteConfirm from '../../components/Dialog/Confirm';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  header: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    margin: theme.spacing(1),
  },
  create: {
    float: 'right',
  },
  container: {
    maxHeight: 440,
    title: {
      fontWeight: 'bold',
    },
  },
}));

function Company(props) {
  const { user, company: companyList, CompanyActions } = props;
  const classes = useStyles();

  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState({
    createDialog: false,
    updateDialog: false,
    deleteConfirm: false,
  });
  const [targetCompany, setTargetCompany] = useState({});

  useEffect(() => {
    (async function getList() {
      try {
        await props.CompanyActions.fetchGetList();
      } finally {
        setIsFetching(false);
      }
    })();
  }, []);

  const handleOpen = (key, value) => {
    setOpen({ ...open, [key]: value });
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const handleCreate = async (data) => {
    try {
      await CompanyActions.fetchAdd({ ...data, creator: user.id });
    } catch (err) {
      console.error(new Error(err));
    }
  };
  const handleUpdate = async (data) => {
    try {
      await CompanyActions.fetchModify(targetCompany._id, data);
    } catch (err) {
      console.error(new Error(err));
    }
  };
  const handleDelete = async () => {
    try {
      await CompanyActions.fetchRemove(targetCompany._id);
    } catch (err) {
      console.error(new Error(err));
    }
  };

  return (
    !isFetching && (
      <>
        <Paper className={classes.root}>
          <header className={classes.header}>
            <Typography variant="h5">Company</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CreateIcon />}
              onClick={() => handleOpen('createDialog', true)}
            >
              Create
            </Button>
          </header>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Creator</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companyList && companyList.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((company) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={company._id}>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.code}</TableCell>
                    <TableCell>{company.creator}</TableCell>
                    <TableCell>{moment(company.createdAt).format('YYYY-MM-DD')}</TableCell>
                    <TableCell>
                      <Tooltip title="Update">
                        <IconButton
                          aria-label="update"
                          onClick={() => {
                            setTargetCompany(company);
                            handleOpen('updateDialog', true);
                          }}
                        >
                          <CreateIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            setTargetCompany(company);
                            handleOpen('deleteConfirm', true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={companyList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <CreateDialog
          open={open.createDialog}
          contents={[
            { type: 'text', label: 'Name', name: 'name' },
            { type: 'text', label: 'Code', name: 'code' },
          ]}
          onClose={() => handleOpen('createDialog', false)}
          onCreate={(data) => {
            handleOpen('createDialog', false);
            handleCreate(data);
          }}
        />
        <UpdateDialog
          open={open.updateDialog}
          contents={[
            { type: 'text', label: 'Name', name: 'name', value: targetCompany.name },
            { type: 'text', label: 'Code', name: 'code', value: targetCompany.code },
          ]}
          onClose={() => handleOpen('updateDialog', false)}
          onUpdate={(data) => {
            handleOpen('updateDialog', false);
            handleUpdate(data);
          }}
        />
        <DeleteConfirm
          open={open.deleteConfirm}
          title="Delete"
          content="Are you sure to delete the company?"
          onPositive={() => {
            handleOpen('deleteConfirm', false);
            handleDelete();
          }}
          onNegative={() => handleOpen('deleteConfirm', false)}
        />
      </>
    )
  );
}

export default connect(
  (state) => ({
    user: state.user,
    company: state.company,
  }),
  (dispatch) => ({
    CompanyActions: bindActionCreators(companyActions, dispatch),
  }),
)(Company);
