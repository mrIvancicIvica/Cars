import { makeAutoObservable } from 'mobx';
import * as Yup from 'yup';
import {
  makeStyles,
} from '@material-ui/core';


class AddNewCarUIStore {
  CarsBrand = [{ id: 1, brand: 'Audi' },{ id: 2, brand: 'Mazda' },{ id: 3, brand: 'BMW' },];
  CarsModel = [{ id: 1, model: 'A4' },{ id: 2, model: '6' },{ id: 3, model: '320d' },];
  CarsColor = [{ id: 1, color: 'Suolred' },{ id: 2, color: 'Black' },{ id: 3, color: 'Red' },];

  constructor() {
    makeAutoObservable(this);
  }

   Schema = Yup.object().shape({
    brand: Yup.string().required('Required'),
    model: Yup.string().required('Required'),
    color: Yup.string().required('Required'),
  });


  

  useStyles = makeStyles((theme) => ({
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


  


}

const addNewCarUiStore = new AddNewCarUIStore();

export default addNewCarUiStore;
