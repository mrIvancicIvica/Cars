import React from 'react';
import {
  Paper,
  Table,
  makeStyles,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableSortLabel,
  Container,
  TextField,
  InputAdornment,
  Button,
  Dialog,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import Search from '@material-ui/icons/Search';
import { observer } from 'mobx-react';
import EditCar from '../Pages/EditCars.Page';
import carsStore from '../store/CarsStore';
import SnackBarNotification from './SnackBarNotification';
import listOfcarsUIStore from '../store/ListOfcarsUIStore';

const useStyles = makeStyles({
  table: {
    marginTop: 50,
  },
  header: {
    flexGrow: 1,
  },
});

//! MaterialUI

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

const ListOfCars = () => {
  const classes = useStyles();
  // const [valueToOrderBy, setValueToOrderBy] = useState('name');
  // const [orederDirection, setOrederDirection] = useState('asc');
  // const [page , setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   // setPage(0);
  // };

  // const handleRequestSort = (event, property) => {
  //   const isAscending =
  //     valueToOrderBy === property && orederDirection === 'asc';
  //   setValueToOrderBy(property);
  //   setOrederDirection(isAscending ? 'desc' : 'asc');
  // };

  // const createSortHandler = (property) => (event) => {
  //   handleRequestSort(event, property);
  // };

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    listOfcarsUIStore.setOpenSnack(false);
  };

  //! My Functions
  const handleEditCar = (car) => {
    carsStore.setOpenDialog(true);
    carsStore.setCurrentCar(car.id, car.brand, car.model, car.color);
  };

  return (
    <Container>
      <h1>List of Cars</h1>
      <TextField
        className={classes.margin}
        placeholder='Search car...'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(e) => carsStore.setFilter(e.target.value)}
      />
      <Container component={Paper} className={classes.table}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell key='brand'>
                <TableSortLabel
                  active={listOfcarsUIStore.valueToOrderBy === 'brand'}
                  direction={
                    listOfcarsUIStore.valueToOrderBy === 'brand'
                      ? listOfcarsUIStore.orederDirection
                      : 'asc'
                  }
                  onClick={listOfcarsUIStore.createSortHandler('brand')}
                >
                  Manufacturer
                </TableSortLabel>
              </TableCell>

              <TableCell align='right' key='model'>
                <TableSortLabel
                  active={listOfcarsUIStore.valueToOrderBy === 'model'}
                  direction={
                    listOfcarsUIStore.valueToOrderBy === 'model'
                      ? listOfcarsUIStore.orederDirection
                      : 'asc'
                  }
                  onClick={listOfcarsUIStore.createSortHandler('model')}
                >
                  Model
                </TableSortLabel>
              </TableCell>

              <TableCell align='right' key='color'>
                <TableSortLabel
                  active={listOfcarsUIStore.valueToOrderBy === 'color'}
                  direction={
                    listOfcarsUIStore.valueToOrderBy === 'color'
                      ? listOfcarsUIStore.orederDirection
                      : 'asc'
                  }
                  onClick={listOfcarsUIStore.createSortHandler('color')}
                >
                  Color
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>Edit</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {listOfcarsUIStore
              .stableSort(
                carsStore.filterCars,
                listOfcarsUIStore.getComparator(
                  listOfcarsUIStore.orederDirection,
                  listOfcarsUIStore.valueToOrderBy
                )
              )
              .slice(
                listOfcarsUIStore.page * listOfcarsUIStore.rowsPerPage,
                listOfcarsUIStore.page * listOfcarsUIStore.rowsPerPage +
                  listOfcarsUIStore.rowsPerPage
              )
              .map((car) => (
                <TableRow key={car.id}>
                  <TableCell component='th' scope='row'>
                    {car.brand}
                  </TableCell>

                  <TableCell align='right'>{car.model}</TableCell>

                  <TableCell align='right'>{car.color}</TableCell>
                  <TableCell align='right'>
                    <Button onClick={() => handleEditCar(car)}>
                      <Edit fontSize='small' />
                    </Button>
                    <Button onClick={() => carsStore.removeCar(car.id)}>
                      <Delete fontSize='small' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component='div'
          count={carsStore.cars.length}
          rowsPerPage={listOfcarsUIStore.rowsPerPage}
          page={listOfcarsUIStore.page}
          onChangePage={listOfcarsUIStore.handleChangePage}
          onChangeRowsPerPage={listOfcarsUIStore.handleChangeRowsPerPage}
        />
      </Container>
      <Dialog
        open={carsStore.openDialog}
        onClose={() => carsStore.setOpenDialog(false)}
      >
        <EditCar />
      </Dialog>
      <SnackBarNotification
        open={listOfcarsUIStore.snackBarState}
        handleClose={handleClose}
        message='New Car added'
      />
    </Container>
  );
};

export default observer(ListOfCars);
