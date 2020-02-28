import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as companyActions from '../../modules/company';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

function Company(props) {
  const { company } = props;
  const classes = useStyles();

  console.log(company);

  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    (async function getList() {
      try {
        await props.CompanyActions.fetchGetList();
      } finally {
        setIsFetching(false);
      }
    })();
  }, []);

  const handleChangePage = () => {

  };
  const handleChangeRowsPerPage = () => {

  };

  return (
    !isFetching && (
      <Paper className={classes.root}>
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
              {company && company.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    )
  );
}

export default connect(
  (state) => ({
    company: state.company,
  }),
  (dispatch) => ({
    CompanyActions: bindActionCreators(companyActions, dispatch),
  }),
)(Company);
