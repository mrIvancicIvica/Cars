/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { makeAutoObservable } from 'mobx';
// import { nanoid } from 'nanoid';
import  fb  from '../firebase/firebase.store';

class CarsStore {
  cars = [{ id: 1, brand: 'vw' },{ id: 2, brand: 'mazda' },{ id: 3, brand: 'mercedes' }];
  currentCar = { id: null, brand: '', model: '', color: '' };
  search = '';
  openDialog = false;
  snackBarState = false;

  constructor() {
    makeAutoObservable(this);



    fb.cars.on('value', (snapshot) => {
      const cardata = snapshot.val();
      const carsList = [];
      for (const id in cardata) {
        carsList.push({ id  , ...cardata[id] });
      }
      this.cars = carsList;
    });
    
    
    
    // , {
    //   cars: observable,
    //   snackBarState: observable,
    //   search: observable,
    //   openDialog: observable,
    //   currentCar: observable,
    //   adCar: action,
    //   setFilter: action,
    //   removeCar: action,
    //   setOpenDialog: action,
    //   setCurrentCar: action,
    //   filterCars: computed,
    // });



  }

  get filterCars() {
    return this.cars.filter((car) =>
      car.brand.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  setFilter(filter) {
    this.search = filter;
  }

  removeCar=(id) =>{
    // this.cars = this.cars.filter((car) => car.id !== id);
    const remove = fb.cars.child(id)
   remove.remove()
  }

  adCar =(brand, model, color)=> {
    // this.cars.push({ id: nanoid(), brand, model, color });
    const car = { brand, model, color };
    fb.cars.push(car);
  }

  setOpenDialog(open) {
    this.openDialog = open;
  }

  setOpenSnack(open) {
    this.snackBarState = open;
  }

  

  setCurrentCar(id, brand, model, color) {
    this.currentCar = { id, brand, model, color };
  }

  updateCar(id, brand, model, color) {
    const changeCar = this.cars.find((car) => car.id === id);
    if (changeCar) {
      changeCar.brand = brand;
      changeCar.model = model;
      changeCar.color = color;
    } else {
      this.cars.push({ id, brand, model, color });
    }
  }
}

const carsStore = new CarsStore();
export default carsStore;
