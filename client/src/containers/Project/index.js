import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Tooltip, IconButton } from '@material-ui/core';
import { Create as CreateIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import * as companyActions from '../../modules/company';
import * as projectActions from '../../modules/project';

import UpsertDialog from '../../components/Dialog/Upsert';
import DeleteConfirm from '../../components/Dialog/Confirm';
import ErrorAlert from '../../components/Dialog/Alert';

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
  table: {
    tableLayout: 'fixed',
    '& th': {
      textAlign: 'center',
    },
    '& td': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    '& td:last-child': {
      textAlign: 'center',
    },
  }
}));

function Project(props) {
  const { user, company: companyList, project: projectList, CompanyActions, ProjectActions } = props;
  const classes = useStyles();

  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState({
    upsertDialog: false,
    deleteConfirm: false,
    errorAlert: false,
  });
  const [mode, setMode] = useState(null);
  const [content, setContent] = useState('');
  const [target, setTarget] = useState({ company: {} });

  useEffect(() => {
    (async function getList() {
      try {
        await CompanyActions.fetchGetList();
        await ProjectActions.fetchGetList();
      } finally {
        setIsFetching(false);
      }
    })();
  }, [ProjectActions]);

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
  const handleInsert = async (data) => {
    try {
      await ProjectActions.fetchAdd({ ...data, creator: user.id });
    } catch (err) {
      setContent(err.message);
      handleOpen('errorAlert', true);
    }
  };
  const handleUpdate = async (data) => {
    try {
      await ProjectActions.fetchModify(target._id, data);
    } catch (err) {
      setContent(err.message);
      handleOpen('errorAlert', true);
    }
  };
  const handleDelete = async () => {
    try {
      await ProjectActions.fetchRemove(target._id);
    } catch (err) {
      setContent(err.message);
      handleOpen('errorAlert', true);
    }
  };

  return (
    !isFetching && (
      <>
        <Paper className={classes.root}>
          <header className={classes.header}>
            <Typography variant="h5">Project</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CreateIcon />}
              onClick={() => {
                setMode('Insert');
                setTarget({ company: {} });
                handleOpen('upsertDialog', true);
              }}
            >
              Insert
            </Button>
          </header>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table" className={classes.table}>
              <colgroup>
                <col width="25%" />
                <col width="25%" />
                <col width="15%" />
                <col width="15%" />
                <col />
              </colgroup>
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
                {projectList && projectList.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((project) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={project._id}>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.code}</TableCell>
                    <TableCell>{project.creator}</TableCell>
                    <TableCell>{moment(project.createdAt).format('YYYY-MM-DD')}</TableCell>
                    <TableCell>
                      <Tooltip title="Update">
                        <IconButton
                          aria-label="update"
                          onClick={() => {
                            setMode('Update');
                            setTarget(project);
                            handleOpen('upsertDialog', true);
                          }}
                        >
                          <CreateIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            setTarget(project);
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
            count={projectList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <UpsertDialog
          mode={mode}
          open={open.upsertDialog}
          contents={[
            { type: 'select', label: 'Company', name: 'company', value: target.company._id, list: companyList.map((company) => ({ name: company.name, value: company._id })) },
            { type: 'text', label: 'Name', name: 'name', value: target.name },
            { type: 'text', label: 'Code', name: 'code', value: target.code },
            { type: 'select', label: 'Service Type', name: 'serviceType', list: ['b2b', 'b2c'], value: target.serviceType },
            { type: 'text', label: 'SVN URL', name: 'svnUrl', value: target.svnUrl },
          ]}
          onClose={() => handleOpen('upsertDialog', false)}
          onClick={(data) => {
            handleOpen('upsertDialog', false);
            if (mode === 'Insert') {
              handleInsert(data);
            }
            if (mode === 'Update') {
              handleUpdate(data);
            }
          }}
        />
        <DeleteConfirm
          open={open.deleteConfirm}
          title="Delete"
          content="Are you sure to delete the project?"
          onPositive={() => {
            handleOpen('deleteConfirm', false);
            handleDelete();
          }}
          onNegative={() => handleOpen('deleteConfirm', false)}
        />
        <ErrorAlert
          open={open.errorAlert}
          content={content}
          onClose={() => handleOpen('errorAlert', false)}
        />
      </>
    )
  );
}

export default connect(
  (state) => ({
    user: state.user,
    company: state.company,
    project: state.project,
  }),
  (dispatch) => ({
    CompanyActions: bindActionCreators(companyActions, dispatch),
    ProjectActions: bindActionCreators(projectActions, dispatch),
  }),
)(Project);
