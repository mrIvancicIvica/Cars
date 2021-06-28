import React from 'react';
import {
  Paper,
  Table,
  makeStyles,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  // TablePagination,
  TableSortLabel,
  Container,
  TextField,
  Button,
  Dialog,
  CircularProgress,
  MenuItem,
} from '@material-ui/core';
import {
  Delete,
  Edit,
  ArrowBackIos,
  ArrowForwardIos,
} from '@material-ui/icons';
import { observer } from 'mobx-react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import EditCar from '../Pages/EditCars.Page';
import carsStore from '../store/CarsStore';
import SnackBarNotification from './SnackBarNotification';
import listOfcarsUIStore from '../store/ListOfcarsUIStore';
import addNewCarUiStore from '../store/AddNewCarUIStore';
import carsMakeServices from '../firebase/CarsMakeServices';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: 50,
  },
  header: {
    flexGrow: 1,
  },
  loadMore: {
    width: '50%',
    marginTop: '12px',
    color: 'inherit',
  },
  progres: {
    marginLeft: theme.spacing(74),
    marginTop: theme.spacing(5),
    color: 'white',
  },
  link: {
    color: 'fefefe',
  },
}));

//! MaterialUI

const ListOfCars = () => {
  const classes = useStyles();

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    listOfcarsUIStore.setOpenSnack(false);
  };

  //! My Functions
  const handleEditCar = (car) => {
    carsStore.setCurrentCar(car.id, car.brand, car.model, car.color);
  };

  return (
    <Container>
      <h1>List of Cars</h1>

      <Formik
        initialValues={{ brand: '' }}
        onSubmit={(value) => {
          carsMakeServices.searchFirebaseCar(value);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className={classes.form}>
            <TextField
              id='brand'
              name='brand'
              label='Brand'
              value={props.values.brand}
              onChange={props.handleChange}
              error={props.touched.brand && Boolean(props.errors.brand)}
              helperText={props.touched.brand && props.errors.brand}
              variant='outlined'
              color='secondary'
              fullWidth
              select
            >
              {addNewCarUiStore.CarsBrand.map((car) => (
                <MenuItem key={car.id} value={car.brand}>
                  {car.brand}
                </MenuItem>
              ))}
            </TextField>

            <Button
              className={classes.submit}
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
            >
              search car
            </Button>
          </form>
        )}
      </Formik>

      <Container component={Paper} className={classes.table}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell key='brand'>
                <TableSortLabel onClick={() => listOfcarsUIStore.togleBrand()}>
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
                    <Link to='/editcar'>
                      <Button onClick={() => handleEditCar(car)}>
                        <Edit className={classes.link} fontSize='small' />
                      </Button>
                    </Link>
                    <Button onClick={() => carsMakeServices.removeCar(car.id)}>
                      <Delete fontSize='small' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Container>
      <Dialog
        open={carsStore.openDialog}
        onClose={() => carsStore.setOpenDialog(false)}
      >
        <EditCar />
      </Dialog>
      <Button
        onClick={() => carsMakeServices.showPrevious({ item: carsStore.cars[0] })}
        variant='contained'
        color='primary'
        className={classes.loadMore}
      >
        <ArrowBackIos />
      </Button>
      <Button
        onClick={() =>
          carsMakeServices.showNext({
            item: carsStore.cars[carsStore.cars.length - 1],
          })
        }
        variant='contained'
        color='primary'
        className={classes.loadMore}
      >
        <ArrowForwardIos />
      </Button>
      <SnackBarNotification
        open={listOfcarsUIStore.snackBarState}
        handleClose={handleClose}
        message='New Car added'
      />
      {carsStore.isLoading && <CircularProgress className={classes.progres} />}
      {carsStore.isEmpty && (
        <SnackBarNotification message='No more data' open={carsStore.isEmpty} />
      )}
    </Container>
  );
};

export default observer(ListOfCars);
