import { makeAutoObservable } from 'mobx';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core';

class AddNewCarUIStore {
  CarsBrand = [
    { id: 1, brand: 'Audi' },
    { id: 2, brand: 'Mazda' },
    { id: 4, brand: 'Mercedes' },
    { id: 5, brand: 'Toyota' },
    { id: 6, brand: 'Nissan' },
    { id: 7, brand: 'Ford' },
    { id: 8, brand: 'Opel' },
    { id: 9, brand: 'Lexus' },
    { id: 10, brand: 'Chevorlet' },
  ];

  CarsModel = [
    { id: 1, model: 'A6' },
    { id: 2, model: '6' },
    { id: 3, model: '750i' },
    { id: 3, model: 'SClass' },
    { id: 3, model: 'Rav4' },
    { id: 3, model: '370z' },
    { id: 3, model: 'Mondeo' },
    { id: 3, model: 'Insignia' },
    { id: 3, model: 'LS Hybrid' },
    { id: 3, model: 'Camaro' },
  ];
  
  CarsColor = [
    { id: 1, color: 'Suolred' },
    { id: 2, color: 'Black' },
    { id: 3, color: 'Red' },
  ];

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
