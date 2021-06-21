import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, Container } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { observer } from 'mobx-react';
import carsStore from '../store/CarsStore'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
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

const Schema = Yup.object().shape({
  brand: Yup.string().required('Required'),
  model: Yup.string().required('Required'),
  color: Yup.string().required('Required'),
});

const EditCars = () => {
  const formik = useFormik({
    initialValues: {
      id: carsStore.currentCar.id,
      brand: carsStore.currentCar.brand,
      model: carsStore.currentCar.model,
      color: carsStore.currentCar.color,
    },
    validationSchema: Schema,
    onSubmit: ({id, brand, model, color }) => {
      carsStore.onUpdateCar(id,brand, model, color)
      carsStore.setOpenDialog(false)
    },
  });
  const classes = useStyles();

  return (
    <Container maxWidth='md' component='main'>
      <div className={classes.paper}>
        <h2>Edit Car</h2>
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
              />
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
              />
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
              />
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

export default observer(EditCars);
