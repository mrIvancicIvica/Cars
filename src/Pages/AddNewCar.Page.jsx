import React from 'react';
import { useFormik } from 'formik';
import {
  makeStyles,
  TextField,
  Button,
  Container,
  Grid,
  MenuItem,
} from '@material-ui/core';
import { observer } from 'mobx-react';
import * as Yup from 'yup'
import carsStore from '../store/CarsStore';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CarsBrand = [
  { id: 1, brand: 'Audi' },
  { id: 2, brand: 'Mazda' },
  { id: 3, brand: 'BMW' },
];
const CarsModel = [
  { id: 1, model: 'A4' },
  { id: 2, model: '6' },
  { id: 3, model: '320d' },
];
const CarsColor = [
  { id: 1, color: 'Suolred' },
  { id: 2, color: 'Black' },
  { id: 3, color: 'Red' },
];


const Schema = Yup.object().shape({
  brand: Yup.string().required('Required'),
  model: Yup.string().required('Required'),
  color: Yup.string().required('Required'),
});

const AddNewCar = () => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: { brand: '', model: '', color: '' },
    validationSchema : Schema,
    onSubmit: ({ brand, model, color }) => {
      carsStore.adCar(brand, model, color);
      formik.resetForm();
    },
  });
  

  return (
    <Container maxWidth='md' component='main'>
      <div className={classes.paper}>
        <h2>Add New Car</h2>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                id='brand'
                name='brand'
                label='Brand'
                value={formik.values.brand}
                onChange={formik.handleChange}
                error={formik.touched.brand && Boolean(formik.errors.brand)}
                helperText={formik.touched.brand && formik.errors.brand}
                variant='outlined'
                color='secondary'
                fullWidth
                select
              >
                {CarsBrand.map((car) => (
                  <MenuItem key={car.id} value={car.brand}>
                    {car.brand}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                id='model'
                name='model'
                label='Vehicle Model'
                value={formik.values.model}
                onChange={formik.handleChange}
                error={formik.touched.model && Boolean(formik.errors.model)}
                helperText={formik.touched.model && formik.errors.model}
                variant='outlined'
                color='secondary'
                fullWidth
                select
              >
                {CarsModel.map((car) => (
                  <MenuItem key={car.id} value={car.model}>
                    {car.model}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                className={classes.form}
                id='color'
                name='color'
                label='Vehicle Color'
                value={formik.values.color}
                onChange={formik.handleChange}
                error={formik.touched.color && Boolean(formik.errors.color)}
                helperText={formik.touched.color && formik.errors.color}
                variant='outlined'
                color='secondary'
                fullWidth
                select
              >
                {CarsColor.map((car) => (
                  <MenuItem key={car.id} value={car.color}>
                    {car.color}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Button
            className={classes.submit}
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default observer(AddNewCar);
