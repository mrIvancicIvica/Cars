import React from 'react';
import {TextField,Button, Container, Grid,MenuItem,} from '@material-ui/core';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import carsStore from '../store/CarsStore';
import addNewCarUiStore from '../store/AddNewCarUIStore';
import listOfcarsUIStore from '../store/ListOfcarsUIStore'

const AddNewCar = () => {
  const classes = addNewCarUiStore.useStyles();
  const history = useHistory();


  return (
    <Container maxWidth='md' component='main'>
      <div className={classes.paper}>
        <h2>Add New Car</h2>

        <Formik
          initialValues={{ brand: '', model: '', color: '' }}
          validationSchema={addNewCarUiStore.Schema}
          onSubmit={(value) => {
            carsStore.adCar(value);
            history.push('/');
            listOfcarsUIStore.setOpenSnack(true);

          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit} className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
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
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    id='model'
                    name='model'
                    label='Vehicle Model'
                    value={props.values.model}
                    onChange={props.handleChange}
                    error={props.touched.model && Boolean(props.errors.model)}
                    helperText={props.touched.model && props.errors.model}
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    select
                  >
                    {addNewCarUiStore.CarsModel.map((car) => (
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
                    value={props.values.color}
                    onChange={props.handleChange}
                    error={props.touched.color && Boolean(props.errors.color)}
                    helperText={props.touched.color && props.errors.color}
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    select
                  >
                    {addNewCarUiStore.CarsColor.map((car) => (
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
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default observer(AddNewCar);
