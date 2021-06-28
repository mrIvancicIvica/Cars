/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { makeAutoObservable } from 'mobx';
// import fb from '../firebase/firebase.store';

class CarsStore {
  cars = [];

  currentCar = { id: null, brand: '', model: '', color: '' };
  search = '';
  openDialog = false;
  isLoading = true;
  isEmpty = false;
  searchCar = '';

  constructor() {
    makeAutoObservable(this);
  }

  get filterCars() {
    return this.cars.filter((car) =>
      car.brand.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  setFilter(filter) {
    this.search = filter;
  }

  searchCar(car) {
    this.searchCar = car;
  }

  setOpenDialog(open) {
    this.openDialog = open;
  }

  setCurrentCar(id, brand, model, color) {
    this.currentCar = { id, brand, model, color };
  }
}

const carsStore = new CarsStore();
export default carsStore;
